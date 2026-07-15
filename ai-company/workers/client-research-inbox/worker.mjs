#!/usr/bin/env node
/* ============================================================
 * Client Research intake bridge (V1) - Shani AI Company
 *
 * Polls Supabase `client_research_jobs` (filled by n8n Cloud from the
 * existing /audit form - see n8n-handoff-contract.md), claims one job
 * atomically, writes the submission outside Git, invokes the existing,
 * unmodified Client Research Desk V1 (.claude/commands/client-desk.md),
 * validates research-report.md, writes status back to Supabase.
 *
 * Never does research, pricing, proposal-writing, or customer contact
 * itself. Shani status always stays "pending" - only Shani changes it.
 *
 * Node, zero third-party deps (same convention as
 * ../inspiration-inbox/worker.mjs). Supabase = plain PostgREST via fetch.
 *
 * Queue root (outside Git): C:\Users\gorgo\ShaniAI\client-research-inbox\
 *   processing\<id>\  submission copy + logs while working
 *   ready\<id>\        metadata only, Review status = approved
 *   needs_shani\<id>\  metadata only, Review status != approved
 *   failed\<id>\       error report after bounded retries
 *   logs\, .env, worker.lock
 *
 * The actual report stays where the Client Research Desk already puts it:
 * ai-company/clients/<client-id>/ inside the repo, uncommitted.
 *
 * Run once:     node worker.mjs
 * Self-test:    node worker.mjs --self-test   (no network, no real Claude)
 * ============================================================ */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn, execSync } from 'node:child_process';

const isWindows = process.platform === 'win32';

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) out[key] = true;
    else { out[key] = next; i++; }
  }
  return out;
}
const args = parseArgs(process.argv.slice(2));
const SELF_TEST = !!args['self-test'];

const cfg = {
  baseDir: String(args['base-dir'] || 'C:\\Users\\gorgo\\ShaniAI\\client-research-inbox'),
  repoDir: String(args['repo-dir'] || 'C:\\Projects\\shifted-tech-inspiration-worker'),
  claudeExe: String(args['claude-exe'] || 'claude'),
  // Mirrors the Content Desk budget already proven on this machine for a
  // comparably-shaped researcher->reviewer(->revision->review) pipeline.
  deskTimeoutSec: Number(args['desk-timeout-sec'] || 5400),
  maxAttempts: Number(args['max-attempts'] || 3),
  retryCooldownMin: Number(args['retry-cooldown-min'] || 30),
  lockStaleMin: Number(args['lock-stale-min'] || 120), // desk 90 + buffer
  workerId: String(args['worker-id'] || `${os.hostname()}-client-research-inbox`),
};

// Self-test: isolated temp root, never the real queue dir or the repo.
if (SELF_TEST) cfg.baseDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cri-selftest-'));

const DIRS = {};
for (const name of ['processing', 'ready', 'needs_shani', 'failed', 'logs']) {
  DIRS[name] = path.join(cfg.baseDir, name);
  fs.mkdirSync(DIRS[name], { recursive: true });
}
const LOCK_PATH = path.join(cfg.baseDir, 'worker.lock');
const LOG_FILE = path.join(DIRS.logs, `worker-${stamp('date')}.log`);

function stamp(kind) {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  const date = `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
  if (kind === 'date') return date;
  return `${date}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

// Secrets that must never reach a log line, even truncated.
const SECRET_ENV_KEYS = ['SUPABASE_SERVICE_ROLE_KEY', 'N8N_QUEUE_SECRET'];

function sanitize(text) {
  let t = String(text == null ? '' : text);
  let user = '';
  try { user = os.userInfo().username; } catch { /* ignore */ }
  if (user) t = t.split(user).join('<user>');
  for (const key of SECRET_ENV_KEYS) {
    const v = process.env[key];
    if (v && v.length >= 6) t = t.split(v).join(`<${key}-redacted>`);
  }
  t = t.replace(/sk-ant-[A-Za-z0-9_-]{8,}/g, '<api-key-redacted>');
  t = t.replace(/eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g, '<jwt-redacted>');
  t = t.replace(/(authorization|cookie|token|api[_-]?key|apikey)\s*[:=]\s*\S+/gi, '$1: <redacted>');
  return t;
}

function log(msg) {
  const line = `[${new Date().toISOString()}] ${sanitize(msg)}`;
  fs.appendFileSync(LOG_FILE, line + '\n', 'utf8');
  if (!SELF_TEST) console.log(line);
}

function writeText(file, text) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, text, 'utf8'); }
function writeJson(file, obj) { writeText(file, JSON.stringify(obj, null, 2)); }
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

// Optional local secrets file: <baseDir>\.env (KEY=VALUE). Never in Git.
// process.env always wins if already set (a real Windows env var).
function loadEnvFile(baseDir) {
  const p = path.join(baseDir, '.env');
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    const value = t.slice(eq + 1).trim();
    if (key && !(key in process.env)) process.env[key] = value;
  }
}
if (!SELF_TEST) loadEnvFile(cfg.baseDir);

// ---- Supabase (PostgREST) client. Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
class SupabaseJobsClient {
  constructor(url, serviceKey) {
    if (!url || !serviceKey) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    this.url = url.replace(/\/+$/, '');
    this.key = serviceKey;
  }
  async _request(pathAndQuery, method, body) {
    const res = await fetch(`${this.url}${pathAndQuery}`, {
      method,
      headers: { apikey: this.key, Authorization: `Bearer ${this.key}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Supabase ${method} ${pathAndQuery} -> ${res.status}: ${sanitize(text).slice(0, 300)}`);
    }
    const ct = res.headers.get('content-type') || '';
    return ct.includes('application/json') ? res.json() : null;
  }
  // Atomic claim via the SQL function in supabase/001_client_research_jobs.sql.
  async claimNext(workerId) {
    const rows = await this._request('/rest/v1/rpc/claim_next_client_research_job', 'POST', { p_worker_id: workerId });
    return Array.isArray(rows) && rows.length ? rows[0] : null;
  }
  async update(id, patch) {
    await this._request(`/rest/v1/client_research_jobs?id=eq.${encodeURIComponent(id)}`, 'PATCH', patch);
  }
  // Crash recovery: rows stuck in 'processing' past the stale threshold.
  async reclaimStale(staleMinutes) {
    const cutoff = new Date(Date.now() - staleMinutes * 60000).toISOString();
    const rows = await this._request(`/rest/v1/client_research_jobs?status=eq.processing&locked_at=lt.${encodeURIComponent(cutoff)}`, 'GET');
    return Array.isArray(rows) ? rows : [];
  }
}

// ---- n8n + Google Sheets queue client (QUEUE_PROVIDER=n8n-sheets).
// Talks ONLY to two secured n8n webhooks (see n8n-sheets-queue-workflow.json);
// the Google credential stays inside n8n. Env: N8N_QUEUE_CLAIM_URL,
// N8N_QUEUE_UPDATE_URL, N8N_QUEUE_SECRET. Same interface as SupabaseJobsClient.
class N8nSheetsJobsClient {
  constructor(claimUrl, updateUrl, secret) {
    if (!claimUrl || !updateUrl || !secret) {
      throw new Error('Missing N8N_QUEUE_CLAIM_URL, N8N_QUEUE_UPDATE_URL or N8N_QUEUE_SECRET');
    }
    this.claimUrl = claimUrl; this.updateUrl = updateUrl; this.secret = secret;
  }
  async _post(url, body) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-queue-secret': this.secret },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`n8n queue POST ${url.split('/').slice(-2).join('/')} -> ${res.status}: ${sanitize(text).slice(0, 300)}`);
    }
    return res.json().catch(() => null);
  }
  // Sheet row -> the job shape the main loop expects.
  _rowToJob(row) {
    if (!row || !row.submission_id) return null;
    let submission = row.envelope_json;
    if (typeof submission === 'string') {
      try { submission = JSON.parse(submission); } catch { submission = null; }
    }
    return {
      id: row.submission_id,
      created_at: row.created_at || null,
      status: row.status || 'processing',
      attempts: Number(row.attempts || 0),
      next_attempt_at: row.next_attempt_at || null,
      locked_at: row.locked_at || null,
      locked_by: row.locked_by || null,
      submission_json: submission,
    };
  }
  async claimNext(workerId) {
    const data = await this._post(this.claimUrl, { action: 'claim', worker_id: workerId });
    return this._rowToJob(data && data.job);
  }
  async update(id, patch) {
    await this._post(this.updateUrl, { submission_id: id, patch });
  }
  async reclaimStale(staleMinutes) {
    const data = await this._post(this.claimUrl, { action: 'reclaim_stale', stale_minutes: staleMinutes });
    const rows = (data && Array.isArray(data.jobs)) ? data.jobs : [];
    return rows.map((r) => this._rowToJob(r)).filter(Boolean);
  }
}

// In-memory Supabase stub for --self-test: same method names, no network.
class InMemoryJobsClient {
  constructor(seedJobs) { this.rows = new Map(seedJobs.map((j) => [j.id, { ...j }])); }
  async claimNext(workerId) {
    const eligible = [...this.rows.values()]
      .filter((r) => r.status === 'pending' && (!r.next_attempt_at || new Date(r.next_attempt_at) <= new Date()))
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    if (!eligible.length) return null;
    const row = eligible[0];
    row.status = 'processing'; row.locked_at = new Date().toISOString(); row.locked_by = workerId;
    return { ...row };
  }
  async update(id, patch) {
    const row = this.rows.get(id);
    if (!row) throw new Error(`self-test stub: unknown job id ${id}`);
    Object.assign(row, patch);
  }
  async reclaimStale() { return []; }
}

// Field mapping: existing /audit form answer keys -> Client Research Desk
// field names (ai-company/mvp/form-to-proposal/00-mvp-spec.md §5,
// .claude/commands/client-desk.md). Deterministic rename only, values
// copied verbatim. See README.md for the full documented table.
const FIELD_MAP = {
  'העסק': 'תיאור-עסק', 'הבעיה הכי חשובה': 'הבעיה הדחופה ביותר', 'שם': 'שם מלא', 'אימייל': 'אימייל',
  'מטרה': 'מטרת 3-חודשים', 'יום עבודה': 'תיאור יום-עבודה', 'משימה חוזרת': 'משימה חוזרת מעייפת',
  'מקור לקוחות': 'מקור-לקוחות עיקרי', 'אחרי פנייה': 'תהליך אחרי-פנייה', 'חסר': 'מה הכי חסר', 'דחיפות': 'רמת-דחיפות',
};
const REQUIRED_CLIENT_DESK_FIELDS = ['תיאור-עסק', 'הבעיה הדחופה ביותר', 'שם מלא', 'אימייל'];

function normalizeSubmissionForClientDesk(answers) {
  const out = {};
  for (const [formKey, deskKey] of Object.entries(FIELD_MAP)) {
    const v = answers[formKey];
    if (typeof v === 'string' && v.trim()) out[deskKey] = v.trim();
  }
  const tools = [answers['כלים'], answers['כלים נוספים']].filter((v) => typeof v === 'string' && v.trim());
  if (tools.length) out['כלים בשימוש'] = tools.join(' · ');
  const site = [answers['אתר'], answers['קישור לאתר']].filter((v) => typeof v === 'string' && v.trim());
  if (site.length) out['מצב אתר/נוכחות דיגיטלית'] = site.join(' — ');
  const extras = [];
  for (const key of ['מיקום עבודה', 'שיקרה לבד', 'שאלות חוזרות', 'קשר נוסף']) {
    const v = answers[key];
    if (typeof v === 'string' && v.trim()) extras.push(`${key}: ${v.trim()}`);
  }
  if (extras.length) out['מידע נוסף מהטופס (לא בשדות הרשמיים)'] = extras.join(' · ');
  out['טלפון/וואטסאפ'] = null; // not collected under a reliable label - never guessed.
  const missing = REQUIRED_CLIENT_DESK_FIELDS.filter((k) => !out[k]);
  return { normalized: out, missing };
}

// Headless Claude invocation - proven-safe form reused from
// ../inspiration-inbox/worker.mjs (hard timeout, capped buffer, forbidden-
// shell-character guard instead of trying to escape them).
function runClaudeReal(prompt, tools, timeoutSec, cwd) {
  return new Promise((resolve) => {
    if (/["'`$%|&<>;^]/.test(prompt) || /["'`$%|&<>;^]/.test(tools)) {
      resolve({ code: 198, output: 'PROMPT-SANITY: forbidden shell character', timedOut: false });
      return;
    }
    const cmd = `${cfg.claudeExe} -p "${prompt}" --allowedTools "${tools}" --permission-mode default`;
    let child;
    try { child = spawn(cmd, { shell: true, cwd, windowsHide: true, detached: !isWindows }); }
    catch (e) { resolve({ code: 127, output: `INVOCATION-ERROR: ${e.message}`, timedOut: false }); return; }
    let out = '';
    const CAP = 2 * 1024 * 1024;
    const grab = (d) => { if (out.length < CAP) out += d.toString('utf8'); };
    child.stdout.on('data', grab); child.stderr.on('data', grab);
    let timedOut = false, settled = false, timer = null, fallback = null;
    const finish = (r) => { if (settled) return; settled = true; clearTimeout(timer); clearTimeout(fallback); resolve(r); };
    timer = setTimeout(() => {
      timedOut = true;
      try { if (isWindows) execSync(`taskkill /PID ${child.pid} /T /F`, { stdio: 'ignore' }); else process.kill(-child.pid, 'SIGKILL'); }
      catch { try { child.kill('SIGKILL'); } catch { /* ignore */ } }
      fallback = setTimeout(() => finish({ code: 124, output: `TIMEOUT after ${timeoutSec}s\n${out}`, timedOut: true }), 15000);
    }, timeoutSec * 1000);
    child.on('error', (e) => finish({ code: 127, output: `INVOCATION-ERROR: ${e.message}`, timedOut }));
    child.on('close', (code) => finish({ code: timedOut ? 124 : (code === null ? 1 : code), output: timedOut ? `TIMEOUT after ${timeoutSec}s\n${out}` : out, timedOut }));
  });
}

const PRIVACY_CLAUSE = 'Privacy rules: never include the Windows username, user-profile file paths, API keys, tokens, cookies, client names, or unrelated project names in your output.';

function buildClientDeskPrompt(submissionFilePath) {
  return `/client-desk Input file: ${submissionFilePath} Follow .claude/commands/client-desk.md exactly, including the full client-researcher, client-reviewer sequence. This is a real intake-bridge run, not a fixture. Do not create pricing. Do not create or send a customer-facing proposal. Do not contact the client in any way. Do not commit the generated client report. Set Shani status to pending. ${PRIVACY_CLAUSE}`;
}

// research-report.md validation - light structural + compliance gate. Does
// NOT redo the audit; only confirms the report is well-formed enough to
// hand to Shani, and blocks on an obvious price leak as a last-resort net.
const PRICE_LEAK_RE = /₪\s?\d|\d\s?₪/;

async function validateReport(reportPath) {
  if (!fs.existsSync(reportPath)) return { ok: false, reason: 'report_missing' };
  const s1 = fs.statSync(reportPath);
  if (s1.size === 0) return { ok: false, reason: 'report_empty' };
  await sleep(3000); // stability check - must not still be mid-write
  const s2 = fs.statSync(reportPath);
  if (s1.size !== s2.size || s1.mtimeMs !== s2.mtimeMs) return { ok: false, reason: 'report_not_stable_yet' };
  const text = fs.readFileSync(reportPath, 'utf8');
  if (!/Review status/.test(text)) return { ok: false, reason: 'missing_review_status_section' };
  if (!/Shani status\W{1,10}pending/.test(text)) return { ok: false, reason: 'shani_status_not_pending' };
  if (PRICE_LEAK_RE.test(text)) return { ok: false, reason: 'price_leak_detected' };
  const m = /Review status\W{1,12}\*{0,2}(approved|needs-revision|needs-human-review)/.exec(text);
  return { ok: true, reviewStatus: m ? m[1] : 'unknown' };
}

// Find the one new client-id dir created by this run (mirrors the "exactly
// one new package directory" diff pattern proven in ../inspiration-inbox).
function listClientDirs(clientsDir) {
  if (!fs.existsSync(clientsDir)) return new Set();
  return new Set(fs.readdirSync(clientsDir, { withFileTypes: true }).filter((d) => d.isDirectory() && d.name !== '_fixtures').map((d) => d.name));
}

function errorType(output) {
  if (/timeout/i.test(output)) return 'timeout';
  if (/missing_required_field/.test(output)) return 'validation';
  if (/price_leak_detected/.test(output)) return 'compliance-price-leak';
  return 'general';
}

async function routeFailure(deps, job, stage, output, permanent = false) {
  const attempts = Number(job.attempts || 0) + (permanent ? deps.cfg.maxAttempts : 1);
  const type = errorType(output);
  if (permanent || attempts >= deps.cfg.maxAttempts) {
    await deps.jobs.update(job.id, { status: 'failed', attempts, locked_at: null, locked_by: null, next_attempt_at: null, error_code: type, error_message: sanitize(String(output)).slice(0, 500) });
    const failDir = path.join(DIRS.failed, job.id);
    fs.mkdirSync(failDir, { recursive: true });
    writeText(path.join(failDir, 'error-report.md'), [
      `# Error report - ${job.id}`, '', `- Stage failed: ${stage}`, `- Error type: ${type}`,
      `- Attempts: ${attempts} of ${deps.cfg.maxAttempts}`, `- Timestamp: ${new Date().toISOString()}`,
      '- MANUAL REVIEW REQUIRED: automatic retries exhausted (or permanent error).', '',
      '## Last output (sanitized, truncated)', '```', sanitize(String(output)).slice(-2000), '```', '',
    ].join('\n'));
    log(`FAILED (final): ${job.id} stage=${stage} type=${type} attempts=${attempts}/${deps.cfg.maxAttempts}`);
  } else {
    const nextAttemptAt = new Date(Date.now() + deps.cfg.retryCooldownMin * 60000).toISOString();
    await deps.jobs.update(job.id, { status: 'pending', attempts, locked_at: null, locked_by: null, next_attempt_at: nextAttemptAt, error_code: type, error_message: sanitize(String(output)).slice(0, 500) });
    log(`RETRY-QUEUED: ${job.id} stage=${stage} type=${type} attempt=${attempts}/${deps.cfg.maxAttempts} next_attempt_at=${nextAttemptAt}`);
  }
}

// Per-job flow. `deps` is injectable for --self-test:
//   deps.jobs              SupabaseJobsClient-shaped
//   deps.invokeClientDesk  (submissionPath, timeoutSec, cwd) => {code, output, timedOut}
//   deps.clientsDirRoot    path whose subfolders are client-id dirs
async function processOneJob(deps) {
  const job = await deps.jobs.claimNext(cfg.workerId);
  if (!job) { log('IDLE: no eligible pending job.'); return { picked: false }; }
  log(`PICKED: ${job.id} attempts=${job.attempts || 0}`);
  const jobDir = path.join(DIRS.processing, job.id);
  fs.mkdirSync(jobDir, { recursive: true });
  try {
    const envelope = job.submission_json || {};
    const answers = envelope.answers || {};
    writeJson(path.join(jobDir, 'raw-envelope.json'), envelope);
    const { normalized, missing } = normalizeSubmissionForClientDesk(answers);
    if (missing.length) {
      log(`VALIDATION: ${job.id} missing required fields: ${missing.join(', ')}`);
      await routeFailure(deps, job, 'validation', `missing_required_field: ${missing.join(',')}`, true);
      return { picked: true, outcome: 'failed-validation' };
    }
    const submissionPath = path.join(jobDir, 'submission.json');
    writeJson(submissionPath, normalized);
    const before = listClientDirs(deps.clientsDirRoot);
    log(`DESK: starting for ${job.id} (timeout ${cfg.deskTimeoutSec}s)`);
    const desk = await deps.invokeClientDesk(submissionPath, cfg.deskTimeoutSec, cfg.repoDir);
    writeText(path.join(DIRS.logs, `${job.id}-client-desk-output.log`), sanitize(desk.output));
    log(`DESK: finished for ${job.id} (exit=${desk.code} timedOut=${desk.timedOut})`);
    if (desk.timedOut) { log('DESK: WARNING - hard timeout; checking for a complete report first.'); await sleep(3000); }
    const after = listClientDirs(deps.clientsDirRoot);
    const newDirs = [...after].filter((d) => !before.has(d));
    if (!(desk.code === 0 || desk.timedOut) || newDirs.length !== 1) {
      log(`VALIDATE: exactly one new client dir: FAIL [count=${newDirs.length}, exit=${desk.code}]`);
      await routeFailure(deps, job, 'client-desk', desk.output);
      return { picked: true, outcome: 'failed-desk' };
    }
    const clientId = newDirs[0];
    const reportPath = path.join(deps.clientsDirRoot, clientId, 'research-report.md');
    const verdict = await validateReport(reportPath);
    if (!verdict.ok) {
      log(`VALIDATE: report for ${clientId}: FAIL [${verdict.reason}]`);
      await routeFailure(deps, job, 'report-validation', verdict.reason);
      return { picked: true, outcome: 'failed-report-validation' };
    }
    const finalStatus = verdict.reviewStatus === 'approved' ? 'ready' : 'needs_shani';
    const relativeReportPath = path.relative(cfg.repoDir, reportPath).split(path.sep).join('/');
    await deps.jobs.update(job.id, {
      status: finalStatus, client_id: clientId, report_path: relativeReportPath, review_status: verdict.reviewStatus,
      shani_status: 'pending', locked_at: null, locked_by: null, next_attempt_at: null, error_code: null, error_message: null,
    });
    const outDir = path.join(DIRS[finalStatus], job.id);
    fs.mkdirSync(outDir, { recursive: true });
    fs.copyFileSync(submissionPath, path.join(outDir, 'submission.json'));
    writeText(path.join(outDir, 'STATUS.md'), [
      `# Job status - ${job.id}`, '', `- client_id: ${clientId}`, `- report_path (in repo, uncommitted): ${relativeReportPath}`,
      `- Review status: ${verdict.reviewStatus}`, '- Shani status: pending  <-- only Shani may change this.',
      '- No report content is stored here or in Supabase - only this status metadata.',
      '- Nothing has been priced, proposed, or sent to the client.', '',
    ].join('\n'));
    fs.rmSync(jobDir, { recursive: true, force: true });
    log(`${finalStatus.toUpperCase()}: ${job.id} -> client_id=${clientId} review_status=${verdict.reviewStatus}`);
    return { picked: true, outcome: finalStatus, clientId, reviewStatus: verdict.reviewStatus };
  } catch (e) {
    log(`ERROR: ${job.id} unexpected exception: ${e && e.message}`);
    await routeFailure(deps, job, 'unexpected-exception', String((e && e.stack) || e));
    return { picked: true, outcome: 'failed-exception' };
  }
}

async function reclaimStaleProcessing(deps) {
  let stale = [];
  try { stale = await deps.jobs.reclaimStale(cfg.lockStaleMin); } catch (e) { log(`RECLAIM: check failed: ${e.message}`); return; }
  for (const row of stale) {
    log(`RECOVERY: stale processing job ${row.id} (locked_by=${row.locked_by}) - routing as failed attempt.`);
    await routeFailure(deps, row, 'crash-recovery', 'Worker did not complete (stale lock found in processing).');
  }
}

// Single-instance lock around a real run (mirrors ../inspiration-inbox).
async function runOnce(deps) {
  let lockFd = null;
  try {
    try { lockFd = fs.openSync(LOCK_PATH, 'wx'); fs.writeSync(lockFd, `pid=${process.pid} started=${new Date().toISOString()}`); }
    catch (e) {
      if (e.code !== 'EEXIST') throw e;
      const ageMin = (Date.now() - fs.statSync(LOCK_PATH).mtime.getTime()) / 60000;
      if (ageMin > cfg.lockStaleMin) {
        log(`LOCK: stale lock (${Math.floor(ageMin)} min) - removing and continuing.`);
        fs.rmSync(LOCK_PATH, { force: true });
        lockFd = fs.openSync(LOCK_PATH, 'wx'); fs.writeSync(lockFd, `pid=${process.pid} started=${new Date().toISOString()}`);
      } else { log('LOCK: another worker instance is running - exiting safely.'); return; }
    }
    await reclaimStaleProcessing(deps);
    await processOneJob(deps);
  } finally {
    if (lockFd !== null) { try { fs.closeSync(lockFd); } catch { /* ignore */ } fs.rmSync(LOCK_PATH, { force: true }); }
  }
}

// ================================================================
// --self-test: no network, no real Claude invocation, no real Supabase
// project, no real ai-company/clients/ writes. Verifies worker LOGIC only.
// ================================================================
async function selfTest() {
  const results = [];
  const check = (name, ok, detail = '') => results.push({ name, ok, detail });
  const fakeClientsRoot = fs.mkdtempSync(path.join(cfg.baseDir, 'fake-clients-'));
  const repoBefore = fs.existsSync(cfg.repoDir) ? new Set(fs.readdirSync(cfg.repoDir)) : new Set();

  function seedJob(id) {
    return {
      id, created_at: new Date(Date.now() - 60000).toISOString(), status: 'pending', attempts: 0, next_attempt_at: null,
      submission_json: {
        submissionId: `AUDIT-selftest-${id}`, receivedAt: new Date().toISOString(), source: 'website-audit', payloadVersion: 1,
        answers: { 'העסק': 'עסק בדיקה סינתטי', 'הבעיה הכי חשובה': 'בעיה סינתטית לבדיקה', 'שם': 'בדיקה אוטומטית', 'אימייל': 'selftest@example.com' },
      },
    };
  }

  { // A: usable report, approved -> ready
    const jobs = new InMemoryJobsClient([seedJob('job-approved')]);
    let invokeCalls = 0; const capturedPrompts = [];
    const deps = {
      jobs, clientsDirRoot: fakeClientsRoot, cfg,
      invokeClientDesk: async (submissionPath) => {
        invokeCalls++; capturedPrompts.push(buildClientDeskPrompt(submissionPath));
        const clientDir = path.join(fakeClientsRoot, 'CLI-20260101-selftest-approved');
        fs.mkdirSync(clientDir, { recursive: true });
        fs.writeFileSync(path.join(clientDir, 'research-report.md'), '# research-report.md\n\n## Review status: **approved**\n\n## Shani status: **pending**\n');
        return { code: 0, output: 'ok', timedOut: false };
      },
    };
    const r = await processOneJob(deps);
    check('A: job acquired', r.picked === true);
    check('A: Client Desk invoked exactly once', invokeCalls === 1, `invokeCalls=${invokeCalls}`);
    check('A: prompt references /client-desk', /\/client-desk/.test(capturedPrompts[0] || ''));
    check('A: prompt forbids pricing/proposal/contact', /Do not create pricing/.test(capturedPrompts[0]) && /Do not.*proposal/.test(capturedPrompts[0]) && /Do not contact the client/.test(capturedPrompts[0]));
    check('A: outcome is ready', r.outcome === 'ready', `outcome=${r.outcome}`);
    check('A: Supabase row updated to ready', jobs.rows.get('job-approved').status === 'ready');
    check('A: shani_status left pending', jobs.rows.get('job-approved').shani_status === 'pending');
    check('A: review_status recorded as approved', jobs.rows.get('job-approved').review_status === 'approved');
    check('A: report_path stored, not report content', typeof jobs.rows.get('job-approved').report_path === 'string' && !('report_content' in jobs.rows.get('job-approved')));
    check('A: pending job acquired only once', (await jobs.claimNext('x')) === null);
  }

  { // B: usable report, needs-revision -> needs_shani
    const jobs = new InMemoryJobsClient([seedJob('job-needs-revision')]);
    const deps = {
      jobs, clientsDirRoot: fakeClientsRoot, cfg,
      invokeClientDesk: async () => {
        const clientDir = path.join(fakeClientsRoot, 'CLI-20260101-selftest-needsrev');
        fs.mkdirSync(clientDir, { recursive: true });
        fs.writeFileSync(path.join(clientDir, 'research-report.md'), '# research-report.md\n\n## Review status: **needs-revision**\n\n## Shani status: **pending**\n');
        return { code: 0, output: 'ok', timedOut: false };
      },
    };
    const r = await processOneJob(deps);
    check('B: outcome is needs_shani', r.outcome === 'needs_shani', `outcome=${r.outcome}`);
    check('B: Supabase row updated to needs_shani', jobs.rows.get('job-needs-revision').status === 'needs_shani');
  }

  { // C: price leak in report -> treated as a failure, never ready/needs_shani
    const jobs = new InMemoryJobsClient([seedJob('job-price-leak')]);
    const deps = {
      jobs, clientsDirRoot: fakeClientsRoot, cfg,
      invokeClientDesk: async () => {
        const clientDir = path.join(fakeClientsRoot, 'CLI-20260101-selftest-priceleak');
        fs.mkdirSync(clientDir, { recursive: true });
        fs.writeFileSync(path.join(clientDir, 'research-report.md'), '# research-report.md\n\nמחיר: ₪450\n\n## Review status: **approved**\n\n## Shani status: **pending**\n');
        return { code: 0, output: 'ok', timedOut: false };
      },
    };
    const r = await processOneJob(deps);
    check('C: price leak blocks ready/needs_shani', r.outcome !== 'ready' && r.outcome !== 'needs_shani', `outcome=${r.outcome}`);
    check('C: job requeued as pending (attempt 1 of 3), not silently discarded', jobs.rows.get('job-price-leak').status === 'pending');
  }

  { // D: bounded retry -> failed after max attempts
    const jobs = new InMemoryJobsClient([seedJob('job-always-fails')]);
    const deps = { jobs, clientsDirRoot: fakeClientsRoot, cfg, invokeClientDesk: async () => ({ code: 1, output: 'simulated permanent Client Desk error', timedOut: false }) };
    let last;
    for (let i = 0; i < cfg.maxAttempts; i++) {
      const row = jobs.rows.get('job-always-fails'); row.status = 'pending'; row.next_attempt_at = null;
      last = await processOneJob(deps);
    }
    check('D: bounded retry reaches failed after max attempts', jobs.rows.get('job-always-fails').status === 'failed');
    check('D: attempts recorded == maxAttempts', jobs.rows.get('job-always-fails').attempts === cfg.maxAttempts, `attempts=${jobs.rows.get('job-always-fails').attempts}`);
    check('D: last outcome reported as a failure', last.outcome !== 'ready' && last.outcome !== 'needs_shani');
  }

  { // E: no outbound-communication code paths. Tokens built by concatenation
    // on purpose so this check does not trivially match its own token list.
    const src = fs.readFileSync(new URL(import.meta.url), 'utf8');
    const forbidden = ['node' + 'mailer', 'twi' + 'lio', 'send' + 'Email', 'send' + 'WhatsApp', 'send' + 'Proposal', 'api.whatsapp.com/' + 'send', 's' + 'mtp'];
    const found = forbidden.filter((tok) => src.toLowerCase().includes(tok.toLowerCase()));
    check('E: no outbound customer-communication code present in this file', found.length === 0, found.join(','));
  }

  { // F: runtime stays outside Git
    const outsideRepo = !path.resolve(cfg.baseDir).startsWith(path.resolve(cfg.repoDir) + path.sep) && path.resolve(cfg.baseDir) !== path.resolve(cfg.repoDir);
    check('F: runtime baseDir resolves outside the Git repo dir', outsideRepo, cfg.baseDir);
    const repoAfter = fs.existsSync(cfg.repoDir) ? new Set(fs.readdirSync(cfg.repoDir)) : new Set();
    const repoUntouched = repoAfter.size === repoBefore.size && [...repoAfter].every((f) => repoBefore.has(f));
    check('F: repo directory top level untouched by self-test', repoUntouched);
  }

  fs.rmSync(fakeClientsRoot, { recursive: true, force: true });
  const failed = results.filter((r) => !r.ok);
  for (const r of results) console.log(`  ${r.ok ? 'PASS' : 'FAIL'} - ${r.name}${r.detail ? ` [${r.detail}]` : ''}`);
  console.log(`\nSELF-TEST: ${failed.length === 0 ? 'PASS' : 'FAIL'} (${results.length - failed.length}/${results.length} checks passed)`);
  fs.rmSync(cfg.baseDir, { recursive: true, force: true });
  process.exitCode = failed.length === 0 ? 0 : 1;
}

// ---- Entry point ----
if (SELF_TEST) {
  selfTest();
} else {
  // Queue provider selection. Default: 'n8n-sheets' when its env is present,
  // otherwise 'supabase' (original behavior). Override with QUEUE_PROVIDER.
  const provider = (process.env.QUEUE_PROVIDER
    || (process.env.N8N_QUEUE_CLAIM_URL ? 'n8n-sheets' : 'supabase')).toLowerCase();
  const jobs = (() => {
    try {
      if (provider === 'n8n-sheets') {
        return new N8nSheetsJobsClient(process.env.N8N_QUEUE_CLAIM_URL,
          process.env.N8N_QUEUE_UPDATE_URL, process.env.N8N_QUEUE_SECRET);
      }
      return new SupabaseJobsClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    } catch (e) {
      log(`CONFIG (provider=${provider}): ${e.message}. Set it via a real Windows env var or ${path.join(cfg.baseDir, '.env')} (see README.md). Exiting.`);
      process.exit(2);
    }
  })();
  log(`QUEUE: provider=${provider}`);
  const deps = {
    jobs, clientsDirRoot: path.join(cfg.repoDir, 'ai-company', 'clients'), cfg,
    invokeClientDesk: (submissionPath, timeoutSec, cwd) => runClaudeReal(buildClientDeskPrompt(submissionPath), 'Task,Read,Write,Grep,Glob,WebSearch,WebFetch', timeoutSec, cwd),
  };
  runOnce(deps);
}

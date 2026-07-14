#!/usr/bin/env node
/* ============================================================
 * Inspiration Inbox Worker V1 - Shani AI Company
 *
 * Watches an external queue of Instagram Reel references, runs the
 * locally installed /watch capability headlessly, then invokes the
 * existing Inspiration-led Content Desk (/content-desk) which runs
 * Researcher -> Creator -> Reviewer. Produces a package for Shani.
 *
 * NEVER publishes, schedules, or sends anything.
 * Shani status is always "pending" - only Shani changes it.
 *
 * Implementation language: Node (repository convention - this is a
 * Node/Next.js repo and Claude Code itself requires Node), zero deps.
 *
 * Queue root (outside Git): C:\Users\gorgo\ShaniAI\inspiration-inbox\
 *   pending\     new reference items (JSON, UTF-8)
 *   processing\  the single item currently being worked on
 *   ready\       completed packages, one folder per item
 *   failed\      items that exhausted retries + error reports
 *   logs\        worker logs (sanitized)
 *   analyses\    saved /watch reference analyses (Markdown)
 *
 * Run once:      node worker.mjs
 * Add an item:   node worker.mjs --add --url "https://www.instagram.com/reel/XXXX/"
 *                  [--account "@handle"] [--liked "..."] [--topic "..."]
 *                  [--business "..."] [--faceless yes|no]
 * ============================================================ */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn, execSync } from 'node:child_process';

const isWindows = process.platform === 'win32';

// ------------------------------------------------------------
// CLI arguments
// ------------------------------------------------------------
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

const cfg = {
  baseDir: String(args['base-dir'] || 'C:\\Users\\gorgo\\ShaniAI\\inspiration-inbox'),
  repoDir: String(args['repo-dir'] || 'C:\\Projects\\shifted-tech-inspiration-worker'),
  claudeExe: String(args['claude-exe'] || 'claude'),
  watchTimeoutSec: Number(args['watch-timeout-sec'] || 900),   // hard 15 min (spec)
  // Documented V1 value: research + creation + independent review with fresh
  // source re-verification routinely exceeds the ~8 min of /watch alone.
  deskTimeoutSec: Number(args['desk-timeout-sec'] || 2700),    // hard 45 min
  maxAttempts: Number(args['max-attempts'] || 3),
  retryCooldownMin: Number(args['retry-cooldown-min'] || 30),
  dailyCap: Number(args['daily-cap'] || 3),
  lockStaleMin: Number(args['lock-stale-min'] || 75),          // watch 15 + desk 45 + buffer
};

const DIRS = {};
for (const name of ['pending', 'processing', 'ready', 'failed', 'logs', 'analyses']) {
  DIRS[name] = path.join(cfg.baseDir, name);
  fs.mkdirSync(DIRS[name], { recursive: true });
}
const LOCK_PATH = path.join(cfg.baseDir, 'worker.lock');
const LOG_FILE = path.join(DIRS.logs, `worker-${stamp('date')}.log`);

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
function stamp(kind) {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  const date = `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
  if (kind === 'date') return date;
  return `${date}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

function sanitize(text) {
  let t = String(text == null ? '' : text);
  let user = '';
  try { user = os.userInfo().username; } catch { /* ignore */ }
  if (user) t = t.split(user).join('<user>');
  t = t.replace(/gsk_[A-Za-z0-9_-]{8,}/g, '<groq-key-redacted>');
  t = t.replace(/sk-ant-[A-Za-z0-9_-]{8,}/g, '<api-key-redacted>');
  t = t.replace(/(authorization|cookie|token|api[_-]?key)\s*[:=]\s*\S+/gi, '$1: <redacted>');
  return t;
}

function log(msg) {
  const line = `[${new Date().toISOString()}] ${sanitize(msg)}`;
  fs.appendFileSync(LOG_FILE, line + '\n', 'utf8');
  console.log(line);
}

function writeText(file, text) { fs.writeFileSync(file, text, 'utf8'); }
function writeJson(file, obj) { writeText(file, JSON.stringify(obj, null, 2)); }

function readItem(file) {
  const item = JSON.parse(fs.readFileSync(file, 'utf8'));
  const defaults = {
    referenceAccount: '', whatShaniLiked: '', desiredTopic: '',
    businessConnection: '', faceless: true, attempts: 0,
    lastAttemptAt: '', lastError: '', status: 'pending',
  };
  for (const [k, v] of Object.entries(defaults)) if (!(k in item)) item[k] = v;
  return item;
}

function isInstagramUrl(u) { return /^https:\/\/(www\.)?instagram\.com\//.test(String(u || '')); }

const PRIVACY_CLAUSE =
  'Privacy rules: never include the Windows username, user-profile file paths, API keys, ' +
  'tokens, cookies, client names, or unrelated project names in your output.';

// ------------------------------------------------------------
// Add mode: enqueue a reference and exit
// ------------------------------------------------------------
if (args.add) {
  const url = String(args.url || '');
  if (!isInstagramUrl(url)) {
    console.error(`ERROR: --url must be an https://instagram.com/ URL. Got: ${url}`);
    process.exit(2);
  }
  const id = `REF-${stamp()}-${Math.random().toString(36).slice(2, 6)}`;
  const item = {
    id,
    referenceUrl: url,
    referenceAccount: String(args.account || ''),
    whatShaniLiked: String(args.liked || ''),
    desiredTopic: String(args.topic || ''),
    businessConnection: String(args.business || ''),
    faceless: String(args.faceless || 'yes') !== 'no',
    createdAt: new Date().toISOString(),
    status: 'pending',
    attempts: 0,
    lastAttemptAt: '',
    lastError: '',
  };
  const file = path.join(DIRS.pending, `${id}.json`);
  writeJson(file, item);
  log(`ADD: queued ${id} -> ${file}`);
  console.log(`Queued: ${file}`);
  process.exit(0);
}

// ------------------------------------------------------------
// Headless Claude invocation with a hard timeout.
// Proven working form on this machine:
//   claude -p "/watch <url> ..." --allowedTools Bash,Read,Glob,Grep,WebFetch --permission-mode default
// ------------------------------------------------------------
function runClaude(prompt, tools, timeoutSec, cwd) {
  return new Promise((resolve) => {
    // The prompt travels on a real command line: refuse shell metacharacters
    // instead of trying to escape them. Worker-built prompts are ASCII-safe.
    if (/["'`$%|&<>;^]/.test(prompt) || /["'`$%|&<>;^]/.test(tools)) {
      resolve({ code: 198, output: 'PROMPT-SANITY: forbidden shell character in prompt/tools', timedOut: false });
      return;
    }
    const cmd = `${cfg.claudeExe} -p "${prompt}" --allowedTools "${tools}" --permission-mode default`;
    let child;
    try {
      child = spawn(cmd, { shell: true, cwd, windowsHide: true, detached: !isWindows });
    } catch (e) {
      resolve({ code: 127, output: `INVOCATION-ERROR: ${e.message}`, timedOut: false });
      return;
    }
    let out = '';
    const CAP = 2 * 1024 * 1024;
    const grab = (d) => { if (out.length < CAP) out += d.toString('utf8'); };
    child.stdout.on('data', grab);
    child.stderr.on('data', grab);

    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      try {
        if (isWindows) execSync(`taskkill /PID ${child.pid} /T /F`, { stdio: 'ignore' });
        else process.kill(-child.pid, 'SIGKILL');
      } catch { try { child.kill('SIGKILL'); } catch { /* ignore */ } }
    }, timeoutSec * 1000);

    child.on('error', (e) => {
      clearTimeout(timer);
      resolve({ code: 127, output: `INVOCATION-ERROR: ${e.message}`, timedOut });
    });
    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({ code: timedOut ? 124 : (code === null ? 1 : code), output: timedOut ? `TIMEOUT after ${timeoutSec}s\n${out}` : out, timedOut });
    });
  });
}

// ------------------------------------------------------------
// Failure routing (max 3 attempts, >=30 min cooldown, reports)
// ------------------------------------------------------------
function errorType(output) {
  if (/cookie|log ?in|sign ?in|authenticat|session expired|401|403|rate.?limit/i.test(output)) return 'auth-or-cookies';
  if (/^TIMEOUT/.test(output)) return 'timeout';
  return 'general';
}

function moveToFailed(item, processingPath, stage, output, analysisPath) {
  item.status = 'failed';
  item.lastError = sanitize(output).slice(0, 500);
  writeJson(path.join(DIRS.failed, `${item.id}.json`), item);
  fs.rmSync(processingPath, { force: true });

  const tail = sanitize(output).split('\n').slice(-40).join('\n');
  const afterAnalysis = stage === 'content-desk' && analysisPath
    ? `- NOTE: failure occurred AFTER a successful /watch analysis.\n- Completed analysis preserved at: ${analysisPath}`
    : '- No reference analysis was used (Content Desk was NOT invoked on invented data; nothing was guessed).';
  writeText(path.join(DIRS.failed, `${item.id}-error.md`), [
    `# Error report - ${item.id}`, '',
    `- Stage failed: ${stage}`,
    `- Error type: ${errorType(output)}`,
    `- Attempts: ${item.attempts} of ${cfg.maxAttempts}`,
    `- Timestamp: ${new Date().toISOString()}`,
    `- Reference URL: ${item.referenceUrl}`,
    '- MANUAL REVIEW REQUIRED: automatic retries exhausted (or permanent error).',
    afterAnalysis, '',
    '## Last output (sanitized)', '```', tail, '```', '',
  ].join('\n'));
  log(`FAILED (final): ${item.id} stage=${stage} type=${errorType(output)} -> failed/`);
}

function routeFailure(item, processingPath, stage, output, analysisPath = '') {
  item.attempts = Number(item.attempts || 0) + 1;
  item.lastAttemptAt = new Date().toISOString();
  // Auth/cookie failures are never retried again within the same run - the
  // run always ends after one attempt; retries wait for the normal cooldown.
  if (item.attempts >= cfg.maxAttempts) {
    moveToFailed(item, processingPath, stage, output, analysisPath);
  } else {
    item.status = 'pending';
    item.lastError = sanitize(`${stage}/${errorType(output)}: ${String(output).slice(0, 300)}`);
    writeJson(path.join(DIRS.pending, `${item.id}.json`), item);
    fs.rmSync(processingPath, { force: true });
    log(`RETRY-QUEUED: ${item.id} stage=${stage} type=${errorType(output)} attempt=${item.attempts}/${cfg.maxAttempts} (cooldown ${cfg.retryCooldownMin} min)`);
  }
}

// ------------------------------------------------------------
// Main
// ------------------------------------------------------------
async function main() {
  // ---- Daily cap: max completed packages per calendar day ----
  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  let doneToday = 0;
  for (const dir of fs.readdirSync(DIRS.ready, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    const f = path.join(DIRS.ready, dir.name, 'item.json');
    if (fs.existsSync(f) && fs.statSync(f).mtime >= todayStart) doneToday++;
  }
  if (doneToday >= cfg.dailyCap) {
    log(`CAP: ${doneToday} packages completed today (cap ${cfg.dailyCap}) - exiting.`);
    return;
  }

  // ---- Crash recovery: stale items stuck in processing ----
  for (const name of fs.readdirSync(DIRS.processing)) {
    if (!name.endsWith('.json')) continue;
    const p = path.join(DIRS.processing, name);
    const ageMin = (Date.now() - fs.statSync(p).mtime.getTime()) / 60000;
    if (ageMin > cfg.lockStaleMin) {
      const stale = readItem(p);
      log(`RECOVERY: stale processing item ${stale.id} - routing as failed attempt.`);
      routeFailure(stale, p, 'crash-recovery', 'Worker did not complete (stale item found in processing).');
    }
  }

  // ---- Pick exactly one eligible pending item (oldest first) ----
  const pendingFiles = fs.readdirSync(DIRS.pending)
    .filter((n) => n.endsWith('.json'))
    .map((n) => path.join(DIRS.pending, n))
    .sort((a, b) => fs.statSync(a).mtimeMs - fs.statSync(b).mtimeMs);

  let item = null; let pendingPath = '';
  for (const f of pendingFiles) {
    let it;
    try { it = readItem(f); } catch {
      log(`PARSE-ERROR: ${path.basename(f)} is not valid JSON - moving to failed.`);
      const dest = path.join(DIRS.failed, path.basename(f));
      fs.renameSync(f, dest);
      writeText(dest.replace(/\.json$/, '-error.md'),
        `# Error report\n- Stage failed: queue-parse\n- Timestamp: ${new Date().toISOString()}\n- Invalid JSON; fix the file and re-add it to pending.\n`);
      continue;
    }
    if (it.lastAttemptAt) {
      const min = (Date.now() - Date.parse(it.lastAttemptAt)) / 60000;
      if (min < cfg.retryCooldownMin) {
        log(`COOLDOWN: ${it.id} last attempt ${Math.floor(min)} min ago - skipping.`);
        continue;
      }
    }
    item = it; pendingPath = f; break;
  }
  if (!item) { log('IDLE: no eligible pending items.'); return; }

  const processingPath = path.join(DIRS.processing, path.basename(pendingPath));
  fs.renameSync(pendingPath, processingPath); // atomic on the same volume
  item.status = 'processing';
  writeJson(processingPath, item);
  log(`PICKED: ${item.id} url=${item.referenceUrl}`);

  if (!isInstagramUrl(item.referenceUrl)) {
    item.attempts = cfg.maxAttempts; // permanent - no retry
    moveToFailed(item, processingPath, 'validation', 'Invalid referenceUrl - must be an instagram.com URL.', '');
    return;
  }

  // ---- Step 1: headless /watch (fail => NO Content Desk, NO invention) ----
  const watchPrompt =
    `/watch ${item.referenceUrl} ` +
    'Produce a complete written reference analysis of this reel for content-inspiration purposes. ' +
    'Include as far as observable: core idea, core promise, hook, total duration, scene-by-scene ' +
    'timeline with timestamps, what is shown on screen in each scene, all on-screen text, spoken ' +
    'narration or full transcript, pacing and cuts, transitions, screen demos, CTA, curiosity ' +
    'mechanism, why this reel likely performs well, and a separate list of factual claims that ' +
    'would require independent verification. Explicitly list any field you could not determine - ' +
    'do not guess missing fields. ' + PRIVACY_CLAUSE;

  log(`WATCH: starting (timeout ${cfg.watchTimeoutSec}s)`);
  const watch = await runClaude(watchPrompt, 'Bash,Read,Glob,Grep,WebFetch', cfg.watchTimeoutSec, cfg.baseDir);
  const watchOk = watch.code === 0 && !watch.timedOut && watch.output.trim().length >= 300;
  if (!watchOk) {
    log(`WATCH: failed (exit=${watch.code} timedOut=${watch.timedOut} len=${watch.output.trim().length})`);
    routeFailure(item, processingPath, 'watch', watch.output);
    return;
  }

  const analysisPath = path.join(DIRS.analyses, `${item.id}-analysis.md`);
  writeText(analysisPath,
    `# Reference analysis - ${item.id}\n- Source: ${item.referenceUrl}\n- Analyzed: ${new Date().toISOString()}\n\n` +
    sanitize(watch.output));
  log(`WATCH: ok - analysis saved to ${analysisPath}`);

  // ---- Step 2: existing Inspiration-led Content Desk ----
  // (Researcher -> Creator -> Reviewer per .claude/commands/content-desk.md)
  const packagesDir = path.join(cfg.repoDir, 'marketing-engine', 'packages');
  const beforePkgs = new Set(
    fs.existsSync(packagesDir)
      ? fs.readdirSync(packagesDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
      : []);

  const requestLines = ['Mode: Inspiration-led'];
  if (item.desiredTopic) requestLines.push(`Topic: ${item.desiredTopic}`);
  requestLines.push('Platforms: Instagram + LinkedIn');
  requestLines.push('Preferred format: choose for me');
  requestLines.push(`Reference URL: ${item.referenceUrl}`);
  requestLines.push(`Reference analysis: ${analysisPath}`);
  if (item.referenceAccount) requestLines.push(`Reference account: ${item.referenceAccount}`);
  if (item.whatShaniLiked) requestLines.push(`What Shani liked: ${item.whatShaniLiked}`);
  if (item.desiredTopic || item.businessConnection) {
    requestLines.push(`Desired Shani AI topic / Business connection: ${[item.desiredTopic, item.businessConnection].filter(Boolean).join(' - ')}`);
  }
  requestLines.push(`Faceless: ${item.faceless ? 'yes' : 'no'}`);
  requestLines.push(
    'Additional context: Automated run by the local Inspiration Inbox Worker. ' +
    'Never publish, schedule, or send anything. Keep Review status and Shani status strictly ' +
    'separate; Shani status must be pending. Do not reproduce the full local path of the ' +
    'reference analysis file in any output. ' + PRIVACY_CLAUSE);
  const requestPath = path.join(DIRS.processing, `${item.id}-request.md`);
  writeText(requestPath, requestLines.join('\n') + '\n');

  const deskPrompt =
    `/content-desk Read the request file at ${requestPath} and treat its contents as the exact ` +
    'request fields for this command. Follow .claude/commands/content-desk.md exactly, including ' +
    'the full Researcher, Creator, Reviewer sequence. Never publish, schedule, or send anything. ' +
    'Keep Review status and Shani status strictly separate and set Shani status to pending.';

  log(`DESK: starting (timeout ${cfg.deskTimeoutSec}s)`);
  const desk = await runClaude(deskPrompt, 'Task,Skill,Read,Write,Edit,Grep,Glob,WebSearch,WebFetch',
    cfg.deskTimeoutSec, cfg.repoDir);

  const newPkgDirs = fs.existsSync(packagesDir)
    ? fs.readdirSync(packagesDir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !beforePkgs.has(d.name))
      .filter((d) => fs.existsSync(path.join(packagesDir, d.name, 'content-desk-package.md')))
      .map((d) => d.name)
    : [];
  const deskOk = desk.code === 0 && !desk.timedOut && newPkgDirs.length >= 1;
  if (!deskOk) {
    log(`DESK: failed (exit=${desk.code} timedOut=${desk.timedOut} newPackages=${newPkgDirs.length}) - analysis preserved.`);
    fs.rmSync(requestPath, { force: true });
    routeFailure(item, processingPath, 'content-desk', desk.output, analysisPath);
    return;
  }

  // ---- Step 3: assemble the human-ready package under ready/<id>/ ----
  const readyDir = path.join(DIRS.ready, item.id);
  fs.mkdirSync(readyDir, { recursive: true });
  for (const name of newPkgDirs) {
    fs.cpSync(path.join(packagesDir, name), path.join(readyDir, name), { recursive: true });
  }
  fs.copyFileSync(analysisPath, path.join(readyDir, path.basename(analysisPath)));
  writeText(path.join(readyDir, 'STATUS.md'), [
    `# Package status - ${item.id}`, '',
    "- Review status: see 'Independent review' inside content-desk-package.md (set by the Reviewer stage only).",
    '- Shani status: pending  <-- only Shani may change this. The worker never sets anything else.',
    '- Nothing has been published, scheduled, or sent. This package is ready for Shani review only.',
    `- Repo copy: marketing-engine/packages/${newPkgDirs[0]}/ (left uncommitted for Shani review).`, '',
  ].join('\n'));

  item.status = 'ready';
  item.completedAt = new Date().toISOString();
  item.analysisPath = analysisPath;
  item.packageDir = readyDir;
  writeJson(path.join(readyDir, 'item.json'), item);
  fs.rmSync(processingPath, { force: true });
  fs.rmSync(requestPath, { force: true });
  log(`READY: ${item.id} -> ${readyDir} (package: ${newPkgDirs[0]}); Shani status: pending`);
}

// ------------------------------------------------------------
// Single-instance lock around main()
// ------------------------------------------------------------
let lockFd = null;
try {
  try {
    lockFd = fs.openSync(LOCK_PATH, 'wx');
    fs.writeSync(lockFd, `pid=${process.pid} started=${new Date().toISOString()}`);
  } catch (e) {
    if (e.code !== 'EEXIST') throw e;
    const ageMin = (Date.now() - fs.statSync(LOCK_PATH).mtime.getTime()) / 60000;
    if (ageMin > cfg.lockStaleMin) {
      log(`LOCK: stale lock (${Math.floor(ageMin)} min) - removing and continuing.`);
      fs.rmSync(LOCK_PATH, { force: true });
      lockFd = fs.openSync(LOCK_PATH, 'wx');
      fs.writeSync(lockFd, `pid=${process.pid} started=${new Date().toISOString()}`);
    } else {
      log('LOCK: another worker instance is running - exiting safely.');
      process.exit(0);
    }
  }
  await main();
} finally {
  if (lockFd !== null) {
    try { fs.closeSync(lockFd); } catch { /* ignore */ }
    fs.rmSync(LOCK_PATH, { force: true });
  }
}

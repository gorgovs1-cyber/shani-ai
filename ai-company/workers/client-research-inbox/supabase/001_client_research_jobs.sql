-- Client Research intake bridge — cloud queue schema (V1)
-- Run this once in the existing Supabase project: SQL Editor > New query > paste > Run.
--
-- Purpose: minimal cloud-to-local handoff queue between n8n Cloud (which inserts
-- one row per validated /audit form submission) and the local Windows runner
-- (ai-company/workers/client-research-inbox/worker.mjs), which claims a row,
-- runs the existing, already-accepted Client Research Desk V1
-- (client-researcher -> client-reviewer -> research-report.md) locally, and
-- writes the result status back here.
--
-- V1 explicitly does NOT store generated report content here — only the local
-- report path and status fields. The report itself stays on disk under
-- ai-company/clients/<client-id>/ (uncommitted), exactly as the existing
-- Client Research Desk V1 already produces it.

create table if not exists public.client_research_jobs (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),

  -- pending: inserted by n8n, not yet picked up.
  -- processing: claimed by the local runner (see locked_at/locked_by).
  -- ready: usable research-report.md exists, Review status = approved.
  -- needs_shani: usable research-report.md exists, but Review status is
  --   needs-revision / needs-human-review / anything other than approved —
  --   this is a normal, valid outcome, not a worker failure.
  -- failed: bounded retries exhausted, or a permanent/validation error.
  status           text not null default 'pending'
                     check (status in ('pending', 'processing', 'ready', 'failed', 'needs_shani')),

  -- Full original form envelope (submissionId, receivedAt, source,
  -- payloadVersion, answers) exactly as produced by /api/audit/intake and
  -- forwarded through n8n. Answers are preserved verbatim — never edited here.
  submission_json  jsonb not null,

  -- Which intake channel created this job. V1 has exactly one channel.
  source           text not null default 'audit-form',

  attempts         integer not null default 0,

  -- Claim/lock bookkeeping for the local runner (one job at a time, V1).
  locked_at        timestamptz,
  locked_by        text,

  -- Earliest time this job may be claimed again after a failed attempt.
  -- null means "eligible now" (subject to status = 'pending').
  next_attempt_at  timestamptz,

  -- Filled in by the local runner once the Client Research Desk assigns one
  -- (format CLI-YYYYMMDD-<slug>, per .claude/commands/client-desk.md).
  client_id        text,

  -- Local filesystem path only (e.g.
  -- ai-company/clients/CLI-20260715-example/research-report.md).
  -- Never the report content itself — V1 does not store client report
  -- content in Supabase.
  report_path      text,

  -- Verbatim value from the "Review status" line in research-report.md
  -- (approved / needs-revision / needs-human-review). Set by the Reviewer
  -- stage only, mirrored here for visibility — never written by n8n.
  review_status    text,

  -- Always 'pending' until Shani herself changes it elsewhere. The runner
  -- never sets this to anything else.
  shani_status     text not null default 'pending',

  error_code       text,
  error_message    text
);

-- Efficient polling: the runner's claim query filters on
-- status = 'pending' and orders by created_at. A partial index keeps this
-- cheap regardless of how many ready/failed/processing rows accumulate.
create index if not exists client_research_jobs_pending_idx
  on public.client_research_jobs (created_at)
  where status = 'pending';

-- Efficient stale-lock recovery: the runner looks for rows stuck in
-- 'processing' older than its stale-lock threshold.
create index if not exists client_research_jobs_processing_idx
  on public.client_research_jobs (locked_at)
  where status = 'processing';

create index if not exists client_research_jobs_status_idx
  on public.client_research_jobs (status);

-- Keep updated_at accurate on every write (mirrors the pattern already used
-- elsewhere in this project's Supabase usage).
create or replace function public.client_research_jobs_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists client_research_jobs_set_updated_at on public.client_research_jobs;
create trigger client_research_jobs_set_updated_at
  before update on public.client_research_jobs
  for each row
  execute function public.client_research_jobs_touch_updated_at();

-- Atomic claim: the local runner calls this via
-- POST {SUPABASE_URL}/rest/v1/rpc/claim_next_client_research_job
-- with { "p_worker_id": "<hostname-or-label>" }. SELECT ... FOR UPDATE SKIP
-- LOCKED plus an immediate UPDATE inside one function call, executed inside
-- the single transaction PostgREST already wraps each RPC call in, is what
-- makes this safe against a second poll (or a second runner) picking up the
-- same row. Returns zero rows if nothing is eligible.
create or replace function public.claim_next_client_research_job(p_worker_id text)
returns setof public.client_research_jobs
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  select id into v_id
  from public.client_research_jobs
  where status = 'pending'
    and (next_attempt_at is null or next_attempt_at <= now())
  order by created_at asc
  limit 1
  for update skip locked;

  if v_id is null then
    return;
  end if;

  return query
  update public.client_research_jobs
  set status    = 'processing',
      locked_at = now(),
      locked_by = p_worker_id
  where id = v_id
  returning *;
end;
$$;

-- Row Level Security guidance (V1):
-- RLS is enabled with NO policies for anon/authenticated. That means the
-- public anon key (safe to expose in a browser) can neither read nor write
-- this table — there is no browser-facing use of this table in V1 at all.
-- Only the service role key bypasses RLS (Postgres BYPASSRLS on the
-- Supabase service_role), which is why this table is safe to write to from:
--   - n8n Cloud (server-side HTTP Request node, service role key in a
--     header, never in a browser-visible node)
--   - the local Windows runner (service role key read from a local,
--     non-Git env file — see ai-company/workers/client-research-inbox/README.md)
-- Never put the service role key in NEXT_PUBLIC_* env vars, in this file, or
-- in any file committed to Git. If a browser-facing read is ever needed in a
-- later version, add a narrow, explicit policy then — do not widen this
-- table's access as a side effect of this V1 bridge.
alter table public.client_research_jobs enable row level security;

-- Function execution: restrict the claim RPC to the service role only (the
-- same principle as the table RLS above — no anon/authenticated access).
revoke execute on function public.claim_next_client_research_job(text) from public;
revoke execute on function public.claim_next_client_research_job(text) from anon;
revoke execute on function public.claim_next_client_research_job(text) from authenticated;
grant execute on function public.claim_next_client_research_job(text) to service_role;

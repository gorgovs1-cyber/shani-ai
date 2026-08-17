-- Analytics dashboard schema
-- Run this once in your existing Supabase project: SQL Editor > New query > paste > Run.

-- One row per daily capture. Numbers come from the APIs, narrative from the daily Claude agent.
create table if not exists public.analytics_snapshots (
  id          uuid primary key default gen_random_uuid(),
  captured_at timestamptz not null default now(),
  since       date,
  until       date,
  instagram   jsonb,
  website     jsonb,
  narrative   jsonb
);

create index if not exists analytics_snapshots_captured_at_idx
  on public.analytics_snapshots (captured_at desc);

-- Single-row store for the long-lived Instagram token.
create table if not exists public.ig_tokens (
  id           int primary key default 1,
  access_token text not null,
  token_type   text,
  expires_at   timestamptz,
  updated_at   timestamptz not null default now(),
  constraint ig_tokens_single_row check (id = 1)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Signed price proposals.
--
-- IMPORTANT: this table was missing from this file until 17/08/2026, even though
-- lib/proposals/sign.ts has been writing to it. That insert is wrapped in a
-- silent catch (so a signature never fails just because the database is down),
-- which means that if the table did not exist, every signature was being
-- dropped without any error anywhere. Run this file against the project and
-- then check the Table Editor to confirm it is there.
--
-- Retention: a signed proposal is a CONTRACT and is kept. It is not deleted on
-- a timer. Deletion is a manual decision, and only in the cases Shani defined:
-- a contact who left details, was called repeatedly with no answer, or who said
-- they did not want the service. `deleted_at` and `deleted_reason` record that
-- decision instead of destroying the row silently, so there is an audit trail.
-- The exact retention period for signed contracts is still open pending legal
-- advice (accounting document-retention duties may set a minimum) — do NOT add
-- an automatic purge job until that is answered.
create table if not exists public.signed_proposals (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null,
  first_name     text,
  business       text,
  vat_id         text,
  email          text,
  signature      text,          -- typed and/or drawn signature as submitted
  terms          text,          -- exact wording that was agreed to, as evidence
  signed_at      timestamptz not null,
  ip             text,          -- collected as evidence of who signed and when
  user_agent     text,
  email_id       text,          -- Resend message id, when the email went out
  email_error    text,          -- why it did not, when it failed
  created_at     timestamptz not null default now(),
  -- Soft delete. Never purge a contract on a schedule; record the decision.
  deleted_at     timestamptz,
  deleted_reason text
);

create index if not exists signed_proposals_signed_at_idx
  on public.signed_proposals (signed_at desc);
create index if not exists signed_proposals_email_idx
  on public.signed_proposals (lower(email));
-- Supports "show me everything you hold about this address", which is what a
-- data-subject access or deletion request actually requires answering.

-- Lock every table down. With RLS on and no policies, only the service role key
-- (used server-side by the cron, OAuth and signing routes) can read or write.
-- The anon key cannot.
alter table public.analytics_snapshots enable row level security;
alter table public.ig_tokens           enable row level security;
alter table public.signed_proposals    enable row level security;

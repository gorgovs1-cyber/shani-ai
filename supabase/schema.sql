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

-- Lock both tables down. With RLS on and no policies, only the service role key
-- (used server-side by the cron and OAuth routes) can read or write. The anon key cannot.
alter table public.analytics_snapshots enable row level security;
alter table public.ig_tokens          enable row level security;

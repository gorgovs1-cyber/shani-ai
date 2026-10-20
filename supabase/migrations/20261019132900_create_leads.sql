-- לידים מטופס בדיקת ההתאמה (/audit).
-- מחליף את וורקפלואו n8n. מריצים פעם אחת:
-- Supabase → SQL Editor → New query → מדביקים את כל הקובץ → Run.
-- אותו SQL נמצא גם בסוף supabase/schema.sql.

create table if not exists public.leads (
  id                uuid primary key default gen_random_uuid(),
  submission_id     text not null,
  name              text not null,
  email             text not null,
  phone             text not null,
  business          text,
  answers           jsonb not null,
  notes             text,
  alert_email_id    text,
  thankyou_email_id text,
  email_error       text,
  sheet_ok          boolean not null default false,
  created_at        timestamptz not null default now(),
  constraint leads_submission_id_unique unique (submission_id)
);

create index if not exists leads_created_at_idx
  on public.leads (created_at desc);
create index if not exists leads_email_idx
  on public.leads (lower(email));

comment on table public.leads is
  'ליד מטופס בדיקת ההתאמה באתר. גישה רק עם מפתח השירות מהשרת.';

alter table public.leads enable row level security;

-- אין policies בכוונה: anon ו-authenticated לא קוראים ולא כותבים.
-- מפתח השירות (service role) עוקף RLS, ורק השרת משתמש בו.
revoke all on table public.leads from public, anon, authenticated;

-- הגדרות שהשרת קורא בעצמו, בלי משתנה חדש בוורסל.
-- מריצים פעם אחת: Supabase → SQL Editor → New query → מדביקים → Run.
-- אחר כך מוסיפים את כתובת הגיליון (השורה השנייה רק אם יש סיסמה בסקריפט):
--
-- insert into public.app_config (key, value) values
--   ('leads_sheet_webhook_url', 'https://script.google.com/macros/s/....../exec');
--
-- עדכון אחר כך:
-- update public.app_config
--   set value = 'https://script.google.com/macros/s/....../exec', updated_at = now()
--   where key = 'leads_sheet_webhook_url';
--
-- סיסמה, רק אם הוגדרה בסקריפט:
-- insert into public.app_config (key, value) values
--   ('leads_sheet_webhook_secret', 'אותו ערך כמו LEADS_WEBHOOK_SECRET בסקריפט');

create table if not exists public.app_config (
  key        text primary key,
  value      text,
  updated_at timestamptz not null default now()
);

comment on table public.app_config is
  'הגדרות שרת. גישה רק עם מפתח השירות. כתובת גיליון הלידים: leads_sheet_webhook_url.';

alter table public.app_config enable row level security;

-- אין policies בכוונה. מפתח השירות עוקף RLS. שאר התפקידים לא נוגעים בטבלה.
revoke all on table public.app_config from public, anon, authenticated;

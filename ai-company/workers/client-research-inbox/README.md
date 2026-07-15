# Client Research Inbox Worker V1 — Runbook

זרימה: טופס `/audit` באתר → `/api/audit/intake` (קיים, ללא שינוי) → n8n Cloud →
Supabase `client_research_jobs` (תור חדש) → ה-runner המקומי כאן → הפעלת
**Client Research Desk הקיים והמאושר**, ללא שינוי (`client-researcher` →
`client-reviewer` → `research-report.md`) → סטטוס חוזר ל-Supabase.
**לעולם לא מתמחר, לא כותב הצעה, לא יוצר קשר עם הלקוח.** `Shani status: pending`
תמיד — רק שני משנה אותו. המחשב של שני **לא** נגיש מבחוץ בשום שלב — ה-runner
רק *שולף* מ-Supabase (poll יוצא), אין webhook נכנס אליו.

## מיקומים

| מה | איפה |
|---|---|
| קוד (Git) | `ai-company/workers/client-research-inbox/` — הקבצים בתיקייה הזו בלבד |
| תור + לוגים (מחוץ ל-Git) | `C:\Users\gorgo\ShaniAI\client-research-inbox\` — `processing / ready / needs_shani / failed / logs` |
| דוח המחקר בפועל | `ai-company/clients/<client-id>/` בריפו (כרגיל, נשאר uncommitted) — **לא** נשמר בתוך Supabase ולא בתיקיית התור החיצונית; רק הנתיב אליו נשמר בשתיהן |

הריצה הראשונה יוצרת את תיקיות התור אוטומטית.

## מה זה בונה (ולא בונה)

- ✅ תור ענן מינימלי (Supabase) בין n8n לבין המחשב המקומי.
- ✅ runner מקומי אחד שמפעיל את ה-Client Research Desk **הקיים ללא שינוי**.
- ❌ לא Control Plane כללי. לא סוכנים חדשים. לא תמחור. לא הצעה. לא שליחה ללקוח.
- ❌ לא נוגע ב-`/api/audit/intake`, ב-`audit-intake-workflow.json`, או ב-Content
  Worker (`../inspiration-inbox/`).

## הגדרה (פעם אחת)

1. **Supabase:** להריץ את `supabase/001_client_research_jobs.sql` פעם אחת ב-SQL
   Editor של הפרויקט הקיים (אותו פרויקט Supabase שכבר משמש את `SUPABASE_URL`
   הקיים ב-`.env.example`).
2. **n8n:** להוסיף שלב אחד (HTTP Request) לפי `n8n-handoff-contract.md` —
   **לא מוגדר אוטומטית מכאן**, שני עושה זאת בעצמה ב-n8n Cloud.
3. **סודות מקומיים (לעולם לא ב-Git):** ליצור קובץ
   `C:\Users\gorgo\ShaniAI\client-research-inbox\.env` (תיקיית התור, מחוץ
   לריפו) עם שני משתנים — ראי "משתני סביבה נדרשים" למטה. אפשר גם להגדיר אותם
   כמשתני סביבה אמיתיים של Windows (`setx`) במקום קובץ; משתנה שכבר קיים
   בסביבה תמיד גובר על הקובץ.
4. **Task Scheduler (רק אחרי אישור שני — לא מותקן אוטומטית):**

```powershell
# התקנה (כל 10 דקות, רק כשמחוברים):
powershell -NoProfile -ExecutionPolicy Bypass -File C:\Projects\shifted-tech-inspiration-worker\ai-company\workers\client-research-inbox\install-task.ps1

# הסרה:
powershell -NoProfile -ExecutionPolicy Bypass -File C:\Projects\shifted-tech-inspiration-worker\ai-company\workers\client-research-inbox\install-task.ps1 -Uninstall

# בדיקה ידנית שהמשימה רשומה ותקינה:
Get-ScheduledTask -TaskName ShaniAI-ClientResearchInbox-Worker | Get-ScheduledTaskInfo
```

אפשר גם להריץ פעם אחת ידנית (בלי Scheduler): `node worker.mjs`.

## משתני סביבה נדרשים (שמות בלבד, ללא ערכים)

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` — **server-only, לעולם לא בדפדפן, לעולם לא ב-Git.**
  אותם שני שמות בדיוק שכבר קיימים ב-`.env.example` ובאפליקציית ה-Next
  (`lib/analytics/supabase.ts`) — אותו פרויקט Supabase, אותם מפתחות, לא
  כפולים.

אופציונלי: `--worker-id`, `--base-dir`, `--repo-dir`, `--desk-timeout-sec`,
`--max-attempts`, `--retry-cooldown-min`, `--lock-stale-min` (כל הפרמטרים
לשורת הפקודה, ברירות מחדל בטוחות ב-`worker.mjs`).

## מיפוי שדות: טופס האתר → Client Research Desk

הטופס הקיים ב-`/audit` וה-Client Research Desk הקיים (`.claude/commands/client-desk.md`)
משתמשים בשמות שדות **שונים** בעברית. ה-runner ממפה ביניהם באופן דטרמיניסטי —
בלי לשנות משמעות, בלי להמציא — לפני הפעלת `/client-desk`:

| שדה בטופס האתר | שדה ב-Client Research Desk |
|---|---|
| העסק | תיאור-עסק |
| הבעיה הכי חשובה | הבעיה הדחופה ביותר |
| שם | שם מלא |
| אימייל | אימייל |
| מטרה | מטרת 3-חודשים |
| יום עבודה | תיאור יום-עבודה |
| משימה חוזרת | משימה חוזרת מעייפת |
| מקור לקוחות | מקור-לקוחות עיקרי |
| אחרי פנייה | תהליך אחרי-פנייה |
| חסר | מה הכי חסר |
| דחיפות | רמת-דחיפות |
| כלים + כלים נוספים | כלים בשימוש (משורשרים) |
| אתר + קישור לאתר | מצב אתר/נוכחות דיגיטלית (משורשרים) |
| מיקום עבודה, שיקרה לבד, שאלות חוזרות, קשר נוסף | לא ממופים לשדה רשמי — נשמרים כלשונם תחת "מידע נוסף מהטופס" כדי שלא ילכו לאיבוד |
| — | טלפון/וואטסאפ תמיד `null` — הטופס לא אוסף מספר טלפון תחת תווית אמינה; **לא מנוחש** מ"קשר נוסף" |

**4 השדות הרשומים כחובה** (העסק, הבעיה הכי חשובה, שם, אימייל) זהים בין שני
המקורות, כך שהם תמיד קיימים אם `/api/audit/intake` כבר אישר את ההגשה. אם
בכל זאת חסר אחד מהם ברשומה (למשל הגשה ישנה/פגומה) — ה-runner **לא מנחש**,
אלא מכשיל את הפריט לצמיתות (`failed`, ללא retry) עם קוד שגיאה
`validation`.

**המלצה לריצת קבלה אמיתית ראשונה:** לעבור פעם אחת ידנית על המיפוי הזה מול
הגשה אמיתית (ראי "בדיקת קצה-לקצה אחת" למטה) לפני שממשיכים.

## סמנטיקת סטטוס

| סטטוס ב-Supabase | מתי |
|---|---|
| `pending` | ממתין (הגשה חדשה, או אחרי כישלון עם retry נותר) |
| `processing` | ה-runner המקומי תפס אותו כרגע |
| `ready` | `research-report.md` תקין נוצר **ו-Review status = approved** |
| `needs_shani` | `research-report.md` תקין נוצר אך Review status הוא needs-revision / needs-human-review / לא-ברור — **זו תוצאה תקינה, לא כשל**, בדיוק כמו ב-Content Desk |
| `failed` | מוצו 3 ניסיונות, או שגיאת ולידציה קבועה (למשל שדה חובה חסר) |

`Shani status` נשאר `pending` תמיד עד ששני עצמה משנה אותו במקום אחר —
ה-runner אף פעם לא כותב לשם ערך אחר.

## התנהגות ומגבלות (V1)

- **פריט לקוח אחד לריצה**, בלי מקבילים: נעילת קובץ `worker.lock` (מופע שני
  יוצא מיד) **וגם** claim אטומי ב-Postgres (`FOR UPDATE SKIP LOCKED`) —
  כפולת הגנה, גם אם ירוצו שני runners בטעות.
- **Timeout קשיח:** Client Research Desk — 90 דק' (`--desk-timeout-sec`,
  מראה את התקציב שכבר הוכח בפועל ל-Content Desk המקביל).
- **Retries:** עד 3 ניסיונות, לפחות 30 דק' בין ניסיונות (`next_attempt_at`).
  אחרי הכישלון השלישי — `failed` + דוח שגיאה מקומי, דורש בדיקה ידנית.
- **ולידציית שלמות לפני ready/needs_shani:** תיקיית client-id חדשה **אחת
  בדיוק** לריצה (השוואת רשימת `ai-company/clients/` לפני/אחרי) · קובץ
  `research-report.md` קיים, לא ריק, יציב בשתי קריאות בהפרש ≥3 שניות · מכיל
  "Review status" ו-"Shani status: pending" · **אין דליפת מחיר** (סריקת ₪
  צמוד לספרה — אם נמצא, מוגדר כישלון, לא ready/needs_shani, גם אם שאר
  התוכן תקין).
- **התאוששות מקריסה:** רשומות שנתקעו ב-`processing` מעל `lock-stale-min`
  (ברירת מחדל 120 דק') מוחזרות אוטומטית ל-pending כניסיון כושל.
- **פרטיות:** הלוגים מסוננים (שם משתמש, `SUPABASE_SERVICE_ROLE_KEY`, מפתחות
  API, טוקנים, עוגיות) — ראי `sanitize()` ב-`worker.mjs`.
- **הרשאות Claude:** `--allowedTools "Task,Read,Write,Grep,Glob,WebSearch,WebFetch" --permission-mode default`
  — אותה צורת הפעלה מוכחת כמו ב-Content Desk, מותאמת לצרכי `/client-desk`
  (Task נדרש כי `/client-desk` מפעיל את `client-researcher`/`client-reviewer`
  כ-agents).

## הוספת פריט לבדיקה ידנית (בלי n8n)

הכי פשוט: להוסיף שורה ידנית בטבלת `client_research_jobs` דרך Supabase Table
Editor, עם `submission_json` בפורמט שמופיע ב-`example-job.json`, ו-
`status = 'pending'`. אז להריץ `node worker.mjs` פעם אחת.

## פתרון תקלות מהיר

- `failed\<job-id>\error-report.md` — שלב, סוג שגיאה, ניסיונות, פלט מסונן.
- `logs\<job-id>-client-desk-output.log` — כל ה-stdout/stderr מהפעלת
  `/client-desk`, מסונן מסודות, תמיד מחוץ ל-Git.
- לוג יומי: `logs\worker-YYYYMMDD.log`.
- שדה חובה חסר (`error_code = validation`): לרוב סימן שהגשה עקפה את
  `/api/audit/intake` או שהמיפוי לעיל צריך עדכון — לבדוק ידנית לפני שמריצים
  שוב.
- דליפת מחיר (`error_code = compliance-price-leak`): עצירה מכוונת, לא
  להריץ שוב בלי לבדוק למה `research-report.md` הכיל ₪ — פנייה לבדיקה ידנית
  של `.claude/agents/client-researcher.md` / `client-reviewer.md` (אך
  **לא לשנות אותם** בלי בדיקה יסודית — הם מאושרים).

## מה נשאר ידני לשני

1. לעבור על `ready\<job-id>\STATUS.md` / `needs_shani\<job-id>\STATUS.md`
   (מטא-דאטה בלבד) ולפתוח את `report_path` בפועל בריפו.
2. לקבוע החלטה על כל לקוח (המשך/דחייה/שאלות נוספות) — רק שני.
3. תמחור, הצעה, ויצירת קשר עם הלקוח — **תמיד ידני, תמיד אחרי אישור מפורש**,
   ולא בתחום ה-worker הזה בכלל (ראי `00-mvp-spec.md`).
4. Commit של קבצי לקוח בריפו, אם רוצים לשמר אותם — ה-worker לעולם לא עושה
   את זה בעצמו.

## ספק תור חלופי: n8n + Google Sheets (בשימוש בפועל, V1)

שני בחרה לנהל את התור ב-Google Sheets (שם כבר יושבים הלידים) במקום Supabase. קוד ה-Supabase
נשאר ותקף — הבחירה נעשית ב-env בלבד:

- `QUEUE_PROVIDER=n8n-sheets` (או אוטומטית כש-`N8N_QUEUE_CLAIM_URL` מוגדר)
- `N8N_QUEUE_CLAIM_URL` / `N8N_QUEUE_UPDATE_URL` — כתובות ה-Production של שני ה-webhooks
  מה-workflow `n8n-sheets-queue-workflow.json` (מיובא ל-n8n של שני)
- `N8N_QUEUE_SECRET` — סוד משותף; חייב להתאים ל-Header Auth credential ב-n8n
  (שם הכותרת: `x-queue-secret`). לעולם לא בגיט ולא בצ'אט — רק ב-`.env` המקומי וב-n8n.

טאב התור בגיליון: `research_queue`, שורת כותרות (להדבקה בשורה 1):

```
submission_id	created_at	updated_at	status	attempts	locked_at	locked_by	next_attempt_at	client_id	report_path	review_status	shani_status	error_code	error_message	envelope_json
```

זרימה: שורת ליד חדשה ב-CRM ← Trigger ב-n8n מעתיק לטאב התור כ-`pending` ← ה-runner המקומי
קורא ל-`crq-claim` (נועל ל-`processing`) ← מריץ את Client Research Desk ← מעדכן דרך
`crq-update` ל-`ready`/`needs_shani`/`failed`. שחזור תקיעות: `reclaim_stale` דרך אותו webhook.

# PROJECT-STATE.md — מצב תפעולי (לא מסמך ארכיטקטורה)

> קובץ מצב יחיד, תמציתי. מתעדכן בסוף כל פאזה. הסמכות: החוקה/ארכיטקטורה/מפת-יכולות הקיימות.

עודכן: 2026-07-15 · ענף: `ai-company/inspiration-worker-v1` · HEAD בעת העדכון: `c4555f41`

## פאזה נוכחית
**חיבור מסלול ה-intake האוטומטי של מחקר לקוחות** (מטרה §10): טופס /audit → n8n Cloud →
תור ענן → runner מקומי → Client Research Desk → דוח → Shani pending.

## יכולות מוכחות (לא לבנות מחדש, לא לבקר שוב)
- /watch headless דרך `claude -p` (ריצה אמיתית, ~8–12 דק').
- Content Desk מלא: רפרנס → Researcher → Creator → Reviewer → חבילה approved.
- Inspiration Inbox Worker + משימה מתוזמנת `ShaniAI-InspirationInbox-Worker` (כל 10 דק',
  רץ בפועל; כולל נעילה, retries, timeouts, recovery, תקרה יומית).
- Client Research Desk ידני (client-researcher → client-reviewer) — התקבל פונקציונלית,
  כולל ריצת מחקר חיצוני אמיתית על shani-ai.com.
- Client Research Intake Bridge (commit `c4555f41`): worker.mjs (poll/claim אטומי מול
  Supabase REST), SQL, חוזה n8n, self-test 20/20. **קוד מוכן — עדיין לא מחובר לענן.**

## סיווג רכיבים לפאזה (כלל אינטגרציה לא-הרסנית)
REUSE AS-IS: כל הסוכנים/פקודות/Workers/מסמכי-יסוד הקיימים · /api/audit/intake · הגשר המחויב.
CONNECT (החוסר היחיד): (1) הרצת `ai-company/workers/client-research-inbox/supabase/001_client_research_jobs.sql`
בפרויקט Supabase (2) נוד HTTP ב-n8n לפי `n8n-handoff-contract.md`, במקביל ל-Sheets (3) קובץ
סודות מקומי `C:\Users\gorgo\ShaniAI\client-research-inbox\.env` עם SUPABASE_URL +
SUPABASE_SERVICE_ROLE_KEY (שמות בלבד — ערכים לעולם לא בגיט/צ'אט) (4) התקנת
`install-task.ps1` (5) ריצה ראשונה.
SMALL FIX: אין. NOT NEEDED YET: Approval Inbox, Dispatcher, Producer, Control Plane.

## חסמים פעילים
- אימות שקיים פרויקט Supabase אמיתי (עדות עקיפה: analytics משתמש בו; לא מאומת מכאן) —
  פעולת שני #1 למטה מאמתת ומקדמת בבת אחת.
- לא ידוע אם workflow ה-intake ב-n8n פעיל ומחובר ל-N8N_AUDIT_WEBHOOK_URL ב-Vercel.

## הערות תפעול לא-חוסמות
- 2026-07-14 לילה: REF-20260714-210256 נכשל בשלב content-desk אחרי 3 ניסיונות → failed/
  (לוג חיצוני). לא לחקור בפאזת התשתית.

## המשימה המדויקת הבאה
אחרי פעולת שני #1 (SQL רץ בהצלחה): פעולה #2 — נוד n8n לפי החוזה; אחר כך #3 סודות
מקומיים; #4 התקנת המשימה; ואז **בדיקת קבלה אחת** לפי §11 עם הגשת בדיקה מסומנת.

## עדכוני החלטות (15/07)
- **תור מחקר הלקוחות: שני בחרה Google Sheets** (הטופס והלידים כבר שם) במקום Supabase.
  קוד ה-Supabase bridge נשמר כמות שהוא (כלל לא-הרסני). מסלול מימוש שנבחר כדי לחסוך הקמת
  Google Cloud: שני webhooks קטנים ב-n8n (list-pending / claim+update) שמשתמשים בקרדנציאל
  Sheets הקיים של n8n + סוד משותף ב-header; ה-runner המקומי מדבר איתם בלבד. נדרש: שכבת-ספק
  קטנה ב-worker.mjs של client-research-inbox + קובץ workflow מוכן לייבוא ל-n8n. משימה הבאה.
- המשימה המתוזמנת `ShaniAI-InspirationInbox-Worker` **הושבתה לבקשת שני** (מצב ידני).
  הפעלה מחדש: Enable-ScheduledTask. נוסף `process-reel.ps1` — פקודה אחת לתור+עיבוד.
- **שים לב:** סשן מקביל דחף ל-main מהעותק הישן ב-OneDrive (commit c867a31a, עדכון תמחור,
  2 קבצים) → פרוס לאתר החי. ה-main המקומי ב-C:\Projects\shifted-tech נשאר מאחור — לעשות
  fetch לפני כל עבודת אתר. ה-worktree והענף שלנו לא הושפעו.

## פעולות חיצוניות שממתינות לשני
1. **(עכשיו)** Supabase → SQL Editor → הרצת קובץ ה-SQL של הגשר (מאמת שהפרויקט קיים
   ויוצר את התור). אם אין פרויקט קיים בכלל — לעצור ולדווח, לא ליצור חדש; נבחר גשר
   חלופי קטן מעל Sheets בשכבת-ספק, בלי למחוק את קוד ה-Supabase.
2. (אחר כך) נוד n8n · 3. סודות מקומיים · 4. התקנת המשימה — אחת-אחת, לפי ההנחיה בצ'אט.

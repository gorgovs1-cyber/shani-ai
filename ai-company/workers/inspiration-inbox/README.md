# Inspiration Inbox Worker V1 — Runbook

זרימה: שני מוסיפה רפרנס ריל → ה-worker מזהה → `/watch` headless → שמירת ניתוח →
`/content-desk` (Inspiration-led: Researcher → Creator → Reviewer) → חבילה מוכנה לאישור שני.
**לעולם לא מפרסם, לא מתזמן, לא שולח.** `Shani status: pending` תמיד — רק שני משנה אותו.

## מיקומים

| מה | איפה |
|---|---|
| קוד (Git) | `ai-company/workers/inspiration-inbox/` — הקבצים בתיקייה הזו בלבד |
| תור + לוגים (מחוץ ל-Git) | `C:\Users\gorgo\ShaniAI\inspiration-inbox\` — `pending / processing / ready / failed / logs / analyses` |

הריצה הראשונה יוצרת את תיקיות התור אוטומטית. אסור לשמור קבצי runtime בתוך הריפו.

## הוספת ריל (הפקודה היחידה שצריך ביום-יום)

```powershell
node C:\Projects\shifted-tech-inspiration-worker\ai-company\workers\inspiration-inbox\worker.mjs --add `
  --url "https://www.instagram.com/reel/XXXX/" `
  --account "@handle" --liked "מה אהבת" --topic "נושא רצוי" --business "חיבור עסקי" --faceless yes
```

רק `--url` חובה; לשאר יש ברירות מחדל בטוחות (ר' `example-item.json`).
אפשר גם להניח קובץ JSON ידנית ב-`pending\` באותו פורמט.

> ה-worker כתוב ב-Node (לא PowerShell): זו מוסכמת הריפו (פרויקט Next.js/Node,
> ו-Claude Code עצמו דורש Node) — וזה מה שאיפשר ולידציה התנהגותית מלאה לפני ה-commit.

## התקנה ב-Task Scheduler (רק אחרי אישור שני — לא הותקן אוטומטית)

```powershell
# התקנה (כל 10 דקות, רק כשמחוברים):
powershell -NoProfile -ExecutionPolicy Bypass -File C:\Projects\shifted-tech-inspiration-worker\ai-company\workers\inspiration-inbox\install-task.ps1

# הסרה:
powershell -NoProfile -ExecutionPolicy Bypass -File C:\Projects\shifted-tech-inspiration-worker\ai-company\workers\inspiration-inbox\install-task.ps1 -Uninstall
```

אפשר גם להריץ את ה-worker ידנית פעם אחת (בלי Scheduler): `node worker.mjs` בלי פרמטרים.

## התנהגות ומגבלות (V1)

- **פריט אחד לריצה**, בלי Claude מקבילים: נעילת קובץ `worker.lock` (מופע שני יוצא מיד; נעילה ישנה מ-75 דק' נחשבת תקועה ומוסרת).
- **תקרה יומית:** 3 חבילות מושלמות ליום קלנדרי.
- **Timeouts קשיחים:** `/watch` — 15 דק'. Content Desk — 45 דק' (ערך V1 מתועד: תחקיר+יצירה+ביקורת עם אימות מקורות טרי אורכים משמעותית יותר מ-`/watch` לבדו).
- **הרשאות:** `--permission-mode default` + allowedTools צרים בלבד. בלי bypass גורף.
  `/watch`: `Bash,Read,Glob,Grep,WebFetch` (הצירוף שהוכח בבדיקה) · Content Desk: `Task,Skill,Read,Write,Edit,Grep,Glob,WebSearch,WebFetch`.
- **Retries:** עד 3 ניסיונות, מרווח 30 דק' לפחות (ריצה = ניסיון אחד לכל היותר, אז כשל אימות/עוגיות לא מנוסה שוב באותה ריצה). אחרי כישלון שלישי — `failed\` + דוח שגיאה + דרישת בדיקה ידנית.
- **כשל `/watch`:** לא מפעילים Content Desk, לא ממציאים ניתוח. כשל Content Desk: הניתוח המושלם נשמר ב-`analyses\` והדוח מציין שהכשל אירע אחרי הניתוח.
- **פרטיות:** הלוגים מסוננים (שם משתמש, מפתחות, טוקנים, עוגיות); הפרומפטים מנחים לא לחשוף שם משתמש Windows, סודות, לקוחות או פרויקטים אחרים.

## מה נשאר ידני לשני

1. לעבור על החבילה ב-`ready\<id>\` (וב-`marketing-engine/packages/` בריפו — נשאר uncommitted).
2. לקבוע `Shani status` (approved / rejected / needs-new-direction) — רק את.
3. להפיק ולפרסם בפועל. ה-worker לא נוגע בזה.
4. commit של קבצי החבילה בריפו, אם רוצים לשמר אותם.

## פתרון תקלות מהיר

- `failed\<id>-error.md` — הדוח המלא (שלב, סוג שגיאה, ניסיונות, פלט מסונן).
- כשל עוגיות/התחברות: לוודא חיבור לאינסטגרם ב-Chrome ולהחזיר את ה-JSON מ-`failed\` ל-`pending\` (לאפס `attempts` ל-0).
- לוג יומי: `logs\worker-YYYYMMDD.log`.

---
name: content-run
description: >
  זרימת תוכן ידנית אחת, גלויה, מקצה לקצה: רפרנס אינסטגרם → ניתוח /watch (שימוש חוזר בניתוח
  קיים, או הרצה חסרת-אינטראקציה דרך claude -p — לעולם לא מבקשים משני להדביק פלט) → Researcher
  → Creator → Reviewer (כולם דרך /content-desk הקיים, בלי שינוי) → שער חוסם על Review status →
  אם approved → /producer (כולל רינדור ויזואלי אוטומטי) → תיקיית production-ready → Shani
  status: pending. לא סוכן — עוטפת content-desk.md ו-producer.md הקיימים, בלי לשנות אותם. אין
  Worker חדש, אין Scheduler, אין פרסום.
---

# /content-run — רפרנס אינסטגרם → חבילה מוכנה לאישור שני

## הפעלה
```
/content-run
Instagram reference URL: ...
What Shani liked (אופציונלי): ...
```

## תהליך (5 שלבים גלויים, מבוצע בסשן אחד)

### שלב 1 — רפרנס וניתוח (אוטומטי לגמרי — לעולם לא מבקשים משני להדביק ניתוח)

קבלת ה-URL. כל מה שקורה מכאן עד שיש ניתוח שלם ומאומת הוא אוטומטי, בלי מעורבות ידנית של שני:

**1א. חיפוש ניתוח קיים (Inspiration Inbox החיצוני):**
```bash
grep -rlF -- "- Source: <ה-URL המדויק שהתקבל>" "C:\Users\gorgo\ShaniAI\inspiration-inbox\analyses\"
```
אם נמצא קובץ `*-analysis.md` עם שורת `- Source:` שתואמת את ה-URL **בדיוק** — זהו ניתוח שלם
שכבר קיים (מ-Worker קודם, או מריצת /content-run קודמת). משתמשים בו ישירות כ-Reference analysis
(נתיב הקובץ המדויק), **לא מריצים /watch שוב**, ועוברים ישירות לשלב 2.

**1ב. אם לא נמצא ניתוח תואם — /watch חסר-אינטראקציה, אותו מנגנון מוכח בדיוק כמו ב-Worker.**
המקור: `ai-company/workers/inspiration-inbox/worker.mjs`, הפונקציה `runClaude` + בניית
`watchPrompt`. לא בונים כאן מנגנון חדש ולא כלי נפרד — קוראים ל-CLI **באותה צורה בדיוק** שכבר
מוכחת כעובדת אצל ה-Worker:

```bash
claude -p "/watch <URL> Produce a complete written reference analysis of this reel for content-inspiration purposes. Include as far as observable: core idea, core promise, hook, total duration, scene-by-scene timeline with timestamps, what is shown on screen in each scene, all on-screen text, spoken narration or full transcript, pacing and cuts, transitions, screen demos, CTA, curiosity mechanism, why this reel likely performs well, and a separate list of factual claims that would require independent verification. Explicitly list any field you could not determine - do not guess missing fields. Privacy rules: never include the Windows username, user-profile file paths, API keys, tokens, cookies, client names, or unrelated project names in your output." --allowedTools "Bash,Read,Glob,Grep,WebFetch" --permission-mode default
```

- **Timeout קשיח 900 שניות (15 דקות)** — זהה ל-`watchTimeoutSec` ב-worker.mjs. חריגה = כשל,
  לא ממשיכים, מדווחים "timeout".
- הפלט (stdout+stderr) נשמר **לקובץ אמיתי**, לא מוצג לשני לצורך הדבקה חוזרת:
  `C:\Users\gorgo\ShaniAI\inspiration-inbox\analyses\MANUAL-<YYYYMMDD-HHMMSS>-analysis.md`,
  באותו פורמט בדיוק שה-Worker כותב:
  ```
  # Reference analysis - MANUAL-<YYYYMMDD-HHMMSS>
  - Source: <URL>
  - Analyzed: <ISO timestamp>

  <הפלט המלא>
  ```
  אותו מיקום ואותו פורמט בדיוק כמו analyses/ של ה-Worker — כדי שגם Worker עתידי וגם /content-run
  עתידי ימצאו ויעשו שימוש חוזר בניתוח הזה דרך שלב 1א, בלי לנתח את אותו רפרנס פעמיים.
- **וולידציה לפני המשך (שני תנאים, שניהם חובה):**
  1. הקובץ לא ריק — **≥300 תווים** אחרי trim, אותו סף בדיוק כמו ב-Worker
     (`watch.output.trim().length >= 300`).
  2. מכיל מבנה ריל מזוהה — לפחות כמה מהמונחים: hook / timeline / scene / on-screen / CTA.

  נכשל באחד משני התנאים, או timeout → **עצירה מיידית כאן**. מדווחים לשני בדיוק מה נכשל
  (timeout / פלט ריק / מבנה לא מזוהה) ומראים את הפלט הגולמי שהתקבל. **לא ממשיכים לשלב הבא עם
  ניתוח חלקי, ריק, או מומצא** — זהה לכלל-הברזל הקיים ב-content-desk.md.

בשני המקרים (1א או 1ב) — ברגע שיש קובץ ניתוח שלם ומאומת, ממשיכים **אוטומטית, באותה הרצה**,
לשלב 2. שום שלב בתהליך הזה לא מבקש משני להדביק פלט ניתוח בעצמה.

### שלב 2 — Researcher → Creator → Reviewer (דרך /content-desk, ללא שינוי)
הרצת:
```
/content-desk
Mode: Inspiration-led
Reference URL: <מהשלב 1>
Reference analysis: <נתיב הקובץ מ-1א או 1ב>
Topic / Business goal / Service to promote / Platforms / Preferred format: לפי מה ששני סיפקה,
  או ברירות המחדל הקיימות ב-content-desk.md אם חסר
What Shani liked: <אם סופק>
```
content-desk.md מריץ בעצמו Researcher → Creator → Reviewer ומרכיב `content-desk-package.md` עם
שני סטטוסים נפרדים (Review status / Shani status). שום שינוי לתהליך הזה כאן.

### שלב 3 — שער חוסם על Review status
- `Review status: approved` → ממשיכים לשלב 4.
- `Review status: needs-revision` / `needs-human-review` → **עצירה כאן**. מוצג לשני **בדיוק**:
  מה ה-Review status, מה סעיף הביקורת (5) כתב כבעיה, ומה ההחלטה הנדרשת ממנה (למשל: "לאשר תיקון
  ידני / לבקש כיוון חדש / לדחות"). **לא ממשיכים ל-Producer**, לא מנחשים תיקון.

### שלב 4 — /producer (רק אם approved)
```
/producer Package: marketing-engine/packages/<slug>/
```
מריץ producer.md V1.2 — קבצי production/ הרגילים, רינדור ויזואלי אוטומטי (קאבר/CTA/
overlays/סלוטים/PNG+SVG/manifest/timeline/contact sheet/QA) דרך `render_visuals.py`, **וגם**
מדריך צילום פשוט בעברית (`production/CREATOR-HANDOFF.md`) דרך `creator_handoff.py` — ללא בקשה
נפרדת. ר' producer.md לפרטים.

### שלב 5 — ההנדאוף לשני: מדריך הצילום, לא דוח טכני
**התגובה הסופית של Claude בסוף `/content-run` היא תוכן `CREATOR-HANDOFF.md`, מוצג במלואו בעברית
פשוטה** — בדיוק כמו "שלב 3" ב-producer.md. לא דוח פיתוח, לא רשימת קבצים, לא Git status כראש
התגובה. `Shani status: pending` (תמיד — אף שלב כאן לא קובע Shani status חוץ משני עצמה) ורשימת
הפעולות שנשארו לה (`MANUAL-ACTIONS.md`) מוזכרות בקצרה, לא כגוף התגובה. פרטים טכניים (נתיבים,
Git status, מה רץ בפועל) מותרים **רק** בסעיף נפרד בסוף התגובה, תחת הכותרת **"פרטים טכניים
למפתחים"** — לעולם לא לפני המדריך.

## כללי ברזל
- לא בונה סוכן חדש, לא נוגעת ב-researcher.md / creator.md / reviewer.md / client-desk.md.
- לא נוגעת ב-content-desk.md או ב-producer.md — רק קוראת להם, לפי הממשק הקיים שלהם.
- אין Worker חדש, אין Scheduler, אין תזמון — הרצה ידנית אחת, "עכשיו", מקצה לקצה. שלב 1ב קורא
  לאותו CLI (`claude -p`) שה-Worker הקיים כבר משתמש בו — לא בנייה של Worker נוסף.
- אף שלב לא מבקש משני להדביק ניתוח או פלט ידנית בין שלבים.
- אין פרסום בשום שלב. `Shani status` תמיד `pending` בסוף ריצה מוצלחת.
- Review status לא approved → עצירה לפני Producer, תמיד. לא "תיקון אוטומטי במקום שני".
- שום נכס חזותי מזויף, ושום ניתוח מומצא — אם /watch נכשל/ריק/timeout, עוצרים ומדווחים, לא
  ממציאים תוכן במקומו. אותם כללי-ברזל של producer.md ו-content-desk.md תקפים במלואם.

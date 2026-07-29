# Inspiration Inbox Worker V1 — Runbook

זרימה: שני מוסיפה רפרנס ריל → ה-worker מזהה → `/watch` headless → שמירת ניתוח →
`/content-desk` (Inspiration-led: Researcher → Creator → Reviewer) → אם `Review status: approved`
→ `/producer` (כולל רינדור ויזואלי ממותג) → חבילה מוכנה לאישור שני.
**לעולם לא מפרסם, לא מתזמן, לא שולח.** `Shani status: pending` תמיד — רק שני משנה אותו.

## הפעלה ידנית אחת — קיצור דרך בדסקטופ (מומלץ)

**זו הדרך הנכונה להריץ ידנית "עכשיו" — לא ה-Claude Scheduled Task (ר' "הערת סטטוס" למטה).**

```powershell
# פעם אחת בלבד — מתקין קיצור דרך בדסקטופ, לא מריץ שום דבר אוטומטית:
powershell -NoProfile -ExecutionPolicy Bypass -File C:\Projects\shifted-tech-inspiration-worker\ai-company\workers\inspiration-inbox\install-shortcut.ps1
```

אחרי זה, לחיצה כפולה על קיצור הדרך **"Shani AI Content Team"** בדסקטופ:
פותחת חלון גלוי → שואלת URL של אינסטגרם + הערה אופציונלית → מריצה מיד (בלי לחכות ל-worker
התקופתי) את אותו `worker.mjs` בדיוק, במצב `--run-now` — שימוש חוזר בניתוח קיים אם יש, אחרת
`/watch` headless מוכח → `/content-desk` → אם `approved` אז `/producer` + רינדור ויזואלי + בניית
**Recording Studio** מודרך → פותחת את `RECORDING-STUDIO.html` בדפדפן ברירת המחדל בסיום (תיקיית
ה-production נשארת זמינה לצדו; אם ה-Recording Studio לא נבנה מסיבה כלשהי, נפתחת תיקיית
ה-production כרגיל; אם עדיין צריך את ההחלטה שלך — נפתחת תיקיית החבילה). החלון נשאר פתוח עד
Enter. **לא Scheduler, לא הרצה אוטומטית חוזרת, לא תהליך רקע, לא הרשאות מנהל.**

הרצה ידנית ישירה בלי קיצור דרך: `powershell -File run-now.ps1` מתוך התיקייה הזו, או:
```powershell
node worker.mjs --run-now --url "https://www.instagram.com/reel/XXXX/" --liked "מה אהבת"
```

### הערת סטטוס — Claude Scheduled Task (`shani-ai-organic-content-team`) מיושן לזרימה הזו

יש Scheduled Task קיים בשם `shani-ai-organic-content-team` ("Manual only") שמצביע על
`ai-company/routines/manual-organic-content-team.md`. **הוא לא נמחק** (לא אמורה להימחק אוטומטית
לפי הנחיית שני) — אבל הוא **לא מסוגל להריץ את הזרימה הזו בפועל**: Claude Scheduled/Manual tasks
רצים בסביבת Cowork מבודדת, גם כש-Frequency הוא Manual. הסביבה הזו: (1) לא מגיעה ל-
`C:\Users\gorgo\ShaniAI\inspiration-inbox\`, (2) לא חולקת את ה-`claude` CLI המקומי המחובר,
(3) לא יכולה להשתמש בסביבת אינסטגרם/Chrome המקומית — ולכן לא מסוגלת להריץ את `/watch` האמיתי.
זה שורש התקלה שהובילה לקיצור הדרך הזה. **הקיצור דרך בדסקטופ למעלה הוא התחליף המלא** — אם
Scheduled Task הזה כבר לא נחוץ, שני יכולה למחוק אותו ידנית (Cowork settings → Scheduled tasks),
אבל זה לא נעשה כאן אוטומטית.

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

# בדיקה ידנית שהמשימה רשומה ותקינה:
Get-ScheduledTask -TaskName ShaniAI-InspirationInbox-Worker | Get-ScheduledTaskInfo
```

אפשר גם להריץ את ה-worker ידנית פעם אחת (בלי Scheduler): `node worker.mjs` בלי פרמטרים.

## התנהגות ומגבלות (V1)

- **פריט אחד לריצה**, בלי Claude מקבילים: נעילת קובץ `worker.lock` (מופע שני יוצא מיד; נעילה ישנה מ-120 דק' נחשבת תקועה ומוסרת).
- **תקרה יומית:** 3 חבילות מושלמות ליום קלנדרי.
- **Timeouts קשיחים:** `/watch` — 15 דק'. Content Desk — **90 דק'** (ריצת ה-E2E האמיתית הוכיחה שמסלול תקין עם סבב תיקון + ביקורת שנייה עובר 45 דק').
- **ולידציית שלמות קשיחה לפני סיום (finalization):** חבילה מסומנת ready רק כשכולם עוברים — בדיוק תיקיית חבילה חדשה אחת לריצה · שלושת הקבצים קיימים ולא-ריקים (package.md, content-desk-package.md, review.md) · כל הסעיפים קיימים (Research foundation, Instagram, LinkedIn, Independent review, Review status, Shani status) · `Shani status: pending` במפורש · `Review status` הוא approved / needs-revision / needs-human-review (**needs-revision הוא תוצר תקין לאישור שני, לא כשל worker**) · אין סמני אי-סיום (TODO/PLACEHOLDER וכו') · הקובץ יציב בשתי קריאות בהפרש ≥5 שניות. כל בדיקה נרשמת ללוג החיצוני.
- **התאוששות מ-timeout:** אם Claude נקטע אחרי שהחבילה כבר שלמה — הוולידציה רצה אחרי הרג התהליך; אם עברה, החבילה מסומנת ready עם `workerFinalization: recovered-complete-package-after-timeout`, בלי העלאת attempts ובלי retry (ה-timeout נרשם כאזהרה). נכשלה — התנהגות הכשל/retry הרגילה.
- **התאוששות ידנית לפריט קיים:** `node worker.mjs --recover <item-id> --package <שם-תיקיית-החבילה>` — מריץ את אותה ולידציה ומסיים ל-ready בלי להריץ `/watch` או Content Desk.
- **הרשאות:** `--permission-mode default` + allowedTools צרים בלבד. בלי bypass גורף.
  `/watch`: `Bash,Read,Glob,Grep,WebFetch` (הצירוף שהוכח בבדיקה) · Content Desk: `Task,Skill,Read,Write,Edit,Grep,Glob,WebSearch,WebFetch`.
- **Retries:** עד 3 ניסיונות, מרווח 30 דק' לפחות (ריצה = ניסיון אחד לכל היותר, אז כשל אימות/עוגיות לא מנוסה שוב באותה ריצה). אחרי כישלון שלישי — `failed\` + דוח שגיאה + דרישת בדיקה ידנית.
- **כשל `/watch`:** לא מפעילים Content Desk, לא ממציאים ניתוח. כשל Content Desk: הניתוח המושלם נשמר ב-`analyses\` והדוח מציין שהכשל אירע אחרי הניתוח.
- **פרטיות:** הלוגים מסוננים (שם משתמש, מפתחות, טוקנים, עוגיות); הפרומפטים מנחים לא לחשוף שם משתמש Windows, סודות, לקוחות או פרויקטים אחרים.

## Recording Studio — שכבת השימושיות הסופית להקלטה

אחרי `/producer` מוצלח (Review status approved + רינדור ויזואלי תקין), `worker.mjs` בונה אוטומטית
`marketing-engine/producer/recording_studio.py --package <slug>` שמייצר
`production/RECORDING-STUDIO.html` — קובץ יחיד, אופליין לגמרי (בלי CDN, בלי שרת, נפתח בלחיצה
כפולה בכל דפדפן), שמטמיע בתוכו את הנכסים **האמיתיים** של החבילה: כל כרטיס מוכן (PNG סופי),
כל overlay להדגמת-מסך (preview אמיתי + הוראת הקלטה מדויקת), שורת קריינות/סקריפט מדויקת לכל שוט,
זמן התחלה/סיום וזמן משך מדויקים, וכיתוב-מסך מדויק — הכול נקרא ישירות מ-`visual-manifest.json`,
`visual-timeline.csv`, `voiceover.txt`, `on-screen-text.csv`, `shot-list.md`,
`screen-recording-checklist.md` ו-`MANUAL-ACTIONS.md` האמיתיים. שום דבר לא מומצא — שוט שדורש
הקלטת-מסך אמיתית מסומן במפורש כ-**REAL SCREEN RECORDING REQUIRED**, לעולם לא מוצג כאילו כבר
צולם.

כפתורי ניווט (הקודם/הבא/סימון כהושלם/מסך מלא/התחלה מחדש), ומצב **Guided Recording** ייעודי —
מסך כהה מלא, שוט אחד בכל פעם, ספירה לאחור של 3 שניות, טיימר לזמן השוט, טקסט הסקריפט בגופן גדול,
ומקשי מקלדת: → הבא, ← הקודם, Space התחל/השהה טיימר, F מסך מלא, C סימון כהושלם. התקדמות ההשלמה
נשמרת ב-localStorage של הדפדפן (per-package) — סגירה ופתיחה מחדש של הקובץ לא מאבדת אותה.

כשל בבניית ה-Recording Studio (למשל python3 לא זמין) **לא** מפיל את הריצה — תיקיית ה-production
הרגילה נשארת זמינה כרגיל, והפרטים נרשמים ללוג `logs\<id>-recording-studio-output.log`.

בנייה/רענון ידניים בלי דרך ה-worker (למשל אחרי עריכה ידנית בקבצי production/):
```powershell
python3 marketing-engine\producer\recording_studio.py --package "marketing-engine\packages\<slug>"
```

## מה נשאר ידני לשני

1. לעבור על החבילה ב-`ready\<id>\` (וב-`marketing-engine/packages/` בריפו — נשאר uncommitted).
2. לקבוע `Shani status` (approved / rejected / needs-new-direction) — רק את.
3. להפיק ולפרסם בפועל. ה-worker לא נוגע בזה.
4. commit של קבצי החבילה בריפו, אם רוצים לשמר אותם.

## פתרון תקלות מהיר

- `failed\<id>-error.md` — הדוח המלא (שלב, סוג שגיאה, ניסיונות, פלט מסונן).
- `logs\<id>-watch-output.log` ו-`logs\<id>-content-desk-output.log` — מלוא ה-stdout/stderr של כל שלב, מסונן מסודות, תמיד נשמר מחוץ ל-Git.
- כשל עוגיות/התחברות: לוודא חיבור לאינסטגרם ב-Chrome ולהחזיר את ה-JSON מ-`failed\` ל-`pending\` (לאפס `attempts` ל-0).
- לוג יומי: `logs\worker-YYYYMMDD.log`.
- **"נכשל" עם `newPackages=0` אחרי ריצת `--run-now`:** ר' הסעיף הבא — לרוב זה לא כשל אמיתי.

## חבילה כפולה (deduplication) — כש-Content Desk לא יוצר חבילה חדשה בכוונה

Content Desk לפעמים מזהה שכבר קיימת חבילה שלמה לאותו רפרנס מדויק (אותו URL, אותו ניתוח) ומעדכן
אותה במקום, בלי ליצור תיקייה חדשה — התנהגות נכונה, לא כשל. `worker.mjs` מזהה את המקרה הזה אוטומטית
(שני אותות בלתי-תלויים: אזכור נתיב מפורש בפלט של Content Desk, וזמן-שינוי של `content-desk-package.md`
בתיקייה קיימת שחל בדיוק בזמן הריצה) ומסיים את החבילה כ-`reused-existing-package` — בלי retry, בלי
העלאת attempts.

אם ריצת `--run-now` בכל זאת ננעלה כ-retry/failed על אף שהחבילה כבר קיימת ומאושרת (ניחוש כפול לא
זוהה אוטומטית, או שה-item כבר עבר ל-`failed\`), ואת יודעת בוודאות איזו חבילה זו:

```powershell
node worker.mjs --recover-run-now --url "https://www.instagram.com/p/XXXX/" --package "YYYY-MM-DD-slug"
```

מאתר את ה-item התקוע (לפי URL מדויק, ב-`pending\`/`processing\`/`failed\`) או בונה רשומה חדשה אם
לא נמצא, מריץ ולידציה קשיחה על `marketing-engine/packages/<slug>/` (**בלי** `/watch` או Content
Desk מחדש), מריץ Producer רק אם `Review status: approved` (ומשתמש חוזר בפלט production/ קיים אם
כבר תקין, בלי להריץ Producer שוב), ומדפיס את אותה שורת `RUN-NOW-RESULT` — אפשר להריץ את זה גם ידנית
מחוץ ל-`run-now.ps1`.

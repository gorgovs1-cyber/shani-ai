---
name: producer
description: >
  Producer V1.2 של צוות התוכן: ממיר חבילת תוכן אחת שכבר עברה ביקורת (content-desk-package.md
  עם Review status) לתיקיית production-ready עם נכסים אמיתיים בלבד — כולל רינדור ויזואלי מלא
  אוטומטי (קאבר, כרטיסי CTA/Outro, overlays, סלוטי הקלטת-מסך, PNG+SVG, manifest, timeline,
  contact sheet, QA) דרך marketing-engine/producer/render_visuals.py, וכן מדריך צילום פשוט
  בעברית (production/CREATOR-HANDOFF.md) דרך marketing-engine/producer/creator_handoff.py —
  ההנדאוף העיקרי לשני. לא סוכן — פקודת תזמור. לא יוצר מחקר/קופי חדש, לא משנה את החבילה, לא
  מקליט מסך במקום שני, לא מפרסם.
---

# /producer — חבילה מאושרת → תיקיית הפקה

## הפעלה
```
/producer Package: marketing-engine/packages/<slug>/
```

## תנאי כניסה (חוסמים)
1. קיים `content-desk-package.md` עם `Review status` מפורש. חסר → עצירה.
2. `Review status: needs-revision` → עצירה והפניה ל-content-desk (לא מתקנים קופי כאן).
3. שום עריכה בקבצי החבילה המקוריים — קריאה בלבד.

## פלט: `marketing-engine/packages/<slug>/production/`
לפי סוג התוכן (ריל/קרוסלה/פוסט), ככל שרלוונטי:
- `final-script.md` — התסריט הסופי (קריינות + מבנה), כלשונו מהחבילה.
- `caption.txt` — ה-caption המדויק, מוכן להדבקה (כולל מילת CTA).
- `voiceover.txt` — שורות הקריינות בלבד, עם חותמות זמן, לקריאה מול מיקרופון.
- `on-screen-text.csv` — `index,start_seconds,end_seconds,text` לכל כיתוב-מסך.
- `subtitles.srt` — אותם כיתובים בפורמט SRT תקני (HH:MM:SS,mmm).
- `shot-list.md` — טבלת השוטים: זמן, סוג, מה על המסך, מה מקליטים.
- `screen-recording-checklist.md` — כשנדרשת הוכחת-מסך אמיתית: מה לפתוח, מאיפה להתחיל,
  מה להסתיר/לטשטש — הועתק מהחבילה, לא הומצא.
- `MANUAL-ACTIONS.md` — הפעולות היחידות שנשארו לשני, קצר וממוספר, כולל תלויות פתוחות
  (למשל CAP-01) וסטטוס Operational readiness אם קיים.
- `export-manifest.json` — רשימת כל הקבצים, החבילה המקורית, הסטטוסים, ומה חסר.

## שלב 2 — רינדור ויזואלי אוטומטי (חובה, לא אופציונלי)

**מיד אחרי** בניית קבצי ה-production/ הרגילים למעלה, מריצים אוטומטית — **באותה הרצה, בלי
לחכות לבקשה נפרדת** — את:

```bash
python3 marketing-engine/producer/render_visuals.py --package "marketing-engine/packages/<slug>" --type <reel|carousel>
```

**קביעת `<reel|carousel>`:** נקרא מ-`package.md`, סעיף "## החלטת פורמט" (למשל
`פורמט: ריל פייסלס (faceless) באינסטגרם` → `--type reel`; `פורמט: קרוסלה` → `--type carousel`).
סעיף חסר/דו-משמעי → עצירה ושאלה אחת לשני, לא ניחוש.

הרצה מוצלחת של Producer **חייבת** לייצר את כל אלה בתוך `production/visuals/`
(וגם `CONTACT-SHEET.png` / `visual-manifest.json` / `visual-timeline.csv` / `VISUAL-QA.md` ברמת
`production/`):
- קאבר (`visuals/png/cover.png` + `visuals/svg/cover.svg`) — קומפוזיציית הקאבר המאושרת, ר'
  `marketing-engine/producer/COVER-APPROVAL.md`.
- כרטיסי CTA/Outro (מלאים, PNG+SVG).
- Overlays שקופים לכל שוט הדגמת-מסך אמיתית (חלון שקוף אמיתי + כיתוב ממותג — לא תחליף להקלטה).
- סלוטי הקלטת-מסך **אמיתיים** (`SCREEN RECORDING SLOT`, מסומנים במפורש כלא-סופיים) לכל שוט
  שדורש הוכחת-מסך אמיתית — לעולם לא תחליף מזויף.
- PNG **וגם** SVG לכל נכס.
- `subtitles.srt` (כבר נכתב בשלב 1 למעלה — לא מיוצר מחדש כאן).
- `visual-manifest.json` + `visual-timeline.csv` — מיפוי מלא של כל נכס.
- `CONTACT-SHEET.png` — רשת אחת לתצוגה כוללת.
- `VISUAL-QA.md` — ספירה צפוי/נוצר + עיגון מותג.

**קרוסלה:** אותה קריאת CLI, `--type carousel`, חושפת את `render_carousel_package` /
`render_carousel_slide` הקיימים ב-`render_visuals.py` (1080×1350, RTL-safe, ממוספר, SVG+PNG) —
לא פונקציונליות נפרדת, לא סוכן חדש. כל שקופית מאושרת בחבילה מרונדרת אוטומטית באותה הרצה.

**כשל בשלב הרינדור** (חריגה/קובץ חסר) → הרצת Producer **לא הושלמה** — מדווחים את השגיאה
המדויקת ב-`MANUAL-ACTIONS.md`, לא ממשיכים כאילו הצליח.

## שלב 3 — Creator Handoff: מדריך צילום פשוט בעברית (חובה, לא אופציונלי)

**מיד אחרי** שלב 2 (רינדור ויזואלי מוצלח), מריצים אוטומטית — **באותה הרצה** — את:

```bash
python3 marketing-engine/producer/creator_handoff.py --package "marketing-engine/packages/<slug>"
```

זה כלי תזמור דטרמיניסטי (בלי קריאת LLM, לא סוכן חדש) שקורא את `production/visual-manifest.json`,
`on-screen-text.csv` ו-`voiceover.txt` הקיימים (דרך `recording_studio.build_shots`, בלי לפרסר
פעמיים) וכותב `production/CREATOR-HANDOFF.md` — מדריך צילום פשוט בעברית, בלי ז'רגון פיתוח, בלי
נתיבי קבצים פנימיים, בלי הסבר ארכיטקטורה.

**זהו ההנדאוף העיקרי לשני — לא דוח טכני.** אחרי הרצת Producer מאושרת (Review status: approved
+ רינדור ויזואלי תקין + Creator Handoff נכתב בהצלחה), **התגובה הסופית של Claude בשיחה חייבת
להיות תוכן `CREATOR-HANDOFF.md` עצמו, מוצג במלואו בעברית פשוטה** — לא דוח פיתוח, לא רשימת
קבצים, לא Git status, לא נתיבים כראש התגובה. פרטים טכניים (נתיבי קבצים, Git status, מה השתנה
בקוד) מותרים **רק** בסעיף נפרד ומסומן בבירור בסוף התגובה, תחת הכותרת **"פרטים טכניים למפתחים"**
— לעולם לא לפני המדריך.

**כשל בשלב הזה** (script נכשל / הקובץ לא נכתב) → לא ממציאים מדריך — מדווחים את השגיאה המדויקת,
ומראים לשני את הדוח הטכני הרגיל במקום (כישלון גלוי, לא מוסתר).

## כללי ברזל
- **אין המצאה:** אסור לייצר "הקלטת מסך", צילום, תוצאה או מוצר שלא קיימים. פער אמיתי →
  שורה ב-MANUAL-ACTIONS, לא נכס מזויף.
- הקופי נלקח כלשונו מהחבילה. תיקון היחיד המותר: פורמט (חיתוך לשורות SRT/CSV).
- `Shani status` נשאר `pending`. אין פרסום, אין תזמון, אין שליחה.
- הכל בתוך תיקיית החבילה — לא נוגעים בקבצים מחוץ ל-production/ (מלבד קריאה).
- לוגו/פונטים/צבעים: ר' `marketing-engine/producer/BRAND-GROUNDING.md` +
  `marketing-engine/producer/FONT-SOURCING.md` — מקור אמת יחיד, לא מומצא כאן מחדש.
- **ההתגובה הסופית בשיחה היא מדריך הצילום (Creator Handoff), לא דוח פיתוח** — ר' "שלב 3" למעלה.

---
name: producer
description: >
  Producer V1.2 של צוות התוכן: ממיר חבילת תוכן אחת שכבר עברה ביקורת (content-desk-package.md
  עם Review status) לתיקיית production-ready עם נכסים אמיתיים בלבד — כולל רינדור ויזואלי מלא
  אוטומטי (קאבר, כרטיסי CTA/Outro, overlays, סלוטי הקלטת-מסך, PNG+SVG, manifest, timeline,
  contact sheet, QA) דרך marketing-engine/producer/render_visuals.py. לא סוכן — פקודת תזמור.
  לא יוצר מחקר/קופי חדש, לא משנה את החבילה, לא מקליט מסך במקום שני, לא מפרסם.
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

## מצב faceless (אופציונלי)

```
/producer Package: marketing-engine/packages/<slug>/ --faceless
```

מצב זה **מוסיף** על שלב 2 הרגיל — לא מחליף את Recording Studio, ולא רץ בלי הדגל המפורש.
לאחר שרינדור הוויזואלים (שלב 2 למעלה) הצליח, מריצים ברצף, באותה הרצה:

```bash
python marketing-engine/producer/tts_cartesia.py --package "marketing-engine/packages/<slug>"
python marketing-engine/producer/assemble_reel_mp4.py --package "marketing-engine/packages/<slug>"
```

- `tts_cartesia.py` קורא את `production/voiceover.txt`, מנרמל עברית (ר' הערות בקובץ), וקורא
  ל-Cartesia (`sonic-3.5`, קול משוכפל, `he`) ישירות — לא HeyGen/Higgsfield/ElevenLabs — לתוך
  `production/narration.mp3`. `CARTESIA_API_KEY` חייב להיות במשתנה סביבה או `.env` מקומי
  (ר' `.env.example`), לעולם לא בקוד או בלוג.
- `assemble_reel_mp4.py` מרכיב את הוויזואלים הקיימים מ-`visual-timeline.csv` (ללא יצירת נכס
  חדש), מתאים את משך הסצנות לאורך `narration.mp3` בפועל, שורף את `subtitles.srt` (מתוזמן מחדש
  לאותו יחס), ומפיק `production/final-reel.mp4` (1080×1920). אם `SHANI_INTRO_AUDIO_PATH` מוגדר
  ומצביע לקובץ קיים, הוא מצורף לפני הקריינות עם איזון עוצמות (`loudnorm`).
- כשל בכל שלב (מפתח חסר, שגיאת API, ffmpeg) → עצירה ודיווח מדויק ב-`MANUAL-ACTIONS.md`, בלי
  ניסיון חוזר שקט.
- `Shani status` נשאר `pending` גם כש-`final-reel.mp4` נוצר. **לעולם לא מפרסם ולא מתזמן.**

## כללי ברזל
- **אין המצאה:** אסור לייצר "הקלטת מסך", צילום, תוצאה או מוצר שלא קיימים. פער אמיתי →
  שורה ב-MANUAL-ACTIONS, לא נכס מזויף.
- הקופי נלקח כלשונו מהחבילה. תיקון היחיד המותר: פורמט (חיתוך לשורות SRT/CSV).
- `Shani status` נשאר `pending`. אין פרסום, אין תזמון, אין שליחה.
- הכל בתוך תיקיית החבילה — לא נוגעים בקבצים מחוץ ל-production/ (מלבד קריאה).
- לוגו/פונטים/צבעים: ר' `marketing-engine/producer/BRAND-GROUNDING.md` +
  `marketing-engine/producer/FONT-SOURCING.md` — מקור אמת יחיד, לא מומצא כאן מחדש.

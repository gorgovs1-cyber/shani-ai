---
name: producer
description: >
  Producer V1 של צוות התוכן: ממיר חבילת תוכן אחת שכבר עברה ביקורת (content-desk-package.md
  עם Review status) לתיקיית production-ready עם נכסים אמיתיים בלבד. לא סוכן — פקודת תזמור.
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
- `cover-brief.md` + `assets/cover.svg` — קאבר ממותג (SVG אמיתי 1080×1920) לפי brand/visual.md.
- `assets/*.svg` — כרטיסי הגרפיקה הממותגים שהחבילה מגדירה (CTA/Outro) — SVG אמיתיים בפלטת
  המותג (רקע #141009, טקסט #F4EDE1, כתום #F2622E, Heebo), לא מוקאפים של תוכן שלא קיים.
- `export-manifest.json` — רשימת כל הקבצים, החבילה המקורית, הסטטוסים, ומה חסר.
- `MANUAL-ACTIONS.md` — הפעולות היחידות שנשארו לשני, קצר וממוספר, כולל תלויות פתוחות
  (למשל CAP-01) וסטטוס Operational readiness אם קיים.

## כללי ברזל
- **אין המצאה:** אסור לייצר "הקלטת מסך", צילום, תוצאה או מוצר שלא קיימים. פער אמיתי →
  שורה ב-MANUAL-ACTIONS, לא נכס מזויף.
- הקופי נלקח כלשונו מהחבילה. תיקון היחיד המותר: פורמט (חיתוך לשורות SRT/CSV).
- `Shani status` נשאר `pending`. אין פרסום, אין תזמון, אין שליחה.
- הכל בתוך תיקיית החבילה — לא נוגעים בקבצים מחוץ ל-production/ (מלבד קריאה).

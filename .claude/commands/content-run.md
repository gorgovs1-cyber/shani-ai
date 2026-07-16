---
name: content-run
description: >
  זרימת תוכן ידנית אחת, גלויה, מקצה לקצה: רפרנס אינסטגרם → /watch (חוץ) → Researcher → Creator
  → Reviewer (כולם דרך /content-desk הקיים, בלי שינוי) → שער חוסם על Review status → אם approved
  → /producer (כולל רינדור ויזואלי אוטומטי) → תיקיית production-ready → Shani status: pending.
  לא סוכן — עוטפת content-desk.md ו-producer.md הקיימים, בלי לשנות אותם. אין Worker, אין
  Scheduler, אין פרסום.
---

# /content-run — רפרנס אינסטגרם → חבילה מוכנה לאישור שני

## הפעלה
```
/content-run
Instagram reference URL: ...
What Shani liked (אופציונלי): ...
```

## תהליך (6 שלבים גלויים, המנצחת מבצעת בסשן אחד)

### שלב 1 — רפרנס
קבלת ה-URL. אם סופק גם ניתוח `/watch` מוכן (טקסט מודבק או נתיב קובץ) — משתמשים בו ישירות,
עוברים לשלב 3. אם לא סופק ניתוח — שלב 2.

### שלב 2 — /watch (חוץ, לא כלי בריפו הזה)
אין יכולת צפייה בווידאו בתוך הריפו הזה (אותה מגבלה מתועדת ב-content-desk.md). הפעולה היחידה:
לבקש משני להריץ `/watch` (או כלי ניתוח-וידאו מקביל) על ה-URL, ולהדביק/להפנות לפלט. **עצירה
מיידית** אם אין ניתוח אמיתי — בדיוק "כלל החסימה" הקיים ב-content-desk.md, לא עוקפים אותו כאן.

### שלב 3 — Researcher → Creator → Reviewer (דרך /content-desk, ללא שינוי)
הרצת:
```
/content-desk
Mode: Inspiration-led
Reference URL: <מהשלב 1>
Reference analysis: <מהשלב 2>
Topic / Business goal / Service to promote / Platforms / Preferred format: לפי מה ששני סיפקה,
  או ברירות המחדל הקיימות ב-content-desk.md אם חסר
What Shani liked: <אם סופק>
```
content-desk.md מריץ בעצמו Researcher → Creator → Reviewer ומרכיב `content-desk-package.md` עם
שני סטטוסים נפרדים (Review status / Shani status). שום שינוי לתהליך הזה כאן.

### שלב 4 — שער חוסם על Review status
- `Review status: approved` → ממשיכים לשלב 5.
- `Review status: needs-revision` / `needs-human-review` → **עצירה כאן**. מוצג לשני **בדיוק**:
  מה ה-Review status, מה סעיף הביקורת (5) כתב כבעיה, ומה ההחלטה הנדרשת ממנה (למשל: "לאשר תיקון
  ידני / לבקש כיוון חדש / לדחות"). **לא ממשיכים ל-Producer**, לא מנחשים תיקון.

### שלב 5 — /producer (רק אם approved)
```
/producer Package: marketing-engine/packages/<slug>/
```
מריץ producer.md V1.2 — קבצי production/ הרגילים **וגם** רינדור ויזואלי אוטומטי (קאבר/CTA/
overlays/סלוטים/PNG+SVG/manifest/timeline/contact sheet/QA) דרך `render_visuals.py`, ללא בקשה
נפרדת. ר' producer.md לפרטים.

### שלב 6 — תיקיית production-ready + סטטוס
דיווח לשני: נתיב `marketing-engine/packages/<slug>/production/`, `Shani status: pending`
(תמיד — אף שלב כאן לא קובע Shani status חוץ משני עצמה), ורשימת הפעולות שנשארו לה
(`MANUAL-ACTIONS.md`).

## כללי ברזל
- לא בונה סוכן חדש, לא נוגעת ב-researcher.md / creator.md / reviewer.md / client-desk.md.
- לא נוגעת ב-content-desk.md או ב-producer.md — רק קוראת להם, לפי הממשק הקיים שלהם.
- אין Worker, אין Scheduler, אין תזמון — הרצה ידנית אחת, "עכשיו", מקצה לקצה.
- אין פרסום בשום שלב. `Shani status` תמיד `pending` בסוף ריצה מוצלחת.
- Review status לא approved → עצירה לפני Producer, תמיד. לא "תיקון אוטומטי במקום שני".
- שום נכס חזותי מזויף — אותם כללי-ברזל של producer.md תקפים במלואם.

# VISUAL-QA.md — בדיקת אימות ויזואלית (Producer V1.2 — brand-grounded)

> נוצר אוטומטית ע"י `marketing-engine/producer/render_visuals.py`, מבוסס על `marketing-engine/producer/BRAND-GROUNDING.md`.

## 1. ספירה: צפוי מול נוצר

| קטגוריה | צפוי | נוצר | סטטוס |
|---|---|---|---|
| full-screen cards | 2 | 2 | ✅ |
| overlays (caption + step-badge) | 6 | 6 | ✅ |
| manual recording slots | 6 | 6 | ✅ |

## 2. עיגון מותג

לוגו: geometry אמיתי מ-`public/logo.svg`. גופן: `Heebo (real, see FONT-SOURCING.md)`. מונו: `JetBrains Mono (real, see FONT-SOURCING.md)`. צבעים: #F2622E / #F4EDE1 / #968F84 / #141009 — כולם מאומתים מול globals.css ומדגימת פיקסלים מהריל שהועלה. ר' `BRAND-GROUNDING.md` לעדות המלאה.

## 3. סגנון כרטיסי גרפיקה (graphic shots)

שוטי שאלה/outro (`cta`, `outro`) → כרטיס headline ממורכז (אותו סגנון כמו הקאבר). שוטי הוראת-פעולה (`cta_outro`, `cta_keyword`) → כפתור אורגני מלא (solid fill), תואם בדיוק את פריים הסיום בריל האמיתי. הבחירה נגזרת מתפקיד השוט (`role`) בנתוני החבילה, לא זהות מלאכותית בין כל השוטים.

## 4. תוצאה

**כל הבדיקות עברו — אין פגם רינדור חוסם.**

Contact sheet: `CONTACT-SHEET.png`

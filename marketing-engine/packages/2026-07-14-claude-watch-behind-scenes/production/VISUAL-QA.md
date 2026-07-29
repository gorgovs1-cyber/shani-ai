# VISUAL-QA.md — בדיקת אימות ויזואלית (Producer V1.2 — brand-grounded)

> נוצר אוטומטית ע"י `marketing-engine/producer/render_visuals.py`, מבוסס על `marketing-engine/producer/BRAND-GROUNDING.md`.

## 1. ספירה: צפוי מול נוצר

| קטגוריה | צפוי | נוצר | סטטוס |
|---|---|---|---|
| full-screen cards | 3 | 3 | ✅ |
| overlays (caption + step-badge) | 11 | 11 | ✅ |
| manual recording slots | 7 | 7 | ✅ |

## 2. עיגון מותג

לוגו: geometry אמיתי מ-`public/logo.svg`. גופן: `DejaVu Sans (Heebo unavailable — closest match, see BRAND-GROUNDING.md)`. מונו: `DejaVu Sans Mono (JetBrains Mono unavailable — closest match)`. צבעים: #F2622E / #F4EDE1 / #968F84 / #141009 — כולם מאומתים מול globals.css ומדגימת פיקסלים מהריל שהועלה. ר' `BRAND-GROUNDING.md` לעדות המלאה.

## 3. סגנון שוטים 8/9

שוט 8 (שאלה) → כרטיס headline ממורכז (אותו סגנון כמו הקאבר). שוט 9 (הוראת CTA) → כפתור אורגני מלא (solid fill), תואם בדיוק את פריים הסיום בריל האמיתי. שתי הבחנות שונות בפועל בהתאם לתפקיד השוט, לא זהות מלאכותית.

## 4. תוצאה

**כל הבדיקות עברו — אין פגם רינדור חוסם.**

Contact sheet: `CONTACT-SHEET.png`

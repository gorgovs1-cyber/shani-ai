# Producer V1.1 — רינדור ויזואלי ממותג

תוספת ל-Producer V1 הקיים (`.claude/commands/producer.md`). Producer V1 בנה את תיקיית
`production/` (תסריט, כתוביות, shot-list, קאבר/CTA כ-SVG בודדים). **הפער שזוהה:** רק 3 נכסים
חזותיים נוצרו בפועל (קאבר + 2 כרטיסי CTA), ללא PNG, ללא overlays לשוטי הדגמת-מסך, ללא manifest
של ציר-זמן. V1.1 סוגר את הפער הזה — רינדור מלא, דטרמיניסטי, מקומי, בלי תלות בכלי AI חיצוני.

## מה זה

`render_visuals.py` — סקריפט Python (Pillow + emitter SVG משלים), שקורא את חבילת ה-production/
הקיימת ומרנדר את כל הנכסים החזותיים שניתן לייצר באמת בלי להמציא הוכחת-מסך. משתמש **באותה טכניקת
RTL עברית מוכחת** כמו `carousels/gen_v6.py` (`raqm` אם זמין, אחרת `python-bidi` עם `base_dir='R'`
— ר' `carousels/HEBREW_RTL_NOTES.md`). לא נוגע ב-`gen_v6.py` ולא בשום סוכן קיים.

## הרצה

```bash
python3 marketing-engine/producer/render_visuals.py --package "marketing-engine/packages/<slug>" --type reel
```

מצב `--type carousel` קיים ופונקציונלי (`render_carousel_package`), אך דורש קריאה ישירה
מ-Python עם רשימת סלايds (תוכן מהחבילה) — אין עדיין חבילת קרוסלה שאושרה לריצת קבלה, ולכן לא
נחשף כ-CLI מלא. הפונקציונליות זהה עקרונית לנתיב ה-Reel: 1080×1350, RTL-safe, מספור, SVG+PNG.

## מה נוצר (עבור ריל)

לכל שוט בחבילה (מ-`shot-list.md`/`package.md`), לפי הסוג שלו:

- **כרטיסים מלאים (full-screen, אטומים)** — קאבר, כרטיסי CTA/Outro. אלה כבר "מוכנים" — לא
  תלויים בשום דבר נוסף.
- **Overlays (שקופים)** — כיתוב-על-מסך לכל שוט הדגמת-מסך אמיתית (1–7), מיועדים להנחה **מעל**
  ההקלטה האמיתית ב-CapCut, לא כתחליף לה. כולל תגי "שלב 1–4" אופציונליים לשוטים 4–7 (לפי
  package.md: "זום/וויפ-קאט קל אפשרי על תוויות שלב 1–4").
- **סלוטים ידניים (manual-recording-slot)** — כרטיס placeholder אטום, מסומן במפורש
  "SCREEN RECORDING SLOT" + "לא לפרסום, לא הקלטה סופית", לכל שוט שדורש הקלטה אמיתית. משמש
  רק כהפניה חזותית בציר הזמן (contact sheet) — **אף פעם לא מוצג כהוכחה סופית**.

כל נכס יוצא כ-SVG (עורך את אותו סגנון-יד כמו `cover.svg`/`cta-shot8.svg`/`cta-shot9.svg`
הקיימים) **וגם** PNG (Pillow, מוכן-שימוש ישיר ב-CapCut בלי המרה ידנית).

## פלט

בתוך `<package>/production/`:
- `visuals/svg/` — SVG לכרטיסים מלאים + סלוטים.
- `visuals/png/` — PNG לאותם נכסים.
- `visuals/overlays/` — overlays שקופים (SVG+PNG) — כיתובים + תגי-שלב.
- `visuals/previews/` — PNG "flattened" (overlay מורכב על רקע ניטרלי) — לצפייה אנושית בלבד,
  כי PNG שקוף-לגמרי לא ניתן להערכה ויזואלית בתצוגה רגילה.
- `visual-manifest.json` — כל נכס: filename (svg+png), purpose, format, dimensions, start/end
  time, type (full-screen/overlay/manual-recording-slot), source_text מהחבילה.
- `visual-timeline.csv` — אותו מידע, שטוח, ממוין לפי זמן.
- `CONTACT-SHEET.png` — רשת אחת עם כל רצף הנכסים (קאבר → שוט 1 → ... → שוט 9), לתצוגה כוללת.
- `VISUAL-QA.md` — בדיקת הוולידציה היחידה שהמשימה דרשה: ספירה צפוי/נוצר, מיפוי לקטגוריות
  הגנריות של המשימה, RTL, חיתוך טקסט, שוליים בטוחים, שלמות מניפסט.

## כללי ברזל (זהים ל-Producer V1, לא הוחלשו)

- אין המצאת הקלטת מסך/תוצאה/מוצר. שוטים שדורשים הקלטה אמיתית → סלוט מסומן, לא נכס מזויף.
- כל טקסט מועתק כלשונו מהחבילה (shot-list.md / on-screen-text.csv / package.md /
  cover-brief.md). הסקריפט לא מחבר קופי חדש.
- `Shani status` נשאר `pending`. אין פרסום/תזמון/שליחה.
- פלט מוגבל ל-`<package>/production/` בלבד.

## תלות בפונטים (Heebo / JetBrains Mono)

הסקריפט מחפש Heebo/JetBrains Mono במיקומים סטנדרטיים (Windows Fonts, `~/.fonts`) ונופל
בחזרה ל-DejaVu Sans (Linux) / Arial (Windows) אם לא נמצאים — **בדיוק אותו דפוס** כמו
`gen_v6.py`. במחשב של שני (Windows, ללא `raqm` לפי `HEBREW_RTL_NOTES.md`) הרינדור ישתמש
אוטומטית ב-`python-bidi` + הפונט הזמין. להתקנת Heebo/JetBrains Mono בפועל (איכות טיפוגרפית
גבוהה יותר) — לא נדרש לתפקוד, שיפור אופציונלי בלבד.

## עדכון נדרש ב-`.claude/commands/producer.md` (לא בוצע — חסום, גם ב-V1.2)

`.claude/commands/` כולה חסומה לעריכה מתוך סשנים אלו (הגנת נתיב של Cowork על תיקיית הגדרות
הפקודות — נבדק מפורשות עם גם Edit וגם Write בסבב V1.2, שניהם חסומים באופן עקבי). זו הגנה
מכוונת על קבצים שמריצים סשנים עתידיים, לא בעיית הרשאות רגילה — לא עוקפים אותה דרך bash.

**התוכן המלא, מוכן להעתקה ידנית, נמצא ב-`PENDING-COMMAND-UPDATES/`** בשורש הריפו (לא כאן) —
`producer.md` (מחליף את כל `.claude/commands/producer.md`, משדרג ל-V1.2 עם שלב רינדור אוטומטי)
ו-`content-run.md` (קובץ פקודה חדש). ר' ה-README בתוך אותה תיקייה להוראות המדויקות.

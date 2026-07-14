# V2-MIGRATION.md — n8n Reconnection Steps

מסמך תפעולי בלבד: שלבי חיבור-מחדש ב-n8n אחרי ייבוא `form-to-proposal-v2-revised.json`
לתוך **workflow ריק וחדש** (לא לייבא מעל ה-workflow הקיים). קובץ זה משקף גרסה
שנבדקה בפועל ב-n8n ואומתה מול הרפו — כולל תיקון ה-lookup המתועד בסעיף 7.

## 1. Google Sheets — Credential

בשני צמתי ה-Google Sheets (**Lookup by submissionId**, **Google Sheets (CRM
לידים)**) לבחור את ה-Google Sheets OAuth2 הקיים (אותו credential בשניהם).

## 2. בחירת הגיליון

**Document** → From List → לבחור **`לידים – אבחון`**.
**Sheet** → From List → לבחור **`Form to Proposal V2`**.
לחזור על כך בנפרד בשני הצמתים (השדות מגיעים ריקים בכוונה אחרי הייבוא).

## 3. מיפוי עמודות

צומת ה-Append משתמש ב-**Auto-map Input Data** (autoMapInputData) — אין למפות
ידנית. הסכימה כוללת 24 עמודות (5 מטא + 19 שדות טופס), זהה לכותרות בגיליון.

## 4. Gmail — Credential

בשלושת הצמתים הפעילים (**התראה אלייך**, **מייל תודה ללקוח**, **התכנית אלייך**)
ובארבעת הצמתים המושבתים — לבחור את ה-Gmail OAuth2 הקיים.

## 5. Anthropic — Credential

בצומת **מנוע הסוכנים (Claude)** לבחור את ה-Header Auth הקיים (מפתח Anthropic
API).

## 6. placeholder של אימייל פנימי

להחליף בשני המקומות (**התראה אלייך**, **התכנית אלייך** — שדה `sendTo`):
`REPLACE_WITH_INTERNAL_EMAIL@example.com` → כתובת המייל הפנימית האמיתית.

## 7. אימות תיקון ה-lookup (חשוב)

בצומת **Google Sheets: Lookup by submissionId**, שדה `lookupValue`, צריך להיות:
`={{ $('Validate & Normalize').first().json.submissionId }}`
ה-`=` המוביל הוא סימון-ביטוי סטנדרטי של n8n בלבד — הערך המתקבל בפועל הוא
ה-submissionId הגולמי, בלי `=` בתחילתו. **לא** `={{ $json.submissionId }}` —
זו הייתה הגרסה השבורה שגרמה לזיהוי-כפילות שגוי.

## 8. בדיקות שבוצעו ואומתו

- **שליחה חדשה**: submissionId חדש → שורה נוצרה בגיליון, תגובה
  `{"ok":true,"duplicate":false}`.
- **שליחה כפולה**: אותו submissionId נשלח שוב → **לא** נוצרה שורה נוספת,
  תגובה `{"ok":true,"duplicate":true}`.

## 9. הצמתים המושבתים

**אישור ההצעה**, **שליחת ההצעה ללקוח**, **כפתור: בקשת חומרים**, **בקשת חומרים
ללקוח** — נשארים `disabled: true` ומנותקים לגמרי מה-`connections`. לחיבור-מחדש
בעתיד: לחבר קשת מ-"התכנית אלייך", להסיר Disabled, לבדוק על ליד-בדיקה בלבד.

## 10. הפעלה

רק אחרי סעיפים 1–7: מתג **Active**. עד אז ה-workflow חייב להישאר לא-פעיל.

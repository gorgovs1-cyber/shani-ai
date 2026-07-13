# SETUP.md — n8n Audit Intake Workflow

מסמך הפעלה תפעולי בלבד. אינו מסמך ארכיטקטורה ואינו ה-MVP spec. Google Sheets היא בחירת
אחסון זמנית ל-MVP בלבד — לא החלטה ארכיטקטונית קבועה.

## 1. ייבוא ה-workflow

ב-n8n: **Workflows → Add workflow → Import from File** → לבחור את
`audit-intake-workflow.json`. ה-workflow ייובא **לא פעיל** (`active: false`) במכוון.

## 2. יצירת Google Sheet

ליצור Google Sheet חדש (או גיליון חדש בתוך Sheet קיים). זהו אחסון ה-MVP הזמני בלבד.

## 3. כותרות עמודות נדרשות (סדר מדויק, שורה 1)

```
submissionId, receivedAt, source, payloadVersion, processingStatus,
העסק, הבעיה הכי חשובה, שם, אימייל, מטרה, מיקום עבודה, יום עבודה,
משימה חוזרת, שיקרה לבד, מקור לקוחות, אחרי פנייה, שאלות חוזרות, כלים,
כלים נוספים, אתר, קישור לאתר, חסר, דחיפות, קשר נוסף
```

24 עמודות. השמות חייבים להיות **זהים בדיוק** (כולל רווחים) — המיפוי לגיליון הוא
name-matching אוטומטי (`autoMapInputData`).

## 4. בחירת Google Credential

בכל אחד משני צמתי ה-Google Sheets (Lookup, Append): ללחוץ על שדה ה-Credential →
**Create New Credential** → OAuth2 (מומלץ) או Service Account → לבצע את זרימת ההרשאה
מול חשבון Google שבבעלותך. שני הצמתים חייבים להצביע על אותו credential.

## 5. בחירת הגיליון

בכל אחד משני צמתי ה-Google Sheets: שדה **Document** → From List → לבחור את ה-Sheet
שנוצר בסעיף 2. שדה **Sheet** → From List → לבחור את הלשונית עם הכותרות מסעיף 3.
יש לחזור על כך בשני הצמתים בנפרד.

## 6. הפעלת ה-workflow

לאחר שהוגדרו ה-credential וה-sheet בשני הצמתים: מתג **Active** בפינה הימנית-עליונה.
ה-workflow **נשאר לא-פעיל** עד לביצוע סעיפים 4–5 במלואם.

## 7. העתקת כתובת ה-Production Webhook

בצומת **Webhook: Audit Intake v1** → לפתוח → ללחוץ על **Production URL** → Copy.
הכתובת בפורמט `https://<n8n-instance>/webhook/audit-intake/v1`.

## 8. הגדרת `N8N_AUDIT_WEBHOOK_URL` ב-Vercel

Vercel Dashboard → הפרויקט → **Settings → Environment Variables** → להוסיף
`N8N_AUDIT_WEBHOOK_URL` עם הערך שהועתק בסעיף 7. להחיל על Production (ו-Preview אם רוצים
לבדוק שם). אין להדביק את הכתובת בקוד או ב-`.env.example`.

## 9. Redeploy

לאחר שמירת המשתנה: **Deployments → ⋯ → Redeploy** על ה-deployment האחרון (משתני סביבה
נטענים רק ב-build/deploy חדש, לא רטרואקטיבית).

## 10. בדיקה מוצלחת — עברית

לשלוח לנתיב `/api/audit/intake` בקשת POST (או למלא את `/audit` בפועל) עם JSON תקין
הכולל את 4 השדות החובה (`העסק`, `הבעיה הכי חשובה`, `שם`, `אימייל` תקין), למשל
`העסק: "מספרת בוטיק בתל אביב"`. תוצאה מצופה: `{"ok":true,"submissionId":"...",
"duplicate":false}` ושורה חדשה בגיליון עם הטקסט העברי שמור במדויק.

## 11. בדיקת שדה-חובה חסר

לשלוח את אותה בקשה כשחסר `שם` (או ריק). תוצאה מצופה: תשובה לא-2xx (400), ללא כתיבה
לגיליון, ללא חשיפת פרטים פנימיים.

## 12. בדיקת שליחה כפולה

לשלוח שוב את **אותו** JSON בדיוק מסעיף 10 (אותו `submissionId`, כפי שנוצר ע"י
`/api/audit/intake` — לצורך הבדיקה אפשר לשלוח את אותה בקשה פעמיים ברצף אל n8n ישירות
עם submissionId זהה). תוצאה מצופה: `{"ok":true,"submissionId":"...","duplicate":true}`.

## 13. וידוא שלא נוצרה שורה כפולה

בגיליון עצמו: לספור כמה שורות קיימות עם אותו `submissionId` מסעיף 12. חייבת להיות
**שורה אחת בלבד**.

## 14. השבתה בטוחה

מתג **Active** → כבוי. אין השפעה על נתונים קיימים בגיליון. בקשות עתידיות מ-`/api/audit/intake`
ייכשלו בבטחון (timeout/non-2xx) ב-Next — לא ייכתבו לשום יעד חלופי.

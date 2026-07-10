# דשבורד אנליטיקה מאוחד, הוראות חיבור והרצה

שלב 2. שלב 1 (הכנת Meta) נמצא ב`shani ai/instagram-dashboard/01-מדריך-הכנה-META.md`. עשי אותו קודם, כי בלי ה-App ID וה-Secret אי אפשר לחבר את אינסטגרם.

המערכת מושכת נתונים מאינסטגרם ומ-Vercel פעם ביום, שומרת snapshot ב-Supabase, והדף קורא את הנתונים ומציג. אפס גרירה ידנית. הסוכן היומי של Claude נשאר רק בשביל הטקסט של "מה עבד" ו"הצעות".

## מה נבנה בתוך shifted-tech

```
lib/analytics/
  types.ts        הטיפוסים המשותפים
  supabase.ts     חיבור שרת ל-Supabase (service role)
  instagram.ts    OAuth, רענון טוקן, ומשיכת תובנות
  vercel.ts       משיכה מ-Vercel Web Analytics API
  collect.ts      מאחד את שני המקורות ושומר snapshot
app/api/
  cron/refresh        ריצה יומית, מושך ושומר
  auth/instagram      התחלת חיבור אינסטגרם
  auth/instagram/callback  קבלת הטוקן ושמירתו
  dashboard           מחזיר את ה-snapshot האחרון כ-JSON
public/dashboard.html הדף המעוצב, קורא מ-/api/dashboard
supabase/schema.sql   הטבלאות
vercel.json           הוספת ה-cron היומי
```

## צעד 1, התקנת התלות

```bash
npm install
```

הוספתי `@supabase/supabase-js` ל-package.json, ההתקנה תמשוך אותו.

## צעד 2, Supabase

בפרויקט ה-Supabase הקיים, SQL Editor, New query, להדביק את התוכן של `supabase/schema.sql` ולהריץ. זה יוצר שתי טבלאות עם RLS דלוק בלי policies, כך שרק ה-service role key ניגש אליהן. מפתח ה-anon לא רואה כלום.

## צעד 3, משתני הסביבה

להעתיק את `.env.example` ל`.env.local` ולמלא. את אותם ערכים בדיוק צריך להוסיף גם ב-Vercel, Project, Settings, Environment Variables.

מאיפה כל ערך:

- `INSTAGRAM_APP_ID`, `INSTAGRAM_APP_SECRET`, מהאפליקציה ב-Meta for Developers.
- `INSTAGRAM_REDIRECT_URI`, בדיוק מה שרשמת באפליקציה. לוקאלי `http://localhost:3000/api/auth/instagram/callback`, בפרודקשן עם הדומיין.
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, מ-Supabase, Project Settings, API. ה-service role, לא ה-anon.
- `VERCEL_TOKEN`, Vercel, Account Settings, Tokens.
- `VERCEL_PROJECT_ID`, בפרויקט shani-ai, Settings, General.
- `VERCEL_TEAM_ID`, להשאיר ריק, החשבון שלך אישי.
- `CRON_SECRET`, מחרוזת אקראית שתמציאי. מגן על הריצה היומית מקריאות מבחוץ.

חשוב, אף אחד מהם אינו `NEXT_PUBLIC`. הכל צד שרת בלבד. הטוקן לא נחשף ללקוח בשום שלב.

## צעד 4, לחבר את אינסטגרם פעם אחת

להריץ מקומית `npm run dev`, ואז לפתוח בדפדפן:

```
http://localhost:3000/api/auth/instagram
```

זה שולח אותך לאישור באינסטגרם. אחרי האישור, הקוד מוחלף לטוקן ארוך של 60 יום, נשמר ב-Supabase, ואת חוזרת לדשבורד. מכאן הרענון אוטומטי, כל עוד המערכת רצה לפחות פעם ב-60 יום. את זה ה-cron היומי מבטיח.

## צעד 5, ריצת בדיקה

```
http://localhost:3000/api/cron/refresh?secret=<ה-CRON_SECRET-שלך>
```

מחזיר JSON עם `ok:true` ומספרים. אם משהו נכשל, ההודעה תגיד מה. אחר כך לפתוח:

```
http://localhost:3000/dashboard.html
```

הדף אמור להתמלא. בפרודקשן זה יהיה `https://<הדומיין>/dashboard.html`.

נקודה אחת לאמת בבדיקה, מספר המבקרים באתר. הוא אמור להתאים למה שרואים בלוח Vercel Analytics לשבעה ימים. אם יש פער, נחדד את השאילתה, זה תיקון קטן ב-`lib/analytics/vercel.ts`.

## צעד 6, אוטומציה

ה-cron כבר מוגדר ב-`vercel.json` לרוץ כל יום ב-06:00 UTC. אחרי deploy ל-Vercel והוספת משתני הסביבה שם, זה פועל לבד. Vercel שולח את ה-CRON_SECRET אוטומטית בכותרת, אז הריצה מאושרת רק לו.

## מה שנשאר, חיבור הסוכן היומי לטקסט

היום הסוכן היומי עורך קובץ HTML. במערכת החדשה הוא צריך לכתוב את הניתוח לתוך העמודה `narrative` של ה-snapshot האחרון ב-Supabase, אובייקט עם `worked`, `strengthen`, `suggestions`, כל אחד מערך של משפטים. המספרים כבר מגיעים מ-API, הסוכן רק מוסיף את הפרשנות. אני יכולה לעדכן את הסוכן לזה כשתגידי, זה השלב הבא.

## אבטחה, בקצרה

הטוקנים וה-service role key חיים רק בצד שרת ובמשתני סביבה. הטבלאות נעולות ב-RLS. הדף `/dashboard.html` מסומן noindex. אם תרצי שגם ה-JSON ב-`/api/dashboard` יהיה מוגן בסיסמה ולא ציבורי, זו תוספת קטנה, תגידי.

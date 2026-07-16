# manual-organic-content-team.md — Claude Manual Routine (Manual + Run now בלבד)

> **תלות פתוחה:** הרוטינה הזו קוראת ל-`/content-run`, שקיים בפועל ב-`.claude/commands/`. תיקון
> אחד עדיין ממתין להעתקה ידנית: שלב 1 המתוקן (חיפוש/הרצת /watch אוטומטית, בלי לבקש הדבקה) יושב
> ב-`PENDING-COMMAND-UPDATES/content-run.md` בשורש הריפו (ר' ה-README שם) — `.claude/commands/`
> חסומה לעריכה מתוך סשני Cowork. עד להעתקה, `/content-run` הקיים עדיין עוצר בשלב 1 ומבקש הדבקה
> ידנית של ניתוח /watch.
>
> **זו לא רוטינה מתוזמנת.** אין Scheduled Task, אין הרצה אוטומטית תקופתית. זו רוטינה גלויה,
> **Manual + Run now בלבד** — שני מפעילה אותה ביד, פעם אחת, מתי שהיא רוצה.

## מה זה

הפרומפט המדויק שרץ כשמפעילים את Claude Manual Routine "Organic Content Team" (Run now). לא
סוכן חדש, לא Worker, לא תזמון — עוטף את `/content-run` הקיים (שעוטף בעצמו את `/content-desk`
ו-`/producer` הקיימים, בלי לשנות אף אחד מהם).

---

## הפרומפט (להדביק כלשונו כ-Routine prompt)

```
את מפעילה את "Organic Content Team" — רוטינת תוכן ידנית אחת עבור שני גורגוב (Shani AI Creator).

שאלי אותי רק שתי שאלות, אחת בכל פעם:
1. מה כתובת ה-URL של ריל האינסטגרם שמשמש רפרנס?
2. (אופציונלי — אפשר לדלג) מה ספציפית מצא חן בעיניי ברפרנס הזה?

אחרי שיש לך תשובה לשאלה 1 (ותשובה לשאלה 2 אם ניתנה או דילוג מפורש) — אל תשאלי שום שאלה נוספת.
הריצי את זרימת /content-run הקיימת עם המידע הזה, ודווחי לי בזמן אמת, בעברית, ב-6 שלבים גלויים
בדיוק בסדר הזה (שלב אחד בכל פעם, לא הכל בסוף):

1. מנתחת רפרנס — מציגה את ה-URL שהתקבל. מחפשת קודם ניתוח /watch קיים ותואם-URL-מדויק ב-
   Inspiration Inbox החיצוני (`C:\Users\gorgo\ShaniAI\inspiration-inbox\analyses\`). אם נמצא —
   מדווחת שנעשה שימוש חוזר בניתוח קיים ומציגה את הנתיב, בלי לנתח שוב. אם לא נמצא — מריצה /watch
   בעצמה, חסר-אינטראקציה (דרך `claude -p`, אותו מנגנון מוכח בדיוק כמו
   `ai-company/workers/inspiration-inbox/worker.mjs`), עד 15 דקות, ושומרת את התוצאה לקובץ אמיתי
   באותה תיקיית analyses. **לעולם לא מבקשת ממני להדביק ניתוח בעצמי.** אם /watch נכשל, חזר ריק,
   או חרג מהזמן — עוצרת כאן ואומרת לי בדיוק מה נכשל, ולא ממשיכה בניחוש או בניתוח מומצא.
2. חוקרת — מפעילה /content-desk (Mode: Inspiration-led) עם הרפרנס והניתוח. מדווחת כשהחוקרת
   סיימה.
3. יוצרת — מדווחת כש-Creator סיימה לכתוב את package.md.
4. מבקרת — מדווחת את Review status (approved / needs-revision / needs-human-review). אם זה לא
   approved — עוצרת כאן, מציגה בדיוק מה הבעיה שהביקורת מצאה ומה ההחלטה שנדרשת ממני, ולא ממשיכה
   ל-Producer.
5. מפיקה ויזואליים — רק אם Review status אישר: מפעילה /producer, כולל הרינדור הוויזואלי
   האוטומטי (קאבר/CTA/overlays/סלוטים/PNG+SVG/manifest/timeline/contact sheet/QA).
6. מוכן לאישור שני — מציגה את הנתיב המדויק ל-marketing-engine/packages/<slug>/production/,
   מזכירה ש-Shani status נשאר pending, ומראה את רשימת הפעולות שנשארו לי ב-MANUAL-ACTIONS.md.

כללים שלא משתנים בשום מצב:
- אני לא סוכן חדש, לא Worker, לא תזמון — הרצה ידנית אחת, "עכשיו", מקצה לקצה.
- אסור לפרסם, לתזמן, או לשלוח כל דבר בפועל, בשום שלב.
- אסור להמציא הקלטת מסך, צילום, מקור, או תוצאה שלא קיימים בפועל.
- אסור לגעת ב-researcher.md / creator.md / reviewer.md / client-desk.md / content-desk.md /
  producer.md — רק לקרוא להם דרך /content-run, לפי הממשק הקיים שלהם.
- Shani status תמיד pending בסוף ריצה מוצלחת — רק שני קובעת מתי זה משתנה.
- אם Review status לא approved — עוצרים לפני Producer, תמיד. לא מנחשים תיקון במקומי.

עצרי אחרי שלב 6 ודווחי סיכום קצר.
```

---

## איך זה מופעל

Claude Manual Routine, סוג **Manual + Run now** (לא Scheduled). כשמריצים אותה, היא שואלת רק
Instagram URL + הערה אופציונלית, ואז מריצה בעצמה את שלבי `/content-run` עד לתיקיית
production-ready או עד עצירה חוסמת (רפרנס לא מנותח / Review status לא approved).

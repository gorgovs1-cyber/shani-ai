"use client";

import { useLang } from "@/components/LanguageProvider";
import Footer from "@/components/Footer";
import { openCookieSettings } from "@/components/CookieConsent";

const HEEBO = "'Heebo', var(--font-heebo), sans-serif";
const MONO = "'JetBrains Mono', var(--font-mono), monospace";

type Table = { head: string[]; rows: string[][] };
type Link = { href: string; label: string };
type Section = { heading: string; body?: string; items?: string[]; table?: Table; cookieButton?: boolean; link?: Link };
type Copy = { kicker: string; title: string; updated: string; intro: string; sections: Section[]; cookieBtn: string };

/**
 * Written as factual disclosure of what this codebase actually does.
 * Every processor named below appears in the code: GA4 + Meta Pixel
 * (components/AnalyticsScripts.tsx), Vercel (hosting + @vercel/analytics),
 * Formspree (components/LeadMagnet.tsx, app/guides/page.tsx), Supabase and
 * Resend and the n8n → Google Sheets webhook (lib/proposals/sign.ts).
 */
const COPY: Record<"he" | "en", Copy> = {
  he: {
    kicker: "מדיניות",
    title: "מדיניות פרטיות",
    updated: "עודכן: אוגוסט 2026",
    cookieBtn: "פתיחת הגדרות העוגיות",
    intro:
      "המסמך הזה מפרט בדיוק איזה מידע נאסף באתר shani-ai.com, מי מעבד אותו, לאן הוא עובר ומה אפשר לעשות בנוגע אליו. הוא כתוב כדי שתדעו בדיוק על מה אתם מסכימים לפני שאתם מסכימים.",
    sections: [
      {
        heading: "מי אחראית על המידע",
        body:
          "בעלת האתר והאחראית על מאגר המידע היא שני גורגוב (Shani AI Creator), עוסק פטור מספר 300585536, הפועלת בישראל. לכל פנייה בנושא פרטיות — עיון במידע, תיקון, מחיקה, הסרה מדיוור או בקשה לפרטים נוספים על ספק מסוים — אפשר לכתוב לכתובת shani.creates.ai@gmail.com. אענה לפניות בעצמי; אין באתר ממונה הגנת פרטיות נפרד.",
      },
      {
        heading: "איזה מידע נאסף בפועל",
        items: [
          "טופס קבלת הפרומפטים והמדריכים: כתובת האימייל שמסרתם, לצד סימון ההסכמה לדיוור, נוסח ההסכמה המדויק ומועד הסימון.",
          "פנייה בוואטסאפ מהאתר: הלחיצה מעבירה אתכם לוואטסאפ, וההתכתבות עצמה מתנהלת בוואטסאפ ולא באתר.",
          "חתימה על הצעת מחיר (עמודי /work וחתימה דיגיטלית): שם פרטי, שם העסק, מספר עוסק או ח.פ, כתובת אימייל, החתימה עצמה — מוקלדת ו/או מצוירת ביד כתמונה — נוסח התנאים שנחתמו, מועד החתימה, כתובת ה-IP שממנה נחתמה ההצעה ומזהה הדפדפן (User-Agent). ה-IP וה-User-Agent נאספים כראיה לזהות החותם ולמועד החתימה.",
          "מדידת שימוש: אם אישרתם עוגיות מדידה, Google Analytics 4 ו-Meta Pixel אוספים מזהה גלישה, עמודים שנצפו, מקור ההגעה, סוג מכשיר ודפדפן וכתובת IP מקוצרת.",
          "מדידה ללא עוגיות: Vercel Analytics סופר צפיות בעמודים ללא עוגיות וללא יצירת פרופיל אישי. הוא פועל תמיד, גם בלי הסכמה לעוגיות.",
          "הגדרות מקומיות שנשמרות בדפדפן שלכם בלבד: שפת הממשק, הגדרות הנגישות, האם הוצג מסך הפתיחה, האם נפתחה ספריית המדריכים ומה בחרתם בהודעת העוגיות.",
        ],
      },
      {
        heading: "למה המידע משמש",
        items: [
          "שליחת החומר שביקשתם (הפרומפטים והמדריכים) והמענה לפניות.",
          "דיוור שיווקי במייל — רק למי שסימן במפורש את תיבת ההסכמה בטופס.",
          "הפקת הצעת מחיר חתומה, שליחתה לשני ולחותם, ושמירת עותק כראיה להסכם.",
          "הבנה אילו עמודים באתר עובדים ושיפור האתר.",
          "מדידת קמפיינים והתאמת פרסום ברשתות של Meta — רק אם אישרתם עוגיות.",
        ],
      },
      {
        heading: "דיוור ורשימת תפוצה",
        body:
          "אני שולחת דיוור שיווקי רק למי שסימן בעצמו את תיבת ההסכמה בטופס באתר. התיבה אינה מסומנת מראש, ובלי סימון שלה הטופס לא נשלח. יחד עם ההרשמה נשמר גם נוסח ההסכמה שאושר ומועד האישור. בכל הודעה יופיע קישור הסרה, ואפשר גם למלא בקשת הסרה בעמוד ההסרה שבאתר: shani-ai.com/unsubscribe. לחלופין אפשר פשוט להשיב למייל או לכתוב ל-shani.creates.ai@gmail.com ולבקש הסרה — הבקשה תבוצע ולא יישלחו הודעות נוספות. ההסכמה ניתנת מרצון וניתן לחזור בה בכל רגע. הזכות הזו נשענת על ס' 30א לחוק התקשורת (בזק ושידורים), התשמ\"ב-1982.",
        link: { href: "/unsubscribe", label: "מעבר לעמוד ההסרה מדיוור" },
      },
      {
        heading: "עוגיות וטכנולוגיות מעקב",
        body:
          "האתר עושה שימוש בעוגיות — לא \"עשוי\". חלקן נחוצות לתפעול ונשמרות רק בדפדפן שלכם, וחלקן שייכות לצד שלישי ומשמשות למדידה ולפרסום. עוגיות המדידה והפרסום של Google ו-Meta נטענות אך ורק אחרי שאישרתם אותן בהודעת העוגיות; עד אז הן אינן פועלות כלל. אפשר לשנות את הבחירה בכל רגע דרך הקישור \"הגדרות עוגיות\" שבתחתית כל עמוד. הטבלה הבאה מפרטת את כל העוגיות והמפתחות שהאתר מציב:",
        table: {
          head: ["שם", "סוג ומטרה", "משך שמירה", "בעלים"],
          rows: [
            ["_ga", "עוגיית צד שלישי. מבחינה בין גולשים שונים לצורך סטטיסטיקת שימוש ב-Google Analytics 4.", "עד 24 חודשים", "Google"],
            ["_ga_G-35YVB7955E (_ga_*)", "עוגיית צד שלישי. שומרת את מצב הסשן והמדידה של נכס ה-GA4 של האתר.", "עד 24 חודשים", "Google"],
            ["_fbp", "עוגיית צד שלישי. מזהה את הדפדפן עבור Meta Pixel לצורך מדידת המרות והתאמת פרסום בפייסבוק ובאינסטגרם.", "עד 3 חודשים", "Meta"],
            ["shani-cookie-consent", "אחסון מקומי (localStorage). שומר את בחירתכם בהודעת העוגיות יחד עם חותמת זמן, כדי לא לשאול שוב וכדי לתעד את ההסכמה.", "עד שתמחקו את נתוני הדפדפן או תשנו את הבחירה", "האתר"],
            ["shani-lang", "אחסון מקומי. זוכר אם בחרתם עברית או אנגלית.", "עד מחיקת נתוני הדפדפן", "האתר"],
            ["a11y-settings", "אחסון מקומי. זוכר את הגדרות הנגישות שבחרתם (גודל טקסט, ניגודיות וכדומה).", "עד מחיקת נתוני הדפדפן", "האתר"],
            ["shani-guides-unlocked", "אחסון מקומי. מסמן שספריית המדריכים כבר נפתחה, כדי לא לבקש מייל שוב.", "עד מחיקת נתוני הדפדפן", "האתר"],
            ["shani-splash-seen", "אחסון סשן (sessionStorage). מונע הצגה חוזרת של מסך הפתיחה באותה גלישה.", "עד סגירת לשונית הדפדפן", "האתר"],
          ],
        },
        cookieButton: true,
      },
      {
        heading: "הספקים שמעבדים את המידע",
        body:
          "איני מוכרת מידע אישי ואיני מעבירה אותו למפרסמים. אלה כל הגורמים שמעבדים מידע מהאתר, ומה כל אחד מהם מקבל:",
        items: [
          "Vercel Inc. (ארה\"ב) — אחסון האתר והרצתו. חשופה לכל בקשה לאתר, כולל כתובת IP ומזהה דפדפן, וכן מפעילה את Vercel Analytics הסופר צפיות ללא עוגיות.",
          "Google (Google Analytics 4) — מקבלת נתוני גלישה ומזהי מדידה, רק אם אישרתם עוגיות.",
          "Meta Platforms (Meta Pixel) — מקבלת נתוני גלישה ואירועי המרה לצורכי פרסום ומדידה, רק אם אישרתם עוגיות.",
          "Formspree Inc. (ארה\"ב) — קולטת את טופס האימייל באתר (הפרומפטים והמדריכים) ומעבירה אליי את כתובת האימייל וסימון ההסכמה.",
          "Supabase Inc. — שומרת את רשומות ההצעות החתומות: שם, שם עסק, מספר עוסק, אימייל, החתימה המוקלדת, נוסח התנאים, מועד החתימה, כתובת IP ו-User-Agent.",
          "Resend — שולחת את מייל ההצעה החתומה, כולל קובץ ה-PDF שבו מוטמעים החתימה המצוירת, מועד החתימה וכתובת ה-IP, לשני ולחותם.",
          "Webhook לגיליון גוגל (Google Sheets דרך אוטומציית n8n) — מקבל התראה על חתימת הצעה עם שם, שם עסק, מספר עוסק, אימייל ומועד החתימה, לצורך ניהול הלידים והלקוחות שלי.",
          "WhatsApp / Meta — אם תיצרו קשר דרך כפתור הוואטסאפ, ההתכתבות מתנהלת אצלם ובכפוף לתנאיהם.",
        ],
      },
      {
        heading: "העברת מידע אל מחוץ לישראל",
        body:
          "כל הספקים שלמעלה הם חברות בינלאומיות, והמידע מאוחסן ומעובד בשרתים מחוץ לישראל — בעיקר בארצות הברית ובאיחוד האירופי. משמעות הדבר היא שהמידע כפוף גם לדין הזר החל על אותם ספקים, ורמת ההגנה שם אינה בהכרח זהה לזו שבדין הישראלי. שימוש באתר, מסירת פרטים בטופס או חתימה על הצעה כרוכים בהעברה כזו.",
      },
      {
        heading: "מה קורה אם לא מסכימים",
        items: [
          "מסירת המידע אינה חובה חוקית. אתם מוסרים אותו מרצונכם.",
          "אם לא תאשרו עוגיות מדידה — האתר יעבוד במלואו, בלי שום הגבלה. פשוט לא אדע שביקרתם ולא תיכללו במדידת הקמפיינים.",
          "אם לא תסמנו את ההסכמה לדיוור — לא אוכל לשלוח לכם את הפרומפטים או את המדריכים, כי הם נשלחים במייל.",
          "אם לא תמסרו את פרטי החתימה בהצעת מחיר — לא ניתן להפיק הצעה חתומה ולהתקשר בהסכם.",
          "בכל מקרה, אפשר תמיד לפנות אליי ישירות בוואטסאפ או במייל בלי למסור דבר באתר.",
        ],
      },
      {
        heading: "כמה זמן המידע נשמר",
        body:
          "מידע נשמר כל עוד הוא נדרש למטרה שלשמה נאסף: פרטי דיוור — עד שתבקשו הסרה; רשומות של הצעות חתומות — כל עוד ההסכם או חובות תיעוד חשבונאיות מחייבים זאת; נתוני מדידה — לפי מדיניות השמירה של Google ושל Meta, כמפורט בטבלת העוגיות. בכל שלב אפשר לבקש מחיקה, ואמחק כל מה שאיני חייבת לשמור על פי דין.",
      },
      {
        heading: "אבטחת מידע",
        body:
          "האתר מוגש בחיבור מוצפן (HTTPS), והגישה למערכות הניהול ולמסדי הנתונים מוגבלת אליי בלבד באמצעות מפתחות שאינם חשופים בדפדפן. עם זאת, אף מערכת אינה חסינה לחלוטין ולא ניתן להבטיח אבטחה מוחלטת.",
      },
      {
        heading: "הזכויות שלכם",
        body:
          "לפי חוק הגנת הפרטיות, התשמ\"א-1981, יש לכם זכות לעיין במידע שנשמר עליכם, לבקש את תיקונו אם אינו נכון, שלם או מדויק, ולבקש את מחיקתו. כמו כן אתם רשאים לחזור בכם מכל הסכמה שנתתם — לדיוור או לעוגיות — בכל רגע ובלי לנמק. לכל בקשה כזו כתבו ל-shani.creates.ai@gmail.com ואטפל בה.",
      },
      {
        heading: "קטינים",
        body:
          "האתר והשירותים מיועדים לבגירים (גיל 18 ומעלה). איני אוספת ביודעין מידע על קטינים. אם התברר שנאסף מידע כזה, הוא יימחק בפנייה אליי.",
      },
      {
        heading: "שינויים במדיניות",
        body:
          "ייתכן שהמדיניות תתעדכן, למשל אם יתווסף כלי חדש לאתר. הגרסה העדכנית תפורסם תמיד בעמוד זה עם תאריך העדכון, ואם יתווסף שימוש חדש הדורש הסכמה — תתבקשו לאשר אותו מחדש.",
      },
      {
        heading: "יצירת קשר",
        body: "בכל שאלה בנושא פרטיות: shani.creates.ai@gmail.com",
      },
    ],
  },
  en: {
    kicker: "Policy",
    title: "Privacy Policy",
    updated: "Updated: August 2026",
    cookieBtn: "Open cookie settings",
    intro:
      "This page sets out exactly what data shani-ai.com collects, who processes it, where it goes and what you can do about it. It is written so you know what you are agreeing to before you agree.",
    sections: [
      {
        heading: "Who controls the data",
        body:
          "The site owner and the controller of the database is Shani Gorgov (Shani AI Creator), an exempt sole trader (עוסק פטור) registered in Israel under business number 300585536. For any privacy request — access, correction, deletion, unsubscribing, or more detail about a specific processor — write to shani.creates.ai@gmail.com. I handle these requests personally; the site has no separate data protection officer.",
      },
      {
        heading: "What is actually collected",
        items: [
          "The prompts and guides form: the email address you provide, together with your marketing consent tick, the exact consent wording and the time you ticked it.",
          "WhatsApp contact from the site: the button hands you over to WhatsApp, and the conversation itself takes place there, not on this site.",
          "Signing a proposal (the /work pages and digital signature): first name, business name, VAT/company number, email address, the signature itself — typed and/or hand-drawn as an image — the terms text signed, the time of signing, the IP address the proposal was signed from, and the browser identifier (User-Agent). The IP and User-Agent are collected as evidence of who signed and when.",
          "Usage measurement: if you accepted measurement cookies, Google Analytics 4 and Meta Pixel collect a browsing identifier, pages viewed, referral source, device and browser type and a truncated IP address.",
          "Cookieless measurement: Vercel Analytics counts page views without cookies and without building a personal profile. It runs at all times, including without cookie consent.",
          "Local settings stored in your browser only: interface language, accessibility settings, whether the intro screen was shown, whether the guides library was unlocked, and your cookie choice.",
        ],
      },
      {
        heading: "What the data is used for",
        items: [
          "Sending the material you asked for (the prompts and guides) and replying to enquiries.",
          "Marketing email — only to people who explicitly ticked the consent box on the form.",
          "Producing a signed proposal, sending it to Shani and to the signer, and keeping a copy as evidence of the agreement.",
          "Understanding which pages on the site work, and improving the site.",
          "Campaign measurement and advertising on Meta's networks — only if you accepted cookies.",
        ],
      },
      {
        heading: "Email & mailing list",
        body:
          "I send marketing email only to people who ticked the consent box themselves. The box is not pre-ticked, and the form will not submit without it. The consent wording and the time of consent are stored alongside the signup. Every message carries an unsubscribe link, and you can also submit a removal request on the unsubscribe page: shani-ai.com/unsubscribe. Alternatively you can simply reply or write to shani.creates.ai@gmail.com and ask to be removed — the request will be honoured and no further messages will be sent. Consent is given freely and can be withdrawn at any time. This right derives from s. 30A of the Communications (Telecommunications and Broadcasting) Law, 5742-1982.",
        link: { href: "/unsubscribe", label: "Go to the unsubscribe page" },
      },
      {
        heading: "Cookies and tracking technologies",
        body:
          "This site uses cookies — not \"may use\". Some are functional and stay in your browser only; others belong to third parties and serve measurement and advertising. Google's and Meta's measurement and advertising cookies load only after you accept them in the cookie banner; until then they do not run at all. You can change your choice at any time via the \"Cookie settings\" link at the bottom of every page. The table below lists every cookie and key this site sets:",
        table: {
          head: ["Name", "Type and purpose", "Lifetime", "Owner"],
          rows: [
            ["_ga", "Third-party cookie. Distinguishes between visitors for Google Analytics 4 usage statistics.", "Up to 24 months", "Google"],
            ["_ga_G-35YVB7955E (_ga_*)", "Third-party cookie. Holds the session and measurement state for this site's GA4 property.", "Up to 24 months", "Google"],
            ["_fbp", "Third-party cookie. Identifies the browser for Meta Pixel, for conversion measurement and advertising on Facebook and Instagram.", "Up to 3 months", "Meta"],
            ["shani-cookie-consent", "Local storage. Stores your cookie choice with a timestamp, so you are not asked again and so the consent is documented.", "Until you clear browser data or change the choice", "This site"],
            ["shani-lang", "Local storage. Remembers whether you chose Hebrew or English.", "Until browser data is cleared", "This site"],
            ["a11y-settings", "Local storage. Remembers your accessibility settings (text size, contrast and so on).", "Until browser data is cleared", "This site"],
            ["shani-guides-unlocked", "Local storage. Marks the guides library as already unlocked so your email is not requested again.", "Until browser data is cleared", "This site"],
            ["shani-splash-seen", "Session storage. Prevents the intro screen from replaying during the same visit.", "Until the browser tab is closed", "This site"],
          ],
        },
        cookieButton: true,
      },
      {
        heading: "The processors that handle the data",
        body:
          "I do not sell personal information and do not pass it to advertisers. These are all the parties that process data from this site, and what each one receives:",
        items: [
          "Vercel Inc. (USA) — hosts and runs the site. Sees every request, including IP address and browser identifier, and provides Vercel Analytics, which counts views without cookies.",
          "Google (Google Analytics 4) — receives browsing data and measurement identifiers, only if you accepted cookies.",
          "Meta Platforms (Meta Pixel) — receives browsing data and conversion events for advertising and measurement, only if you accepted cookies.",
          "Formspree Inc. (USA) — receives the site's email form (prompts and guides) and forwards your email address and consent tick to me.",
          "Supabase Inc. — stores the signed proposal records: name, business name, VAT number, email, the typed signature, terms text, time of signing, IP address and User-Agent.",
          "Resend — sends the signed proposal email, including the PDF in which the hand-drawn signature, the time of signing and the IP address are embedded, to Shani and to the signer.",
          "Google Sheets webhook (via an n8n automation) — receives a notification of a signed proposal with name, business name, VAT number, email and time of signing, for my own lead and client tracking.",
          "WhatsApp / Meta — if you get in touch via the WhatsApp button, the conversation takes place on their platform and under their terms.",
        ],
      },
      {
        heading: "Transfer of data outside Israel",
        body:
          "All of the processors above are international companies, and data is stored and processed on servers outside Israel — primarily in the United States and the European Union. This means the data is also subject to the foreign law applying to those providers, and the level of protection there is not necessarily identical to Israeli law. Using the site, submitting the form or signing a proposal all involve such a transfer.",
      },
      {
        heading: "What happens if you do not consent",
        items: [
          "Providing this data is not a legal obligation. You provide it voluntarily.",
          "If you do not accept measurement cookies, the site works in full, with no restriction. I simply will not know you visited, and you will not be counted in campaign measurement.",
          "If you do not tick the marketing consent box, I cannot send you the prompts or the guides, because they are delivered by email.",
          "If you do not provide the signing details on a proposal, a signed proposal cannot be produced and the agreement cannot be concluded.",
          "In any case you can always contact me directly by WhatsApp or email without submitting anything on the site.",
        ],
      },
      {
        heading: "How long data is kept",
        body:
          "Data is kept for as long as it is needed for the purpose it was collected for: mailing details — until you ask to be removed; signed proposal records — for as long as the agreement or accounting record-keeping duties require; measurement data — under Google's and Meta's own retention policies, as set out in the cookie table. You can request deletion at any point, and I will delete anything I am not legally required to keep.",
      },
      {
        heading: "Data security",
        body:
          "The site is served over an encrypted connection (HTTPS), and access to the admin systems and databases is limited to me alone via keys that are never exposed in the browser. That said, no system is completely immune and absolute security cannot be guaranteed.",
      },
      {
        heading: "Your rights",
        body:
          "Under the Protection of Privacy Law, 5741-1981, you have the right to review the information held about you, to request its correction if it is incorrect, incomplete or inaccurate, and to request its deletion. You may also withdraw any consent you gave — for email or for cookies — at any time and without giving a reason. For any such request write to shani.creates.ai@gmail.com and I will handle it.",
      },
      {
        heading: "Minors",
        body:
          "The site and services are intended for adults (18+). I do not knowingly collect information about minors. If such information turns out to have been collected, it will be deleted on request.",
      },
      {
        heading: "Changes to this policy",
        body:
          "This policy may be updated, for instance if a new tool is added to the site. The current version will always be published on this page with its update date, and if a new use requiring consent is introduced, you will be asked to consent again.",
      },
      {
        heading: "Contact",
        body: "For any privacy question: shani.creates.ai@gmail.com",
      },
    ],
  },
};

export default function PrivacyPage() {
  const { lang } = useLang();
  const c = COPY[lang];
  const dir = lang === "he" ? "rtl" : "ltr";
  const cellBase: React.CSSProperties = {
    padding: "10px 12px",
    borderBottom: "1px solid var(--line)",
    textAlign: dir === "rtl" ? "right" : "left",
    verticalAlign: "top",
    fontFamily: HEEBO,
    fontSize: 15,
    lineHeight: 1.6,
    color: "var(--ink)",
  };

  return (
    <>
      <main dir={dir} style={{ padding: "9rem clamp(20px,5vw,40px) 0", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".2em", color: "var(--acc)", marginBottom: 16 }}>{c.kicker}</div>
        <h1 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(34px,5vw,56px)", lineHeight: 1.04, letterSpacing: "-0.03em", color: "var(--ink)", fontFamily: HEEBO }}>{c.title}</h1>
        <p style={{ margin: "12px 0 0", fontFamily: MONO, fontSize: 13, color: "var(--muted2)" }}>{c.updated}</p>
        <p style={{ margin: "28px 0 0", color: "var(--ink)", fontSize: "clamp(17px,1.6vw,21px)", lineHeight: 1.7, fontFamily: HEEBO }}>{c.intro}</p>

        {c.sections.map((s, i) => (
          <section key={i} style={{ marginTop: 44 }}>
            <h2 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(22px,2.6vw,30px)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--ink)", fontFamily: HEEBO }}>{s.heading}</h2>
            {s.body && <p style={{ margin: "14px 0 0", color: "var(--ink)", fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.7, fontFamily: HEEBO }}>{s.body}</p>}
            {s.items && (
              <ul style={{ margin: "16px 0 0", paddingInlineStart: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                {s.items.map((it, j) => (
                  <li key={j} style={{ color: "var(--ink)", fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.7, fontFamily: HEEBO }}>{it}</li>
                ))}
              </ul>
            )}
            {s.link && (
              <a
                href={s.link.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  marginTop: 18,
                  minHeight: 44,
                  padding: "12px 22px",
                  borderRadius: 12,
                  border: "1.5px solid var(--acc)",
                  color: "var(--acc)",
                  fontFamily: HEEBO,
                  fontWeight: 800,
                  fontSize: 16,
                  textDecoration: "none",
                }}
              >
                {s.link.label}
              </a>
            )}
            {s.table && (
              <div style={{ margin: "20px 0 0", overflowX: "auto", border: "1px solid var(--line)", borderRadius: 14, background: "var(--card)" }}>
                <table style={{ width: "100%", minWidth: 560, borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {s.table.head.map((h, j) => (
                        <th
                          key={j}
                          scope="col"
                          style={{
                            ...cellBase,
                            fontFamily: MONO,
                            fontSize: 12,
                            letterSpacing: ".08em",
                            textTransform: "uppercase",
                            color: "var(--muted2)",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            style={{
                              ...cellBase,
                              fontFamily: k === 0 ? MONO : HEEBO,
                              fontSize: k === 0 ? 13 : 15,
                              color: k === 0 ? "var(--acc)" : "var(--ink)",
                              borderBottom: j === s.table!.rows.length - 1 ? "none" : cellBase.borderBottom,
                            }}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {s.cookieButton && (
              <button
                type="button"
                onClick={openCookieSettings}
                style={{
                  marginTop: 18,
                  minHeight: 44,
                  padding: "12px 22px",
                  borderRadius: 12,
                  border: "1.5px solid var(--acc)",
                  background: "transparent",
                  color: "var(--acc)",
                  fontFamily: HEEBO,
                  fontWeight: 800,
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                {c.cookieBtn}
              </button>
            )}
          </section>
        ))}

        <div style={{ height: 80 }} />
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useLang } from "@/components/LanguageProvider";
import Footer from "@/components/Footer";

const HEEBO = "'Heebo', var(--font-heebo), sans-serif";
const MONO = "'JetBrains Mono', var(--font-mono), monospace";

type Section = { heading: string; body?: string; items?: string[] };
type Copy = { kicker: string; title: string; updated: string; intro: string; sections: Section[] };

const COPY: Record<"he" | "en", Copy> = {
  he: {
    kicker: "מדיניות",
    title: "מדיניות פרטיות",
    updated: "עודכן: יוני 2026",
    intro:
      "אני מכבדת את הפרטיות שלכם. מסמך זה מסביר איזה מידע נאסף באתר זה, כיצד הוא משמש, ומהן הזכויות שלכם. השימוש באתר מהווה הסכמה למדיניות זו.",
    sections: [
      { heading: "איזה מידע נאסף", items: [
        "פרטים שתמסרו ביוזמתכם — שם, אימייל וטלפון דרך טפסי יצירת קשר או הורדת חומרים.",
        "מידע טכני שנאסף אוטומטית — כתובת IP, סוג דפדפן ומכשיר, ועמודים שנצפו, לצורכי סטטיסטיקה ושיפור.",
        "קובצי Cookies שמסייעים לתפעול האתר ולמדידת ביצועים.",
      ]},
      { heading: "למה המידע משמש", items: [
        "מענה לפניות ויצירת קשר חוזר.",
        "שליחת החומר שביקשתם (כגון מדריך או פרומפטים).",
        "שיפור חוויית האתר וניתוח שימוש.",
        "דיוור ועדכונים — רק אם נתתם הסכמה.",
        "התאמת פרסום בפלטפורמות חיצוניות.",
      ]},
      { heading: "דיוור ורשימת תפוצה", body:
        "אם השארתם אימייל, ייתכן שאשלח לכם תוכן, טיפים ועדכונים. תוכלו להסיר את עצמכם מהרשימה בכל עת בלחיצה על קישור ההסרה או בפנייה אליי." },
      { heading: "שיתוף מידע עם צד שלישי", body:
        "איני מוכרת מידע אישי. המידע עשוי להיות מעובד אצל ספקי שירות לצורך תפעול בלבד — אחסון האתר (Vercel), שירותי דיוור, כלי אנליטיקה (כגון Google Analytics) ופלטפורמות פרסום (כגון Meta). ספקים אלה מחויבים לשמור על המידע." },
      { heading: "Cookies", body:
        "האתר עשוי לעשות שימוש בקובצי Cookies לשיפור הגלישה ולמדידה. ניתן לחסום או למחוק אותם דרך הגדרות הדפדפן, אך ייתכן שחלק מהתכונות לא יפעלו כרגיל." },
      { heading: "אבטחת מידע", body:
        "אני נוקטת באמצעים סבירים להגנה על המידע. עם זאת, אף מערכת אינה חסינה לחלוטין, ולא ניתן להבטיח אבטחה מוחלטת." },
      { heading: "הזכויות שלכם", body:
        "בהתאם לחוק הגנת הפרטיות, התשמ\"א-1981, יש לכם זכות לעיין במידע שנשמר עליכם, לבקש לתקנו או למחקו. לכל בקשה ניתן לפנות אליי במייל." },
      { heading: "קטינים", body:
        "האתר והשירותים מיועדים לבגירים (גיל 18 ומעלה). איני אוספת ביודעין מידע על קטינים." },
      { heading: "שינויים במדיניות", body:
        "ייתכן שמדיניות זו תתעדכן מעת לעת. הגרסה העדכנית תפורסם תמיד בעמוד זה, עם תאריך העדכון." },
      { heading: "יצירת קשר", body:
        "בכל שאלה בנושא פרטיות ניתן לפנות: shani.creates.ai@gmail.com" },
    ],
  },
  en: {
    kicker: "Policy",
    title: "Privacy Policy",
    updated: "Updated: June 2026",
    intro:
      "I respect your privacy. This page explains what information is collected on this site, how it is used, and your rights. Using the site constitutes acceptance of this policy.",
    sections: [
      { heading: "Information collected", items: [
        "Details you provide voluntarily — name, email and phone via contact or download forms.",
        "Technical data collected automatically — IP address, browser and device type, and pages viewed, for analytics and improvement.",
        "Cookies that help operate the site and measure performance.",
      ]},
      { heading: "How information is used", items: [
        "Responding to inquiries and following up.",
        "Sending the material you requested (e.g. a guide or prompts).",
        "Improving the site experience and analyzing usage.",
        "Newsletters and updates — only with your consent.",
        "Tailoring advertising on external platforms.",
      ]},
      { heading: "Email & mailing list", body:
        "If you leave your email, I may send you content, tips and updates. You can unsubscribe at any time via the unsubscribe link or by contacting me." },
      { heading: "Sharing with third parties", body:
        "I do not sell personal information. Data may be processed by service providers for operations only — site hosting (Vercel), email services, analytics tools (e.g. Google Analytics) and advertising platforms (e.g. Meta). These providers are bound to protect the data." },
      { heading: "Cookies", body:
        "The site may use cookies to improve browsing and for measurement. You can block or delete them via your browser settings, though some features may not work as usual." },
      { heading: "Data security", body:
        "I take reasonable measures to protect your information. However, no system is completely immune, and absolute security cannot be guaranteed." },
      { heading: "Your rights", body:
        "Under Israel's Protection of Privacy Law, 5741-1981, you have the right to review the information held about you and to request its correction or deletion. For any request, contact me by email." },
      { heading: "Minors", body:
        "The site and services are intended for adults (18+). I do not knowingly collect information about minors." },
      { heading: "Changes to this policy", body:
        "This policy may be updated from time to time. The current version will always be published on this page with the update date." },
      { heading: "Contact", body:
        "For any privacy question: shani.creates.ai@gmail.com" },
    ],
  },
};

export default function PrivacyPage() {
  const { lang } = useLang();
  const c = COPY[lang];
  const dir = lang === "he" ? "rtl" : "ltr";

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
          </section>
        ))}

        <div style={{ height: 80 }} />
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useLang } from "@/components/LanguageProvider";
import Footer from "@/components/Footer";

const HEEBO = "'Heebo', var(--font-heebo), sans-serif";
const MONO = "'JetBrains Mono', var(--font-mono), monospace";

type Section = { heading: string; body?: string; items?: string[] };
type Copy = { kicker: string; title: string; updated: string; intro: string; sections: Section[] };

const COPY: Record<"he" | "en", Copy> = {
  he: {
    kicker: "תקנון",
    title: "תנאי שימוש",
    updated: "עודכן: יוני 2026",
    intro:
      "ברוכים הבאים. השימוש באתר ובשירותים של Shani AI Creator (שני גורגוב) כפוף לתנאים שלהלן. השימוש באתר מהווה הסכמה לתנאים אלה.",
    sections: [
      { heading: "השירותים", body:
        "אני מציעה ייעוץ ומיפוי AI, בניית כלים וסקילים, אוטומציות, ובניית אתרים. תיאורי השירותים באתר הם כלליים; ההיקף, המחיר ולוחות הזמנים המדויקים נקבעים בהצעת מחיר או בהסכם פרטני מול כל לקוח." },
      { heading: "אין הבטחת תוצאה", body:
        "אני פועלת במקצועיות ובמיטב היכולת, אך תוצאות עסקיות תלויות בגורמים רבים שאינם בשליטתי. אין במידע באתר או בשירותים משום התחייבות לתוצאה עסקית, הכנסה או ביצועים מסוימים." },
      { heading: "הצעות מחיר ותשלום", body:
        "מחיר והיקף העבודה ייקבעו בהצעת מחיר. תחילת העבודה עשויה להיות מותנית בתשלום מקדמה. תנאי התשלום המלאים יפורטו בהצעה או בהסכם." },
      { heading: "קניין רוחני", body:
        "תוצרים סופיים שנמסרים ללקוח (כגון אתר או קובץ) עוברים לבעלות הלקוח עם השלמת התשלום המלא. השיטות, התבניות, הקוד הגנרי, הסקילים והכלים שפיתחתי נשארים בבעלותי וניתנים לשימוש חוזר. תכני אתר זה והמיתוג מוגנים בזכויות יוצרים." },
      { heading: "אחריות הלקוח", body:
        "לצורך ביצוע העבודה, הלקוח מתחייב לספק חומרים, גישות ומשוב בזמן סביר. עיכוב מצד הלקוח עשוי להשפיע על לוחות הזמנים." },
      { heading: "סודיות", body:
        "מידע עסקי שתשתפו במהלך העבודה יישמר בסודיות וישמש אך ורק לצורך מתן השירות." },
      { heading: "הגבלת אחריות", body:
        "השימוש באתר ובשירותים הוא על אחריות המשתמש. לא אהיה אחראית לנזקים עקיפים, תוצאתיים או אובדן רווחים הנובעים מהשימוש, ככל שהדבר מותר על פי דין." },
      { heading: "קישורים לאתרים חיצוניים", body:
        "האתר עשוי לכלול קישורים לאתרים או כלים של צד שלישי. איני אחראית לתוכן או למדיניות הפרטיות שלהם." },
      { heading: "דין וסמכות שיפוט", body:
        "על תנאים אלה יחולו דיני מדינת ישראל, וסמכות השיפוט הבלעדית תהיה לבתי המשפט המוסמכים בישראל." },
      { heading: "שינויים בתנאים", body:
        "אני רשאית לעדכן תנאים אלה מעת לעת. הגרסה העדכנית תפורסם בעמוד זה." },
      { heading: "יצירת קשר", body:
        "לכל שאלה: shani.creates.ai@gmail.com" },
    ],
  },
  en: {
    kicker: "Terms",
    title: "Terms of Use",
    updated: "Updated: June 2026",
    intro:
      "Welcome. Use of the Shani AI Creator (Shani Gorgov) website and services is subject to the terms below. Using the site constitutes acceptance of these terms.",
    sections: [
      { heading: "Services", body:
        "I offer AI consulting and mapping, custom tools and Skills, automations, and website builds. Service descriptions on the site are general; exact scope, price and timelines are set in a proposal or individual agreement with each client." },
      { heading: "No guaranteed results", body:
        "I work professionally and to the best of my ability, but business results depend on many factors outside my control. Nothing on the site or in the services is a commitment to a specific business result, revenue or performance." },
      { heading: "Quotes & payment", body:
        "Price and scope are set in a proposal. Work may be conditioned on an advance payment. Full payment terms will be detailed in the proposal or agreement." },
      { heading: "Intellectual property", body:
        "Final deliverables handed to the client (such as a website or file) become the client's property upon full payment. The methods, templates, generic code, Skills and tools I developed remain mine and may be reused. The content and branding of this site are protected by copyright." },
      { heading: "Client responsibilities", body:
        "To carry out the work, the client agrees to provide materials, access and feedback within a reasonable time. Client delays may affect timelines." },
      { heading: "Confidentiality", body:
        "Business information shared during the work will be kept confidential and used solely to provide the service." },
      { heading: "Limitation of liability", body:
        "Use of the site and services is at the user's own risk. I will not be liable for indirect or consequential damages or loss of profits arising from use, to the extent permitted by law." },
      { heading: "Links to external sites", body:
        "The site may include links to third-party sites or tools. I am not responsible for their content or privacy practices." },
      { heading: "Governing law & jurisdiction", body:
        "These terms are governed by the laws of the State of Israel, and the competent courts in Israel will have exclusive jurisdiction." },
      { heading: "Changes to these terms", body:
        "I may update these terms from time to time. The current version will be published on this page." },
      { heading: "Contact", body:
        "For any question: shani.creates.ai@gmail.com" },
    ],
  },
};

export default function TermsPage() {
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
          </section>
        ))}

        <div style={{ height: 80 }} />
      </main>
      <Footer />
    </>
  );
}

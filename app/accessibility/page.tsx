"use client";

import { useLang } from "@/components/LanguageProvider";
import Footer from "@/components/Footer";

const HEEBO = "'Heebo', var(--font-heebo), sans-serif";
const MONO = "'JetBrains Mono', var(--font-mono), monospace";

type Section = { heading: string; body?: string; items?: string[] };

type Copy = {
  kicker: string;
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
  contactHeading: string;
  contactBody: string;
  emailLabel: string;
};

const COPY: Record<"he" | "en", Copy> = {
  he: {
    kicker: "נגישות",
    title: "הצהרת נגישות",
    updated: "עודכן לאחרונה: 28/06/2026",
    intro:
      "שני גורגוב רואה חשיבות רבה במתן שירות שוויוני לכלל הגולשים, ופועלת כדי שהאתר יהיה נגיש לאנשים עם מוגבלות. אנו משקיעים מאמצים ומשאבים כדי להנגיש את האתר ולשפר אותו באופן מתמיד, מתוך אמונה שלכל אדם מגיעה הזכות לחיות בשוויון, כבוד, נוחות ועצמאות.",
    sections: [
      {
        heading: "התקן שאליו אנו מכוונים",
        body:
          "האתר נבנה בהתאם לתקן הישראלי ת״י 5568 לנגישות תכנים באינטרנט, המבוסס על הנחיות WCAG 2.1 ברמת AA, ובהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע״ג-2013.",
      },
      {
        heading: "מה עשינו כדי להנגיש את האתר",
        items: [
          "ניווט מלא באמצעות מקלדת בכל חלקי האתר.",
          "קישור ״דילוג לתוכן המרכזי״ (Skip to content) בתחילת כל עמוד.",
          "סימוני מיקוד (focus) ברורים ובולטים בעת ניווט במקלדת.",
          "שימוש ב-HTML סמנטי ובמבנה כותרות תקין לתמיכה בקוראי מסך.",
          "תמיכה בהעדפת ״הפחתת תנועה״ (prefers-reduced-motion) למשתמשים הרגישים לאנימציות.",
          "ניגודיות צבעים תקינה בין טקסט לרקע.",
          "תפריט נגישות המאפשר הגדלת טקסט, ניגודיות גבוהה, גווני אפור, הדגשת קישורים, עצירת אנימציות ושינוי הסמן.",
          "תמיכה בשתי שפות (עברית ואנגלית) עם כיווניות נכונה (RTL / LTR).",
        ],
      },
      {
        heading: "מגבלות ידועות",
        body:
          "למרות מאמצינו להנגיש את כלל הדפים והרכיבים, ייתכן שחלקים מסוימים באתר טרם הונגשו במלואם או שתכנים מסוימים (כגון תכנים של צד שלישי) אינם בשליטתנו המלאה. אנו ממשיכים לפעול לשיפור הנגישות באופן שוטף. אם נתקלתם ברכיב שאינו נגיש, נשמח לשמוע ולתקן.",
      },
    ],
    contactHeading: "פנייה בנושא נגישות",
    contactBody:
      "אם נתקלתם בבעיית נגישות באתר, או שיש לכם הצעה לשיפור, נשמח שתפנו אלינו. נעשה כל מאמץ להגיב ולטפל בפנייה בהקדם האפשרי.",
    emailLabel: "שליחת דוא״ל",
  },
  en: {
    kicker: "Accessibility",
    title: "Accessibility Statement",
    updated: "Last updated: 28/06/2026",
    intro:
      "Shani Gorgov is committed to providing an equal and inclusive experience for every visitor, and works to keep this website accessible to people with disabilities. We continually invest effort and resources to improve accessibility, in the belief that everyone deserves to browse with equality, dignity, comfort and independence.",
    sections: [
      {
        heading: "The standard we follow",
        body:
          "This website is built to conform with Israeli Standard IS 5568 for web content accessibility, which is based on the WCAG 2.1 guidelines at Level AA, and with the Equal Rights for Persons with Disabilities Regulations (Service Accessibility Adjustments), 2013.",
      },
      {
        heading: "Steps we have taken",
        items: [
          "Full keyboard navigation across all parts of the site.",
          "A “Skip to content” link at the start of every page.",
          "Clear, visible focus indicators when navigating by keyboard.",
          "Semantic HTML and a correct heading structure to support screen readers.",
          "Support for the “reduced motion” preference (prefers-reduced-motion) for users sensitive to animation.",
          "Sufficient color contrast between text and background.",
          "An accessibility menu offering larger text, high contrast, grayscale, link highlighting, animation pausing and cursor adjustment.",
          "Bilingual support (Hebrew and English) with correct text direction (RTL / LTR).",
        ],
      },
      {
        heading: "Known limitations",
        body:
          "Despite our efforts to make every page and component accessible, some parts of the site may not yet be fully accessible, and certain content (such as third-party content) may be outside our full control. We continue to work on improving accessibility on an ongoing basis. If you come across an element that is not accessible, we would be glad to hear about it and fix it.",
      },
    ],
    contactHeading: "Reporting an accessibility issue",
    contactBody:
      "If you encounter an accessibility problem on the site, or have a suggestion for improvement, please get in touch. We will make every effort to respond and address your request as soon as possible.",
    emailLabel: "Send an email",
  },
};

const EMAIL = "shani.creates.ai@gmail.com";

export default function AccessibilityPage() {
  const { lang } = useLang();
  const dir = lang === "he" ? "rtl" : "ltr";
  const c = COPY[lang];

  return (
    <>
      <main
        dir={dir}
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 880,
          margin: "0 auto",
          padding: "clamp(96px,12vw,160px) 24px clamp(48px,6vw,80px)",
          textAlign: dir === "rtl" ? "right" : "left",
        }}
      >
        {/* Kicker */}
        <div
          style={{
            fontFamily: MONO,
            fontSize: 13,
            letterSpacing: ".2em",
            color: "var(--acc)",
            marginBottom: 16,
          }}
        >
          {c.kicker}
        </div>

        {/* Title */}
        <h1
          style={{
            margin: 0,
            fontWeight: 800,
            fontSize: "clamp(34px,5vw,56px)",
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            color: "var(--ink)",
            fontFamily: HEEBO,
          }}
        >
          {c.title}
        </h1>

        {/* Last updated */}
        <p
          style={{
            margin: "12px 0 0",
            fontFamily: MONO,
            fontSize: 13,
            color: "var(--muted2)",
          }}
        >
          {c.updated}
        </p>

        {/* Intro */}
        <p
          style={{
            margin: "28px 0 0",
            color: "var(--ink)",
            fontSize: "clamp(17px,1.6vw,21px)",
            lineHeight: 1.7,
            fontFamily: HEEBO,
          }}
        >
          {c.intro}
        </p>

        {/* Sections */}
        {c.sections.map((s, i) => (
          <section key={i} style={{ marginTop: 44 }}>
            <h2
              style={{
                margin: 0,
                fontWeight: 800,
                fontSize: "clamp(22px,2.6vw,30px)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                fontFamily: HEEBO,
              }}
            >
              {s.heading}
            </h2>

            {s.body && (
              <p
                style={{
                  margin: "14px 0 0",
                  color: "var(--ink)",
                  fontSize: "clamp(16px,1.5vw,19px)",
                  lineHeight: 1.7,
                  fontFamily: HEEBO,
                }}
              >
                {s.body}
              </p>
            )}

            {s.items && (
              <ul
                style={{
                  margin: "16px 0 0",
                  paddingInlineStart: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {s.items.map((item, j) => (
                  <li
                    key={j}
                    style={{
                      color: "var(--ink)",
                      fontSize: "clamp(16px,1.5vw,19px)",
                      lineHeight: 1.6,
                      fontFamily: HEEBO,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* Contact */}
        <section
          style={{
            marginTop: 48,
            background: "var(--card)",
            border: "1px solid var(--line)",
            borderRadius: 18,
            padding: "28px 28px 32px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontWeight: 800,
              fontSize: "clamp(22px,2.6vw,30px)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              fontFamily: HEEBO,
            }}
          >
            {c.contactHeading}
          </h2>
          <p
            style={{
              margin: "14px 0 0",
              color: "var(--ink)",
              fontSize: "clamp(16px,1.5vw,19px)",
              lineHeight: 1.7,
              fontFamily: HEEBO,
            }}
          >
            {c.contactBody}
          </p>
          <a
            href={`mailto:${EMAIL}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 20,
              padding: "12px 22px",
              background: "var(--acc)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              borderRadius: 12,
              textDecoration: "none",
              fontFamily: HEEBO,
            }}
          >
            {c.emailLabel}
            <span style={{ fontFamily: MONO, fontWeight: 500, opacity: 0.92 }}>
              {EMAIL}
            </span>
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}

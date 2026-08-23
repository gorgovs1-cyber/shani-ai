"use client";

import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";
import { openCookieSettings } from "@/components/CookieConsent";

export default function Footer() {
  const { lang } = useLang();
  const t = dict[lang];

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1200,
        margin: "0 auto",
        padding: "32px 24px 56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        flexWrap: "wrap",
        borderTop: "1px solid var(--line)",
      }}
    >
      {/* Local SEO paragraph */}
      <p
        style={{
          flexBasis: "100%",
          margin: "0 0 12px",
          color: "var(--muted2)",
          fontSize: 13.5,
          lineHeight: 1.7,
          maxWidth: "72ch",
          fontFamily: "'Heebo', var(--font-heebo), sans-serif",
        }}
      >
        {t.footerSeo}
      </p>
      {/* Logo + name */}
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
          style={{ width: 28, height: 28, color: "var(--acc)", flexShrink: 0 }}
        >
          <path
            d="M50 7 L87 28.5 L87 71.5 L50 93 L13 71.5 L13 28.5 Z"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path
            d="M50 27 L70 39 L70 61 L50 73 L30 61 L30 39 Z"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
            opacity="0.5"
          />
          <circle cx="50" cy="50" r="7" fill="currentColor" />
        </svg>
        <span
          style={{
            fontWeight: 800,
            fontSize: 16,
            color: "var(--ink)",
            fontFamily: "'Heebo', var(--font-heebo), sans-serif",
          }}
        >
          Shani Gorgov
        </span>
      </div>

      {/* Site pages */}
      {/* alignItems:center נוסף כשהקישורים קיבלו גובה מגע של 44px,
          כדי שכל השורה תישאר מיושרת ולא רק הקישור הגבוה */}
      <nav className="footer-nav" aria-label={lang === "he" ? "מפת אתר" : "Site map"} style={{ display: "flex", alignItems: "center", flexBasis: "100%", flexWrap: "wrap", rowGap: 12, columnGap: 26, fontSize: 14.5, color: "var(--muted2)", marginBottom: 4 }}>
        {[
          { label: t.navWebsites,    href: "/websites" },
          { label: t.navAutomations, href: "/automations" },
          { label: t.navConsulting,  href: "/ai-consulting" },
          { label: t.navPricing,     href: "/pricing" },
          { label: t.navGuides,      href: "/guides" },
          // הבלוג יושב בפוטר ולא בתפריט העליון: התפריט כבר מחזיק שישה
          // קישורים, מתג שפה ו-CTA, ובנייד הוא ממילא צפוף.
          // התווית כתובה כאן ולא ב-lib/translations.ts, כי אין שם מפתח לבלוג.
          { label: lang === "he" ? "בלוג" : "Blog", href: "/blog" },
        ].map(({ label, href }) => (
          <a
            key={href}
            href={href}
            style={{ display: "inline-flex", alignItems: "center", minHeight: 44, color: "var(--muted2)", textDecoration: "none", transition: "color .2s", fontFamily: "'Heebo', var(--font-heebo), sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted2)")}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Social links */}
      <nav className="footer-nav" aria-label="Social links" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", rowGap: 12, columnGap: 26, fontSize: 14.5, color: "var(--muted2)" }}>
        {[
          { label: "Instagram", href: "https://www.instagram.com/shani.creates.ai/" },
          { label: "TikTok", href: "https://www.tiktok.com/@shani.creates.ai" },
          { label: "WhatsApp", href: "https://wa.me/972504744815" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/shani-ai/" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--muted2)",
              textDecoration: "none",
              transition: "color .2s",
              fontFamily: "'Heebo', var(--font-heebo), sans-serif",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted2)")}
          >
            {label}
          </a>
        ))}
        <a
          href="/accessibility"
          style={{
            color: "var(--muted2)",
            textDecoration: "none",
            transition: "color .2s",
            fontFamily: "'Heebo', var(--font-heebo), sans-serif",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted2)")}
        >
          {lang === "he" ? "הצהרת נגישות" : "Accessibility"}
        </a>
        <a
          href="/privacy"
          style={{
            color: "var(--muted2)",
            textDecoration: "none",
            transition: "color .2s",
            fontFamily: "'Heebo', var(--font-heebo), sans-serif",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted2)")}
        >
          {lang === "he" ? "מדיניות פרטיות" : "Privacy"}
        </a>
        <a
          href="/terms"
          style={{
            color: "var(--muted2)",
            textDecoration: "none",
            transition: "color .2s",
            fontFamily: "'Heebo', var(--font-heebo), sans-serif",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted2)")}
        >
          {lang === "he" ? "תקנון" : "Terms"}
        </a>
        <a
          href="/cancellation"
          style={{
            color: "var(--muted2)",
            textDecoration: "none",
            transition: "color .2s",
            fontFamily: "'Heebo', var(--font-heebo), sans-serif",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted2)")}
        >
          {lang === "he" ? "מדיניות ביטולים" : "Cancellation"}
        </a>
        {/* Lets a visitor change the cookie choice at any time */}
        <button
          type="button"
          onClick={openCookieSettings}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            minHeight: 44,
            cursor: "pointer",
            color: "var(--muted2)",
            fontSize: 14.5,
            transition: "color .2s",
            fontFamily: "'Heebo', var(--font-heebo), sans-serif",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted2)")}
        >
          {lang === "he" ? "הגדרות עוגיות" : "Cookie settings"}
        </button>
      </nav>

      {/* Copyright */}
      <span
        style={{
          fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
          fontSize: 12,
          color: "var(--muted2)",
        }}
      >
        &copy; {new Date().getFullYear()} &middot; {t.footer}
      </span>
    </footer>
  );
}

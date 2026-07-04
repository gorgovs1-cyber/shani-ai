"use client";

import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLang();
  const t = dict[lang];

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1320,
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

"use client";

import { useLang } from "@/components/LanguageProvider";

export default function CTAStrip() {
  const { t } = useLang();

  return (
    <div
      dir={t.dir}
      style={{
        borderTop: "1px solid var(--dline)",
        borderBottom: "1px solid var(--dline)",
        padding: "2rem clamp(1.5rem, 5vw, 4rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2rem",
        flexWrap: "wrap",
        background: "rgba(242,98,46,0.06)",
      }}
    >
      <p
        style={{
          fontFamily: "'Heebo', var(--font-heebo), sans-serif",
          fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)",
          fontWeight: 600,
          color: "var(--dtext)",
          margin: 0,
        }}
      >
        {t.ctaStrip}
      </p>
      <a
        href="https://wa.me/972504744815"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "var(--acc)",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 700,
          fontSize: "0.9rem",
          padding: "0.85rem 1.75rem",
          borderRadius: 999,
          whiteSpace: "nowrap",
          fontFamily: "'Heebo', var(--font-heebo), sans-serif",
          transition: "transform .2s, box-shadow .2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 26px -10px var(--acc)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "";
          (e.currentTarget as HTMLElement).style.boxShadow = "";
        }}
      >
        {t.ctaStripBtn}
      </a>
    </div>
  );
}

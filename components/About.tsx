"use client";

import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";

export default function About() {
  const { lang } = useLang();
  const t = dict[lang];

  return (
    <section
      id="about"
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1320,
        margin: "0 auto",
        padding: "clamp(72px,9vw,128px) 24px 0",
        opacity: 0,
        transform: "translateY(28px)",
        transition: "opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1)",
      }}
      ref={(el) => {
        if (!el) return;
        const io = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "none";
            io.disconnect();
          }
        }, { threshold: 0.1 });
        io.observe(el);
      }}
    >
      <div
        className="about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "0.8fr 1.2fr",
          gap: 48,
          alignItems: "start",
        }}
      >
        {/* Left: photo, kicker, title, stats */}
        <div>
          <img
            src="/shani-about.jpg.png"
            alt={lang === "he" ? "שני גורגוב, Shani AI Creator" : "Shani Gorgov, Shani AI Creator"}
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              aspectRatio: "4 / 5",
              objectFit: "cover",
              borderRadius: 20,
              border: "1px solid var(--line)",
              marginBottom: 28,
              display: "block",
            }}
          />
          <div
            style={{
              fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
              fontSize: 13,
              letterSpacing: ".2em",
              color: "var(--acc)",
              marginBottom: 16,
            }}
          >
            {t.aboutKicker}
          </div>
          <h2
            style={{
              margin: 0,
              fontWeight: 800,
              fontSize: "clamp(34px,4.4vw,56px)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              fontFamily: "'Heebo', var(--font-heebo), sans-serif",
            }}
          >
            {t.aboutTitle}
          </h2>

          {/* Stat cards */}
          <div style={{ marginTop: 30, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: "18px 22px",
                minWidth: 120,
              }}
            >
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 30,
                  color: "var(--acc)",
                  fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                }}
              >
                10+
              </div>
              <div
                style={{
                  color: "var(--muted2)",
                  fontSize: 13,
                  marginTop: 4,
                  fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                }}
              >
                {t.stat1}
              </div>
            </div>
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: "18px 22px",
                minWidth: 120,
              }}
            >
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 30,
                  color: "var(--acc)",
                  fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                }}
              >
                24h
              </div>
              <div
                style={{
                  color: "var(--muted2)",
                  fontSize: 13,
                  marginTop: 4,
                  fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                }}
              >
                {t.stat2}
              </div>
            </div>
          </div>
        </div>

        {/* Right: paragraphs */}
        <div style={{ display: "flex", fle
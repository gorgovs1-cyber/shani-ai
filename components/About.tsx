"use client";

import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";
import WordReveal from "@/components/WordReveal";
import Parallax from "@/components/Parallax";
import ScrubText from "@/components/ScrubText";

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
          <Parallax amount={34} style={{ marginBottom: 28 }}>
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
                display: "block",
              }}
            />
          </Parallax>
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
          <WordReveal
            text={t.aboutTitle}
            style={{
              margin: 0,
              fontWeight: 800,
              fontSize: "clamp(34px,4.4vw,56px)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              fontFamily: "'Heebo', var(--font-heebo), sans-serif",
            }}
          />

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

        {/* Right: paragraphs, scroll-scrubbed word reveal */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {t.aboutParas.map((para, i) => (
            <ScrubText
              key={i}
              text={para}
              style={{
                margin: 0,
                color: "var(--ink)",
                fontSize: "clamp(18px,1.7vw,23px)",
                lineHeight: 1.66,
                fontWeight: 400,
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

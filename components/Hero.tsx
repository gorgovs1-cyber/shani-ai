"use client";

import { useLang } from "@/components/LanguageProvider";

export default function Hero() {
  const { t, lang } = useLang();
  const emClass = lang === "he" ? "em-he" : "em-en";

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "9rem clamp(1.5rem, 6vw, 5rem) 4rem",
      position: "relative", overflow: "hidden",
    }}>
      {/* Atmospheric background — single-accent ambient field + faint grid */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 60% 55% at 20% 35%, rgba(255,106,61,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 45% 45% at 85% 75%, rgba(255,106,61,0.06) 0%, transparent 55%)
        `,
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5,
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
        backgroundImage: `
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
      }} />

      <div style={{ width: "100%", maxWidth: 1100, marginInline: "auto", position: "relative" }}>
        {/* Eyebrow */}
        <div className="hero-line" style={{ marginBottom: "1.75rem" }}>
          <span className="pill" style={{
            color: "var(--signal)",
            borderColor: "var(--signal-line)",
            background: "var(--signal-soft)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)", display: "inline-block" }} />
            {t.hero.badge}
          </span>
        </div>

        {/* Headline */}
        {t.hero.title.map((tok, i) => (
          <div key={i} className="hero-line display-xl" style={{ color: "var(--cream)", maxWidth: 900 }}>
            {tok.em ? <span className={emClass}>{tok.text}</span> : tok.text}
          </div>
        ))}

        {/* Sub */}
        <p className="hero-sub body-lg" style={{ maxWidth: 540, marginTop: "1.75rem", color: "var(--mist)" }}>
          {t.hero.subPre}
          <span style={{ color: "var(--cream)", fontWeight: 700 }}>{t.hero.subStrong}</span>
        </p>

        {/* CTAs */}
        <div className="hero-cta" style={{
          display: "flex", gap: "1rem", marginTop: "2.25rem",
          flexWrap: "wrap", alignItems: "center",
        }}>
          <a href="https://wa.me/972504744815" className="btn-grad" style={{ padding: "1rem 2.25rem", fontSize: "0.95rem", borderRadius: 12 }}>
            {t.hero.ctaPrimary}
          </a>
          <a href="#work" className="btn-ghost" style={{ borderRadius: 12 }}>
            {t.hero.ctaSecondary}
          </a>
        </div>
        <p style={{ fontSize: "0.72rem", color: "var(--mist)", marginTop: "1rem", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>
          {t.hero.responseLine}
        </p>

        {/* Trust bar */}
        <div className="hero-stat" style={{
          display: "flex", flexWrap: "wrap", gap: "1.25rem 1.75rem",
          marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid var(--border)",
        }}>
          {t.hero.trust.map((item) => (
            <span key={item} style={{
              fontSize: "0.8rem", color: "var(--mist)",
              display: "flex", alignItems: "center", gap: "0.45rem",
            }}>
              <span style={{ color: "var(--signal)", fontWeight: 700 }}>✓</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

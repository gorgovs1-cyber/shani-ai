"use client";

import { useLang } from "@/components/LanguageProvider";
import { projects } from "@/lib/projects";

export default function TrustedBy() {
  const { t } = useLang();
  // Distinct brand wordmarks from real case studies.
  const names = projects.map((p) => p.title);
  const loop = [...names, ...names]; // duplicate for seamless marquee

  return (
    <section
      aria-label={t.trusted.label}
      style={{
        padding: "clamp(2.5rem, 5vw, 3.5rem) 0",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{
        textAlign: "center",
        marginBottom: "2rem",
        padding: "0 1.5rem",
      }}>
        <div className="label" style={{ color: "var(--mist)", letterSpacing: "0.18em" }}>
          {t.trusted.label}
        </div>
      </div>

      {/* Marquee strip — fades at both edges */}
      <div style={{
        position: "relative",
        maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        direction: "ltr",
      }}>
        <div className="marquee-track" style={{ alignItems: "center" }}>
          {loop.map((name, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "2rem" }}>
              <span style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(1.1rem, 2.4vw, 1.6rem)",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: "var(--cream)",
                opacity: 0.55,
                whiteSpace: "nowrap",
                transition: "opacity 0.3s ease, color 0.3s ease",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = "var(--signal)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.55"; e.currentTarget.style.color = "var(--cream)"; }}
              >
                {name}
              </span>
              <span aria-hidden="true" style={{
                width: 5, height: 5, borderRadius: "50%", background: "var(--signal)", opacity: 0.4,
              }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

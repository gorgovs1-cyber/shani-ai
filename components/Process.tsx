"use client";

import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";

export default function Process() {
  const { lang } = useLang();
  const t = dict[lang];

  return (
    <section
      id="process"
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
        style={{
          fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
          fontSize: 13,
          letterSpacing: ".2em",
          color: "var(--acc)",
          marginBottom: 16,
        }}
      >
        {t.processKicker}
      </div>
      <h2
        style={{
          margin: "0 0 12px",
          fontWeight: 800,
          fontSize: "clamp(34px,4.4vw,56px)",
          lineHeight: 1.04,
          letterSpacing: "-0.03em",
          fontFamily: "'Heebo', var(--font-heebo), sans-serif",
        }}
      >
        {t.processTitle}
      </h2>
      <p
        style={{
          margin: "0 0 50px",
          color: "var(--muted2)",
          fontSize: 17,
          lineHeight: 1.6,
          maxWidth: "44ch",
          fontFamily: "'Heebo', var(--font-heebo), sans-serif",
        }}
      >
        {t.processSub}
      </p>

      {/* 5-col grid */}
      <div
        className="process-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 18 }}
      >
        {t.steps.map((step) => (
          <div
            key={step.n}
            style={{
              position: "relative",
              background: "var(--card)",
              border: "1px solid var(--line)",
              borderRadius: 18,
              padding: "26px 22px",
              transition: "transform .3s, box-shadow .3s, border-color .3s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-5px)";
              el.style.boxShadow = "0 24px 50px -30px rgba(27,23,18,.26)";
              el.style.borderColor = "color-mix(in oklch, var(--acc) 40%, var(--line))";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "";
              el.style.boxShadow = "";
              el.style.borderColor = "var(--line)";
            }}
          >
            {/* Number badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <span
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: "color-mix(in oklch, var(--acc) 16%, transparent)",
                  color: "var(--acc)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
                  fontWeight: 700,
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                {step.n}
              </span>
            </div>
            <h3
              style={{
                margin: "0 0 8px",
                fontWeight: 800,
                fontSize: 18,
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                margin: 0,
                color: "var(--muted2)",
                fontSize: 14,
                lineHeight: 1.5,
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
              }}
            >
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

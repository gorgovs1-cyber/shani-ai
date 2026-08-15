"use client";

import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";

export default function Journey() {
  const { lang } = useLang();
  const t = dict[lang];

  return (
    <section
      id="journey"
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
        {t.journeyKicker}
      </div>

      <h2
        style={{
          margin: "0 0 10px",
          fontWeight: 800,
          fontSize: "clamp(30px,3.6vw,46px)",
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          fontFamily: "'Heebo', var(--font-heebo), sans-serif",
        }}
      >
        {t.journeyTitle}
      </h2>

      <p
        style={{
          margin: "0 0 40px",
          color: "var(--muted2)",
          fontSize: 17,
          lineHeight: 1.6,
          maxWidth: "44ch",
          fontFamily: "'Heebo', var(--font-heebo), sans-serif",
        }}
      >
        {t.journeySub}
      </p>

      <div className="journey-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {t.journeySteps.map((s: any) => (
          <a
            key={s.no}
            href={s.href}
            style={{
              position: "relative",
              display: "block",
              background: "var(--card)",
              border: "1px solid var(--line)",
              borderRadius: 22,
              padding: "30px 28px",
              textDecoration: "none",
              color: "inherit",
              transition: "transform .3s, box-shadow .3s, border-color .3s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-6px)";
              el.style.boxShadow = "0 30px 60px -34px rgba(27,23,18,.28)";
              el.style.borderColor = "color-mix(in oklch, var(--acc) 45%, var(--line))";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "";
              el.style.boxShadow = "";
              el.style.borderColor = "var(--line)";
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
                fontSize: 13,
                color: "var(--acc)",
                marginBottom: 18,
              }}
            >
              {s.no}
            </div>
            <h3
              style={{
                margin: "0 0 8px",
                fontWeight: 800,
                fontSize: 21,
                letterSpacing: "-0.01em",
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
              }}
            >
              {s.title}
            </h3>
            <p
              style={{
                margin: 0,
                color: "var(--muted2)",
                fontSize: 15,
                lineHeight: 1.65,
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
              }}
            >
              {s.desc}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}

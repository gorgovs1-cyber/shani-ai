"use client";

import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";

export default function Services() {
  const { lang } = useLang();
  const t = dict[lang];

  return (
    <section
      id="build"
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
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 30, marginBottom: 46, flexWrap: "wrap" }}>
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
              fontSize: 13,
              letterSpacing: ".2em",
              color: "var(--acc)",
              marginBottom: 16,
            }}
          >
            {t.buildKicker}
          </div>
          <h2
            style={{
              margin: 0,
              fontWeight: 800,
              fontSize: "clamp(34px,4.4vw,58px)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              maxWidth: "18ch",
              fontFamily: "'Heebo', var(--font-heebo), sans-serif",
            }}
          >
            {t.buildTitle}
          </h2>
        </div>
        <p
          style={{
            margin: 0,
            color: "var(--muted2)",
            fontSize: 17,
            lineHeight: 1.6,
            maxWidth: "30ch",
            fontFamily: "'Heebo', var(--font-heebo), sans-serif",
          }}
        >
          {t.buildSub}
        </p>
      </div>

      {/* 3-col grid */}
      <div
        className="services-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}
      >
        {t.services.map((s) => (
          <div
            key={s.no}
            style={{
              position: "relative",
              background: "var(--card)",
              border: "1px solid var(--line)",
              borderRadius: 22,
              padding: "34px 30px",
              overflow: "hidden",
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
                marginBottom: 50,
              }}
            >
              {s.no}
            </div>
            <h3
              style={{
                margin: "0 0 6px",
                fontWeight: 800,
                fontSize: 22,
                letterSpacing: "-0.01em",
                fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
                color: "var(--acc)",
              }}
            >
              {s.title}
            </h3>
            {'subtitle' in s && (
              <div style={{
                margin: "0 0 14px",
                fontWeight: 700,
                fontSize: 17,
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                color: "var(--text, #f4ede1)",
              }}>
                {(s as any).subtitle}
              </div>
            )}
            <p
              style={{
                margin: 0,
                color: "var(--muted2)",
                fontSize: 15,
                lineHeight: 1.65,
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                flexGrow: 1,
              }}
            >
              {s.desc}
            </p>
            <a
              href={`https://wa.me/972504744815?text=${encodeURIComponent(`היי שני, אני מתעניינת ב${s.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 28,
                color: "var(--acc)",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                borderTop: "1px solid var(--line)",
                paddingTop: 20,
                width: "100%",
              }}
            >
              {t.servicesCta} ←
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

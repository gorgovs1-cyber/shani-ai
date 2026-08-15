"use client";

import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";

export default function Problem() {
  const { lang } = useLang();
  const t = dict[lang];

  return (
    <section
      id="problem"
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
        {t.problemKicker}
      </div>

      <h2
        style={{
          margin: "0 0 34px",
          fontWeight: 800,
          fontSize: "clamp(34px,4.4vw,58px)",
          lineHeight: 1.04,
          letterSpacing: "-0.03em",
          maxWidth: "20ch",
          fontFamily: "'Heebo', var(--font-heebo), sans-serif",
        }}
      >
        {t.problemTitle}
      </h2>

      <div style={{ maxWidth: "62ch" }}>
        {t.problemLines.map((line: string, i: number) => (
          <p
            key={i}
            style={{
              margin: "0 0 14px",
              color: i === t.problemLines.length - 1 ? "var(--ink)" : "var(--muted2)",
              fontWeight: i === t.problemLines.length - 1 ? 700 : 400,
              fontSize: "clamp(17px,2vw,21px)",
              lineHeight: 1.7,
              fontFamily: "'Heebo', var(--font-heebo), sans-serif",
            }}
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}

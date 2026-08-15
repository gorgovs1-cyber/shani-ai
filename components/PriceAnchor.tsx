"use client";

import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";

export default function PriceAnchor() {
  const { lang } = useLang();
  const t = dict[lang];

  return (
    <section
      id="price-anchor"
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
          background: "var(--card)",
          border: "1px solid var(--line)",
          borderRadius: 22,
          padding: "clamp(28px,4vw,44px)",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
            fontSize: 13,
            letterSpacing: ".2em",
            color: "var(--acc)",
            marginBottom: 14,
          }}
        >
          {t.priceKicker}
        </div>

        <h2
          style={{
            margin: "0 0 8px",
            fontWeight: 800,
            fontSize: "clamp(26px,3vw,38px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            fontFamily: "'Heebo', var(--font-heebo), sans-serif",
          }}
        >
          {t.priceTitle}
        </h2>

        <p
          style={{
            margin: "0 0 30px",
            color: "var(--muted2)",
            fontSize: 16,
            lineHeight: 1.6,
            maxWidth: "48ch",
            fontFamily: "'Heebo', var(--font-heebo), sans-serif",
          }}
        >
          {t.priceSub}
        </p>

        <div
          className="price-anchor-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 30 }}
        >
          {t.priceItems.map((p: any) => (
            <div
              key={p.label}
              style={{
                borderTop: "1px solid var(--line)",
                paddingTop: 16,
              }}
            >
              <div
                style={{
                  color: "var(--muted2)",
                  fontSize: 15,
                  marginBottom: 6,
                  fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                }}
              >
                {p.label}
              </div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(24px,2.6vw,32px)",
                  letterSpacing: "-0.02em",
                  fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                }}
              >
                {p.price}
              </div>
            </div>
          ))}
        </div>

        <a
          href="/pricing"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "var(--acc)",
            fontSize: 15,
            fontWeight: 700,
            textDecoration: "none",
            fontFamily: "'Heebo', var(--font-heebo), sans-serif",
          }}
        >
          {t.priceCta} ←
        </a>
      </div>
    </section>
  );
}

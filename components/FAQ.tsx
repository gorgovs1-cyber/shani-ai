"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";

export default function FAQ() {
  const { lang } = useLang();
  const t = dict[lang];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
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
        const io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              el.style.opacity = "1";
              el.style.transform = "none";
              io.disconnect();
            }
          },
          { threshold: 0.08 }
        );
        io.observe(el);
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 52 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
            fontSize: 13,
            letterSpacing: ".2em",
            color: "var(--acc)",
            marginBottom: 16,
          }}
        >
          {t.faqKicker}
        </div>
        <h2
          style={{
            margin: 0,
            fontWeight: 800,
            fontSize: "clamp(34px,4.4vw,58px)",
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            fontFamily: "'Heebo', var(--font-heebo), sans-serif",
          }}
        >
          {t.faqTitle}
        </h2>
      </div>

      {/* Items */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          maxWidth: 860,
        }}
      >
        {t.faqItems.map((item, i) => (
          <div
            key={i}
            style={{
              border: "1px solid",
              borderColor:
                open === i
                  ? "color-mix(in oklch, var(--acc) 40%, var(--line))"
                  : "var(--line)",
              borderRadius: 16,
              overflow: "hidden",
              background: open === i ? "var(--card)" : "transparent",
              transition: "background .2s, border-color .2s",
            }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "22px 28px",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: lang === "he" ? "right" : "left",
                direction: lang === "he" ? "rtl" : "ltr",
                gap: 16,
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 17,
                  color: "var(--text, #f4ede1)",
                  fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                  lineHeight: 1.4,
                }}
              >
                {item.q}
              </span>
              <span
                aria-hidden="true"
                style={{
                  color: "var(--acc)",
                  fontSize: 24,
                  flexShrink: 0,
                  lineHeight: 1,
                  transition: "transform .25s",
                  transform: open === i ? "rotate(45deg)" : "none",
                  display: "inline-block",
                }}
              >
                +
              </span>
            </button>

            <div
              style={{
                overflow: "hidden",
                maxHeight: open === i ? 400 : 0,
                transition: "max-height .35s ease",
              }}
            >
              <p
                style={{
                  margin: 0,
                  padding: "0 28px 26px",
                  color: "var(--muted2)",
                  fontSize: 16,
                  lineHeight: 1.72,
                  fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                  direction: lang === "he" ? "rtl" : "ltr",
                }}
              >
                {item.a}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQPage schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: t.faqItems.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
    </section>
  );
}

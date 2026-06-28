"use client";

import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";

export default function Contact() {
  const { lang } = useLang();
  const t = dict[lang];

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(72px,9vw,128px) 24px",
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
          maxWidth: 1320,
          margin: "0 auto",
          position: "relative",
          background: "var(--dark)",
          borderRadius: 32,
          overflow: "hidden",
          border: "1px solid var(--dline)",
          padding: "clamp(56px,8vw,104px) clamp(28px,5vw,72px)",
          textAlign: "center",
        }}
      >
        {/* Bottom radial glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -180,
            left: "50%",
            transform: "translateX(-50%)",
            width: 760,
            height: 560,
            background: "radial-gradient(circle, color-mix(in oklch, var(--acc) 36%, transparent), transparent 60%)",
            filter: "blur(30px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative" }}>
          {/* Personal photo */}
          <img
            src="/shani-cta.jpg.png"
            alt={lang === "he" ? "שני גורגוב" : "Shani Gorgov"}
            loading="lazy"
            decoding="async"
            style={{
              width: 116,
              height: 116,
              objectFit: "cover",
              objectPosition: "top",
              borderRadius: "50%",
              border: "2px solid color-mix(in oklch, var(--acc) 60%, transparent)",
              marginBottom: 24,
              boxShadow: "0 0 26px color-mix(in oklch, var(--acc) 35%, transparent)",
            }}
          />

          <h2
            style={{
              margin: "0 auto",
              color: "var(--dtext)",
              fontWeight: 800,
              fontSize: "clamp(34px,5.4vw,72px)",
              lineHeight: 1.03,
              letterSpacing: "-0.03em",
              maxWidth: "16ch",
              fontFamily: "'Heebo', var(--font-heebo), sans-serif",
            }}
          >
            {t.contactTitle}
          </h2>

          <p
            style={{
              margin: "24px auto 0",
              color: "var(--dmuted)",
              fontSize: "clamp(17px,1.6vw,21px)",
              lineHeight: 1.6,
              maxWidth: "42ch",
              fontFamily: "'Heebo', var(--font-heebo), sans-serif",
            }}
          >
            {t.contactSub}
          </p>

          {/* CTA buttons */}
          <div
            className="contact-cta-row"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              justifyContent: "center",
              marginTop: 40,
            }}
          >
            <a
              href="https://wa.me/972504744815"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "var(--acc)",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 17,
                padding: "18px 36px",
                borderRadius: 14,
                transition: "transform .2s, box-shadow .2s",
                boxShadow: "0 18px 40px -16px var(--acc)",
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 26px 52px -16px var(--acc)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "";
                el.style.boxShadow = "0 18px 40px -16px var(--acc)";
              }}
            >
              {t.contactCta1}
            </a>
            <a
              href="mailto:shani.creates.ai@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "rgba(244,237,225,0.05)",
                color: "var(--dtext)",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 17,
                padding: "18px 30px",
                borderRadius: 14,
                border: "1px solid var(--dline)",
                transition: "border-color .2s",
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--dmuted)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--dline)";
              }}
            >
              {t.contactCta2}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

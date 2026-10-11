"use client";

import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";
import WordReveal from "@/components/WordReveal";
import Link from "next/link";
import { useState } from "react";

export default function Services() {
  const { lang } = useLang(); const L = useLang().href;
  const t = dict[lang];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="build"
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1200,
        margin: "0 auto",
        padding: "var(--section-gap) 24px 0",

        transition: "opacity var(--t-slow) cubic-bezier(.2,.7,.2,1), transform var(--t-slow) cubic-bezier(.2,.7,.2,1)",
      }}
    >
      {/* Header */}
      <div className="section-heading" style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 30, marginBottom: 46, flexWrap: "wrap", textAlign: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
          <WordReveal
            text={t.buildTitle}
            style={{
              margin: 0,
              fontWeight: 800,
              fontSize: "clamp(34px,4.4vw,58px)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              maxWidth: "18ch",
              fontFamily: "'Heebo', var(--font-heebo), sans-serif",
            }}
          />
        </div>
      </div>

      {/* Compact service tiles: title first, details on demand */}
      <div className="services-grid svc-tiles">
        {t.services.map((s, i) => {
          // /audit is a static page behind a rewrite, so it gets a plain anchor (a Link would prefetch a non-existent RSC payload)
          const href = ["/websites", "/automations", "/automations#solutions", "/audit", "/audit", "/audit", "/audit"][i];
          const ctaLabel = href === "/audit" ? t.servicesCtaAudit : t.servicesCta;
          const isOpen = open === i;
          const Cta: any = href === "/audit" ? "a" : Link;
          return (
            <div key={s.no} className={`svc-tile${isOpen ? " is-open" : ""}`}>
              <button
                type="button"
                className="svc-tile-trigger"
                aria-expanded={isOpen}
                aria-controls={`svc-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="svc-no">{s.no}</span>
                <span className="svc-title">{s.title}</span>
                <span className="svc-sym" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
              <div id={`svc-panel-${i}`} className="svc-panel" hidden={!isOpen}>
                <p className="svc-desc">{s.desc}</p>
                <p className="svc-fit"><span>{lang === "he" ? "מתאים לכם אם: " : "It fits if: "}</span>{s.fit}</p>
                <Cta href={L(href)} className="svc-link">{ctaLabel}</Cta>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

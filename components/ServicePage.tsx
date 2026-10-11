"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import Footer from "@/components/Footer";
import AutomationFlowDemo from "@/components/AutomationFlowDemo";
import Link from "next/link";

const HEEBO = "'Heebo', var(--font-heebo), sans-serif";
const MONO = "'JetBrains Mono', var(--font-mono), monospace";
const WA = "972504744815";
const wa = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

export type ServiceCopy = {
  dir: "rtl" | "ltr";
  kicker: string;
  title: string;
  lead: string;
  primaryCta: string;
  primaryWaMsg: string;
  secondaryCta: string; // scrolls to the product list on the same page
  includesTitle: string;
  includes: string[];
  /** המוצרים של השירות הזה, עם ההסבר המלא. המחירון מקשר לכאן. */
  products?: {
    title: string;
    note?: string;
    labels: { fit: string; includes: string; forWho: string; notFor: string; example: string };
    items: {
      name: string;
      price?: string;
      fit: string;
      includes: string;
      forWho: string;
      notFor?: string;
      exampleLabel?: string;
      exampleUrl?: string;
      cta?: { label: string; href: string };
    }[];
  };
  /** קישורים לשני השירותים האחרים */
  alsoTitle?: string;
  also?: { label: string; href: string; desc: string }[];
  /** גשר לשלב הבא בסיפור, מוצג ממש לפני ה-CTA הסוגר, כדי שהעמוד לא ייגמר
      בקריאה גנרית לפעולה אלא בהמשך הסיפור: ייעוץ → אוטומציות → אתרים → הוכחה. */
  bridge?: { text: string; linkLabel: string; href: string };
  /** הדגמה חיה של אוטומציה מעל בלוק המוצרים */
  liveDemo?: { title: string; sub: string };
  sections: { h: string; p: string }[];
  faqTitle: string;
  faqItems: { q: string; a: string }[];
  closingTitle: string;
  closingSub: string;
  closingCta: string;
  closingWaMsg: string;
  auditLine: string;
};

export default function ServicePage({
  copyByLang,
  beforeClosing,
}: {
  copyByLang: Record<"he" | "en", ServiceCopy>;
  /** Optional block rendered just above the closing CTA — used for page-specific
      widgets (e.g. the ROI calculator on /automations) without forking this template. */
  beforeClosing?: React.ReactNode;
}) {
  const { lang } = useLang(); const L = useLang().href;
  const c = copyByLang[lang];
  const dir = c.dir;
  const auditLabel = lang === "he" ? "בדיקת התאמה חינם" : "Free fit check";
  const [open, setOpen] = useState<number | null>(null);
  const [openProduct, setOpenProduct] = useState<number | null>(null);

  return (
    <>
      <div className="service-content" dir={dir} style={{ padding: "9rem clamp(20px,5vw,40px) 0", maxWidth: 1200, margin: "0 auto" }}>
        {/* Hero */}
        <header className="service-page-hero">
        <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".2em", color: "var(--acc)", marginBottom: 16 }}>{c.kicker}</div>
        <h1 style={{ margin: "0 auto", fontWeight: 800, fontSize: "clamp(34px,5.2vw,60px)", lineHeight: 1.03, letterSpacing: "-0.03em", color: "var(--ink)", fontFamily: HEEBO, maxWidth: "20ch" }}>{c.title}</h1>
        <p style={{ margin: "26px auto 0", color: "var(--muted2)", fontSize: "clamp(16px,1.7vw,20px)", lineHeight: 1.7, maxWidth: "60ch", fontFamily: HEEBO }}>{c.lead}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
          <a href={L("/audit")} className="btn btn-primary" style={{ fontFamily: HEEBO, boxShadow: "0 16px 36px -16px var(--acc)" }}>
            {auditLabel}
          </a>
          <a href="#solutions" className="btn btn-ghost" style={{ fontFamily: HEEBO }}>
            {c.secondaryCta}
          </a>
        </div>
        </header>

        {/* Includes */}
        <section className="service-section" style={{ marginTop: 64 }}>
          <h2 style={{ margin: "0 0 22px", fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", letterSpacing: "-0.02em", color: "var(--ink)", fontFamily: HEEBO }}>
            {c.includesTitle}
          </h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: 14 }}>
            {c.includes.map((f) => (
              <li key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "var(--card)", border: "1px solid var(--line)", borderRadius: 14, padding: "16px 18px", color: "var(--ink)", fontSize: 15, lineHeight: 1.55, fontFamily: HEEBO }}>
                <span style={{ color: "var(--acc)", flexShrink: 0, fontWeight: 800 }}>✓</span> {f}
              </li>
            ))}
          </ul>
        </section>

        {/* Live automation demo */}
        {c.liveDemo ? (
          <section className="service-section" style={{ marginTop: 72 }}>
            <h2 style={{ margin: "0 0 8px", fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", letterSpacing: "-0.02em", color: "var(--ink)", fontFamily: HEEBO }}>
              {c.liveDemo.title}
            </h2>
            <AutomationFlowDemo />
          </section>
        ) : null}

        {/* Products: the full explanation lives here, pricing links in */}
        {c.products ? (
          <section id="solutions" className="service-section" style={{ marginTop: 72 }}>
            <h2 style={{ margin: "0 0 10px", fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", letterSpacing: "-0.02em", color: "var(--ink)", fontFamily: HEEBO }}>
              {c.products.title}
            </h2>
            {c.products.note ? (
              <p style={{ margin: "0 0 28px", color: "var(--muted2)", fontSize: 16, lineHeight: 1.7, maxWidth: "64ch", fontFamily: HEEBO }}>
                {c.products.note}
              </p>
            ) : (
              <div style={{ height: 18 }} />
            )}
            <div className="service-product-grid">
              {c.products.items.map((p, pi) => {
                const isOpen = openProduct === pi;
                return (
                <article key={p.name} className={`service-product-card${isOpen ? " is-open" : ""}`}>
                  <h3 style={{ fontFamily: HEEBO }}>{p.name}</h3>
                  <p className="spc-fit" style={{ fontFamily: HEEBO }}>{p.fit}</p>
                  <button
                    type="button"
                    className="spc-toggle"
                    aria-expanded={isOpen}
                    aria-controls={`spc-panel-${pi}`}
                    onClick={() => setOpenProduct(isOpen ? null : pi)}
                    style={{ fontFamily: HEEBO }}
                  >
                    {isOpen ? (lang === "he" ? "סגירה" : "Close") : (lang === "he" ? "מה כלול ולמי זה מתאים" : "What is included")}
                    <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                  <div id={`spc-panel-${pi}`} className="spc-panel" hidden={!isOpen}>
                    <dl style={{ fontFamily: HEEBO }}>
                      {[
                        [c.products!.labels.includes, p.includes],
                        [c.products!.labels.forWho, p.forWho],
                        ...(p.notFor ? [[c.products!.labels.notFor, p.notFor]] : []),
                      ].map(([label, value]) => (
                        <div key={label as string}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                    {p.exampleUrl ? (
                      <a className="spc-example" href={p.exampleUrl} target="_blank" rel="noopener noreferrer">
                        {c.products!.labels.example}: {p.exampleLabel}
                      </a>
                    ) : null}
                    <a className="btn btn-ghost spc-cta" href={L(p.cta?.href || "/audit")}>
                      {p.cta?.label || (lang === "he" ? "זה מתאים לי" : "This fits me")}
                    </a>
                  </div>
                </article>
                );
              })}
            </div>
          </section>
        ) : null}

        {/* Cross-links to the other services */}
        {c.also && c.also.length ? (
          <section style={{ marginTop: 72 }}>
            <h2 style={{ margin: "0 0 22px", fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", letterSpacing: "-0.02em", color: "var(--ink)", fontFamily: HEEBO }}>
              {c.alsoTitle}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: 16 }}>
              {c.also.map((a) => (
                <Link key={a.href} href={L(a.href)} style={{ display: "block", background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, padding: "20px 22px", textDecoration: "none" }}>
                  <div style={{ fontWeight: 800, fontSize: 18, color: "var(--ink)", fontFamily: HEEBO, marginBottom: 6 }}>{a.label}</div>
                  <div style={{ color: "var(--muted2)", fontSize: 15, lineHeight: 1.6, fontFamily: HEEBO }}>{a.desc}</div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {/* Detail sections (search-query headings) */}
        {c.sections.length ? <section style={{ marginTop: 64, display: "flex", flexDirection: "column", gap: 40 }}>
          {c.sections.map((s) => (
            <div key={s.h}>
              <h2 style={{ margin: "0 0 12px", fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", letterSpacing: "-0.02em", color: "var(--ink)", fontFamily: HEEBO, maxWidth: "26ch" }}>
                {s.h}
              </h2>
              <p style={{ margin: 0, color: "var(--muted2)", fontSize: "clamp(15px,1.6vw,18px)", lineHeight: 1.75, maxWidth: "68ch", fontFamily: HEEBO }}>
                {s.p}
              </p>
            </div>
          ))}
        </section> : null}

        {/* FAQ */}
        <section style={{ marginTop: 72 }}>
          <h2 style={{ margin: "0 0 30px", fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", letterSpacing: "-0.02em", color: "var(--ink)", fontFamily: HEEBO }}>
            {c.faqTitle}
          </h2>
          <div className="service-faq">
            {c.faqItems.map((item, i) => (
              <div key={i} className={`service-faq-item${open === i ? " is-open" : ""}`}>
                <button
                  type="button"
                  className="service-faq-trigger"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`service-faq-${i}`}
                  style={{ textAlign: dir === "rtl" ? "right" : "left", direction: dir }}
                >
                  <span style={{ fontFamily: HEEBO }}>{item.q}</span>
                  <span aria-hidden="true">{open === i ? "−" : "+"}</span>
                </button>
                <div id={`service-faq-${i}`} className="service-faq-panel" hidden={open !== i}>
                  <p style={{ fontFamily: HEEBO, direction: dir }}>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {beforeClosing}

        {/* Story bridge to the next step, right before the closing CTA,
            so the page doesn't just end on a generic call to action. */}
        {c.bridge ? (
          <div style={{ marginTop: 56, textAlign: "center" }}>
            <p style={{ margin: "0 0 18px", color: "var(--muted2)", fontSize: 16, lineHeight: 1.6, fontFamily: HEEBO }}>
              {c.bridge.text}
            </p>
            {/* Was a plain text link (transparent background, no padding) sitting
                between the FAQ and the closing CTA — easy to miss and, worse, easy
                to mistake for non-interactive text. This is real portfolio proof
                right before a pricing decision, so it gets real button chrome. */}
            <Link
              href={L(c.bridge.href)}
              className="work-bridge-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "var(--acc)",
                background: "color-mix(in oklch, var(--acc) 9%, transparent)",
                border: "1.5px solid color-mix(in oklch, var(--acc) 45%, var(--line))",
                borderRadius: 999,
                padding: "13px 26px",
                fontWeight: 700,
                fontSize: 16,
                lineHeight: 1.4,
                textDecoration: "none",
                fontFamily: HEEBO,
                transition: "background var(--t-fast) ease, border-color var(--t-fast) ease, transform var(--t-fast) ease",
              }}
            >
              {c.bridge.linkLabel}
            </Link>
          </div>
        ) : null}

        {/* Closing CTA band */}
        <section style={{ marginTop: 64, background: "var(--dark)", ...({ "--acc": "var(--acc-bright)" } as React.CSSProperties), borderRadius: 24, padding: "clamp(32px,4vw,52px)", textAlign: "center" }}>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", color: "var(--dtext)", fontFamily: HEEBO }}>
            {c.closingTitle}
          </h2>
          <div style={{ display: "flex", gap: 14, marginTop: 26, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={L("/audit")} className="btn btn-primary" style={{ fontFamily: HEEBO }}>
              {auditLabel}
            </a>
            <a href={wa(c.closingWaMsg)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark" style={{ fontFamily: HEEBO }}>
              {c.closingCta}
            </a>
          </div>
        </section>

        <div style={{ height: 90 }} />

        {/* FAQPage schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: c.faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }}
        />
      </div>
      <Footer />
    </>
  );
}

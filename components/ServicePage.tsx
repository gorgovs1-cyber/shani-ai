"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import Footer from "@/components/Footer";
import AutomationFlowDemo from "@/components/AutomationFlowDemo";
import Link from "next/link";
import NeedSolutionFlow, { FlowCopy } from "@/components/NeedSolutionFlow";

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
  /** Optional need → solution → how it works → how to start flow, rendered right after the hero.
      When present, `includes` may be empty and the section is skipped. */
  flow?: FlowCopy;
  /** המוצרים של השירות הזה, עם ההסבר המלא. המחירון מקשר לכאן. */
  products?: {
    title: string;
    note?: string;
    labels: { includes: string; notFor: string; example: string };
    items: {
      name: string;
      intro?: string;
      price?: string;
      includes: string;
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
  afterIncludes,
}: {
  copyByLang: Record<"he" | "en", ServiceCopy>;
  /** Optional block rendered just above the closing CTA — used for page-specific
      widgets (e.g. the live demo on /chatbots) without forking this template. */
  beforeClosing?: React.ReactNode;
  /** Optional block rendered immediately after the includes list. The Hebrew
      chatbots page embeds the salon bot demo here. */
  afterIncludes?: React.ReactNode;
}) {
  const { lang } = useLang(); const L = useLang().href;
  const c = copyByLang[lang];
  const dir = c.dir;
  const auditLabel = lang === "he" ? "בדיקת התאמה חינם" : "Free fit check";
  const [open, setOpen] = useState<number | null>(null);
  const [openProduct, setOpenProduct] = useState<number | null>(null);

  return (
    <>
      <div className="service-content sp" dir={dir}>
        {/* Hero */}
        <header className="service-page-hero sp-hero">
          <div className="sp-kicker">{c.kicker}</div>
          <h1>{c.title}</h1>
          <p className="sp-lead">{c.lead}</p>
          <div className="sp-actions">
            <a href={L("/audit")} className="btn btn-primary">{auditLabel}</a>
            <a href={c.products ? "#solutions" : c.flow ? "#flow-solution" : "#solutions"} className="btn btn-ghost">{c.secondaryCta}</a>
          </div>
        </header>

        {c.flow ? <NeedSolutionFlow copy={c.flow} /> : null}

        {/* Includes */}
        {c.includes.length ? <section className="service-section sp-section">
          <h2 className="sp-h2">{c.includesTitle}</h2>
          <ul className={`sp-includes n${c.includes.length}`}>
            {c.includes.map((f) => (
              <li key={f}>
                <span className="sp-check" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </section> : null}

        {afterIncludes}

        {/* Live automation demo */}
        {c.liveDemo ? (
          <section className="service-section sp-section">
            <h2 className="sp-h2">{c.liveDemo.title}</h2>
            <AutomationFlowDemo />
          </section>
        ) : null}

        {/* Products: name and one line visible, details on demand */}
        {c.products ? (
          <section id="solutions" className="service-section sp-section">
            <h2 className="sp-h2">{c.products.title}</h2>
            {c.products.note ? <p className="sp-note">{c.products.note}</p> : null}
            <div className={`service-product-grid sp-products n${c.products.items.length}`}>
              {c.products.items.map((p, pi) => {
                const isOpen = openProduct === pi;
                return (
                <article key={p.name} className={`service-product-card${isOpen ? " is-open" : ""}`}>
                  <h3>{p.name}</h3>
                  {p.intro ? <p className="spc-intro">{p.intro}</p> : null}
                  <button
                    type="button"
                    className="spc-toggle"
                    aria-expanded={isOpen}
                    aria-controls={`spc-panel-${pi}`}
                    onClick={() => setOpenProduct(isOpen ? null : pi)}
                  >
                    {isOpen ? (lang === "he" ? "סגירה" : "Close") : (lang === "he" ? "מה כלול" : "What is included")}
                    <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                  <div id={`spc-panel-${pi}`} className="spc-panel" hidden={!isOpen}>
                    <dl>
                      {[
                        [c.products!.labels.includes, p.includes],
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
          <section className="sp-section">
            <h2 className="sp-h2">{c.alsoTitle}</h2>
            <div className={`sp-also n${c.also.length}`}>
              {c.also.map((a) => (
                <Link key={a.href} href={L(a.href)} className="sp-also-card">
                  <strong>{a.label}</strong>
                  <span>{a.desc}</span>
                  <em aria-hidden="true">{dir === "rtl" ? "←" : "→"}</em>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {/* Detail sections (search-query headings) */}
        {c.sections.length ? <section className="sp-section sp-details">
          {c.sections.map((s) => (
            <div key={s.h}>
              <h2 className="sp-h2">{s.h}</h2>
              <p>{s.p}</p>
            </div>
          ))}
        </section> : null}

        {/* FAQ */}
        <section className="sp-section">
          <h2 className="sp-h2">{c.faqTitle}</h2>
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
                  <span>{item.q}</span>
                  <span aria-hidden="true">{open === i ? "−" : "+"}</span>
                </button>
                <div id={`service-faq-${i}`} className="service-faq-panel" hidden={open !== i}>
                  <p style={{ direction: dir }}>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {beforeClosing}

        {/* Closing CTA band, with the portfolio bridge folded in so the page ends on one block */}
        <section className="sp-closing">
          <h2>{c.closingTitle}</h2>
          {c.bridge ? <p>{c.bridge.text}</p> : null}
          <div className="sp-actions">
            <a href={L("/audit")} className="btn btn-primary">{auditLabel}</a>
            <a href={wa(c.closingWaMsg)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark">{c.closingCta}</a>
            {c.bridge ? <Link href={L(c.bridge.href)} className="btn btn-ghost-dark">{c.bridge.linkLabel}</Link> : null}
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

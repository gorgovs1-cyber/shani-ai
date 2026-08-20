"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import Footer from "@/components/Footer";
import AutomationFlowDemo from "@/components/AutomationFlowDemo";

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
  secondaryCta: string; // links to /pricing
  includesTitle: string;
  includes: string[];
  /** המוצרים של השירות הזה, עם ההסבר המלא. המחירון מקשר לכאן. */
  products?: {
    title: string;
    note?: string;
    labels: { fit: string; includes: string; forWho: string; notFor: string; example: string };
    items: {
      name: string;
      price: string;
      fit: string;
      includes: string;
      forWho: string;
      notFor?: string;
      exampleLabel?: string;
      exampleUrl?: string;
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
  const { lang } = useLang();
  const c = copyByLang[lang];
  const dir = c.dir;
  const auditLabel = lang === "he" ? "להתחיל באבחון AI חינם" : "Start a free AI Audit";
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <main dir={dir} style={{ padding: "9rem clamp(20px,5vw,40px) 0", maxWidth: 1100, margin: "0 auto" }}>
        {/* Hero */}
        <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".2em", color: "var(--acc)", marginBottom: 16 }}>
          {c.kicker}
        </div>
        <h1 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(34px,5.2vw,60px)", lineHeight: 1.03, letterSpacing: "-0.03em", color: "var(--ink)", fontFamily: HEEBO, maxWidth: "20ch" }}>
          {c.title}
        </h1>
        <p style={{ margin: "26px 0 0", color: "var(--muted2)", fontSize: "clamp(16px,1.7vw,21px)", lineHeight: 1.7, maxWidth: "60ch", fontFamily: HEEBO }}>
          {c.lead}
        </p>
        <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
          <a href="/audit" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--acc)", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 15.5, padding: "15px 30px", borderRadius: 14, fontFamily: HEEBO, boxShadow: "0 16px 36px -16px var(--acc)" }}>
            {auditLabel}
          </a>
          <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "var(--acc)", border: "1.5px solid var(--acc)", textDecoration: "none", fontWeight: 700, fontSize: 15.5, padding: "15px 30px", borderRadius: 14, fontFamily: HEEBO }}>
            {c.secondaryCta}
          </a>
        </div>

        {/* Includes */}
        <section style={{ marginTop: 64 }}>
          <h2 style={{ margin: "0 0 22px", fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", letterSpacing: "-0.02em", color: "var(--ink)", fontFamily: HEEBO }}>
            {c.includesTitle}
          </h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {c.includes.map((f) => (
              <li key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "var(--card)", border: "1px solid var(--line)", borderRadius: 14, padding: "16px 18px", color: "var(--ink)", fontSize: 15, lineHeight: 1.55, fontFamily: HEEBO }}>
                <span style={{ color: "var(--acc)", flexShrink: 0, fontWeight: 800 }}>✓</span> {f}
              </li>
            ))}
          </ul>
        </section>

        {/* Live automation demo */}
        {c.liveDemo ? (
          <section style={{ marginTop: 72 }}>
            <h2 style={{ margin: "0 0 8px", fontWeight: 800, fontSize: "clamp(24px,3vw,34px)", letterSpacing: "-0.02em", color: "var(--ink)", fontFamily: HEEBO }}>
              {c.liveDemo.title}
            </h2>
            <p style={{ margin: "0 0 24px", color: "var(--muted2)", fontSize: 16, lineHeight: 1.7, maxWidth: "62ch", fontFamily: HEEBO }}>
              {c.liveDemo.sub}
            </p>
            <AutomationFlowDemo />
          </section>
        ) : null}

        {/* Products: the full explanation lives here, pricing links in */}
        {c.products ? (
          <section style={{ marginTop: 72 }}>
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
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {c.products.items.map((p) => (
                <div key={p.name} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 20, padding: "26px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
                    <h3 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(19px,2.2vw,24px)", letterSpacing: "-0.01em", color: "var(--ink)", fontFamily: HEEBO }}>
                      {p.name}
                    </h3>
                    <span style={{ fontWeight: 800, fontSize: 20, color: "var(--acc)", fontFamily: HEEBO, whiteSpace: "nowrap" }}>{p.price}</span>
                  </div>
                  <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                    {[
                      [c.products!.labels.fit, p.fit],
                      [c.products!.labels.includes, p.includes],
                      [c.products!.labels.forWho, p.forWho],
                      ...(p.notFor ? [[c.products!.labels.notFor, p.notFor]] : []),
                    ].map(([label, value]) => (
                      <div key={label as string}>
                        <dt style={{ fontFamily: MONO, fontSize: 12, letterSpacing: ".14em", color: "var(--acc)", marginBottom: 5 }}>{label}</dt>
                        <dd style={{ margin: 0, color: "var(--muted2)", fontSize: 15.5, lineHeight: 1.7, fontFamily: HEEBO }}>{value}</dd>
                      </div>
                    ))}
                  </dl>
                  {p.exampleUrl ? (
                    <a href={p.exampleUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 16, color: "var(--acc)", fontWeight: 700, fontSize: 14.5, textDecoration: "none", fontFamily: HEEBO }}>
                      {c.products!.labels.example}: {p.exampleLabel}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Cross-links to the other services */}
        {c.also && c.also.length ? (
          <section style={{ marginTop: 72 }}>
            <h2 style={{ margin: "0 0 22px", fontWeight: 800, fontSize: "clamp(21px,2.6vw,30px)", letterSpacing: "-0.02em", color: "var(--ink)", fontFamily: HEEBO }}>
              {c.alsoTitle}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              {c.also.map((a) => (
                <a key={a.href} href={a.href} style={{ display: "block", background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, padding: "20px 22px", textDecoration: "none" }}>
                  <div style={{ fontWeight: 800, fontSize: 17, color: "var(--ink)", fontFamily: HEEBO, marginBottom: 6 }}>{a.label}</div>
                  <div style={{ color: "var(--muted2)", fontSize: 14.5, lineHeight: 1.6, fontFamily: HEEBO }}>{a.desc}</div>
                </a>
              ))}
            </div>
          </section>
        ) : null}

        {/* Detail sections (search-query headings) */}
        <section style={{ marginTop: 64, display: "flex", flexDirection: "column", gap: 40 }}>
          {c.sections.map((s) => (
            <div key={s.h}>
              <h2 style={{ margin: "0 0 12px", fontWeight: 800, fontSize: "clamp(21px,2.6vw,30px)", letterSpacing: "-0.02em", color: "var(--ink)", fontFamily: HEEBO, maxWidth: "26ch" }}>
                {s.h}
              </h2>
              <p style={{ margin: 0, color: "var(--muted2)", fontSize: "clamp(15px,1.6vw,18px)", lineHeight: 1.75, maxWidth: "68ch", fontFamily: HEEBO }}>
                {s.p}
              </p>
            </div>
          ))}
        </section>

        {/* FAQ */}
        <section style={{ marginTop: 72 }}>
          <h2 style={{ margin: "0 0 30px", fontWeight: 800, fontSize: "clamp(26px,3.4vw,42px)", letterSpacing: "-0.02em", color: "var(--ink)", fontFamily: HEEBO }}>
            {c.faqTitle}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 860 }}>
            {c.faqItems.map((item, i) => (
              <div key={i} style={{ border: "1px solid", borderColor: open === i ? "color-mix(in oklch, var(--acc) 40%, var(--line))" : "var(--line)", borderRadius: 16, overflow: "hidden", background: open === i ? "var(--card)" : "transparent", transition: "background .2s, border-color .2s" }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 28px", background: "none", border: "none", cursor: "pointer", textAlign: dir === "rtl" ? "right" : "left", direction: dir, gap: 16 }}
                >
                  <span style={{ fontWeight: 700, fontSize: 17, color: "var(--ink)", fontFamily: HEEBO, lineHeight: 1.4 }}>{item.q}</span>
                  <span aria-hidden="true" style={{ color: "var(--acc)", fontSize: 24, flexShrink: 0, lineHeight: 1, transition: "transform .25s", transform: open === i ? "rotate(45deg)" : "none", display: "inline-block" }}>+</span>
                </button>
                <div aria-hidden={open !== i} style={{ overflow: "hidden", maxHeight: open === i ? 500 : 0, transition: "max-height .35s ease" }}>
                  <p style={{ margin: 0, padding: "0 28px 26px", color: "var(--muted2)", fontSize: 16, lineHeight: 1.72, fontFamily: HEEBO, direction: dir }}>{item.a}</p>
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
            <a
              href={c.bridge.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "var(--muted2)",
                fontSize: 16,
                lineHeight: 1.6,
                textDecoration: "none",
                fontFamily: HEEBO,
              }}
            >
              {c.bridge.text}
              <span style={{ color: "var(--acc)", fontWeight: 700, textDecoration: "underline" }}>
                {c.bridge.linkLabel}
              </span>
              <span aria-hidden="true" style={{ color: "var(--acc)" }}>{dir === "rtl" ? "←" : "→"}</span>
            </a>
          </div>
        ) : null}

        {/* Closing CTA band */}
        <section style={{ marginTop: 64, background: "var(--dark)", borderRadius: 24, padding: "clamp(32px,4vw,52px)", textAlign: "center" }}>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(24px,3vw,36px)", color: "var(--dtext)", fontFamily: HEEBO }}>
            {c.closingTitle}
          </h2>
          <p style={{ margin: "14px auto 0", color: "var(--dmuted)", fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.6, maxWidth: "50ch", fontFamily: HEEBO }}>
            {c.closingSub}
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 26, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/audit" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--acc)", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 16, padding: "15px 32px", borderRadius: 14, fontFamily: HEEBO }}>
              {auditLabel}
            </a>
            <a href={wa(c.closingWaMsg)} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "var(--dtext)", border: "1.5px solid var(--dline)", textDecoration: "none", fontWeight: 700, fontSize: 16, padding: "15px 32px", borderRadius: 14, fontFamily: HEEBO }}>
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
      </main>
      <Footer />
    </>
  );
}

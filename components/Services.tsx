"use client";

import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";
import WordReveal from "@/components/WordReveal";
import Link from "next/link";

// Simple line icons, one per service, in the order of t.services
const ICONS = [
  <path key="i0" d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />,
  <path key="i1" d="M5 4h5v5H5zM14 15h5v5h-5zM10 6.5h3.5a2 2 0 0 1 2 2V15" />,
  <path key="i2" d="M12 3v3M12 18v3M3 12h3M18 12h3M7 7h10v10H7zM10 10h4v4h-4z" />,
  <path key="i3" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM8 9h8M8 13h5" />,
  <path key="i4" d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  <path key="i5" d="M4 5h16v6H4zM4 13h16v6H4zM8 8h.01M8 16h.01" />,
  <path key="i6" d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 20v-2a4 4 0 0 0-3-3.9M16 2.1a4 4 0 0 1 0 7.8" />,
];

export default function Services() {
  const { lang } = useLang(); const L = useLang().href;
  const t = dict[lang];
  // /audit is a static page behind a rewrite and #chat is an in-page anchor, so both get a plain <a>
  const hrefs = ["/websites", "/automations", "/automations#solutions", "/#chat", "/audit", "/audit", "/audit"];

  return (
    <section id="build" className="svc-section">
      <div className="section-heading svc-heading">
        <div className="svc-kicker">{t.buildKicker}</div>
        <WordReveal
          text={t.buildTitle}
          style={{ margin: 0, fontWeight: 800, fontSize: "clamp(34px,4.4vw,58px)", lineHeight: 1.08, letterSpacing: "-0.03em", fontFamily: "'Heebo', var(--font-heebo), sans-serif" }}
        />
      </div>

      <div className="svc-grid">
        {t.services.map((s, i) => {
          const href = hrefs[i];
          const Card: any = href === "/audit" || href.includes("#chat") ? "a" : Link;
          return (
            <Card key={s.no} href={L(href)} className={`svc-card${i < 3 ? " is-wide" : ""}`}>
              <span className="svc-icon" aria-hidden="true">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ICONS[i]}</svg>
              </span>
              <h3>{s.title}</h3>
              <p>{s.short}</p>
            </Card>
          );
        })}
      </div>

      <div className="svc-more">
        <a href={L("/audit")} className="btn btn-primary">{t.servicesCtaAudit}</a>
      </div>
    </section>
  );
}

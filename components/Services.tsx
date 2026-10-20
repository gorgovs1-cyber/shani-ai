"use client";

import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";
import WordReveal from "@/components/WordReveal";
import Link from "next/link";

// Simple line icons, one per service, in the order of t.services
const ICONS = [
  <path key="i0" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM8 9h8M8 13h5" />,
  <path key="i1" d="M4 5h16v6H4zM4 13h16v6H4zM8 8h.01M8 16h.01" />,
  <path key="i2" d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />,
  <path key="i3" d="M5 4h5v5H5zM14 15h5v5h-5zM10 6.5h3.5a2 2 0 0 1 2 2V15" />,
];

export default function Services() {
  const { lang } = useLang(); const L = useLang().href;
  const t = dict[lang];
  // /audit is a static page behind a rewrite and #chat is an in-page anchor, so both get a plain <a>
  // The CRM has no page of its own yet, so its card leads to the fit check and carries the #crm anchor used by the nav.
  const hrefs = ["/#chat", "/audit", "/websites", "/automations"];
  const ids = [undefined, "crm", undefined, undefined];

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
            <Card key={s.no} id={ids[i]} href={L(href)} className={`svc-card${i === 0 ? " is-lead" : ""}`}>
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

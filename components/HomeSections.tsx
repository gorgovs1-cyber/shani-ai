"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";

// Home page flow after the hero: who we are → services → how to start.
// All copy lives in lib/translations.ts (homeAbout*, homeServices*, homeStart*).

const ICONS: Record<string, React.ReactNode> = {
  websites: <path d="M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01" />,
  bots: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM8 9h8M8 13h5" />,
  visual: <path d="M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M9 9.5h.01" />,
  automations: <path d="M5 4h5v5H5zM14 15h5v5h-5zM10 6.5h3.5a2 2 0 0 1 2 2V15" />,
  crm: <path d="M4 5h16v6H4zM4 13h16v6H4zM8 8h.01M8 16h.01" />,
};

export function HomeAbout() {
  const { t } = useLang();
  return (
    <section className="home-about" aria-labelledby="home-about-title">
      <h2 id="home-about-title" className="home-kicker">{t.homeAboutTitle}</h2>
      <p className="home-about-text">{t.homeAboutText}</p>
    </section>
  );
}

export function HomeServices() {
  const { t, lang, href: L } = useLang();
  const arrow = lang === "he" ? "←" : "→";
  return (
    <section id="build" className="home-section" aria-labelledby="home-services-title">
      <h2 id="home-services-title" className="home-h2">{t.homeServicesTitle}</h2>
      <ul className="home-services">
        {t.homeServices.map((s) => (
          <li key={s.key} id={s.key === "crm" ? "crm" : undefined}>
            <Link href={L(s.href)} className="home-service">
              <span className="home-service-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ICONS[s.key]}</svg>
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="home-service-more">{t.homeServicesMore} <span aria-hidden="true">{arrow}</span></span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HomeStart() {
  const { t } = useLang();
  return (
    <section className="home-section" aria-labelledby="home-start-title">
      <h2 id="home-start-title" className="home-h2">{t.homeStartTitle}</h2>
      <ol className="home-start">
        {t.homeStartSteps.map((s) => (
          <li key={s.title} className="home-start-card">
            <span className="home-start-node" aria-hidden="true" />
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

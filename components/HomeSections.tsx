"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";

// Home page flow after the hero: who we are → services → how to start.
// All copy lives in lib/translations.ts (homeAbout*, homeServices*, homeStart*).
// Depth styling is shared through the .depth-card / .depth-rise classes in globals.css.

export function HomeAbout() {
  const { t } = useLang();
  return (
    <section className="home-about depth-rise" aria-labelledby="home-about-title">
      <h2 id="home-about-title" className="home-kicker">{t.homeAboutTitle}</h2>
      <p className="home-about-text">{t.homeAboutText}</p>
    </section>
  );
}

export function HomeServices() {
  const { t, href: L } = useLang();
  return (
    <section id="build" className="home-section" aria-labelledby="home-services-title">
      <h2 id="home-services-title" className="sr-only">{t.homeServicesTitle}</h2>
      <ul className="home-services">
        {t.homeServices.map((s) => (
          <li key={s.key} id={s.key === "crm" ? "crm" : undefined} className="depth-rise">
            <Link href={L(s.href)} className="home-service depth-card">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
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
          <li key={s.title} className="home-start-card depth-card depth-rise">
            <span className="home-start-node" aria-hidden="true" />
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

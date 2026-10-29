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

// One small line glyph per service, drawn in the orange ring on the start side of each row.
const SERVICE_GLYPHS: Record<string, React.ReactNode> = {
  websites: <><rect x="3" y="4.5" width="18" height="15" rx="3" /><path d="M3 9h18" /><path d="M6.5 6.8h.01M9 6.8h.01" /></>,
  bots: <><path d="M5 5.5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7l-4.5 3.5V16.5H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" /><path d="M8.5 11h.01M12 11h.01M15.5 11h.01" /></>,
  visual: <><rect x="3" y="4.5" width="18" height="15" rx="3" /><circle cx="9" cy="10" r="1.8" /><path d="m21 16-5-5-8.5 8.5" /></>,
  automations: <><path d="M20 12a8 8 0 0 1-13.7 5.6" /><path d="M4 12a8 8 0 0 1 13.7-5.6" /><path d="M18 3v3.6h-3.6M6 21v-3.6h3.6" /></>,
  crm: <><rect x="3.5" y="3.5" width="7" height="7" rx="2" /><rect x="13.5" y="3.5" width="7" height="7" rx="2" /><rect x="3.5" y="13.5" width="7" height="7" rx="2" /><rect x="13.5" y="13.5" width="7" height="7" rx="2" /></>,
};

// Magnetic pull: the row drifts up to 6px toward the cursor. Fine pointers only, off under reduced motion.
const MAGNET = 6;
function magnetMove(e: React.PointerEvent<HTMLAnchorElement>) {
  if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
  const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
  el.style.setProperty("--mx", `${(dx * MAGNET).toFixed(1)}px`);
  el.style.setProperty("--my", `${(dy * MAGNET * 0.5).toFixed(1)}px`);
}
function magnetReset(e: React.PointerEvent<HTMLAnchorElement>) {
  e.currentTarget.style.removeProperty("--mx");
  e.currentTarget.style.removeProperty("--my");
}

export function HomeServices() {
  const { t, href: L } = useLang();
  return (
    <section id="build" className="home-section" aria-labelledby="home-services-title">
      <h2 id="home-services-title" className="sr-only">{t.homeServicesTitle}</h2>
      <ul className="home-services">
        {t.homeServices.map((s) => (
          <li key={s.key} id={s.key === "crm" ? "crm" : undefined} className="depth-rise">
            <Link href={L(s.href)} className="home-service" onPointerMove={magnetMove} onPointerLeave={magnetReset}>
              <span className="home-service-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  {SERVICE_GLYPHS[s.key]}
                </svg>
              </span>
              <span className="home-service-body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </span>
              <span className="home-service-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
              </span>
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

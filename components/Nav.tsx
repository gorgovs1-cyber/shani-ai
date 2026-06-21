"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { useLang } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/i18n";

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const links = t.nav.links;

  return (
    <>
      {/* Floating glass pill */}
      <nav
        className="nav-pill"
        style={{
          position: "fixed",
          top: "1rem",
          insetInlineStart: "50%",
          transform: "translateX(-50%)",
          zIndex: 10001,
          width: "min(1100px, calc(100% - 1.5rem))",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "0.5rem 0.6rem 0.5rem 1rem",
          borderRadius: 999,
          border: `1px solid ${scrolled ? "var(--border-2)" : "var(--border)"}`,
          background: scrolled || menuOpen ? "rgba(11,13,16,0.72)" : "rgba(11,13,16,0.45)",
          backdropFilter: "blur(18px) saturate(140%)",
          WebkitBackdropFilter: "blur(18px) saturate(140%)",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <Logo height={30} />
        </Link>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} style={{
              fontSize: "0.82rem", fontWeight: 500, color: "var(--mist)",
              textDecoration: "none", transition: "color 0.2s ease",
              fontFamily: "var(--font-body)",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mist)")}
            >{l.label}</a>
          ))}
        </div>

        {/* Right cluster: language toggle + CTA */}
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <LangToggle lang={lang} setLang={setLang} label={t.a11y.langSwitch} />
          <a href="https://wa.me/972504744815" className="btn-grad"
            style={{ padding: "0.5rem 1.2rem", fontSize: "0.75rem", borderRadius: 999 }}>
            {t.nav.cta}
          </a>
        </div>

        {/* Mobile cluster: toggle + hamburger */}
        <div className="nav-hamburger" style={{ display: "none", alignItems: "center", gap: "0.6rem" }}>
          <LangToggle lang={lang} setLang={setLang} label={t.a11y.langSwitch} />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t.nav.menu}
            style={{
              display: "flex", flexDirection: "column", gap: "5px",
              background: "none", border: "none", cursor: "pointer",
              padding: "8px", margin: "-4px",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <span style={{ display: "block", width: 22, height: 2, background: "var(--cream)", borderRadius: 2, transition: "transform 0.3s ease", transform: menuOpen ? "rotate(45deg) translate(5px, 6px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 2, background: "var(--cream)", borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: "opacity 0.3s ease" }} />
            <span style={{ display: "block", width: 22, height: 2, background: "var(--cream)", borderRadius: 2, transition: "transform 0.3s ease", transform: menuOpen ? "rotate(-45deg) translate(5px, -6px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 10000,
          background: "rgba(11,13,16,0.98)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: "2.25rem",
        }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={closeMenu} style={{
              fontSize: "2rem", fontWeight: 700, color: "var(--cream)",
              textDecoration: "none", fontFamily: "var(--font-display)",
              letterSpacing: "-0.02em",
            }}>{l.label}</a>
          ))}
          <a href="https://wa.me/972504744815" className="btn-grad"
            onClick={closeMenu}
            style={{ padding: "1rem 2.5rem", fontSize: "1rem", marginTop: "0.5rem", borderRadius: 999 }}>
            {t.nav.cta}
          </a>
        </div>
      )}
    </>
  );
}

/* ─── Real HE/EN switch (toggles content + direction) ─── */
function LangToggle({ lang, setLang, label }: { lang: Lang; setLang: (l: Lang) => void; label: string }) {
  const opts: Lang[] = ["he", "en"];
  return (
    <div
      role="group"
      aria-label={label}
      style={{
        display: "inline-flex", alignItems: "center",
        border: "1px solid var(--border-2)", borderRadius: 999,
        padding: 2, gap: 2, background: "var(--ink-2)",
        fontFamily: "var(--font-mono)",
      }}
    >
      {opts.map((o) => {
        const active = lang === o;
        return (
          <button
            key={o}
            onClick={() => setLang(o)}
            aria-pressed={active}
            style={{
              border: "none", cursor: "pointer",
              padding: "0.28rem 0.6rem", borderRadius: 999,
              fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.05em",
              background: active ? "var(--signal)" : "transparent",
              color: active ? "#150a05" : "var(--mist)",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
          >
            {o.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

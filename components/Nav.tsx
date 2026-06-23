"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";

export default function Nav() {
  const { lang, setLang } = useLang();
  const t = dict[lang];
  const [menuOpen, setMenuOpen] = useState(false);

  // Sync document direction when language changes
  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { label: t.navWork,    href: "#work" },
    { label: t.navBuild,   href: "#build" },
    { label: t.navAbout,   href: "#about" },
    { label: t.navProcess, href: "#process" },
  ];

  return (
    <>
      {/* Floating capsule */}
      <div
        style={{
          position: "sticky",
          top: 18,
          zIndex: 200,
          display: "flex",
          justifyContent: "center",
          padding: "0 24px",
          pointerEvents: "none",
        }}
      >
        <nav
          aria-label="Main navigation"
          style={{
            pointerEvents: "auto",
            width: "100%",
            maxWidth: 1200,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            background: "rgba(20,16,9,0.86)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid var(--dline)",
            borderRadius: 999,
            padding: "10px 14px 10px 20px",
            boxShadow: "0 20px 50px -24px rgba(20,16,9,.5)",
          }}
        >
          {/* Left: Logo + name */}
          <a
            href="#top"
            style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none" }}
            aria-label="Shani Gorgov — home"
          >
            <Logo height={34} />
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1, gap: 3 }}>
              <span style={{
                color: "var(--dtext)",
                fontWeight: 800,
                fontSize: 16,
                letterSpacing: "-0.01em",
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
              }}>
                Shani Gorgov
              </span>
              <span style={{
                fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
                fontSize: 8.5,
                letterSpacing: ".26em",
                color: "var(--dmuted)",
              }}>
                WEB &amp; AI PRODUCT BUILDER
              </span>
            </span>
          </a>

          {/* Center: Desktop nav links */}
          <div
            className="nav-desktop"
            style={{ display: "flex", alignItems: "center", gap: 28 }}
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  color: "var(--dmuted)",
                  textDecoration: "none",
                  fontSize: 14.5,
                  fontWeight: 500,
                  transition: "color .2s",
                  fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--dtext)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dmuted)")}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right: lang toggle + CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Language toggle */}
            <div
              role="group"
              aria-label="Language / שפה"
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(244,237,225,0.07)",
                border: "1px solid var(--dline)",
                borderRadius: 999,
                padding: 3,
                fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {(["en", "he"] as const).map((l) => {
                const active = lang === l;
                return (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    aria-pressed={active}
                    style={{
                      border: "none",
                      cursor: "pointer",
                      padding: "7px 13px",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 700,
                      background: active ? "var(--acc)" : "transparent",
                      color: active ? "#fff" : "var(--dmuted)",
                      transition: "background .2s ease, color .2s ease",
                      fontFamily: "inherit",
                    }}
                  >
                    {l === "en" ? "EN" : "עב"}
                  </button>
                );
              })}
            </div>

            {/* CTA pill */}
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--acc)",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 14,
                padding: "11px 19px",
                borderRadius: 999,
                transition: "transform .2s, box-shadow .2s",
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 26px -10px var(--acc)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              {t.navCta}
            </a>

            {/* Mobile hamburger */}
            <button
              className="nav-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{
                display: "none",
                flexDirection: "column",
                gap: 5,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 8,
              }}
            >
              <span style={{ display: "block", width: 22, height: 2, background: "var(--dtext)", borderRadius: 2, transition: "transform 0.3s ease", transform: menuOpen ? "rotate(45deg) translate(5px, 6px)" : "none" }} />
              <span style={{ display: "block", width: 22, height: 2, background: "var(--dtext)", borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: "opacity 0.3s ease" }} />
              <span style={{ display: "block", width: 22, height: 2, background: "var(--dtext)", borderRadius: 2, transition: "transform 0.3s ease", transform: menuOpen ? "rotate(-45deg) translate(5px, -6px)" : "none" }} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "rgba(20,16,9,0.98)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.25rem",
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "var(--dtext)",
                textDecoration: "none",
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "var(--acc)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "1rem 2.5rem",
              borderRadius: 999,
              marginTop: "0.5rem",
              fontFamily: "'Heebo', var(--font-heebo), sans-serif",
            }}
          >
            {t.navCta}
          </a>
        </div>
      )}
    </>
  );
}

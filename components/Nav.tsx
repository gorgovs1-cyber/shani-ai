"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";

// Visually hidden, but still focusable and announced. Used for the screen-reader
// close button inside the mobile dialog (see comment at its usage).
const srOnly: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
};

export default function Nav() {
  const { lang, setLang } = useLang();
  const t = dict[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  // Sync document direction when language changes
  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  // The reduced-motion block in globals.css only neutralises *animations*, not
  // transitions — and every transition in this file is an inline style, so no
  // stylesheet rule can reach it. We therefore read the preference here and
  // switch the transitions off ourselves.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const tr = (value: string) => (reduceMotion ? "none" : value);

  // Hide nav on scroll-down, show on scroll-up — subscribe to Lenis events
  useEffect(() => {
    let unsub: (() => void) | null = null;

    const attach = (lenis: any) => {
      const onScroll = (l: any) => {
        // Lenis direction: 1 = scrolling UP, -1 = scrolling DOWN
        const { scroll, direction } = l;
        if (scroll < 80) setHidden(false);
        else if (direction === -1) setHidden(true);
        else if (direction === 1) setHidden(false);
      };
      lenis.on("scroll", onScroll);
      unsub = () => lenis.off("scroll", onScroll);
    };

    if ((window as any).__lenis) {
      attach((window as any).__lenis);
    } else {
      const onReady = (e: Event) => attach((e as CustomEvent).detail);
      window.addEventListener("lenis:ready", onReady);
      return () => {
        window.removeEventListener("lenis:ready", onReady);
        unsub?.();
      };
    }

    return () => { unsub?.(); };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  // While the mobile menu is open the capsule must stay on screen: the X that
  // closes the menu *is* the hamburger, so a hidden nav would leave the menu
  // with no visible way out.
  useEffect(() => {
    if (menuOpen) setHidden(false);
  }, [menuOpen]);

  // Mobile menu keyboard contract: Escape closes, Tab is trapped between the
  // hamburger (which renders above the overlay as the X) and the dialog's own
  // controls, focus lands inside on open and returns to the hamburger on close.
  // Background scrolling is frozen (Lenis keeps running otherwise, so the page
  // scrolls behind the overlay).
  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    if (!menu) return;

    const SELECTOR = 'a[href], button:not([disabled])';
    const focusables = () => {
      const list: HTMLElement[] = [];
      if (hamburgerRef.current) list.push(hamburgerRef.current);
      list.push(...Array.from(menu.querySelectorAll<HTMLElement>(SELECTOR)));
      return list;
    };
    const inTrap = (el: Element | null) =>
      !!el && (el === hamburgerRef.current || menu.contains(el));

    // First link, not the X — keyboard users should land on the menu content.
    menu.querySelector<HTMLElement>(SELECTOR)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !inTrap(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !inTrap(active))) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const lenis = (window as any).__lenis;
    lenis?.stop?.();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      lenis?.start?.();
      document.body.style.overflow = prevOverflow;
      // Only reclaim focus if the closing menu dropped it on <body>; never steal
      // it from wherever the user deliberately moved it.
      const active = document.activeElement;
      if (!active || active === document.body) hamburgerRef.current?.focus();
    };
  }, [menuOpen]);

  // On the homepage use in-page anchors (smooth scroll); on any other page
  // link back to the homepage section so nav works everywhere (e.g. /guides).
  const pathname = usePathname();
  const isHome = pathname === "/";
  const anchor = (hash: string) => (isHome ? hash : `/${hash}`);

  const navLinks = [
    { label: t.navWork,        href: "/work" },
    { label: t.navWebsites,    href: "/websites" },
    { label: t.navAutomations, href: "/automations" },
    { label: t.navConsulting,  href: "/ai-consulting" },
    { label: t.navPricing,     href: "/pricing" },
    { label: t.navGuides,      href: "/guides" },
  ];

  // Anchor links are not pages, so only route links can be "current".
  const isCurrent = (href: string) => !href.includes("#") && pathname === href;

  return (
    <>
      {/* Floating capsule — fixed, hides when scrolling down */}
      <div
        style={{
          position: "fixed",
          top: 18,
          // Logical inset so the capsule is anchored identically in RTL and LTR.
          insetInline: 0,
          // Above the mobile overlay while it is open, so the X stays visible
          // and tappable; back to the normal layer once it is closed.
          zIndex: menuOpen ? 10001 : 200,
          display: "flex",
          justifyContent: "center",
          // Respect a landscape notch / rounded display edge on both sides.
          paddingInline:
            "max(24px, env(safe-area-inset-left, 0px), env(safe-area-inset-right, 0px))",
          pointerEvents: "none",
          transform: hidden ? "translateY(calc(-100% - 28px))" : "translateY(0)",
          // UI-level transition (200–300ms) on transform only.
          transition: tr("transform 0.28s cubic-bezier(0.32,0,0.16,1)"),
        }}
      >
        <nav
          aria-label={t.navAriaMain}
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
            href={isHome ? "#top" : "/"}
            dir="ltr"
            style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none" }}
            aria-label={t.navAriaHome}
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
              <span className="nav-subtitle" style={{
                fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
                fontSize: 8.5,
                letterSpacing: ".26em",
                color: "var(--dmuted)",
              }}>
                SHANI AI CREATOR
              </span>
            </span>
          </a>

          {/* Center: Desktop nav links */}
          <div
            className="nav-desktop"
            style={{ display: "flex", alignItems: "center", gap: 20 }}
          >
            {navLinks.map((l) => {
              const current = isCurrent(l.href);
              // The current page keeps the brighter ink so it stays marked after
              // the pointer leaves — aria-current alone helps AT users only.
              const baseColor = current ? "var(--dtext)" : "var(--dmuted)";
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={current ? "page" : undefined}
                  style={{
                    color: baseColor,
                    textDecoration: "none",
                    fontSize: 14.5,
                    fontWeight: current ? 700 : 500,
                    // Hover feedback budget is 100–150ms. Colour is a paint-only
                    // property here (no layout/compositing cost) and is the only
                    // way to tint text, so it is animated deliberately.
                    transition: tr("color .12s ease"),
                    fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--dtext)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = baseColor)}
                  // Keyboard users get the same state change as hover, on top of
                  // the global :focus-visible outline.
                  onFocus={(e) => {
                    if (e.currentTarget.matches(":focus-visible")) e.currentTarget.style.color = "var(--dtext)";
                  }}
                  onBlur={(e) => (e.currentTarget.style.color = baseColor)}
                >
                  {l.label}
                </a>
              );
            })}
          </div>

          {/* Right: lang toggle + CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Language toggle */}
            <div
              className="nav-lang"
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
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={active}
                    // "EN" / "עב" is not a usable name on its own — spell out the action.
                    aria-label={l === "en" ? t.navAriaSwitchEn : t.navAriaSwitchHe}
                    style={{
                      border: "none",
                      cursor: "pointer",
                      padding: "7px 13px",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 700,
                      background: active ? "var(--acc)" : "transparent",
                      color: active ? "#fff" : "var(--dmuted)",
                      transition: tr("background .15s ease, color .15s ease"),
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
              href={anchor("#contact")}
              className="nav-cta"
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
                transition: tr("transform .14s ease, box-shadow .14s ease"),
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
              onFocus={(e) => {
                if (!e.currentTarget.matches(":focus-visible")) return;
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 12px 26px -10px var(--acc)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {t.navCta}
            </a>

          </div>

          {/* המבורגר: ילד ישיר של הכמוסה, כדי שב-RTL אפשר להעביר אותו לקצה הימני */}
          <button
            ref={hamburgerRef}
            type="button"
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t.navAriaMenuClose : t.navAriaMenuOpen}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            style={{
              display: "none",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              // The 22×2px bars gave a ~38×32 hit area; pad it out to the 44px
              // minimum touch target (IS 5568 / WCAG 2.5.5).
              minWidth: 44,
              minHeight: 44,
            }}
          >
            <span style={{ display: "block", width: 22, height: 2, background: "var(--dtext)", borderRadius: 2, transition: tr("transform 0.2s ease"), transform: menuOpen ? "rotate(45deg) translate(5px, 6px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 2, background: "var(--dtext)", borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: tr("opacity 0.2s ease") }} />
            <span style={{ display: "block", width: 22, height: 2, background: "var(--dtext)", borderRadius: 2, transition: tr("transform 0.2s ease"), transform: menuOpen ? "rotate(-45deg) translate(5px, -6px)" : "none" }} />
          </button>
        </nav>
      </div>

      {/* Spacer so content doesn't hide under fixed nav */}
      <div className="nav-spacer" aria-hidden="true" />

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.navAriaMobileMenu}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "rgba(20,16,9,0.98)",
            display: "flex",
            // Scrollable so the links stay reachable on short/landscape screens,
            // and padded out of the notch and the home-indicator strip.
            overflowY: "auto",
            boxSizing: "border-box",
            paddingTop: "max(24px, env(safe-area-inset-top, 0px))",
            paddingBottom: "max(24px, env(safe-area-inset-bottom, 0px))",
            paddingInline:
              "max(24px, env(safe-area-inset-left, 0px), env(safe-area-inset-right, 0px))",
          }}
        >
          {/* margin:auto centres the stack without the flex-centring overflow bug
              (content clipped above the scroll origin when it is taller than the screen). */}
          <div
            style={{
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2.25rem",
            }}
          >
            {navLinks.map((l) => {
              const current = isCurrent(l.href);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  aria-current={current ? "page" : undefined}
                  style={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "var(--dtext)",
                    textDecoration: current ? "underline" : "none",
                    textUnderlineOffset: "6px",
                    fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {l.label}
                </a>
              );
            })}

            {/* Language toggle — was missing from mobile menu entirely */}
            <div
              role="group"
              aria-label="Language / שפה"
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(244,237,225,0.07)",
                border: "1px solid var(--dline)",
                borderRadius: 999,
                padding: 4,
                fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
              }}
            >
              {(["en", "he"] as const).map((l) => {
                const active = lang === l;
                return (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={active}
                    aria-label={l === "en" ? t.navAriaSwitchEn : t.navAriaSwitchHe}
                    style={{
                      border: "none",
                      cursor: "pointer",
                      padding: "10px 22px",
                      borderRadius: 999,
                      // Was ~38px tall — below the 44px touch minimum.
                      minHeight: 44,
                      minWidth: 44,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 15,
                      fontWeight: 700,
                      background: active ? "var(--acc)" : "transparent",
                      color: active ? "#fff" : "var(--dmuted)",
                      transition: tr("background .15s ease, color .15s ease"),
                      fontFamily: "inherit",
                    }}
                  >
                    {l === "en" ? "EN" : "עב"}
                  </button>
                );
              })}
            </div>

            <a
              href={anchor("#contact")}
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

            {/* aria-modal="true" hides everything outside this dialog from screen
                readers — including the X, which lives in the capsule. This gives
                AT users a close control that is inside the dialog. */}
            <button type="button" onClick={closeMenu} style={srOnly}>
              {t.navAriaMenuClose}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

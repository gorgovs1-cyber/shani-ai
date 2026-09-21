"use client";

import { useState, useEffect, useRef } from "react";
import { useLang } from "@/components/LanguageProvider";

type Settings = {
  fontSize: 0 | 1 | 2;       // 0=רגיל 1=גדול 2=גדול מאוד
  highContrast: boolean;
  grayscale: boolean;
  underlineLinks: boolean;
  stopAnimations: boolean;
  largeCursor: boolean;
  letterSpacing: boolean;
  readingGuide: boolean;
};

const DEFAULT: Settings = {
  fontSize: 0,
  highContrast: false,
  grayscale: false,
  underlineLinks: false,
  stopAnimations: false,
  largeCursor: false,
  letterSpacing: false,
  readingGuide: false,
};

export default function AccessibilityWidget() {
  const { t, lang, dir } = useLang();
  const w = t.a11yWidget;
  const [open, setOpen] = useState(false);
  const [s, setS] = useState<Settings>(DEFAULT);
  const [guideY, setGuideY] = useState(200);
  const panelRef = useRef<HTMLDivElement>(null);

  // Apply classes to <html>
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("a11y-font-lg",  s.fontSize === 1);
    html.classList.toggle("a11y-font-xl",  s.fontSize === 2);
    html.classList.toggle("a11y-contrast",  s.highContrast);
    html.classList.toggle("a11y-gray",      s.grayscale);
    html.classList.toggle("a11y-links",     s.underlineLinks);
    html.classList.toggle("a11y-no-anim",   s.stopAnimations);
    html.classList.toggle("a11y-cursor",    s.largeCursor);
    html.classList.toggle("a11y-spacing",   s.letterSpacing);
  }, [s]);

  // Reading guide — follows mouse Y
  useEffect(() => {
    if (!s.readingGuide) return;
    const handler = (e: MouseEvent) => setGuideY(e.clientY);
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [s.readingGuide]);

  // Persist across session (localStorage OK in real project files)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("a11y-settings");
      if (saved) setS(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("a11y-settings", JSON.stringify(s)); } catch {}
  }, [s]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: Event) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    // iOS Safari only synthesizes mouse events over elements it considers
    // clickable, so tapping bare page background never closed the panel.
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  const toggle = (key: keyof Settings) =>
    setS(prev => ({ ...prev, [key]: !prev[key] }));

  const isActive = Object.values(s).some(v => v !== false && v !== 0);

  const resetAll = () => setS(DEFAULT);

  return (
    <>
      {/* Reading guide bar */}
      {s.readingGuide && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            left: 0, right: 0,
            top: guideY - 20,
            height: 40,
            background: "rgba(255,106,61,0.12)",
            borderTop: "1px solid rgba(255,106,61,0.3)",
            borderBottom: "1px solid rgba(255,106,61,0.3)",
            pointerEvents: "none",
            zIndex: 99990,
          }}
        />
      )}

      {/* No skip-link here on purpose — <SkipLink /> in app/layout.tsx already
          provides one, and two skip links means keyboard users tab past a
          duplicate before reaching the page. */}

      {/* Toggle button — bottom-right, opposite the WhatsApp button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={w.open}
        aria-expanded={open}
        aria-controls="a11y-panel"
        style={{
          position: "fixed",
          // Safe-area offset so the button does not sit under the iOS home
          // indicator. Resolves to plain 2rem on every device without a notch.
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 2rem)",
          right: "calc(env(safe-area-inset-right, 0px) + 1.25rem)",
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: isActive ? "var(--signal)" : "var(--graphite)",
          border: `2px solid ${isActive ? "var(--signal)" : "rgba(255,106,61,0.4)"}`,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "none",
          zIndex: 9991,
          boxShadow: isActive ? "0 0 20px rgba(255,106,61,0.5)" : "0 4px 20px rgba(0,0,0,0.4)",
          transition: "all 0.3s ease",
        }}
      >
        {/* Classic accessibility icon — person in circle */}
        <svg width="22" height="22" viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="6"/>
          <circle cx="50" cy="22" r="8" fill="currentColor"/>
          <line x1="50" y1="30" x2="50" y2="60" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
          <line x1="22" y1="44" x2="78" y2="44" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
          <line x1="50" y1="60" x2="32" y2="80" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
          <line x1="50" y1="60" x2="68" y2="80" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div
          id="a11y-panel"
          ref={panelRef}
          role="dialog"
          aria-label={w.panel}
          dir={dir}
          style={{
            position: "fixed",
            bottom: "calc(env(safe-area-inset-bottom, 0px) + 6rem)",
            right: "calc(env(safe-area-inset-right, 0px) + 1.25rem)",
            // Seven 44px toggles plus header and footer make this panel ~570px
            // tall. Bottom-anchored at 6rem that ran off the top of a 360x640
            // phone, so the last toggles and the statement link were
            // unreachable. Cap to the viewport and scroll inside instead.
            width: "min(272px, calc(100vw - 2.5rem))",
            maxHeight: "calc(100dvh - 8.5rem)",
            overflowY: "auto",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch" as any,
            background: "var(--ink-2)",
            border: "1px solid rgba(255,106,61,0.3)",
            borderRadius: 16,
            padding: "1.25rem",
            zIndex: 9992,
            boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,106,61,0.1)",
            animation: "a11y-slide 0.2s ease forwards",
          }}
        >
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: "1.25rem",
            paddingBottom: "0.75rem",
            borderBottom: "1px solid var(--border)",
          }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--cream)", letterSpacing: "0.05em" }}>
              {w.heading}
            </span>
            <button
              onClick={resetAll}
              style={{
                fontSize: "0.65rem", color: "var(--mist)", background: "none",
                border: "1px solid var(--border-2)", borderRadius: 4,
                padding: "0.2rem 0.55rem", cursor: "none",
                // Was ~19x40px — well under the 44px minimum on touch.
                minHeight: 44, minWidth: 44,
              }}
              aria-label={w.resetAria}
            >
              {w.reset}
            </button>
          </div>

          {/* Font size */}
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ fontSize: "0.7rem", color: "var(--mist)", marginBottom: "0.5rem", letterSpacing: "0.05em" }}>
              {w.fontSize}
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {w.sizes.map((label, i) => (
                <button
                  key={i}
                  onClick={() => setS(prev => ({ ...prev, fontSize: i as 0|1|2 }))}
                  aria-pressed={s.fontSize === i}
                  aria-label={`${w.fontSize}: ${label}`}
                  style={{
                    flex: 1,
                    padding: "0.4rem 0.3rem",
                    minHeight: 44, // was ~23px tall — under the 44px minimum
                    borderRadius: 8,
                    border: `1px solid ${s.fontSize === i ? "var(--signal)" : "var(--border-2)"}`,
                    background: s.fontSize === i ? "rgba(255,106,61,0.15)" : "transparent",
                    color: s.fontSize === i ? "var(--signal)" : "var(--mist)",
                    fontSize: `${0.62 + i * 0.07}rem`,
                    fontWeight: 600,
                    cursor: "none",
                    transition: "all 0.2s",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {([
              { key: "highContrast",   icon: "◑" },
              { key: "grayscale",      icon: "◐" },
              { key: "underlineLinks", icon: "U̲" },
              { key: "stopAnimations", icon: "⏸" },
              { key: "largeCursor",    icon: "⬆" },
              { key: "letterSpacing",  icon: "A A" },
              { key: "readingGuide",   icon: "≡" },
            ] as const).map(({ key, icon }) => {
              const label = w.toggles[key];
              const active = !!s[key as keyof Settings];
              return (
                <button
                  key={key}
                  onClick={() => toggle(key as keyof Settings)}
                  aria-pressed={active}
                  aria-label={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.55rem 0.75rem",
                    minHeight: 44, // was ~33px tall — under the 44px minimum
                    borderRadius: 8,
                    border: `1px solid ${active ? "rgba(255,106,61,0.4)" : "var(--border)"}`,
                    background: active ? "rgba(255,106,61,0.1)" : "transparent",
                    color: active ? "var(--cream)" : "var(--mist)",
                    fontSize: "0.78rem",
                    cursor: "none",
                    transition: "all 0.2s",
                    width: "100%",
                    textAlign: lang === "he" ? "right" : "left",
                  }}
                >
                  <div style={{
                    width: 22, height: 13,
                    borderRadius: 7,
                    background: active ? "var(--signal)" : "var(--border-2)",
                    position: "relative",
                    flexShrink: 0,
                    transition: "background 0.25s",
                  }}>
                    <div style={{
                      position: "absolute",
                      top: 1.5,
                      right: active ? 1.5 : undefined,
                      left: active ? undefined : 1.5,
                      width: 10, height: 10,
                      borderRadius: "50%",
                      background: "#fff",
                      transition: "all 0.25s",
                    }} />
                  </div>
                  <span>{label}</span>
                  <span style={{ fontSize: "0.75rem", opacity: 0.5, marginRight: "0.25rem" }}>{icon}</span>
                </button>
              );
            })}
          </div>

          {/* Accessibility statement link */}
          <div style={{
            marginTop: "1rem",
            paddingTop: "0.75rem",
            borderTop: "1px solid var(--border)",
            textAlign: "center",
          }}>
            <a
              href="/accessibility"
              style={{
                fontSize: "0.65rem",
                color: "var(--mist)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                // A bare 10px inline link is not a tappable target; the hit
                // area is padded out to 44px without changing the text size.
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 44,
                padding: "0 12px",
              }}
            >
              {w.statement}
            </a>
          </div>
        </div>
      )}

      {/* Styles moved to globals.css */}
    </>
  );
}

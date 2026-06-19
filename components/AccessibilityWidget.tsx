"use client";

import { useState, useEffect, useRef } from "react";

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
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
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
            background: "rgba(139,92,246,0.12)",
            borderTop: "1px solid rgba(139,92,246,0.3)",
            borderBottom: "1px solid rgba(139,92,246,0.3)",
            pointerEvents: "none",
            zIndex: 99990,
          }}
        />
      )}

      {/* Skip to content */}
      <a
        href="#main-content"
        style={{
          position: "fixed",
          top: -100,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#8B5CF6",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          borderRadius: 8,
          fontSize: "0.9rem",
          fontWeight: 700,
          zIndex: 999999,
          transition: "top 0.2s",
          textDecoration: "none",
        }}
        onFocus={e => { (e.currentTarget as HTMLElement).style.top = "1rem"; }}
        onBlur={e => { (e.currentTarget as HTMLElement).style.top = "-100px"; }}
      >
        דלג לתוכן הראשי
      </a>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="פתח תפריט נגישות"
        aria-expanded={open}
        aria-controls="a11y-panel"
        style={{
          position: "fixed",
          bottom: "6rem",
          left: "1.25rem",
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: isActive ? "#8B5CF6" : "#13131c",
          border: `2px solid ${isActive ? "#8B5CF6" : "rgba(139,92,246,0.4)"}`,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "none",
          zIndex: 9991,
          boxShadow: isActive ? "0 0 20px rgba(139,92,246,0.5)" : "0 4px 20px rgba(0,0,0,0.4)",
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
          aria-label="תפריט נגישות"
          dir="rtl"
          style={{
            position: "fixed",
            bottom: "10rem",
            left: "1.25rem",
            width: 272,
            background: "#0e0e14",
            border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: 16,
            padding: "1.25rem",
            zIndex: 9992,
            boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.1)",
            animation: "a11y-slide 0.2s ease forwards",
          }}
        >
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: "1.25rem",
            paddingBottom: "0.75rem",
            borderBottom: "1px solid #1e1e2e",
          }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#F4F4FF", letterSpacing: "0.05em" }}>
              הגדרות נגישות
            </span>
            <button
              onClick={resetAll}
              style={{
                fontSize: "0.65rem", color: "#8A8AA8", background: "none",
                border: "1px solid #2a2a3e", borderRadius: 4,
                padding: "0.2rem 0.55rem", cursor: "none",
              }}
              aria-label="אפס את כל הגדרות הנגישות"
            >
              איפוס
            </button>
          </div>

          {/* Font size */}
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ fontSize: "0.7rem", color: "#8A8AA8", marginBottom: "0.5rem", letterSpacing: "0.05em" }}>
              גודל טקסט
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {(["רגיל", "גדול", "גדול מאוד"] as const).map((label, i) => (
                <button
                  key={i}
                  onClick={() => setS(prev => ({ ...prev, fontSize: i as 0|1|2 }))}
                  aria-pressed={s.fontSize === i}
                  aria-label={`גודל טקסט ${label}`}
                  style={{
                    flex: 1,
                    padding: "0.4rem 0.3rem",
                    borderRadius: 8,
                    border: `1px solid ${s.fontSize === i ? "#8B5CF6" : "#2a2a3e"}`,
                    background: s.fontSize === i ? "rgba(139,92,246,0.15)" : "transparent",
                    color: s.fontSize === i ? "#8B5CF6" : "#8A8AA8",
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
            {[
              { key: "highContrast",   label: "ניגודיות גבוהה",     icon: "◑" },
              { key: "grayscale",      label: "גווני אפור",          icon: "◐" },
              { key: "underlineLinks", label: "הדגשת קישורים",       icon: "U̲" },
              { key: "stopAnimations", label: "עצור אנימציות",       icon: "⏸" },
              { key: "largeCursor",    label: "סמן גדול",            icon: "⬆" },
              { key: "letterSpacing",  label: "מרווח אותיות",        icon: "A A" },
              { key: "readingGuide",   label: "מדריך קריאה",         icon: "≡" },
            ].map(({ key, label, icon }) => {
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
                    borderRadius: 8,
                    border: `1px solid ${active ? "rgba(139,92,246,0.4)" : "#1e1e2e"}`,
                    background: active ? "rgba(139,92,246,0.1)" : "transparent",
                    color: active ? "#F4F4FF" : "#8A8AA8",
                    fontSize: "0.78rem",
                    cursor: "none",
                    transition: "all 0.2s",
                    width: "100%",
                    textAlign: "right",
                  }}
                >
                  <div style={{
                    width: 22, height: 13,
                    borderRadius: 7,
                    background: active ? "#8B5CF6" : "#2a2a3e",
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
            borderTop: "1px solid #1e1e2e",
            textAlign: "center",
          }}>
            <a
              href="/accessibility"
              style={{
                fontSize: "0.65rem",
                color: "#8A8AA8",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              הצהרת נגישות
            </a>
          </div>
        </div>
      )}

      {/* Styles moved to globals.css */}
    </>
  );
}

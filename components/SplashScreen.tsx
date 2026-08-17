"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "shani-splash-seen";

/**
 * Hebrew text inside the LTR terminal window.
 * dir="rtl" keeps the Hebrew itself correct while the line's ✓/▸ marker stays
 * on the left where a terminal expects it. Heebo is set explicitly because the
 * terminal's JetBrains Mono ships no Hebrew glyphs and would silently fall back
 * to an inconsistent system font.
 */
function He({ children }: { children: React.ReactNode }) {
  return (
    <span
      dir="rtl"
      style={{
        fontFamily: "'Heebo', var(--font-heebo), sans-serif",
        fontSize: "0.95em",
        unicodeBidi: "isolate",
      }}
    >
      {children}
    </span>
  );
}

/** The English gloss after the slash — dimmed so Hebrew stays the lead. */
function Gloss({ children }: { children: React.ReactNode }) {
  return (
    <span dir="ltr" style={{ color: "var(--dmuted, #b1a48f)", unicodeBidi: "isolate" }}>
      / {children}
    </span>
  );
}

export default function SplashScreen() {
  const [phase, setPhase] = useState<"show" | "fadeout" | "gone">("show");

  useEffect(() => {
    // Skip if already seen this session or if reduced motion
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = sessionStorage.getItem(SESSION_KEY);
    if (reduced || alreadySeen) {
      setPhase("gone");
      return;
    }

    // Auto-dismiss via CSS animation at 3.2s + .6s fade = 3.8s total
    const fadeTimer = setTimeout(() => {
      setPhase("fadeout");
    }, 3200);

    const goneTimer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setPhase("gone");
    }, 3800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(goneTimer);
    };
  }, []);

  function skip() {
    if (phase === "gone") return;
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
    setPhase("fadeout");
    setTimeout(() => setPhase("gone"), 600);
  }

  if (phase === "gone") return null;

  return (
    <div
      role="presentation"
      aria-hidden="true"
      onClick={skip}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0a0806",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        cursor: "pointer",
        opacity: phase === "fadeout" ? 0 : 1,
        visibility: phase === "fadeout" ? "hidden" : "visible",
        transition: "opacity 0.6s ease, visibility 0.6s ease",
        pointerEvents: phase === "fadeout" ? "none" : "all",
      }}
    >
      {/* Terminal window — always LTR */}
      <div
        dir="ltr"
        style={{
          position: "relative",
          width: "min(540px, 92vw)",
          background: "#100c08",
          border: "1px solid rgba(244,237,225,0.12)",
          borderRadius: 16,
          boxShadow: "0 50px 120px -40px rgba(0,0,0,.8)",
          overflow: "hidden",
        }}
      >
        {/* Title bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "13px 16px",
          borderBottom: "1px solid rgba(244,237,225,0.12)",
          background: "rgba(255,255,255,0.02)",
        }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
          <span style={{
            marginLeft: 10,
            fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
            fontSize: 11,
            color: "var(--dmuted, #b1a48f)",
            letterSpacing: ".04em",
          }}>
            shani@studio — zsh
          </span>
          {/* Spinning hexagon */}
          <svg
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden="true"
            style={{
              width: 22, height: 22,
              marginLeft: "auto",
              color: "var(--acc, #f2622e)",
              animation: "scl-spin 9s linear infinite",
            }}
          >
            <path d="M50 7 L87 28.5 L87 71.5 L50 93 L13 71.5 L13 28.5 Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
            <path d="M50 27 L70 39 L70 61 L50 73 L30 61 L30 39 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" opacity="0.5" />
            <circle cx="50" cy="50" r="7" fill="currentColor" />
          </svg>
        </div>

        {/* Terminal lines.
            Bilingual by design: the command is English, the results come back in
            Hebrew with an English gloss after a slash. That mirrors the product
            itself (AI that answers in real Hebrew) and serves both language
            versions of the site from one splash.
            Hebrew needs its own font — JetBrains Mono has no Hebrew glyphs — and
            its own dir, so the ✓/▸ markers stay on the left. See <He /> below. */}
        <div style={{ padding: "20px 22px 24px", fontFamily: "'JetBrains Mono', var(--font-mono), monospace", fontSize: 13.5, lineHeight: 2, color: "var(--dtext, #f4ede1)" }}>
          {/* Line 1 */}
          <div style={{ opacity: 0, animation: "scl-termline .25s ease .15s forwards" }}>
            <span style={{ color: "var(--acc, #f2622e)" }}>$</span> shani build --business
          </div>
          {/* Line 2 */}
          <div style={{ opacity: 0, animation: "scl-termline .25s ease .6s forwards", color: "var(--dmuted, #b1a48f)" }}>
            ▸ initializing…
          </div>
          {/* Line 3 */}
          <div style={{ opacity: 0, animation: "scl-termline .25s ease 1.05s forwards" }}>
            <span style={{ color: "#27c93f" }}>✓</span>{" "}
            <He>מיפוי תהליכים</He> <Gloss>process mapping</Gloss>
          </div>
          {/* Line 4 */}
          <div style={{ opacity: 0, animation: "scl-termline .25s ease 1.5s forwards" }}>
            <span style={{ color: "#27c93f" }}>✓</span>{" "}
            <He>אוטומציה מחוברת</He> <Gloss>automation connected</Gloss>
          </div>
          {/* Line 5 */}
          <div style={{ opacity: 0, animation: "scl-termline .25s ease 1.95s forwards" }}>
            <span style={{ color: "#27c93f" }}>✓</span>{" "}
            <He>אתר באוויר</He> <Gloss>site live</Gloss>
          </div>
          {/* Line 6 */}
          <div style={{ opacity: 0, animation: "scl-termline .25s ease 2.4s forwards" }}>
            <span style={{ color: "var(--acc, #f2622e)" }}>▸</span>{" "}
            ready{" "}
            <span style={{ color: "var(--acc, #f2622e)" }}>✦</span>
            <span style={{
              display: "inline-block",
              width: 9,
              height: 16,
              background: "var(--acc, #f2622e)",
              marginLeft: 6,
              verticalAlign: "-2px",
              animation: "scl-blink 1s steps(1) infinite",
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

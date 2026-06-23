"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";

/* ─── BOOT SCREEN ───
   Simulates the AI scanning a messy business and building a system.
   - Shows once per session (sessionStorage flag)
   - Skippable by click/tap at any moment
   - Respects prefers-reduced-motion (jumps straight to hero)
   - Fades smoothly into nav + hero on completion                       */

type Seg = { t: string; sig?: boolean };
const LINES: Seg[][] = [
  [{ t: "> " }, { t: "ANALYZING BUSINESS..." }],
  [
    { t: "> MAPPING MANUAL TASKS... " },
    { t: "[WHATSAPP]", sig: true }, { t: " " },
    { t: "[EXCEL]", sig: true }, { t: " " },
    { t: "[CALENDAR]", sig: true },
  ],
  [{ t: "> CALCULATING WASTED HOURS... " }, { t: "14/WEEK", sig: true }],
  [{ t: "> BUILDING AUTOMATION LAYER... " }, { t: "[OK]", sig: true }],
  [{ t: "> " }, { t: "SYSTEM READY", sig: true }],
];

// Flatten each line into per-character color flags for the typewriter.
const CHARS = LINES.map((segs) => {
  const arr: { ch: string; sig: boolean }[] = [];
  for (const s of segs) for (const ch of s.t) arr.push({ ch, sig: !!s.sig });
  return arr;
});

const CHAR_MS = 20;     // per-character typing speed
const LINE_PAUSE = 240; // pause between lines
const END_HOLD = 650;   // hold after last line before fade

export default function SplashScreen() {
  const { t } = useLang();
  const [phase, setPhase] = useState<"boot" | "fadeout" | "gone">("boot");
  const [line, setLine] = useState(0);
  const [count, setCount] = useState(0); // chars typed in current line
  const [reduced, setReduced] = useState(false);
  const skipped = useRef(false);

  // Plays on every full page load. It lives in the root layout, so it does NOT
  // replay on internal (SPA) navigation — no sessionStorage gate needed.
  // For reduced-motion users we still show the boot, but statically (all lines
  // revealed at once, no typewriter), then fade — so it's never a blank skip.
  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      setReduced(true);
      setLine(LINES.length);              // reveal all lines at once
      const end = setTimeout(() => finish(), 1300);
      return () => clearTimeout(end);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Typewriter driver (skipped for reduced-motion).
  useEffect(() => {
    if (phase !== "boot" || reduced) return;
    if (line >= LINES.length) {
      const end = setTimeout(() => finish(), END_HOLD);
      return () => clearTimeout(end);
    }
    if (count < CHARS[line].length) {
      const id = setTimeout(() => setCount((c) => c + 1), CHAR_MS);
      return () => clearTimeout(id);
    }
    // Line complete → advance after a pause.
    const id = setTimeout(() => { setLine((l) => l + 1); setCount(0); }, LINE_PAUSE);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, line, count, reduced]);

  function finish() {
    if (skipped.current) return;
    skipped.current = true;
    setPhase("fadeout");
    setTimeout(() => setPhase("gone"), 600);
  }

  if (phase === "gone") return null;

  return (
    <div
      onClick={finish}
      role="presentation"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "var(--ink)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(1.5rem, 6vw, 5rem)",
        cursor: "pointer",
        opacity: phase === "fadeout" ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: phase === "fadeout" ? "none" : "all",
        fontFamily: "var(--font-mono)",
      }}
    >
      {/* ambient signal glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 30% 40%, rgba(255,106,61,0.07), transparent 70%)",
      }} />

      {/* header label */}
      <div style={{
        fontSize: "0.7rem", letterSpacing: "0.25em",
        color: "var(--mist)", opacity: 0.6, marginBottom: "1.75rem",
      }}>
        SHANI_AI // BOOT SEQUENCE
      </div>

      {/* terminal lines */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", direction: "ltr", textAlign: "left" }}>
        {LINES.map((_, i) => {
          if (i > line) return null;
          const isActive = i === line;
          const chars = isActive ? CHARS[i].slice(0, count) : CHARS[i];
          return (
            <div key={i} style={{
              fontSize: "clamp(0.8rem, 2.2vw, 1.05rem)",
              lineHeight: 1.5,
              color: "var(--mist)",
              whiteSpace: "pre-wrap",
            }}>
              {chars.map((c, j) => (
                <span key={j} style={c.sig ? { color: "var(--signal)", fontWeight: 500 } : undefined}>
                  {c.ch}
                </span>
              ))}
              {isActive && <span className="boot-caret">|</span>}
            </div>
          );
        })}
      </div>

      {/* skip hint */}
      <div style={{
        position: "absolute",
        bottom: "clamp(1.5rem, 5vw, 3rem)",
        insetInlineStart: "clamp(1.5rem, 6vw, 5rem)",
        fontSize: "0.68rem",
        letterSpacing: "0.18em",
        color: "var(--mist)",
        opacity: 0.45,
      }}>
        {t.boot.skip} →
      </div>
    </div>
  );
}

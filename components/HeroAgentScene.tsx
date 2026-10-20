"use client";

import { useEffect, useRef } from "react";

const COPY = {
  he: {
    ask: "היי, יש תור פנוי מחר?",
    agent: "סוכן AI",
    reply: "כן! 10:00 או 14:30. לקבוע?",
    done: "נקבע · נשמר ב-CRM",
  },
  en: {
    ask: "Hi, any slot tomorrow?",
    agent: "AI agent",
    reply: "Yes! 10:00 or 14:30. Shall I book it?",
    done: "Booked · saved to CRM",
  },
} as const;

/**
 * Pure CSS 3D: the stage tilts toward the pointer and the chat layers sit at
 * different depths. No WebGL, no extra bundle. Tilt only runs on a fine
 * pointer without reduced motion; everywhere else the scene is static.
 */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ok = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!ok.matches) return;
    const zone = (el.closest("header") as HTMLElement) || el;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 1.2)));
        const y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 1.2)));
        el.style.setProperty("--ry", `${(x * 9).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
        el.style.setProperty("--mx", `${((x + 1) * 50).toFixed(1)}%`);
        el.style.setProperty("--my", `${((y + 1) * 50).toFixed(1)}%`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.removeProperty("--ry");
      el.style.removeProperty("--rx");
      el.style.removeProperty("--mx");
      el.style.removeProperty("--my");
    };
    el.classList.add("is-tilting");
    zone.addEventListener("pointermove", onMove, { passive: true });
    zone.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.classList.remove("is-tilting");
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return ref;
}

export default function HeroAgentScene({ lang }: { lang: "he" | "en" }) {
  const c = COPY[lang];
  return (
    <div className="agent-scene" aria-hidden="true">
      <div className="agent-bubble agent-ask">{c.ask}</div>
      <div className="agent-bubble agent-reply">
        <span className="agent-tag"><span className="agent-dot" />{c.agent}</span>
        {c.reply}
      </div>
      <div className="agent-done">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
        {c.done}
      </div>
    </div>
  );
}

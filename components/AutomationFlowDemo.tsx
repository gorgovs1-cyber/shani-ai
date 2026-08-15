"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";

const HEEBO = "'Heebo', var(--font-heebo), sans-serif";
const MONO = "'JetBrains Mono', var(--font-mono), monospace";

/**
 * הדגמה חיה של אוטומציה: פנייה נכנסת עוברת ארבע תחנות בלולאה.
 * CSS ו-JS בלבד, בלי ספריות. מכבד prefers-reduced-motion (מצב סטטי).
 * RTL מלא: הזרימה מימין לשמאל בעברית, משמאל לימין באנגלית.
 */

const MESSAGES_HE = ["אפשר מחיר לאירוע בשישי?", "יש תור פנוי השבוע?", "כמה עולה אצלכם?"];
const MESSAGES_EN = ["Do you have a slot this week?", "How much is an event on Friday?", "What are your prices?"];

const STEPS_HE = [
  { t: "פנייה נכנסת", d: "וואטסאפ, טופס או טלפון" },
  { t: "המערכת מסווגת", d: "מזהה מה מבקשים" },
  { t: "מענה ראשוני יוצא", d: "תוך שניות, בטון שלכם" },
  { t: "נשמר במקום אחד", d: "עם תזכורת מעקב" },
];
const STEPS_EN = [
  { t: "Enquiry arrives", d: "WhatsApp, form or phone" },
  { t: "The system classifies", d: "Understands the request" },
  { t: "First reply goes out", d: "In seconds, in your tone" },
  { t: "Saved in one place", d: "With a follow-up reminder" },
];

export default function AutomationFlowDemo() {
  const { lang } = useLang();
  const steps = lang === "he" ? STEPS_HE : STEPS_EN;
  const messages = lang === "he" ? MESSAGES_HE : MESSAGES_EN;
  const [active, setActive] = useState(-1);
  const [msgIdx, setMsgIdx] = useState(0);
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setActive(steps.length - 1);
      return;
    }
    setAnimate(true);
    const el = ref.current;
    if (!el) return;

    let timer: number | undefined;
    let running = false;

    const loop = (step: number) => {
      if (!running) return;
      if (step > steps.length - 1) {
        timer = window.setTimeout(() => {
          setActive(-1);
          setMsgIdx((m) => (m + 1) % messages.length);
          timer = window.setTimeout(() => loop(0), 700);
        }, 1600);
        return;
      }
      setActive(step);
      timer = window.setTimeout(() => loop(step + 1), 1050);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        loop(0);
      } else if (!entry.isIntersecting && running) {
        running = false;
        if (timer) window.clearTimeout(timer);
      }
    }, { threshold: 0.3 });
    io.observe(el);

    return () => {
      running = false;
      if (timer) window.clearTimeout(timer);
      io.disconnect();
    };
  }, [steps.length, messages.length]);

  const done = (i: number) => active >= i;

  return (
    <div
      ref={ref}
      style={{
        background: "var(--dark, #141009)",
        border: "1px solid rgba(244,237,225,0.12)",
        borderRadius: 22,
        padding: "clamp(22px,3.5vw,36px)",
        overflow: "hidden",
      }}
    >
      {/* Terminal-style header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ marginInlineStart: 10, fontFamily: MONO, fontSize: 12, color: "rgba(244,237,225,0.55)", letterSpacing: ".08em" }}>
          {lang === "he" ? "אוטומציה · רצה עכשיו" : "automation · running now"}
        </span>
        <span
          aria-hidden="true"
          style={{
            marginInlineStart: "auto",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--acc)",
            animation: animate ? "afd-pulse 1.2s ease-in-out infinite" : undefined,
          }}
        />
      </div>

      {/* Incoming message bubble */}
      <div
        key={msgIdx}
        style={{
          display: "inline-block",
          background: "rgba(244,237,225,0.08)",
          border: "1px solid rgba(244,237,225,0.14)",
          color: "rgba(244,237,225,0.92)",
          borderRadius: "16px 16px 16px 4px",
          padding: "10px 16px",
          fontSize: 14.5,
          fontFamily: HEEBO,
          marginBottom: 26,
          animation: animate ? "afd-bubble .4s cubic-bezier(.2,.7,.2,1) both" : undefined,
        }}
      >
        {messages[msgIdx]}
      </div>

      {/* Pipeline */}
      <div className="afd-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {steps.map((s, i) => (
          <div key={s.t} style={{ position: "relative" }}>
            <div
              style={{
                background: done(i) ? "color-mix(in oklch, var(--acc) 16%, transparent)" : "rgba(244,237,225,0.04)",
                border: `1px solid ${done(i) ? "color-mix(in oklch, var(--acc) 55%, transparent)" : "rgba(244,237,225,0.10)"}`,
                borderRadius: 14,
                padding: "14px 14px 12px",
                transition: "background .35s, border-color .35s, transform .35s",
                transform: active === i ? "translateY(-3px)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 800,
                    fontFamily: MONO,
                    background: done(i) ? "var(--acc)" : "rgba(244,237,225,0.12)",
                    color: done(i) ? "#fff" : "rgba(244,237,225,0.5)",
                    transition: "background .35s, color .35s",
                  }}
                >
                  {done(i) ? "✓" : i + 1}
                </span>
                <span style={{ fontWeight: 700, fontSize: 13.5, color: done(i) ? "#fff" : "rgba(244,237,225,0.75)", fontFamily: HEEBO, transition: "color .35s" }}>
                  {s.t}
                </span>
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.5, color: "rgba(244,237,225,0.55)", fontFamily: HEEBO }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress track */}
      <div style={{ marginTop: 18, height: 3, borderRadius: 2, background: "rgba(244,237,225,0.08)", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${((Math.min(active, steps.length - 1) + 1) / steps.length) * 100}%`,
            background: "var(--acc)",
            borderRadius: 2,
            transition: "width .5s cubic-bezier(.2,.7,.2,1)",
            float: lang === "he" ? "right" : "left",
          }}
        />
      </div>

      <style>{`
        @keyframes afd-pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: .35; transform: scale(.7); } }
        @keyframes afd-bubble { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @media (max-width: 720px) { .afd-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 420px) { .afd-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

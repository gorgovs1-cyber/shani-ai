"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";

// Formspree endpoint — every signup is emailed to shani.creates.ai@gmail.com
const FORM_ENDPOINT = "https://formspree.io/f/mnjkvblg";

export default function LeadMagnet() {
  const { lang } = useLang();
  const t = dict[lang];
  const lm = t.leadMagnet;
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || state === "loading") return;
    setState("loading");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <section
      id="lead-magnet"
      dir={t.dir}
      style={{ padding: "clamp(56px,9vw,110px) clamp(20px,5vw,72px)" }}
    >
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          background: "var(--dpanel, #15100a)",
          border: "1px solid color-mix(in oklch, var(--acc) 30%, var(--dline, #2a2018))",
          borderRadius: 24,
          padding: "clamp(28px,5vw,48px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* soft glow */}
        <div aria-hidden="true" style={{
          position: "absolute", top: -120, insetInlineEnd: -120, width: 280, height: 280,
          background: "radial-gradient(circle, color-mix(in oklch,var(--acc) 22%,transparent) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
          fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase",
          color: "var(--acc, #f2622e)", marginBottom: 14, position: "relative",
        }}>
          ✦ {lm.kicker}
        </div>

        <h2 style={{
          fontFamily: "'Heebo', var(--font-heebo), sans-serif",
          fontWeight: 900, color: "var(--dtext, #f4ede1)",
          fontSize: "clamp(24px, 4vw, 38px)", lineHeight: 1.2,
          margin: "0 0 14px", letterSpacing: "-0.02em", position: "relative",
        }}>{lm.title}</h2>

        <p style={{
          fontFamily: "'Heebo', var(--font-heebo), sans-serif",
          color: "var(--dmuted, #a09890)", fontSize: "clamp(14px,2vw,16px)",
          lineHeight: 1.7, maxWidth: 520, margin: "0 auto 28px", position: "relative",
        }}>{lm.sub}</p>

        {state === "done" ? (
          <div style={{
            fontFamily: "'Heebo', var(--font-heebo), sans-serif",
            color: "var(--acc, #f2622e)", fontWeight: 700,
            fontSize: "clamp(16px,2.5vw,20px)", padding: "18px 0", position: "relative",
          }}>{lm.success}</div>
        ) : (
          <form
            onSubmit={onSubmit}
            style={{
              display: "flex", flexWrap: "wrap", gap: 10,
              justifyContent: "center", maxWidth: 520, margin: "0 auto",
              position: "relative",
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={lm.placeholder}
              aria-label={lm.placeholder}
              style={{
                flex: "1 1 220px", minWidth: 0,
                padding: "15px 18px", borderRadius: 12,
                border: "1px solid var(--dline, #2a2018)",
                background: "rgba(255,255,255,0.04)",
                color: "var(--dtext, #f4ede1)",
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                fontSize: 16, outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={state === "loading"}
              style={{
                flex: "0 0 auto", padding: "15px 26px", borderRadius: 12,
                border: "none", cursor: "pointer",
                background: "var(--acc, #f2622e)", color: "#140f08",
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                fontWeight: 800, fontSize: 16,
                opacity: state === "loading" ? 0.6 : 1,
                transition: "transform .15s, opacity .2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; }}
            >
              {state === "loading" ? "…" : lm.button}
            </button>
          </form>
        )}

        {state === "error" && (
          <p style={{ color: "#e0735a", fontSize: 13, marginTop: 12, fontFamily: "'Heebo', sans-serif" }}>
            {lang === "he" ? "משהו השתבש — נסו שוב או שלחו לי הודעה." : "Something went wrong — try again or message me."}
          </p>
        )}

        <p style={{
          fontFamily: "'Heebo', var(--font-heebo), sans-serif",
          color: "var(--dmuted, #a09890)", fontSize: 12,
          marginTop: 16, opacity: 0.8, position: "relative",
        }}>{lm.privacy}</p>
      </div>
    </section>
  );
}

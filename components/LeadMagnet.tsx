"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";

// Formspree endpoint, every signup is emailed to shani.creates.ai@gmail.com
const FORM_ENDPOINT = "https://formspree.io/f/mnjkvblg";

/**
 * Marketing consent wording.
 *
 * ס' 30א לחוק התקשורת (בזק ושידורים) requires prior, explicit, opt-in consent
 * before any marketing email is sent — statutory damages reach ₪1,000 per
 * message with no proof of harm. The checkbox therefore starts UNCHECKED,
 * submission is blocked until it is ticked, and the exact wording the visitor
 * agreed to is sent along with the signup so the consent can be evidenced.
 *
 * Strings live here rather than in lib/translations.ts on purpose.
 */
const CONSENT_COPY = {
  he: {
    label:
      "אני מאשר/ת קבלת דיוור שיווקי במייל משני גורגוב — תוכן, טיפים והצעות. אפשר להסיר את ההרשמה בכל רגע.",
    policyPrefix: "הפרטים נשמרים לפי",
    policyLink: "מדיניות הפרטיות",
    required: "כדי לשלוח את הפרומפטים צריך לאשר קבלת דיוור.",
  },
  en: {
    label:
      "I agree to receive marketing emails from Shani Gorgov — content, tips and offers. You can unsubscribe at any time.",
    policyPrefix: "Your details are handled under the",
    policyLink: "Privacy Policy",
    required: "Please tick the consent box so I can send you the prompts.",
  },
} as const;

export default function LeadMagnet() {
  const { lang } = useLang();
  const t = dict[lang];
  const lm = t.leadMagnet;
  const cc = CONSENT_COPY[lang === "en" ? "en" : "he"];
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !consent || state === "loading") return;
    setState("loading");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email,
          // Evidence of consent, stored with the signup itself.
          marketing_consent: true,
          consent_text: CONSENT_COPY[lang === "en" ? "en" : "he"].label,
          consent_at: new Date().toISOString(),
          consent_source: "lead-magnet",
        }),
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
            dir={t.dir}
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
              disabled={state === "loading" || !consent}
              aria-describedby="lm-consent-label"
              style={{
                flex: "0 0 auto", padding: "15px 26px", borderRadius: 12,
                border: "none", minHeight: 44,
                cursor: state === "loading" || !consent ? "not-allowed" : "pointer",
                background: "var(--acc, #f2622e)", color: "#140f08",
                fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                fontWeight: 800, fontSize: 16,
                opacity: state === "loading" || !consent ? 0.55 : 1,
                transition: "transform .15s, opacity .2s",
              }}
              onMouseEnter={(e) => { if (consent && state !== "loading") (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; }}
            >
              {state === "loading" ? "…" : lm.button}
            </button>

            {/* Explicit, opt-in marketing consent — ס' 30א לחוק התקשורת */}
            <label
              htmlFor="lm-consent"
              style={{
                flexBasis: "100%",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                minHeight: 44,
                padding: "6px 2px",
                cursor: "pointer",
                textAlign: t.dir === "rtl" ? "right" : "left",
              }}
            >
              <input
                id="lm-consent"
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                style={{
                  width: 20,
                  height: 20,
                  marginTop: 2,
                  flexShrink: 0,
                  accentColor: "var(--acc, #f2622e)",
                  cursor: "pointer",
                }}
              />
              <span
                id="lm-consent-label"
                style={{
                  fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                  fontSize: 13.5,
                  lineHeight: 1.6,
                  color: "var(--dmuted, #a09890)",
                }}
              >
                {cc.label}{" "}
                {cc.policyPrefix}{" "}
                <a
                  href="/privacy"
                  onClick={(e) => e.stopPropagation()}
                  style={{ color: "var(--acc, #f2622e)", textDecoration: "underline", fontWeight: 700 }}
                >
                  {cc.policyLink}
                </a>
                .
              </span>
            </label>

            {!consent && (
              <p
                aria-hidden="true"
                style={{
                  flexBasis: "100%",
                  margin: 0,
                  fontFamily: "'Heebo', var(--font-heebo), sans-serif",
                  fontSize: 12.5,
                  lineHeight: 1.6,
                  color: "var(--dmuted, #a09890)",
                  opacity: 0.75,
                  textAlign: t.dir === "rtl" ? "right" : "left",
                }}
              >
                {cc.required}
              </p>
            )}
          </form>
        )}

        {state === "error" && (
          <p style={{ color: "#e0735a", fontSize: 13, marginTop: 12, fontFamily: "'Heebo', sans-serif" }}>
            {lang === "he" ? "משהו השתבש, נסו שוב או שלחו לי הודעה." : "Something went wrong, try again or message me."}
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

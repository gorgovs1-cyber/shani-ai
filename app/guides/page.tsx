"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import Footer from "@/components/Footer";
import { sortedGuides } from "@/lib/guides";

const HEEBO = "'Heebo', var(--font-heebo), sans-serif";
const MONO = "'JetBrains Mono', var(--font-mono), monospace";

// Same Formspree endpoint as the Lead Magnet, every email lands in shani.creates.ai@gmail.com
const FORM_ENDPOINT = "https://formspree.io/f/mnjkvblg";
const UNLOCK_KEY = "shani-guides-unlocked";

/**
 * Marketing consent wording — mirrors components/LeadMagnet.tsx.
 *
 * ס' 30א לחוק התקשורת (בזק ושידורים) requires prior, explicit, opt-in consent
 * before any marketing email is sent — statutory damages reach ₪1,000 per
 * message with no proof of harm. The checkbox therefore starts UNCHECKED,
 * submission is blocked until it is ticked, and the exact wording the visitor
 * agreed to is sent along with the signup so the consent can be evidenced.
 *
 * Note: the guides themselves are static files under /guides/<file> and unlock
 * client-side, so nothing is delivered by email. There is no transactional
 * message here — the address is collected for marketing only, which is exactly
 * why the consent has to be explicit rather than assumed.
 */
const CONSENT_COPY = {
  he: {
    label:
      "אני מאשר/ת קבלת דיוור שיווקי במייל משני גורגוב — תוכן, טיפים והצעות. אפשר להסיר את ההרשמה בכל רגע.",
    policyPrefix: "הפרטים נשמרים לפי",
    policyLink: "מדיניות הפרטיות",
    required: "כדי לפתוח את המדריכים צריך לאשר קבלת דיוור.",
  },
  en: {
    label:
      "I agree to receive marketing emails from Shani Gorgov — content, tips and offers. You can unsubscribe at any time.",
    policyPrefix: "Your details are handled under the",
    policyLink: "Privacy Policy",
    required: "Please tick the consent box so I can unlock the guides.",
  },
} as const;

type Copy = {
  kicker: string;
  title: string;
  intro: string;
  gateTitle: string;
  gateSub: string;
  placeholder: string;
  button: string;
  sending: string;
  privacy: string;
  unlocked: string;
  view: string;
  errorMsg: string;
};

const COPY: Record<"he" | "en", Copy> = {
  he: {
    kicker: "ספריית מדריכים",
    title: "מדריכים להורדה",
    intro:
      "כל מדריך שאני מעלה כפוסט נשמר כאן להורדה. השאירו מייל פעם אחת, ותקבלו גישה מיידית לכל המדריכים, גם לאלה שיתווספו בעתיד.",
    gateTitle: "גישה חינמית לכל המדריכים",
    gateSub: "הזינו את המייל וכל המדריכים ייפתחו מיד. נשלח לכם גם עדכון כשמתווסף מדריך חדש.",
    placeholder: "המייל שלכם",
    button: "פתחו לי את המדריכים",
    sending: "רגע…",
    privacy: "לא נשלח ספאם. אפשר להסיר את עצמכם בכל רגע.",
    unlocked: "הגישה נפתחה, כל המדריכים זמינים לצפייה ולהורדה.",
    view: "צפייה / הורדה",
    errorMsg: "משהו השתבש. נסו שוב או כתבו לי ב-WhatsApp.",
  },
  en: {
    kicker: "Guides library",
    title: "Downloadable guides",
    intro:
      "Every guide I publish as a post is saved here for download. Leave your email once, and get instant access to all guides, including ones added later.",
    gateTitle: "Free access to all guides",
    gateSub: "Enter your email and every guide unlocks instantly. I'll also let you know when a new one is added.",
    placeholder: "Your email",
    button: "Unlock the guides",
    sending: "One sec…",
    privacy: "No spam. Unsubscribe anytime.",
    unlocked: "Access unlocked, all guides are available to view and download.",
    view: "View / Download",
    errorMsg: "Something went wrong. Please try again or message me on WhatsApp.",
  },
};

export default function GuidesPage() {
  const { lang } = useLang();
  const c = COPY[lang];
  const cc = CONSENT_COPY[lang === "en" ? "en" : "he"];
  const dir = lang === "he" ? "rtl" : "ltr";

  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  useEffect(() => {
    try {
      if (localStorage.getItem(UNLOCK_KEY) === "1") setUnlocked(true);
    } catch {}
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !consent || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "guides-page",
          lang,
          // Evidence of consent, stored with the signup itself.
          marketing_consent: true,
          consent_text: CONSENT_COPY[lang === "en" ? "en" : "he"].label,
          consent_at: new Date().toISOString(),
          consent_source: "guides-page",
        }),
      });
      if (res.ok) {
        try { localStorage.setItem(UNLOCK_KEY, "1"); } catch {}
        setUnlocked(true);
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <main dir={dir} style={{ padding: "9rem clamp(20px,5vw,40px) 0", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: ".2em", color: "var(--acc)", marginBottom: 16 }}>
          {c.kicker}
        </div>
        <h1 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(34px,5vw,56px)", lineHeight: 1.04, letterSpacing: "-0.03em", color: "var(--ink)", fontFamily: HEEBO }}>
          {c.title}
        </h1>
        <p style={{ margin: "28px 0 0", color: "var(--ink)", fontSize: "clamp(17px,1.6vw,21px)", lineHeight: 1.7, maxWidth: "60ch", fontFamily: HEEBO }}>
          {c.intro}
        </p>

        {/* Email gate */}
        {!unlocked && (
          <div
            style={{
              marginTop: 40,
              background: "var(--card)",
              border: "1px solid var(--line)",
              borderRadius: 24,
              padding: "clamp(28px,4vw,44px)",
            }}
          >
            <h2 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(22px,2.6vw,30px)", color: "var(--ink)", fontFamily: HEEBO }}>
              {c.gateTitle}
            </h2>
            <p style={{ margin: "12px 0 0", color: "var(--muted2)", fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.6, fontFamily: HEEBO }}>
              {c.gateSub}
            </p>
            <form
              onSubmit={onSubmit}
              style={{ marginTop: 22, display: "flex", flexWrap: "wrap", gap: 12 }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={c.placeholder}
                aria-label={c.placeholder}
                style={{
                  flex: "1 1 240px",
                  minWidth: 0,
                  padding: "16px 18px",
                  borderRadius: 14,
                  border: "1px solid var(--line)",
                  background: "#fff",
                  color: "var(--ink)",
                  fontSize: 16,
                  fontFamily: HEEBO,
                }}
              />
              <button
                type="submit"
                disabled={status === "sending" || !consent}
                aria-describedby="guides-consent-label"
                style={{
                  flex: "0 0 auto",
                  background: "var(--acc)",
                  color: "#fff",
                  border: "none",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "16px 28px",
                  borderRadius: 14,
                  minHeight: 44,
                  cursor: status === "sending" || !consent ? "not-allowed" : "pointer",
                  opacity: status === "sending" || !consent ? 0.55 : 1,
                  transition: "opacity .2s",
                  fontFamily: HEEBO,
                  boxShadow: "0 16px 36px -16px var(--acc)",
                }}
              >
                {status === "sending" ? c.sending : c.button}
              </button>

              {/* Explicit, opt-in marketing consent — ס' 30א לחוק התקשורת */}
              <label
                htmlFor="guides-consent"
                style={{
                  flexBasis: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  minHeight: 44,
                  padding: "6px 2px",
                  cursor: "pointer",
                  textAlign: dir === "rtl" ? "right" : "left",
                }}
              >
                <input
                  id="guides-consent"
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = "2px solid var(--acc)";
                    e.currentTarget.style.outlineOffset = "3px";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = "";
                    e.currentTarget.style.outlineOffset = "";
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    marginTop: 3,
                    flexShrink: 0,
                    accentColor: "var(--acc)",
                    cursor: "pointer",
                  }}
                />
                <span
                  id="guides-consent-label"
                  style={{
                    fontFamily: HEEBO,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--muted2)",
                  }}
                >
                  {cc.label}{" "}
                  {cc.policyPrefix}{" "}
                  <a
                    href="/privacy"
                    onClick={(e) => e.stopPropagation()}
                    style={{ color: "var(--acc)", textDecoration: "underline", fontWeight: 700 }}
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
                    fontFamily: HEEBO,
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "var(--muted2)",
                    opacity: 0.75,
                    textAlign: dir === "rtl" ? "right" : "left",
                  }}
                >
                  {cc.required}
                </p>
              )}
            </form>
            {status === "error" && (
              <p style={{ margin: "12px 0 0", color: "#c0392b", fontSize: 14, fontFamily: HEEBO }}>{c.errorMsg}</p>
            )}
            <p style={{ margin: "14px 0 0", color: "var(--muted2)", fontSize: 13, fontFamily: MONO }}>{c.privacy}</p>
          </div>
        )}

        {unlocked && (
          <p style={{ marginTop: 36, color: "var(--acc)", fontWeight: 700, fontSize: 16, fontFamily: HEEBO }}>
            ✓ {c.unlocked}
          </p>
        )}

        {/* Guides list */}
        <div
          style={{
            marginTop: unlocked ? 22 : 40,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 18,
          }}
        >
          {sortedGuides.map((g) => {
            const title = lang === "he" ? g.title : g.titleEn;
            const desc = lang === "he" ? g.description : g.descriptionEn;
            const tag = lang === "he" ? g.tag : g.tagEn;
            return (
              <article
                key={g.slug}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: 20,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".18em", color: "var(--acc)", textTransform: "uppercase" }}>
                  {tag}
                </span>
                <h3 style={{ margin: 0, fontWeight: 800, fontSize: 19, lineHeight: 1.25, color: "var(--ink)", fontFamily: HEEBO }}>
                  {title}
                </h3>
                <p style={{ margin: 0, color: "var(--muted2)", fontSize: 14.5, lineHeight: 1.6, flex: 1, fontFamily: HEEBO }}>
                  {desc}
                </p>
                {unlocked ? (
                  <a
                    href={`/guides/${g.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginTop: 4,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      background: "var(--acc)",
                      color: "#fff",
                      textDecoration: "none",
                      fontWeight: 700,
                      fontSize: 15,
                      padding: "12px 18px",
                      borderRadius: 12,
                      fontFamily: HEEBO,
                    }}
                  >
                    {c.view} ↓
                  </a>
                ) : (
                  <span
                    aria-hidden="true"
                    style={{
                      marginTop: 4,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      background: "color-mix(in oklch, var(--ink) 8%, transparent)",
                      color: "var(--muted2)",
                      fontWeight: 700,
                      fontSize: 15,
                      padding: "12px 18px",
                      borderRadius: 12,
                      fontFamily: HEEBO,
                    }}
                  >
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
                      <rect x="1" y="6.5" width="12" height="8.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M3.8 6.5V4.6a3.2 3.2 0 0 1 6.4 0v1.9" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="7" cy="10.7" r="1.2" fill="currentColor" />
                    </svg>
                    {lang === "he" ? "נעול, השאירו מייל" : "Locked, leave your email"}
                  </span>
                )}
              </article>
            );
          })}
        </div>

        <div style={{ height: 80 }} />
      </main>
      <Footer />
    </>
  );
}

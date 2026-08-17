"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";

/**
 * Cookie consent — banner + shared state.
 *
 * Why this exists:
 *   GA4 (_ga, _ga_*) and Meta Pixel (_fbp) are third-party advertising /
 *   profiling trackers. Under the Israeli Privacy Protection Authority's
 *   opinion on "הסכמה" (final version 25.2.2026, following תיקון 13 which
 *   took effect 14.8.2025) they require active, prior opt-in — they may not
 *   fire on page load. AnalyticsScripts.tsx reads the state exposed here and
 *   renders nothing until the visitor actively accepts.
 *
 *   Vercel Analytics is deliberately NOT gated: it is cookieless and does not
 *   build a cross-site profile.
 *
 * Storage: a single localStorage key holding the choice plus a timestamp, so
 * the choice can be evidenced and re-asked when the version changes.
 *
 * All strings live inside this file on purpose (lib/translations.ts is owned
 * elsewhere and must not be touched).
 */

export const CONSENT_KEY = "shani-cookie-consent";
export const CONSENT_VERSION = 1;

export type ConsentChoice = "granted" | "denied";
export type ConsentRecord = {
  choice: ConsentChoice;
  /** ISO-8601, UTC — the moment the visitor made the choice */
  ts: string;
  version: number;
};

const CHANGE_EVENT = "shani-consent-change";
const OPEN_EVENT = "shani-consent-open";

/** Reads the stored choice. Returns null when nothing valid is stored yet. */
export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (parsed?.choice !== "granted" && parsed?.choice !== "denied") return null;
    if (parsed.version !== CONSENT_VERSION) return null;
    return { choice: parsed.choice, ts: String(parsed.ts ?? ""), version: CONSENT_VERSION };
  } catch {
    return null;
  }
}

/** Stores a choice and notifies every listener in the tab. */
export function writeConsent(choice: ConsentChoice): ConsentRecord {
  const record: ConsentRecord = {
    choice,
    ts: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
  } catch {
    /* private mode / storage full — the banner still hides for this pageview */
  }
  try {
    window.dispatchEvent(new CustomEvent<ConsentRecord>(CHANGE_EVENT, { detail: record }));
  } catch {
    /* no-op */
  }
  return record;
}

/** Re-opens the banner. Wired to the "הגדרות עוגיות" link in the footer. */
export function openCookieSettings() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new Event(OPEN_EVENT));
  } catch {
    /* no-op */
  }
}

/**
 * Subscribes to the consent state.
 * `ready` stays false until the first client read, so nothing is rendered
 * during SSR / hydration on the strength of a guessed default.
 */
export function useConsent(): { record: ConsentRecord | null; ready: boolean } {
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRecord(readConsent());
    setReady(true);

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<ConsentRecord>).detail;
      setRecord(detail ?? readConsent());
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY) setRecord(readConsent());
    };

    window.addEventListener(CHANGE_EVENT, onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(CHANGE_EVENT, onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return { record, ready };
}

const HEEBO = "'Heebo', var(--font-heebo), sans-serif";
const MONO = "'JetBrains Mono', var(--font-mono), monospace";

const COPY = {
  he: {
    label: "הגדרות עוגיות",
    kicker: "עוגיות",
    title: "רגע לפני שממשיכים",
    body:
      "האתר הזה מפעיל Google Analytics 4 ו-Meta Pixel כדי לדעת אילו עמודים עובדים ולמדוד פרסום. הכלים האלה שומרים עוגיות של צד שלישי (_ga, _fbp) ומעבירים מידע גם מחוץ לישראל. הם נטענים רק אם תאשרו. בלי אישור האתר עובד בדיוק אותו דבר, פשוט בלי מדידה.",
    accept: "אישור",
    reject: "דחייה",
    policy: "מדיניות הפרטיות",
    close: "סגירה",
    savedGranted: "אישרתם עוגיות מדידה ופרסום.",
    savedDenied: "דחיתם עוגיות מדידה ופרסום.",
  },
  en: {
    label: "Cookie settings",
    kicker: "Cookies",
    title: "One thing before you continue",
    body:
      "This site runs Google Analytics 4 and Meta Pixel to see which pages work and to measure advertising. These tools set third-party cookies (_ga, _fbp) and transfer data outside Israel. They load only if you accept. Without your consent the site works exactly the same, just without measurement.",
    accept: "Accept",
    reject: "Reject",
    policy: "Privacy Policy",
    close: "Close",
    savedGranted: "You accepted measurement and advertising cookies.",
    savedDenied: "You rejected measurement and advertising cookies.",
  },
} as const;

export default function CookieConsent() {
  const { lang } = useLang();
  const c = COPY[lang === "en" ? "en" : "he"];
  const dir = lang === "en" ? "ltr" : "rtl";

  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<ConsentRecord | null>(null);
  const reopened = useRef(false);
  const acceptRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const stored = readConsent();
    setCurrent(stored);
    setOpen(stored === null);
    setReady(true);

    const onOpen = () => {
      reopened.current = true;
      setCurrent(readConsent());
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  // Only move focus when the visitor asked for the panel from the footer.
  useEffect(() => {
    if (open && reopened.current) acceptRef.current?.focus();
  }, [open]);

  const choose = useCallback((choice: ConsentChoice) => {
    const rec = writeConsent(choice);
    setCurrent(rec);
    setOpen(false);
    reopened.current = false;
  }, []);

  if (!ready || !open) return null;

  const btnStyle: React.CSSProperties = {
    // Both buttons are visually identical on purpose: the regulator's opinion
    // treats a de-emphasised "reject" as a defect in the consent itself.
    flex: "1 1 150px",
    minHeight: 44,
    padding: "12px 22px",
    borderRadius: 12,
    border: "1.5px solid var(--acc)",
    background: "transparent",
    color: "var(--acc)",
    fontFamily: HEEBO,
    fontWeight: 800,
    fontSize: 16,
    lineHeight: 1.2,
    cursor: "pointer",
  };

  return (
    <>
      <style>{`
        .cc-wrap{
          position:fixed;
          z-index:99900;
          inset-inline:16px;
          /* padding, not inset, so it stays direction-agnostic between the
             Hebrew RTL default and English LTR. Keeps the card off a landscape
             notch. */
          padding-left:env(safe-area-inset-left, 0px);
          padding-right:env(safe-area-inset-right, 0px);
          /* clears the WhatsApp button (bottom-left) and the accessibility
             widget (bottom-right), both fixed at bottom:2rem, plus the iOS
             home-indicator strip */
          bottom:calc(env(safe-area-inset-bottom, 0px) + 2rem + 70px);
          display:flex;
          justify-content:center;
          pointer-events:none;
        }
        .cc-card{
          pointer-events:auto;
          width:100%;
          max-width:660px;
          background:var(--dpanel);
          border:1px solid color-mix(in oklch, var(--acc) 34%, var(--dline));
          border-radius:20px;
          padding:22px 22px 18px;
          box-shadow:0 18px 50px rgba(0,0,0,.42);
          /* The Hebrew body text is ~13 lines at 360px. Bottom-anchored, that
             put the top of the card off-screen on a 360x640 phone, hiding the
             heading and making the banner look broken. Cap it and scroll. */
          max-height:calc(100vh - 2rem - 70px - 24px);  /* pre-dvh fallback */
          max-height:calc(100dvh - 2rem - 70px - 24px);
          overflow-y:auto;
          overscroll-behavior:contain;
          -webkit-overflow-scrolling:touch;
        }
        @media (min-width:900px){
          .cc-wrap{ bottom:24px; inset-inline:120px; }
          .cc-card{ max-height:none; overflow-y:visible; }
        }
        .cc-btn:hover{ background:color-mix(in oklch, var(--acc) 16%, transparent); }
        .cc-btn:focus-visible,
        .cc-link:focus-visible{
          outline:3px solid var(--acc);
          outline-offset:3px;
          border-radius:6px;
        }
        @media (prefers-reduced-motion: no-preference){
          .cc-card{ animation:cc-in .28s ease-out both; }
          .cc-btn{ transition:background .18s ease, transform .18s ease; }
          .cc-btn:hover{ transform:translateY(-1px); }
        }
        @keyframes cc-in{
          from{ opacity:0; transform:translateY(14px); }
          to{ opacity:1; transform:none; }
        }
      `}</style>

      <div className="cc-wrap" dir={dir}>
        <div
          className="cc-card"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cc-title"
          aria-describedby="cc-body"
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: "var(--acc)",
              marginBottom: 8,
            }}
          >
            {c.kicker}
          </div>

          <h2
            id="cc-title"
            style={{
              margin: "0 0 8px",
              fontFamily: HEEBO,
              fontWeight: 900,
              fontSize: "clamp(18px,2.4vw,22px)",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              color: "var(--dtext)",
            }}
          >
            {c.title}
          </h2>

          <p
            id="cc-body"
            style={{
              margin: "0 0 16px",
              fontFamily: HEEBO,
              fontSize: 14.5,
              lineHeight: 1.7,
              color: "var(--dmuted)",
            }}
          >
            {c.body}{" "}
            <a
              className="cc-link"
              href="/privacy"
              style={{ color: "var(--acc)", textDecoration: "underline", fontWeight: 700 }}
            >
              {c.policy}
            </a>
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <button
              ref={acceptRef}
              type="button"
              className="cc-btn"
              style={btnStyle}
              onClick={() => choose("granted")}
            >
              {c.accept}
            </button>
            <button type="button" className="cc-btn" style={btnStyle} onClick={() => choose("denied")}>
              {c.reject}
            </button>
          </div>

          {current && (
            <p
              style={{
                margin: "12px 0 0",
                fontFamily: HEEBO,
                fontSize: 12.5,
                lineHeight: 1.6,
                color: "var(--dmuted)",
                opacity: 0.85,
              }}
            >
              {current.choice === "granted" ? c.savedGranted : c.savedDenied}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

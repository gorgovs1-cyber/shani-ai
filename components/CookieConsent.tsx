"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import Link from "next/link";

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
    title: "עוגיות באתר",
    body:
      "רק באישורכם נטענים Google Analytics ו-Meta Pixel למדידה ופרסום (עוגיות צד שלישי, מידע עובר מחוץ לישראל). אפשר לדחות ולהמשיך כרגיל.",
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
    title: "Cookies on this site",
    body:
      "Only with your consent do Google Analytics and Meta Pixel load for measurement and ads (third-party cookies, data leaves Israel). You can reject and carry on.",
    accept: "Accept",
    reject: "Reject",
    policy: "Privacy Policy",
    close: "Close",
    savedGranted: "You accepted measurement and advertising cookies.",
    savedDenied: "You rejected measurement and advertising cookies.",
  },
} as const;

export default function CookieConsent() {
  const { lang } = useLang(); const L = useLang().href;
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
    flex: "1 1 0",
    minWidth: 84,
    minHeight: 48,
    padding: "0 18px",
    borderRadius: 12,
    border: "1.5px solid var(--acc)",
    background: "transparent",
    color: "var(--acc)",
    fontFamily: HEEBO,
    fontWeight: 800,
    fontSize: 15,
    lineHeight: 1.2,
    cursor: "pointer",
  };

  return (
    <>
      <style>{`
        /* A slim bar on the bottom edge. The start side is left free for the
           floating WhatsApp button (2rem inset + 56px). */
        .cc-wrap{
          position:fixed;
          z-index:99900;
          inset-inline:0;
          bottom:0;
          pointer-events:none;
        }
        .cc-card{
          pointer-events:auto;
          display:flex;
          flex-wrap:wrap;
          align-items:center;
          gap:8px 14px;
          background:var(--dpanel);
          --acc:var(--acc-bright);
          border-top:1px solid color-mix(in oklch, var(--acc) 34%, var(--dline));
          padding:10px 14px calc(env(safe-area-inset-bottom, 0px) + 10px);
          padding-inline-start:calc(env(safe-area-inset-left, 0px) + 2rem + 64px);
          box-shadow:0 -12px 30px rgba(0,0,0,.32);
          max-height:45vh;
          overflow-y:auto;
        }
        body:has(.cc-wrap) .floating-whatsapp{ z-index:99950 !important; }
        .cc-text{ flex:1 1 280px; min-width:0; }
        .cc-actions{ display:flex; gap:8px; flex:0 0 auto; }
        @media (max-width:560px){
          .cc-actions{ flex:1 1 100%; }
        }
        /* Under 900px the WhatsApp button is pinned to the physical right in both languages. */
        @media (max-width:900px){
          .cc-card{ padding-left:calc(env(safe-area-inset-left, 0px) + 14px); padding-right:calc(env(safe-area-inset-right, 0px) + 84px); }
        }
        .cc-btn:hover{ background:color-mix(in oklch, var(--acc) 16%, transparent); }
        .cc-btn:focus-visible,
        .cc-link:focus-visible{
          outline:3px solid var(--acc);
          outline-offset:3px;
          border-radius:6px;
        }
        @media (prefers-reduced-motion: no-preference){
          .cc-card{ animation:cc-in var(--t-base) ease-out both; }
          .cc-btn{ transition:background var(--t-fast) ease, transform var(--t-fast) ease; }
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
          <div className="cc-text">
            <h2
              id="cc-title"
              style={{
                display: "inline",
                margin: 0,
                fontFamily: HEEBO,
                fontWeight: 800,
                fontSize: 13,
                color: "var(--dtext)",
              }}
            >
              {c.title}:{" "}
            </h2>
            <p
              id="cc-body"
              style={{
                display: "inline",
                margin: 0,
                fontFamily: HEEBO,
                fontSize: 13,
                lineHeight: 1.5,
                color: "var(--dmuted)",
              }}
            >
              {c.body}{" "}
              <Link
                className="cc-link"
                href={L("/privacy")}
                style={{ color: "var(--acc)", textDecoration: "underline", fontWeight: 700 }}
              >
                {c.policy}
              </Link>
            </p>
            {current && (
              <p style={{ margin: "4px 0 0", fontFamily: HEEBO, fontSize: 13, color: "var(--dmuted)", opacity: 0.85 }}>
                {current.choice === "granted" ? c.savedGranted : c.savedDenied}
              </p>
            )}
          </div>

          <div className="cc-actions">
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
        </div>
      </div>
    </>
  );
}

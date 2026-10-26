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
 * Two separate choices, both off by default:
 *   - statistics (`choice`)  → Google Analytics 4 only
 *   - marketing  (`marketing`) → Meta Pixel only, and the Consent Mode v2
 *     advertising signals (ad_storage / ad_user_data / ad_personalization)
 * Records saved before the split have no `marketing` field and are read as
 * marketing = false, so nobody is carried over into Meta Pixel by an old choice.
 *
 * Storage: a single localStorage key holding the choices plus a timestamp, so
 * the choice can be evidenced and re-asked when the version changes.
 *
 * All strings live inside this file on purpose (lib/translations.ts is owned
 * elsewhere and must not be touched).
 */

export const CONSENT_KEY = "shani-cookie-consent";
export const CONSENT_VERSION = 1;

export type ConsentChoice = "granted" | "denied";
export type ConsentRecord = {
  /** Statistics (Google Analytics 4). Name kept for compatibility with older records and scripts. */
  choice: ConsentChoice;
  /** Marketing (Meta Pixel + Google advertising signals). Missing in older records = false. */
  marketing: boolean;
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
    return {
      choice: parsed.choice,
      marketing: parsed.marketing === true,
      ts: String(parsed.ts ?? ""),
      version: CONSENT_VERSION,
    };
  } catch {
    return null;
  }
}

/** Stores a choice and notifies every listener in the tab. */
export function writeConsent(stats: boolean, marketing: boolean): ConsentRecord {
  const record: ConsentRecord = {
    choice: stats ? "granted" : "denied",
    marketing,
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
      "רק באישורכם נטענים כלים של צד שלישי (מידע עובר מחוץ לישראל). אפשר לבחור כל אחד בנפרד, ואפשר לדחות הכול ולהמשיך כרגיל.",
    groupLabel: "בחירת סוגי עוגיות",
    stats: "סטטיסטיקה: Google Analytics, מדידת שימוש באתר",
    marketing: "שיווק: Meta Pixel, מדידת פרסום בפייסבוק ובאינסטגרם",
    acceptAll: "אישור הכול",
    rejectAll: "דחיית הכול",
    save: "שמירת הבחירה",
    policy: "מדיניות הפרטיות",
    close: "סגירה",
    yes: "מאושר",
    no: "לא מאושר",
    saved: (st: boolean, mk: boolean) =>
      `הבחירה השמורה: סטטיסטיקה ${st ? "מאושרת" : "לא מאושרת"}, שיווק ${mk ? "מאושר" : "לא מאושר"}.`,
  },
  en: {
    label: "Cookie settings",
    kicker: "Cookies",
    title: "Cookies on this site",
    body:
      "Third-party tools load only with your consent (data leaves Israel). You can choose each one separately, or reject everything and carry on.",
    groupLabel: "Choose cookie types",
    stats: "Statistics: Google Analytics, measuring site usage",
    marketing: "Marketing: Meta Pixel, measuring ads on Facebook and Instagram",
    acceptAll: "Accept all",
    rejectAll: "Reject all",
    save: "Save my choice",
    policy: "Privacy Policy",
    close: "Close",
    yes: "On",
    no: "Off",
    saved: (st: boolean, mk: boolean) =>
      `Saved choice: statistics ${st ? "on" : "off"}, marketing ${mk ? "on" : "off"}.`,
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
  // Both boxes start unticked (no pre-selection); re-opening shows the saved choice.
  const [statsOn, setStatsOn] = useState(false);
  const [marketingOn, setMarketingOn] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    setCurrent(stored);
    setOpen(stored === null);
    setReady(true);

    const onOpen = () => {
      reopened.current = true;
      const stored = readConsent();
      setCurrent(stored);
      setStatsOn(stored?.choice === "granted");
      setMarketingOn(stored?.marketing === true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  // Only move focus when the visitor asked for the panel from the footer.
  useEffect(() => {
    if (open && reopened.current) acceptRef.current?.focus();
  }, [open]);

  const choose = useCallback((stats: boolean, marketing: boolean) => {
    const rec = writeConsent(stats, marketing);
    setStatsOn(stats);
    setMarketingOn(marketing);
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
        .cc-opts{ display:flex; flex-wrap:wrap; gap:0 18px; margin:4px 0 0; padding:0; border:0; min-width:0; }
        .cc-opt{ display:inline-flex; align-items:center; gap:8px; min-height:44px; cursor:pointer; font-family:${HEEBO}; font-size:13px; line-height:1.4; color:var(--dtext); }
        .cc-opt input{ width:20px; height:20px; margin:0; flex:0 0 auto; accent-color:var(--acc); cursor:pointer; }
        .cc-opt input:focus-visible{ outline:3px solid var(--acc); outline-offset:3px; }
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
            <fieldset className="cc-opts">
              <legend style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
                {c.groupLabel}
              </legend>
              <label className="cc-opt">
                <input type="checkbox" checked={statsOn} onChange={(e) => setStatsOn(e.target.checked)} />
                <span>{c.stats}</span>
              </label>
              <label className="cc-opt">
                <input type="checkbox" checked={marketingOn} onChange={(e) => setMarketingOn(e.target.checked)} />
                <span>{c.marketing}</span>
              </label>
            </fieldset>
            {current && (
              <p style={{ margin: "4px 0 0", fontFamily: HEEBO, fontSize: 13, color: "var(--dmuted)", opacity: 0.85 }}>
                {c.saved(current.choice === "granted", current.marketing === true)}
              </p>
            )}
          </div>

          <div className="cc-actions">
            <button
              ref={acceptRef}
              type="button"
              className="cc-btn"
              style={btnStyle}
              onClick={() => choose(true, true)}
            >
              {c.acceptAll}
            </button>
            <button type="button" className="cc-btn" style={btnStyle} onClick={() => choose(false, false)}>
              {c.rejectAll}
            </button>
            <button type="button" className="cc-btn" style={btnStyle} onClick={() => choose(statsOn, marketingOn)}>
              {c.save}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

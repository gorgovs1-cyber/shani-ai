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
 * First layer (banner): one sentence, "accept" and "essential only" — two
 * identical buttons, no toggles. Detailed layer (dialog, opened from the footer
 * link): two separate choices, both off by default:
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

/** Opens the cookie settings dialog (two separate toggles). Wired to the "הגדרות עוגיות" link in the footer. */
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

const COPY = {
  he: {
    label: "הגדרות עוגיות",
    bannerLabel: "הודעת עוגיות",
    banner: "עוגיות סטטיסטיקה ושיווק של צד שלישי נטענות רק באישורכם.",
    accept: "אישור",
    essential: "רק הכרחיות",
    policy: "מדיניות פרטיות",
    title: "הגדרות עוגיות",
    intro:
      "כלים של צד שלישי נטענים רק באישורכם (מידע עובר מחוץ לישראל). אפשר לבחור כל אחד בנפרד, והאתר פועל במלואו גם בלי אישור.",
    groupLabel: "סוגי עוגיות",
    statsTitle: "סטטיסטיקה",
    statsDesc: "Google Analytics בלבד, מדידת שימוש באתר.",
    marketingTitle: "שיווק",
    marketingDesc: "Meta Pixel ואותות פרסום של Google, מדידת פרסום בפייסבוק ובאינסטגרם.",
    save: "שמירת הבחירה",
    close: "סגירה",
    saved: (st: boolean, mk: boolean) =>
      `הבחירה השמורה: סטטיסטיקה ${st ? "מאושרת" : "לא מאושרת"}, שיווק ${mk ? "מאושר" : "לא מאושר"}.`,
  },
  en: {
    label: "Cookie settings",
    bannerLabel: "Cookie notice",
    banner: "Third-party statistics and marketing cookies load only with your consent.",
    accept: "Accept",
    essential: "Essential only",
    policy: "Privacy Policy",
    title: "Cookie settings",
    intro:
      "Third-party tools load only with your consent (data leaves Israel). You can choose each one separately, and the site works fully without them.",
    groupLabel: "Cookie types",
    statsTitle: "Statistics",
    statsDesc: "Google Analytics only, measuring site usage.",
    marketingTitle: "Marketing",
    marketingDesc: "Meta Pixel and Google advertising signals, measuring ads on Facebook and Instagram.",
    save: "Save my choice",
    close: "Close",
    saved: (st: boolean, mk: boolean) =>
      `Saved choice: statistics ${st ? "on" : "off"}, marketing ${mk ? "on" : "off"}.`,
  },
} as const;

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function CookieConsent() {
  const { lang } = useLang(); const L = useLang().href;
  const c = COPY[lang === "en" ? "en" : "he"];
  const dir = lang === "en" ? "ltr" : "rtl";

  const [ready, setReady] = useState(false);
  const [stored, setStored] = useState<ConsentRecord | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  // Both toggles start off (no pre-selection); re-opening shows the saved choice.
  const [statsOn, setStatsOn] = useState(false);
  const [marketingOn, setMarketingOn] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setStored(readConsent());
    setReady(true);
    const onOpen = () => {
      const rec = readConsent();
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setStored(rec);
      setStatsOn(rec?.choice === "granted");
      setMarketingOn(rec?.marketing === true);
      setSettingsOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const showBanner = ready && stored === null && !settingsOpen;

  // Publish the banner height so the floating WhatsApp button can sit above it.
  useEffect(() => {
    const root = document.documentElement;
    const el = cardRef.current;
    if (!showBanner || !el) {
      root.style.removeProperty("--cc-h");
      return;
    }
    const set = () => root.style.setProperty("--cc-h", `${Math.ceil(el.getBoundingClientRect().height)}px`);
    set();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(set) : null;
    ro?.observe(el);
    return () => {
      ro?.disconnect();
      root.style.removeProperty("--cc-h");
    };
  }, [showBanner]);

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
    const el = opener.current;
    opener.current = null;
    if (el && document.contains(el)) setTimeout(() => el.focus(), 0);
  }, []);

  // Modal dialog: move focus in, trap Tab, close on Escape.
  useEffect(() => {
    if (!settingsOpen) return;
    const d = dialogRef.current;
    d?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeSettings();
        return;
      }
      if (e.key !== "Tab" || !d) return;
      const items = Array.from(d.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === d)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [settingsOpen, closeSettings]);

  const choose = useCallback((stats: boolean, marketing: boolean) => {
    const rec = writeConsent(stats, marketing);
    setStatsOn(stats);
    setMarketingOn(marketing);
    setStored(rec);
    setSettingsOpen(false);
    const el = opener.current;
    opener.current = null;
    if (el && document.contains(el)) setTimeout(() => el.focus(), 0);
  }, []);

  if (!ready || (!showBanner && !settingsOpen)) return null;

  return (
    <>
      <style>{`
        .cc-wrap{
          position:fixed; z-index:99900;
          inset-inline:0; bottom:0;
          padding:0 max(10px, env(safe-area-inset-left,0px)) calc(env(safe-area-inset-bottom,0px) + 10px);
          pointer-events:none;
          --acc:var(--acc-bright);
          font-family:${HEEBO};
        }
        .cc-card{
          pointer-events:auto;
          max-width:720px; margin:0 auto;
          display:flex; flex-wrap:wrap; align-items:center; gap:10px 16px;
          background:var(--dpanel);
          border:1px solid color-mix(in oklch, var(--acc) 34%, var(--dline));
          border-radius:16px;
          padding:12px 14px;
          box-shadow:0 10px 30px rgba(0,0,0,.35);
        }
        .cc-text{ flex:1 1 280px; min-width:0; margin:0; font-size:13px; line-height:1.5; color:var(--dtext); }
        .cc-link{ color:var(--acc); text-decoration:underline; font-weight:700; white-space:nowrap; }
        .cc-actions{ display:flex; gap:8px; flex:0 0 auto; }
        @media (max-width:560px){ .cc-actions{ flex:1 1 100%; } }
        .cc-btn{
          /* Both choices share one style: a de-emphasised "reject" is a defect in the consent itself. */
          flex:1 1 0; min-width:96px; min-height:44px; padding:0 16px;
          border-radius:12px; border:1.5px solid var(--acc); background:transparent; color:var(--acc);
          font-family:${HEEBO}; font-weight:800; font-size:15px; line-height:1.2; cursor:pointer;
        }
        .cc-btn:hover{ background:color-mix(in oklch, var(--acc) 16%, transparent); }
        .cc-btn:focus-visible,.cc-link:focus-visible,.cc-opt input:focus-visible,.cc-x:focus-visible{ outline:3px solid var(--acc); outline-offset:3px; border-radius:6px; }
        /* WhatsApp sits just above the banner while it is shown. */
        body:has(.cc-wrap.cc-banner) .floating-whatsapp{ bottom:calc(env(safe-area-inset-bottom,0px) + var(--cc-h,0px) + 18px) !important; }

        .cc-overlay{ position:fixed; inset:0; z-index:99950; background:rgba(10,7,4,.62); display:flex; align-items:center; justify-content:center; padding:16px; font-family:${HEEBO}; --acc:var(--acc-bright); }
        .cc-dialog{ position:relative; width:100%; max-width:440px; max-height:calc(100dvh - 32px); overflow-y:auto; background:var(--dpanel); color:var(--dtext); border:1px solid color-mix(in oklch, var(--acc) 34%, var(--dline)); border-radius:18px; padding:20px 18px 18px; box-shadow:0 20px 60px rgba(0,0,0,.5); outline:none; }
        .cc-dialog h2{ margin:0 0 6px; font-size:19px; font-weight:800; padding-inline-end:40px; }
        .cc-dialog p{ margin:0; font-size:14px; line-height:1.55; color:var(--dmuted); }
        .cc-x{ position:absolute; top:10px; inset-inline-end:10px; width:44px; height:44px; display:grid; place-items:center; border:0; background:transparent; color:var(--dtext); font-size:24px; line-height:1; cursor:pointer; border-radius:10px; }
        .cc-opts{ margin:14px 0 4px; padding:0; border:0; min-width:0; display:grid; gap:8px; }
        .cc-opt{ display:flex; align-items:flex-start; gap:12px; padding:12px; border:1px solid var(--dline); border-radius:12px; cursor:pointer; }
        .cc-opt input{ width:22px; height:22px; margin:2px 0 0; flex:0 0 auto; accent-color:var(--acc); cursor:pointer; }
        .cc-opt b{ display:block; font-size:15px; font-weight:800; color:var(--dtext); }
        .cc-opt span span{ display:block; font-size:13px; line-height:1.45; color:var(--dmuted); margin-top:2px; }
        .cc-saved{ margin-top:10px !important; font-size:13px !important; }
        .cc-dialog .cc-actions{ margin-top:14px; }
        @media (prefers-reduced-motion: no-preference){
          .cc-card{ animation:cc-in var(--t-base) ease-out both; }
          .cc-btn{ transition:background var(--t-fast) ease; }
        }
        @keyframes cc-in{ from{ opacity:0; transform:translateY(14px); } to{ opacity:1; transform:none; } }
      `}</style>

      {showBanner && (
        <div className="cc-wrap cc-banner" dir={dir}>
          <div ref={cardRef} className="cc-card" role="dialog" aria-modal="false" aria-label={c.bannerLabel}>
            <p className="cc-text">
              {c.banner}{" "}
              <Link className="cc-link" href={L("/privacy")}>
                {c.policy}
              </Link>
            </p>
            <div className="cc-actions">
              <button type="button" className="cc-btn" onClick={() => choose(true, true)}>
                {c.accept}
              </button>
              <button type="button" className="cc-btn" onClick={() => choose(false, false)}>
                {c.essential}
              </button>
            </div>
          </div>
        </div>
      )}

      {settingsOpen && (
        <div className="cc-overlay" dir={dir} onMouseDown={(e) => { if (e.target === e.currentTarget) closeSettings(); }}>
          <div
            ref={dialogRef}
            className="cc-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cc-title"
            aria-describedby="cc-intro"
            tabIndex={-1}
          >
            <button type="button" className="cc-x" onClick={closeSettings} aria-label={c.close}>
              <span aria-hidden="true">×</span>
            </button>
            <h2 id="cc-title">{c.title}</h2>
            <p id="cc-intro">
              {c.intro}{" "}
              <Link className="cc-link" href={L("/privacy")} onClick={() => setSettingsOpen(false)}>
                {c.policy}
              </Link>
            </p>
            <fieldset className="cc-opts">
              <legend style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
                {c.groupLabel}
              </legend>
              <label className="cc-opt">
                <input type="checkbox" checked={statsOn} onChange={(e) => setStatsOn(e.target.checked)} />
                <span>
                  <b>{c.statsTitle}</b>
                  <span>{c.statsDesc}</span>
                </span>
              </label>
              <label className="cc-opt">
                <input type="checkbox" checked={marketingOn} onChange={(e) => setMarketingOn(e.target.checked)} />
                <span>
                  <b>{c.marketingTitle}</b>
                  <span>{c.marketingDesc}</span>
                </span>
              </label>
            </fieldset>
            {stored && <p className="cc-saved">{c.saved(stored.choice === "granted", stored.marketing === true)}</p>}
            <div className="cc-actions">
              <button type="button" className="cc-btn" onClick={() => choose(statsOn, marketingOn)}>
                {c.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect } from "react";
import Script from "next/script";
import { readConsent, useConsent } from "@/components/CookieConsent";

/**
 * GA4 + Meta Pixel base tags — consent gated.
 *
 * Nothing here loads until the visitor actively accepts in the cookie banner
 * (components/CookieConsent.tsx). GA4 sets _ga / _ga_* and Meta Pixel sets
 * _fbp; both are third-party trackers, which under the Privacy Protection
 * Authority's opinion on "הסכמה" (25.2.2026, following תיקון 13) require prior
 * opt-in. The visitor makes two SEPARATE choices, both off by default:
 *   statistics → GA4 only (analytics_storage)
 *   marketing  → Meta Pixel only (+ ad_storage / ad_user_data / ad_personalization)
 *
 * Google Consent Mode v2 defaults to denied and is only updated to granted
 * per category, so even the Google tag itself starts locked.
 *
 * The old <noscript> Meta tracking pixel was removed: an <img> in <noscript>
 * fires the moment the markup is parsed and cannot be conditioned on consent.
 *
 * Vercel Analytics (mounted separately in app/layout.tsx) is intentionally not
 * gated — it is cookieless.
 *
 * IDs are read from public env vars (safe to expose — these are client tags):
 *   NEXT_PUBLIC_GA4_ID          e.g. "G-XXXXXXXXXX"
 *   NEXT_PUBLIC_META_PIXEL_ID   e.g. "123456789012345"
 *
 * To fire a Lead / generate_lead conversion from anywhere on the site, call:
 *   import { trackLead } from "@/components/AnalyticsScripts";
 *   trackLead({ source: "audit-form" });
 * Each tag only receives the event if its own category was accepted.
 */

// No hardcoded fallbacks. They used to be baked in here, which meant clearing
// the environment variable did NOT switch the tag off — the tag kept firing with
// the old ID. For anything consent-gated that is the wrong default: emptying the
// variable has to be a reliable way to stop collecting.
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

// Shared helper — fires the lead event on both GA4 and Meta Pixel if present.
export function trackLead(params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const rec = readConsent();
  if (!rec) return;
  try {
    const w = window as any;
    if (rec.choice === "granted" && typeof w.gtag === "function") {
      w.gtag("event", "generate_lead", {
        form_name: "ai_diagnosis",
        page_location: window.location.href,
        ...params,
      });
    }
    if (rec.marketing === true && typeof w.fbq === "function") {
      w.fbq("track", "Lead", params);
    }
  } catch {
    /* no-op */
  }
}

// Contact-link clicks (whatsapp_click / phone_click). One delegated listener
// catches every wa.me / api.whatsapp.com / tel: link on the site, so links
// don't need individual handlers. link_position comes from an explicit
// data-link-position attribute if present, otherwise from where the link sits.
const WA_RE = /^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i;
const POSITIONS: [string, string][] = [
  [".floating-whatsapp", "floating"],
  [".assessment-bar", "sticky_bar"],
  [".contact-cta", "contact"],
  [".salon-demo-cta", "salon_demo"],
  [".sp-closing", "service_closing"],
  ["header", "header"],
  ["footer", "footer"],
  ["nav", "nav"],
];

function linkPosition(a: Element): string {
  const explicit = a.closest("[data-link-position]")?.getAttribute("data-link-position");
  if (explicit) return explicit;
  for (const [sel, name] of POSITIONS) if (a.closest(sel)) return name;
  return "body";
}

function onContactClick(e: MouseEvent) {
  try {
    const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!a) return;
    const href = a.href || "";
    const name = WA_RE.test(href)
      ? "whatsapp_click"
      : /^tel:/i.test(href)
        ? "phone_click"
        : null;
    if (!name) return;
    const rec = readConsent();
    if (!rec || rec.choice !== "granted") return;
    const w = window as any;
    if (typeof w.gtag !== "function") return;
    w.gtag("event", name, {
      link_url: href,
      page_location: window.location.href,
      link_position: linkPosition(a),
    });
  } catch {
    /* no-op */
  }
}

export default function AnalyticsScripts() {
  const { record, ready } = useConsent();
  const stats = ready && record?.choice === "granted";
  const marketing = ready && record?.marketing === true;

  // Consent Mode v2: deny everything up front, on every pageview, before any
  // Google tag can run.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    if (typeof w.gtag !== "function") {
      w.gtag = function () {
        w.dataLayer.push(arguments);
      };
    }
    w.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      functionality_storage: "granted",
      security_storage: "granted",
      wait_for_update: 500,
    });
  }, []);

  // Consent Mode v2 follows each choice separately, in both directions.
  useEffect(() => {
    if (typeof window === "undefined" || !ready) return;
    const w = window as any;
    if (typeof w.gtag === "function") {
      const mk = marketing ? "granted" : "denied";
      w.gtag("consent", "update", {
        analytics_storage: stats ? "granted" : "denied",
        ad_storage: mk,
        ad_user_data: mk,
        ad_personalization: mk,
      });
    }
    // Withdrawing marketing consent switches an already-loaded pixel off.
    if (!marketing && typeof w.fbq === "function") {
      try {
        w.fbq("consent", "revoke");
      } catch {
        /* no-op */
      }
    }
  }, [stats, marketing, ready]);

  // Contact-link click tracking, only while statistics consent is granted.
  useEffect(() => {
    if (typeof window === "undefined" || !stats || !GA4_ID) return;
    document.addEventListener("click", onContactClick, true);
    return () => document.removeEventListener("click", onContactClick, true);
  }, [stats]);

  if (!stats && !marketing) return null;

  return (
    <>
      {/* ─── Google Analytics 4 ─── */}
      {stats && GA4_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}');
            `}
          </Script>
        </>
      )}

      {/* ─── Meta (Facebook) Pixel ─── */}
      {marketing && META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('consent', 'grant');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}

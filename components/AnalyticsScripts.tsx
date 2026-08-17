"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useConsent } from "@/components/CookieConsent";

/**
 * GA4 + Meta Pixel base tags — consent gated.
 *
 * Nothing here loads until the visitor actively accepts in the cookie banner
 * (components/CookieConsent.tsx). GA4 sets _ga / _ga_* and Meta Pixel sets
 * _fbp; both are third-party trackers used for measurement and advertising,
 * which under the Privacy Protection Authority's opinion on "הסכמה"
 * (25.2.2026, following תיקון 13) require prior opt-in.
 *
 * Google Consent Mode v2 defaults to denied and is only updated to granted
 * after the visitor accepts, so even the Google tag itself starts locked.
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
 * It is a no-op when consent was not given, because neither tag exists.
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
  try {
    const w = window as any;
    if (typeof w.gtag === "function") {
      w.gtag("event", "generate_lead", { currency: "ILS", ...params });
    }
    if (typeof w.fbq === "function") {
      w.fbq("track", "Lead", params);
    }
  } catch {
    /* no-op */
  }
}

export default function AnalyticsScripts() {
  const { record, ready } = useConsent();
  const granted = ready && record?.choice === "granted";

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

  // Flip Consent Mode to granted the moment the visitor accepts.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as any;
    if (typeof w.gtag !== "function") return;
    if (granted) {
      w.gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
    }
    if (ready && record?.choice === "denied") {
      w.gtag("consent", "update", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      });
    }
  }, [granted, ready, record?.choice]);

  if (!granted) return null;

  return (
    <>
      {/* ─── Google Analytics 4 ─── */}
      {GA4_ID && (
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
      {META_PIXEL_ID && (
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

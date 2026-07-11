"use client";

import Script from "next/script";

/**
 * GA4 + Meta Pixel base tags.
 *
 * IDs are read from public env vars (safe to expose — these are client-side tags):
 *   NEXT_PUBLIC_GA4_ID          e.g. "G-XXXXXXXXXX"
 *   NEXT_PUBLIC_META_PIXEL_ID   e.g. "123456789012345"
 *
 * If an ID is missing the corresponding tag is simply not rendered, so the site
 * keeps building and running cleanly until the real IDs are filled in.
 *
 * To fire a Lead / generate_lead conversion from anywhere on the site, call:
 *   import { trackLead } from "@/components/AnalyticsScripts";
 *   trackLead({ source: "audit-form" });
 */

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-35YVB7955E";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1506427107624542";

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
        <>
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
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}
    </>
  );
}

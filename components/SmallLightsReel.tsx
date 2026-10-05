"use client";
import { useEffect, useRef } from "react";
import { readConsent } from "@/components/CookieConsent";

/** A real <video> in the server HTML; GA4 video events once per milestone, only with consent (same rule as AnalyticsScripts). */
export default function SmallLightsReel({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    const sent: Record<string, boolean> = {};
    const fire = (key: string, name: string, extra: Record<string, unknown> = {}) => {
      if (sent[key]) return; sent[key] = true;
      if (readConsent()?.choice !== "granted") return;
      const g = (window as any).gtag; if (typeof g !== "function") return;
      g("event", name, { video_title: "SMALL LIGHTS", video_edition: "reel_v4", ...extra });
    };
    const onPlay = () => fire("start", "video_start");
    const onTime = () => {
      if (!v.duration) return; const pct = (v.currentTime / v.duration) * 100;
      [25, 50, 75].forEach((m) => { if (pct >= m) fire(`p${m}`, "video_progress", { video_percent: m }); });
    };
    const onEnd = () => fire("complete", "video_complete", { video_percent: 100 });
    v.addEventListener("play", onPlay); v.addEventListener("timeupdate", onTime); v.addEventListener("ended", onEnd);
    return () => { v.removeEventListener("play", onPlay); v.removeEventListener("timeupdate", onTime); v.removeEventListener("ended", onEnd); };
  }, []);
  return (
    <video ref={ref} className="sl-reel" controls playsInline preload="none" poster={poster} aria-label={label}>
      <source src={src} type="video/mp4" />
    </video>
  );
}

/** Tracks clicks on links marked data-sl (to the film page, the free check). Consent gated. */
export function SlLinkTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[data-sl]") as HTMLAnchorElement | null;
      if (!a || readConsent()?.choice !== "granted") return;
      const g = (window as any).gtag; if (typeof g !== "function") return;
      g("event", "select_content", { content_type: "small_lights_link", item_id: a.dataset.sl });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

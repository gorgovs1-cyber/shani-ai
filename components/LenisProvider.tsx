"use client";

import { useEffect } from "react";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let disposed = false;
    let engine: any;
    let ticker: ((time: number) => void) | undefined;
    let gsapInstance: any;
    const mq = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const allowed = () => mq.matches && !document.documentElement.classList.contains("a11y-no-anim");
    const stop = () => {
      if (ticker && gsapInstance) gsapInstance.ticker.remove(ticker);
      ticker = undefined;
      engine?.destroy();
      engine = undefined;
      (window as any).__lenis = null;
    };
    const start = async () => {
      if (!allowed() || engine || disposed) return;
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"), import("gsap"), import("gsap/ScrollTrigger"),
      ]);
      if (disposed || !allowed() || engine) return;
      gsap.registerPlugin(ScrollTrigger);
      gsapInstance = gsap;
      engine = new Lenis({ lerp: 0.14, smoothWheel: true, anchors: { offset: -105 } });
      (window as any).__lenis = engine;
      window.dispatchEvent(new CustomEvent("lenis:ready", { detail: engine }));
      engine.on("scroll", ScrollTrigger.update);
      ticker = (time) => engine?.raf(time * 1000);
      gsap.ticker.add(ticker);
    };
    const sync = () => { if (allowed()) void start().catch(stop); else stop(); };
    mq.addEventListener("change", sync);
    const preferences = new MutationObserver(sync);
    preferences.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    sync();
    return () => { disposed = true; mq.removeEventListener("change", sync); preferences.disconnect(); stop(); };
  }, []);
  return <>{children}</>;
}

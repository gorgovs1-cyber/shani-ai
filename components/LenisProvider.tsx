"use client";

import { useEffect } from "react";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let lenis: any;
    let tickerCb: ((time: number) => void) | null = null;

    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

      // Expose lenis globally so other components (WorkGrid) can subscribe directly
      (window as any).__lenis = lenis;
      window.dispatchEvent(new CustomEvent("lenis:ready", { detail: lenis }));

      // Keep GSAP ScrollTrigger in sync with Lenis scroll position
      lenis.on("scroll", ScrollTrigger.update);

      // Drive Lenis from GSAP's ticker (eliminates double RAF)
      tickerCb = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0);
    };

    initLenis();

    return () => {
      if (tickerCb) {
        import("gsap").then(({ gsap }) => gsap.ticker.remove(tickerCb!));
      }
      (window as any).__lenis = null;
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}

"use client";

import { useEffect } from "react";

/**
 * Premium scroll-reveal: sections fade + rise as they enter the viewport.
 * - Respects prefers-reduced-motion (does nothing).
 * - Above-the-fold sections (already visible on load) are NOT hidden, so no flash.
 * - No dependencies; uses IntersectionObserver.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("main section, main article")
    );
    if (!targets.length) return;

    const triggerLine = window.innerHeight * 0.85;
    const toObserve: HTMLElement[] = [];

    targets.forEach((el) => {
      // Skip elements already in view on load (e.g. hero) → keep them visible.
      const top = el.getBoundingClientRect().top;
      if (top < triggerLine) return;
      el.classList.add("reveal-init");
      toObserve.push(el);
    });

    if (!toObserve.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    toObserve.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}

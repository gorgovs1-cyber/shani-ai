"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * מעבר עמוד: הדף החדש עולה ברכות במקום להבזיק.
 * ללא ספריות, אנימציית CSS בלבד, ומכבד prefers-reduced-motion.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"in" | "enter">("in");
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("in");
      return;
    }
    setPhase("enter");
    const id = window.requestAnimationFrame(() => setPhase("in"));
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div
      style={{
        opacity: phase === "enter" ? 0 : 1,
        transform: phase === "enter" ? "translateY(8px)" : "none",
        transition:
          phase === "enter"
            ? "none"
            : "opacity .45s cubic-bezier(.2,.7,.2,1), transform .45s cubic-bezier(.2,.7,.2,1)",
      }}
    >
      {children}
    </div>
  );
}

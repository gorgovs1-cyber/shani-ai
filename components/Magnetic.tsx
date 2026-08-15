"use client";

import { useRef } from "react";

/**
 * עטיפה מגנטית לכפתור: האלמנט נמשך קלות לעבר הסמן בריחוף.
 * דסקטופ בלבד (pointer: fine), מכבד prefers-reduced-motion, טווח מקסימלי 6 פיקסלים.
 */
export default function Magnetic({
  children,
  strength = 6,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const enabled = () =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(pointer: fine)").matches &&
    !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      ref={ref}
      style={{ display: "inline-block", willChange: "transform", transition: "transform .25s cubic-bezier(.2,.7,.2,1)" }}
      onMouseMove={(e) => {
        if (!enabled() || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        ref.current.style.transform = `translate(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(1)}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </div>
  );
}

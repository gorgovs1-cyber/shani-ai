"use client";

import { useEffect, useRef } from "react";

/**
 * פרלקסה עדינה: האלמנט זז לאט יותר מהגלילה.
 * דסקטופ בלבד, מכבד prefers-reduced-motion, ומצומצם ל-rAF אחד כדי לא להעמיס.
 */
export default function Parallax({
  children,
  amount = 40,
  className,
  style,
}: {
  children: React.ReactNode;
  /** טווח התנועה המקסימלי בפיקסלים */
  amount?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia?.("(pointer: coarse)").matches;
    const narrow = window.innerWidth < 900;
    if (reduced || coarse || narrow) return;

    let raf = 0;
    let visible = false;

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) tick();
    });
    io.observe(el);

    function tick() {
      raf = window.requestAnimationFrame(() => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress: -1 כשהאלמנט מתחת למסך, 1 כשהוא מעליו
        const progress = (vh / 2 - (rect.top + rect.height / 2)) / (vh / 2 + rect.height / 2);
        const clamped = Math.max(-1, Math.min(1, progress));
        el.style.transform = `translate3d(0, ${(clamped * amount).toFixed(2)}px, 0)`;
        if (visible) tick();
      });
    }

    return () => {
      io.disconnect();
      window.cancelAnimationFrame(raf);
      if (el) el.style.transform = "";
    };
  }, [amount]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform", ...style }}>
      {children}
    </div>
  );
}

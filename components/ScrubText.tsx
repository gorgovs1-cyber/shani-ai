"use client";

import { useEffect, useRef } from "react";

/**
 * טקסט שנחשף מילה אחרי מילה בהתאם למיקום הגלילה, בסגנון runrobrun.
 * הפיצול לפי רווחים בלבד, לכן עברית עם אותיות סופיות לא נשברת,
 * וסדר המילים נשמר כך שהדפדפן מסדר RTL נכון מעצמו.
 * מכבד prefers-reduced-motion (הטקסט פשוט מוצג מלא).
 */
export default function ScrubText({
  text,
  style,
  className,
}: {
  text: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const words = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    if (reduced || !words.length) {
      words.forEach((w) => (w.style.opacity = "1"));
      return;
    }

    let raf = 0;
    let visible = false;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // הפסקה מתחילה להיחשף כשהיא נכנסת לשני השלישים התחתונים,
      // ומסתיימת כשמרכזה מגיע למרכז המסך
      const start = vh * 0.9;
      const end = vh * 0.45;
      const p = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      const lit = p * words.length;
      words.forEach((w, i) => {
        w.style.opacity = i < lit ? "1" : "0.18";
      });
    };

    const onScroll = () => {
      if (!visible) return;
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) update();
    }, { rootMargin: "20% 0px" });
    io.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, [text]);

  const words = text.split(" ");

  return (
    <p ref={ref} style={style} className={className}>
      {words.map((w, i) => (
        <span key={i}>
          <span data-w style={{ opacity: 0.18, transition: "opacity .25s linear" }}>{w}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}

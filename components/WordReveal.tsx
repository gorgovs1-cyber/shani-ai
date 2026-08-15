"use client";

import { useEffect, useRef, useState } from "react";

/**
 * חשיפת כותרת מילה אחרי מילה בגלילה.
 *
 * הערות עברית ו-RTL:
 * הפיצול הוא לפי רווחים בלבד ולעולם לא לפי תווים, כדי לא לשבור אותיות סופיות,
 * ניקוד או צירופים. סדר המילים נשמר, ולכן הדפדפן מסדר RTL נכון מעצמו.
 * כל מילה עטופה ב-span עם display:inline-block, והרווחים נשארים טקסט רגיל
 * כדי שגלישת שורות תמשיך לעבוד.
 */
export default function WordReveal({
  text,
  as: Tag = "h2",
  style,
  className,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(true);
      return;
    }
    setAnimate(true);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={ref as never} style={style} className={className}>
      {words.map((w, i) => (
        <span key={i}>
          <span
            style={{
              display: "inline-block",
              opacity: animate && !shown ? 0 : 1,
              transform: animate && !shown ? "translateY(0.35em)" : "none",
              transition: animate
                ? `opacity .5s cubic-bezier(.2,.7,.2,1) ${i * 60}ms, transform .5s cubic-bezier(.2,.7,.2,1) ${i * 60}ms`
                : undefined,
            }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

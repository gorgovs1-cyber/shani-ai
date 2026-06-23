"use client";

import { useLang } from "@/components/LanguageProvider";
import { dict } from "@/lib/translations";

export default function Marquee() {
  const { lang } = useLang();
  const t = dict[lang];
  // Duplicate items so the infinite loop is seamless
  const items = [...t.marqueeItems, ...t.marqueeItems];

  return (
    <section
      aria-hidden="true"
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "16px 0",
        background: "var(--page)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        className="marquee-track"
        dir="ltr"
        style={{
          display: "flex",
          gap: "2.5rem",
          width: "max-content",
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
              fontSize: 13,
              color: "var(--muted2)",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "2.5rem",
            }}
          >
            {item}
            <span style={{ color: "var(--acc)" }}>✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

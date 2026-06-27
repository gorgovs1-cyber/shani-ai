"use client";

import { useState, useEffect } from "react";

const lines = [
  { text: "> SHANI_AI_CREATOR.init()", accent: true },
  { text: "> READY_", accent: true },
];

const DELAYS = [0, 600];

export default function TerminalBoot() {
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    const timers = DELAYS.map((delay, i) =>
      setTimeout(() => setVisible((prev) => [...prev, i]), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="terminal-boot"
      style={{
        fontFamily: "'JetBrains Mono', var(--font-mono), monospace",
        fontSize: 12,
        lineHeight: 2,
        marginBottom: 24,
        direction: "ltr",
        textAlign: "left",
      }}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            color: line.accent ? "var(--acc)" : "var(--dmuted)",
            opacity: visible.includes(i) ? 1 : 0,
            transform: visible.includes(i) ? "none" : "translateY(5px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          {line.text}
        </div>
      ))}
    </div>
  );
}

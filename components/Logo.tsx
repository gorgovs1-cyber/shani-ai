"use client";

import { useState, useEffect } from "react";

// Pre-computed ray coordinates — avoids Math.cos/sin hydration mismatch.
const RAYS = [
  { x1: 88,    y1: 50,    x2: 96,    y2: 50    },
  { x1: 82.91, y1: 69,    x2: 89.84, y2: 73    },
  { x1: 69,    y1: 82.91, x2: 73,    y2: 89.84 },
  { x1: 50,    y1: 88,    x2: 50,    y2: 96    },
  { x1: 31,    y1: 82.91, x2: 27,    y2: 89.84 },
  { x1: 17.09, y1: 69,    x2: 10.16, y2: 73    },
  { x1: 12,    y1: 50,    x2: 4,     y2: 50    },
  { x1: 17.09, y1: 31,    x2: 10.16, y2: 27    },
  { x1: 31,    y1: 17.09, x2: 27,    y2: 10.16 },
  { x1: 50,    y1: 12,    x2: 50,    y2: 4     },
  { x1: 69,    y1: 17.09, x2: 73,    y2: 10.16 },
  { x1: 82.91, y1: 31,    x2: 89.84, y2: 27    },
];

export default function Logo({ height = 40 }: { height?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", direction: "ltr" }}>
      {/* Hexagon icon — single signal accent */}
      <svg width={height} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="logo-glow">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {mounted && RAYS.map((r, i) => (
          <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
            stroke="var(--signal)"
            strokeWidth={i % 2 === 0 ? "1.5" : "0.8"}
            opacity="0.5"
          />
        ))}

        <polygon
          points="50,14 79,31 79,67 50,84 21,67 21,31"
          stroke="var(--signal)" strokeWidth="2" fill="none" filter="url(#logo-glow)"
        />
        <polygon
          points="50,22 72,35 72,63 50,76 28,63 28,35"
          stroke="var(--signal)" strokeWidth="0.5" fill="none" opacity="0.3"
        />
        <circle cx="50" cy="50" r="13" stroke="var(--signal)" strokeWidth="1.5" fill="none" filter="url(#logo-glow)" />
        <circle cx="50" cy="50" r="5" fill="var(--signal)" opacity="0.95" />
        <line x1="50" y1="37" x2="50" y2="28" stroke="var(--signal)" strokeWidth="1" opacity="0.5" />
        <line x1="50" y1="63" x2="50" y2="72" stroke="var(--signal)" strokeWidth="1" opacity="0.5" />
        <line x1="37" y1="50" x2="28" y2="50" stroke="var(--signal)" strokeWidth="1" opacity="0.5" />
        <line x1="63" y1="50" x2="72" y2="50" stroke="var(--signal)" strokeWidth="1" opacity="0.5" />
      </svg>

      {/* Wordmark */}
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
        <span style={{ display: "flex", alignItems: "baseline", gap: "0.22em" }}>
          <span style={{
            fontFamily: "var(--font-inter)",
            fontSize: height * 0.46,
            fontWeight: 700,
            color: "var(--cream)",
            letterSpacing: "-0.02em",
          }}>Shani</span>
          <span style={{
            fontFamily: "var(--font-inter)",
            fontSize: height * 0.46,
            fontWeight: 700,
            color: "var(--signal)",
            letterSpacing: "-0.02em",
          }}>AI</span>
        </span>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: height * 0.2,
          fontWeight: 400,
          color: "var(--mist)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}>Creator</span>
      </span>
    </span>
  );
}

"use client";

import { useState, useEffect } from "react";

// Pre-computed ray coordinates — avoids Math.cos/sin hydration mismatch
// center=(50,50), r1=38, r2=46, angles 0..330 step 30
const RAYS = [
  { x1: 88,    y1: 50,    x2: 96,    y2: 50    }, // 0°
  { x1: 82.91, y1: 69,    x2: 89.84, y2: 73    }, // 30°
  { x1: 69,    y1: 82.91, x2: 73,    y2: 89.84 }, // 60°
  { x1: 50,    y1: 88,    x2: 50,    y2: 96    }, // 90°
  { x1: 31,    y1: 82.91, x2: 27,    y2: 89.84 }, // 120°
  { x1: 17.09, y1: 69,    x2: 10.16, y2: 73    }, // 150°
  { x1: 12,    y1: 50,    x2: 4,     y2: 50    }, // 180°
  { x1: 17.09, y1: 31,    x2: 10.16, y2: 27    }, // 210°
  { x1: 31,    y1: 17.09, x2: 27,    y2: 10.16 }, // 240°
  { x1: 50,    y1: 12,    x2: 50,    y2: 4     }, // 270°
  { x1: 69,    y1: 17.09, x2: 73,    y2: 10.16 }, // 300°
  { x1: 82.91, y1: 31,    x2: 89.84, y2: 27    }, // 330°
];

export default function Logo({ height = 40 }: { height?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      {/* Hexagon icon */}
      <svg width={height} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C026D3" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer glow rays — static coords, no hydration mismatch */}
        {mounted && RAYS.map((r, i) => (
          <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
            stroke="url(#hex-grad)"
            strokeWidth={i % 2 === 0 ? "1.5" : "0.8"}
            opacity="0.6"
          />
        ))}

        {/* Hexagon */}
        <polygon
          points="50,14 79,31 79,67 50,84 21,67 21,31"
          stroke="url(#hex-grad)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
        />

        {/* Inner hexagon faint */}
        <polygon
          points="50,22 72,35 72,63 50,76 28,63 28,35"
          stroke="url(#hex-grad)"
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
        />

        {/* Camera/eye circle */}
        <circle cx="50" cy="50" r="13" stroke="url(#hex-grad)" strokeWidth="1.5" fill="none" filter="url(#glow)" />

        {/* Lens inner dot */}
        <circle cx="50" cy="50" r="5" fill="url(#hex-grad)" opacity="0.9" />

        {/* Circuit lines */}
        <line x1="50" y1="37" x2="50" y2="28" stroke="url(#hex-grad)" strokeWidth="1" opacity="0.5" />
        <line x1="50" y1="63" x2="50" y2="72" stroke="url(#hex-grad)" strokeWidth="1" opacity="0.5" />
        <line x1="37" y1="50" x2="28" y2="50" stroke="url(#hex-grad)" strokeWidth="1" opacity="0.5" />
        <line x1="63" y1="50" x2="72" y2="50" stroke="url(#hex-grad)" strokeWidth="1" opacity="0.5" />
      </svg>

      {/* Wordmark — "Ai Shani" order */}
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span style={{ display: "flex", alignItems: "baseline", gap: "0.15em" }}>
          <span style={{
            fontFamily: "var(--font-syne)",
            fontSize: height * 0.48,
            fontWeight: 700,
            color: "#06B6D4",
            letterSpacing: "-0.01em",
          }}>Ai</span>
          <span style={{
            fontFamily: "var(--font-syne)",
            fontSize: height * 0.48,
            fontWeight: 700,
            background: "linear-gradient(90deg, #C026D3, #8B5CF6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.01em",
          }}>Shani</span>
        </span>
        <span style={{
          fontFamily: "var(--font-body)",
          fontSize: height * 0.22,
          fontWeight: 400,
          color: "var(--muted)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}>Creator</span>
      </span>
    </span>
  );
}

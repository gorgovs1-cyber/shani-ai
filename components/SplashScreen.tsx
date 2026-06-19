"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"visible" | "fadeout" | "gone">("visible");

  // Render only on client to avoid hydration mismatch from Math.sin/cos
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    // Start fade-out at 3.4s
    const t1 = setTimeout(() => setPhase("fadeout"), 3400);
    // Unmount at 4s
    const t2 = setTimeout(() => setPhase("gone"), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!mounted || phase === "gone") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#060608",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2.5rem",
        opacity: phase === "fadeout" ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: phase === "fadeout" ? "none" : "all",
      }}
    >
      {/* Ambient glow behind logo */}
      <div style={{
        position: "absolute",
        width: 360,
        height: 360,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%)",
        animation: "splash-pulse 2s ease-in-out infinite",
      }} />

      {/* Logo SVG — big, spinning outer ring */}
      <div style={{ position: "relative", animation: "splash-rise 0.8s ease forwards", opacity: 0 }}>
        <SplashLogo size={140} />
      </div>

      {/* Wordmark — static, fades in after logo */}
      <div style={{
        textAlign: "center",
        animation: "splash-rise 0.8s ease 0.5s forwards",
        opacity: 0,
      }}>
        {/* Shani Ai */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "0.2em" }}>
          <span style={{
            fontFamily: "var(--font-syne, sans-serif)",
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontWeight: 700,
            color: "#06B6D4",
            letterSpacing: "-0.01em",
          }}>Ai</span>
          <span style={{
            fontFamily: "var(--font-syne, sans-serif)",
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontWeight: 700,
            background: "linear-gradient(90deg, #C026D3, #8B5CF6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.01em",
          }}>Shani</span>
        </div>
        {/* Creator subtitle */}
        <div style={{
          fontFamily: "var(--font-body, sans-serif)",
          fontSize: "clamp(0.6rem, 1.5vw, 0.78rem)",
          fontWeight: 400,
          color: "#8A8AA8",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          marginTop: "0.15rem",
        }}>
          Creator
        </div>
        {/* Divider line */}
        <div style={{
          width: 48,
          height: 1,
          background: "linear-gradient(90deg, transparent, #8B5CF6, transparent)",
          margin: "1.2rem auto 0",
        }} />
        {/* Welcome */}
        <div style={{
          fontFamily: "var(--font-syne, sans-serif)",
          fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)",
          fontWeight: 300,
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          color: "#F4F4FF",
          opacity: 0.5,
          marginTop: "0.75rem",
        }}>
          Welcome
        </div>
      </div>

      {/* Styles moved to globals.css */}
    </div>
  );
}

// ─── Isolated Logo for Splash (no shared filter IDs) ───────
function SplashLogo({ size }: { size: number }) {
  return (
    <div style={{ position: "relative", width: size, height: size }}>

      {/* Outer spinning ring */}
      <svg
        width={size} height={size}
        viewBox="0 0 140 140"
        style={{
          position: "absolute", inset: 0,
          animation: "splash-spin 6s linear infinite",
          transformOrigin: "center",
        }}
      >
        <defs>
          <linearGradient id="sp-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        {/* Dashed spinning ring */}
        <circle cx="70" cy="70" r="64"
          fill="none"
          stroke="url(#sp-ring-grad)"
          strokeWidth="1"
          strokeDasharray="8 6"
          strokeOpacity="0.5"
        />
        {/* Bright dot on ring at 0° position */}
        <circle cx="70" cy="6" r="3" fill="#8B5CF6" opacity="0.9" />
      </svg>

      {/* Counter-spinning inner ring */}
      <svg
        width={size} height={size}
        viewBox="0 0 140 140"
        style={{
          position: "absolute", inset: 0,
          animation: "splash-spin-rev 9s linear infinite",
          transformOrigin: "center",
        }}
      >
        <circle cx="70" cy="70" r="50"
          fill="none"
          stroke="#06B6D4"
          strokeWidth="0.7"
          strokeDasharray="3 8"
          strokeOpacity="0.3"
        />
        <circle cx="70" cy="20" r="2" fill="#06B6D4" opacity="0.7" />
      </svg>

      {/* Static logo center */}
      <svg
        width={size} height={size}
        viewBox="0 0 140 140"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <linearGradient id="sp-hex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C026D3" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <filter id="sp-glow">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="sp-glow2">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Glow rays */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 70 + 36 * Math.cos(rad);
          const y1 = 70 + 36 * Math.sin(rad);
          const x2 = 70 + 45 * Math.cos(rad);
          const y2 = 70 + 45 * Math.sin(rad);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="url(#sp-hex-grad)"
              strokeWidth={i % 2 === 0 ? "1.5" : "0.8"}
              opacity="0.7"
            />
          );
        })}

        {/* Outer hexagon */}
        <polygon
          points="70,30 98,47 98,83 70,100 42,83 42,47"
          stroke="url(#sp-hex-grad)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#sp-glow)"
        />

        {/* Inner hexagon faint */}
        <polygon
          points="70,40 90,52 90,76 70,88 50,76 50,52"
          stroke="url(#sp-hex-grad)"
          strokeWidth="0.6"
          fill="none"
          opacity="0.3"
        />

        {/* Eye circle */}
        <circle cx="70" cy="70" r="14"
          stroke="url(#sp-hex-grad)"
          strokeWidth="2"
          fill="none"
          filter="url(#sp-glow)"
        />

        {/* Center dot — pulsing via CSS */}
        <circle cx="70" cy="70" r="6"
          fill="url(#sp-hex-grad)"
          opacity="0.95"
          filter="url(#sp-glow2)"
          style={{ animation: "splash-dot-pulse 1.8s ease-in-out infinite" }}
        />

        {/* Circuit lines */}
        <line x1="70" y1="56" x2="70" y2="44" stroke="url(#sp-hex-grad)" strokeWidth="1.2" opacity="0.5" />
        <line x1="70" y1="84" x2="70" y2="96" stroke="url(#sp-hex-grad)" strokeWidth="1.2" opacity="0.5" />
        <line x1="56" y1="70" x2="44" y2="70" stroke="url(#sp-hex-grad)" strokeWidth="1.2" opacity="0.5" />
        <line x1="84" y1="70" x2="96" y2="70" stroke="url(#sp-hex-grad)" strokeWidth="1.2" opacity="0.5" />
      </svg>
    </div>
  );
}

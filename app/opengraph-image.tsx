import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Shani AI Creator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#141009",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(242,98,46,0.28) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(242,98,46,0.14) 0%, transparent 70%)",
          }}
        />

        {/* Logo hexagon (the diamonds) — bold strokes survive compression */}
        <svg viewBox="0 0 100 100" width={200} height={200} style={{ marginBottom: 48 }}>
          <path
            d="M50 6 L88 28 L88 72 L50 94 L12 72 L12 28 Z"
            stroke="#f2622e"
            strokeWidth="9"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M50 26 L71 38 L71 62 L50 74 L29 62 L29 38 Z"
            stroke="#f2622e"
            strokeWidth="7"
            strokeLinejoin="round"
            fill="none"
            opacity="0.7"
          />
          <circle cx="50" cy="50" r="8" fill="#f2622e" />
        </svg>

        {/* Wordmark */}
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: "#f4ede1",
            letterSpacing: "0.22em",
            lineHeight: 1,
            paddingLeft: "0.22em",
          }}
        >
          SHANI AI CREATOR
        </div>
      </div>
    ),
    { ...size }
  );
}

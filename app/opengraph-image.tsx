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
        }}
      >
        {/* Brand logo — full-opacity, medium-bold strokes survive WhatsApp downscale */}
        <svg viewBox="0 0 100 100" width={440} height={440} fill="none">
          <path
            d="M50 7 L87 28.5 L87 71.5 L50 93 L13 71.5 L13 28.5 Z"
            stroke="#f2622e"
            strokeWidth="7.5"
            strokeLinejoin="round"
          />
          <path
            d="M50 27 L70 39 L70 61 L50 73 L30 61 L30 39 Z"
            stroke="#f2622e"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="50" r="8" fill="#f2622e" />
        </svg>

        {/* Wordmark */}
        <div
          style={{
            marginTop: 24,
            fontFamily: "sans-serif",
            fontSize: 32,
            fontWeight: 700,
            color: "#f4ede1",
            letterSpacing: "0.3em",
            paddingLeft: "0.3em",
          }}
        >
          SHANI AI CREATOR
        </div>
      </div>
    ),
    { ...size }
  );
}

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
        {/* Exact brand logo (matches components/Logo.tsx) on a flat background */}
        <svg viewBox="0 0 100 100" width={360} height={360} fill="none">
          <path
            d="M50 7 L87 28.5 L87 71.5 L50 93 L13 71.5 L13 28.5 Z"
            stroke="#f2622e"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path
            d="M50 27 L70 39 L70 61 L50 73 L30 61 L30 39 Z"
            stroke="#f2622e"
            strokeWidth="4"
            strokeLinejoin="round"
            opacity="0.5"
          />
          <circle cx="50" cy="50" r="6.5" fill="#f2622e" />
        </svg>

        {/* Wordmark under the logo */}
        <div
          style={{
            marginTop: 28,
            fontFamily: "sans-serif",
            fontSize: 34,
            fontWeight: 700,
            color: "#f4ede1",
            letterSpacing: "0.28em",
            paddingLeft: "0.28em",
          }}
        >
          SHANI AI CREATOR
        </div>
      </div>
    ),
    { ...size }
  );
}

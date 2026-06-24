import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Shani Gorgov — Web & AI Product Builder";
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
            top: -100,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(242,98,46,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(242,98,46,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Logo hexagon */}
        <svg
          viewBox="0 0 100 100"
          width={80}
          height={80}
          style={{ marginBottom: 28 }}
        >
          <path
            d="M50 7 L87 28.5 L87 71.5 L50 93 L13 71.5 L13 28.5 Z"
            stroke="#f2622e"
            strokeWidth="6"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M50 27 L70 39 L70 61 L50 73 L30 61 L30 39 Z"
            stroke="#f2622e"
            strokeWidth="4"
            strokeLinejoin="round"
            fill="none"
            opacity="0.5"
          />
          <circle cx="50" cy="50" r="6.5" fill="#f2622e" />
        </svg>

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#f4ede1",
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          Shani Gorgov
        </div>

        {/* Role pill */}
        <div
          style={{
            fontSize: 22,
            color: "#f2622e",
            background: "rgba(242,98,46,0.12)",
            border: "1px solid rgba(242,98,46,0.35)",
            borderRadius: 999,
            padding: "10px 28px",
            letterSpacing: "0.08em",
            marginBottom: 40,
          }}
        >
          WEB & AI PRODUCT BUILDER
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            color: "#b1a48f",
            maxWidth: 700,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          בונה אתרים, דפי נחיתה ומוצרים דיגיטליים מודרניים
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            fontSize: 18,
            color: "rgba(177,164,143,0.5)",
            letterSpacing: "0.05em",
          }}
        >
          shani-ai.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}

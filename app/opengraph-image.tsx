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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Bold logomark — flat colors + thick shapes stay crisp after WhatsApp compression */}
        <svg viewBox="0 0 100 100" width={400} height={400}>
          {/* Outer hexagon — thick solid outline */}
          <path
            d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z"
            stroke="#f2622e"
            strokeWidth="11"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Inner diamond — solid fill for maximum sharpness */}
          <path
            d="M50 27 L71 39 L71 61 L50 73 L29 61 L29 39 Z"
            fill="#f2622e"
          />
          {/* Center cutout dot */}
          <circle cx="50" cy="50" r="8" fill="#141009" />
        </svg>
      </div>
    ),
    { ...size }
  );
}

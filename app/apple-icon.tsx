import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#141009",
          borderRadius: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 100 100" width={130} height={130} fill="none">
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
      </div>
    ),
    { ...size }
  );
}

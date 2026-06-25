import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#141009",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 100 100" width={26} height={26} fill="none">
          <path
            d="M50 7 L87 28.5 L87 71.5 L50 93 L13 71.5 L13 28.5 Z"
            stroke="#f2622e"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          <path
            d="M50 27 L70 39 L70 61 L50 73 L30 61 L30 39 Z"
            stroke="#f2622e"
            strokeWidth="5"
            strokeLinejoin="round"
            opacity="0.5"
          />
          <circle cx="50" cy="50" r="7" fill="#f2622e" />
        </svg>
      </div>
    ),
    { ...size }
  );
}

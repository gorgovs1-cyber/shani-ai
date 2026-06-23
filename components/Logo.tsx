"use client";
export default function Logo({ height = 34 }: { height?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-label="Shani Gorgov logo"
      style={{
        width: height,
        height,
        color: 'var(--acc)',
        filter: 'drop-shadow(0 0 10px color-mix(in oklch, var(--acc) 55%, transparent))',
        flexShrink: 0,
      }}
    >
      <path
        d="M50 7 L87 28.5 L87 71.5 L50 93 L13 71.5 L13 28.5 Z"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path
        d="M50 27 L70 39 L70 61 L50 73 L30 61 L30 39 Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        opacity="0.5"
      />
      <circle cx="50" cy="50" r="6.5" fill="currentColor" />
    </svg>
  );
}

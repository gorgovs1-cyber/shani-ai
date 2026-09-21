import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מדיניות ביטולים והחזרים · Shani AI Creator",
  description:
    "מדיניות ביטול עסקה והחזר כספי של Shani AI Creator (שני גורגוב, עוסק פטור 300585536): איך מבטלים, ביטול לפני ואחרי תחילת העבודה, מועדי החזר, מה אינו ניתן להחזר, וביטול מנוי Shani Care.",
  alternates: { canonical: "https://shani-ai.com/cancellation" },
  openGraph: {
    title: "מדיניות ביטולים והחזרים · Shani AI Creator",
    description:
      "מדיניות ביטול עסקה והחזר כספי של Shani AI Creator (שני גורגוב).",
    url: "https://shani-ai.com/cancellation",
    type: "website",
    locale: "he_IL",
  },
};

export default function CancellationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

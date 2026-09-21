import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "תנאי שימוש · Shani AI Creator",
  description:
    "תנאי השימוש באתר ובשירותים של Shani AI Creator (שני גורגוב): ייעוץ AI, אוטומציות ובניית אתרים לעסקים. הצעות מחיר, קניין רוחני, סודיות והגבלת אחריות.",
  alternates: { canonical: "https://shani-ai.com/terms" },
  openGraph: {
    title: "תנאי שימוש · Shani AI Creator",
    description:
      "תנאי השימוש באתר ובשירותים של Shani AI Creator (שני גורגוב).",
    url: "https://shani-ai.com/terms",
    type: "website",
    locale: "he_IL",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

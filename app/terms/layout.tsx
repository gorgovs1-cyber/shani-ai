import type { Metadata } from "next";
import { localizedMeta } from "@/lib/seo";

const heMeta: Metadata = {
  title: "תנאי שימוש · Shani AI",
  description:
    "תנאי השימוש באתר ובשירותים של Shani AI Creator: פתרונות AI, אוטומציות ובניית אתרים לעסקים. הצעות מחיר, קניין רוחני, סודיות והגבלת אחריות.",
  alternates: { canonical: "https://shani-ai.com/terms" },
  openGraph: {
    title: "תנאי שימוש · Shani AI",
    description:
      "תנאי השימוש באתר ובשירותים של Shani AI Creator.",
    url: "https://shani-ai.com/terms",
    type: "website",
    locale: "he_IL",
  },
};

export function generateMetadata(): Metadata {
  return localizedMeta("/terms", heMeta, {
    title: "Terms of use · Shani AI",
    description: "Terms of use for the Shani AI Creator website and services: proposals and payment, intellectual property, liability and governing law.",
  });
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

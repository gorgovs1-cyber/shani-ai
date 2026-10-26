import type { Metadata } from "next";
import { localizedMeta } from "@/lib/seo";
import PageSchema from "@/components/PageSchema";

const heMeta: Metadata = {
  title: "תקנון ותנאי שימוש באתר · Shani AI",
  description:
    "תנאי השימוש באתר ובשירותים של Shani AI Creator: פתרונות AI, אוטומציות ובניית אתרים לעסקים. הצעות מחיר, קניין רוחני, סודיות והגבלת אחריות.",
  alternates: { canonical: "https://shani-ai.com/terms" },
  openGraph: {
    title: "תקנון ותנאי שימוש באתר · Shani AI",
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
  return (
    <>
      <PageSchema path="/terms" he={{ name: "תקנון ותנאי שימוש באתר", description: "תנאי השימוש באתר ובשירותים של Shani AI Creator." }} en={{ name: "Terms of use", description: "Terms of use for the Shani AI Creator website and services." }} dateModified="2026-10-26" />
      {children}
    </>
  );
}

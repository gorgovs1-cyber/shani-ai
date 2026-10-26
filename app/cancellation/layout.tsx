import type { Metadata } from "next";
import { localizedMeta } from "@/lib/seo";
import PageSchema from "@/components/PageSchema";

const heMeta: Metadata = {
  title: "מדיניות ביטולים והחזרים · Shani AI",
  description:
    "מדיניות ביטול עסקה והחזר כספי של Shani AI Creator: איך מבטלים, ביטול לפני ואחרי תחילת העבודה, מועדי החזר, מה אינו ניתן להחזר, וביטול מנוי Shani Care.",
  alternates: { canonical: "https://shani-ai.com/cancellation" },
  openGraph: {
    title: "מדיניות ביטולים והחזרים · Shani AI",
    description:
      "מדיניות ביטול עסקה והחזר כספי של Shani AI Creator.",
    url: "https://shani-ai.com/cancellation",
    type: "website",
    locale: "he_IL",
  },
};

export function generateMetadata(): Metadata {
  return localizedMeta("/cancellation", heMeta, {
    title: "Cancellation and refund policy · Shani AI",
    description: "How to cancel, cancelling before and after work starts, when money is refunded and what cannot be refunded, under the Israeli Consumer Protection Law.",
  });
}

export default function CancellationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageSchema path="/cancellation" he={{ name: "מדיניות ביטולים והחזרים", description: "מדיניות ביטול עסקה והחזר כספי של Shani AI Creator." }} en={{ name: "Cancellation and refund policy", description: "How to cancel, when money is refunded and what cannot be refunded." }} dateModified="2026-10" />
      {children}
    </>
  );
}

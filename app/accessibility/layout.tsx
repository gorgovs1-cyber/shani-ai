import type { Metadata } from "next";
import { localizedMeta } from "@/lib/seo";
import PageSchema from "@/components/PageSchema";

const heMeta: Metadata = {
  title: "הצהרת נגישות לפי ת״י 5568 · Shani AI",
  description:
    "הצהרת הנגישות של אתר Shani AI Creator. האתר נבנה לפי התקן הישראלי ת״י 5568 והנחיות WCAG 2.1 ברמת AA, כולל ניווט מלא במקלדת.",
  alternates: { canonical: "https://shani-ai.com/accessibility" },
  openGraph: {
    title: "הצהרת נגישות לפי ת״י 5568 · Shani AI",
    description:
      "הצהרת נגישות לפי התקן הישראלי ת״י 5568 והנחיות WCAG 2.1 ברמת AA.",
    url: "https://shani-ai.com/accessibility",
    type: "website",
    locale: "he_IL",
  },
};

export function generateMetadata(): Metadata {
  return localizedMeta("/accessibility", heMeta, {
    title: "Accessibility statement · Shani AI",
    description: "Accessibility statement for Shani AI Creator: built to Israeli Standard IS 5568 and WCAG 2.1 Level AA, with full keyboard navigation and a way to report any issue.",
  });
}

export default function AccessibilityLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageSchema path="/accessibility" he={{ name: "הצהרת נגישות", description: "הצהרת הנגישות של אתר Shani AI Creator לפי התקן הישראלי ת״י 5568." }} en={{ name: "Accessibility statement", description: "Accessibility statement for Shani AI Creator, built to Israeli Standard IS 5568." }} dateModified="2026-10-26" />
      {children}
    </>
  );
}

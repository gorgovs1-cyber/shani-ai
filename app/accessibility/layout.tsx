import type { Metadata } from "next";
import { localizedMeta } from "@/lib/seo";

const heMeta: Metadata = {
  title: "הצהרת נגישות · Shani AI Creator",
  description:
    "הצהרת הנגישות של אתר Shani AI Creator. האתר נבנה לפי התקן הישראלי ת״י 5568 והנחיות WCAG 2.1 ברמת AA, כולל תפריט נגישות וניווט מלא במקלדת.",
  alternates: { canonical: "https://shani-ai.com/accessibility" },
  openGraph: {
    title: "הצהרת נגישות · Shani AI Creator",
    description:
      "הצהרת נגישות לפי התקן הישראלי ת״י 5568 והנחיות WCAG 2.1 ברמת AA.",
    url: "https://shani-ai.com/accessibility",
    type: "website",
    locale: "he_IL",
  },
};

export function generateMetadata(): Metadata {
  return localizedMeta("/accessibility", heMeta, {
    title: "Accessibility statement · Shani AI Creator",
    description: "Accessibility statement for Shani AI Creator: built to Israeli Standard IS 5568 and WCAG 2.1 Level AA, with an accessibility menu and a way to report any issue.",
  });
}

export default function AccessibilityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "הצהרת נגישות · Shani AI Creator",
  description:
    "הצהרת הנגישות של האתר של שני גורגוב, Shani AI Creator. האתר נבנה לפי התקן הישראלי ת״י 5568 והנחיות WCAG 2.1 ברמת AA, כולל תפריט נגישות וניווט מלא במקלדת.",
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

export default function AccessibilityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

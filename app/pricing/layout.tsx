import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "איך נקבעת ההשקעה · אתר, אוטומציה ו-AI לעסק | Shani AI Creator",
  description:
    "אין מחירון קבוע, יש תהליך שקוף: אבחון חינם, כיוונים ראשוניים תוך יום עסקים, שיחת היכרות קצרה, והצעה אישית עם מחיר סופי. עלויות כלים תמיד בנפרד ובשקיפות.",
  alternates: { canonical: "https://shani-ai.com/pricing" },
  openGraph: {
    title: "איך נקבעת ההשקעה · Shani AI Creator",
    description: "תהליך שקוף עד הצעה: אבחון חינם, כיוונים מותאמים, שיחה, ומחיר סופי בלי הפתעות.",
    url: "https://shani-ai.com/pricing",
    type: "website",
    locale: "he_IL",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

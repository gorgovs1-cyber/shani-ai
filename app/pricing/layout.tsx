import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מחירים · כמה עולה אתר, אוטומציה ו-AI לעסק | Shani AI Creator",
  description:
    "מחירי השקה: דף נחיתה מ-₪890, אתר תדמית קולנועי מ-₪1,900, מערכת AI מלאה מ-₪3,900, ומנוי Shani Care מ-₪250 לחודש. כל המחירים לפני מע\"מ. לא בטוחים? אבחון AI חינם.",
  alternates: { canonical: "https://shani-ai.com/pricing" },
  openGraph: {
    title: "מחירים · Shani AI Creator",
    description: "מחירון שקוף לאתרים, אוטומציות ומערכות AI לעסקים. נקודת כניסה ממנוי חודשי.",
    url: "https://shani-ai.com/pricing",
    type: "website",
    locale: "he_IL",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

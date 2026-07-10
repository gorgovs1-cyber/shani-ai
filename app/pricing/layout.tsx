import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מחירים · כמה עולה אתר, אוטומציה ו-AI לעסק | Shani AI Creator",
  description:
    "מחירון שקוף: דף נחיתה מ-₪2,400, אתר תדמית קולנועי מ-₪6,500, מערכת AI מלאה מ-₪12,000, ומנוי Shani Care מ-₪390 לחודש. כל המחירים לפני מע\"מ. לא בטוחים? אבחון AI חינם.",
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

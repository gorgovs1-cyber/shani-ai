import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מחירים · אתר, אוטומציה ו-AI לעסק | Shani AI Creator",
  description:
    "מחירון מלא ופומבי: דף נחיתה 1,500 ש\"ח, אתר 2,400 ש\"ח, בוט וואטסאפ 2,400 ש\"ח, סוכן AI 4,900 ש\"ח, מערכת מלאה 7,900 ש\"ח. כל המחירים סופיים, ועלויות כלים תמיד בנפרד ועל שמכם.",
  alternates: { canonical: "https://shani-ai.com/pricing" },
  openGraph: {
    title: "מחירים · Shani AI Creator",
    description: "מחירון מלא ופומבי לאתרים, אוטומציות וסוכני AI. מחירים סופיים, בלי הפתעות.",
    url: "https://shani-ai.com/pricing",
    type: "website",
    locale: "he_IL",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

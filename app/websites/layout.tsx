import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "בניית אתרים לעסקים · כמה עולה אתר לעסק | Shani AI Creator",
  description:
    "אתרים קולנועיים בקוד קאסטום Next.js: מהירים, עם SEO אמיתי, אנימציות GSAP ובעלות מלאה על הקוד. דף נחיתה מ-₪890, אתר תדמית מ-₪1,900. בונה אתרים לעסקים בתל אביב, ירושלים, חיפה ואונליין בכל הארץ.",
  alternates: { canonical: "https://shani-ai.com/websites" },
  openGraph: {
    title: "בניית אתרים לעסקים · Shani AI Creator",
    description: "אתרים קולנועיים בקוד קאסטום עם SEO אמיתי ואוטומציות. הקוד שלך.",
    url: "https://shani-ai.com/websites",
    type: "website",
    locale: "he_IL",
  },
};

export default function WebsitesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import { localizedMeta } from "@/lib/seo";

const heMeta: Metadata = {
  title: "בניית אתרים לעסקים | Shani AI",
  description:
    "אתר לעסק שמסביר מה אתם עושים ומקל על לקוחות לפנות אליכם: מהיר, מותאם למובייל, עם קידום בגוגל ובעלות מלאה על הקוד. מתחילים בבדיקת התאמה חינם.",
  alternates: { canonical: "https://shani-ai.com/websites" },
  openGraph: {
    title: "בניית אתרים לעסקים · Shani AI",
    description: "אתר שמסביר מה אתם עושים ומקל על לקוחות לפנות אליכם. הקוד נשאר שלכם.",
    url: "https://shani-ai.com/websites",
    type: "website",
    locale: "he_IL",
  },
};

export function generateMetadata(): Metadata {
  return localizedMeta("/websites", heMeta, {
    title: "Business websites | Shani AI",
    description: "A website that explains what you do and makes it easy for customers to contact you: fast, mobile-first, built for Google, and the code is yours.",
  });
}

export default function WebsitesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

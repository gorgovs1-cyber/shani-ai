import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "בניית אתרים לעסקים | Shani AI Creator",
  description:
    "אתר לעסק שמסביר מה אתם עושים ומקל על לקוחות לפנות אליכם: מהיר, מותאם למובייל, עם קידום בגוגל ובעלות מלאה על הקוד. מתחילים בבדיקת התאמה חינם.",
  alternates: { canonical: "https://shani-ai.com/websites" },
  openGraph: {
    title: "בניית אתרים לעסקים · Shani AI Creator",
    description: "אתר שמסביר מה אתם עושים ומקל על לקוחות לפנות אליכם. הקוד נשאר שלכם.",
    url: "https://shani-ai.com/websites",
    type: "website",
    locale: "he_IL",
  },
};

export default function WebsitesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

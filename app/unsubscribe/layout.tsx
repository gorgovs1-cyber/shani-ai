import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "הסרה מרשימת התפוצה · Shani AI Creator",
  description:
    "בקשה להסרה מרשימת הדיוור של Shani AI Creator (שני גורגוב). ממלאים כתובת אימייל, הבקשה נשלחת לשני והיא מסירה אתכם ידנית תוך 24 שעות.",
  alternates: { canonical: "https://shani-ai.com/unsubscribe" },
  // An unsubscribe page has no business in search results: it is a private
  // action reached from a link inside an email, not a landing page.
  robots: { index: false, follow: false },
  openGraph: {
    title: "הסרה מרשימת התפוצה · Shani AI Creator",
    description: "בקשה להסרה מרשימת הדיוור של Shani AI Creator (שני גורגוב).",
    url: "https://shani-ai.com/unsubscribe",
    type: "website",
    locale: "he_IL",
  },
};

export default function UnsubscribeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

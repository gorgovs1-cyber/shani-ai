import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "יועץ AI לעסקים · הטמעת AI בעסק ואבחון AI | Shani AI Creator",
  description:
    "ייעוץ והטמעת AI לעסקים: מיפוי תהליכים, אסטרטגיה וסקילים בעברית. שיחת אבחון שבסופה תכנית עבודה ברורה, מה להטמיע, באיזה סדר, ומה יחזיר הכי הרבה שעות. מתחילים באבחון AI חינם.",
  alternates: { canonical: "https://shani-ai.com/ai-consulting" },
  openGraph: {
    title: "יועץ AI לעסקים · Shani AI Creator",
    description: "מיפוי, אסטרטגיה והטמעת AI לעסקים, עם סקילים בעברית ותכנית עבודה ברורה.",
    url: "https://shani-ai.com/ai-consulting",
    type: "website",
    locale: "he_IL",
  },
};

export default function ConsultingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

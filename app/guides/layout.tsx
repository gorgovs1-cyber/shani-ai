import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מדריכים להורדה · AI, אוטומציות ואתרים לעסק | Shani AI Creator",
  description:
    "מדריכים חינמיים בעברית לעבודה עם Claude, בניית אוטומציות n8n, פרומפטים לעסק ותכנון תוכן. משאירים מייל פעם אחת ומקבלים גישה לכל המדריכים, כולל אלה שיתווספו.",
  alternates: { canonical: "https://shani-ai.com/guides" },
  openGraph: {
    title: "מדריכים להורדה · Shani AI Creator",
    description:
      "מדריכים חינמיים בעברית: Claude, אוטומציות n8n, פרומפטים לעסק ותכנון תוכן.",
    url: "https://shani-ai.com/guides",
    type: "website",
    locale: "he_IL",
  },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

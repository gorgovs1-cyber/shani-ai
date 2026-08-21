import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "בלוג · מחירים, אוטומציות ואתרים לעסק קטן | Shani AI Creator",
  description:
    "מאמרים בעברית לבעלי עסקים קטנים: כמה עולה אתר לעסק קטן, כמה עולה בוט וואטסאפ ואיך הוא עובד, ומאיפה מתחילים באוטומציה. מחירים אמיתיים, בלי טווחים מעורפלים.",
  alternates: { canonical: "https://shani-ai.com/blog" },
  openGraph: {
    title: "בלוג · Shani AI Creator",
    description:
      "מאמרים בעברית לבעלי עסקים קטנים: מחירי אתרים, בוטים לוואטסאפ ואוטומציה. מחירים אמיתיים, בלי טווחים מעורפלים.",
    url: "https://shani-ai.com/blog",
    type: "website",
    locale: "he_IL",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

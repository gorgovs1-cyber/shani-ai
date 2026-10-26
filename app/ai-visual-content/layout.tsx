import type { Metadata } from "next";
import { localizedMeta } from "@/lib/seo";
import PageSchema from "@/components/PageSchema";

const heMeta: Metadata = {
  title: "תוכן ויזואלי ב-AI: הדמיות, סרטונים וקטלוגים | Shani AI",
  description:
    "הדמיות מוצר ב-AI בסגנון המותג שלכם, סרטונים קצרים וקטלוג שמתעדכן לכל עונה. בלי צילום חוזר ובלי יום צילום. מתחילים בבדיקת התאמה חינם.",
  alternates: { canonical: "https://shani-ai.com/ai-visual-content" },
  openGraph: {
    title: "תוכן ויזואלי ב-AI: הדמיות, סרטונים וקטלוגים · Shani AI",
    description: "הדמיות מוצר בסגנון המותג שלכם, סרטונים קצרים וקטלוג שמתעדכן. בלי צילום חוזר.",
    url: "https://shani-ai.com/ai-visual-content",
    type: "website",
    locale: "he_IL",
  },
};

export function generateMetadata(): Metadata {
  return localizedMeta("/ai-visual-content", heMeta, {
    title: "AI visual content: renders, videos and catalogs | Shani AI",
    description: "Realistic AI product visualizations in your brand style, short videos and a catalog updated each season. No reshoots. Start with a free fit check.",
  });
}

export default function AiVisualContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageSchema
        path="/ai-visual-content"
        he={{ name: "תוכן ויזואלי ב-AI", description: "הדמיות מוצר ב-AI בסגנון המותג, סרטונים קצרים וקטלוג שמתעדכן, בלי צילום חוזר." }}
        en={{ name: "AI visual content", description: "AI product visualizations in your brand style, short videos and an updatable catalog, with no reshoots." }}
        service={{ he: "תוכן ויזואלי ב-AI: הדמיות מוצר, סרטונים וקטלוגים", en: "AI visual content: product visualizations, videos and catalogs" }}
      />
      {children}
    </>
  );
}

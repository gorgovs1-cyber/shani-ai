import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ייעוץ ותכנון מערכות לעסק | שני גורגוב",
  description:
    "עושים סדר בצרכים של העסק: מה לשפר באתר, אילו תהליכים אפשר להפוך לאוטומטיים ואיפה בינה מלאכותית יכולה לעזור. מתחילים באבחון חינמי אחד, ללא התחייבות.",
  alternates: { canonical: "https://shani-ai.com/ai-consulting" },
  openGraph: {
    title: "ייעוץ ותכנון לעסק | שני גורגוב",
    description: "מיפוי הצרכים של העסק ותכנון אתר, וואטסאפ ואוטומציות לפי מה שנחוץ בפועל.",
    url: "https://shani-ai.com/ai-consulting",
    type: "website",
    locale: "he_IL",
  },
};

export default function ConsultingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

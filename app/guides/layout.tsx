import type { Metadata } from "next";
import { localizedMeta } from "@/lib/seo";

const heMeta: Metadata = {
  title: "מדריכים להורדה · AI, אוטומציות ואתרים לעסק | Shani AI Creator",
  description:
    "מדריכים חינמיים בעברית לעבודה עם Claude: בניית אוטומציות n8n, פרומפטים מוכנים לעסק, תכנון תוכן ובניית אתר. מורידים ומיישמים.",
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

export function generateMetadata(): Metadata {
  return localizedMeta("/guides", heMeta, {
    title: "Free guides: AI, automations and websites | Shani AI Creator",
    description: "Free guides (in Hebrew) for working with Claude: n8n automations, ready-made business prompts, content planning and building a website.",
  });
}

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

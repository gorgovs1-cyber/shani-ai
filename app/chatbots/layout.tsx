import type { Metadata } from "next";
import { localizedMeta } from "@/lib/seo";

const heMeta: Metadata = {
  title: "צ׳אטבוטים וסוכני AI לעסק | Shani AI Creator",
  description:
    "בוט וואטסאפ, צ׳אטבוט לאתר, סוכן AI בעברית ובוט שמסנן פניות וקובע פגישות. בונים את הבוט שמתאים לעסק שלכם. מתחילים בבדיקת התאמה חינם.",
  alternates: { canonical: "https://shani-ai.com/chatbots" },
  openGraph: {
    title: "צ׳אטבוטים וסוכני AI לעסק · Shani AI Creator",
    description: "בוט וואטסאפ, צ׳אטבוט לאתר, סוכן AI בעברית ובוט שקובע פגישות.",
    url: "https://shani-ai.com/chatbots",
    type: "website",
    locale: "he_IL",
  },
};

export function generateMetadata(): Metadata {
  return localizedMeta("/chatbots", heMeta, {
    title: "AI chatbots and agents for business | Shani AI Creator",
    description: "A WhatsApp bot, a website chatbot, an AI agent in Hebrew and a bot that qualifies enquiries and books meetings. Start with a free fit check.",
  });
}

export default function ChatbotsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

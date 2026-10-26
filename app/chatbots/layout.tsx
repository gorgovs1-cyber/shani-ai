import type { Metadata } from "next";
import { localizedMeta } from "@/lib/seo";
import PageSchema from "@/components/PageSchema";

const heMeta: Metadata = {
  title: "צ׳אטבוטים וסוכני AI לעסק | Shani AI",
  description:
    "בוט וואטסאפ, צ׳אטבוט לאתר, סוכן AI בעברית, בוט שמסנן פניות וקובע פגישות, ובוט קולי. בונים את הבוט שמתאים לעסק שלכם. מתחילים בבדיקת התאמה חינם.",
  alternates: { canonical: "https://shani-ai.com/chatbots" },
  openGraph: {
    title: "צ׳אטבוטים וסוכני AI לעסק · Shani AI",
    description: "בוט וואטסאפ, צ׳אטבוט לאתר, סוכן AI בעברית, בוט שקובע פגישות ובוט קולי.",
    url: "https://shani-ai.com/chatbots",
    type: "website",
    locale: "he_IL",
  },
};

export function generateMetadata(): Metadata {
  return localizedMeta("/chatbots", heMeta, {
    title: "AI chatbots and agents for business | Shani AI",
    description: "A WhatsApp bot, a website chatbot, an AI agent in Hebrew, a bot that qualifies enquiries and books meetings, and a voice bot. Start with a free fit check.",
  });
}

export default function ChatbotsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageSchema path="/chatbots" he={{ name: "צ׳אטבוטים וסוכני AI לעסק", description: "בוט וואטסאפ, צ׳אטבוט לאתר, סוכן AI בעברית, בוט שקובע פגישות ובוט קולי." }} en={{ name: "AI chatbots and agents for business", description: "A WhatsApp bot, a website chatbot, an AI agent in Hebrew, a bot that books meetings, and a voice bot." }} service={{ he: "צ׳אטבוטים וסוכני AI לעסק", en: "AI chatbots and agents for business" }} />
      {children}
    </>
  );
}

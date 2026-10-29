import Hero from "@/components/Hero";
import { HomeAbout, HomeServices, HomeStart } from "@/components/HomeSections";
import TestimonialsSection from "@/components/TestimonialsSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageSchema from "@/components/PageSchema";

export default function Home() {
  return (
    <>
      <PageSchema
        path="/"
        he={{ name: "צ׳אטבוטים, אתרים ו-CRM בשילוב AI לעסק שלכם", description: "שני גורגוב בונה לעסקים בישראל ובארה״ב צ׳אטבוטים וסוכני AI, מערכת CRM מודולרית, אתרים ואוטומציות." }}
        en={{ name: "Chatbots, websites and CRM systems powered by AI", description: "AI chatbots and agents, a modular CRM, websites and automations for businesses in Israel and the US." }}
        extra={[
          {
            "@type": "ImageObject",
            "@id": "https://shani-ai.com/portrait.webp#image",
            contentUrl: "https://shani-ai.com/portrait.webp",
            url: "https://shani-ai.com/portrait.webp",
            name: "שני גורגוב, Shani AI Creator",
            caption: "שני גורגוב, Shani AI Creator",
            width: 1448,
            height: 1086,
            encodingFormat: "image/webp",
            representativeOfPage: true,
          },
        ]}
      />
      <Hero />
      <HomeAbout />
      <HomeServices />
      <HomeStart />
      <TestimonialsSection />
      <Contact />
      <Footer />
    </>
  );
}

import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import ChatShowcase from "@/components/ChatShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";
import WorkGrid from "@/components/WorkGrid";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WorkingTogether from "@/components/WorkingTogether";
import PageSchema from "@/components/PageSchema";

export default function Home() {
  return (
    <>
      <PageSchema
        path="/"
        he={{ name: "צ׳אטבוטים, אתרים ו-CRM בשילוב AI לעסק שלכם", description: "שני גורגוב בונה לעסקים בישראל ובארה״ב צ׳אטבוטים וסוכני AI, מערכת CRM מודולרית, אתרים שמביאים פניות ואוטומציות." }}
        en={{ name: "Chatbots, websites and CRM systems powered by AI", description: "AI chatbots and agents, a modular CRM, websites that bring enquiries and automations for businesses in Israel and the US." }}
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
      <Marquee />
      <Services />
      <ChatShowcase />
      <WorkGrid />
      <About />
      <WorkingTogether />
      <TestimonialsSection />
      <Contact />
      <Footer />
    </>
  );
}

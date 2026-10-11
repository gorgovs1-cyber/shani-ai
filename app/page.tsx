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

export default function Home() {
  return (
    <>
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

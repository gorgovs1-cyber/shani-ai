import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import TestimonialsSection from "@/components/TestimonialsSection";
import WorkGrid from "@/components/WorkGrid";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <TestimonialsSection />
      <WorkGrid />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

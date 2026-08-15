import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Process from "@/components/Process";
import TestimonialsSection from "@/components/TestimonialsSection";
import WorkGrid from "@/components/WorkGrid";
import About from "@/components/About";
import LeadMagnet from "@/components/LeadMagnet";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <TestimonialsSection />
      <WorkGrid />
      <About />
      <LeadMagnet />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}

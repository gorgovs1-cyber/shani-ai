import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WorkGrid from "@/components/WorkGrid";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
import LeadMagnet from "@/components/LeadMagnet";
import CTAStrip from "@/components/CTAStrip";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <WorkGrid />
      <Services />
      <About />
      <Process />
      <LeadMagnet />
      <CTAStrip />
      <TestimonialsSection />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}

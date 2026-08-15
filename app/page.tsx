import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Problem from "@/components/Problem";
import Services from "@/components/Services";
import Journey from "@/components/Journey";
import TestimonialsSection from "@/components/TestimonialsSection";
import WorkGrid from "@/components/WorkGrid";
import About from "@/components/About";
import Process from "@/components/Process";
import PriceAnchor from "@/components/PriceAnchor";
import LeadMagnet from "@/components/LeadMagnet";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Problem />
      <Services />
      <Journey />
      <TestimonialsSection />
      <WorkGrid />
      <About />
      <Process />
      <PriceAnchor />
      <LeadMagnet />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}

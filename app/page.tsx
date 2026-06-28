import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WorkGrid from "@/components/WorkGrid";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import LeadMagnet from "@/components/LeadMagnet";
import CTAStrip from "@/components/CTAStrip";
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
      <Testimonials />
      <LeadMagnet />
      <CTAStrip />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}

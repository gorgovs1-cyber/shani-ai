import Hero         from "@/components/Hero";
import WorkGrid     from "@/components/WorkGrid";
import Services     from "@/components/Services";
import ROICalculator from "@/components/ROICalculator";
import Process      from "@/components/Process";
import FAQ          from "@/components/FAQ";
import About        from "@/components/About";
import Contact      from "@/components/Contact";
import Footer       from "@/components/Footer";
import CTAStrip     from "@/components/CTAStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkGrid />
      <Services />
      <ROICalculator />
      <Process />
      <CTAStrip />
      <FAQ />
      <About />
      <CTAStrip text="מוכנה להתחיל? בואי נדבר." />
      <Contact />
      <Footer />
    </>
  );
}

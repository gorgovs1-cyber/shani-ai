import Hero          from "@/components/Hero";
import ROICalculator from "@/components/ROICalculator";
import TrustedBy     from "@/components/TrustedBy";
import WorkGrid      from "@/components/WorkGrid";
import Testimonials  from "@/components/Testimonials";
import BlogSection   from "@/components/BlogSection";
import Services      from "@/components/Services";
import Process       from "@/components/Process";
import FAQ           from "@/components/FAQ";
import About         from "@/components/About";
import Contact       from "@/components/Contact";
import Footer        from "@/components/Footer";
import CTAStrip      from "@/components/CTAStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <ROICalculator />
      <TrustedBy />
      <WorkGrid />
      <Testimonials />
      <Services />
      <Process />
      <CTAStrip />
      <FAQ />
      <About />
      <BlogSection />
      <CTAStrip text="מוכנה להתחיל? בואי נדבר." />
      <Contact />
      <Footer />
    </>
  );
}

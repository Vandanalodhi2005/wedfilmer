import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { BidirectionalMarquee } from "@/components/sections/BidirectionalMarquee";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <StructuredData />
      <SmoothScroll />
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
        <BidirectionalMarquee />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        {/* <ProcessSection /> */}
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

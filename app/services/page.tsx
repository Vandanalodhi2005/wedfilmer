import { Navbar } from "@/components/Navbar";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services - Wed Filmer Photography",
  description: "Professional wedding photography, pre-wedding shoots, cinematic videography, corporate events, birthday celebrations, and family functions. Premium photography services in Mumbai.",
  openGraph: {
    title: "Our Services - Wed Filmer Photography",
    description: "Professional wedding and event photography services.",
    url: "https://wedfilmer.com/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero 
          title="Our Services" 
          subtitle="What We Offer" 
          imageSrc="https://suvoweddings.com/wedding-photographer-siliguri-bengali-couple-mandap-suvo-choudhury.jpg"
        />
        
        {/* Intro text */}
        <div className="bg-primary pt-8 md:pt-12 pb-4">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-muted text-base md:text-lg leading-relaxed">
              From intimate pre-wedding shoots to grand destination celebrations, we offer comprehensive photography and cinematography services tailored to your unique story.
            </p>
          </div>
        </div>

        <ServicesSection />
        <WhyChooseUsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

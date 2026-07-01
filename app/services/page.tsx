import { Navbar } from "@/components/Navbar";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { Footer } from "@/components/Footer";
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
      <main className="pt-20">
        <ServicesSection />
        <WhyChooseUsSection />
      </main>
      <Footer />
    </>
  );
}

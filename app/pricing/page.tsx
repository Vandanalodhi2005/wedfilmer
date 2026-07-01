import { Navbar } from "@/components/Navbar";
import { PricingSection } from "@/components/sections/PricingSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Packages - Wed Filmer Photography",
  description: "Affordable wedding photography packages starting from ₹25,000. Silver, Gold, and Platinum packages with flexible options. View our transparent pricing and FAQs.",
  openGraph: {
    title: "Pricing & Packages - Wed Filmer Photography",
    description: "Affordable wedding photography packages with flexible options.",
    url: "https://wedfilmer.com/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <PricingSection />
        <ProcessSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

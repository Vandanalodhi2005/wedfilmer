import { Navbar } from "@/components/Navbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Wed Filmer Photography",
  description: "Learn about Wed Filmer's journey in wedding photography. With over a decade of experience and 350+ events covered, we capture love stories that last forever.",
  openGraph: {
    title: "About Us - Wed Filmer Photography",
    description: "Learn about Wed Filmer's journey in wedding photography.",
    url: "https://wedfilmer.in/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero 
          title="About Us" 
          subtitle="Behind The Lens" 
          imageSrc="https://suvoweddings.com/pre-wedding-beach-couple-suvo-weddings.jpg"
        />
        
        {/* Philosophy Section */}
        <section className="py-10 md:py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-8">
              We Don't Just Take Photos,<br className="hidden md:block" />
              <span className="text-accent">We Craft Legacy.</span>
            </h2>
            <p className="text-muted text-base md:text-lg leading-relaxed mb-6">
              Wed Filmer was born from a singular passion: to preserve the raw, unscripted emotion of your most important days. We believe that wedding photography isn't about staged poses; it's about the stolen glances, the joyful tears, and the quiet moments of connection.
            </p>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              Our cinematic approach blends documentary storytelling with elegant editorial portraiture, ensuring that every frame we deliver is a timeless piece of art you will cherish for generations.
            </p>
          </div>
        </section>

        <AboutSection />
        <TrustSection />
      </main>
      <Footer />
    </>
  );
}

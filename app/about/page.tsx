import { Navbar } from "@/components/Navbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Wed Filmer Photography",
  description: "Learn about Wed Filmer's journey in wedding photography. With over a decade of experience and 250+ events covered, we capture love stories that last forever.",
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
      <main className="pt-20">
        <AboutSection />
        <TrustSection />
      </main>
      <Footer />
    </>
  );
}

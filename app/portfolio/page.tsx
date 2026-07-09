import { Navbar } from "@/components/Navbar";
import { PortfolioHero } from "@/components/sections/PortfolioHero";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { VideoGallerySection } from "@/components/sections/VideoGallerySection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Wed Filmer Photography",
  description: "Browse our stunning portfolio of wedding photography, pre-wedding shoots, corporate events, and family celebrations. View our best work and creative photography style.",
  openGraph: {
    title: "Portfolio - Wed Filmer Photography",
    description: "Browse our stunning portfolio of wedding and event photography.",
    url: "https://wedfilmer.com/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <PortfolioHero />
        <PortfolioSection />
        <VideoGallerySection />
      </main>
      <Footer />
    </>
  );
}

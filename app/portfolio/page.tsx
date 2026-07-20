import { Navbar } from "@/components/Navbar";
import { PortfolioHero } from "@/components/sections/PortfolioHero";
import { PortfolioMasonryGrid } from "@/components/sections/PortfolioMasonryGrid";
import { VideoGallerySection } from "@/components/sections/VideoGallerySection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Wed Filmer | Wedding & Event Photography Gallery",
  description:
    "Browse our stunning portfolio of wedding photography, pre-wedding shoots, corporate events, and family celebrations. Discover cinematic moments captured with artistic precision by Wed Filmer.",
  keywords: [
    "wedding photography portfolio",
    "pre-wedding shoot gallery",
    "corporate event photography",
    "family photography portfolio",
    "cinematic wedding photos",
    "Wed Filmer portfolio",
  ],
  openGraph: {
    title: "Portfolio - Wed Filmer | Wedding & Event Photography Gallery",
    description:
      "Browse our stunning portfolio of wedding and event photography. Timeless moments, cinematic storytelling.",
    url: "https://wedfilmer.com/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <PortfolioHero />
        <PortfolioMasonryGrid />
        <VideoGallerySection />
      </main>
      <Footer />
    </>
  );
}


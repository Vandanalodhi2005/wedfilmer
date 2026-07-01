import { Navbar } from "@/components/Navbar";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
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
      <main className="pt-20">
        <PortfolioSection />
      </main>
      <Footer />
    </>
  );
}

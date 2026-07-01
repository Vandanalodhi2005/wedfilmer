import { Navbar } from "@/components/Navbar";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Testimonials - Wed Filmer Photography",
  description: "Read what our clients say about Wed Filmer. With 4.9★ rating from 1000+ happy clients, discover why couples and families trust us with their special moments.",
  openGraph: {
    title: "Client Testimonials - Wed Filmer Photography",
    description: "Read reviews from 1000+ happy clients. 4.9★ rating.",
    url: "https://wedfilmer.com/testimonials",
  },
};

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}

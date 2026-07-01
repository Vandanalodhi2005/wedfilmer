import { Navbar } from "@/components/Navbar";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Wed Filmer Photography",
  description: "Get in touch with Wed Filmer for wedding photography inquiries. Call us at +91 98765 43210 or visit our studio in Bandra West, Mumbai. Book your session today!",
  openGraph: {
    title: "Contact Us - Wed Filmer Photography",
    description: "Get in touch for wedding photography inquiries.",
    url: "https://wedfilmer.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

import { Navbar } from "@/components/Navbar";
import { ContactPageContent } from "@/components/sections/ContactPageContent";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Wed Filmer Photography",
  description:
    "Get in touch with Wed Filmer for wedding photography inquiries. Call us at +91 7978681650 or reach us from anywhere in Odisha, India. Let's tell your Story!",
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
      <main>
        <PageHero 
          title="Contact Us" 
          subtitle="Let's Connect" 
          imageSrc="https://suvoweddings.com/pre-wedding-garden-couple-siliguri-suvo-weddings.jpg"
        />
        <ContactPageContent />
      </main>
      <Footer />
    </>
  );
}

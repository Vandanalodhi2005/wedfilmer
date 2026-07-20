"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type ImageItem = {
  _id: string;
  url: string;
  publicId: string;
  category: "Wedding" | "Pre-Wedding" | "Corporate" | "Family";
};

export function PortfolioHero() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/images", { cache: "no-store" });
        const data = await response.json();
        if (data.success && data.data?.length > 0) {
          setImages(data.data.slice(0, 5)); // get top 5 images to cycle
        }
      } catch (error) {
        console.error("Failed to load portfolio hero images", error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Use dynamic images from API or fallback
  const activeImage = images.length > 0 
    ? images[currentIndex].url 
    : "https://suvoweddings.com/wedding-photographer-siliguri-bengali-bride-portrait-suvo-weddings.jpg";

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center bg-primary overflow-hidden">
      
      {/* ── Right side slanted image container (Desktop) ── */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-[60%] lg:w-[55%] z-0 hidden md:block"
        style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage}
              alt="Portfolio showcase"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            {/* Subtle dark overlay to ensure image doesn't clash too hard with text */}
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Mobile Background ── */}
      <div className="absolute inset-0 z-0 md:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage}
              alt="Portfolio showcase"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* Dark overlay for mobile to ensure text readability */}
            <div className="absolute inset-0 bg-primary/85" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Left side content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl md:max-w-lg lg:max-w-2xl pt-20 pb-10"
        >
          <p className="text-accent text-xs md:text-sm tracking-[0.25em] font-semibold uppercase mb-4 md:mb-6">
            Timeless & Cinematic
          </p>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-text leading-[1.1] mb-6">
            Hi, we are <span className="text-accent">Wed Filmer</span> This is our favorite work.
          </h1>
          
          <p className="text-muted text-base md:text-lg mb-10 max-w-md lg:max-w-lg leading-relaxed">
            Explore a curated collection of weddings, pre-wedding moments, and destination celebrations captured with elegance.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="#portfolio-grid" 
              className="bg-accent text-primary px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-accent/90 transition-all shadow-lg hover:-translate-y-0.5"
            >
              View Gallery
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-accent text-accent px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-accent hover:text-primary transition-all hover:-translate-y-0.5"
            >
              Hire Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_ITEMS,
  type PortfolioCategory,
} from "@/lib/constants";
import { X, ZoomIn } from "lucide-react";

// Unsplash wedding photography images
const portfolioImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop", // Wedding couple
  "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=600&fit=crop", // Pre-wedding
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=800&fit=crop", // Corporate
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop", // Beach wedding
  "https://images.unsplash.com/photo-1464190789038-1903b2eeb0e1?w=800&h=1000&fit=crop", // Birthday
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=800&fit=crop", // Family
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&h=1000&fit=crop", // Engagement
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", // Corporate event
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=800&fit=crop", // Royal wedding
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop", // Family portrait
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=1000&fit=crop", // Carnival
  "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&h=600&fit=crop", // Mountain wedding
];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("All");
  const [lightboxId, setLightboxId] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  const lightboxItem = PORTFOLIO_ITEMS.find((item) => item.id === lightboxId);

  const closeLightbox = useCallback(() => setLightboxId(null), []);

  return (
    <section id="portfolio" className="py-20 md:py-32 relative" aria-label="Portfolio gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Our Featured Work" subtitle="Portfolio" />

        {/* Category Filters */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-accent text-primary shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                    : "glass text-muted hover:text-text hover:border-accent/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="break-inside-avoid"
              >
                <button
                  onClick={() => setLightboxId(item.id)}
                  className="relative w-full group rounded-xl overflow-hidden block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label={`View ${item.title}`}
                >
                  {/* Image with gradient overlay */}
                  <div
                    className={`relative ${
                      item.aspect === "portrait"
                        ? "aspect-[3/4]"
                        : item.aspect === "square"
                        ? "aspect-square"
                        : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={portfolioImages[idx % portfolioImages.length]}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-30 mix-blend-multiply`} />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center">
                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/20 flex items-center justify-center">
                        <ZoomIn size={20} className="text-accent" />
                      </div>
                      <p className="text-text font-heading font-bold text-lg">
                        {item.title}
                      </p>
                      <p className="text-accent text-sm mt-1">{item.category}</p>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-label={`Viewing ${lightboxItem.title}`}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 p-2 text-muted hover:text-text transition-colors"
                aria-label="Close lightbox"
              >
                <X size={28} />
              </button>

              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image
                  src={portfolioImages[(lightboxItem.id - 1) % portfolioImages.length]}
                  alt={lightboxItem.title}
                  fill
                  className="object-cover"
                  sizes="90vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${lightboxItem.gradient} opacity-20 mix-blend-multiply`} />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-heading text-3xl font-bold mb-2">
                    {lightboxItem.title}
                  </p>
                  <p className="text-white/60 text-base">{lightboxItem.category}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

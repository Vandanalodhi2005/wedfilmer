
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PORTFOLIO_CATEGORIES, type PortfolioCategory } from "@/lib/constants";

type ImageItem = {
  _id: string;
  url: string;
  publicId: string;
  category: 'Wedding' | 'Pre-Wedding' | 'Corporate' | 'Family';
  createdAt: string;
  updatedAt: string;
};

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("All");
  const [images, setImages] = useState<ImageItem[]>([]);
  const [showAllImages, setShowAllImages] = useState(false);

  const fetchImages = async () => {
    let url = '/api/images';
    if (activeCategory !== 'All') {
      url += `?category=${activeCategory}`;
    }
    fetch(url, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data.success) setImages(data.data || []);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchImages();
  }, [activeCategory]);

  // Reset showAllImages when category changes
  useEffect(() => {
    setShowAllImages(false);
  }, [activeCategory]);

  const displayedImages = showAllImages ? images : images.slice(0, 9);

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden py-20 md:py-32"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(248,250,252,0.95) 0%, rgba(238,242,255,0.95) 45%, rgba(253,242,248,0.95) 100%)"
      }}
      aria-label="Portfolio gallery"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.16),_transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-gray-500">Our Portfolio</p>
            <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">Featured Work</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
              A polished collection of timeless moments, presented in their true form and emotion.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white shadow-[0_16px_40px_-18px_rgba(15,23,42,0.8)]"
                    : "border border-white/70 bg-white/80 text-slate-700 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.45)] backdrop-blur hover:-translate-y-0.5 hover:bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {images.length > 0 ? (
          <>
            <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
              {displayedImages.map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: idx * 0.06 }}
                  className="group mb-5 break-inside-avoid"
                >
                  <div className="overflow-hidden rounded-[1.5rem] bg-white/70 shadow-[0_25px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1">
                    <img
                      src={item.url}
                      alt={`${item.category} portfolio image`}
                      className="block h-auto w-full rounded-[1.35rem] object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {images.length > 9 && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setShowAllImages(!showAllImages)}
                  className="rounded-full bg-gray-900 px-8 py-3 font-medium text-white transition-colors hover:bg-gray-800"
                >
                  {showAllImages ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-3xl border border-gray-200 bg-white/80 py-24 text-center shadow-sm backdrop-blur">
            <p className="text-lg text-gray-500">No images yet</p>
            <p className="mt-2 text-sm text-gray-400">Check back soon for our latest work</p>
          </div>
        )}
      </div>
    </section>
  );
}

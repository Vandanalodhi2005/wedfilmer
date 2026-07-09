
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
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success) setImages(data.data);
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
    <section id="portfolio" className="py-20 md:py-32 relative bg-gray-50" aria-label="Portfolio gallery">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500 mb-4">Our Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Featured Work</h2>
          </div>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid Layout - Masonry Style */}
        {images.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {displayedImages.map((item, idx) => {
                // Create varying aspect ratios for visual interest
                const aspectClasses = [
                  "aspect-square",
                  "aspect-[4/5]",
                  "aspect-[3/4]",
                  "aspect-[5/4]",
                  "aspect-[4/3]"
                ];
                const randomAspect = aspectClasses[idx % aspectClasses.length];
                
                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: idx * 0.08 }}
                    className="relative group overflow-hidden rounded-xl shadow-sm"
                  >
                    <img
                      src={item.url}
                      alt={item.category}
                      className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${randomAspect}`}
                      loading="lazy"
                    />
                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-400" />
                  </motion.div>
                );
              })}
            </div>

            {/* Show More Button */}
            {images.length > 9 && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAllImages(!showAllImages)}
                  className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  {showAllImages ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">No images yet</p>
            <p className="text-gray-400 text-sm mt-2">Check back soon for our latest work</p>
          </div>
        )}
      </div>
    </section>
  );
}

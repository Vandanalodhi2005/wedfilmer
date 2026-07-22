"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type ImageItem = {
  _id?: string;
  url: string;
  publicId?: string;
  category: "Wedding" | "Pre-Wedding" | "Corporate" | "Family";
  label?: string;
  alt?: string;
};

type FilterCategory = "all" | "Wedding" | "Pre-Wedding" | "Corporate" | "Family";

const FILTER_TABS: { label: string; value: FilterCategory }[] = [
  { label: "All Work", value: "all" },
  { label: "Weddings", value: "Wedding" },
  { label: "Pre-Wedding", value: "Pre-Wedding" },
  { label: "Corporate", value: "Corporate" },
  { label: "Family", value: "Family" },
];

export function PortfolioSection() {
  const [dbImages, setDbImages] = useState<ImageItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/images", { cache: "no-store" });
        const data = await res.json();
        if (data.success) {
          setDbImages(data.data || []);
        }
      } catch (err) {
        console.error("Failed to load portfolio images:", err);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchImages();
  }, []);

  // Use a subset of the premium fallback images for the homepage
  const fallbackImages: ImageItem[] = [
    { url: "https://suvoweddings.com/pre-wedding-howrah-bridge-kolkata-suvo-weddings.jpg", category: "Pre-Wedding" },
    { url: "https://suvoweddings.com/pre-wedding-garden-couple-siliguri-suvo-weddings.jpg", category: "Pre-Wedding" },
    { url: "https://suvoweddings.com/wedding-photographer-siliguri-reception-bokeh-couple-suvo-weddings.jpg", category: "Wedding" },
    { url: "https://suvoweddings.com/wedding-photographer-siliguri-bengali-couple-mandap-suvo-choudhury.jpg", category: "Wedding" },
    { url: "https://suvoweddings.com/wedding-photographer-siliguri-bengali-bride-portrait-suvo-weddings.jpg", category: "Wedding" },
    { url: "https://suvoweddings.com/pre-wedding-beach-couple-suvo-weddings.jpg", category: "Pre-Wedding" },
    { url: "https://suvoweddings.com/wedding-photographer-siliguri-shubho-drishti-suvo-choudhury.jpg", category: "Wedding" },
    { url: "https://suvoweddings.com/wedding-photographer-siliguri-gaye-holud-couple-suvo-choudhury.jpg", category: "Family" },
    { url: "https://suvoweddings.com/wedding-photographer-siliguri-bride-entry-sparklers-suvo-weddings.jpg", category: "Family" },
    { url: "https://suvoweddings.com/wedding-photographer-siliguri-night-reception-couple-suvo-weddings.jpg", category: "Wedding" },
    { url: "https://suvoweddings.com/pre-wedding-forest-couple-darjeeling-suvo-weddings.jpg", category: "Pre-Wedding" },
    { url: "https://suvoweddings.com/wedding-photographer-siliguri-bengali-wedding-joy-suvo-choudhury.jpg", category: "Family" },
  ];

  const allImages: ImageItem[] = dbImages.length > 0 ? dbImages : fallbackImages;

  const filteredImages =
    activeFilter === "all"
      ? allImages
      : allImages.filter((img) => img.category === activeFilter);

  // Limit to 9 images
  const displayedImages = filteredImages.slice(0, 9);
  const hasMore = filteredImages.length > 9;

  /* ── Lightbox ── */
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const navigateLightbox = useCallback(
    (dir: number) => {
      setLightboxIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return displayedImages.length - 1;
        if (next >= displayedImages.length) return 0;
        return next;
      });
    },
    [displayedImages.length]
  );

  /* Keyboard navigation */
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, navigateLightbox]);

  return (
    <>
      <section
        id="portfolio"
        className={`relative py-16 md:py-24 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.03)_0%,_transparent_70%)] ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10 text-center"
          >
            <p className="portfolio-masonry-label">Our Portfolio</p>
            <h2 className="portfolio-masonry-title">Signature Stories</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              A polished collection of timeless moments, presented in their true form and emotion.
            </p>
          </motion.div>

          {/* ── Filter Tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 flex flex-wrap justify-center gap-2 relative"
          >
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`portfolio-filter-btn relative ${
                  activeFilter === tab.value ? "active" : ""
                }`}
              >
                {tab.label}
                {activeFilter === tab.value && (
                  <motion.div
                    layoutId="portfolio-filter-underline"
                    className="absolute -bottom-1 left-2 right-2 h-0.5 bg-accent rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* ── Masonry Grid ── */}
          {displayedImages.length > 0 ? (
            <motion.div layout className="portfolio-masonry-grid">
              <AnimatePresence>
                {displayedImages.map((item, index) => {
                    const frameClass = `frame-${(index % 5) + 1}`;
                    const effectClasses = index % 3 === 0 ? 'fold-tr' : (index % 3 === 1 ? 'fold-bl' : 'rough');
                    return (
                      <motion.div
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    key={item._id || `${item.url}-${index}`}
                    className="portfolio-masonry-item"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="portfolio-masonry-item-inner">
                      <img
                        src={item.url}
                        alt={`${item.category} photography`}
                        loading="lazy"
                      />
                      <div className="portfolio-masonry-overlay">
                        <span>{item.category}</span>
                      </div>
                    </div>
                  </motion.div>
                    );
                  })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="rounded-3xl glass-card py-24 text-center">
              <p className="text-lg text-muted">No images yet</p>
              <p className="mt-2 text-sm text-muted/70">Check back soon for our latest work</p>
            </div>
          )}

          {/* ── Show More Button ── */}
          {hasMore && (
            <div className="mt-12 flex justify-center">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent text-primary font-semibold text-sm hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Show More
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxOpen && displayedImages[lightboxIndex] && (
        <div className="portfolio-lightbox" onClick={closeLightbox}>
          <button
            className="portfolio-lb-close"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <button
            className="portfolio-lb-nav portfolio-lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox(-1);
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          <img
            src={displayedImages[lightboxIndex].url}
            alt={`${displayedImages[lightboxIndex].category} photography`}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="portfolio-lb-nav portfolio-lb-next"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox(1);
            }}
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>

          <div className="portfolio-lb-counter">
            {lightboxIndex + 1} / {displayedImages.length}
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type ImageItem = {
  _id: string;
  url: string;
  publicId: string;
  category: "Wedding" | "Pre-Wedding" | "Corporate" | "Family";
  createdAt: string;
  updatedAt: string;
};

type FilterCategory = "all" | "Wedding" | "Pre-Wedding" | "Corporate" | "Family";

const FILTER_TABS: { label: string; value: FilterCategory }[] = [
  { label: "All Work", value: "all" },
  { label: "Weddings", value: "Wedding" },
  { label: "Pre-Wedding", value: "Pre-Wedding" },
  { label: "Corporate", value: "Corporate" },
  { label: "Family", value: "Family" },
];

export function PortfolioMasonryGrid() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/images", { cache: "no-store" });
        const data = await res.json();
        if (data.success) setImages(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchImages();
  }, []);

  const filteredImages =
    activeFilter === "all"
      ? images
      : images.filter((img) => img.category === activeFilter);

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
        if (next < 0) return filteredImages.length - 1;
        if (next >= filteredImages.length) return 0;
        return next;
      });
    },
    [filteredImages.length]
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
        className={`relative py-20 md:py-28 transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          {/* ── Section Header ── */}
          <div className="mb-10 text-center">
            <p className="portfolio-masonry-label">Our Work</p>
            <h2 className="portfolio-masonry-title">
              Wedding Photography Portfolio
            </h2>
          </div>

          {/* ── Filter Tabs ── */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`portfolio-filter-btn ${
                  activeFilter === tab.value ? "active" : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Masonry Grid ── */}
          {filteredImages.length > 0 ? (
            <div className="portfolio-masonry-grid">
              {filteredImages.map((item, index) => (
                <div
                  key={item._id}
                  className="portfolio-masonry-item"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={item.url}
                    alt={`${item.category} photography by Wed Filmer`}
                    loading="lazy"
                  />
                  <div className="portfolio-masonry-overlay">
                    <span>{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl glass-card py-24 text-center">
              <p className="text-lg text-muted">No images yet</p>
              <p className="mt-2 text-sm text-muted/70">
                Check back soon for our latest work
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxOpen && filteredImages[lightboxIndex] && (
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
            src={filteredImages[lightboxIndex].url}
            alt={`${filteredImages[lightboxIndex].category} photography`}
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
            {lightboxIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </>
  );
}

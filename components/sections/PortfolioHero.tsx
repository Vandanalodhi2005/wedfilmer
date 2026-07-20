"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";

type ImageItem = {
  _id: string;
  url: string;
  publicId: string;
  category: "Wedding" | "Pre-Wedding" | "Corporate" | "Family";
};

const getImageName = (url: string) => {
  try {
    const rawName = url.split("/").pop() || "Portfolio Image";
    const cleanName = rawName.split("?")[0].split(".")[0].replace(/[-_]+/g, " ");
    return decodeURIComponent(cleanName);
  } catch {
    return "Portfolio Image";
  }
};

export function PortfolioHero() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const { scrollY } = useScrollPosition();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/images", { cache: "no-store" });
        const data = await response.json();
        if (data.success) {
          setImages(data.data || []);
        }
      } catch (error) {
        console.error("Failed to load portfolio hero images", error);
      }
    };

    fetchImages();
  }, []);

  const featuredImages = images.slice(0, 4);

  const activeIndex = useMemo(() => {
    if (featuredImages.length === 0) return 0;
    return Math.min(Math.floor(scrollY / 150), featuredImages.length - 1);
  }, [scrollY, featuredImages.length]);

  const activeImage = featuredImages[activeIndex] || null;
  const imageName = activeImage ? getImageName(activeImage.url) : "Portfolio Image";
  const offset = Math.min(scrollY / 4, 80);

  return (
    <section className="relative overflow-hidden bg-[#050505] py-24 md:py-32 lg:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.18),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_30%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-accent/80">
            Our Portfolio
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-[0.95] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Curated stories in light, emotion, and timeless detail.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
            Discover a refined collection of weddings, pre-wedding moments, and destination celebrations captured with cinematic elegance.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/20"
            >
              Explore Gallery
              <ArrowRight size={16} />
            </Link>
            <div className="text-sm uppercase tracking-[0.3em] text-white/45">
              Admin-powered gallery
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-gradient-to-br from-accent/10 via-transparent to-white/5 blur-3xl" />

          <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
            <motion.div
              style={{ transform: `translate3d(-18px, ${offset * 0.3}px, 0) scale(0.96)` }}
              className="col-span-2 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 md:col-span-1 md:row-span-2"
            >
              {featuredImages[0] ? (
                <div className="relative h-[320px] sm:h-[430px] md:h-[500px]">
                  <Image
                    src={featuredImages[0].url}
                    alt={getImageName(featuredImages[0].url)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="flex h-[320px] items-end justify-start bg-[linear-gradient(135deg,_rgba(212,175,55,0.35),_rgba(255,255,255,0.06))] p-6 sm:h-[430px] md:h-[500px]">
                  <div className="rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm uppercase tracking-[0.3em] text-white/70">
                    Gallery Preview
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              style={{ transform: `translate3d(-10px, ${offset * 0.55}px, 0) scale(0.92)` }}
              className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5"
            >
              {featuredImages[1] ? (
                <div className="relative h-[170px] sm:h-[200px]">
                  <Image
                    src={featuredImages[1].url}
                    alt={getImageName(featuredImages[1].url)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 45vw, 25vw"
                  />
                </div>
              ) : (
                <div className="flex h-[170px] items-end bg-[linear-gradient(135deg,_rgba(255,255,255,0.08),_rgba(212,175,55,0.2))] p-4 sm:h-[200px]">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/70">Featured</span>
                </div>
              )}
            </motion.div>

            <motion.div
              style={{ transform: `translate3d(12px, ${offset * 0.35}px, 0) scale(0.94)` }}
              className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5"
            >
              {featuredImages[2] ? (
                <div className="relative h-[170px] sm:h-[200px]">
                  <Image
                    src={featuredImages[2].url}
                    alt={getImageName(featuredImages[2].url)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 45vw, 25vw"
                  />
                </div>
              ) : (
                <div className="flex h-[170px] items-end bg-[linear-gradient(135deg,_rgba(212,175,55,0.2),_rgba(255,255,255,0.08))] p-4 sm:h-[200px]">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/70">Moments</span>
                </div>
              )}
            </motion.div>

            {featuredImages[3] && (
              <motion.div
                style={{ transform: `translate3d(0, ${offset * 0.75}px, 0) scale(0.98)` }}
                className="col-span-2 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5"
              >
                <div className="relative h-[170px] sm:h-[210px]">
                  <Image
                    src={featuredImages[3].url}
                    alt={getImageName(featuredImages[3].url)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            )}
          </div>

          <div className="mt-8 rounded-full border border-white/10 bg-black/50 px-5 py-3 text-sm text-white/90 shadow-[0_30px_80px_rgba(0,0,0,0.17)] backdrop-blur-sm">
            <div className="text-[0.72rem] uppercase tracking-[0.35em] text-white/40">Current image</div>
            <div className="mt-1 text-base font-semibold text-white">{imageName}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

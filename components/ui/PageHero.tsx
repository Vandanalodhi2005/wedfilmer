"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useScrollPosition } from "@/hooks/useScrollPosition";

interface PageHeroProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
  align?: "left" | "center";
}

export function PageHero({
  title,
  subtitle,
  imageSrc = "https://suvoweddings.com/wedding-photographer-siliguri-reception-bokeh-couple-suvo-weddings.jpg",
  align = "center",
}: PageHeroProps) {
  const { scrollY } = useScrollPosition();
  const yOffset = Math.min(scrollY * 0.4, 150);

  return (
    <section className="relative h-[40vh] min-h-[250px] md:h-[45vh] flex items-center overflow-hidden bg-primary pt-16">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${yOffset}px)` }}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/95" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-1 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.15)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
        >
          <p className="text-accent text-xs md:text-sm tracking-[0.3em] font-semibold uppercase mb-4">
            {subtitle}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-text leading-[1.1]">
            {title}
          </h1>
          {align === "center" && (
            <div className="mt-8 flex justify-center">
              <div className="w-12 h-[1px] bg-accent/50" />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

export function PortfolioHero() {
  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          {/* Placeholder video - you can replace this with your own video */}
          <source
                src="/portfolio.mp4"
                type="video/mp4"
              />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase tracking-[0.4em] text-white/80 mb-4">
            Our Portfolio
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Capturing Moments<br />Creating Memories
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Explore our collection of stunning wedding, pre-wedding, corporate, and family photography
          </p>
        </motion.div>
      </div>
    </section>
  );
}

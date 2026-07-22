"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Calendar } from "lucide-react";
import Tilt from "react-parallax-tilt";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="/portfolio.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Gradient Overlay for seamless transition to beige theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-primary" />
      </div>



      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} perspective={1000} trackOnWindow={true} gyroscope={true} className="max-w-2xl text-left transform-style-3d">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span className="text-xs sm:text-sm text-white font-medium tracking-[0.2em] uppercase">
              Wedding Storytelling
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] mb-4 text-white"
          >
            <span className="block">Your Story,</span>
            <span className="block text-white/95">Beautifully Told</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-lg sm:text-xl text-white/85 max-w-xl mb-8 leading-relaxed font-light"
          >
            Elegant wedding and event photography crafted into timeless memories.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-black font-semibold text-sm sm:text-base overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Calendar size={18} />
                Let's tell your Story
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </Link>

            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/30 text-white font-semibold text-sm sm:text-base hover:border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/10">
                <Play size={14} className="ml-0.5" fill="currentColor" />
              </div>
              View Our Work
            </Link>
          </motion.div>
        </Tilt>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-xs text-white/60 tracking-[0.3em] uppercase font-medium">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-2 rounded-full bg-white"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

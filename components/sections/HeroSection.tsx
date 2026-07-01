"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Play, Calendar } from "lucide-react";

const CameraScene = dynamic(
  () => import("@/components/three/CameraScene").then((m) => m.CameraScene),
  { ssr: false }
);

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Video Background Effect with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-secondary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.15)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(212,175,55,0.08)_0%,_transparent_40%)]" />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      {/* 3D Scene */}
      <CameraScene />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center max-w-5xl mx-auto">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass mb-8 border border-accent/20"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
            <span className="text-sm text-text font-medium tracking-wide">
              Capturing Love Stories That Last Forever
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[1.05] mb-8"
          >
            <span className="block text-text mb-2">Your Story,</span>
            <span className="block text-shimmer">Beautifully Told</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-xl sm:text-2xl text-muted max-w-3xl mx-auto mb-12 leading-relaxed font-light"
          >
            Premium wedding & event photography that transforms fleeting moments
            into timeless masterpieces
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-8 mb-12 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="text-muted">500+ Events Captured</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="text-muted">8+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="text-muted">4.9★ Client Rating</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-accent text-primary font-semibold text-lg overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Calendar size={20} />
                Book Your Session
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>

            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-full border-2 border-text/20 text-text font-semibold text-lg hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Play size={16} className="text-accent ml-0.5" fill="currentColor" />
              </div>
              View Our Work
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12"
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-accent mb-1">1000+</div>
              <div className="text-xs sm:text-sm text-muted uppercase tracking-wider">Happy Couples</div>
            </div>
            <div className="h-12 w-px bg-accent/20 hidden sm:block" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-accent mb-1">100%</div>
              <div className="text-xs sm:text-sm text-muted uppercase tracking-wider">Satisfaction</div>
            </div>
            <div className="h-12 w-px bg-accent/20 hidden sm:block" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-accent mb-1">Award</div>
              <div className="text-xs sm:text-sm text-muted uppercase tracking-wider">Winning Team</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-xs text-muted/60 tracking-[0.3em] uppercase font-medium">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-accent/30 flex items-start justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-2 rounded-full bg-accent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

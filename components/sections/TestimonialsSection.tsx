"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TESTIMONIALS } from "@/lib/constants";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const total = TESTIMONIALS.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const t = TESTIMONIALS[current];

  return (
    <section id="testimonials" className="py-20 md:py-32 relative" aria-label="Client testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="What Our Clients Say" subtitle="Testimonials" />

        <ScrollReveal>
          <div className="max-w-5xl mx-auto relative px-4 mt-12 md:mt-20">
            {/* Large Quote Mark Background */}
            <div className="absolute -top-10 -left-4 md:-top-20 md:-left-12 opacity-[0.04] pointer-events-none">
              <Quote size={200} className="text-accent" />
            </div>

            <div className="relative min-h-[400px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  <div className="flex gap-2 mb-8 justify-center md:justify-start">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="text-accent fill-accent"
                      />
                    ))}
                  </div>

                  <blockquote className="text-2xl md:text-4xl lg:text-5xl font-heading text-text leading-tight md:leading-tight mb-12 text-center md:text-left">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div className="flex flex-col md:flex-row items-center gap-6 justify-center md:justify-start">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white font-heading font-bold text-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]">
                      {t.initials}
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-text font-bold text-lg mb-1">{t.name}</p>
                      <p className="text-muted text-sm uppercase tracking-wider">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center md:justify-start gap-4 mt-12">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2 px-4">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === current
                        ? "w-8 bg-accent"
                        : "w-2 bg-accent/20 hover:bg-accent/40"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

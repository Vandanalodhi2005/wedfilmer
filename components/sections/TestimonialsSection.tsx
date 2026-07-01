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
          <div className="max-w-4xl mx-auto relative">
            {/* Main card */}
            <div className="glass-card p-8 md:p-12 lg:p-16 relative overflow-hidden">
              {/* Quote icon */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 opacity-10">
                <Quote size={80} className="text-accent" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="text-accent fill-accent"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg md:text-xl lg:text-2xl text-text/90 leading-relaxed font-light italic mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-primary font-bold text-lg">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-text font-semibold text-base">{t.name}</p>
                      <p className="text-accent text-sm">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-8 bg-accent"
                        : "w-2 bg-muted/30 hover:bg-muted/50"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all duration-300"
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

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
    <section id="testimonials" className="py-16 md:py-24 relative overflow-hidden" aria-label="Client testimonials">
      {/* Sticky Parallax Background */}
      <div 
        className="absolute inset-0 bg-[url('/bg-content.jpg')] bg-fixed bg-cover bg-center" 
      />
      <div className="absolute inset-0 bg-primary/20" /> {/* Dark overlay for readability */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading title="What Our Clients Say" subtitle="Testimonials" />

        <ScrollReveal>
          <div className="relative px-4 mt-10 md:mt-16">
            {/* Quote Mark Background */}
            <div className="absolute -top-4 -left-2 md:-top-10 md:-left-8 opacity-[0.04] pointer-events-none">
              <Quote size={60} className="text-accent" />
            </div>

            <div className="relative min-h-[250px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20, filter: "blur(5px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  <div className="flex gap-1.5 mb-6 justify-center md:justify-start">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="text-accent fill-accent"
                      />
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-xl lg:text-2xl font-heading text-text leading-relaxed md:leading-relaxed mb-8 text-center md:text-left">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-heading font-bold text-sm shadow-lg">
                      {t.initials}
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-text font-bold text-sm mb-0.5">{t.name}</p>
                      <p className="text-muted text-xs uppercase tracking-wider">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center md:justify-start gap-3 mt-8">
              <button
                onClick={prev}
                className="w-8 h-8 rounded-full border border-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex gap-1.5 px-3">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      i === current
                        ? "w-6 bg-accent"
                        : "w-2 bg-accent/20 hover:bg-accent/40"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-8 h-8 rounded-full border border-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


"use client";

import { STATS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Camera, Users, Clock, Star } from "lucide-react";

const icons = [Camera, Users, Clock, Star];

export function TrustSection() {
  return (
    <section className="relative py-16 md:py-20" aria-label="Our achievements">
      {/* Top divider */}
      <div className="section-divider mb-16 md:mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-y-0 relative">
          {STATS.map((stat, i) => {
            const Icon = icons[i];
            return (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="relative text-center px-4 group">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent/5 text-accent transition-all duration-500 group-hover:scale-110 group-hover:bg-accent/10">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="mb-3 text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-text transition-colors duration-300 group-hover:text-accent">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={"decimals" in stat ? stat.decimals : 0}
                    />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                    {stat.label}
                  </p>
                  {/* Vertical Divider for desktop (not on last item) */}
                  {i !== STATS.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 h-2/3 w-[1px] -translate-y-1/2 bg-accent/15" />
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="section-divider mt-16 md:mt-20" />
    </section>
  );
}

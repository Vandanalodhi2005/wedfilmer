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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, i) => {
            const Icon = icons[i];
            return (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="glass-card glass-card-hover p-6 md:p-8 text-center group">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-accent mb-2">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={"decimals" in stat ? stat.decimals : 0}
                    />
                  </div>
                  <p className="text-sm sm:text-base text-muted font-medium">
                    {stat.label}
                  </p>
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

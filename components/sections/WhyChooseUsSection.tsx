"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FEATURES } from "@/lib/constants";

export function WhyChooseUsSection() {
  return (
    <section className="py-20 md:py-32 relative" aria-label="Why choose us">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(212,175,55,0.04)_0%,_transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading title="Why Choose Wed Filmer" subtitle="Our Promise" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.title} delay={i * 0.08}>
                <div className="glass-card glass-card-hover p-8 text-center group h-full">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center group-hover:scale-110 group-hover:from-accent/25 group-hover:to-accent/10 transition-all duration-300">
                    <Icon size={28} className="text-accent" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-text mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

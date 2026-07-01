"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SERVICES } from "@/lib/constants";

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-32 relative" aria-label="Our services">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.03)_0%,_transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading title="What We Offer" subtitle="Our Services" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} delay={i * 0.08}>
                <div className="glass-card glass-card-hover p-8 md:p-10 group relative overflow-hidden h-full">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                      <Icon size={26} className="text-accent" />
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-text mb-3 group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted text-sm md:text-base leading-relaxed">
                      {service.description}
                    </p>

                    {/* Learn more link */}
                    <div className="mt-6 flex items-center gap-2 text-accent text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span>Learn More</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

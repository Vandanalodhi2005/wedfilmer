"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Tilt from "react-parallax-tilt";
import { PRICING_PLANS } from "@/lib/constants";
import { Check, ArrowRight } from "lucide-react";

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-32 relative" aria-label="Pricing packages">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.04)_0%,_transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading title="Investment in Memories" subtitle="Pricing" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.1} direction="3d-flip-up">
              <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} glareEnable={true} glareMaxOpacity={0.1} scale={1.03} className={`relative h-full rounded-2xl transition-all duration-500 ${plan.highlighted ? "scale-100 md:scale-105 z-10" : ""}`}>
              <div
                className="relative h-full rounded-2xl overflow-hidden"
              >
                {/* Featured badge */}
                {plan.badge && (
                  <div className="absolute top-0 left-0 right-0 z-10">
                    <div className="bg-accent text-primary text-xs font-bold text-center py-2 tracking-wider uppercase">
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div
                  className={`h-full flex flex-col p-8 md:p-10 ${
                    plan.highlighted
                      ? "glass-card border-accent/30 bg-accent/5"
                      : "glass-card"
                  } ${plan.badge ? "pt-14" : ""}`}
                >
                  {/* Plan name */}
                  <h3 className="font-heading text-2xl font-bold text-text mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <span className={`text-4xl md:text-5xl font-heading font-bold ${plan.highlighted ? "text-accent" : "text-text"}`}>
                      {plan.price}
                    </span>
                    <span className="text-muted text-sm ml-2">/ event</span>
                  </div>

                  {/* Features */}
                  <ul className="flex-1 space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlighted ? "bg-accent/20" : "bg-accent/10"}`}>
                          <Check size={12} className="text-accent" />
                        </div>
                        <span className="text-sm text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className={`group inline-flex items-center justify-center gap-2 w-full py-4 rounded-full font-semibold text-base transition-all duration-300 ${
                      plan.highlighted
                        ? "bg-accent text-primary hover:bg-accent-light hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                        : "border border-accent/30 text-accent hover:bg-accent hover:text-primary"
                    }`}
                  >
                    Choose {plan.name.split(" ")[0]}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </a>
                </div>
              </div>
              </Tilt>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

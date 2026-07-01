"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PROCESS_STEPS } from "@/lib/constants";
import { CheckCircle2 } from "lucide-react";

export function ProcessSection() {
  return (
    <section className="py-20 md:py-32 relative" aria-label="Our process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="How We Work" subtitle="Our Process" />

        <div className="max-w-5xl mx-auto relative">
          {/* Vertical connecting line - Desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-accent/30 to-transparent" />

          <div className="space-y-12 md:space-y-20">
            {PROCESS_STEPS.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <ScrollReveal key={step.step} delay={i * 0.1}>
                  <div
                    className={`relative grid md:grid-cols-2 gap-8 items-center ${
                      isEven ? "" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div className={isEven ? "md:text-right md:pr-12" : "md:order-2 md:pl-12"}>
                      <div className="inline-block md:block">
                        <div className="glass-card glass-card-hover !p-8">
                          <div className="flex items-center gap-4 mb-4 md:justify-start">
                            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                              <CheckCircle2 size={24} className="text-accent" />
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-text">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-muted text-sm md:text-base leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Number indicator */}
                    <div
                      className={`hidden md:flex absolute left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/40 items-center justify-center ${
                        isEven ? "" : ""
                      }`}
                    >
                      <span className="font-heading text-3xl font-bold text-accent">
                        {step.step}
                      </span>
                    </div>

                    {/* Mobile number */}
                    <div className="md:hidden flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/40 flex items-center justify-center flex-shrink-0">
                        <span className="font-heading text-2xl font-bold text-accent">
                          {step.step}
                        </span>
                      </div>
                    </div>

                    {/* Spacer for layout */}
                    <div className={`hidden md:block ${isEven ? "md:order-2" : ""}`} />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

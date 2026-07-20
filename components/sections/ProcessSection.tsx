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

        <div className="max-w-4xl mx-auto relative mt-16 md:mt-24">
          {/* Center Vertical Line */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[1px] bg-accent/20 md:-translate-x-1/2" />

          <div className="flex flex-col gap-16 md:gap-32">
            {PROCESS_STEPS.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <ScrollReveal key={step.step} delay={0.1} direction={isEven ? "right" : "left"}>
                  <div className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Timeline Dot */}
                    <div className="absolute left-[24px] md:left-1/2 top-4 md:top-1/2 h-3 w-3 -translate-x-[5px] md:-translate-x-1/2 md:-translate-y-1/2 rounded-full border-2 border-primary bg-accent shadow-[0_0_0_4px_rgba(10,10,10,0.05)] z-10" />

                    {/* Content Box */}
                    <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-20 text-left md:text-right' : 'md:pl-20 text-left'}`}>
                      <div className="group relative">
                        <div className="text-7xl md:text-8xl font-heading font-black text-accent/10 mb-2 transition-colors duration-500 group-hover:text-accent/20">
                          0{step.step}
                        </div>
                        <h4 className="text-2xl md:text-3xl font-bold text-text mb-4">{step.title}</h4>
                        <p className="text-muted leading-relaxed text-base md:text-lg">{step.description}</p>
                      </div>
                    </div>

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

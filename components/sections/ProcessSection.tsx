"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PROCESS_STEPS } from "@/lib/constants";

export function ProcessSection() {
  return (
    <section className="py-16 md:py-24 relative" aria-label="Our process">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeading title="How We Work" subtitle="Our Process" />

        <div className="relative mx-auto max-w-xl mt-10">
          {/* Vertical Line */}
          <div className="absolute left-[18px] top-0 bottom-0 w-[1px] bg-accent/15" />

          <div className="flex flex-col gap-7">
            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.06}>
                <div className="relative flex items-start gap-5 pl-11">
                  {/* Dot with step number */}
                  <div className="absolute left-[18px] top-[3px] h-[22px] w-[22px] -translate-x-1/2 rounded-full border-[1.5px] border-accent/30 bg-primary flex items-center justify-center z-10">
                    <span className="text-[9px] font-bold text-accent">{step.step}</span>
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className="text-sm font-semibold text-text mb-1">{step.title}</h4>
                    <p className="text-xs text-muted leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { ScrollReveal } from "./ScrollReveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-16 md:mb-20 ${centered ? "text-center" : ""} ${className}`}>
      <ScrollReveal>
        <p className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-4">
          {subtitle}
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-text leading-tight">
          {title}
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <div className="mt-6 mx-auto flex items-center gap-3 justify-center">
          <span className="block h-[1px] w-12 bg-accent/40" />
          <span className="block h-2 w-2 rounded-full bg-accent" />
          <span className="block h-[1px] w-12 bg-accent/40" />
        </div>
      </ScrollReveal>
    </div>
  );
}

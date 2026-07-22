"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Camera, Award, Heart, Aperture } from "lucide-react";

const highlights = [
  { icon: Camera, label: "Since 2015", desc: "Professional Mastery" },
  { icon: Heart, label: "350+", desc: "Premium Events Covered" },
  { icon: Award, label: "Elite Team", desc: "Award-Winning Cinematographers" },
  { icon: Aperture, label: "Global Reach", desc: "Destination Weddings Worldwide" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-10 md:py-12 relative" aria-label="About us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          {/* Left: Image */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
                <Image
                  src="/about.jpg"
                  alt="Professional wedding photographer with camera"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/10 to-transparent" />
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-accent/40 rounded-tl-lg" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-accent/40 rounded-br-lg" />
              </div>

              <div className="absolute -bottom-6 -right-6 md:right-[-1.5rem] glass-card p-4 md:p-5 z-10 rounded-2xl">
                <div className="text-3xl font-heading font-bold text-accent">350+</div>
                <div className="text-sm text-muted">Beautiful weddings captured</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Content */}
          <ScrollReveal delay={0.1}>
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-accent/60" />
                <p className="text-sm uppercase tracking-[0.35em] text-accent/80">About</p>
              </div>

              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-text mb-6">
                The Story Behind Wed Filmer
              </h2>

              <p className="text-lg text-muted leading-relaxed mb-5">
                At Wed Filmer, we blend cinematic artistry with refined elegance to create wedding stories that feel intimate, elevated, and unmistakably yours.
              </p>

              <p className="text-base text-muted/80 leading-relaxed mb-8">
                From intimate vows to grand destination celebrations, our team captures every heartbeat with thoughtfulness, beauty, and a deeply personal touch.
              </p>

              <div className="space-y-3 text-sm md:text-base text-muted">
                {highlights.map((h) => (
                  <div key={h.label} className="flex items-start gap-3">
                    <h.icon size={18} className="text-accent mt-1 shrink-0" />
                    <div>
                      <span className="font-heading font-semibold text-text">{h.label}</span>{" "}
                      <span>{h.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

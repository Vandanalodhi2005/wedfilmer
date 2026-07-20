"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Camera, Award, Heart, Aperture } from "lucide-react";

const milestones = [
  { year: "2015", title: "Founded", desc: "We started our journey capturing timeless moments." },
  { year: "2018", title: "Services Expanded", desc: "Specializing in cinematic videography and pre-wedding films." },
  { year: "2020", title: "Global Reach", desc: "Extended services to major destinations worldwide." },
  { year: "2023", title: "Elite Collective", desc: "Curated a collective of visionary photographers and cinematographers." },
  { year: "2026", title: "250+ Events", desc: "Successfully covered over 250 premium Weddings & Events globally." },
];

const highlights = [
  { icon: Camera, label: "Since 2015", desc: "Professional Mastery" },
  { icon: Heart, label: "250+", desc: "Premium Events Covered" },
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
                <div className="text-3xl font-heading font-bold text-accent">250+</div>
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

        {/* Timeline */}
        <div className="mt-20 md:mt-32">
          <ScrollReveal>
            <h3 className="text-center font-heading text-3xl md:text-4xl font-bold text-text mb-16 md:mb-24">
              Our Journey
            </h3>
          </ScrollReveal>

          <div className="relative mx-auto max-w-4xl">
            {/* Center Vertical Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-accent/20 md:-translate-x-1/2" />

            <div className="flex flex-col gap-12 md:gap-24">
              {milestones.map((m, i) => {
                const isEven = i % 2 === 0;
                return (
                  <ScrollReveal key={m.year} delay={0.1} direction={isEven ? "right" : "left"}>
                    <div className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                      
                      {/* Timeline Dot */}
                      <div className="absolute left-[20px] md:left-1/2 top-3 md:top-1/2 h-3 w-3 -translate-x-[5px] md:-translate-x-1/2 md:-translate-y-1/2 rounded-full border-2 border-primary bg-accent shadow-[0_0_0_4px_rgba(10,10,10,0.05)] z-10" />

                      {/* Content Box */}
                      <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                        <div className="group relative">
                          <div className="text-5xl md:text-7xl font-heading font-black text-accent/10 mb-2 transition-colors duration-500 group-hover:text-accent/20">{m.year}</div>
                          <h4 className="text-xl md:text-2xl font-bold text-text mb-3">{m.title}</h4>
                          <p className="text-muted leading-relaxed text-sm md:text-base">{m.desc}</p>
                        </div>
                      </div>

                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

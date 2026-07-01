"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Camera, Award, Heart, Aperture } from "lucide-react";

const milestones = [
  { year: "2016", title: "Founded", desc: "Wed Filmer was born from a passion for storytelling." },
  { year: "2018", title: "100th Wedding", desc: "Reached our first major milestone in wedding coverage." },
  { year: "2020", title: "Expanded Team", desc: "Grew to a full team of photographers and videographers." },
  { year: "2023", title: "500+ Events", desc: "Celebrating half a thousand events beautifully captured." },
  { year: "2024", title: "Award Winning", desc: "Recognized among the top wedding photographers nationally." },
];

const highlights = [
  { icon: Camera, label: "8+ Years", desc: "of professional experience" },
  { icon: Award, label: "Top Rated", desc: "4.9★ client satisfaction" },
  { icon: Heart, label: "500+", desc: "celebrations captured" },
  { icon: Aperture, label: "Premium", desc: "equipment & editing" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 relative" aria-label="About us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="The Story Behind Wed Filmer" subtitle="About Us" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image */}
          <ScrollReveal direction="left">
            <div className="relative">
              {/* Main photographer image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=1000&fit=crop"
                  alt="Professional wedding photographer with camera"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                {/* Gold corner accents */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-accent/40 rounded-tl-lg" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-accent/40 rounded-br-lg" />
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-6 -right-6 md:right-[-2rem] glass-card p-4 md:p-5 z-10">
                <div className="text-3xl font-heading font-bold text-accent">8+</div>
                <div className="text-sm text-muted">Years of Excellence</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Content */}
          <div>
            <ScrollReveal delay={0.1}>
              <p className="text-lg text-muted leading-relaxed mb-6">
                At Wed Filmer, we believe every celebration deserves to be
                remembered beautifully. Our passion is creating timeless
                photographs and cinematic films that capture genuine emotions
                and unforgettable moments.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base text-muted/80 leading-relaxed mb-10">
                Founded in 2016, we&apos;ve grown from a solo photographer&apos;s dream into
                a full-service creative studio. Every frame we capture is guided by
                an unwavering commitment to artistry, authenticity, and the stories
                that make each event uniquely yours.
              </p>
            </ScrollReveal>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {highlights.map((h, i) => (
                <ScrollReveal key={h.label} delay={0.3 + i * 0.08}>
                  <GlassCard className="!p-4 text-center">
                    <h.icon size={20} className="text-accent mx-auto mb-2" />
                    <div className="text-lg font-heading font-bold text-text">{h.label}</div>
                    <div className="text-xs text-muted">{h.desc}</div>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-20 md:mt-28">
          <ScrollReveal>
            <h3 className="text-center font-heading text-2xl md:text-3xl font-bold text-text mb-12">
              Our Journey
            </h3>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-accent/20 -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
              {milestones.map((m, i) => (
                <ScrollReveal key={m.year} delay={i * 0.1}>
                  <div className="relative text-center">
                    {/* Dot */}
                    <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 rounded-full bg-accent border-4 border-primary" />
                    </div>
                    <GlassCard className="!p-5 md:mt-6">
                      <div className="text-accent font-heading font-bold text-lg mb-1">{m.year}</div>
                      <div className="text-text font-semibold text-sm mb-1">{m.title}</div>
                      <div className="text-muted text-xs leading-relaxed">{m.desc}</div>
                    </GlassCard>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

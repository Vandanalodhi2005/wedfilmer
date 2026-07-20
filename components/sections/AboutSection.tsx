"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
        <div className="mt-16 md:mt-20 overflow-hidden">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center font-heading text-2xl md:text-3xl font-bold text-text mb-14 md:mb-20"
          >
            Our Journey
          </motion.h3>

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Horizontal center line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent origin-left"
            />

            <div className="flex justify-between items-center relative px-2 md:px-4">
              {milestones.map((m, i) => {
                const isTop = i % 2 === 0;
                return (
                  <motion.div
                    key={m.year}
                    initial={{
                      opacity: 0,
                      y: isTop ? -60 : 60,
                      scale: 0.85,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.15,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className={`relative flex flex-col items-center flex-1 ${
                      isTop ? "flex-col" : "flex-col-reverse"
                    }`}
                  >
                    {/* Card */}
                    <div
                      className={`glass-card p-3 md:p-4 text-center w-full max-w-[140px] md:max-w-[160px] group hover:-translate-y-1 transition-all duration-500 ${
                        isTop ? "mb-6" : "mt-6"
                      }`}
                    >
                      <p className="font-heading text-[10px] md:text-xs font-bold text-accent tracking-wider mb-1">
                        {m.year}
                      </p>
                      <h4 className="font-heading text-xs md:text-sm font-semibold text-text mb-1 group-hover:text-accent transition-colors">
                        {m.title}
                      </h4>
                      <p className="text-muted text-[10px] md:text-xs leading-relaxed hidden sm:block">
                        {m.desc}
                      </p>
                    </div>

                    {/* Connector line + dot */}
                    <div className={`flex flex-col items-center ${isTop ? "" : "flex-col-reverse"}`}>
                      <div className="w-[1px] h-6 bg-accent/20" />
                      <div className="relative">
                        <div className="w-3 h-3 rounded-full bg-accent border-2 border-primary z-10 relative" />
                        <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent/40 animate-ping" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

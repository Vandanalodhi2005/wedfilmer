"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FEATURES } from "@/lib/constants";

export function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-24 relative" aria-label="Why choose us">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(212,175,55,0.04)_0%,_transparent_60%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <SectionHeading title="Why Choose Wed Filmer" subtitle="Our Promise" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={{
                  hidden: { opacity: 0, y: 30, rotateX: -10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: { 
                      duration: 0.6, 
                      ease: [0.22, 1, 0.36, 1] 
                    },
                  },
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="glass-card group relative p-6 md:p-7 overflow-hidden h-full"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/3 to-accent/6 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <motion.div 
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="w-12 h-12 mb-5 rounded-xl bg-accent/5 flex items-center justify-center group-hover:bg-accent/10 transition-all duration-500 shrink-0"
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.75}
                      className="text-accent transition-all duration-500"
                    />
                  </motion.div>
                  <h3 className="font-heading text-base md:text-lg font-semibold text-text mb-3 group-hover:text-accent transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted text-sm md:text-base leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


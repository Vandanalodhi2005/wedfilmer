"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FAQ_ITEMS } from "@/lib/constants";
import { Plus, Minus } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-32 relative" aria-label="Frequently asked questions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Frequently Asked Questions" subtitle="FAQ" />

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="glass-card !p-0 overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(i)}
                    className="w-full px-6 md:px-8 py-5 md:py-6 flex items-start gap-4 text-left hover:bg-accent/5 transition-colors duration-300"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                      {isOpen ? (
                        <Minus size={16} className="text-accent" />
                      ) : (
                        <Plus size={16} className="text-accent" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-lg md:text-xl font-bold text-text mb-1">
                        {faq.question}
                      </h3>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <div className="px-6 md:px-8 pb-5 md:pb-6 pl-16 md:pl-20">
                          <p className="text-muted text-sm md:text-base leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Contact CTA */}
        <ScrollReveal delay={FAQ_ITEMS.length * 0.05 + 0.2}>
          <div className="mt-12 text-center">
            <p className="text-muted mb-6">Still have questions? We&apos;re here to help!</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-primary font-semibold hover:bg-accent-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              Get in Touch
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

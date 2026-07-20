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

        <div className="max-w-3xl mx-auto">
          {FAQ_ITEMS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="border-b border-accent/10 overflow-hidden last:border-none">
                  <button
                    onClick={() => toggleFAQ(i)}
                    className="w-full py-6 md:py-8 flex items-center justify-between text-left group transition-colors duration-300"
                    aria-expanded={isOpen}
                  >
                    <h3
                      className={`font-heading text-xl md:text-2xl font-bold pr-8 transition-colors duration-300 ${
                        isOpen ? "text-accent" : "text-text group-hover:text-accent"
                      }`}
                    >
                      {faq.question}
                    </h3>
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-accent border-accent text-white"
                          : "border-accent/20 text-accent group-hover:bg-accent group-hover:border-accent group-hover:text-white"
                      }`}
                    >
                      <motion.div
                        initial={false}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </motion.div>
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
                        <div className="pb-8 pr-12 md:pr-24">
                          <p className="text-muted text-base md:text-lg leading-relaxed">
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
          <div className="mt-16 text-center">
            <p className="text-muted mb-6">Still have questions? We&apos;re here to help!</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-accent text-primary font-semibold hover:bg-accent-light transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              Get in Touch
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

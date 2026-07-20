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
    <section className="py-16 md:py-24 relative" aria-label="Frequently asked questions">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading title="Frequently Asked Questions" subtitle="FAQ" />

        <div className="max-w-2xl mx-auto mt-10">
          {FAQ_ITEMS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="border-b border-accent/10 overflow-hidden last:border-none">
                  <button
                    onClick={() => toggleFAQ(i)}
                    className="w-full py-4 md:py-5 flex items-center justify-between text-left group transition-colors duration-300"
                    aria-expanded={isOpen}
                  >
                    <h3
                      className={`font-heading text-sm md:text-base font-semibold pr-4 transition-colors duration-300 ${
                        isOpen ? "text-accent" : "text-text group-hover:text-accent"
                      }`}
                    >
                      {faq.question}
                    </h3>
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-accent border-accent text-primary"
                          : "border-accent/20 text-accent group-hover:bg-accent group-hover:border-accent group-hover:text-primary"
                      }`}
                    >
                      <motion.div
                        initial={false}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
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
                        <div className="pb-5 pr-8 md:pr-16">
                          <p className="text-muted text-xs md:text-sm leading-relaxed">
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
            <p className="text-muted text-sm mb-4">Still have questions? We&apos;re here to help!</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-primary font-semibold text-sm hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Get in Touch
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}


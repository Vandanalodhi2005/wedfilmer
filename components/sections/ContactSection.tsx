
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CONTACT_INFO } from "@/lib/constants";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        alert("Thank you for your inquiry! We'll get back to you within 24 hours.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative" aria-label="Contact us">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(10,10,10,0.04)_0%,_transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading title="Let's Create Magic Together" subtitle="Contact Us" />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <ScrollReveal>
              <div className="glass-card !p-8">
                <h3 className="font-heading text-2xl font-bold text-text mb-6">
                  Get in Touch
                </h3>
                <p className="text-muted mb-8 leading-relaxed">
                  Ready to capture your special moments? Fill out the form or
                  reach us directly through any of the channels below.
                </p>

                <div className="space-y-6">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Mail size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-muted text-sm mb-1">Email</p>
                      <p className="text-text font-medium group-hover:text-accent transition-colors">
                        {CONTACT_INFO.email}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Phone size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-muted text-sm mb-1">Phone</p>
                      <p className="text-text font-medium group-hover:text-accent transition-colors">
                        {CONTACT_INFO.phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={CONTACT_INFO.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <MapPin size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-muted text-sm mb-1">Location</p>
                      <p className="text-text font-medium group-hover:text-accent transition-colors">
                        {CONTACT_INFO.address}
                      </p>
                    </div>
                  </a>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={CONTACT_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-2 w-full py-4 rounded-full bg-green-600 text-white font-semibold hover:bg-green-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                >
                  <MessageSquare size={20} />
                  Chat on WhatsApp
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ScrollReveal delay={0.1}>
              <form onSubmit={handleSubmit} className="glass-card !p-8 md:!p-10">
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-primary/50 border border-glass-border text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-primary/50 border border-glass-border text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-muted mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-primary/50 border border-glass-border text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-muted mb-2">
                    Tell Us About Your Event *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-primary/50 border border-glass-border text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                    placeholder="Share details about your event, date, location, and any specific requirements..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-semibold hover:bg-accent-light transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

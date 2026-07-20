"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CONTACT_INFO } from "@/lib/constants";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  ArrowRight,
} from "lucide-react";

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    description: "Drop us an email anytime",
  },
  {
    icon: Phone,
    label: "Phone",
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone}`,
    description: "Mon – Sat, 9 AM to 7 PM",
  },
  {
    icon: MapPin,
    label: "Location",
    value: CONTACT_INFO.address,
    href: CONTACT_INFO.mapUrl,
    description: "Studio & on-location coverage",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "Chat with us",
    href: CONTACT_INFO.whatsapp,
    description: "Instant replies, anytime",
  },
];

export function ContactPageContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventDate: "",
          message: "",
        });
        setTimeout(() => setIsSubmitted(false), 5000);
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
    <>
      {/* ─── HERO SECTION ─── */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/contact-hero.png"
          alt="Contact Wed Filmer"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#D5C8B9]" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 uppercase tracking-[0.3em] text-sm mb-6 font-body"
          >
            Let&apos;s Connect
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
          >
            Contact Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Ready to capture your special moments? Reach out and let&apos;s
            craft something extraordinary together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10"
          >
            <a
              href="#contact-form"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 group"
            >
              <Send size={18} />
              Send a Message
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT INFO CARDS ─── */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Intro */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-muted uppercase tracking-[0.25em] text-sm mb-4 font-body">
                Get in Touch
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">
                We&apos;d Love to Hear From You
              </h2>
              <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
                Ready to capture your special moments? Fill out the form or
                reach us directly through any of the channels below.
              </p>
            </div>
          </ScrollReveal>

          {/* Vertical Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={card.label} delay={i * 0.1}>
                  <a
                    href={card.href}
                    target={
                      card.label === "WhatsApp" || card.label === "Location"
                        ? "_blank"
                        : undefined
                    }
                    rel="noopener noreferrer"
                    className="group block h-full"
                  >
                    <div className="glass-card p-8 h-full text-center hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-b from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative z-10">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/5 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500">
                          <Icon
                            size={26}
                            className="text-accent group-hover:text-white transition-colors duration-500"
                          />
                        </div>
                        <p className="text-muted text-xs uppercase tracking-[0.2em] mb-3">
                          {card.label}
                        </p>
                        <p className="font-heading text-lg font-bold text-text mb-2 group-hover:text-accent transition-colors duration-300">
                          {card.value}
                        </p>
                        <p className="text-muted text-sm">{card.description}</p>
                      </div>
                    </div>
                  </a>
                </ScrollReveal>
              );
            })}
          </div>

          {/* ─── FORM + INFO SPLIT ─── */}
          <div
            id="contact-form"
            className="grid lg:grid-cols-5 gap-8 lg:gap-16 scroll-mt-24"
          >
            {/* Left – Info Panel */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="sticky top-28">
                  <p className="text-muted uppercase tracking-[0.25em] text-sm mb-4 font-body">
                    Send a Message
                  </p>
                  <h3 className="font-heading text-3xl md:text-4xl font-bold text-text mb-6">
                    Let&apos;s Create
                    <br />
                    Magic Together
                  </h3>
                  <p className="text-muted leading-relaxed mb-10">
                    Share details about your event and we&apos;ll get back to
                    you within 24 hours with a personalised proposal. Every
                    celebration deserves to be captured beautifully.
                  </p>

                  {/* Quick details */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center flex-shrink-0">
                        <Clock size={18} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-text font-medium text-sm">
                          Response Time
                        </p>
                        <p className="text-muted text-sm">
                          Within 24 hours, guaranteed
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-text font-medium text-sm">
                          Coverage
                        </p>
                        <p className="text-muted text-sm">
                          Pan-India & International Destinations
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href={CONTACT_INFO.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#20BD5A] transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(37,211,102,0.4)] hover:-translate-y-0.5"
                  >
                    <MessageSquare size={20} />
                    Chat on WhatsApp
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Right – Contact Form */}
            <div className="lg:col-span-3">
              <ScrollReveal delay={0.15}>
                <form
                  onSubmit={handleSubmit}
                  className="glass-card !p-8 md:!p-12 relative overflow-hidden"
                >
                  {/* Success Overlay */}
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-primary/95 backdrop-blur-sm"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                        <Send size={32} className="text-green-600" />
                      </div>
                      <h4 className="font-heading text-2xl font-bold text-text mb-2">
                        Message Sent!
                      </h4>
                      <p className="text-muted text-center max-w-sm">
                        Thank you for reaching out. We&apos;ll get back to you
                        within 24 hours.
                      </p>
                    </motion.div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-muted uppercase tracking-wider mb-3"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-accent/10 text-text placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors duration-300 text-base"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-muted uppercase tracking-wider mb-3"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-accent/10 text-text placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors duration-300 text-base"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-medium text-muted uppercase tracking-wider mb-3"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-accent/10 text-text placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors duration-300 text-base"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-eventDate"
                        className="block text-xs font-medium text-muted uppercase tracking-wider mb-3"
                      >
                        Event Date
                      </label>
                      <input
                        type="date"
                        id="contact-eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-accent/10 text-text placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors duration-300 text-base"
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-muted uppercase tracking-wider mb-3"
                    >
                      Tell Us About Your Event *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-accent/10 text-text placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors duration-300 resize-none text-base"
                      placeholder="Share details about your event, date, location, and any specific requirements..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-accent text-white font-semibold hover:bg-accent-light transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
    </>
  );
}

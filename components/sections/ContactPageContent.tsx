"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CONTACT_INFO } from "@/lib/constants";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
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
      {/* ─── CONTACT INFO CARDS ─── */}
      <section className="py-8 md:py-12 relative bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.03)_0%,_transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          
          {/* Section Intro */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-4">
              We'd Love to Hear From You
            </h2>
            <p className="text-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Ready to capture your special moments? Fill out the form or reach us directly through any of the channels below.
            </p>
          </motion.div>

          {/* Compact Contact Cards — each flies in from a different direction */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              // Directions: top, right, bottom, left
              const directions = [
                { x: 0, y: -80 },   // Email — from top
                { x: 80, y: 0 },    // Phone — from right
                { x: 0, y: 80 },    // Location — from bottom
                { x: -80, y: 0 },   // WhatsApp — from left
              ];
              const dir = directions[i] || { x: 0, y: 40 };
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: dir.x, y: dir.y, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
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
                    <div className="glass-card p-6 h-full text-center hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-10 h-10 mb-4 rounded-full bg-accent/5 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                          <Icon size={18} className="text-accent group-hover:text-primary transition-colors duration-500" />
                        </div>
                        <p className="text-muted text-[10px] uppercase tracking-[0.2em] mb-2">
                          {card.label}
                        </p>
                        <p className="font-heading text-sm md:text-base font-bold text-text mb-1 group-hover:text-accent transition-colors duration-300">
                          {card.value}
                        </p>
                        <p className="text-muted/60 text-xs">{card.description}</p>
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* ─── FORM + INFO SPLIT ─── */}
          <div id="contact-form" className="grid lg:grid-cols-5 gap-8 lg:gap-12 scroll-mt-24">
            
            {/* Left – Info Panel — slides in from left */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="sticky top-28">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-text mb-4">
                  Let's Create <br /> Magic Together
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-8">
                  Share details about your event and we'll get back to you within 24 hours with a personalised proposal. Every celebration deserves to be captured beautifully.
                </p>

                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Clock size={14} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-text font-medium text-sm">Response Time</p>
                      <p className="text-muted text-xs">Within 24 hours, guaranteed</p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={14} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-text font-medium text-sm">Coverage</p>
                      <p className="text-muted text-xs">Pan-India & International Destinations</p>
                    </div>
                  </motion.div>
                </div>

                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.45 }}
                  href={CONTACT_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-primary font-semibold text-sm hover:bg-[#20BD5A] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <MessageSquare size={16} />
                  Chat on WhatsApp
                </motion.a>
              </div>
            </motion.div>

            {/* Right – Contact Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <form
                  onSubmit={handleSubmit}
                  className="glass-card !p-6 md:!p-8 relative overflow-hidden"
                >
                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-primary/95 backdrop-blur-sm rounded-[2rem]"
                      >
                        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                          <Send size={24} className="text-green-500" />
                        </div>
                        <h4 className="font-heading text-xl font-bold text-text mb-2">
                          Message Sent!
                        </h4>
                        <p className="text-muted text-sm text-center max-w-[250px]">
                          Thank you for reaching out. We'll get back to you within 24 hours.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="name" className="block text-[10px] font-medium text-muted uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-0 py-2 bg-transparent border-0 border-b border-accent/20 text-text text-sm placeholder:text-muted/30 focus:outline-none focus:border-accent transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-medium text-muted uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-0 py-2 bg-transparent border-0 border-b border-accent/20 text-text text-sm placeholder:text-muted/30 focus:outline-none focus:border-accent transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="phone" className="block text-[10px] font-medium text-muted uppercase tracking-wider mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-0 py-2 bg-transparent border-0 border-b border-accent/20 text-text text-sm placeholder:text-muted/30 focus:outline-none focus:border-accent transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label htmlFor="eventDate" className="block text-[10px] font-medium text-muted uppercase tracking-wider mb-2">
                        Event Date
                      </label>
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full px-0 py-2 bg-transparent border-0 border-b border-accent/20 text-text text-sm placeholder:text-muted/30 focus:outline-none focus:border-accent transition-colors [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <label htmlFor="message" className="block text-[10px] font-medium text-muted uppercase tracking-wider mb-2">
                      Tell Us About Your Event *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-0 py-2 bg-transparent border-0 border-b border-accent/20 text-text text-sm placeholder:text-muted/30 focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder="Share details about your event, date, location..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent text-primary font-semibold text-sm hover:bg-accent/90 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-[1.5px] border-primary/30 border-t-primary rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

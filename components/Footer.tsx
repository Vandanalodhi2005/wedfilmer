"use client";

import Link from "next/link";
import { NAV_LINKS, SERVICES, SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";
import { Share2, Heart } from "lucide-react";

// Using Share2 as a generic social icon since specific platform icons don't exist in lucide-react
const SocialIcon = Share2;

const NAV_ROUTES = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-20 pb-8 border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent via-accent-light to-accent-dark flex items-center justify-center shadow-lg shadow-accent/10">
                <span className="text-primary font-heading font-bold text-xl">WF</span>
              </div>
              <div>
                <span className="text-text font-heading text-2xl font-bold">
                  Wed<span className="text-accent">Filmer</span>
                </span>
                <p className="text-[10px] text-muted uppercase tracking-[0.15em] -mt-0.5">Premium Photography</p>
              </div>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Capturing love stories that last forever. Professional wedding and event photography
              with a cinematic touch.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all duration-300"
                  aria-label={social.name}
                >
                  <SocialIcon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-text font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {NAV_ROUTES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-accent hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-text font-heading font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2.5">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.title}>
                  <Link
                    href="/services"
                    className="text-muted text-sm hover:text-accent hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-text font-heading font-bold text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-muted text-sm hover:text-accent transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-muted text-sm hover:text-accent transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted text-sm hover:text-accent transition-colors leading-relaxed"
                >
                  {CONTACT_INFO.address}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-glass-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted text-sm text-center sm:text-left">
              © {currentYear} Wed Filmer. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-muted text-sm">
              Crafted with <Heart size={14} className="text-accent fill-accent" /> for your special moments
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

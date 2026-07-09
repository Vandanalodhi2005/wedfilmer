"use client";

import Link from "next/link";
import Image from "next/image";
import { SERVICES, SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";
import { Heart } from "lucide-react";

function SocialIcon({ type, size = 18 }: { type: "instagram" | "facebook" | "youtube" | "twitter"; size?: number }) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "instagram":
      return (
        <svg {...commonProps}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...commonProps}>
          <path d="M13.5 20v-7h2.3l.3-2.8h-2.6V3.8c0-.8.2-1.3 1.3-1.3h1.4V.1c-.2 0-1.1-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8.2V13h2.4v7" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...commonProps}>
          <path d="M22 12s0-5.4-2.8-7.8C17.1 2.2 15 2 12 2S6.9 2.2 4.8 4.2C2 6.6 2 12 2 12s0 5.4 2.8 7.8C6.9 21.8 9 22 12 22s5.1-.2 7.2-2.2C22 17.4 22 12 22 12Z" />
          <path d="m10 15 5-3-5-3v6Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...commonProps}>
          <path d="M4 4l16 16M20 4 4 20" />
        </svg>
      );
    default:
      return null;
  }
}

const NAV_ROUTES = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-glass-border pt-16 pb-8 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="mb-12 grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/" className="group mb-4 inline-flex items-center justify-center sm:justify-start">
              <div className="relative h-14 w-40 sm:h-16 sm:w-48 transition-all duration-300 group-hover:opacity-90">
                <Image
                  src="/logo-white.png"
                  alt="Wed Filmer Logo"
                  fill
                  className="object-contain"
                />
              </div>
              {/* <div>
                <span className="text-text font-heading text-2xl font-bold">
                  Wed<span className="text-accent">Filmer</span>
                </span>
                <p className="text-[10px] text-muted uppercase tracking-[0.15em] -mt-0.5">Premium Photography</p>
              </div> */}
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted">
              Capturing love stories that last forever. Professional wedding and event photography
              with a cinematic touch.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all duration-300"
                  aria-label={social.name}
                >
                  <SocialIcon type={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="mb-4 text-lg font-bold text-text font-heading">Quick Links</h3>
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
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="mb-4 text-lg font-bold text-text font-heading">Services</h3>
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
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="mb-4 text-lg font-bold text-text font-heading">Get in Touch</h3>
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

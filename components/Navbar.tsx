"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isScrolled } = useScrollPosition();

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass shadow-lg shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="Wed Filmer Home">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent via-accent-light to-accent-dark flex items-center justify-center shadow-lg shadow-accent/20">
                  <span className="text-primary font-heading font-bold text-xl">WF</span>
                </div>
                <div className="absolute -inset-1 rounded-xl bg-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="hidden sm:block">
                <span className="text-text font-heading text-2xl font-bold tracking-tight">
                  Wed<span className="text-accent">Filmer</span>
                </span>
                <p className="text-[10px] text-muted uppercase tracking-[0.2em] -mt-1">Premium Photography</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-muted hover:text-text transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-2/3" />
                </Link>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center px-6 py-2.5 rounded-full bg-accent text-primary text-sm font-semibold hover:bg-accent-light transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                Book Now
              </Link>
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-text hover:text-accent transition-colors"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={closeMenu}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-secondary/95 backdrop-blur-xl border-l border-glass-border lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-glass-border">
                  <span className="text-text font-heading text-xl font-bold">
                    Wed<span className="text-accent">Filmer</span>
                  </span>
                  <button
                    onClick={closeMenu}
                    className="p-2 text-muted hover:text-text transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav className="flex-1 py-8 px-6" aria-label="Mobile navigation">
                  <div className="flex flex-col gap-2">
                    {NAV_LINKS.map((link, i) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className="block py-3 px-4 text-lg text-muted hover:text-text hover:bg-white/5 rounded-lg transition-all duration-300"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                <div className="p-6 border-t border-glass-border">
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="block w-full text-center px-6 py-3 rounded-full bg-accent text-primary font-semibold hover:bg-accent-light transition-all duration-300"
                  >
                    Book a Session
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

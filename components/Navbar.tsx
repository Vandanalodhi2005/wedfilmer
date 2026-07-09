"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
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
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex h-16 items-center justify-between sm:h-20">
            <Link href="/" className="group flex items-center" aria-label="Wed Filmer Home">
              <div className="relative h-10 w-32 transition-all duration-300 sm:h-12 sm:w-40 lg:h-14 lg:w-44">
                <Image
                  src="/logo-white.png"
                  alt="Wed Filmer"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-base font-medium text-gray-700 hover:text-black transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/contact"
                className="hidden rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-gray-800 sm:inline-flex"
              >
                Book Now
              </Link>
              <button
                onClick={toggleMenu}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white shadow-lg shadow-black/15 transition-all duration-300 hover:scale-105 hover:bg-gray-800 lg:hidden"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
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
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={closeMenu}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl border-l border-gray-200 lg:hidden"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 sm:px-6">
                  <div className="relative h-10 w-28 sm:h-12 sm:w-32">
                    <Image
                      src="/logo-white.png"
                      alt="Wed Filmer"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <button
                    onClick={closeMenu}
                    className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-black"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex-1 px-5 py-6 sm:px-6" aria-label="Mobile navigation">
                  <div className="flex flex-col gap-1">
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
                          className="block rounded-xl px-4 py-3 text-base font-medium text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:text-black"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                <div className="border-t border-gray-200 px-5 py-4 sm:px-6">
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="block w-full rounded-full bg-black px-6 py-3 text-center font-semibold text-white transition-all duration-300 hover:bg-gray-800"
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

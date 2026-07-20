"use client";

import { useState, useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, SERVICES.length - 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    // Calculate percentage across the container
    const percentage = Math.max(0, Math.min(1, x / width));
    
    // Map to an index (0 to SERVICES.length - 1)
    const newIndex = Math.min(Math.floor(percentage * SERVICES.length), SERVICES.length - 1);
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const calculateCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const isCenter = diff === 0;
    
    // Base properties (no wrap around, finite gallery)
    let x = `${diff * 65}%`;
    let scale = 1 - Math.abs(diff) * 0.15;
    let zIndex = 50 - Math.abs(diff);
    let opacity = 1 - Math.abs(diff) * 0.25;
    let rotateY = diff * -15; // Coverflow rotation
    let filter = `blur(${Math.abs(diff) * 2}px)`;

    // Hide cards that are too far away
    if (Math.abs(diff) > 2) {
      opacity = 0;
      scale = 0.4;
      x = `${Math.sign(diff) * 150}%`;
    }

    return { x, scale, zIndex, opacity, rotateY, filter, isCenter };
  };

  return (
    <section id="services" className="py-16 md:py-24 relative overflow-hidden" aria-label="Our services">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-[url('/hero-services.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" /> 
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_70%)]" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-16">
          <SectionHeading title="What We Offer" subtitle="Our Services" />
        </div>

        {/* Carousel Container */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative h-[400px] md:h-[480px] flex items-center justify-center w-full max-w-5xl mx-auto"
          style={{ perspective: 1200 }}
        >
          <AnimatePresence initial={false}>
            {SERVICES.map((service, index) => {
              const { x, scale, zIndex, opacity, rotateY, filter, isCenter } = calculateCardStyle(index);
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute top-0 w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] h-full origin-center cursor-pointer transition-all`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    x, 
                    scale, 
                    zIndex, 
                    opacity, 
                    rotateY,
                    filter
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.25, 0.46, 0.45, 0.94] 
                  }}
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (offset.x > 50 || velocity.x > 500) handlePrev();
                    else if (offset.x < -50 || velocity.x < -500) handleNext();
                  }}
                >
                  <div 
                    className={`glass-card p-6 md:p-8 h-full flex flex-col justify-center items-center text-center shadow-2xl transition-all duration-500 ${
                      isCenter ? 'border-white/50 ring-2 ring-accent/40 bg-white/60' : 'border-white/10 bg-white/30'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                      <Icon size={32} className="text-accent" />
                    </div>
                    
                    <h3 className={`font-heading text-xl md:text-2xl font-semibold mb-4 transition-colors ${
                      isCenter ? 'text-accent' : 'text-text'
                    }`}>
                      {service.title}
                    </h3>
                    
                    <p className={`text-muted text-sm leading-relaxed max-w-sm transition-opacity duration-300 ${
                      isCenter ? 'opacity-100' : 'opacity-0'
                    }`}>
                      {service.description}
                    </p>
                    
                    <div className={`mt-6 flex items-center gap-2 text-accent text-sm font-medium transition-opacity duration-300 ${
                      isCenter ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <span>Learn More</span>
                      <span>→</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-text/20 flex items-center justify-center text-text hover:bg-accent hover:text-white hover:border-accent transition-all hover:scale-110"
            aria-label="Previous service"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-text/20 flex items-center justify-center text-text hover:bg-accent hover:text-white hover:border-accent transition-all hover:scale-110"
            aria-label="Next service"
          >
            <ChevronRight size={24} />
          </button>
        </div>

      </div>
    </section>
  );
}

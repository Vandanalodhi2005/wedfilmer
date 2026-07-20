"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "3d-flip-up" | "3d-rotate-in";
  duration?: number;
  once?: boolean;
}

const directionMap = {
  up: { y: 40, x: 0, rotateX: 0, rotateY: 0, scale: 1 },
  down: { y: -40, x: 0, rotateX: 0, rotateY: 0, scale: 1 },
  left: { x: 40, y: 0, rotateX: 0, rotateY: 0, scale: 1 },
  right: { x: -40, y: 0, rotateX: 0, rotateY: 0, scale: 1 },
  "3d-flip-up": { y: 60, x: 0, rotateX: 45, rotateY: 0, scale: 0.9 },
  "3d-rotate-in": { y: 30, x: 0, rotateX: 20, rotateY: 15, scale: 0.95 },
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.7,
  once = true,
}: ScrollRevealProps) {
  const initialOffset = directionMap[direction] || directionMap.up;

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotateX: 0, rotateY: 0, scale: 1 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Better ease for 3D snap
      }}
      className={className}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

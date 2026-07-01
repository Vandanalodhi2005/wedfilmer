"use client";

import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gold?: boolean;
}

export function GlassCard({
  children,
  className = "",
  hover = true,
  gold = false,
}: GlassCardProps) {
  return (
    <div
      className={`
        glass-card
        ${hover ? "glass-card-hover" : ""}
        ${gold ? "border-accent/30" : ""}
        p-6 md:p-8
        ${className}
      `}
    >
      {children}
    </div>
  );
}

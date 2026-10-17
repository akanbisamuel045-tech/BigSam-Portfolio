"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  badge: string;
  blackText: string;
  grayText: string;
  align?: "split" | "center" | "stacked";
  theme?: "light" | "dark";
  rightContent?: React.ReactNode;
  className?: string;
  subtext?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  blackText,
  grayText,
  align = "split",
  theme = "light",
  rightContent,
  className,
  subtext,
}) => {
  const isDark = theme === "dark";

  const badgeElement = (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider select-none shrink-0",
        isDark
          ? "bg-[#1F1F1F] text-[#CCCCCC] border border-[#2E2E2E]"
          : "bg-[#EFEFEF] text-[#555555] border border-[#E2E2E2]"
      )}
    >
      <span className="w-2 h-2 rounded-full bg-[#E84511] animate-pulse" />
      <span>{badge}</span>
    </div>
  );

  const headlineElement = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-3"
    >
      <h2
        className={cn(
          "font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-[60px] leading-[1.04] tracking-[-0.03em] uppercase",
          align === "center" ? "text-center" : "text-left"
        )}
      >
        <span className={isDark ? "text-[#FFFFFF]" : "text-[#111111]"}>
          {blackText}{" "}
        </span>
        <span className="text-[#8E8E8E] transition-colors duration-500 hover:text-[#B0B0B0]">
          {grayText}
        </span>
      </h2>

      {subtext && (
        <p
          className={cn(
            "text-sm sm:text-base leading-relaxed max-w-2xl font-normal",
            isDark ? "text-[#AAAAAA]" : "text-[#666666]",
            align === "center" ? "mx-auto text-center" : "text-left"
          )}
        >
          {subtext}
        </p>
      )}
    </motion.div>
  );

  if (align === "center") {
    return (
      <div className={cn("space-y-4 max-w-4xl mx-auto text-center", className)}>
        <div className="flex justify-center">{badgeElement}</div>
        {headlineElement}
        {rightContent && <div className="pt-2 flex justify-center">{rightContent}</div>}
      </div>
    );
  }

  if (align === "stacked") {
    return (
      <div className={cn("space-y-4", className)}>
        {badgeElement}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          {headlineElement}
          {rightContent && <div className="shrink-0">{rightContent}</div>}
        </div>
      </div>
    );
  }

  // Default "split" layout: 3-column / split layout matching Portfoliob reference
  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start",
        className
      )}
    >
      {/* Left Column: Pill Badge */}
      <div className="lg:col-span-3 pt-1">
        {badgeElement}
      </div>

      {/* Center & Right Column: Display Headline + Right Slot */}
      <div className="lg:col-span-9 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          {headlineElement}
        </div>
        {rightContent && (
          <div className="shrink-0 pb-1">
            {rightContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;

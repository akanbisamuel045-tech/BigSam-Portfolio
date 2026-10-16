"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface GadexLogoProps {
  variant?: "light" | "dark" | "navbar";
  size?: "sm" | "md" | "lg";
  className?: string;
  showImage?: boolean;
}

export const GadexLogo: React.FC<GadexLogoProps> = ({
  variant = "light",
  size = "md",
  className,
  showImage = true,
}) => {
  const isNavbar = variant === "navbar";
  const isDark = variant === "dark" || isNavbar;

  const sizeConfig = {
    sm: {
      imgWidth: 26,
      imgHeight: 26,
      fontSize: "text-base sm:text-lg",
      brandMarkSize: "text-xs",
      gap: "gap-2",
    },
    md: {
      imgWidth: 34,
      imgHeight: 34,
      fontSize: "text-lg sm:text-xl",
      brandMarkSize: "text-sm",
      gap: "gap-2.5",
    },
    lg: {
      imgWidth: 44,
      imgHeight: 44,
      fontSize: "text-2xl sm:text-3xl",
      brandMarkSize: "text-base",
      gap: "gap-3",
    },
  }[size];

  return (
    <Link
      href="/"
      aria-label="Gadex® Home"
      className={cn(
        "inline-flex items-center group transition-opacity hover:opacity-95 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E84511]",
        sizeConfig.gap,
        className
      )}
    >
      {showImage && (
        <div
          className={cn(
            "relative flex items-center justify-center rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105",
            isNavbar
              ? "bg-white/10 border border-white/20 p-1"
              : isDark
              ? "bg-[#111111] border border-[#262626] p-1"
              : "bg-[#FFFFFF] border border-[#E2E2E2] p-1 shadow-sm"
          )}
          style={{ width: sizeConfig.imgWidth + 8, height: sizeConfig.imgHeight + 8 }}
        >
          <Image
            src={isDark ? "/assets/gadex-logo-white.png" : "/assets/gadex-logo.png"}
            alt="Gadex Emblem"
            width={sizeConfig.imgWidth}
            height={sizeConfig.imgHeight}
            className="object-contain"
            priority
          />
        </div>
      )}

      <span
        className={cn(
          "font-display font-extrabold tracking-[-0.04em] uppercase transition-colors",
          sizeConfig.fontSize,
          isNavbar ? "text-white" : isDark ? "text-white" : "text-[#111111]"
        )}
      >
        Gadex
        <span
          className={cn(
            "ml-0.5 font-bold transition-colors",
            sizeConfig.brandMarkSize,
            isNavbar ? "text-white" : "text-[#E84511]"
          )}
        >
          ®
        </span>
      </span>
    </Link>
  );
};

export default GadexLogo;

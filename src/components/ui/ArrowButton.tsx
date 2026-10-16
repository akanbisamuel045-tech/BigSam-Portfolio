"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ArrowButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "light" | "dark" | "full-dark";
  external?: boolean;
  className?: string;
  iconPosition?: "right" | "left";
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  text,
  href,
  onClick,
  type = "button",
  variant = "light",
  external = false,
  className,
}) => {
  // Variant styles
  const variantStyles = {
    light: {
      container:
        "bg-white border border-[#D8D8D8] text-[#111111] hover:border-[#E84511]",
      text: "text-[#111111] group-hover:text-white",
      iconBox: "bg-[#E84511] text-white",
      fillLayer: "bg-[#E84511]",
    },
    dark: {
      container:
        "bg-[#1A1A1A] border border-[#2E2E2E] text-white hover:border-[#E84511]",
      text: "text-white group-hover:text-white",
      iconBox: "bg-[#E84511] text-white",
      fillLayer: "bg-[#E84511]",
    },
    "full-dark": {
      container:
        "bg-[#111111] border border-[#262626] text-white hover:border-[#E84511]",
      text: "text-white group-hover:text-white",
      iconBox: "bg-[#E84511] text-white",
      fillLayer: "bg-[#E84511]",
    },
  }[variant];

  const content = (
    <>
      {/* Sliding fill background layer */}
      <span
        className={cn(
          "absolute inset-0 w-full h-full transform translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 z-0",
          variantStyles.fillLayer
        )}
      />

      {/* Button label text */}
      <span
        className={cn(
          "relative z-10 font-display font-bold text-xs uppercase tracking-wider pl-5 pr-3 py-2.5 transition-colors duration-300",
          variantStyles.text
        )}
      >
        {text}
      </span>

      {/* Signature ↗ box with rotation animation */}
      <span
        className={cn(
          "relative z-10 w-9 h-9 flex items-center justify-center shrink-0 my-1 mr-1 rounded-sm transition-transform duration-300 group-hover:rotate-45",
          variantStyles.iconBox
        )}
      >
        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
      </span>
    </>
  );

  const sharedClasses = cn(
    "group relative inline-flex items-center justify-between overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E84511] cursor-pointer select-none",
    variantStyles.container,
    className
  );

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("https://wa.me")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={sharedClasses}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={sharedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={sharedClasses}>
      {content}
    </button>
  );
};

export default ArrowButton;

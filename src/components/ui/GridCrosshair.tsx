import React from "react";
import { cn } from "@/lib/utils";

export interface GridCrosshairProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "inline";
  variant?: "light" | "dark" | "orange-bg";
  className?: string;
  size?: number;
}

export const GridCrosshair: React.FC<GridCrosshairProps> = ({
  position = "inline",
  variant = "light",
  className,
  size = 11,
}) => {
  const positionClasses = {
    "inline": "relative inline-block",
    "top-left": "absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10",
    "top-right": "absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 pointer-events-none z-10",
    "bottom-left": "absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 pointer-events-none z-10",
    "bottom-right": "absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 pointer-events-none z-10",
  }[position];

  const variantColor = {
    "light": "text-[#111111]/30",
    "dark": "text-white/25",
    "orange-bg": "text-white/40",
  }[variant];

  return (
    <span
      className={cn(positionClasses, variantColor, "flex items-center justify-center select-none", className)}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <line
          x1="5.5"
          y1="0"
          x2="5.5"
          y2="11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <line
          x1="0"
          y1="5.5"
          x2="11"
          y2="5.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
    </span>
  );
};

export default GridCrosshair;

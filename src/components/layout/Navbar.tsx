"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GadexLogo } from "@/components/ui/GadexLogo";
import { FullScreenMenu } from "@/components/layout/FullScreenMenu";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Service", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#E84511] text-white border-b border-white/20 h-16 md:h-[72px] shadow-sm select-none">
        <div className="grid grid-cols-2 md:grid-cols-5 h-full w-full max-w-[1600px] mx-auto">
          {/* Column 1: Brand Wordmark / Emblem */}
          <div className="border-r border-white/15 flex items-center px-6 md:px-10 h-full">
            <GadexLogo variant="navbar" size="sm" />
          </div>

          {/* Columns 2, 3, 4: 4 Architectural Grid Links (Desktop) */}
          <div className="hidden md:grid md:col-span-3 md:grid-cols-4 h-full">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "border-r border-white/15 flex items-center justify-center h-full px-4 text-xs md:text-sm tracking-wide font-medium transition-colors relative",
                    isActive
                      ? "text-white font-bold bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Column 5: Minimal 2-Line Hamburger Menu Button */}
          <div className="flex items-center justify-end md:justify-center px-6 h-full">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Menu"
              className="w-11 h-11 flex flex-col items-center justify-center gap-1.5 hover:bg-white/10 transition-colors cursor-pointer rounded-sm"
            >
              <span className="w-6 h-[2px] bg-white rounded-full transition-transform" />
              <span className="w-6 h-[2px] bg-white rounded-full transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Drawer Menu Modal */}
      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navbar;

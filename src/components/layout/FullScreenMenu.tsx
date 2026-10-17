"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Github, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { GadexLogo } from "@/components/ui/GadexLogo";
import { usePortfolioData } from "@/context/PortfolioContext";
import { cn } from "@/lib/utils";

export interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FullScreenMenu: React.FC<FullScreenMenuProps> = ({
  isOpen,
  onClose,
}) => {
  const { data: portfolioData } = usePortfolioData();
  const { personalInfo } = portfolioData;

  // Lock body scroll when drawer is open and listen for Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
    { label: "SERVICES", href: "/services" },
    { label: "BLOGS", href: "/articles" },
  ];

  const getSocialIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("github")) return <Github className="w-5 h-5" />;
    if (lower.includes("linkedin")) return <Linkedin className="w-5 h-5" />;
    if (lower.includes("twitter") || lower.includes("x"))
      return <Twitter className="w-5 h-5" />;
    if (lower.includes("whatsapp"))
      return <MessageCircle className="w-5 h-5" />;
    return <Plus className="w-5 h-5" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="full-screen-menu"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#140B08]/95 backdrop-blur-md text-white flex flex-col justify-between overflow-y-auto"
        >
          {/* Top Header Row */}
          <div className="h-16 md:h-[72px] border-b border-white/10 flex items-center justify-between px-6 md:px-12 shrink-0">
            <div onClick={onClose}>
              <GadexLogo variant="dark" size="sm" />
            </div>

            {/* Custom Interactive Close Button matching Reference Video (32px crossing lines) */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Menu"
              className="group relative w-12 h-12 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="relative w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:rotate-90">
                <span className="absolute w-8 h-[2px] bg-white transition-colors group-hover:bg-[#E84511] rotate-45" />
                <span className="absolute w-8 h-[2px] bg-white transition-colors group-hover:bg-[#E84511] -rotate-45" />
              </div>
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 max-w-[1600px] w-full mx-auto">
            {/* Left Column: 5 Massive Navigation Rows */}
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center px-6 md:px-14 py-10">
              <nav aria-label="Fullscreen Navigation" className="w-full">
                {navItems.map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "group flex items-center justify-between py-3 md:py-4 border-b border-white/10 last:border-b-0 transition-colors",
                      index === 0 && "pt-0"
                    )}
                  >
                    <span className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-white group-hover:text-[#E84511] group-hover:translate-x-3 transition-all duration-300">
                      {item.label}
                    </span>
                    <span className="w-8 h-8 flex items-center justify-center text-white/60 group-hover:text-[#E84511] group-hover:rotate-90 transition-all duration-300 shrink-0">
                      <Plus className="w-6 h-6 stroke-[2]" />
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right Column: Contact & Studio Info */}
            <div className="lg:col-span-5 flex flex-col justify-between px-6 md:px-14 py-10 bg-[#110906]/60 space-y-8">
              {/* Block 1: Contact Phone */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-widest text-[#8E8E8E] block">
                  Contact Phone
                </span>
                <a
                  href={`tel:${personalInfo.phoneRaw}`}
                  className="text-lg md:text-xl font-display font-bold text-white hover:text-[#E84511] transition-colors inline-block"
                >
                  (+234) 916 057 5724
                </a>
              </div>

              {/* Block 2: Contact Mail */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-widest text-[#8E8E8E] block">
                  Contact Mail
                </span>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-lg md:text-xl font-display font-bold text-white hover:text-[#E84511] transition-colors break-all inline-block"
                >
                  {personalInfo.email}
                </a>
              </div>

              {/* Block 3: Office Hours */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-widest text-[#8E8E8E] block">
                  Our Office are open 08AM - 08PM
                </span>
                <div className="text-lg md:text-xl font-display font-bold text-white">
                  Monday - Friday
                </div>
              </div>

              {/* Block 4: Social Links Row */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-[#8E8E8E] block">
                  Connect &amp; Follow
                </span>
                <div className="flex items-center gap-3">
                  {personalInfo.socialLinks.map((soc) => (
                    <a
                      key={soc.name}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={soc.name}
                      className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#E84511] hover:border-[#E84511] transition-all duration-300"
                    >
                      {getSocialIcon(soc.name)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Row */}
          <div className="border-t border-white/10 py-4 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-[#8E8E8E] shrink-0">
            <div>Gadex® Architectural Suite • Full-Stack Engineer</div>
            <div className="text-white">BigSam (Gadex®) © {personalInfo.copyrightYear}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenMenu;

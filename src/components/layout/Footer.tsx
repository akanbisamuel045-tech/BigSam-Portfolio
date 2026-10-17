"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ArrowUp, Github, Linkedin, MessageCircle, Mail } from "lucide-react";
import { GadexLogo } from "@/components/ui/GadexLogo";
import { usePortfolioData } from "@/context/PortfolioContext";

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const { data: portfolioData } = usePortfolioData();
  const { personalInfo } = portfolioData;

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "SERVICES", href: "/services" },
    { label: "ARTICLES", href: "/articles" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <footer className="w-full bg-[#111111] text-white border-t border-white/10 select-none relative z-10 overflow-hidden">
      {/* 1. Main 4-Column Editorial Directory */}
      <div className="max-w-[1600px] mx-auto py-16 md:py-20 px-6 md:px-10 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Column 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <GadexLogo variant="dark" size="lg" />

            <p className="text-xs sm:text-sm text-[#8E8E8E] max-w-sm leading-relaxed font-normal">
              Full-Stack Engineer architecting scalable, resilient web applications, modern APIs, and fluid user interfaces.
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={personalInfo.socialLinks[0]?.url || "https://github.com/akanbisamuel045-tech"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-[#E84511] hover:border-[#E84511] transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.socialLinks[1]?.url || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-[#E84511] hover:border-[#E84511] transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Direct"
                className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-[#E84511] hover:border-[#E84511] transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                aria-label="Email Direct"
                className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-[#E84511] hover:border-[#E84511] transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#E84511] block">
              NAVIGATION
            </span>

            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm font-display font-semibold uppercase tracking-tight text-[#8E8E8E] hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-300"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Direct (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#E84511] block">
              CONTACT DIRECT
            </span>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <span className="text-[#666666] block text-[10px] uppercase">EMAIL</span>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-white hover:text-[#E84511] transition-colors break-all"
                >
                  {personalInfo.email}
                </a>
              </div>

              <div>
                <span className="text-[#666666] block text-[10px] uppercase">PHONE / WHATSAPP</span>
                <a
                  href={personalInfo.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#E84511] transition-colors"
                >
                  {personalInfo.phone}
                </a>
              </div>

              <div>
                <span className="text-[#666666] block text-[10px] uppercase">HOURS</span>
                <span className="text-[#AAAAAA]">{personalInfo.officeHours}</span>
              </div>

              <div>
                <span className="text-[#666666] block text-[10px] uppercase">LOCATION</span>
                <span className="text-[#AAAAAA]">{personalInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Status & Availability (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#E84511] block">
              STATUS &amp; AVAILABILITY
            </span>

            <div className="bg-white/5 border border-white/10 p-4 rounded-sm space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  AVAILABLE FOR CONTRACTS
                </span>
              </div>

              <p className="text-[11px] text-[#8E8E8E] leading-relaxed">
                Accepting new MVP builds, full-stack systems engineering, and dedicated monthly retainers.
              </p>

              <a
                href={personalInfo.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#E84511] hover:bg-[#D43A08] text-white py-2.5 px-4 rounded-[2px] font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-300 group"
              >
                <span>BOOK DIRECT SPRINT</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Giant Architectural Display Wordmark Banner (matching video 00:35-00:36) */}
      <div className="w-full overflow-hidden select-none py-8 sm:py-12 md:py-16 text-center border-b border-white/10 flex items-center justify-center bg-black/40">
        <span className="font-display font-extrabold uppercase tracking-tighter text-white/[0.08] hover:text-[#E84511]/25 transition-colors duration-700 text-[18vw] sm:text-[20vw] md:text-[22vw] leading-none block">
          {personalInfo.firstName}
        </span>
      </div>

      {/* 3. Bottom Copyright & Utility Bar */}
      <div className="max-w-[1600px] mx-auto py-6 px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#777777]">
        <div className="flex items-center gap-2">
          <span>{personalInfo.displayName} ({personalInfo.brandName}) © {personalInfo.copyrightYear}. All rights reserved.</span>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer uppercase tracking-wider group"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#E84511] transition-transform duration-300 group-hover:-translate-y-1" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;

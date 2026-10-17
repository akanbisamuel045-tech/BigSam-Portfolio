"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GridCrosshair } from "@/components/ui/GridCrosshair";
import { usePortfolioData } from "@/context/PortfolioContext";

export const CtaBanner: React.FC = () => {
  const pathname = usePathname();
  const { data: portfolioData } = usePortfolioData();
  const { personalInfo } = portfolioData;
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Redirect directly to WhatsApp with prefilled message including email
    const waUrl = `https://wa.me/${personalInfo.phoneRaw}?text=${encodeURIComponent(
      `Hello ${personalInfo.displayName} (Gadex), I am interested in discussing a project. My email is: ${email}`
    )}`;
    window.open(waUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <section className="w-full bg-[#F6F6F6] py-16 md:py-24 px-6 md:px-10 border-b border-[#E2E2E2] select-none">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full bg-[#111111] text-white rounded-2xl md:rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden shadow-2xl border border-white/10"
        >
          {/* 4 Corner Crosshairs */}
          <GridCrosshair position="top-left" variant="light" />
          <GridCrosshair position="top-right" variant="light" />
          <GridCrosshair position="bottom-left" variant="light" />
          <GridCrosshair position="bottom-right" variant="light" />

          {/* Ambient Glowing Gradient Orbs */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#E84511]/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#E84511]/15 blur-3xl pointer-events-none" />

          {/* 12-Column Grid Content */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Block: Heading & Pitch */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-white/10 text-white border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#E84511] animate-pulse" />
                <span>LET&apos;S COLLABORATE</span>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-[1.04]">
                HAVE AN IDEA IN MIND?{" "}
                <span className="text-[#8E8E8E]">
                  LET&apos;S BUILD IT TOGETHER.
                </span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-[#AAAAAA] max-w-xl leading-relaxed font-normal">
                Available for full-stack web applications, scalable API architecture, performance optimization, and technical consulting worldwide.
              </p>
            </div>

            {/* Right Block: Interactive Quick Consultation Form */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
              <form
                onSubmit={handleSubmit}
                className="bg-white/5 border border-white/15 focus-within:border-[#E84511] p-1.5 rounded-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2 transition-colors duration-300 shadow-lg"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL..."
                  required
                  className="bg-transparent text-white placeholder-[#777777] text-xs font-mono px-4 py-3 focus:outline-none flex-1 uppercase"
                />

                <button
                  type="submit"
                  className="bg-[#E84511] hover:bg-[#D43A08] text-white px-6 py-3 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-300 rounded-[2px] shrink-0 cursor-pointer group"
                >
                  <span>{submitted ? "SENT" : "DISCUSS"}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                </button>
              </form>

              {/* Quick Direct Action Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[#8E8E8E] pt-1">
                <a
                  href={personalInfo.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    DIRECT CHAT: <span className="text-white group-hover:text-[#E84511] font-bold">{personalInfo.phone}</span>
                  </span>
                </a>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-[#E84511]"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaBanner;

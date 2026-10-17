"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { GridCrosshair } from "@/components/ui/GridCrosshair";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { portfolioData } from "@/data/portfolioData";

export default function NotFound() {
  const { personalInfo } = portfolioData;

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F6F6] text-[#111111] selection:bg-[#E84511] selection:text-white">
      {/* 404 Hero Section */}
      <section className="relative w-full border-b border-[#E2E2E2] py-24 md:py-36 px-6 md:px-10 overflow-hidden select-none">
        {/* Architectural Background Grid Line Markers */}
        <div className="max-w-[1600px] mx-auto relative">
          <GridCrosshair position="top-left" size={14} />
          <GridCrosshair position="top-right" size={14} />
          <GridCrosshair position="bottom-left" size={14} />
          <GridCrosshair position="bottom-right" size={14} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start max-w-4xl"
          >
            {/* Micro Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#EFEFEF] border border-[#E2E2E2] text-[#444444] mb-8">
              <span className="w-2 h-2 rounded-full bg-[#E84511] animate-pulse" />
              <span>{personalInfo.brandName} • ERROR 404</span>
            </div>

            {/* Giant Split-Tone Headline */}
            <h1 className="text-[14vw] sm:text-[11vw] md:text-[8.5vw] font-display font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-[#111111] mb-8">
              PAGE NOT <br />
              <span className="text-[#8E8E8E]">FOUND.</span>
            </h1>

            {/* Subtext */}
            <p className="text-sm md:text-base text-[#666666] max-w-xl font-normal leading-relaxed mb-10">
              The architectural route you requested does not exist or has been relocated within the current deployment. Return to the home experience or explore the engineering archive.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <ArrowButton text="BACK TO HOME" href="/" variant="dark" />
              <ArrowButton text="VIEW SERVICES" href="/services" variant="light" />
            </div>
          </motion.div>

          {/* Technical Metadata Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#E2E2E2] pt-8 font-mono text-xs text-[#777777]"
          >
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#E84511]" />
              <span>STATUS: HTTP 404 NOT_FOUND</span>
            </div>
            <div>
              <span>DEPLOYMENT: {personalInfo.brandName} ENGINE</span>
            </div>
            <div className="sm:text-right">
              <span>ACTIVE SYSTEM: OK</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pre-Footer CTA Banner */}
      <CtaBanner />
    </div>
  );
}

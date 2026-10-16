"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GridCrosshair } from "@/components/ui/GridCrosshair";
import { portfolioData } from "@/data/portfolioData";

export const HeroSection: React.FC = () => {
  const { personalInfo, heroFeaturedProject } = portfolioData;

  return (
    <section className="relative min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-72px)] w-full bg-gradient-to-b from-[#E84511] via-[#E3400E] to-[#D63808] text-white overflow-hidden flex flex-col justify-between select-none">
      {/* ============================================================== */}
      {/* LAYER 0: Exposed 4-Column Architectural Grid & Crosshair Lines */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-[1] pointer-events-none max-w-[1600px] mx-auto w-full">
        {/* 4 Vertical Grid Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 h-full w-full">
          <div className="border-r border-white/[0.14] h-full" />
          <div className="border-r border-white/[0.14] h-full" />
          <div className="hidden md:block border-r border-white/[0.14] h-full" />
          <div className="hidden md:block h-full" />
        </div>

        {/* 2 Horizontal Hairline Grid Lines */}
        <div className="absolute top-[32%] inset-x-0 w-full border-t border-white/[0.14]" />
        <div className="absolute top-[68%] inset-x-0 w-full border-t border-white/[0.14]" />

        {/* Intersecting Crosshair Markers */}
        <div className="hidden md:block absolute top-[32%] left-[25%] -translate-x-1/2 -translate-y-1/2">
          <GridCrosshair variant="orange-bg" />
        </div>
        <div className="hidden md:block absolute top-[32%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <GridCrosshair variant="orange-bg" />
        </div>
        <div className="hidden md:block absolute top-[32%] left-[75%] -translate-x-1/2 -translate-y-1/2">
          <GridCrosshair variant="orange-bg" />
        </div>

        <div className="hidden md:block absolute top-[68%] left-[25%] -translate-x-1/2 -translate-y-1/2">
          <GridCrosshair variant="orange-bg" />
        </div>
        <div className="hidden md:block absolute top-[68%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <GridCrosshair variant="orange-bg" />
        </div>
        <div className="hidden md:block absolute top-[68%] left-[75%] -translate-x-1/2 -translate-y-1/2">
          <GridCrosshair variant="orange-bg" />
        </div>
      </div>

      {/* ============================================================== */}
      {/* LAYER 1: Giant Background Watermark Typography */}
      {/* ============================================================== */}
      <div className="absolute top-2 md:top-4 inset-x-0 flex justify-center pointer-events-none overflow-hidden z-[2]">
        <motion.span
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-[21vw] md:text-[18.5vw] font-display font-extrabold uppercase leading-[0.82] tracking-[-0.055em] text-white/[0.09] whitespace-nowrap select-none"
        >
          {personalInfo.firstName}
        </motion.span>
      </div>

      {/* ============================================================== */}
      {/* LAYER 2: Center Cutout Portrait of Samuel */}
      {/* ============================================================== */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[10] pointer-events-none flex items-end justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative flex items-end justify-center"
        >
          <Image
            src={personalInfo.heroPortrait}
            alt={`${personalInfo.displayName} — ${personalInfo.role}`}
            width={900}
            height={1100}
            priority
            className="h-[56vh] sm:h-[68vh] md:h-[78vh] lg:h-[85vh] w-auto object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.32)]"
          />
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* LAYER 3: Foreground Content Grid */}
      {/* ============================================================== */}
      <div className="relative z-[20] max-w-[1600px] w-full mx-auto flex-1 flex flex-col justify-between px-6 md:px-10 pt-8 pb-6 md:py-10">
        {/* MIDDLE ROW: Left Tagline + Right Polaroid Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 my-auto pt-4 md:pt-0">
          {/* Left Tagline Block */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-5 lg:col-span-4"
          >
            <p className="text-xs sm:text-sm md:text-[15px] font-display font-bold uppercase leading-[1.45] tracking-[0.02em] text-white max-w-[310px] drop-shadow-sm">
              {personalInfo.heroTagline}
            </p>
          </motion.div>

          {/* Right Polaroid Featured Project Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:col-span-4 md:col-start-9 lg:col-span-3 lg:col-start-10 flex md:justify-end"
          >
            <Link
              href={heroFeaturedProject.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Featured Project: ${heroFeaturedProject.title}`}
              className="group bg-white text-[#111111] p-2.5 w-[200px] sm:w-[225px] md:w-[245px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-[#F6F6F6]">
                <Image
                  src={heroFeaturedProject.image}
                  alt={heroFeaturedProject.title}
                  fill
                  sizes="(max-width: 768px) 220px, 260px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Bottom Caption Bar */}
              <div className="pt-2.5 pb-0.5 px-1 flex items-center justify-between text-[11px] font-display font-bold tracking-wider uppercase">
                <div className="flex items-center truncate pr-1">
                  <span className="w-2 h-2 rounded-full bg-[#E84511] inline-block mr-1.5 shrink-0" />
                  <span className="text-[#111111] truncate">{heroFeaturedProject.title}</span>
                </div>
                <span className="text-[#8E8E8E] font-medium shrink-0">
                  {heroFeaturedProject.category}
                </span>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* BOTTOM ROW: Giant Foreground Name + Bottom-Right Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-6 mt-auto pt-6">
          {/* Bottom-Left Foreground Display Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="lg:col-span-8 flex flex-col items-start"
          >
            <span className="text-base sm:text-lg md:text-2xl font-display font-bold tracking-tight text-white mb-1 md:mb-2">
              ©{personalInfo.copyrightYear}
            </span>
            <h1 className="text-[15vw] sm:text-[13vw] lg:text-[9.8vw] font-display font-extrabold uppercase leading-[0.82] tracking-[-0.04em] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
              {personalInfo.firstName}
            </h1>
          </motion.div>

          {/* Bottom-Right "Let's Talk" Floating Profile Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-4 flex lg:justify-end"
          >
            <a
              href={personalInfo.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book Direct WhatsApp Consultation with BigSam"
              className="group bg-[#111111] hover:bg-[#181818] text-white p-2.5 pr-3.5 flex items-center justify-between gap-4 w-full sm:w-[320px] md:w-[340px] shadow-[0_20px_45px_rgba(0,0,0,0.4)] border border-white/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {/* Left Avatar Thumbnail */}
              <div className="relative w-14 h-16 shrink-0 overflow-hidden bg-[#E84511] rounded-sm">
                <Image
                  src={personalInfo.avatarImage}
                  alt={personalInfo.displayName}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              {/* Center Info Stack */}
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#A0A0A0] leading-tight mb-1">
                  Let&#39;s Talk
                </span>
                <span className="text-base font-display font-extrabold text-white leading-tight truncate">
                  {personalInfo.displayName}
                </span>
                <span className="text-xs font-mono text-[#8E8E8E] leading-tight truncate">
                  {personalInfo.role}
                </span>
              </div>

              {/* Right Action Box with 45° Arrow Rotation */}
              <div className="w-9 h-9 bg-white group-hover:bg-[#E84511] text-[#111111] group-hover:text-white flex items-center justify-center shrink-0 rounded-sm transition-colors duration-300">
                <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:rotate-45" />
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

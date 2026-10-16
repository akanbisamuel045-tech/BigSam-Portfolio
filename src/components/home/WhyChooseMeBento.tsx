"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { portfolioData } from "@/data/portfolioData";

export const WhyChooseMeBento: React.FC = () => {
  const { stats, personalInfo } = portfolioData;

  // Sample client avatars for trust stack
  const clientAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
  ];

  return (
    <section
      id="why-choose-me"
      className="w-full bg-[#F6F6F6] py-20 md:py-28 px-6 md:px-10 border-b border-[#E2E2E2] select-none"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Top Section Header */}
        <SectionHeader
          badge="WHY CHOOSE ME"
          blackText="FOCUSED ON CODE"
          grayText="THAT DELIVERS RESULTS"
          align="split"
        />

        {/* 3-Column Bento Grid */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* ========================================================== */}
          {/* COLUMN 1: 4+ Years Experience & 98% Client Satisfaction */}
          {/* ========================================================== */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            {/* Top Stat Card: Engineering Experience */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="bg-white p-7 md:p-9 border border-[#EAEAEA] rounded-sm shadow-sm flex-1 flex flex-col justify-between group hover:border-[#E84511]/40 transition-colors duration-300"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#E84511] text-xs">✦</span>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#666666]">
                  ENGINEERING EXPERIENCE
                </span>
              </div>

              <div className="my-6">
                <div className="text-5xl md:text-6xl font-display font-extrabold tracking-tight text-[#111111] group-hover:text-[#E84511] transition-colors duration-300">
                  {stats.yearsExperience}
                  {stats.yearsSuffix}
                </div>
              </div>

              <p className="text-xs md:text-sm text-[#777777] leading-relaxed font-normal">
                Architecting modern full-stack systems with a focus on scalability, speed, and impact.
              </p>
            </motion.div>

            {/* Bottom Stat Card: Client Satisfaction */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-7 md:p-9 border border-[#EAEAEA] rounded-sm shadow-sm flex-1 flex flex-col justify-between group hover:border-[#E84511]/40 transition-colors duration-300"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#E84511] text-xs">✦</span>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#666666]">
                  CLIENT SATISFACTION
                </span>
              </div>

              <div className="my-6">
                <div className="text-5xl md:text-6xl font-display font-extrabold tracking-tight text-[#111111] group-hover:text-[#E84511] transition-colors duration-300">
                  {stats.clientSatisfaction}
                  {stats.satisfactionSuffix}
                </div>
              </div>

              <p className="text-xs md:text-sm text-[#777777] leading-relaxed font-normal">
                Focused on delivering resilient digital products that meet both user needs and business goals.
              </p>
            </motion.div>
          </div>

          {/* ========================================================== */}
          {/* COLUMN 2: Amber Glow & Trust Stack + Floating Rating Card */}
          {/* ========================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-4 relative min-h-[480px] md:min-h-[540px] bg-gradient-to-br from-[#FFF8F5] via-[#FFEFE7] to-[#FDE8DC] border border-[#EAEAEA] p-6 md:p-8 flex flex-col justify-between overflow-hidden rounded-sm shadow-sm"
          >
            {/* Ambient Radial Blur Glows */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-[#E84511]/25 to-[#FFA500]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-tr from-[#E84511]/20 to-[#FF8C00]/25 blur-3xl pointer-events-none" />

            {/* Top: Avatar Trust Stack */}
            <div className="relative z-10">
              <div className="flex items-center">
                {clientAvatars.map((av, i) => (
                  <div
                    key={i}
                    className="relative w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-sm -ml-2 first:ml-0"
                  >
                    <Image
                      src={av}
                      alt={`Client Avatar ${i + 1}`}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-xs font-display font-bold text-[#111111] mt-2.5">
                {stats.happyClients}
                {stats.happyClientsSuffix} Happy Clients Successfully
              </div>
            </div>

            {/* Bottom: Floating Glass Rating Card */}
            <div className="relative z-10 bg-white/95 backdrop-blur-md p-5 md:p-6 shadow-lg border border-[#EAEAEA] rounded-sm">
              {/* Star Rating Row */}
              <div className="flex items-center gap-1.5">
                <span className="text-[#E84511] text-sm tracking-widest">★★★★★</span>
                <span className="text-xs font-display font-extrabold text-[#111111] ml-2">
                  4.9/5
                </span>
              </div>

              {/* Reviewer Quote */}
              <p className="text-xs text-[#555555] leading-relaxed my-3.5 font-normal">
                &ldquo;BigSam delivered an outstanding full-stack platform that perfectly matched our vision. His attention to architecture and UI detail is exceptional.&rdquo;
              </p>

              {/* Reviewer Details */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#F0F0F0]">
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#E2E2E2] shrink-0">
                  <Image
                    src={clientAvatars[2]}
                    alt="Olivia Davis"
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-display font-extrabold text-[#111111]">
                    Olivia Davis
                  </div>
                  <div className="text-[11px] font-mono text-[#888888]">
                    Product Manager
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========================================================== */}
          {/* COLUMN 3: Visual Portrait Card & Fast & Reliable Card */}
          {/* ========================================================== */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            {/* Top: Studio Headshot Portrait Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-[4/3.6] w-full overflow-hidden bg-[#111111] rounded-sm border border-[#EAEAEA] shadow-sm group"
            >
              <Image
                src={personalInfo.impactPortrait}
                alt={`${personalInfo.displayName} Studio Portrait`}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111111]/80 to-transparent flex items-end p-3.5">
                <span className="text-[10px] font-mono tracking-widest uppercase bg-[#111111]/90 text-white/90 px-2.5 py-1 rounded-sm border border-white/10">
                  FULL-STACK HEADQUARTERS
                </span>
              </div>
            </motion.div>

            {/* Bottom: Fast & Reliable Feature Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-white p-7 md:p-9 border border-[#EAEAEA] rounded-sm shadow-sm flex-1 flex flex-col justify-between group hover:border-[#E84511]/40 transition-colors duration-300"
            >
              {/* Lightning Bolt Icon */}
              <div className="w-6 h-6 mb-6 text-[#E84511] transition-transform duration-300 group-hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
                </svg>
              </div>

              <div>
                <h3 className="text-sm md:text-base font-display font-extrabold uppercase tracking-tight text-[#111111] mb-2 group-hover:text-[#E84511] transition-colors duration-300">
                  FAST &amp; RELIABLE
                </h3>
                <p className="text-xs md:text-sm text-[#777777] leading-relaxed font-normal">
                  I maintain an efficient engineering workflow that ensures smooth collaboration, clean code, and on-time delivery.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* Full-Width Rounded Workspace Showcase Banner (00:23–00:24) */}
        {/* ========================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mt-14 md:mt-20 relative w-full aspect-[16/9] md:aspect-[21/9.5] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-[#111111] border border-[#E2E2E2] group"
        >
          <motion.div
            initial={{ scale: 1.04 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&auto=format&fit=crop&q=85"
              alt="BigSam Developer Workspace"
              fill
              sizes="(max-width: 1600px) 100vw, 1600px"
              className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
          </motion.div>

          {/* Subtle Ambient Vignette & Label */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <span className="w-2 h-2 rounded-full bg-[#E84511] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              {personalInfo.brandName} • ENGINEERING ENVIRONMENT
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseMeBento;

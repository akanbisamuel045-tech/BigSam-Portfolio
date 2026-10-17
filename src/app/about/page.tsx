"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WhyChooseMeBento } from "@/components/home/WhyChooseMeBento";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { usePortfolioData } from "@/context/PortfolioContext";

export default function AboutPage() {
  const { data: portfolioData } = usePortfolioData();
  const { personalInfo, stats, achievements, career, clientLogos } = portfolioData;

  const editorialStrip = [
    {
      id: "strip-1",
      title: "ARCHITECTURE & CLOUD",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80",
      bg: "bg-[#111111]",
    },
    {
      id: "strip-2",
      title: `${personalInfo.displayName.toUpperCase()} (${personalInfo.brandName})`,
      image: "/assets/samuel-impact.png",
      bg: "bg-[#E84511]",
      isPortrait: true,
    },
    {
      id: "strip-3",
      title: "COLLABORATIVE SYSTEMS",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80",
      bg: "bg-[#111111]",
    },
    {
      id: "strip-4",
      title: "HARDWARE & CODE AESTHETIC",
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&auto=format&fit=crop&q=80",
      bg: "bg-[#E84511]",
    },
  ];

  const trustAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
  ];

  const fallbackBrands = [
    "GADEX LABS",
    "NEXTWAVE TECH",
    "CLOUDSCALE",
    "APEX DIGITAL",
    "VORTEX SYSTEMS",
    "HYPERION IO",
    "STRATA CLOUD",
    "KINETIC WEB",
    "CYBERPULSE",
    "SYNAPSE AI",
    "NEXUS CORE",
    "AURA PROTOCOL",
    "PRISM MEDIA",
    "VECTOR DEV",
    "QUANTUM STACK",
  ];
  const clientBrands = clientLogos && clientLogos.length > 0 ? clientLogos : fallbackBrands;

  const achievementIcons = [
    // 0: Geometric 8-point Asterisk
    <svg
      key="asterisk"
      className="w-10 h-10 text-[#555555] group-hover:text-[#E84511] transition-colors duration-300"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
    </svg>,
    // 1: Geometric Concentric Circle-Ring
    <svg
      key="ring"
      className="w-10 h-10 text-[#555555] group-hover:text-[#E84511] transition-colors duration-300"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </svg>,
    // 2: Geometric Lightning-Slash
    <svg
      key="lightning"
      className="w-10 h-10 text-[#555555] group-hover:text-[#E84511] transition-colors duration-300"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>,
    // 3: Geometric 4-Circle Clover / Plus
    <svg
      key="clover"
      className="w-10 h-10 text-[#555555] group-hover:text-[#E84511] transition-colors duration-300"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <circle cx="7" cy="7" r="5" />
      <circle cx="17" cy="7" r="5" />
      <circle cx="7" cy="17" r="5" />
      <circle cx="17" cy="17" r="5" />
    </svg>,
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F6F6] text-[#111111] selection:bg-[#E84511] selection:text-white">
      {/* ============================================================== */}
      {/* SECTION 1: GIANT ABOUT US HERO HEADER & 4-IMAGE PHOTO STRIP    */}
      {/* ============================================================== */}
      <section className="w-full bg-[#F6F6F6] select-none">
        {/* Top Title Container (00:38-00:40) */}
        <div className="max-w-[1600px] mx-auto pt-14 md:pt-24 pb-10 md:pb-16 px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-[#111111] mb-2 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E84511] animate-pulse" />
              <span>{personalInfo.brandName}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2E2E2] pb-6 md:pb-8">
              <h1 className="text-[14vw] sm:text-[12vw] md:text-[9.5vw] font-display font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-[#111111]">
                ABOUT US
              </h1>

              <div className="text-xs md:text-sm font-semibold font-mono pb-2 shrink-0">
                <span className="text-[#111111] font-bold">©{personalInfo.copyrightYear}</span>{" "}
                <span className="text-[#8E8E8E]">(Scroll to Explore)</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4-Column Horizontal Photo Strip (00:40-00:42) */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 pb-20 md:pb-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {editorialStrip.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`group aspect-[4/4.6] relative overflow-hidden ${item.bg} border border-[#E2E2E2] shadow-sm`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={`object-cover group-hover:scale-105 transition-transform duration-700 ${
                    item.isPortrait ? "object-contain object-bottom" : ""
                  }`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    {item.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: PHILOSOPHY & LARGE LIGHT/OUTLINE STATS (00:42-00:44)*/}
      {/* ============================================================== */}
      <section className="w-full bg-white py-20 md:py-28 px-6 md:px-10 border-t border-b border-[#E2E2E2] select-none">
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header */}
          <SectionHeader
            badge="OUR SERVICES"
            blackText={personalInfo.philosophyHeadline.black}
            grayText={personalInfo.philosophyHeadline.gray}
          />

          {/* Subtext Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 mt-8 mb-16">
            <div className="lg:col-span-7 lg:col-start-5">
              <p className="text-xs md:text-sm text-[#777777] leading-relaxed max-w-2xl font-normal">
                {personalInfo.philosophySubtext}
              </p>
            </div>
          </div>

          {/* Bottom 12-Column Stats & Trust Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-10 pt-6">
            {/* Left: Overlapping avatars + stars + reliability */}
            <div className="lg:col-span-4 flex items-center gap-4">
              <div className="flex -space-x-3 items-center">
                {trustAvatars.map((src, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative shadow-sm"
                  >
                    <Image
                      src={src}
                      alt="Client Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[#E84511] text-xs tracking-wider">
                  ★★★★★
                </span>
                <span className="text-xs font-extrabold text-[#111111] uppercase tracking-wider">
                  {stats.trustBadgeCount}
                </span>
              </div>
            </div>

            {/* Right: 3 Large Light/Outline Stats */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Stat 1 */}
              <div className="border-l border-[#E2E2E2] pl-6 flex flex-col justify-between">
                <span
                  className="text-6xl md:text-7xl font-display font-extrabold tracking-tight mb-4 select-none"
                  style={{
                    color: "#F0F0F0",
                    WebkitTextStroke: "1.5px #CCCCCC",
                  }}
                >
                  {stats.projectsCompleted}
                  {stats.projectsSuffix}
                </span>
                <div>
                  <h4 className="font-display font-extrabold text-sm uppercase tracking-tight text-[#111111] mb-1.5">
                    Successful Projects
                  </h4>
                  <p className="text-xs text-[#8E8E8E] leading-relaxed font-normal">
                    Engineered for brands and startups across multiple industries worldwide.
                  </p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="border-l border-[#E2E2E2] pl-6 flex flex-col justify-between">
                <span
                  className="text-6xl md:text-7xl font-display font-extrabold tracking-tight mb-4 select-none"
                  style={{
                    color: "#F0F0F0",
                    WebkitTextStroke: "1.5px #CCCCCC",
                  }}
                >
                  {stats.yearsExperience}
                  {stats.yearsSuffix}
                </span>
                <div>
                  <h4 className="font-display font-extrabold text-sm uppercase tracking-tight text-[#111111] mb-1.5">
                    Years Experience
                  </h4>
                  <p className="text-xs text-[#8E8E8E] leading-relaxed font-normal">
                    Architecting modern and high-converting full-stack web experiences.
                  </p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="border-l border-[#E2E2E2] pl-6 flex flex-col justify-between">
                <span
                  className="text-6xl md:text-7xl font-display font-extrabold tracking-tight mb-4 select-none"
                  style={{
                    color: "#F0F0F0",
                    WebkitTextStroke: "1.5px #CCCCCC",
                  }}
                >
                  {stats.globalClients}
                </span>
                <div>
                  <h4 className="font-display font-extrabold text-sm uppercase tracking-tight text-[#111111] mb-1.5">
                    Global Clients
                  </h4>
                  <p className="text-xs text-[#8E8E8E] leading-relaxed font-normal">
                    Collaborating with founders, agencies, and remote product teams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: FULL-WIDTH DARK ACHIEVEMENTS GRID (00:44-00:48)    */}
      {/* ============================================================== */}
      <section className="w-full bg-[#111111] text-white py-20 md:py-28 px-6 md:px-10 select-none">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <SectionHeader
            badge="HONORS & AWARDS"
            blackText={`${personalInfo.firstName}®`}
            grayText="ACHIEVEMENTS"
            theme="dark"
          />

          {/* 2x2 Dark Achievements Grid */}
          <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {achievements.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-[#1A1A1A] border border-white/10 hover:border-[#E84511]/50 p-6 md:p-8 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center transition-all duration-300 rounded-sm"
              >
                {/* Left Icon Box */}
                <div className="sm:col-span-4 aspect-square bg-[#222222] border border-white/5 flex items-center justify-center p-6 group-hover:bg-[#282828] transition-colors duration-300">
                  {achievementIcons[idx % achievementIcons.length]}
                </div>

                {/* Right Content Column */}
                <div className="sm:col-span-8 flex flex-col justify-between h-full py-1">
                  <h3 className="text-base md:text-lg font-display font-extrabold uppercase tracking-tight text-white mb-8 leading-snug group-hover:text-[#E84511] transition-colors duration-300">
                    {item.title}
                  </h3>

                  <div className="mt-auto flex flex-col gap-2.5 text-xs font-mono">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-[#8E8E8E] uppercase tracking-wider">
                        Achievement
                      </span>
                      <span className="text-white font-bold tracking-tight">
                        {item.organization}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[#8E8E8E] uppercase tracking-wider">
                        Year
                      </span>
                      <span className="text-white font-bold tracking-tight">
                        {item.year}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: CAREER JOURNEY & 3x5 CHECKERBOARD CLIENT GRID       */}
      {/* ============================================================== */}
      <section className="w-full bg-[#F6F6F6] py-20 md:py-28 px-6 md:px-10 border-b border-[#E2E2E2] select-none">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <SectionHeader
            badge="CAREER JOURNEY"
            blackText="PURPOSE-DRIVEN"
            grayText="EXPERIENCES FOR MODERN COMPANIES"
          />

          {/* 2-Column Staggered Career Cards (00:49-00:50) */}
          <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Card 1: md:col-span-5 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-5 space-y-3"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-white relative group border border-[#E2E2E2] shadow-sm">
                <Image
                  src={
                    career[0]?.image ||
                    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80"
                  }
                  alt={career[0]?.company || "Freelance Full-Stack"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <h4 className="text-xs md:text-sm font-display font-extrabold uppercase tracking-tight text-[#111111]">
                {career[0]?.company} {career[0]?.period}
              </h4>
            </motion.div>

            {/* Card 2: md:col-span-7 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="md:col-span-7 space-y-3"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-white relative group border border-[#E2E2E2] shadow-sm">
                <Image
                  src={
                    career[1]?.image ||
                    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=80"
                  }
                  alt={career[1]?.company || "Gadex Engineering"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
              <h4 className="text-xs md:text-sm font-display font-extrabold uppercase tracking-tight text-[#111111]">
                {career[1]?.company} {career[1]?.period}
              </h4>
            </motion.div>
          </div>

          {/* 3x5 Checkerboard Client Logo Grid (00:50-00:52) */}
          <div className="mt-20 md:mt-28">
            <div className="mb-4 text-xs font-mono font-bold uppercase tracking-widest text-[#8E8E8E]">
              TRUSTED COLLABORATORS &amp; CLIENT NETWORK
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border border-[#E2E2E2] bg-[#E2E2E2] gap-[1px]">
              {clientBrands.map((brand, idx) => {
                const isEvenCell = idx % 2 === 0;
                return (
                  <div
                    key={brand}
                    className={`aspect-[16/9] flex items-center justify-center p-4 group transition-colors duration-300 hover:bg-white cursor-default ${
                      isEvenCell ? "bg-[#EDEDED]" : "bg-[#F9F9F9]"
                    }`}
                  >
                    <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#666666] group-hover:text-[#E84511] uppercase text-center transition-colors duration-300">
                      {brand}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5: WHY CHOOSE ME BENTO & WORKSPACE BANNER               */}
      {/* ============================================================== */}
      <WhyChooseMeBento />

      {/* ============================================================== */}
      {/* SECTION 6: SHARED FREQUENT QUESTIONS ACCORDION (00:57-01:01)   */}
      {/* ============================================================== */}
      <FaqAccordion />

      {/* ============================================================== */}
      {/* SECTION 7: PRE-FOOTER CTA BANNER                                */}
      {/* ============================================================== */}
      <CtaBanner />
    </div>
  );
}

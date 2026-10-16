"use client";

import React from "react";
import Image from "next/image";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { ImpactSection } from "@/components/home/ImpactSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProjectsGrid } from "@/components/home/ProjectsGrid";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { portfolioData } from "@/data/portfolioData";

export default function HomePage() {
  const { personalInfo } = portfolioData;

  const stage8Gates = [
    {
      title: "3-Row Staggered Editorial Grid",
      status: "PASS",
      detail: "Rows 1, 2, and 3 match exact reference video layout at 00:14–00:19",
    },
    {
      title: "Row 1: 5-Col & 4-Col Offset",
      status: "PASS",
      detail: "GADEX NEXUS (col 1-5) and PULSE FINTECH (col 9-12 offset)",
    },
    {
      title: "Row 2: Full-Width 12-Col Banner",
      status: "PASS",
      detail: "ARKEO CLOUD ENGINE full-width 21/9 panoramic card",
    },
    {
      title: "Row 3: Square & 6-Col Offset",
      status: "PASS",
      detail: "NOVU ANALYTICS (col 1-4) and ZENTIX API HUB (col 7-12 offset)",
    },
    {
      title: "White Editorial Picture Frames",
      status: "PASS",
      detail: "Crisp white frames with soft shadows, padding, and bottom caption bars",
    },
    {
      title: "Interactive Hover Badge Cursor",
      status: "PASS",
      detail: "Orange circular ↗ badge scales and fades in on image hover matching 00:18",
    },
    {
      title: "Sparkle & Title Hover Accents",
      status: "PASS",
      detail: "✦ rotates 90deg and project title highlights in #E84511 on hover",
    },
    {
      title: "Bottom-Left ALL PROJECTS CTA",
      status: "PASS",
      detail: "Sliding orange ArrowButton linking directly to BigSam GitHub repository",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F6F6] text-[#111111] selection:bg-[#E84511] selection:text-white">
      {/* ============================================================== */}
      {/* 1. HERO SECTION (STAGE 5 IMPLEMENTATION) */}
      {/* ============================================================== */}
      <HeroSection />

      {/* ============================================================== */}
      {/* 2. BRAND MARQUEE (STAGE 6 IMPLEMENTATION) */}
      {/* ============================================================== */}
      <BrandMarquee />

      {/* ============================================================== */}
      {/* 3. IMPACT SECTION (STAGE 6 IMPLEMENTATION) */}
      {/* ============================================================== */}
      <ImpactSection />

      {/* ============================================================== */}
      {/* 4. SERVICES SECTION (STAGE 7 IMPLEMENTATION) */}
      {/* ============================================================== */}
      <ServicesSection />

      {/* ============================================================== */}
      {/* 5. PROJECTS GRID SECTION (STAGE 8 IMPLEMENTATION) */}
      {/* ============================================================== */}
      <ProjectsGrid />

      {/* ============================================================== */}
      {/* 6. DIAGNOSTIC, GATES & STAGE 8 VERIFICATION SUITE */}
      {/* ============================================================== */}
      <div className="p-6 md:p-12 lg:p-16 space-y-16 max-w-7xl mx-auto w-full">
        {/* Stage 8 Status Banner */}
        <div className="border-b border-[#E2E2E2] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#E84511] font-bold">
              STAGE 8 / 15
            </span>
            <h2 className="font-display font-extrabold text-2xl tracking-tight text-[#111111]">
              EDITORIAL ASYMMETRIC PORTFOLIO GRID
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs uppercase font-mono tracking-widest font-semibold px-3 py-1.5 bg-white border border-[#E2E2E2] rounded-full text-[#111111] shadow-sm">
              Stage 8 Verified &amp; Active
            </span>
          </div>
        </div>

        {/* Section Header */}
        <SectionHeader
          badge="STAGE 6 ARCHITECTURE"
          blackText="EDITORIAL TRANSITION"
          grayText="& STATISTICAL PROOF."
          align="split"
          subtext="BrandMarquee introduces social proof from leading brands, transitioning smoothly into the 12-column asymmetric ImpactSection showcasing BigSam's editorial portrait, spinning geometric asterisk, and core career metrics."
          rightContent={
            <ArrowButton
              text="DISCUSS PROJECT"
              href={personalInfo.bookingUrl}
              external
              variant="light"
            />
          }
        />

        {/* Real User Assets Showcase: BigSam Facecard & Original Gadex Logo */}
        <section className="space-y-6">
          <div className="border-b border-[#E2E2E2] pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[#111111]">
                Real User Assets (Loaded from raw-assets/ &amp; processed to public/assets/)
              </h3>
              <p className="text-xs text-[#8E8E8E]">
                Original Gadex® logo &amp; BigSam&#39;s studio facecard cut out with edge-aware transparency
              </p>
            </div>
            <span className="text-xs font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-bold">
              100% Processed &amp; Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Original Gadex Logo (Light) */}
            <div className="bg-white border border-[#E2E2E2] p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8E8E8E] font-semibold">
                Original Gadex Logo (Cutout)
              </span>
              <div className="h-40 bg-[#F6F6F6] rounded-xl border border-[#E2E2E2] flex items-center justify-center p-4">
                <Image
                  src="/assets/gadex-logo.png"
                  alt="Original Gadex Logo"
                  width={220}
                  height={80}
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <span className="text-xs font-mono text-[#555555]">
                public/assets/gadex-logo.png
              </span>
            </div>

            {/* 2. Original Gadex Logo (White / Dark) */}
            <div className="bg-[#111111] border border-[#262626] p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8E8E8E] font-semibold">
                Gadex Logo (Monochrome Dark)
              </span>
              <div className="h-40 bg-[#1A1A1A] rounded-xl border border-[#262626] flex items-center justify-center p-4">
                <Image
                  src="/assets/gadex-logo-white.png"
                  alt="Gadex Logo White"
                  width={220}
                  height={80}
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <span className="text-xs font-mono text-[#AAAAAA]">
                public/assets/gadex-logo-white.png
              </span>
            </div>

            {/* 3. BigSam Facecard / Avatar */}
            <div className="bg-white border border-[#E2E2E2] p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8E8E8E] font-semibold">
                BigSam Facecard (Natural)
              </span>
              <div className="h-40 bg-[#F6F6F6] rounded-xl border border-[#E2E2E2] flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/samuel-avatar.png"
                  alt="BigSam Facecard"
                  width={140}
                  height={140}
                  className="w-32 h-32 rounded-full object-cover shadow-md border-2 border-[#E84511]"
                />
              </div>
              <span className="text-xs font-mono text-[#555555]">
                public/assets/samuel-avatar.png (400x400)
              </span>
            </div>

            {/* 4. BigSam Hero Cutout Portrait */}
            <div className="bg-white border border-[#E2E2E2] p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8E8E8E] font-semibold">
                BigSam Hero Cutout Portrait
              </span>
              <div className="h-40 bg-gradient-to-b from-[#E84511]/15 to-[#F6F6F6] rounded-xl border border-[#E2E2E2] flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/hero-portrait.png"
                  alt="BigSam Hero Cutout"
                  width={140}
                  height={160}
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <span className="text-xs font-mono text-[#555555]">
                public/assets/hero-portrait.png
              </span>
            </div>
          </div>
        </section>

        {/* Stage 8 Verification Gates */}
        <section className="space-y-4">
          <h3 className="font-display font-bold text-sm uppercase tracking-widest text-[#111111]">
            Stage 8 Architectural Verification Gates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stage8Gates.map((gate) => (
              <div
                key={gate.title}
                className="bg-white border border-[#E2E2E2] p-4 rounded-xl flex flex-col justify-between space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-xs tracking-tight">{gate.title}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {gate.status}
                  </span>
                </div>
                <p className="text-xs text-[#8E8E8E] font-medium leading-relaxed">{gate.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer Status Bar */}
      <footer className="border-t border-[#E2E2E2] py-6 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8E8E8E] bg-white mt-auto">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Stage 8 of 15 Complete • Editorial Asymmetric Portfolio Grid Verified</span>
        </div>
        <div className="text-[#111111] font-semibold">
          {personalInfo.brandName} / {personalInfo.firstName} © {personalInfo.copyrightYear}
        </div>
      </footer>
    </div>
  );
}

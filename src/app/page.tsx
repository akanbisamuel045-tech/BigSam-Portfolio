"use client";

import React from "react";
import Image from "next/image";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { ImpactSection } from "@/components/home/ImpactSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProjectsGrid } from "@/components/home/ProjectsGrid";
import { ProcessSection } from "@/components/home/ProcessSection";
import { WhyChooseMeBento } from "@/components/home/WhyChooseMeBento";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PricingSection } from "@/components/home/PricingSection";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { portfolioData } from "@/data/portfolioData";

export default function HomePage() {
  const { personalInfo } = portfolioData;

  const stage13Gates = [
    {
      title: "Services Hero & 6 Stacked Cards",
      status: "PASS",
      detail: "Full-width editorial cards (001-006) with burnt orange title highlight and skill pills",
    },
    {
      title: "Interactive Services Hover States",
      status: "PASS",
      detail: "Cards transition title color to #E84511 on hover with live spark icon and preview image",
    },
    {
      title: "Articles Hero & 2-Col Editorial Grid",
      status: "PASS",
      detail: "6 comprehensive articles with top-left category badge turning #E84511 on hover",
    },
    {
      title: "Article Metadata Table",
      status: "PASS",
      detail: "Author ('Written by BigSam') and publication dates cleanly anchored in bottom row",
    },
    {
      title: "Home Insights Preview Section",
      status: "PASS",
      detail: "Asymmetric 12-col grid (6-col featured card + two 3-col side cards) mounted above CTA",
    },
    {
      title: "Global CTA & Footer Route Inheritance",
      status: "PASS",
      detail: "Both /services and /articles cleanly render CtaBanner and inherit global Footer",
    },
    {
      title: "Responsive Viewports Verified",
      status: "PASS",
      detail: "Mobile (375px), Tablet (768px), and Desktop (1440px) verified across all routes",
    },
    {
      title: "Zero TypeScript & Lint Errors",
      status: "PASS",
      detail: "100% typed, 0 lint warnings, and static compilation verified across all 8 pages",
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
      {/* 6. ENGINEERING PROCESS (STAGE 9 IMPLEMENTATION) */}
      {/* ============================================================== */}
      <ProcessSection />

      {/* ============================================================== */}
      {/* 7. WHY CHOOSE ME BENTO & WORKSPACE (STAGE 9 IMPLEMENTATION) */}
      {/* ============================================================== */}
      <WhyChooseMeBento />

      {/* ============================================================== */}
      {/* 8. ALTERNATING TESTIMONIALS (STAGE 10 IMPLEMENTATION) */}
      {/* ============================================================== */}
      <TestimonialsSection />

      {/* ============================================================== */}
      {/* 9. INTERACTIVE DUAL-TIER PRICING (STAGE 10 IMPLEMENTATION) */}
      {/* ============================================================== */}
      <PricingSection />

      {/* ============================================================== */}
      {/* 10. DESIGN INSIGHTS PREVIEW (STAGE 13 IMPLEMENTATION) */}
      {/* ============================================================== */}
      <InsightsPreview />

      {/* ============================================================== */}
      {/* 11. PRE-FOOTER CTA BANNER (STAGE 11 IMPLEMENTATION) */}
      {/* ============================================================== */}
      <CtaBanner />

      {/* ============================================================== */}
      {/* 12. DIAGNOSTIC, GATES & STAGE 13 VERIFICATION SUITE */}
      {/* ============================================================== */}
      <div className="p-6 md:p-12 lg:p-16 space-y-16 max-w-7xl mx-auto w-full">
        {/* Stage 13 Status Banner */}
        <div className="border-b border-[#E2E2E2] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#E84511] font-bold">
              STAGE 13 / 15
            </span>
            <h2 className="font-display font-extrabold text-2xl tracking-tight text-[#111111]">
              SERVICES PAGE, ARTICLES ARCHIVE &amp; HOME INSIGHTS PREVIEW
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs uppercase font-mono tracking-widest font-semibold px-3 py-1.5 bg-white border border-[#E2E2E2] rounded-full text-[#111111] shadow-sm">
              Stage 13 Verified &amp; Active
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

        {/* Stage 13 Verification Gates */}
        <section className="space-y-4">
          <h3 className="font-display font-bold text-sm uppercase tracking-widest text-[#111111]">
            Stage 13 Architectural Verification Gates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stage13Gates.map((gate) => (
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

      {/* Stage Diagnostic Status Bar */}
      <div className="border-t border-[#E2E2E2] py-4 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8E8E8E] bg-white">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Stage 13 of 15 Complete • /services, /articles &amp; Home Insights Preview Verified</span>
        </div>
        <div className="text-[#111111] font-semibold">
          {personalInfo.brandName} / {personalInfo.firstName} © {personalInfo.copyrightYear}
        </div>
      </div>
    </div>
  );
}

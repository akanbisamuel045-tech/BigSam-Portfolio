"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GridCrosshair } from "@/components/ui/GridCrosshair";
import { usePortfolioData } from "@/context/PortfolioContext";

export const ImpactSection: React.FC = () => {
  const { data: portfolioData } = usePortfolioData();
  const { personalInfo, stats } = portfolioData;

  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 md:px-10 border-b border-[#E2E2E2] select-none">
      <div className="max-w-[1600px] mx-auto space-y-12">
        {/* Editorial Section Header */}
        <SectionHeader
          badge="BETTER DIGITAL JOURNEYS"
          blackText="MY IMPACT THROUGH"
          grayText="FULL-STACK ENGINEERING"
          align="split"
        />

        {/* 12-Column Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4">
          {/* Column 1: Impact Portrait with 4 Corner Crosshairs (4 cols) */}
          <div className="lg:col-span-4 relative flex justify-center">
            <div className="relative aspect-[4/5] w-full max-w-[420px] bg-[#140B08] overflow-hidden rounded-sm shadow-xl border border-[#E2E2E2]">
              {/* 4 Corner Crosshairs */}
              <GridCrosshair position="top-left" variant="light" />
              <GridCrosshair position="top-right" variant="light" />
              <GridCrosshair position="bottom-left" variant="light" />
              <GridCrosshair position="bottom-right" variant="light" />

              <Image
                src={personalInfo.impactPortrait}
                alt={`${personalInfo.displayName} Impact Portrait`}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
              />

              {/* Bottom Subtle Gradient Bar */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111111]/80 to-transparent flex items-end p-4">
                <span className="text-[11px] font-mono text-white/80 tracking-widest uppercase">
                  {personalInfo.brandName} • {personalInfo.role}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Rotating 8-Spoke Geometric Asterisk (3 cols) */}
          <div className="lg:col-span-3 flex justify-center py-6 lg:py-0">
            <div className="relative flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 h-24 md:w-32 md:h-32 text-[#D4D4D4] animate-[spin_20s_linear_infinite]"
                aria-hidden="true"
              >
                <rect x="47" y="5" width="6" height="90" rx="3" fill="currentColor" />
                <rect x="5" y="47" width="90" height="6" rx="3" fill="currentColor" />
                <rect
                  x="47"
                  y="5"
                  width="6"
                  height="90"
                  rx="3"
                  fill="currentColor"
                  transform="rotate(45 50 50)"
                />
                <rect
                  x="47"
                  y="5"
                  width="6"
                  height="90"
                  rx="3"
                  fill="currentColor"
                  transform="rotate(-45 50 50)"
                />
                <circle cx="50" cy="50" r="10" fill="#E84511" />
              </svg>
            </div>
          </div>

          {/* Column 3: Short Bio Paragraph & 2 Bordered Stat Rows (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            {/* Top Bio Paragraph */}
            <p className="text-sm md:text-base font-display font-medium leading-relaxed text-[#555555] uppercase tracking-wide">
              {personalInfo.shortBio}
            </p>

            {/* Stat Block 1: Projects Completed */}
            <div className="border-t border-[#E2E2E2] py-6 flex items-center justify-between group cursor-default transition-colors hover:border-[#E84511]">
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-display font-extrabold text-[#111111] tracking-tight group-hover:text-[#E84511] transition-colors">
                  {stats.projectsCompleted}
                  {stats.projectsSuffix}
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E8E8E]">
                  PROJECTS COMPLETED
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border border-[#E2E2E2] flex items-center justify-center text-[#E84511] group-hover:bg-[#E84511] group-hover:text-white group-hover:border-[#E84511] transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
              </div>
            </div>

            {/* Stat Block 2: Happy Clients */}
            <div className="border-t border-b border-[#E2E2E2] py-6 flex items-center justify-between group cursor-default transition-colors hover:border-[#E84511]">
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-display font-extrabold text-[#111111] tracking-tight group-hover:text-[#E84511] transition-colors">
                  {stats.happyClients}
                  {stats.happyClientsSuffix}
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#8E8E8E]">
                  HAPPY CLIENTS
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border border-[#E2E2E2] flex items-center justify-center text-[#E84511] group-hover:bg-[#E84511] group-hover:text-white group-hover:border-[#E84511] transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;

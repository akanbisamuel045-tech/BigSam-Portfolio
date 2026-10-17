"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { usePortfolioData } from "@/context/PortfolioContext";
import { cn } from "@/lib/utils";

export const PricingSection: React.FC = () => {
  const { data: portfolioData } = usePortfolioData();
  const { pricing, personalInfo } = portfolioData;
  const [billingMode, setBillingMode] = useState<"monthly" | "projectBased">("projectBased");

  const activePlan = billingMode === "monthly" ? pricing.monthly : pricing.projectBased;

  return (
    <section
      id="pricing"
      className="w-full bg-[#F6F6F6] py-20 md:py-28 px-6 md:px-10 border-b border-[#E2E2E2] select-none"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Top Header & Interactive Segmented Toggle Button Bar */}
        <SectionHeader
          badge="PRICING"
          blackText="SIMPLE PLANS"
          grayText="FOR EVERY NEED"
          align="split"
          rightContent={
            <div className="inline-flex items-center bg-[#E8E8E8] p-1 border border-[#DCDCDC] rounded-sm shadow-inner">
              <button
                type="button"
                onClick={() => setBillingMode("monthly")}
                className={cn(
                  "px-4 py-2 text-xs font-display font-extrabold uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer",
                  billingMode === "monthly"
                    ? "bg-[#111111] text-white shadow-sm"
                    : "text-[#555555] hover:text-[#111111]"
                )}
              >
                MONTHLY
              </button>

              <button
                type="button"
                onClick={() => setBillingMode("projectBased")}
                className={cn(
                  "px-4 py-2 text-xs font-display font-extrabold uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer",
                  billingMode === "projectBased"
                    ? "bg-[#111111] text-white shadow-sm"
                    : "text-[#555555] hover:text-[#111111]"
                )}
              >
                PROJECT BASED
              </button>
            </div>
          }
        />

        {/* 12-Column Matte Black 2-Card Pricing Layout */}
        <div className="mt-14 md:mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={billingMode}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
            >
              {/* LEFT DARK CARD (4 columns) */}
              <div className="lg:col-span-4 bg-[#111111] text-white p-7 md:p-10 rounded-xl flex flex-col justify-between border border-[#222222] min-h-[420px] shadow-sm">
                {/* Top Block */}
                <div>
                  <span className="bg-[#1F1F1F] text-[#B0B0B0] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 inline-block mb-5 border border-white/10 rounded-sm">
                    COMPLETE PACKAGE
                  </span>

                <h3 className="text-xl md:text-2xl font-display font-extrabold uppercase tracking-tight text-white pb-6 border-b border-white/10">
                  {activePlan.packageTitle}
                </h3>
              </div>

              {/* Bottom Metadata Rows */}
              <div className="mt-auto pt-8 flex flex-col gap-3.5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-[#8E8E8E] font-mono font-semibold uppercase flex items-center gap-2">
                    <span className="text-[#E84511]">↻</span> DELIVERY TIME
                  </span>
                  <span className="text-white font-mono font-bold">
                    {activePlan.deliveryTime}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-[#8E8E8E] font-mono font-semibold uppercase flex items-center gap-2">
                    <span className="text-[#E84511]">↻</span> REVISIONS
                  </span>
                  <span className="text-white font-mono font-bold">
                    {activePlan.revisions}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#8E8E8E] font-mono font-semibold uppercase flex items-center gap-2">
                    <span className="text-[#E84511]">↻</span> TECH STACK
                  </span>
                  <span className="text-white font-mono font-bold">
                    {activePlan.techStack}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT DARK CARD (8 columns) */}
            <div className="lg:col-span-8 bg-[#111111] text-white p-7 md:p-10 rounded-xl flex flex-col justify-between border border-[#222222] min-h-[420px] shadow-sm">
              {/* Top 2-Column Split: Price Left + Features Right */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/10">
                {/* Left Price Column */}
                <div className="md:col-span-5 flex flex-col justify-start">
                  <span className="bg-[#1F1F1F] text-[#B0B0B0] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 inline-block w-fit mb-5 border border-white/10 rounded-sm">
                    {activePlan.badge}
                  </span>

                  <div className="flex items-baseline">
                    <span className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white">
                      {activePlan.price}
                    </span>
                    <span className="text-sm md:text-base font-mono font-medium text-[#8E8E8E] ml-1.5">
                      {activePlan.unit}
                    </span>
                  </div>
                </div>

                {/* Right Features Column */}
                <div className="md:col-span-7 flex flex-col gap-3 justify-center">
                  {activePlan.features.map((feature, i) => (
                    <div
                      key={i}
                      className="text-xs md:text-sm font-semibold text-white/90 flex items-center gap-2.5"
                    >
                      <ArrowUpRight className="w-4 h-4 text-[#E84511] shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle Satisfaction Guarantee Block */}
              <div className="py-6 flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-[#E84511]"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
                  </svg>
                  <h4 className="text-xs md:text-sm font-display font-extrabold uppercase tracking-wider text-white">
                    SATISFACTION GUARANTEE
                  </h4>
                </div>

                <p className="text-xs text-[#8E8E8E] max-w-xl leading-relaxed font-normal">
                  Committed to engineering high-performance, production-ready systems that exceed expectations.
                </p>
              </div>

              {/* Bottom Full-Width Expanding CTA Bar (matching 00:30-00:31) */}
              <div className="pt-2">
                <a
                  href={personalInfo.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full bg-white text-[#111111] hover:text-white h-12 md:h-14 px-6 flex items-center justify-between font-display font-extrabold text-xs md:text-sm uppercase tracking-wider overflow-hidden transition-colors duration-300 rounded-sm"
                >
                  {/* Expanding Orange Fill Layer */}
                  <span className="absolute inset-0 bg-[#E84511] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />

                  {/* Button Label */}
                  <span className="relative z-10 transition-colors duration-300">
                    GET STARTED
                  </span>

                  {/* Signature Orange Icon Box with 45° Rotation */}
                  <span className="relative z-10 w-8 h-8 md:w-9 md:h-9 bg-[#E84511] group-hover:bg-white text-white group-hover:text-[#E84511] flex items-center justify-center transition-colors duration-300 rounded-[2px]">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

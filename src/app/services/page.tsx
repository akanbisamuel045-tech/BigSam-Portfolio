"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { portfolioData } from "@/data/portfolioData";

export default function ServicesPage() {
  const { personalInfo, services } = portfolioData;
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [showAll, setShowAll] = useState<boolean>(true);

  const displayedServices = showAll ? services : services.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F6F6] text-[#111111] selection:bg-[#E84511] selection:text-white">
      {/* ============================================================== */}
      {/* SECTION 1: GIANT SERVICES HERO HEADER (01:16-01:18)            */}
      {/* ============================================================== */}
      <section className="w-full bg-[#F6F6F6] select-none">
        <div className="max-w-[1600px] mx-auto pt-14 md:pt-24 pb-12 md:pb-16 px-6 md:px-10">
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
                SERVICES
              </h1>

              <div className="text-xs md:text-sm font-semibold font-mono pb-2 shrink-0">
                <span className="text-[#111111] font-bold">©{personalInfo.copyrightYear}</span>{" "}
                <span className="text-[#8E8E8E]">(Scroll to Explore)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: FULL-WIDTH STACKED EDITORIAL SERVICE CARDS (001-006) */}
      {/* ============================================================== */}
      <section className="w-full bg-[#F6F6F6] pb-20 md:pb-28 px-6 md:px-10 select-none">
        <div className="max-w-[1600px] mx-auto">
          {/* Outer Bordered Frame */}
          <div className="bg-white border border-[#E2E2E2] divide-y divide-[#E2E2E2] shadow-sm">
            {displayedServices.map((service, idx) => {
              const isActive = activeIdx === idx;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`group p-7 sm:p-10 md:p-14 transition-colors duration-300 ${
                    isActive ? "bg-[#FAF9F6]" : "bg-white hover:bg-[#FAF9F6]"
                  }`}
                >
                  {/* TOP ROW */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10 md:mb-14">
                    {/* Left Column: Index & Giant Title */}
                    <div className="lg:col-span-6 space-y-4">
                      <div className="flex items-center gap-2 text-xs md:text-sm font-mono font-bold text-[#666666]">
                        <Sparkles className="w-4 h-4 text-[#E84511] fill-[#E84511]" />
                        <span>{service.index}</span>
                      </div>

                      <h2
                        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight leading-[0.98] transition-colors duration-300 ${
                          isActive
                            ? "text-[#E84511]"
                            : "text-[#111111] group-hover:text-[#E84511]"
                        }`}
                      >
                        {service.title}
                      </h2>
                    </div>

                    {/* Right Column: Uppercase Description & Action Button */}
                    <div className="lg:col-span-6 flex flex-col items-start lg:items-end justify-between h-full space-y-6">
                      <p className="text-sm md:text-base lg:text-lg font-display font-bold uppercase tracking-tight text-[#444444] leading-snug max-w-lg lg:text-right">
                        {service.description}
                      </p>

                      <ArrowButton
                        text="VIEW DETAILS"
                        href={service.link}
                        variant="dark"
                      />
                    </div>
                  </div>

                  {/* BOTTOM ROW */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                    {/* Left Image Column */}
                    <div className="lg:col-span-5">
                      <div className="relative aspect-[16/10] w-full max-w-[440px] overflow-hidden bg-[#111111] shadow-md border border-[#E2E2E2] rounded-sm group/img">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 440px"
                        />

                        {/* Floating Pill Label */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-1.5 shadow-md flex items-center gap-2 rounded-full border border-[#E2E2E2] whitespace-nowrap">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E84511]" />
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#111111]">
                            EXPLORE ARCHITECTURE
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Skill Pills Column */}
                    <div className="lg:col-span-7 flex flex-wrap gap-2.5 lg:justify-end">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 rounded-full bg-[#EFEFEF] group-hover:bg-white border border-[#E5E5E5] text-xs font-mono font-semibold text-[#333333] transition-all duration-300 shadow-2xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Centered Load More / Direct Action */}
          <div className="mt-12 md:mt-16 flex items-center justify-center">
            {showAll ? (
              <ArrowButton
                text="BOOK DIRECT SPRINT"
                href={personalInfo.bookingUrl}
                external
                variant="dark"
              />
            ) : (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="bg-[#111111] text-white hover:bg-[#E84511] px-8 py-4 font-display font-extrabold text-xs uppercase tracking-wider transition-colors duration-300 rounded-[2px] shadow-sm cursor-pointer"
              >
                LOAD MORE SERVICES (005 - 006)
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: PRE-FOOTER CTA BANNER                                */}
      {/* ============================================================== */}
      <CtaBanner />
    </div>
  );
}

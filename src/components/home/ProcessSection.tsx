"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { portfolioData } from "@/data/portfolioData";

export const ProcessSection: React.FC = () => {
  const { processSteps } = portfolioData;

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "sparkle":
        return (
          <svg
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-[#E84511] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45"
            aria-hidden="true"
          >
            <path
              d="M14 0L17.5 10.5L28 14L17.5 17.5L14 28L10.5 17.5L0 14L10.5 10.5L14 0Z"
              fill="currentColor"
            />
          </svg>
        );
      case "asterisk":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-[#E84511] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45"
            aria-hidden="true"
          >
            <path
              d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        );
      case "bolt":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-[#E84511] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45"
            aria-hidden="true"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
          </svg>
        );
      case "plus":
      default:
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-[#E84511] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45"
            aria-hidden="true"
          >
            <path d="M10 2h4v8h8v4h-8v8h-4v-8H2v-4h8V2z" fill="currentColor" />
          </svg>
        );
    }
  };

  return (
    <section
      id="process"
      className="w-full bg-[#F6F6F6] py-20 md:py-28 px-6 md:px-10 border-b border-[#E2E2E2] select-none"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Top Centered Section Header */}
        <SectionHeader
          badge="MY ENGINEERING PROCESS"
          blackText="BUILD PROCESS"
          grayText="THAT WORKS"
          align="center"
        />

        {/* 4-Column Matte Black Process Cards Grid */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-[#111111] hover:bg-[#161616] text-white p-7 md:p-9 min-h-[340px] md:min-h-[390px] flex flex-col justify-between border border-[#222222] hover:border-[#E84511]/50 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-sm"
            >
              {/* Top Block */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  {renderIcon(step.icon)}
                  <span className="text-xs font-mono font-bold tracking-widest text-[#E84511]">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-display font-extrabold uppercase tracking-tight text-white group-hover:text-[#E84511] transition-colors duration-300">
                  {step.title}
                </h3>
              </div>

              {/* Bottom Block */}
              <div className="border-t border-white/10 pt-5 mt-8">
                <p className="text-xs md:text-sm text-[#9A9A9A] leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Sparkles } from "lucide-react";
import { usePortfolioData } from "@/context/PortfolioContext";

export const FaqAccordion: React.FC = () => {
  const { data: portfolioData } = usePortfolioData();
  const { faqs } = portfolioData;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq-section"
      className="w-full bg-[#F6F6F6] py-20 md:py-28 px-6 md:px-10 border-t border-b border-[#E2E2E2] select-none"
    >
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Sticky Column (5 cols) matching 00:57-00:58 */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#EFEFEF] border border-[#E2E2E2] text-[#444444]">
            <Sparkles className="w-3.5 h-3.5 text-[#E84511] fill-[#E84511]" />
            <span>FAQ</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight leading-[1.02] text-[#111111]">
            FREQUENT <br />
            <span className="text-[#8E8E8E]">QUESTIONS</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#666666] max-w-md leading-relaxed font-normal">
            Everything you need to know about working together, sprint milestones, deliverables, and full-stack technical consulting.
          </p>
        </div>

        {/* Right Accordion Column (7 cols) matching 00:58-01:01 */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.question}
                className="bg-white border border-[#EAEAEA] hover:border-[#DCDCDC] transition-colors duration-200 overflow-hidden rounded-xs shadow-2xs"
              >
                {/* Trigger Button */}
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between gap-4 text-left cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-xs sm:text-sm md:text-[15px] font-display font-extrabold uppercase tracking-tight transition-colors duration-200 ${
                      isOpen
                        ? "text-[#E84511]"
                        : "text-[#111111] group-hover:text-[#E84511]"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <span className="w-8 h-8 rounded-full bg-[#F6F6F6] group-hover:bg-[#EFEFEF] flex items-center justify-center shrink-0 transition-colors">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#E84511]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#111111] group-hover:text-[#E84511] transition-colors" />
                    )}
                  </span>
                </button>

                {/* Expandable Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-6 pt-1 text-xs sm:text-sm text-[#666666] leading-relaxed border-t border-[#F4F4F4] font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;

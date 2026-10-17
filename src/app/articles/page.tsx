"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { usePortfolioData } from "@/context/PortfolioContext";

export default function ArticlesPage() {
  const { data: portfolioData } = usePortfolioData();
  const { personalInfo, articles } = portfolioData;

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F6F6] text-[#111111] selection:bg-[#E84511] selection:text-white">
      {/* ============================================================== */}
      {/* SECTION 1: GIANT ARTICLES HERO HEADER (01:29-01:31)            */}
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
                ARTICLES
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
      {/* SECTION 2: 2-COLUMN EDITORIAL ARTICLES GRID (01:31-01:36)      */}
      {/* ============================================================== */}
      <section className="w-full bg-[#F6F6F6] pb-20 md:pb-28 px-6 md:px-10 select-none">
        <div className="max-w-[1600px] mx-auto">
          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {articles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group bg-white p-6 sm:p-8 md:p-10 border border-[#EAEAEA] hover:border-[#E84511]/40 hover:shadow-xl transition-all duration-500 flex flex-col justify-between rounded-sm cursor-pointer"
              >
                {/* Top Title */}
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-display font-extrabold uppercase tracking-tight leading-snug text-[#111111] group-hover:text-[#E84511] transition-colors duration-300 mb-6 max-w-md">
                    {article.title}
                  </h2>
                </div>

                {/* Middle Image Container with Category Badge */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#111111] mb-6 border border-[#E2E2E2] rounded-xs">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 text-[11px] font-mono font-extrabold uppercase tracking-wider bg-white/95 text-[#111111] group-hover:bg-[#E84511] group-hover:text-white transition-colors duration-300 shadow-sm border border-[#E2E2E2]">
                    {article.category}
                  </div>
                </div>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-6 font-normal line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Bottom Metadata Bar */}
                <div className="pt-4 flex items-center justify-between text-xs font-mono border-t border-[#F0F0F0]">
                  <div>
                    <span className="text-[#8E8E8E] block text-[10px] uppercase">
                      Written by
                    </span>
                    <span className="font-extrabold text-[#111111]">
                      {article.author}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[#8E8E8E] block text-[10px] uppercase">
                      Published
                    </span>
                    <span className="font-extrabold text-[#111111]">
                      {article.date}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Bottom Centered Action */}
          <div className="mt-14 md:mt-20 flex items-center justify-center">
            <ArrowButton
              text="EXPLORE GITHUB ARCHIVE"
              href="https://github.com/akanbisamuel045-tech"
              external
              variant="dark"
            />
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

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { usePortfolioData } from "@/context/PortfolioContext";

export const InsightsPreview: React.FC = () => {
  const { data: portfolioData } = usePortfolioData();
  const articles = portfolioData.articles.slice(0, 3);
  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1, 3);

  return (
    <section
      id="insights-preview"
      className="w-full bg-[#F6F6F6] py-20 md:py-28 px-6 md:px-10 border-b border-[#E2E2E2] select-none"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Top Split Section Header (matching video 00:32-00:33) */}
        <SectionHeader
          badge="DESIGN INSIGHTS"
          blackText="LATEST ENGINEERING"
          grayText="INSIGHTS"
          align="split"
          rightContent={
            <p className="text-xs md:text-sm font-medium uppercase tracking-wide text-[#666666] max-w-sm leading-relaxed">
              EXPLORE INSIGHTS, ARCHITECTURE TRENDS, AND SCALABLE PATTERNS FOCUSED ON FULL-STACK DIGITAL PRODUCTS.
            </p>
          }
        />

        {/* 12-Column Asymmetric Preview Grid */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          {/* Left Featured Card (6 cols) */}
          {featuredArticle && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6"
            >
              <Link
                href="/articles"
                className="group block relative aspect-[4/3.6] w-full overflow-hidden bg-[#111111] border border-[#E2E2E2] shadow-sm rounded-sm"
              >
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Category Badge */}
                <div className="absolute top-5 left-5 z-10 px-3.5 py-1.5 text-[11px] font-mono font-extrabold uppercase tracking-wider bg-white/95 text-[#111111] group-hover:bg-[#E84511] group-hover:text-white transition-colors duration-300 shadow-sm border border-[#E2E2E2]">
                  {featuredArticle.category}
                </div>

                {/* Dark Gradient Overlay & Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E84511] font-semibold mb-2">
                    <span>{featuredArticle.date}</span>
                    <span>•</span>
                    <span>BY {featuredArticle.author.toUpperCase()}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold uppercase leading-tight tracking-tight text-white group-hover:text-[#E84511] transition-colors duration-300 mb-3">
                    {featuredArticle.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#CCCCCC] line-clamp-2 max-w-xl leading-relaxed font-normal mb-4">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white group-hover:text-[#E84511] transition-colors">
                    <span>READ ARTICLE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Right 2 Smaller Cards (3 cols each) */}
          {sideArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
              className="lg:col-span-3 flex flex-col"
            >
              <Link href="/articles" className="group flex flex-col">
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111111] border border-[#E2E2E2] shadow-sm rounded-sm mb-4">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 text-[10px] font-mono font-extrabold uppercase tracking-wider bg-white/95 text-[#111111] group-hover:bg-[#E84511] group-hover:text-white transition-colors duration-300 shadow-sm border border-[#E2E2E2]">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-[#8E8E8E]">
                    {article.date} • {article.author}
                  </div>

                  <h4 className="text-sm sm:text-base font-display font-extrabold uppercase tracking-tight text-[#111111] group-hover:text-[#E84511] transition-colors duration-300 leading-snug line-clamp-2">
                    {article.title}
                  </h4>

                  <p className="text-xs text-[#777777] line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Centered View All Action */}
        <div className="mt-14 md:mt-16 flex items-center justify-center">
          <ArrowButton text="EXPLORE ALL ARTICLES" href="/articles" variant="dark" />
        </div>
      </div>
    </section>
  );
};

export default InsightsPreview;

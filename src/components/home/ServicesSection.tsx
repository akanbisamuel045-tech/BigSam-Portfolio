"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { usePortfolioData } from "@/context/PortfolioContext";
import { cn } from "@/lib/utils";

export const ServicesSection: React.FC = () => {
  const { data: portfolioData } = usePortfolioData();
  const services = portfolioData.services.slice(0, 4);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <section
      id="services"
      className="w-full bg-[#F6F6F6] py-20 md:py-28 px-6 md:px-10 border-b border-[#E2E2E2] select-none"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <SectionHeader
          badge="OUR SERVICES"
          blackText="POWERFUL ENGINEERING"
          grayText="SERVICES FOR YOUR BRAND"
          align="split"
        />

        {/* Stacked Service Rows */}
        <div className="mt-14 md:mt-20 border-t border-[#E2E2E2]">
          {services.map((service, idx) => {
            const isActive = hoveredIndex === idx;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                className="group border-b border-[#E2E2E2] py-10 md:py-14 transition-colors duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  {/* Column 1 — Index Badge (3 cols) */}
                  <div className="lg:col-span-3 flex items-center gap-2.5 pt-1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 shrink-0 text-[#E84511] transition-transform duration-500 group-hover:rotate-90"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="text-sm md:text-base font-mono font-bold tracking-wider text-[#555555]">
                      {service.index}
                    </span>
                  </div>

                  {/* Column 2 — Title, Description & Skill Pills (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col">
                    <h3
                      className={cn(
                        "text-2xl sm:text-3xl md:text-[32px] font-display font-extrabold uppercase tracking-tight leading-tight mb-3 transition-colors duration-300",
                        isActive ? "text-[#E84511]" : "text-[#111111] group-hover:text-[#E84511]"
                      )}
                    >
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#666666] leading-relaxed max-w-md mb-6">
                      {service.description}
                    </p>

                    {/* Skill Pill Tags */}
                    <div className="flex flex-wrap gap-2 max-w-lg">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3.5 py-1.5 rounded-full bg-[#EAEAEA] group-hover:bg-white text-[#333333] text-xs font-semibold tracking-tight border border-transparent group-hover:border-[#E2E2E2] transition-all duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Column 3 — Service Preview Image & Floating Action Button (4 cols) */}
                  <div className="lg:col-span-4">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-white shadow-sm border border-[#E2E2E2] rounded-sm group/card">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 480px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Bottom-Center Floating Pill Button */}
                      <Link
                        href={service.link || "/contact"}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-white hover:bg-[#E84511] text-[#111111] hover:text-white px-4 py-1.5 shadow-md rounded-full flex items-center justify-center gap-2 transition-all duration-300 group/btn border border-[#E2E2E2] hover:border-[#E84511]"
                      >
                        <span className="text-[11px] font-mono font-bold tracking-widest uppercase">
                          DISCUSS
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#E84511] group-hover/btn:text-white group-hover/btn:rotate-45 transition-all duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

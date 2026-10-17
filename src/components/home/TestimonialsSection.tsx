"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { usePortfolioData } from "@/context/PortfolioContext";

export const TestimonialsSection: React.FC = () => {
  const { data: portfolioData } = usePortfolioData();
  const { testimonials } = portfolioData;

  return (
    <section
      id="testimonials"
      className="w-full bg-[#F6F6F6] py-20 md:py-28 px-6 md:px-10 border-b border-[#E2E2E2] select-none"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Top Section Header with Right Summary Text */}
        <SectionHeader
          badge="SOLUTIONS CLIENTS LOVE"
          blackText="WHAT MY"
          grayText="CLIENTS SAY"
          align="split"
          rightContent={
            <p className="text-xs md:text-sm font-medium uppercase tracking-wide text-[#666666] max-w-sm leading-relaxed">
              ENGINEERING THOUGHTFUL AND SCALABLE FULL-STACK SYSTEMS THAT HELP BRANDS GROW AND IMPROVE USER EXPERIENCES.
            </p>
          }
        />

        {/* 4-Column Alternating Testimonials Grid */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 items-stretch">
          {testimonials.map((testimonial, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white p-6 md:p-7 border border-[#EAEAEA] hover:border-[#E84511]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[340px] md:min-h-[380px] rounded-sm group"
              >
                {isEven ? (
                  // Even Layout: Avatar on Top, Quote on Bottom
                  <>
                    {/* Top Row: Avatar + Name/Role + Plus Marker */}
                    <div className="pb-5 border-b border-[#EFEFEF] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-sm overflow-hidden border border-[#EAEAEA] shrink-0 bg-[#F0F0F0]">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-display font-extrabold uppercase tracking-tight text-[#111111] group-hover:text-[#E84511] transition-colors">
                            {testimonial.name}
                          </div>
                          <div className="text-[11px] font-mono text-[#777777]">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>

                      <span className="text-sm font-mono text-[#999999] group-hover:text-[#E84511] transition-colors">
                        +
                      </span>
                    </div>

                    {/* Middle Row: 5 Stars */}
                    <div className="py-6 flex items-center gap-1 text-[#E84511] text-sm tracking-widest">
                      {"★".repeat(testimonial.rating)}
                    </div>

                    {/* Bottom Row: Quote */}
                    <div className="mt-auto pt-2">
                      <p className="text-xs md:text-[13px] font-medium text-[#333333] leading-relaxed">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>
                  </>
                ) : (
                  // Odd Layout: Stars on Top, Quote Middle, Avatar on Bottom
                  <>
                    {/* Top Row: 5 Stars + Plus Marker */}
                    <div className="pb-5 border-b border-[#EFEFEF] flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#E84511] text-sm tracking-widest">
                        {"★".repeat(testimonial.rating)}
                      </div>
                      <span className="text-sm font-mono text-[#999999] group-hover:text-[#E84511] transition-colors">
                        +
                      </span>
                    </div>

                    {/* Middle Row: Quote */}
                    <div className="my-auto py-8">
                      <p className="text-xs md:text-[13px] font-medium text-[#333333] leading-relaxed">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>

                    {/* Bottom Row: Avatar + Name/Role */}
                    <div className="mt-auto pt-5 border-t border-[#EFEFEF] flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-sm overflow-hidden border border-[#EAEAEA] shrink-0 bg-[#F0F0F0]">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-display font-extrabold uppercase tracking-tight text-[#111111] group-hover:text-[#E84511] transition-colors">
                          {testimonial.name}
                        </div>
                        <div className="text-[11px] font-mono text-[#777777]">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

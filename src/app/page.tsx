"use client";

import React from "react";
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

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F6F6F6] text-[#111111] selection:bg-[#E84511] selection:text-white">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. BRAND MARQUEE */}
      <BrandMarquee />

      {/* 3. IMPACT SECTION */}
      <ImpactSection />

      {/* 4. SERVICES SECTION */}
      <ServicesSection />

      {/* 5. PROJECTS GRID SECTION */}
      <ProjectsGrid />

      {/* 6. ENGINEERING PROCESS */}
      <ProcessSection />

      {/* 7. WHY CHOOSE ME BENTO & WORKSPACE */}
      <WhyChooseMeBento />

      {/* 8. ALTERNATING TESTIMONIALS */}
      <TestimonialsSection />

      {/* 9. INTERACTIVE DUAL-TIER PRICING */}
      <PricingSection />

      {/* 10. DESIGN INSIGHTS PREVIEW */}
      <InsightsPreview />

      {/* 11. PRE-FOOTER CTA BANNER */}
      <CtaBanner />
    </div>
  );
}

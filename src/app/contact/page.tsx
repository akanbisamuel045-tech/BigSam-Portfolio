import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { portfolioData } from "@/data/portfolioData";

export default function ContactPage() {
  const { personalInfo } = portfolioData;

  return (
    <main className="p-6 md:p-12 lg:p-16 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
      <div className="space-y-8 bg-white border border-[#E2E2E2] p-8 md:p-14 rounded-2xl shadow-sm">
        <SectionHeader
          badge="GET IN TOUCH"
          blackText="LET'S DISCUSS YOUR"
          grayText="NEXT FULL-STACK PROJECT."
          align="split"
          subtext="Available for full-time contracts, MVP sprints, and system architectures worldwide. The interactive contact suite will be assembled in Stage 15."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md pt-2">
          <div className="p-4 bg-[#F6F6F6] rounded-xl border border-[#E2E2E2]">
            <span className="text-[10px] font-mono text-[#8E8E8E] uppercase block">Email Direct</span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-sm font-bold text-[#111111] hover:text-[#E84511] transition-colors break-all"
            >
              {personalInfo.email}
            </a>
          </div>
          <div className="p-4 bg-[#F6F6F6] rounded-xl border border-[#E2E2E2]">
            <span className="text-[10px] font-mono text-[#8E8E8E] uppercase block">WhatsApp Direct</span>
            <a
              href={personalInfo.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-[#E84511] hover:underline"
            >
              {personalInfo.phone}
            </a>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-4">
          <ArrowButton text="BACK TO HOME" href="/" variant="light" />
          <ArrowButton text="BOOK DIRECT CALL" href={personalInfo.bookingUrl} external variant="dark" />
        </div>
      </div>
    </main>
  );
}

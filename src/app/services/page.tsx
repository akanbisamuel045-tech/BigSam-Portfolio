import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowButton } from "@/components/ui/ArrowButton";

export default function ServicesPage() {
  return (
    <main className="p-6 md:p-12 lg:p-16 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
      <div className="space-y-8 bg-white border border-[#E2E2E2] p-8 md:p-14 rounded-2xl shadow-sm">
        <SectionHeader
          badge="OUR SERVICES"
          blackText="SPECIALIZED FULL-STACK"
          grayText="DEVELOPMENT & CLOUD CAPABILITIES."
          align="split"
          subtext="From end-to-end web applications and high-throughput microservices to AI integration and system refactoring. Full interactive cards will be assembled in Stage 13."
        />

        <div className="pt-4 flex items-center gap-4">
          <ArrowButton text="BACK TO HOME" href="/" variant="light" />
          <ArrowButton text="BOOK A CALL" href="/contact" variant="dark" />
        </div>
      </div>
    </main>
  );
}

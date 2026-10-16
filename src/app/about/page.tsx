import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowButton } from "@/components/ui/ArrowButton";

export default function AboutPage() {
  return (
    <main className="p-6 md:p-12 lg:p-16 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
      <div className="space-y-8 bg-white border border-[#E2E2E2] p-8 md:p-14 rounded-2xl shadow-sm">
        <SectionHeader
          badge="ABOUT ME"
          blackText="FULL-STACK ARCHITECT"
          grayText="& ENGINEERING PHILOSOPHY."
          align="split"
          subtext="Crafting high-throughput backend APIs, intuitive digital experiences, and scalable cloud architectures. The full editorial About page will be populated in Stage 12."
        />

        <div className="pt-4 flex items-center gap-4">
          <ArrowButton text="BACK TO HOME" href="/" variant="light" />
          <ArrowButton text="EXPLORE SERVICES" href="/services" variant="dark" />
        </div>
      </div>
    </main>
  );
}

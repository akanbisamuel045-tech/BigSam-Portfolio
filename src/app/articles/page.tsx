import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowButton } from "@/components/ui/ArrowButton";

export default function ArticlesPage() {
  return (
    <main className="p-6 md:p-12 lg:p-16 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
      <div className="space-y-8 bg-white border border-[#E2E2E2] p-8 md:p-14 rounded-2xl shadow-sm">
        <SectionHeader
          badge="INSIGHTS & BLOGS"
          blackText="EDITORIAL ESSAYS ON"
          grayText="SOFTWARE ARCHITECTURE & SCALABILITY."
          align="split"
          subtext="In-depth breakdowns covering type safety, database performance tuning, Next.js server actions, and systems thinking. The full editorial article archive will be completed in Stage 14."
        />

        <div className="pt-4 flex items-center gap-4">
          <ArrowButton text="BACK TO HOME" href="/" variant="light" />
          <ArrowButton text="CONTACT SAMUEL" href="/contact" variant="dark" />
        </div>
      </div>
    </main>
  );
}

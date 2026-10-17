"use client";

import { usePortfolioData } from "@/context/PortfolioContext";

export const BrandMarquee: React.FC = () => {
  const { data: portfolioData } = usePortfolioData();
  const { clientLogos } = portfolioData;

  return (
    <section className="w-full bg-white border-b border-[#E2E2E2] py-6 md:py-8 px-6 md:px-10 select-none">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
        {/* Left Label Column */}
        <div className="lg:col-span-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E84511]" />
          <span className="text-xs md:text-sm font-display font-bold uppercase tracking-wider text-[#7A7A7A]">
            TRUSTED BY LEADING BRANDS
          </span>
        </div>

        {/* Right Client Logos Column */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 items-center">
          {clientLogos.map((logo) => (
            <div
              key={logo}
              className="text-xs sm:text-sm font-display font-extrabold uppercase tracking-tight text-[#444444] hover:text-[#E84511] transition-colors duration-300 py-1.5 px-2 border-l border-[#E2E2E2]/60 hover:border-[#E84511] truncate"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;

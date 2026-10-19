"use client";

import React, { useState, useMemo } from "react";
import {
  X,
  Copy,
  Check,
  Download,
  FileCode,
} from "lucide-react";
import { PortfolioData } from "@/data/portfolioData";

export interface TypeScriptExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  draftData: PortfolioData;
}

const TS_INTERFACES_HEADER = `export interface SocialLink {
  name: string;
  url: string;
}

export interface PersonalInfo {
  firstName: string;
  displayName: string;
  brandName: string;
  footerWordmark: string;
  role: string;
  copyrightYear: string;
  heroTagline: string;
  shortBio: string;
  philosophyHeadline: {
    black: string;
    gray: string;
  };
  philosophySubtext: string;
  email: string;
  phone: string;
  phoneRaw: string;
  location: string;
  officeHours: string;
  bookingUrl: string;
  heroPortrait: string;
  avatarImage: string;
  impactPortrait: string;
  gadexLogo: string;
  gadexLogoWhite: string;
  socialLinks: SocialLink[];
}

export interface HeroFeaturedProject {
  title: string;
  category: string;
  image: string;
  link: string;
}

export interface PortfolioStats {
  projectsCompleted: number;
  projectsSuffix: string;
  happyClients: number;
  happyClientsSuffix: string;
  yearsExperience: number;
  yearsSuffix: string;
  clientSatisfaction: number;
  satisfactionSuffix: string;
  globalClients: number;
  trustBadgeCount: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  layoutSize: "medium-left" | "small-right" | "full-wide" | "small-left" | "medium-right";
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: "sparkle" | "asterisk" | "bolt" | "plus";
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface PricingTier {
  packageTitle: string;
  badge: string;
  price: string;
  unit: string;
  deliveryTime: string;
  revisions: string;
  techStack: string;
  features: string[];
}

export interface PricingPlan {
  monthly: PricingTier;
  projectBased: PricingTier;
}

export interface AchievementItem {
  title: string;
  organization: string;
  year: string;
}

export interface CareerItem {
  company: string;
  period: string;
  image: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  heroFeaturedProject: HeroFeaturedProject;
  stats: PortfolioStats;
  clientLogos: string[];
  services: ServiceItem[];
  projects: ProjectItem[];
  processSteps: ProcessStep[];
  testimonials: TestimonialItem[];
  pricing: PricingPlan;
  achievements: AchievementItem[];
  career: CareerItem[];
  articles: ArticleItem[];
  faqs: FaqItem[];
}`;

export const TypeScriptExportModal: React.FC<TypeScriptExportModalProps> = ({
  isOpen,
  onClose,
  draftData,
}) => {
  const [copied, setCopied] = useState(false);

  // Generate complete formatted TypeScript code
  const generatedTsCode = useMemo(() => {
    const formattedJson = JSON.stringify(draftData, null, 2);
    return `${TS_INTERFACES_HEADER}\n\nexport const portfolioData: PortfolioData = ${formattedJson};\n`;
  }, [draftData]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedTsCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleDownloadTS = () => {
    const blob = new Blob([generatedTsCode], { type: "text/typescript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolioData.ts";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#111111] text-white w-full max-w-4xl border border-white/20 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header Bar */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#161616]">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-white/10 text-[#E84511] rounded-sm">
              <FileCode className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-white font-display">
                TypeScript Source Generator
              </h2>
              <p className="text-[11px] font-mono text-[#8E8E8E]">
                src/data/portfolioData.ts (Live Synchronized Snapshot)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
            aria-label="Close TypeScript modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Action Controls Bar */}
        <div className="p-4 bg-[#1A1A1A] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <p className="text-xs text-[#8E8E8E] leading-relaxed max-w-lg">
            This clean TypeScript source can be directly placed into <code className="text-white font-mono">src/data/portfolioData.ts</code> or committed into git for source version control.
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2 bg-white text-[#111111] hover:bg-stone-200 text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">COPIED TO CLIPBOARD!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#111111]" />
                  <span>COPY CODE</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadTS}
              className="px-4 py-2 bg-[#E84511] hover:bg-[#D63B0B] text-white text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD .TS</span>
            </button>
          </div>
        </div>

        {/* Code Content Container */}
        <div className="flex-1 p-5 overflow-y-auto bg-[#0A0A0A] font-mono text-xs text-[#EAEAEA] leading-relaxed selection:bg-[#E84511] selection:text-white">
          <pre className="whitespace-pre overflow-x-auto">
            <code>{generatedTsCode}</code>
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-[#161616] flex items-center justify-between text-[11px] text-[#8E8E8E]">
          <span className="font-mono">
            {generatedTsCode.split("\n").length} lines • {new Blob([generatedTsCode]).size} bytes
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold uppercase transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

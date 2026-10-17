"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UserCheck,
  Layers,
  FolderGit2,
  FileText,
  HelpCircle,
  Star,
  ExternalLink,
  ArrowRight,
  RotateCcw,
  AlertTriangle,
  Mail,
  Phone,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import { PortfolioData } from "@/data/portfolioData";
import { AdminTabId } from "@/components/admin/AdminSidebar";

export interface OverviewTabProps {
  draftData: PortfolioData;
  onSelectTab: (tab: AdminTabId) => void;
  onResetToDefault: () => Promise<void>;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  draftData,
  onSelectTab,
  onResetToDefault,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    setIsResetting(true);
    try {
      await onResetToDefault();
      setShowResetConfirm(false);
    } finally {
      setIsResetting(false);
    }
  };

  const metricCards = [
    {
      tabId: "identity" as AdminTabId,
      title: "Identity & Hero",
      countText: draftData.personalInfo.displayName || "BigSam",
      subtitle: draftData.personalInfo.role || "Full-Stack Engineer",
      icon: UserCheck,
      color: "text-[#E84511]",
    },
    {
      tabId: "services" as AdminTabId,
      title: "Services Grid",
      countText: `${draftData.services?.length || 0} Modules`,
      subtitle: "001–006 Architectural Offerings",
      icon: Layers,
      color: "text-blue-500",
    },
    {
      tabId: "projects" as AdminTabId,
      title: "Featured Projects",
      countText: `${draftData.projects?.length || 0} Case Studies`,
      subtitle: "Full-Stack Codebases & Live Demos",
      icon: FolderGit2,
      color: "text-emerald-500",
    },
    {
      tabId: "pricing" as AdminTabId,
      title: "Client Testimonials",
      countText: `${draftData.testimonials?.length || 0} Reviews`,
      subtitle: "Social Proof & Verified Ratings",
      icon: Star,
      color: "text-amber-500",
    },
    {
      tabId: "articles" as AdminTabId,
      title: "Editorial Articles",
      countText: `${draftData.articles?.length || 0} Articles`,
      subtitle: "Architectural & Technical Writings",
      icon: FileText,
      color: "text-purple-500",
    },
    {
      tabId: "articles" as AdminTabId,
      title: "FAQ Knowledgebase",
      countText: `${draftData.faqs?.length || 0} Questions`,
      subtitle: "Expandable Accordion Q&A",
      icon: HelpCircle,
      color: "text-cyan-500",
    },
  ];

  const liveRoutes = [
    { label: "Home Page", path: "/" },
    { label: "About Page", path: "/about" },
    { label: "Services Page", path: "/services" },
    { label: "Articles Page", path: "/articles" },
    { label: "Contact Page", path: "/contact" },
  ];

  return (
    <div className="space-y-8 select-none">
      {/* 1. Welcome Profile Banner */}
      <div className="bg-[#111111] text-white p-8 md:p-10 border border-white/10 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E84511]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.06] border border-white/10 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#E84511] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E84511] animate-pulse" />
              <span>GADEX® PRODUCTION CMS</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white font-display">
              WELCOME BACK, {draftData.personalInfo.displayName || "SAMUEL"}
            </h1>

            <p className="text-sm text-[#8E8E8E] mt-2 max-w-xl">
              You have full administrative privileges to visually manage, reorder, and update all portfolio content in real-time.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-5 text-xs text-[#8E8E8E]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E84511]" />
                <span className="font-mono">{draftData.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E84511]" />
                <span className="font-mono">{draftData.personalInfo.phone}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/"
              target="_blank"
              className="px-5 py-3 bg-[#E84511] hover:bg-[#D63B0B] text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-[#E84511]/20"
            >
              <span>PREVIEW LIVE SITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Quick Jump Metric Cards (6 Cards) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#8E8E8E]">
            Content Sections & Quick Access
          </h2>
          <span className="text-xs text-[#8E8E8E]">Click any section to edit</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metricCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <button
                key={index}
                onClick={() => onSelectTab(card.tabId)}
                className="bg-white border border-[#E2E2E2] hover:border-[#E84511] p-6 text-left transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md flex flex-col justify-between h-40 relative"
              >
                <div className="flex items-start justify-between">
                  <div className="p-2.5 bg-[#F6F6F6] rounded-none group-hover:bg-[#111111] transition-colors">
                    <Icon className={`w-5 h-5 ${card.color} group-hover:text-white transition-colors`} />
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8E8E8E] group-hover:text-[#E84511] group-hover:translate-x-1 transition-all" />
                </div>

                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#8E8E8E] mb-1">
                    {card.title}
                  </div>
                  <div className="text-xl font-extrabold text-[#111111] font-display">
                    {card.countText}
                  </div>
                  <div className="text-xs text-[#8E8E8E] mt-0.5 truncate">
                    {card.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Live Route Preview Links Bar */}
      <div className="bg-white border border-[#E2E2E2] p-6">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#8E8E8E] mb-4">
          Live Route Preview Shortcuts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {liveRoutes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              target="_blank"
              className="px-4 py-3 bg-[#F6F6F6] hover:bg-[#111111] hover:text-white text-[#111111] text-xs font-bold transition-all border border-[#E2E2E2] flex items-center justify-between group"
            >
              <span>{route.label}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8E8E8E] group-hover:text-[#E84511] transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {/* 4. System Maintenance & Default Seed Reset */}
      <div className="bg-white border border-red-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-none shrink-0 border border-red-100">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#111111]">
                System Maintenance & Database Reset
              </h3>
              <p className="text-xs text-[#8E8E8E] mt-1 max-w-xl leading-relaxed">
                Reset all portfolio data back to pristine factory seed defaults (<span className="font-mono text-red-500">cms-default.json</span>). This clears all draft modifications across all sections.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET TO DEFAULT SEED</span>
          </button>
        </div>

        {/* Confirmation Modal */}
        {showResetConfirm && (
          <div className="mt-6 pt-6 border-t border-red-100 animate-in fade-in duration-200">
            <div className="p-4 bg-red-50 border border-red-200 rounded-none flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                <span className="text-xs font-bold text-red-900">
                  Are you absolutely sure? This will overwrite the live database with initial factory data.
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  disabled={isResetting}
                  className="w-1/2 sm:w-auto px-4 py-2 bg-white text-xs font-bold text-[#111111] border border-[#E2E2E2] hover:bg-[#F6F6F6] transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleReset}
                  disabled={isResetting}
                  className="w-1/2 sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {isResetting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>RESETTING...</span>
                    </>
                  ) : (
                    <span>CONFIRM RESET</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

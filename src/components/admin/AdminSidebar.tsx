"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  UserCheck,
  BarChart3,
  Layers,
  FolderGit2,
  Cpu,
  CreditCard,
  Award,
  FileText,
  ExternalLink,
  LogOut,
  X,
  LucideIcon,
} from "lucide-react";
import { GadexLogo } from "@/components/ui/GadexLogo";
import { cn } from "@/lib/utils";

export type AdminTabId =
  | "overview"
  | "identity"
  | "stats"
  | "services"
  | "projects"
  | "process"
  | "pricing"
  | "about"
  | "articles";

export interface TabItemConfig {
  id: AdminTabId;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

export interface AdminSidebarCounts {
  services: number;
  projects: number;
  articles: number;
  testimonials: number;
  faqs: number;
  achievements: number;
}

export interface AdminSidebarProps {
  activeTab: AdminTabId;
  onSelectTab: (tab: AdminTabId) => void;
  counts: AdminSidebarCounts;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  counts,
  isOpenMobile,
  onCloseMobile,
  onLogout,
}) => {
  const tabs: TabItemConfig[] = [
    {
      id: "overview",
      label: "System Overview",
      icon: LayoutDashboard,
    },
    {
      id: "identity",
      label: "Identity & Hero",
      icon: UserCheck,
    },
    {
      id: "stats",
      label: "Stats & Brand Marquee",
      icon: BarChart3,
    },
    {
      id: "services",
      label: "Services (001–006)",
      icon: Layers,
      badge: counts.services,
    },
    {
      id: "projects",
      label: "Portfolio Projects",
      icon: FolderGit2,
      badge: counts.projects,
    },
    {
      id: "process",
      label: "Process & Bento Grid",
      icon: Cpu,
    },
    {
      id: "pricing",
      label: "Pricing & Reviews",
      icon: CreditCard,
      badge: counts.testimonials,
    },
    {
      id: "about",
      label: "About, Awards & Career",
      icon: Award,
      badge: counts.achievements,
    },
    {
      id: "articles",
      label: "Articles & FAQs",
      icon: FileText,
      badge: (counts.articles || 0) + (counts.faqs || 0),
    },
  ];

  const sidebarContent = (
    <div className="h-full w-full bg-[#111111] text-white flex flex-col justify-between border-r border-white/10 select-none">
      {/* Top Brand Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GadexLogo variant="dark" size="sm" />
          <span className="px-2 py-0.5 bg-[#E84511]/15 border border-[#E84511]/30 text-[#E84511] text-[9px] font-extrabold uppercase tracking-widest rounded">
            CMS STUDIO v1.0
          </span>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 text-white/50 hover:text-white transition-colors cursor-pointer"
          aria-label="Close mobile menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Tabs List */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E]/60">
          Studio Navigation
        </div>

        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                onSelectTab(tab.id);
                onCloseMobile();
              }}
              className={cn(
                "w-full flex items-center justify-between px-3.5 py-3 rounded-none text-xs transition-all cursor-pointer group text-left relative",
                isActive
                  ? "bg-[#1A1A1A] text-white font-bold border-l-4 border-[#E84511]"
                  : "text-[#8E8E8E] hover:text-white hover:bg-white/[0.04] border-l-4 border-transparent"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0 transition-colors",
                    isActive
                      ? "text-[#E84511]"
                      : "text-[#8E8E8E] group-hover:text-white"
                  )}
                />
                <span className="truncate">{tab.label}</span>
              </div>

              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0",
                    isActive
                      ? "bg-[#E84511]/20 text-[#E84511] font-bold"
                      : "bg-white/5 text-[#8E8E8E] group-hover:text-white"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-white/10 space-y-2 bg-[#0C0C0C]">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white text-xs font-extrabold uppercase tracking-wider transition-colors border border-white/5"
        >
          <span>OPEN LIVE PORTFOLIO</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#E84511]" />
        </Link>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-between px-3.5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 text-xs font-extrabold uppercase tracking-wider transition-colors border border-red-500/20 cursor-pointer"
        >
          <span>LOG OUT SESSION</span>
          <LogOut className="w-3.5 h-3.5 text-red-400" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-72 shrink-0 h-screen sticky top-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Pane */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

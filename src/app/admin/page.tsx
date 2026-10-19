"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  AdminSidebar,
  AdminTabId,
  AdminSidebarCounts,
} from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { OverviewTab } from "@/components/admin/editors/OverviewTab";
import { IdentityHeroTab } from "@/components/admin/editors/IdentityHeroTab";
import { StatsClientsTab } from "@/components/admin/editors/StatsClientsTab";
import { ServicesEditorTab } from "@/components/admin/editors/ServicesEditorTab";
import { ProjectsEditorTab } from "@/components/admin/editors/ProjectsEditorTab";
import { ProcessBentoTab } from "@/components/admin/editors/ProcessBentoTab";
import { PricingReviewsTab } from "@/components/admin/editors/PricingReviewsTab";
import { usePortfolioData } from "@/context/PortfolioContext";
import { PortfolioData } from "@/data/portfolioData";
import {
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  Layers,
} from "lucide-react";

export default function AdminControlCenter() {
  const router = useRouter();
  const { data: currentData, refreshData } = usePortfolioData();

  // Active Tab State
  const [activeTab, setActiveTab] = useState<AdminTabId>("overview");

  // Draft Data State
  const [draftData, setDraftData] = useState<PortfolioData>(currentData);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Sync draft data when context data loads initially
  useEffect(() => {
    if (currentData) {
      setDraftData(currentData);
    }
  }, [currentData]);

  // Toast auto-dismiss timer
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Compute Unsaved Changes
  const hasUnsavedChanges = useMemo(() => {
    if (!currentData || !draftData) return false;
    return JSON.stringify(currentData) !== JSON.stringify(draftData);
  }, [currentData, draftData]);

  // Dynamic Item Counts
  const counts: AdminSidebarCounts = useMemo(() => {
    return {
      services: draftData?.services?.length || 0,
      projects: draftData?.projects?.length || 0,
      articles: draftData?.articles?.length || 0,
      testimonials: draftData?.testimonials?.length || 0,
      faqs: draftData?.faqs?.length || 0,
      achievements: draftData?.achievements?.length || 0,
    };
  }, [draftData]);

  // Active Tab Titles
  const activeTabTitles: Record<AdminTabId, string> = {
    overview: "System Overview",
    identity: "Identity & Hero Configuration",
    stats: "Stats & Brand Marquee",
    services: "Services Editor (001–006)",
    projects: "Portfolio Projects Editor",
    process: "Engineering Process & Bento Grid",
    pricing: "Pricing Tiers & Reviews",
    about: "About Story, Awards & Career",
    articles: "Articles & FAQ Knowledgebase",
  };

  // Save All Changes Handler
  const handleSave = useCallback(async () => {
    if (isSaving || !hasUnsavedChanges) return;
    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(draftData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Refresh local portfolio context
        await refreshData();
        setLastSavedAt(new Date().toISOString());

        // Broadcast to other tabs
        if (typeof window !== "undefined") {
          try {
            const channel = new BroadcastChannel("gadex_cms_channel");
            channel.postMessage({ type: "SYNC_CMS", data: draftData });
            channel.close();
          } catch {
            // fallback
          }
          window.dispatchEvent(
            new CustomEvent("cms-data-updated", { detail: draftData })
          );
        }

        setToast({
          type: "success",
          message: "All portfolio changes successfully published to live CMS!",
        });
      } else {
        setToast({
          type: "error",
          message: result.error || "Failed to save portfolio changes.",
        });
      }
    } catch {
      setToast({
        type: "error",
        message: "Network error saving portfolio changes. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  }, [draftData, hasUnsavedChanges, isSaving, refreshData]);

  // Discard Changes Handler
  const handleDiscard = useCallback(() => {
    setDraftData(currentData);
    setToast({
      type: "success",
      message: "Pending draft changes discarded.",
    });
  }, [currentData]);

  // Reset to Default Seed Handler
  const handleResetToDefault = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "reset" }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setDraftData(result.data);
        await refreshData();
        setLastSavedAt(new Date().toISOString());

        // Broadcast reset event
        if (typeof window !== "undefined") {
          try {
            const channel = new BroadcastChannel("gadex_cms_channel");
            channel.postMessage({ type: "SYNC_CMS", data: result.data });
            channel.close();
          } catch {
            // fallback
          }
          window.dispatchEvent(
            new CustomEvent("cms-data-updated", { detail: result.data })
          );
        }

        setToast({
          type: "success",
          message: "Portfolio database reset to factory seed.",
        });
      } else {
        setToast({
          type: "error",
          message: result.error || "Failed to reset portfolio database.",
        });
      }
    } catch {
      setToast({
        type: "error",
        message: "Network error resetting database. Please try again.",
      });
    }
  }, [refreshData]);

  // Logout Handler
  const handleLogout = useCallback(async () => {
    try {
      await fetch("/api/admin/auth", {
        method: "DELETE",
      });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  }, [router]);

  // Keyboard shortcut Ctrl+S / Cmd+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (hasUnsavedChanges && !isSaving) {
          handleSave();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave, hasUnsavedChanges, isSaving]);

  return (
    <div className="min-h-screen w-full bg-[#F6F6F6] text-[#111111] flex flex-row relative font-body">
      {/* 1. Left Persistent / Mobile Responsive Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        counts={counts}
        isOpenMobile={isOpenMobile}
        onCloseMobile={() => setIsOpenMobile(false)}
        onLogout={handleLogout}
      />

      {/* 2. Main Studio Canvas */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Sticky Action Header */}
        <AdminHeader
          activeTabTitle={activeTabTitles[activeTab]}
          hasUnsavedChanges={hasUnsavedChanges}
          isSaving={isSaving}
          lastSavedAt={lastSavedAt}
          onSave={handleSave}
          onDiscard={handleDiscard}
          onResetToDefault={handleResetToDefault}
          onOpenMobileMenu={() => setIsOpenMobile(true)}
        />

        {/* Content Workspace */}
        <main className="flex-1 p-6 md:p-10 max-w-[1400px] w-full mx-auto">
          {activeTab === "overview" && (
            <OverviewTab
              draftData={draftData}
              onSelectTab={setActiveTab}
              onResetToDefault={handleResetToDefault}
            />
          )}

          {activeTab === "identity" && (
            <IdentityHeroTab
              draftData={draftData}
              onChange={setDraftData}
            />
          )}

          {activeTab === "stats" && (
            <StatsClientsTab
              draftData={draftData}
              onChange={setDraftData}
            />
          )}

          {activeTab === "services" && (
            <ServicesEditorTab
              draftData={draftData}
              onChange={setDraftData}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsEditorTab
              draftData={draftData}
              onChange={setDraftData}
            />
          )}

          {activeTab === "process" && (
            <ProcessBentoTab
              draftData={draftData}
              onChange={setDraftData}
            />
          )}

          {activeTab === "pricing" && (
            <PricingReviewsTab
              draftData={draftData}
              onChange={setDraftData}
            />
          )}

          {activeTab !== "overview" &&
            activeTab !== "identity" &&
            activeTab !== "stats" &&
            activeTab !== "services" &&
            activeTab !== "projects" &&
            activeTab !== "process" &&
            activeTab !== "pricing" && (
            <div className="bg-white border border-[#E2E2E2] p-8 md:p-12 text-center space-y-6">
              <div className="w-14 h-14 bg-[#111111] text-[#E84511] flex items-center justify-center mx-auto shadow-md">
                <Layers className="w-7 h-7" />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200 text-[#E84511] text-[10px] font-extrabold uppercase tracking-widest rounded-full mb-3">
                  <span>STAGE 10 SHELL ACTIVE</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-[#111111] font-display">
                  {activeTabTitles[activeTab]}
                </h2>
                <p className="text-xs md:text-sm text-[#8E8E8E] max-w-lg mx-auto mt-2 leading-relaxed">
                  The navigation shell, tab routing, unsaved change tracking, and keyboard shortcuts are functioning. Deep field editors for this section will be attached in Stages 5–11.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => setActiveTab("overview")}
                  className="px-5 py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  RETURN TO OVERVIEW
                </button>
                <a
                  href="/"
                  target="_blank"
                  className="px-5 py-2.5 bg-[#F6F6F6] hover:bg-[#E2E2E2] text-[#111111] text-xs font-extrabold uppercase tracking-wider transition-colors flex items-center gap-1.5 border border-[#E2E2E2]"
                >
                  <span>VIEW LIVE PAGE</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#E84511]" />
                </a>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 3. Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
          <div
            className={`flex items-center gap-3 px-4 py-3 shadow-xl border text-xs font-bold ${
              toast.type === "success"
                ? "bg-[#111111] text-white border-emerald-500/50"
                : "bg-red-950 text-red-100 border-red-500/50"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 text-white/50 hover:text-white transition-colors cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

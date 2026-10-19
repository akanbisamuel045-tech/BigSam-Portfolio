"use client";

import React from "react";
import { Menu, Save, Loader2, Undo2, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AdminHeaderProps {
  activeTabTitle: string;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  lastSavedAt: string | null;
  onSave: () => Promise<void>;
  onDiscard: () => void;
  onResetToDefault: () => Promise<void>;
  onOpenMobileMenu: () => void;
  onExportBackup?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTabTitle,
  hasUnsavedChanges,
  isSaving,
  lastSavedAt,
  onSave,
  onDiscard,
  onOpenMobileMenu,
  onExportBackup,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#E2E2E2] px-6 py-4 flex items-center justify-between gap-4 select-none">
      {/* Left Title & Mobile Menu Trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-[#111111] hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-extrabold uppercase tracking-wider text-[#8E8E8E] hidden sm:inline">
            GADEX® CMS /
          </span>
          <span className="font-extrabold uppercase tracking-tight text-[#111111] text-sm md:text-base font-display">
            {activeTabTitle}
          </span>
        </div>
      </div>

      {/* Right Action Cluster */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Sync Status Indicator */}
        {hasUnsavedChanges ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-200 text-[#E84511] text-[10px] font-extrabold uppercase tracking-widest rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#E84511] animate-pulse shrink-0" />
              <span>UNSAVED CHANGES</span>
            </div>

            <button
              onClick={onDiscard}
              disabled={isSaving}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-[#8E8E8E] hover:text-[#111111] transition-colors cursor-pointer hover:bg-black/5 rounded disabled:opacity-50"
              title="Discard all pending changes"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>DISCARD</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-extrabold uppercase tracking-widest rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="hidden sm:inline">ALL CHANGES SYNCED</span>
            <span className="sm:hidden">SYNCED</span>
            {lastSavedAt && (
              <span className="text-[#8E8E8E] font-mono text-[9px] lowercase hidden md:inline ml-1">
                ({new Date(lastSavedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})
              </span>
            )}
          </div>
        )}

        {/* Quick Export / Backup Button */}
        {onExportBackup && (
          <button
            type="button"
            onClick={onExportBackup}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 bg-[#F6F6F6] hover:bg-[#111111] hover:text-white text-[#111111] text-xs font-extrabold uppercase tracking-wider transition-all border border-[#E2E2E2] cursor-pointer group"
            title="Download JSON CMS Backup"
          >
            <Download className="w-3.5 h-3.5 text-[#E84511] group-hover:text-white transition-colors" />
            <span className="hidden md:inline">EXPORT / BACKUP</span>
            <span className="md:hidden">BACKUP</span>
          </button>
        )}

        {/* Primary Save Changes Button */}
        <button
          onClick={onSave}
          disabled={isSaving || !hasUnsavedChanges}
          className={cn(
            "text-white text-xs font-extrabold uppercase tracking-wider px-5 py-2.5 flex items-center gap-2 transition-all cursor-pointer shadow-sm rounded-none group",
            hasUnsavedChanges
              ? "bg-[#E84511] hover:bg-[#D63B0B]"
              : "bg-[#111111]/40 cursor-not-allowed opacity-60"
          )}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>SAVING...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-white/90 group-hover:scale-105 transition-transform" />
              <span>SAVE ALL CHANGES</span>
              <span className="hidden md:inline-block text-[9px] font-mono opacity-70 ml-0.5">
                (Ctrl+S)
              </span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};

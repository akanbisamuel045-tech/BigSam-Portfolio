"use client";

import React from "react";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Workflow,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Grid,
} from "lucide-react";
import { PortfolioData, ProcessStep } from "@/data/portfolioData";
import { ImageUploaderModal } from "@/components/admin/ImageUploaderModal";

export interface ProcessBentoTabProps {
  draftData: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

const ICON_OPTIONS: {
  id: ProcessStep["icon"];
  label: string;
  symbol: string;
}[] = [
  { id: "sparkle", label: "Sparkle", symbol: "✦" },
  { id: "asterisk", label: "Asterisk", symbol: "✱" },
  { id: "bolt", label: "Bolt", symbol: "⚡" },
  { id: "plus", label: "Plus", symbol: "＋" },
];

const renderGeometricIcon = (
  iconType: string,
  className = "w-5 h-5 text-[#E84511]"
) => {
  switch (iconType) {
    case "sparkle":
      return (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <path
            d="M14 0L17.5 10.5L28 14L17.5 17.5L14 28L10.5 17.5L0 14L10.5 10.5L14 0Z"
            fill="currentColor"
          />
        </svg>
      );
    case "asterisk":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <path
            d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "bolt":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
        </svg>
      );
    case "plus":
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <path d="M10 2h4v8h8v4h-8v8h-4v-8H2v-4h8V2z" fill="currentColor" />
        </svg>
      );
  }
};

export const ProcessBentoTab: React.FC<ProcessBentoTabProps> = ({
  draftData,
  onChange,
}) => {
  const { processSteps = [], personalInfo, stats } = draftData;

  // Helper: Normalize step numbers to "01", "02", "03", etc.
  const normalizeSteps = (steps: ProcessStep[]): ProcessStep[] => {
    return steps.map((item, idx) => ({
      ...item,
      step: String(idx + 1).padStart(2, "0"),
    }));
  };

  const updateStep = (index: number, updates: Partial<ProcessStep>) => {
    const updated = [...processSteps];
    updated[index] = { ...updated[index], ...updates };
    onChange({
      ...draftData,
      processSteps: updated,
    });
  };

  const handleAddStep = () => {
    const newStepNum = String(processSteps.length + 1).padStart(2, "0");
    const newStep: ProcessStep = {
      step: newStepNum,
      title: "NEW WORKFLOW PHASE",
      description:
        "Executing precise technical milestones with clean code standards, automated testing, and seamless deployment pipelines.",
      icon: "sparkle",
    };

    const updated = normalizeSteps([...processSteps, newStep]);
    onChange({
      ...draftData,
      processSteps: updated,
    });
  };

  const handleDeleteStep = (index: number) => {
    if (processSteps.length <= 1) return; // Guard: at least 1 step required
    const filtered = processSteps.filter((_, i) => i !== index);
    const updated = normalizeSteps(filtered);
    onChange({
      ...draftData,
      processSteps: updated,
    });
  };

  const handleMoveStep = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= processSteps.length) return;

    const updated = [...processSteps];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const normalized = normalizeSteps(updated);
    onChange({
      ...draftData,
      processSteps: normalized,
    });
  };

  // Bento Grid synchronized updates
  const updatePersonalInfo = (updates: Partial<typeof personalInfo>) => {
    onChange({
      ...draftData,
      personalInfo: {
        ...personalInfo,
        ...updates,
      },
    });
  };

  const updateStats = (updates: Partial<typeof stats>) => {
    onChange({
      ...draftData,
      stats: {
        ...stats,
        ...updates,
      },
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* ================================================================ */}
      {/* SECTION 1: 4-STEP ENGINEERING PROCESS CARDS */}
      {/* ================================================================ */}
      <div className="space-y-6">
        {/* Top Summary & Action Toolbar */}
        <div className="bg-white border border-[#E2E2E2] p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 bg-[#111111] text-[#E84511]">
                  <Workflow className="w-4 h-4" />
                </span>
                <h1 className="text-base font-extrabold uppercase tracking-wider text-[#111111] font-display">
                  Engineering Process Workflow Editor
                </h1>
                <span className="px-2.5 py-0.5 bg-[#111111] text-white text-[11px] font-mono font-bold">
                  {processSteps.length} STEPS
                </span>
              </div>
              <p className="text-xs text-[#666666] leading-relaxed max-w-2xl">
                Configure Samuel&apos;s step-by-step engineering workflow displayed in the 4-column matte carbon cards on the Home page. Each card features an orange geometric SVG icon and normalized step numbering.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <a
                href="/#process"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 bg-[#F6F6F6] hover:bg-[#EAEAEA] text-[#666666] hover:text-[#111111] text-[11px] font-bold uppercase tracking-wider transition-colors border border-[#E2E2E2] flex items-center gap-1.5 cursor-pointer"
              >
                <span>VIEW ON HOME</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E84511]" />
              </a>

              <button
                type="button"
                onClick={handleAddStep}
                className="bg-[#E84511] hover:bg-[#D63B0B] text-white text-xs font-extrabold uppercase tracking-wider px-4 py-2.5 flex items-center gap-2 transition-colors cursor-pointer shadow-sm active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>+ ADD PROCESS STEP</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2x2 Grid of Matte Dark-Accented Editor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {processSteps.map((stepItem, idx) => (
            <div
              key={stepItem.step || idx}
              className="bg-white border border-[#E2E2E2] shadow-sm transition-all duration-200 hover:border-[#111111]/30 flex flex-col justify-between"
            >
              {/* Card Header Bar */}
              <div className="p-4 md:p-5 flex items-center justify-between gap-3 bg-[#FAFAFA] border-b border-[#EAEAEA]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-sm bg-[#111111] flex items-center justify-center shrink-0 border border-[#222222]">
                    {renderGeometricIcon(stepItem.icon, "w-4 h-4 text-[#E84511]")}
                  </div>
                  <span className="px-2 py-0.5 bg-[#111111] text-white text-xs font-mono font-extrabold tracking-wider">
                    {stepItem.step}
                  </span>
                  <h3 className="text-sm font-extrabold uppercase tracking-tight text-[#111111] font-display truncate">
                    {stepItem.title || "UNTITLED STEP"}
                  </h3>
                </div>

                {/* Right Move & Delete Controls */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleMoveStep(idx, "up")}
                    disabled={idx === 0}
                    className="p-1.5 bg-white border border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Move Step Earlier"
                    aria-label={`Move step ${stepItem.title} up`}
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMoveStep(idx, "down")}
                    disabled={idx === processSteps.length - 1}
                    className="p-1.5 bg-white border border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Move Step Later"
                    aria-label={`Move step ${stepItem.title} down`}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteStep(idx)}
                    disabled={processSteps.length <= 1}
                    className="p-1.5 bg-white border border-red-200 hover:bg-red-50 text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title={
                      processSteps.length <= 1
                        ? "At least one step required"
                        : "Delete Step"
                    }
                    aria-label={`Delete step ${stepItem.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col gap-5 flex-1">
                {/* Step Title Input */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                    Step Title (Bold Uppercase)
                  </label>
                  <input
                    type="text"
                    value={stepItem.title}
                    onChange={(e) =>
                      updateStep(idx, { title: e.target.value.toUpperCase() })
                    }
                    placeholder="e.g. ARCHITECTURE"
                    className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold uppercase px-3.5 py-2.5 outline-none font-display text-[#111111] transition-colors"
                  />
                </div>

                {/* Geometric Icon Selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#E84511]" />
                      <span>Geometric Icon Theme</span>
                    </label>
                    <span className="text-[10px] font-mono text-[#888888]">
                      Active: {stepItem.icon}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {ICON_OPTIONS.map((opt) => {
                      const isSelected = stepItem.icon === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => updateStep(idx, { icon: opt.id })}
                          className={`p-2.5 border rounded-sm flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#111111] border-[#E84511] text-white shadow-sm"
                              : "bg-[#FAFAFA] border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#444444]"
                          }`}
                        >
                          <div className={isSelected ? "text-[#E84511]" : "text-[#777777]"}>
                            {renderGeometricIcon(opt.id, "w-5 h-5")}
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-tight">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step Description Textarea */}
                <div className="space-y-1.5 flex-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                    Process Description
                  </label>
                  <textarea
                    rows={3}
                    value={stepItem.description}
                    onChange={(e) =>
                      updateStep(idx, { description: e.target.value })
                    }
                    placeholder="Describe technical procedures executed in this stage..."
                    className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-medium px-3.5 py-2.5 outline-none text-[#111111] leading-relaxed transition-colors resize-y"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* SECTION 2: WHY CHOOSE ME BENTO GRID QUICK-CONFIG CARD */}
      {/* ================================================================ */}
      <div className="bg-white border border-[#E2E2E2] p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-[#EAEAEA]">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-[#111111] text-[#E84511]">
              <Grid className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#111111] font-display">
                &ldquo;Why Choose Me&rdquo; Bento Grid Synchronized Config
              </h2>
              <p className="text-xs text-[#777777] mt-0.5">
                Directly powers the 3-column Bento showcase located below the Process section on the Home page and About page.
              </p>
            </div>
          </div>

          <a
            href="/#why-choose-me"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 bg-[#F6F6F6] hover:bg-[#EAEAEA] text-[#111111] text-[10px] font-extrabold uppercase tracking-wider transition-colors border border-[#E2E2E2] flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>PREVIEW BENTO</span>
            <ExternalLink className="w-3 h-3 text-[#E84511]" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bento Stats & Trust Metrics (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
              <ShieldCheck className="w-4 h-4 text-[#E84511]" />
              <span>Bento Stat Counters & Trust Stack</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Years of Experience */}
              <div className="p-3.5 bg-[#FAFAFA] border border-[#E2E2E2] space-y-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#666666]">
                  Column 1: Experience Counter
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={stats.yearsExperience}
                    onChange={(e) =>
                      updateStats({ yearsExperience: Number(e.target.value) || 0 })
                    }
                    className="w-20 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold px-3 py-1.5 outline-none font-display"
                  />
                  <input
                    type="text"
                    value={stats.yearsSuffix}
                    onChange={(e) => updateStats({ yearsSuffix: e.target.value })}
                    placeholder="+"
                    className="w-14 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold px-3 py-1.5 outline-none font-display text-center"
                  />
                </div>
                <span className="text-[10px] text-[#888888] block">
                  e.g. 4+ Years Experience
                </span>
              </div>

              {/* Client Satisfaction */}
              <div className="p-3.5 bg-[#FAFAFA] border border-[#E2E2E2] space-y-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#666666]">
                  Column 1: Satisfaction Metric
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={stats.clientSatisfaction}
                    onChange={(e) =>
                      updateStats({ clientSatisfaction: Number(e.target.value) || 0 })
                    }
                    className="w-20 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold px-3 py-1.5 outline-none font-display"
                  />
                  <input
                    type="text"
                    value={stats.satisfactionSuffix}
                    onChange={(e) =>
                      updateStats({ satisfactionSuffix: e.target.value })
                    }
                    placeholder="%"
                    className="w-14 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold px-3 py-1.5 outline-none font-display text-center"
                  />
                </div>
                <span className="text-[10px] text-[#888888] block">
                  e.g. 98% Client Satisfaction
                </span>
              </div>

              {/* Happy Clients */}
              <div className="p-3.5 bg-[#FAFAFA] border border-[#E2E2E2] space-y-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#666666]">
                  Column 2: Happy Clients Stack
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={stats.happyClients}
                    onChange={(e) =>
                      updateStats({ happyClients: Number(e.target.value) || 0 })
                    }
                    className="w-20 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold px-3 py-1.5 outline-none font-display"
                  />
                  <input
                    type="text"
                    value={stats.happyClientsSuffix}
                    onChange={(e) =>
                      updateStats({ happyClientsSuffix: e.target.value })
                    }
                    placeholder="+"
                    className="w-14 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold px-3 py-1.5 outline-none font-display text-center"
                  />
                </div>
                <span className="text-[10px] text-[#888888] block">
                  e.g. 10+ Happy Clients Successfully
                </span>
              </div>

              {/* Trust Badge / Reliability Label */}
              <div className="p-3.5 bg-[#FAFAFA] border border-[#E2E2E2] space-y-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#666666]">
                  Overall Trust Badge Label
                </label>
                <input
                  type="text"
                  value={stats.trustBadgeCount}
                  onChange={(e) =>
                    updateStats({ trustBadgeCount: e.target.value })
                  }
                  placeholder="100% Reliable"
                  className="w-full bg-white border border-[#E2E2E2] focus:border-[#E84511] text-xs font-semibold px-3 py-2 outline-none font-body"
                />
                <span className="text-[10px] text-[#888888] block">
                  e.g. 100% Reliable
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bento Studio Portrait Picker (5 cols) */}
          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#EAEAEA] lg:pl-8 pt-6 lg:pt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E84511]" />
                  <span>Column 3 Studio Portrait</span>
                </span>
                <span className="text-[10px] font-mono text-[#888888]">4:3.6 RATIO</span>
              </div>

              <ImageUploaderModal
                label="Bento Column 3 Studio Portrait"
                description="Visual headshot rendered inside Column 3 of the Why Choose Me Bento Grid."
                value={personalInfo.impactPortrait}
                onChange={(url) => updatePersonalInfo({ impactPortrait: url })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

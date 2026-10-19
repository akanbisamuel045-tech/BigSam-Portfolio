"use client";

import React, { useState } from "react";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles,
  Github,
  Maximize2,
  Minimize2,
  FolderKanban,
  SlidersHorizontal,
} from "lucide-react";
import { PortfolioData, ProjectItem } from "@/data/portfolioData";
import { ImageUploaderModal } from "@/components/admin/ImageUploaderModal";

export interface ProjectsEditorTabProps {
  draftData: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

const PRESET_CATEGORIES = [
  "/Full-Stack",
  "/Web App",
  "/Architecture",
  "/SaaS",
  "/Backend",
  "/AI & Cloud",
  "/Mobile",
];

const LAYOUT_OPTIONS: {
  value: ProjectItem["layoutSize"];
  label: string;
  description: string;
}[] = [
  {
    value: "medium-left",
    label: "Medium Left (5-Col)",
    description: "Row 1 Left Column frame (aspect-[4/4.6])",
  },
  {
    value: "small-right",
    label: "Small Right (4-Col)",
    description: "Row 1 Right Column offset frame (col-start-9, aspect-[4/4.2])",
  },
  {
    value: "full-wide",
    label: "Full-Wide Panoramic (12-Col)",
    description: "Row 2 Full-width banner (aspect-[21/9])",
  },
  {
    value: "small-left",
    label: "Small Left (4-Col Square)",
    description: "Row 3 Left Square frame (aspect-square)",
  },
  {
    value: "medium-right",
    label: "Medium Right (6-Col Tall)",
    description: "Row 3 Right Tall frame (col-start-7, aspect-[4/4.5])",
  },
];

const getSlotMetadata = (idx: number) => {
  switch (idx) {
    case 0:
      return {
        pill: "ROW 1 • 5-COL MEDIUM FRAME",
        colorClass: "bg-stone-100 border-stone-300 text-[#111111]",
      };
    case 1:
      return {
        pill: "ROW 1 • 4-COL OFFSET FRAME",
        colorClass: "bg-stone-100 border-stone-300 text-[#111111]",
      };
    case 2:
      return {
        pill: "ROW 2 • FULL-WIDE BANNER",
        colorClass: "bg-orange-50 border-orange-200 text-[#E84511]",
      };
    case 3:
      return {
        pill: "ROW 3 • 4-COL SQUARE FRAME",
        colorClass: "bg-stone-100 border-stone-300 text-[#111111]",
      };
    case 4:
      return {
        pill: "ROW 3 • 6-COL TALL FRAME",
        colorClass: "bg-stone-100 border-stone-300 text-[#111111]",
      };
    default:
      return {
        pill: `ROW 4+ • 2-COL EDITORIAL STREAM (#${idx + 1})`,
        colorClass: "bg-blue-50 border-blue-200 text-blue-700",
      };
  }
};

export const ProjectsEditorTab: React.FC<ProjectsEditorTabProps> = ({
  draftData,
  onChange,
}) => {
  const { projects = [] } = draftData;

  // Track collapsed cards state by ID (default open)
  const [collapsedCards, setCollapsedCards] = useState<Record<string, boolean>>({});

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, ...updates } : p));
    onChange({
      ...draftData,
      projects: updated,
    });
  };

  const handleAddNewProject = () => {
    const count = projects.length;
    let defaultLayout: ProjectItem["layoutSize"] = "medium-left";
    if (count === 1) defaultLayout = "small-right";
    else if (count === 2) defaultLayout = "full-wide";
    else if (count === 3) defaultLayout = "small-left";
    else if (count === 4) defaultLayout = "medium-right";

    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: "NEW PORTFOLIO PROJECT",
      category: "/Full-Stack",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80",
      link: "https://github.com/akanbisamuel045-tech",
      layoutSize: defaultLayout,
    };

    const updated = [...projects, newProject];
    onChange({
      ...draftData,
      projects: updated,
    });

    // Expand new card immediately
    setCollapsedCards((prev) => ({ ...prev, [newProject.id]: false }));
  };

  const handleDeleteProject = (id: string) => {
    if (projects.length <= 1) return; // Guard: at least 1 project remains
    const filtered = projects.filter((p) => p.id !== id);
    onChange({
      ...draftData,
      projects: filtered,
    });
  };

  const handleMoveProject = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    onChange({
      ...draftData,
      projects: updated,
    });
  };

  const toggleCardCollapse = (id: string) => {
    setCollapsedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAll = () => {
    setCollapsedCards({});
  };

  const handleCollapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    projects.forEach((p) => {
      allCollapsed[p.id] = true;
    });
    setCollapsedCards(allCollapsed);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. TOP SUMMARY & ACTION TOOLBAR */}
      <div className="bg-white border border-[#E2E2E2] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-[#111111] text-[#E84511]">
                <FolderKanban className="w-4 h-4" />
              </span>
              <h1 className="text-base font-extrabold uppercase tracking-wider text-[#111111] font-display">
                Portfolio Projects & Editorial Grid Editor
              </h1>
              <span className="px-2.5 py-0.5 bg-[#111111] text-white text-[11px] font-mono font-bold">
                {projects.length} PROJECTS
              </span>
            </div>
            <p className="text-xs text-[#666666] leading-relaxed max-w-2xl">
              Projects at positions <strong className="text-[#111111] font-mono">#01–#05</strong> form the signature 3-row editorial grid on the Home page. Any additional projects (<strong className="text-[#111111] font-mono">#06+</strong>) automatically stream into a modern 2-column gallery.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={handleExpandAll}
              className="px-3 py-2 bg-[#F6F6F6] hover:bg-[#EAEAEA] text-[#666666] hover:text-[#111111] text-[11px] font-bold uppercase tracking-wider transition-colors border border-[#E2E2E2] flex items-center gap-1.5 cursor-pointer"
              title="Expand all project cards"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">EXPAND ALL</span>
            </button>
            <button
              type="button"
              onClick={handleCollapseAll}
              className="px-3 py-2 bg-[#F6F6F6] hover:bg-[#EAEAEA] text-[#666666] hover:text-[#111111] text-[11px] font-bold uppercase tracking-wider transition-colors border border-[#E2E2E2] flex items-center gap-1.5 cursor-pointer"
              title="Collapse all project cards"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">COLLAPSE ALL</span>
            </button>
            <button
              type="button"
              onClick={handleAddNewProject}
              className="bg-[#E84511] hover:bg-[#D63B0B] text-white text-xs font-extrabold uppercase tracking-wider px-4 py-2.5 flex items-center gap-2 transition-colors cursor-pointer shadow-sm active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ ADD NEW PROJECT</span>
            </button>
          </div>
        </div>

        {/* Staggered Grid Mapping Blueprint Callout */}
        <div className="mt-5 pt-4 border-t border-[#F0F0F0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-[11px]">
          <div className="p-2.5 bg-[#FBFBFB] border border-[#EAEAEA]">
            <span className="font-mono font-bold text-[#E84511]">SLOT #01:</span>
            <p className="font-extrabold text-[#111111] uppercase mt-0.5">Row 1 Left (5-Col)</p>
            <p className="text-[10px] text-[#888888]">Medium Frame (aspect-[4/4.6])</p>
          </div>
          <div className="p-2.5 bg-[#FBFBFB] border border-[#EAEAEA]">
            <span className="font-mono font-bold text-[#E84511]">SLOT #02:</span>
            <p className="font-extrabold text-[#111111] uppercase mt-0.5">Row 1 Right (4-Col)</p>
            <p className="text-[10px] text-[#888888]">Col-Start 9 (aspect-[4/4.2])</p>
          </div>
          <div className="p-2.5 bg-[#FFF8F5] border border-orange-200">
            <span className="font-mono font-bold text-[#E84511]">SLOT #03:</span>
            <p className="font-extrabold text-[#E84511] uppercase mt-0.5">Row 2 Full-Wide</p>
            <p className="text-[10px] text-[#888888]">Panoramic Banner (aspect-[21/9])</p>
          </div>
          <div className="p-2.5 bg-[#FBFBFB] border border-[#EAEAEA]">
            <span className="font-mono font-bold text-[#E84511]">SLOT #04:</span>
            <p className="font-extrabold text-[#111111] uppercase mt-0.5">Row 3 Left (4-Col)</p>
            <p className="text-[10px] text-[#888888]">Square Frame (aspect-square)</p>
          </div>
          <div className="p-2.5 bg-[#FBFBFB] border border-[#EAEAEA]">
            <span className="font-mono font-bold text-[#E84511]">SLOT #05:</span>
            <p className="font-extrabold text-[#111111] uppercase mt-0.5">Row 3 Right (6-Col)</p>
            <p className="text-[10px] text-[#888888]">Tall Frame (aspect-[4/4.5])</p>
          </div>
        </div>
      </div>

      {/* 2. PROJECT CARDS LIST */}
      <div className="space-y-6">
        {projects.map((project, idx) => {
          const isCollapsed = !!collapsedCards[project.id];
          const slotMeta = getSlotMetadata(idx);

          return (
            <div
              key={project.id || idx}
              className="bg-white border border-[#E2E2E2] shadow-sm transition-all duration-200 hover:border-[#111111]/30"
            >
              {/* CARD HEADER BAR */}
              <div className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAFAFA] border-b border-[#EAEAEA]">
                {/* Left: Sparkle + Slot Badge + Title + Category + Grid Slot Pill */}
                <div className="flex items-center gap-2.5 flex-wrap min-w-0">
                  <span className="text-[#E84511] font-bold select-none text-base">✦</span>
                  <span className="px-2.5 py-1 bg-[#111111] text-white text-xs font-mono font-extrabold tracking-wider">
                    #{String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm md:text-base font-extrabold uppercase tracking-tight text-[#111111] font-display truncate max-w-xs md:max-w-md">
                    {project.title || "UNTITLED PROJECT"}
                  </h3>
                  <span className="px-2.5 py-0.5 bg-[#F0F0F0] border border-[#E0E0E0] text-[#555555] text-[10px] font-bold uppercase tracking-wider rounded-sm font-mono">
                    {project.category || "/Full-Stack"}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full border ${slotMeta.colorClass}`}
                  >
                    {slotMeta.pill}
                  </span>
                </div>

                {/* Right Action Controls: External Link, Move Up, Move Down, Toggle, Delete */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-white border border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#111111] transition-colors cursor-pointer inline-flex items-center justify-center"
                      title="Open Live/GitHub Project URL"
                      aria-label={`Open link for ${project.title}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#E84511]" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => handleMoveProject(idx, "up")}
                    disabled={idx === 0}
                    className="p-1.5 bg-white border border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Move Project Up"
                    aria-label={`Move project ${project.title} up`}
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMoveProject(idx, "down")}
                    disabled={idx === projects.length - 1}
                    className="p-1.5 bg-white border border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Move Project Down"
                    aria-label={`Move project ${project.title} down`}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleCardCollapse(project.id)}
                    className="p-1.5 bg-white border border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#111111] transition-colors cursor-pointer"
                    title={isCollapsed ? "Expand Details" : "Collapse Details"}
                    aria-label={isCollapsed ? "Expand Details" : "Collapse Details"}
                  >
                    {isCollapsed ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronUp className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteProject(project.id)}
                    disabled={projects.length <= 1}
                    className="p-1.5 bg-white border border-red-200 hover:bg-red-50 text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title={
                      projects.length <= 1
                        ? "At least one project required"
                        : "Delete Project"
                    }
                    aria-label={`Delete project ${project.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* CARD BODY GRID (Collapsible) */}
              {!isCollapsed && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 border-t border-[#EAEAEA]">
                  {/* Left Column: Form Details & Frame Settings (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col gap-5">
                    {/* Project Title */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                        Project Title (Bold Uppercase)
                      </label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) =>
                          updateProject(project.id, { title: e.target.value.toUpperCase() })
                        }
                        placeholder="e.g. GADEX NEXUS"
                        className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold uppercase px-3.5 py-2.5 outline-none font-display text-[#111111] transition-colors"
                      />
                    </div>

                    {/* Category with Quick-Select Chips */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                        Project Category / Tagline
                      </label>
                      <input
                        type="text"
                        value={project.category}
                        onChange={(e) =>
                          updateProject(project.id, { category: e.target.value })
                        }
                        placeholder="/Full-Stack"
                        className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono font-semibold px-3.5 py-2 outline-none text-[#111111] transition-colors"
                      />

                      {/* Quick-Select Preset Chips */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] text-[#888888] font-medium mr-1">Presets:</span>
                        {PRESET_CATEGORIES.map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => updateProject(project.id, { category: preset })}
                            className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded transition-colors cursor-pointer ${
                              project.category === preset
                                ? "bg-[#111111] text-white"
                                : "bg-[#F0F0F0] text-[#555555] hover:bg-[#E2E2E2]"
                            }`}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Live / GitHub URL Input */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
                          <Github className="w-3.5 h-3.5 text-[#111111]" />
                          <span>Live Demo or GitHub Repository URL</span>
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            updateProject(project.id, {
                              link: "https://github.com/akanbisamuel045-tech",
                            })
                          }
                          className="text-[10px] text-[#E84511] font-bold hover:underline cursor-pointer"
                        >
                          Fill Samuel&apos;s GitHub
                        </button>
                      </div>
                      <input
                        type="text"
                        value={project.link}
                        onChange={(e) =>
                          updateProject(project.id, { link: e.target.value })
                        }
                        placeholder="https://github.com/akanbisamuel045-tech/project-repo"
                        className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono font-medium px-3.5 py-2 outline-none text-[#111111] transition-colors"
                      />
                    </div>

                    {/* Layout Frame Size Selector */}
                    <div className="space-y-2 pt-2 border-t border-[#F0F0F0]">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
                          <SlidersHorizontal className="w-3.5 h-3.5 text-[#E84511]" />
                          <span>Layout Frame Size & Editorial Proportion</span>
                        </label>
                        <span className="text-[10px] font-mono text-[#888888]">
                          Current: {project.layoutSize}
                        </span>
                      </div>

                      <select
                        value={project.layoutSize}
                        onChange={(e) =>
                          updateProject(project.id, {
                            layoutSize: e.target.value as ProjectItem["layoutSize"],
                          })
                        }
                        className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-bold px-3 py-2.5 outline-none text-[#111111] cursor-pointer"
                      >
                        {LAYOUT_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label} — {opt.description}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Right Column: Project Showcase Image Picker (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#EAEAEA] lg:pl-6 pt-4 lg:pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#E84511]" />
                          <span>Showcase Asset</span>
                        </span>
                        <span className="text-[10px] font-mono text-[#888888]">HIGH-RES DISPLAY</span>
                      </div>

                      <ImageUploaderModal
                        label="Project Showcase Image"
                        description="Ultra-crisp UI screenshot or 3D mock displayed in the editorial grid."
                        value={project.image}
                        onChange={(url) => updateProject(project.id, { image: url })}
                      />
                    </div>

                    <div className="mt-4 p-3 bg-[#F9F9F9] border border-[#EAEAEA] text-[11px] text-[#666666] leading-relaxed">
                      <p>
                        <strong className="text-[#111111]">Editorial Proportion:</strong> Slot #03 renders across all 12 columns in ultra-panoramic 21:9 ratio. For Slots #01, #02, #04, and #05, vertical or balanced 4:5 ratios preserve geometric balance.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

"use client";

import React from "react";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Award,
  Briefcase,
  ExternalLink,
  Sparkles,
  BookOpen,
  Calendar,
  Building2,
} from "lucide-react";
import {
  PortfolioData,
  AchievementItem,
  CareerItem,
} from "@/data/portfolioData";
import { ImageUploaderModal } from "@/components/admin/ImageUploaderModal";

export interface AboutCareerTabProps {
  draftData: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

export const AboutCareerTab: React.FC<AboutCareerTabProps> = ({
  draftData,
  onChange,
}) => {
  const { personalInfo, stats, achievements = [], career = [] } = draftData;

  // Personal Info & Philosophy updates
  const updatePersonalInfo = (updates: Partial<typeof personalInfo>) => {
    onChange({
      ...draftData,
      personalInfo: {
        ...personalInfo,
        ...updates,
      },
    });
  };

  const updatePhilosophy = (field: "black" | "gray", val: string) => {
    onChange({
      ...draftData,
      personalInfo: {
        ...personalInfo,
        philosophyHeadline: {
          ...personalInfo.philosophyHeadline,
          [field]: val,
        },
      },
    });
  };

  // Stats updates
  const updateStats = (updates: Partial<typeof stats>) => {
    onChange({
      ...draftData,
      stats: {
        ...stats,
        ...updates,
      },
    });
  };

  // Achievements CRUD
  const updateAchievement = (index: number, updates: Partial<AchievementItem>) => {
    const updated = [...achievements];
    updated[index] = { ...updated[index], ...updates };
    onChange({
      ...draftData,
      achievements: updated,
    });
  };

  const handleAddAchievement = () => {
    const newAward: AchievementItem = {
      title: "NEW ARCHITECTURAL HONORS",
      organization: "Software Engineering & Cloud",
      year: new Date().getFullYear().toString(),
    };
    onChange({
      ...draftData,
      achievements: [...achievements, newAward],
    });
  };

  const handleDeleteAchievement = (index: number) => {
    if (achievements.length <= 1) return; // Guard: keep at least 1 item
    const filtered = achievements.filter((_, i) => i !== index);
    onChange({
      ...draftData,
      achievements: filtered,
    });
  };

  const handleMoveAchievement = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= achievements.length) return;

    const updated = [...achievements];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    onChange({
      ...draftData,
      achievements: updated,
    });
  };

  // Career Timeline CRUD
  const updateCareer = (index: number, updates: Partial<CareerItem>) => {
    const updated = [...career];
    updated[index] = { ...updated[index], ...updates };
    onChange({
      ...draftData,
      career: updated,
    });
  };

  const handleAddCareer = () => {
    const newRole: CareerItem = {
      company: "NEW TECH ENTERPRISE_",
      period: `[ ${new Date().getFullYear()} - PRESENT ]`,
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=80",
    };
    onChange({
      ...draftData,
      career: [...career, newRole],
    });
  };

  const handleDeleteCareer = (index: number) => {
    if (career.length <= 1) return; // Guard: keep at least 1 role
    const filtered = career.filter((_, i) => i !== index);
    onChange({
      ...draftData,
      career: filtered,
    });
  };

  const handleMoveCareer = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= career.length) return;

    const updated = [...career];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    onChange({
      ...draftData,
      career: updated,
    });
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* ================================================================ */}
      {/* SECTION 1: ENGINEERING PHILOSOPHY & /ABOUT OUTLINE STATS */}
      {/* ================================================================ */}
      <div className="bg-white border border-[#E2E2E2] p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAEAEA]">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-[#111111] text-[#E84511]">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <h1 className="text-base font-extrabold uppercase tracking-wider text-[#111111] font-display">
                Engineering Philosophy &amp; /about Overview
              </h1>
              <p className="text-xs text-[#777777] mt-0.5">
                Powers the core narrative headlines, philosophy statements, and large outline metrics on the <code className="text-[#111111] font-mono">/about</code> page.
              </p>
            </div>
          </div>

          <a
            href="/about"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 bg-[#F6F6F6] hover:bg-[#EAEAEA] text-[#111111] text-[10px] font-extrabold uppercase tracking-wider transition-colors border border-[#E2E2E2] flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>VIEW /ABOUT PAGE</span>
            <ExternalLink className="w-3 h-3 text-[#E84511]" />
          </a>
        </div>

        {/* Philosophy Headlines */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                Philosophy Black Text Segment
              </label>
              <input
                type="text"
                value={personalInfo.philosophyHeadline.black}
                onChange={(e) => updatePhilosophy("black", e.target.value.toUpperCase())}
                placeholder="I FOCUS ON SCALABLE"
                className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-extrabold uppercase px-3.5 py-2 outline-none font-display text-[#111111]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                Philosophy Gray Accent Segment
              </label>
              <input
                type="text"
                value={personalInfo.philosophyHeadline.gray}
                onChange={(e) => updatePhilosophy("gray", e.target.value.toUpperCase())}
                placeholder="SYSTEMS THAT SCALE."
                className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-extrabold uppercase px-3.5 py-2 outline-none font-display text-[#777777]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                Philosophy Supporting Subtext
              </label>
              <textarea
                rows={3}
                value={personalInfo.philosophySubtext}
                onChange={(e) => updatePersonalInfo({ philosophySubtext: e.target.value })}
                placeholder="With deep full-stack engineering expertise..."
                className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-medium px-3.5 py-2.5 outline-none text-[#111111] leading-relaxed resize-y"
              />
            </div>
          </div>

          {/* Synchronized 3 Large Outline Stats */}
          <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-[#EAEAEA] lg:pl-6 pt-4 lg:pt-0 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111] block">
              3 Large /about Outline Number Metrics
            </span>

            <div className="space-y-3">
              {/* Projects Completed */}
              <div className="p-3 bg-[#FAFAFA] border border-[#E2E2E2] flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase text-[#666666]">
                  Projects Completed:
                </span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={stats.projectsCompleted}
                    onChange={(e) =>
                      updateStats({ projectsCompleted: Number(e.target.value) || 0 })
                    }
                    className="w-16 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-xs font-bold px-2 py-1 text-center"
                  />
                  <input
                    type="text"
                    value={stats.projectsSuffix}
                    onChange={(e) => updateStats({ projectsSuffix: e.target.value })}
                    className="w-10 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-xs font-bold px-1.5 py-1 text-center"
                  />
                </div>
              </div>

              {/* Years Experience */}
              <div className="p-3 bg-[#FAFAFA] border border-[#E2E2E2] flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase text-[#666666]">
                  Years Experience:
                </span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={stats.yearsExperience}
                    onChange={(e) =>
                      updateStats({ yearsExperience: Number(e.target.value) || 0 })
                    }
                    className="w-16 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-xs font-bold px-2 py-1 text-center"
                  />
                  <input
                    type="text"
                    value={stats.yearsSuffix}
                    onChange={(e) => updateStats({ yearsSuffix: e.target.value })}
                    className="w-10 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-xs font-bold px-1.5 py-1 text-center"
                  />
                </div>
              </div>

              {/* Global Clients */}
              <div className="p-3 bg-[#FAFAFA] border border-[#E2E2E2] flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase text-[#666666]">
                  Global Clients:
                </span>
                <input
                  type="number"
                  value={stats.globalClients}
                  onChange={(e) =>
                    updateStats({ globalClients: Number(e.target.value) || 0 })
                  }
                  className="w-20 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-xs font-bold px-2 py-1 text-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* SECTION 2: HONORS & ACHIEVEMENTS 2x2 DARK GRID CRUD */}
      {/* ================================================================ */}
      <div className="space-y-6">
        <div className="bg-white border border-[#E2E2E2] p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 bg-[#111111] text-[#E84511]">
                  <Award className="w-4 h-4" />
                </span>
                <h2 className="text-base font-extrabold uppercase tracking-wider text-[#111111] font-display">
                  Honors &amp; Achievements 2x2 Grid Manager
                </h2>
                <span className="px-2.5 py-0.5 bg-[#111111] text-white text-[11px] font-mono font-bold">
                  {achievements.length} AWARDS
                </span>
              </div>
              <p className="text-xs text-[#666666] leading-relaxed max-w-2xl">
                Displays the 4 matte dark architectural award cards with orange geometric symbols on the <code className="text-[#111111] font-mono">/about</code> page.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddAchievement}
              className="bg-[#E84511] hover:bg-[#D63B0B] text-white text-xs font-extrabold uppercase tracking-wider px-4 py-2.5 flex items-center gap-2 transition-colors cursor-pointer shadow-sm active:scale-95 self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>+ ADD ACHIEVEMENT</span>
            </button>
          </div>
        </div>

        {/* 2-Column Grid of Achievement Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E2E2] shadow-sm transition-all duration-200 hover:border-[#111111]/30 flex flex-col justify-between"
            >
              {/* Header Bar */}
              <div className="p-4 md:p-5 flex items-center justify-between gap-3 bg-[#FAFAFA] border-b border-[#EAEAEA]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-[#E84511] font-bold text-sm">✦</span>
                  <span className="px-2 py-0.5 bg-[#111111] text-white text-xs font-mono font-extrabold tracking-wider">
                    #{String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-extrabold uppercase tracking-tight text-[#111111] font-display truncate">
                    {item.title || "UNTITLED ACHIEVEMENT"}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleMoveAchievement(idx, "up")}
                    disabled={idx === 0}
                    className="p-1.5 bg-white border border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Move Achievement Up"
                    aria-label={`Move achievement ${item.title} up`}
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMoveAchievement(idx, "down")}
                    disabled={idx === achievements.length - 1}
                    className="p-1.5 bg-white border border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Move Achievement Down"
                    aria-label={`Move achievement ${item.title} down`}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteAchievement(idx)}
                    disabled={achievements.length <= 1}
                    className="p-1.5 bg-white border border-red-200 hover:bg-red-50 text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title={
                      achievements.length <= 1
                        ? "At least one achievement required"
                        : "Delete Achievement"
                    }
                    aria-label={`Delete achievement ${item.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Body Inputs */}
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                    Achievement Title (Bold Uppercase)
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      updateAchievement(idx, { title: e.target.value.toUpperCase() })
                    }
                    placeholder="FULL-STACK ARCHITECTURE EXCELLENCE"
                    className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-extrabold uppercase px-3 py-2 outline-none font-display text-[#111111]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                      Issuing Organization
                    </label>
                    <input
                      type="text"
                      value={item.organization}
                      onChange={(e) =>
                        updateAchievement(idx, { organization: e.target.value })
                      }
                      placeholder="Gadex Engineering"
                      className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-medium px-3 py-2 outline-none text-[#111111]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                      Year
                    </label>
                    <input
                      type="text"
                      value={item.year}
                      onChange={(e) => updateAchievement(idx, { year: e.target.value })}
                      placeholder="2026"
                      className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono font-bold px-3 py-2 outline-none text-[#111111]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* SECTION 3: CAREER JOURNEY TIMELINE CRUD */}
      {/* ================================================================ */}
      <div className="space-y-6">
        <div className="bg-white border border-[#E2E2E2] p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 bg-[#111111] text-[#E84511]">
                  <Briefcase className="w-4 h-4" />
                </span>
                <h2 className="text-base font-extrabold uppercase tracking-wider text-[#111111] font-display">
                  Career Journey Timeline &amp; Workspaces
                </h2>
                <span className="px-2.5 py-0.5 bg-[#111111] text-white text-[11px] font-mono font-bold">
                  {career.length} ROLES
                </span>
              </div>
              <p className="text-xs text-[#666666] leading-relaxed max-w-2xl">
                Controls the 2 large architectural role frames with period badges and workspace photographs at the bottom of <code className="text-[#111111] font-mono">/about</code>.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddCareer}
              className="bg-[#E84511] hover:bg-[#D63B0B] text-white text-xs font-extrabold uppercase tracking-wider px-4 py-2.5 flex items-center gap-2 transition-colors cursor-pointer shadow-sm active:scale-95 self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>+ ADD CAREER MILESTONE</span>
            </button>
          </div>
        </div>

        {/* 2-Column Grid of Career Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {career.map((role, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E2E2] shadow-sm transition-all duration-200 hover:border-[#111111]/30 flex flex-col justify-between"
            >
              {/* Header Bar */}
              <div className="p-4 md:p-5 flex items-center justify-between gap-3 bg-[#FAFAFA] border-b border-[#EAEAEA]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="px-2 py-0.5 bg-[#111111] text-white text-xs font-mono font-extrabold tracking-wider">
                    #{String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-extrabold uppercase tracking-tight text-[#111111] font-display truncate">
                    {role.company || "UNTITLED MILESTONE"}
                  </h3>
                  <span className="px-2 py-0.5 bg-stone-100 border border-stone-200 text-[#555555] text-[10px] font-mono font-bold">
                    {role.period}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleMoveCareer(idx, "up")}
                    disabled={idx === 0}
                    className="p-1.5 bg-white border border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Move Role Up"
                    aria-label={`Move role ${role.company} up`}
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMoveCareer(idx, "down")}
                    disabled={idx === career.length - 1}
                    className="p-1.5 bg-white border border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Move Role Down"
                    aria-label={`Move role ${role.company} down`}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteCareer(idx)}
                    disabled={career.length <= 1}
                    className="p-1.5 bg-white border border-red-200 hover:bg-red-50 text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title={
                      career.length <= 1
                        ? "At least one role required"
                        : "Delete Role"
                    }
                    aria-label={`Delete role ${role.company}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Body Inputs */}
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#E84511]" />
                      <span>Company / Role Label</span>
                    </label>
                    <input
                      type="text"
                      value={role.company}
                      onChange={(e) =>
                        updateCareer(idx, { company: e.target.value.toUpperCase() })
                      }
                      placeholder="GADEX ENGINEERING_"
                      className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-extrabold uppercase px-3 py-2 outline-none font-display text-[#111111]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#E84511]" />
                      <span>Timeline Period Badge</span>
                    </label>
                    <input
                      type="text"
                      value={role.period}
                      onChange={(e) =>
                        updateCareer(idx, { period: e.target.value.toUpperCase() })
                      }
                      placeholder="[ 2024 - PRESENT ]"
                      className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono font-bold px-3 py-2 outline-none text-[#111111]"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#F0F0F0]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#E84511]" />
                      <span>Career Workspace Image (16:10)</span>
                    </span>
                  </div>

                  <ImageUploaderModal
                    label="Career Workspace Image (16:10)"
                    description="Office environment or workspace snapshot representing this career phase."
                    value={role.image}
                    onChange={(url) => updateCareer(idx, { image: url })}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

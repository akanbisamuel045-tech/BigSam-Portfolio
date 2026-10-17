"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Building2,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { PortfolioData, PortfolioStats } from "@/data/portfolioData";

export interface StatsClientsTabProps {
  draftData: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

export const StatsClientsTab: React.FC<StatsClientsTabProps> = ({
  draftData,
  onChange,
}) => {
  const { stats, clientLogos } = draftData;
  const [newBrandName, setNewBrandName] = useState("");

  const updateStats = (updates: Partial<PortfolioStats>) => {
    onChange({
      ...draftData,
      stats: {
        ...stats,
        ...updates,
      },
    });
  };

  const handleAddBrand = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newBrandName.trim()) return;

    const updated = [...(clientLogos || []), newBrandName.trim()];
    onChange({
      ...draftData,
      clientLogos: updated,
    });
    setNewBrandName("");
  };

  const handleUpdateBrand = (index: number, newName: string) => {
    const updated = [...(clientLogos || [])];
    updated[index] = newName;
    onChange({
      ...draftData,
      clientLogos: updated,
    });
  };

  const handleMoveBrand = (index: number, direction: "up" | "down") => {
    const updated = [...(clientLogos || [])];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= updated.length) return;

    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    onChange({
      ...draftData,
      clientLogos: updated,
    });
  };

  const handleDeleteBrand = (index: number) => {
    const updated = (clientLogos || []).filter((_, i) => i !== index);
    onChange({
      ...draftData,
      clientLogos: updated,
    });
  };

  return (
    <div className="space-y-8 select-none">
      {/* Tab Header */}
      <div>
        <h1 className="text-2xl font-extrabold uppercase tracking-tight text-[#111111] font-display">
          Stats & Brand Marquee Configuration
        </h1>
        <p className="text-xs text-[#8E8E8E] mt-1">
          Tune high-impact numbers, client satisfaction ratings, and trusted collaborator brand marquee logos.
        </p>
      </div>

      {/* Card 1: Live Stat Counters */}
      <div className="bg-white border border-[#E2E2E2] p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#E2E2E2]">
          <BarChart3 className="w-4 h-4 text-[#E84511]" />
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#111111]">
            1. Core Quantitative Impact Metrics
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Projects Completed */}
          <div className="p-4 bg-[#F6F6F6] border border-[#E2E2E2] space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block">
              Projects Completed
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={stats?.projectsCompleted ?? 0}
                onChange={(e) =>
                  updateStats({ projectsCompleted: Number(e.target.value) || 0 })
                }
                className="w-24 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold px-3 py-2 outline-none font-mono"
              />
              <input
                type="text"
                placeholder="Suffix (e.g. +)"
                value={stats?.projectsSuffix ?? "+"}
                onChange={(e) => updateStats({ projectsSuffix: e.target.value })}
                className="w-16 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold px-3 py-2 outline-none text-center font-mono"
              />
            </div>
            <div className="text-[10px] text-[#8E8E8E] font-medium">
              Renders as: <span className="text-[#111111] font-bold font-mono">{stats?.projectsCompleted}{stats?.projectsSuffix}</span>
            </div>
          </div>

          {/* Happy Clients */}
          <div className="p-4 bg-[#F6F6F6] border border-[#E2E2E2] space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block">
              Happy Clients
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={stats?.happyClients ?? 0}
                onChange={(e) =>
                  updateStats({ happyClients: Number(e.target.value) || 0 })
                }
                className="w-24 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold px-3 py-2 outline-none font-mono"
              />
              <input
                type="text"
                placeholder="Suffix (e.g. +)"
                value={stats?.happyClientsSuffix ?? "+"}
                onChange={(e) => updateStats({ happyClientsSuffix: e.target.value })}
                className="w-16 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold px-3 py-2 outline-none text-center font-mono"
              />
            </div>
            <div className="text-[10px] text-[#8E8E8E] font-medium">
              Renders as: <span className="text-[#111111] font-bold font-mono">{stats?.happyClients}{stats?.happyClientsSuffix}</span>
            </div>
          </div>

          {/* Years of Experience */}
          <div className="p-4 bg-[#F6F6F6] border border-[#E2E2E2] space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block">
              Years Experience
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={stats?.yearsExperience ?? 0}
                onChange={(e) =>
                  updateStats({ yearsExperience: Number(e.target.value) || 0 })
                }
                className="w-24 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold px-3 py-2 outline-none font-mono"
              />
              <input
                type="text"
                placeholder="Suffix (e.g. +)"
                value={stats?.yearsSuffix ?? "+"}
                onChange={(e) => updateStats({ yearsSuffix: e.target.value })}
                className="w-16 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold px-3 py-2 outline-none text-center font-mono"
              />
            </div>
            <div className="text-[10px] text-[#8E8E8E] font-medium">
              Renders as: <span className="text-[#111111] font-bold font-mono">{stats?.yearsExperience}{stats?.yearsSuffix}</span>
            </div>
          </div>

          {/* Client Satisfaction */}
          <div className="p-4 bg-[#F6F6F6] border border-[#E2E2E2] space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block">
              Client Satisfaction
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={stats?.clientSatisfaction ?? 0}
                onChange={(e) =>
                  updateStats({ clientSatisfaction: Number(e.target.value) || 0 })
                }
                className="w-24 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold px-3 py-2 outline-none font-mono"
              />
              <input
                type="text"
                placeholder="Suffix (e.g. %)"
                value={stats?.satisfactionSuffix ?? "%"}
                onChange={(e) => updateStats({ satisfactionSuffix: e.target.value })}
                className="w-16 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold px-3 py-2 outline-none text-center font-mono"
              />
            </div>
            <div className="text-[10px] text-[#8E8E8E] font-medium">
              Renders as: <span className="text-[#111111] font-bold font-mono">{stats?.clientSatisfaction}{stats?.satisfactionSuffix}</span>
            </div>
          </div>

          {/* Global Clients */}
          <div className="p-4 bg-[#F6F6F6] border border-[#E2E2E2] space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block">
              Global Clients
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={stats?.globalClients ?? 0}
                onChange={(e) =>
                  updateStats({ globalClients: Number(e.target.value) || 0 })
                }
                className="w-24 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold px-3 py-2 outline-none font-mono"
              />
            </div>
            <div className="text-[10px] text-[#8E8E8E] font-medium">
              International accounts and global stakeholders
            </div>
          </div>

          {/* Trust Badge Count Text */}
          <div className="p-4 bg-[#F6F6F6] border border-[#E2E2E2] space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block">
              Trust Badge Summary Text
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={stats?.trustBadgeCount ?? ""}
                onChange={(e) => updateStats({ trustBadgeCount: e.target.value })}
                className="w-full bg-white border border-[#E2E2E2] focus:border-[#E84511] text-xs font-semibold px-3 py-2 outline-none"
              />
            </div>
            <div className="text-[10px] text-[#8E8E8E] font-medium">
              Displayed alongside 5-star rating on /about
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Client Brand Marquee Logos */}
      <div className="bg-white border border-[#E2E2E2] p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E2E2] gap-3">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-[#E84511]" />
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#111111]">
              2. Trusted Collaborator Brand Marquee Logos
            </h2>
            <span className="px-2 py-0.5 bg-[#E84511]/10 text-[#E84511] text-[10px] font-extrabold rounded font-mono ml-2">
              {clientLogos?.length || 0} Brands
            </span>
          </div>

          <div className="text-[11px] text-[#8E8E8E]">
            Updates both Home Marquee and About Checkerboard Grid
          </div>
        </div>

        {/* Add Brand Form */}
        <form onSubmit={handleAddBrand} className="flex gap-2">
          <input
            type="text"
            placeholder="Add new client or brand name (e.g. Gadex Cloud AI)..."
            value={newBrandName}
            onChange={(e) => setNewBrandName(e.target.value)}
            className="flex-1 bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-semibold px-4 py-2.5 outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!newBrandName.trim()}
            className="px-5 py-2.5 bg-[#111111] hover:bg-[#E84511] text-white text-xs font-extrabold uppercase tracking-wider transition-colors disabled:opacity-40 cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ADD BRAND</span>
          </button>
        </form>

        {/* Brands List with Reorder and Delete */}
        <div className="space-y-2 pt-2">
          {clientLogos?.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-[#F6F6F6] border border-[#E2E2E2] hover:border-[#111111] transition-colors gap-3"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-[10px] font-mono font-bold text-[#8E8E8E] w-6 shrink-0">
                  #{String(index + 1).padStart(2, "0")}
                </span>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => handleUpdateBrand(index, e.target.value)}
                  className="w-full bg-white border border-[#E2E2E2] focus:border-[#E84511] text-xs font-extrabold uppercase tracking-tight px-3 py-1.5 outline-none text-[#111111]"
                />
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleMoveBrand(index, "up")}
                  disabled={index === 0}
                  className="p-1.5 text-[#8E8E8E] hover:text-[#111111] hover:bg-black/5 disabled:opacity-25 transition-colors cursor-pointer"
                  title="Move brand up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleMoveBrand(index, "down")}
                  disabled={index === (clientLogos?.length || 0) - 1}
                  className="p-1.5 text-[#8E8E8E] hover:text-[#111111] hover:bg-black/5 disabled:opacity-25 transition-colors cursor-pointer"
                  title="Move brand down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteBrand(index)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer ml-1"
                  title="Delete brand"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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
  Layers,
  Sparkles,
  Tag,
  X,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { PortfolioData, ServiceItem } from "@/data/portfolioData";
import { ImageUploaderModal } from "@/components/admin/ImageUploaderModal";

export interface ServicesEditorTabProps {
  draftData: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

export const ServicesEditorTab: React.FC<ServicesEditorTabProps> = ({
  draftData,
  onChange,
}) => {
  const { services = [] } = draftData;

  // Track collapsed/expanded state for each card by ID (default all open)
  const [collapsedCards, setCollapsedCards] = useState<Record<string, boolean>>({});
  // Track new tag inputs per service ID
  const [newTagInputs, setNewTagInputs] = useState<Record<string, string>>({});

  // Helper: Normalize index for all services to "001", "002", etc.
  const normalizeServices = (items: ServiceItem[]): ServiceItem[] => {
    return items.map((item, idx) => ({
      ...item,
      index: String(idx + 1).padStart(3, "0"),
    }));
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    const updated = services.map((s) => (s.id === id ? { ...s, ...updates } : s));
    onChange({
      ...draftData,
      services: updated,
    });
  };

  const handleAddNewService = () => {
    const newIdx = services.length + 1;
    const formattedIndex = String(newIdx).padStart(3, "0");
    const newService: ServiceItem = {
      id: `service-${Date.now()}`,
      index: formattedIndex,
      title: "NEW SERVICE OFFERING",
      description:
        "Architecting scalable web systems, modern user experiences, and high-performance cloud solutions.",
      tags: ["System Architecture", "Next.js", "Cloud Infrastructure"],
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&auto=format&fit=crop&q=80",
      link: "/contact",
    };

    const updated = normalizeServices([...services, newService]);
    onChange({
      ...draftData,
      services: updated,
    });

    // Ensure newly created card is expanded
    setCollapsedCards((prev) => ({ ...prev, [newService.id]: false }));
  };

  const handleDeleteService = (id: string) => {
    if (services.length <= 1) return; // Guard: at least 1 service must remain
    const filtered = services.filter((s) => s.id !== id);
    const updated = normalizeServices(filtered);
    onChange({
      ...draftData,
      services: updated,
    });
  };

  const handleMoveService = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= services.length) return;

    const updated = [...services];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const normalized = normalizeServices(updated);
    onChange({
      ...draftData,
      services: normalized,
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
    services.forEach((s) => {
      allCollapsed[s.id] = true;
    });
    setCollapsedCards(allCollapsed);
  };

  // Skill pill tag management per service
  const handleAddTag = (serviceId: string) => {
    const tagText = (newTagInputs[serviceId] || "").trim();
    if (!tagText) return;

    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    const existingTags = service.tags || [];
    if (existingTags.includes(tagText)) {
      setNewTagInputs((prev) => ({ ...prev, [serviceId]: "" }));
      return;
    }

    const updatedTags = [...existingTags, tagText];
    updateService(serviceId, { tags: updatedTags });
    setNewTagInputs((prev) => ({ ...prev, [serviceId]: "" }));
  };

  const handleRemoveTag = (serviceId: string, tagIdx: number) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    const updatedTags = (service.tags || []).filter((_, i) => i !== tagIdx);
    updateService(serviceId, { tags: updatedTags });
  };

  const handleUpdateTag = (serviceId: string, tagIdx: number, newTagVal: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    const updatedTags = [...(service.tags || [])];
    updatedTags[tagIdx] = newTagVal;
    updateService(serviceId, { tags: updatedTags });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. TOP TOOLBAR & OVERVIEW BAR */}
      <div className="bg-white border border-[#E2E2E2] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-[#111111] text-[#E84511]">
                <Layers className="w-4 h-4" />
              </span>
              <h1 className="text-base font-extrabold uppercase tracking-wider text-[#111111] font-display">
                Services Architecture & Offerings Editor
              </h1>
              <span className="px-2.5 py-0.5 bg-[#111111] text-white text-[11px] font-mono font-bold">
                {services.length} ACTIVE
              </span>
            </div>
            <p className="text-xs text-[#666666] leading-relaxed max-w-2xl">
              Services <strong className="text-[#111111] font-mono">001–004</strong> are featured on the Home page preview grid. All{" "}
              <strong className="text-[#111111] font-mono">{services.length} services</strong> are dynamically rendered in full detail on the{" "}
              <a
                href="/services"
                target="_blank"
                rel="noreferrer"
                className="text-[#E84511] font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>/services</span>
                <ExternalLink className="w-3 h-3 inline" />
              </a>{" "}
              page. Reordering cards automatically normalizes index badges.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={handleExpandAll}
              className="px-3 py-2 bg-[#F6F6F6] hover:bg-[#EAEAEA] text-[#666666] hover:text-[#111111] text-[11px] font-bold uppercase tracking-wider transition-colors border border-[#E2E2E2] flex items-center gap-1.5 cursor-pointer"
              title="Expand all service cards"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">EXPAND ALL</span>
            </button>
            <button
              type="button"
              onClick={handleCollapseAll}
              className="px-3 py-2 bg-[#F6F6F6] hover:bg-[#EAEAEA] text-[#666666] hover:text-[#111111] text-[11px] font-bold uppercase tracking-wider transition-colors border border-[#E2E2E2] flex items-center gap-1.5 cursor-pointer"
              title="Collapse all service cards"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">COLLAPSE ALL</span>
            </button>
            <button
              type="button"
              onClick={handleAddNewService}
              className="bg-[#E84511] hover:bg-[#D63B0B] text-white text-xs font-extrabold uppercase tracking-wider px-4 py-2.5 flex items-center gap-2 transition-colors cursor-pointer shadow-sm active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ ADD NEW SERVICE</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. SERVICES LIST CONTAINER */}
      <div className="space-y-6">
        {services.map((service, idx) => {
          const isCollapsed = !!collapsedCards[service.id];
          const isHomeFeatured = idx < 4;

          return (
            <div
              key={service.id || idx}
              className="bg-white border border-[#E2E2E2] shadow-sm transition-all duration-200 hover:border-[#111111]/30"
            >
              {/* CARD HEADER BAR */}
              <div className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAFAFA] border-b border-[#EAEAEA]">
                {/* Left: Sparkle + Index Badge + Title + Visibility Pill */}
                <div className="flex items-center gap-3 flex-wrap min-w-0">
                  <span className="text-[#E84511] font-bold select-none text-base">✦</span>
                  <span className="px-2.5 py-1 bg-[#111111] text-white text-xs font-mono font-extrabold tracking-wider">
                    {service.index || String(idx + 1).padStart(3, "0")}
                  </span>
                  <h3 className="text-sm md:text-base font-extrabold uppercase tracking-tight text-[#111111] font-display truncate max-w-xs md:max-w-md">
                    {service.title || "UNTITLED SERVICE"}
                  </h3>
                  {isHomeFeatured ? (
                    <span className="px-2.5 py-0.5 bg-orange-50 border border-orange-200 text-[#E84511] text-[10px] font-extrabold uppercase tracking-wider rounded-full">
                      HOME + /SERVICES
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 bg-stone-100 border border-stone-200 text-[#888888] text-[10px] font-bold uppercase tracking-wider rounded-full">
                      /SERVICES ONLY
                    </span>
                  )}
                </div>

                {/* Right Action Controls: Move Up, Move Down, Expand/Collapse, Delete */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => handleMoveService(idx, "up")}
                    disabled={idx === 0}
                    className="p-1.5 bg-white border border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Move Service Up"
                    aria-label={`Move service ${service.title} up`}
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMoveService(idx, "down")}
                    disabled={idx === services.length - 1}
                    className="p-1.5 bg-white border border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="Move Service Down"
                    aria-label={`Move service ${service.title} down`}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleCardCollapse(service.id)}
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
                    onClick={() => handleDeleteService(service.id)}
                    disabled={services.length <= 1}
                    className="p-1.5 bg-white border border-red-200 hover:bg-red-50 text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title={
                      services.length <= 1
                        ? "At least one service required"
                        : "Delete Service"
                    }
                    aria-label={`Delete service ${service.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* CARD BODY GRID (Collapsible) */}
              {!isCollapsed && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 border-t border-[#EAEAEA]">
                  {/* Left Column: Form Details & Skill Pills (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col gap-5">
                    {/* Service Title */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                        Service Title (Uppercase Display)
                      </label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) =>
                          updateService(service.id, { title: e.target.value.toUpperCase() })
                        }
                        placeholder="e.g. FULL-STACK DEVELOPMENT"
                        className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold uppercase px-3.5 py-2.5 outline-none font-display text-[#111111] transition-colors"
                      />
                    </div>

                    {/* Service Description */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                        Service Architectural Description
                      </label>
                      <textarea
                        rows={3}
                        value={service.description}
                        onChange={(e) =>
                          updateService(service.id, { description: e.target.value })
                        }
                        placeholder="Detailed technical description of this service offering..."
                        className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-medium px-3.5 py-2.5 outline-none text-[#111111] leading-relaxed transition-colors resize-y"
                      />
                    </div>

                    {/* CTA Target Link */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                        CTA Target Link (e.g. /contact or WhatsApp URL)
                      </label>
                      <input
                        type="text"
                        value={service.link}
                        onChange={(e) =>
                          updateService(service.id, { link: e.target.value })
                        }
                        placeholder="/contact"
                        className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono font-medium px-3.5 py-2 outline-none text-[#111111] transition-colors"
                      />
                    </div>

                    {/* Interactive Skill Pill Tags Manager */}
                    <div className="space-y-2 pt-2 border-t border-[#F0F0F0]">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-[#E84511]" />
                          <span>Skill & Technology Pills ({service.tags?.length || 0})</span>
                        </label>
                        <span className="text-[10px] text-[#888888]">
                          Click pill text to edit, × to remove
                        </span>
                      </div>

                      {/* Pill Tags List */}
                      <div className="flex flex-wrap items-center gap-2 p-3 bg-[#FAFAFA] border border-[#EAEAEA] min-h-[48px]">
                        {service.tags && service.tags.length > 0 ? (
                          service.tags.map((tag, tagIdx) => (
                            <div
                              key={tagIdx}
                              className="px-3 py-1.5 rounded-full bg-[#F0F0F0] hover:bg-[#EAEAEA] text-xs font-bold flex items-center gap-2 border border-[#E0E0E0] text-[#111111] transition-colors group"
                            >
                              <input
                                type="text"
                                value={tag}
                                onChange={(e) =>
                                  handleUpdateTag(service.id, tagIdx, e.target.value)
                                }
                                className="bg-transparent border-none outline-none text-xs font-bold text-[#111111] w-auto max-w-[150px]"
                                aria-label={`Edit tag ${tag}`}
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveTag(service.id, tagIdx)}
                                className="text-[#888888] hover:text-red-600 transition-colors cursor-pointer"
                                title={`Remove ${tag}`}
                                aria-label={`Remove tag ${tag}`}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))
                        ) : (
                          <span className="text-xs text-[#999999] italic">
                            No skill tags added yet. Add tags below.
                          </span>
                        )}
                      </div>

                      {/* Add Tag Input Bar */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="e.g. GraphQL Federation, Redis Caching, Next.js 15"
                          value={newTagInputs[service.id] || ""}
                          onChange={(e) =>
                            setNewTagInputs((prev) => ({
                              ...prev,
                              [service.id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddTag(service.id);
                            }
                          }}
                          className="flex-1 bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-semibold px-3 py-2 outline-none text-[#111111]"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddTag(service.id)}
                          className="px-3.5 py-2 bg-[#111111] hover:bg-[#E84511] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
                        >
                          <Plus className="w-3 h-3" />
                          <span>+ ADD TAG</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Service Preview Image Picker (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#EAEAEA] lg:pl-6 pt-4 lg:pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#E84511]" />
                          <span>Service Visual Preview</span>
                        </span>
                        <span className="text-[10px] font-mono text-[#888888]">16:10 RATIO</span>
                      </div>

                      <ImageUploaderModal
                        label="Service Preview Image (16:10)"
                        description="Cover visual displayed on hover in /services and Home services grid."
                        value={service.image}
                        onChange={(url) => updateService(service.id, { image: url })}
                      />
                    </div>

                    <div className="mt-4 p-3 bg-[#F9F9F9] border border-[#EAEAEA] text-[11px] text-[#666666] leading-relaxed">
                      <p>
                        <strong className="text-[#111111]">Architectural Tip:</strong> High-resolution landscape images (1600×1000px) with clean code editor or server hardware themes provide the strongest visual impact across both desktop & mobile viewpoints.
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

"use client";

import React, { useState } from "react";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  DollarSign,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Star,
  X,
  Calendar,
  RotateCcw,
  Code2,
} from "lucide-react";
import { PortfolioData, PricingTier, TestimonialItem } from "@/data/portfolioData";
import { ImageUploaderModal } from "@/components/admin/ImageUploaderModal";

export interface PricingReviewsTabProps {
  draftData: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

export const PricingReviewsTab: React.FC<PricingReviewsTabProps> = ({
  draftData,
  onChange,
}) => {
  const { pricing, testimonials = [] } = draftData;
  const { projectBased, monthly } = pricing;

  // New feature inputs per tier
  const [newFeatureInputs, setNewFeatureInputs] = useState<{
    projectBased: string;
    monthly: string;
  }>({
    projectBased: "",
    monthly: "",
  });

  // Active pricing plan tab view
  const [activeTierTab, setActiveTierTab] = useState<"both" | "projectBased" | "monthly">("both");

  // Helper: Update pricing tier
  const updateTier = (
    tierKey: "projectBased" | "monthly",
    updates: Partial<PricingTier>
  ) => {
    onChange({
      ...draftData,
      pricing: {
        ...draftData.pricing,
        [tierKey]: {
          ...draftData.pricing[tierKey],
          ...updates,
        },
      },
    });
  };

  // Feature deliverables management
  const handleAddFeature = (tierKey: "projectBased" | "monthly") => {
    const text = (newFeatureInputs[tierKey] || "").trim();
    if (!text) return;

    const currentFeatures = draftData.pricing[tierKey].features || [];
    updateTier(tierKey, { features: [...currentFeatures, text] });
    setNewFeatureInputs((prev) => ({ ...prev, [tierKey]: "" }));
  };

  const handleRemoveFeature = (
    tierKey: "projectBased" | "monthly",
    featIdx: number
  ) => {
    const currentFeatures = draftData.pricing[tierKey].features || [];
    updateTier(tierKey, {
      features: currentFeatures.filter((_, i) => i !== featIdx),
    });
  };

  const handleMoveFeature = (
    tierKey: "projectBased" | "monthly",
    featIdx: number,
    direction: "up" | "down"
  ) => {
    const currentFeatures = [...(draftData.pricing[tierKey].features || [])];
    const targetIdx = direction === "up" ? featIdx - 1 : featIdx + 1;
    if (targetIdx < 0 || targetIdx >= currentFeatures.length) return;

    const temp = currentFeatures[featIdx];
    currentFeatures[featIdx] = currentFeatures[targetIdx];
    currentFeatures[targetIdx] = temp;

    updateTier(tierKey, { features: currentFeatures });
  };

  const handleUpdateFeature = (
    tierKey: "projectBased" | "monthly",
    featIdx: number,
    val: string
  ) => {
    const currentFeatures = [...(draftData.pricing[tierKey].features || [])];
    currentFeatures[featIdx] = val;
    updateTier(tierKey, { features: currentFeatures });
  };

  // Testimonials management
  const updateTestimonial = (
    index: number,
    updates: Partial<TestimonialItem>
  ) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], ...updates };
    onChange({
      ...draftData,
      testimonials: updated,
    });
  };

  const handleAddTestimonial = () => {
    const newReview: TestimonialItem = {
      id: `t-${Date.now()}`,
      name: "Alex Johnson",
      role: "Founder & CEO",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      rating: 5,
      quote:
        "BigSam delivered an exceptional full-stack platform with clean code, incredible speed, and thoughtful architecture. Outstanding partner to work with.",
    };

    onChange({
      ...draftData,
      testimonials: [...testimonials, newReview],
    });
  };

  const handleDeleteTestimonial = (index: number) => {
    if (testimonials.length <= 1) return; // Guard: at least 1 testimonial required
    const filtered = testimonials.filter((_, i) => i !== index);
    onChange({
      ...draftData,
      testimonials: filtered,
    });
  };

  const handleMoveTestimonial = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= testimonials.length) return;

    const updated = [...testimonials];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    onChange({
      ...draftData,
      testimonials: updated,
    });
  };

  const renderTierCard = (
    tierKey: "projectBased" | "monthly",
    tier: PricingTier,
    accentTitle: string
  ) => {
    return (
      <div className="bg-white border border-[#E2E2E2] shadow-sm flex flex-col justify-between transition-all duration-200 hover:border-[#111111]/30">
        {/* Card Header Bar */}
        <div className="p-4 md:p-5 flex items-center justify-between gap-3 bg-[#FAFAFA] border-b border-[#EAEAEA]">
          <div className="flex items-center gap-2.5">
            <span className="p-1 bg-[#111111] text-[#E84511] rounded-sm">
              <DollarSign className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-mono font-extrabold uppercase px-2 py-0.5 bg-[#111111] text-white">
              {accentTitle}
            </span>
            <h3 className="text-sm font-extrabold uppercase tracking-tight text-[#111111] font-display truncate">
              {tier.packageTitle}
            </h3>
          </div>
          <span className="px-2.5 py-0.5 bg-orange-50 border border-orange-200 text-[#E84511] text-[10px] font-extrabold uppercase tracking-wider rounded-full font-mono">
            {tier.badge}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Package Title & Price Badge Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                Package Title
              </label>
              <input
                type="text"
                value={tier.packageTitle}
                onChange={(e) =>
                  updateTier(tierKey, { packageTitle: e.target.value.toUpperCase() })
                }
                placeholder="COMPLETE MVP PACKAGE"
                className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-extrabold uppercase px-3 py-2 outline-none font-display text-[#111111]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                Pricing Badge Label
              </label>
              <input
                type="text"
                value={tier.badge}
                onChange={(e) =>
                  updateTier(tierKey, { badge: e.target.value.toUpperCase() })
                }
                placeholder="ONE-TIME PAYMENT"
                className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono font-bold uppercase px-3 py-2 outline-none text-[#111111]"
              />
            </div>
          </div>

          {/* Price Display & Billing Unit */}
          <div className="p-4 bg-[#FBFBFB] border border-[#EAEAEA] rounded-sm space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#E84511]" />
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#111111]">
                Price & Billing Unit
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-[#888888] block mb-1">
                  Amount (e.g. $500, $800)
                </span>
                <input
                  type="text"
                  value={tier.price}
                  onChange={(e) => updateTier(tierKey, { price: e.target.value })}
                  placeholder="$500"
                  className="w-full bg-white border border-[#E2E2E2] focus:border-[#E84511] text-base font-extrabold px-3 py-2 outline-none font-display text-[#111111]"
                />
              </div>
              <div>
                <span className="text-[10px] text-[#888888] block mb-1">
                  Unit (e.g. /Project, /Month)
                </span>
                <input
                  type="text"
                  value={tier.unit}
                  onChange={(e) => updateTier(tierKey, { unit: e.target.value })}
                  placeholder="/Project"
                  className="w-full bg-white border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono font-bold px-3 py-2.5 outline-none text-[#111111]"
                />
              </div>
            </div>
          </div>

          {/* Metadata Rows: Delivery Time, Revisions, Tech Stack */}
          <div className="space-y-3 pt-2 border-t border-[#F0F0F0]">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
              Plan Specifications & Policies
            </label>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2 bg-[#FAFAFA] border border-[#EAEAEA] p-2">
                <Calendar className="w-3.5 h-3.5 text-[#E84511] shrink-0" />
                <span className="text-[10px] font-mono font-bold uppercase text-[#666666] w-28 shrink-0">
                  Delivery Time:
                </span>
                <input
                  type="text"
                  value={tier.deliveryTime}
                  onChange={(e) =>
                    updateTier(tierKey, { deliveryTime: e.target.value })
                  }
                  placeholder="2–4 Weeks"
                  className="flex-1 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono font-semibold px-2.5 py-1.5 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 bg-[#FAFAFA] border border-[#EAEAEA] p-2">
                <RotateCcw className="w-3.5 h-3.5 text-[#E84511] shrink-0" />
                <span className="text-[10px] font-mono font-bold uppercase text-[#666666] w-28 shrink-0">
                  Revisions Policy:
                </span>
                <input
                  type="text"
                  value={tier.revisions}
                  onChange={(e) =>
                    updateTier(tierKey, { revisions: e.target.value })
                  }
                  placeholder="Up to 4 revisions"
                  className="flex-1 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono font-semibold px-2.5 py-1.5 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 bg-[#FAFAFA] border border-[#EAEAEA] p-2">
                <Code2 className="w-3.5 h-3.5 text-[#E84511] shrink-0" />
                <span className="text-[10px] font-mono font-bold uppercase text-[#666666] w-28 shrink-0">
                  Tech Stack:
                </span>
                <input
                  type="text"
                  value={tier.techStack}
                  onChange={(e) =>
                    updateTier(tierKey, { techStack: e.target.value })
                  }
                  placeholder="Next.js / Node / TS"
                  className="flex-1 bg-white border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono font-semibold px-2.5 py-1.5 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Deliverable Features List */}
          <div className="space-y-2.5 pt-2 border-t border-[#F0F0F0]">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                Deliverable Features ({tier.features?.length || 0})
              </label>
              <span className="text-[10px] text-[#888888]">Reorder or delete</span>
            </div>

            <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
              {tier.features?.map((feature, featIdx) => (
                <div
                  key={featIdx}
                  className="flex items-center gap-2 p-2 bg-[#FAFAFA] border border-[#EAEAEA] hover:border-[#111111]/30 transition-colors"
                >
                  <span className="text-[#E84511] font-mono text-xs select-none">↗</span>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) =>
                      handleUpdateFeature(tierKey, featIdx, e.target.value)
                    }
                    className="flex-1 bg-transparent border-none outline-none text-xs font-semibold text-[#111111]"
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleMoveFeature(tierKey, featIdx, "up")}
                      disabled={featIdx === 0}
                      className="p-1 hover:bg-[#EAEAEA] text-[#777777] disabled:opacity-20 cursor-pointer"
                      title="Move Feature Up"
                      aria-label="Move Feature Up"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveFeature(tierKey, featIdx, "down")}
                      disabled={featIdx === (tier.features?.length || 0) - 1}
                      className="p-1 hover:bg-[#EAEAEA] text-[#777777] disabled:opacity-20 cursor-pointer"
                      title="Move Feature Down"
                      aria-label="Move Feature Down"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(tierKey, featIdx)}
                      className="p-1 hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                      title="Remove Feature"
                      aria-label="Remove Feature"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Feature Bar */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder="e.g. Automated CI/CD Deployments"
                value={newFeatureInputs[tierKey]}
                onChange={(e) =>
                  setNewFeatureInputs((prev) => ({
                    ...prev,
                    [tierKey]: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddFeature(tierKey);
                  }
                }}
                className="flex-1 bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-semibold px-3 py-2 outline-none text-[#111111]"
              />
              <button
                type="button"
                onClick={() => handleAddFeature(tierKey)}
                className="px-3 py-2 bg-[#111111] hover:bg-[#E84511] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>+ ADD</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* ================================================================ */}
      {/* SECTION 1: DUAL-MODEL PRICING PLANS EDITOR */}
      {/* ================================================================ */}
      <div className="space-y-6">
        {/* Top Summary & Action Toolbar */}
        <div className="bg-white border border-[#E2E2E2] p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 bg-[#111111] text-[#E84511]">
                  <DollarSign className="w-4 h-4" />
                </span>
                <h1 className="text-base font-extrabold uppercase tracking-wider text-[#111111] font-display">
                  Dual-Model Pricing Plans Editor
                </h1>
                <span className="px-2.5 py-0.5 bg-[#111111] text-white text-[11px] font-mono font-bold">
                  2 MODELS
                </span>
              </div>
              <p className="text-xs text-[#666666] leading-relaxed max-w-2xl">
                Configure both the <strong>PROJECT BASED</strong> MVP tier and the <strong>MONTHLY RETAINER</strong> sprint package rendered interactively in the Home page Pricing section.
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-start md:self-auto">
              {/* Segmented Switcher for Editing View */}
              <div className="inline-flex items-center bg-[#F0F0F0] p-1 border border-[#E0E0E0] rounded-sm">
                <button
                  type="button"
                  onClick={() => setActiveTierTab("both")}
                  className={`px-3 py-1.5 text-[11px] font-bold uppercase transition-colors cursor-pointer rounded-sm ${
                    activeTierTab === "both"
                      ? "bg-[#111111] text-white"
                      : "text-[#666666] hover:text-[#111111]"
                  }`}
                >
                  Both Tiers
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTierTab("projectBased")}
                  className={`px-3 py-1.5 text-[11px] font-bold uppercase transition-colors cursor-pointer rounded-sm ${
                    activeTierTab === "projectBased"
                      ? "bg-[#111111] text-white"
                      : "text-[#666666] hover:text-[#111111]"
                  }`}
                >
                  Project
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTierTab("monthly")}
                  className={`px-3 py-1.5 text-[11px] font-bold uppercase transition-colors cursor-pointer rounded-sm ${
                    activeTierTab === "monthly"
                      ? "bg-[#111111] text-white"
                      : "text-[#666666] hover:text-[#111111]"
                  }`}
                >
                  Monthly
                </button>
              </div>

              <a
                href="/#pricing"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 bg-[#F6F6F6] hover:bg-[#EAEAEA] text-[#666666] hover:text-[#111111] text-[11px] font-bold uppercase tracking-wider transition-colors border border-[#E2E2E2] flex items-center gap-1.5 cursor-pointer"
              >
                <span>VIEW PRICING</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E84511]" />
              </a>
            </div>
          </div>
        </div>

        {/* 2-Column Side-by-Side Pricing Cards Grid */}
        <div
          className={`grid gap-6 ${
            activeTierTab === "both"
              ? "grid-cols-1 lg:grid-cols-2"
              : "grid-cols-1 max-w-3xl mx-auto"
          }`}
        >
          {(activeTierTab === "both" || activeTierTab === "projectBased") &&
            renderTierCard("projectBased", projectBased, "PROJECT BASED")}

          {(activeTierTab === "both" || activeTierTab === "monthly") &&
            renderTierCard("monthly", monthly, "MONTHLY RETAINER")}
        </div>
      </div>

      {/* ================================================================ */}
      {/* SECTION 2: CLIENT TESTIMONIALS FULL CRUD & ALTERNATING GRID */}
      {/* ================================================================ */}
      <div className="space-y-6">
        {/* Top Summary & Action Toolbar */}
        <div className="bg-white border border-[#E2E2E2] p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 bg-[#111111] text-[#E84511]">
                  <MessageSquare className="w-4 h-4" />
                </span>
                <h2 className="text-base font-extrabold uppercase tracking-wider text-[#111111] font-display">
                  Client Testimonials & Alternating Grid Manager
                </h2>
                <span className="px-2.5 py-0.5 bg-[#111111] text-white text-[11px] font-mono font-bold">
                  {testimonials.length} REVIEWS
                </span>
              </div>
              <p className="text-xs text-[#666666] leading-relaxed max-w-2xl">
                On the Home page, reviews render in an alternating layout: Even slots (<strong className="text-[#111111] font-mono">#01, #03</strong>) display the <strong>Avatar-Top</strong> format, while Odd slots (<strong className="text-[#111111] font-mono">#02, #04</strong>) display the <strong>Stars-Top / Avatar-Bottom</strong> format.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <a
                href="/#testimonials"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 bg-[#F6F6F6] hover:bg-[#EAEAEA] text-[#666666] hover:text-[#111111] text-[11px] font-bold uppercase tracking-wider transition-colors border border-[#E2E2E2] flex items-center gap-1.5 cursor-pointer"
              >
                <span>VIEW REVIEWS</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E84511]" />
              </a>

              <button
                type="button"
                onClick={handleAddTestimonial}
                className="bg-[#E84511] hover:bg-[#D63B0B] text-white text-xs font-extrabold uppercase tracking-wider px-4 py-2.5 flex items-center gap-2 transition-colors cursor-pointer shadow-sm active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>+ ADD TESTIMONIAL</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Testimonial Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {testimonials.map((testimonial, idx) => {
            const isAvatarTop = idx % 2 === 0;

            return (
              <div
                key={testimonial.id || idx}
                className="bg-white border border-[#E2E2E2] shadow-sm transition-all duration-200 hover:border-[#111111]/30 flex flex-col justify-between"
              >
                {/* Card Header Bar */}
                <div className="p-4 md:p-5 flex items-center justify-between gap-3 bg-[#FAFAFA] border-b border-[#EAEAEA]">
                  <div className="flex items-center gap-2.5 flex-wrap min-w-0">
                    <span className="px-2 py-0.5 bg-[#111111] text-white text-xs font-mono font-extrabold tracking-wider">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm font-extrabold uppercase tracking-tight text-[#111111] font-display truncate">
                      {testimonial.name || "UNTITLED REVIEW"}
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-sm border ${
                        isAvatarTop
                          ? "bg-stone-100 border-stone-200 text-[#333333]"
                          : "bg-orange-50 border-orange-200 text-[#E84511]"
                      }`}
                    >
                      {isAvatarTop ? "AVATAR TOP" : "AVATAR BOTTOM"}
                    </span>
                  </div>

                  {/* Move & Delete Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleMoveTestimonial(idx, "up")}
                      disabled={idx === 0}
                      className="p-1.5 bg-white border border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title="Move Testimonial Earlier"
                      aria-label={`Move testimonial ${testimonial.name} up`}
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMoveTestimonial(idx, "down")}
                      disabled={idx === testimonials.length - 1}
                      className="p-1.5 bg-white border border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title="Move Testimonial Later"
                      aria-label={`Move testimonial ${testimonial.name} down`}
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteTestimonial(idx)}
                      disabled={testimonials.length <= 1}
                      className="p-1.5 bg-white border border-red-200 hover:bg-red-50 text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title={
                        testimonials.length <= 1
                          ? "At least one review required"
                          : "Delete Review"
                      }
                      aria-label={`Delete testimonial ${testimonial.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col gap-5 flex-1">
                  {/* Name and Role Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                        Client / Reviewer Name
                      </label>
                      <input
                        type="text"
                        value={testimonial.name}
                        onChange={(e) =>
                          updateTestimonial(idx, { name: e.target.value })
                        }
                        placeholder="Daniel Smith"
                        className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-bold px-3 py-2 outline-none text-[#111111]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                        Role & Organization
                      </label>
                      <input
                        type="text"
                        value={testimonial.role}
                        onChange={(e) =>
                          updateTestimonial(idx, { role: e.target.value })
                        }
                        placeholder="Product Manager, FinTech"
                        className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-medium px-3 py-2 outline-none text-[#111111]"
                      />
                    </div>
                  </div>

                  {/* Interactive Star Rating Selector */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                        Star Rating ({testimonial.rating}/5)
                      </label>
                      <span className="text-[10px] text-[#888888]">Click stars to adjust</span>
                    </div>

                    <div className="flex items-center gap-1.5 p-2.5 bg-[#FAFAFA] border border-[#EAEAEA] rounded-sm">
                      {[1, 2, 3, 4, 5].map((starVal) => {
                        const isFilled = starVal <= (testimonial.rating || 5);
                        return (
                          <button
                            key={starVal}
                            type="button"
                            onClick={() => updateTestimonial(idx, { rating: starVal })}
                            className="p-1 hover:scale-125 transition-transform cursor-pointer"
                            title={`Set ${starVal} Star${starVal > 1 ? "s" : ""}`}
                            aria-label={`Set ${starVal} Stars`}
                          >
                            <Star
                              className={`w-5 h-5 ${
                                isFilled
                                  ? "text-[#E84511] fill-[#E84511]"
                                  : "text-[#CCCCCC]"
                              }`}
                            />
                          </button>
                        );
                      })}
                      <span className="ml-2 text-xs font-mono font-extrabold text-[#111111]">
                        {testimonial.rating}.0
                      </span>
                    </div>
                  </div>

                  {/* Review Quote Textarea */}
                  <div className="space-y-1.5 flex-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                      Client Review Statement / Quote
                    </label>
                    <textarea
                      rows={3}
                      value={testimonial.quote}
                      onChange={(e) =>
                        updateTestimonial(idx, { quote: e.target.value })
                      }
                      placeholder="BigSam engineered our web platform with incredible speed and clean code..."
                      className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-medium px-3 py-2.5 outline-none text-[#111111] leading-relaxed resize-y"
                    />
                  </div>

                  {/* Client Avatar Image Picker */}
                  <div className="space-y-2 pt-2 border-t border-[#F0F0F0]">
                    <ImageUploaderModal
                      label="Client Avatar (1:1 Square)"
                      description="Headshot portrait rendered inside the review card avatar frame."
                      value={testimonial.avatar}
                      onChange={(url) => updateTestimonial(idx, { avatar: url })}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

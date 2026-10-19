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
  Newspaper,
  HelpCircle,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { PortfolioData, ArticleItem, FaqItem } from "@/data/portfolioData";
import { ImageUploaderModal } from "@/components/admin/ImageUploaderModal";

export interface ArticlesFaqTabProps {
  draftData: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

const PRESET_CATEGORIES = [
  "Architecture",
  "Backend",
  "Frontend",
  "TypeScript",
  "Process",
  "Security",
  "AI & Cloud",
];

const getArticleSlotBadge = (idx: number) => {
  if (idx === 0) {
    return {
      label: "HOME FEATURED (#01)",
      classNames: "bg-orange-50 border-orange-200 text-[#E84511]",
    };
  }
  if (idx === 1 || idx === 2) {
    return {
      label: `HOME SIDE CARD (#${String(idx + 1).padStart(2, "0")})`,
      classNames: "bg-stone-100 border-stone-200 text-[#111111]",
    };
  }
  return {
    label: `/ARTICLES ARCHIVE (#${String(idx + 1).padStart(2, "0")})`,
    classNames: "bg-[#FBFBFB] border-[#E0E0E0] text-[#777777]",
  };
};

export const ArticlesFaqTab: React.FC<ArticlesFaqTabProps> = ({
  draftData,
  onChange,
}) => {
  const { articles = [], faqs = [] } = draftData;

  // Track collapsed article cards (default all open)
  const [collapsedArticles, setCollapsedArticles] = useState<Record<string, boolean>>({});

  // Active view toggle: both, articles, or faqs
  const [activeSection, setActiveSection] = useState<"both" | "articles" | "faqs">("both");

  // Articles CRUD
  const updateArticle = (id: string, updates: Partial<ArticleItem>) => {
    const updated = articles.map((a) => (a.id === id ? { ...a, ...updates } : a));
    onChange({
      ...draftData,
      articles: updated,
    });
  };

  const handleAddArticle = () => {
    const newArt: ArticleItem = {
      id: `art-${Date.now()}`,
      title: "New Architectural Insights and Best Practices",
      excerpt:
        "Exploring full-stack design patterns, server architectures, and engineering methodologies for modern software systems.",
      category: "Architecture",
      author: "BigSam",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    };

    const updated = [...articles, newArt];
    onChange({
      ...draftData,
      articles: updated,
    });

    // Expand newly added article
    setCollapsedArticles((prev) => ({ ...prev, [newArt.id]: false }));
  };

  const handleDeleteArticle = (id: string) => {
    if (articles.length <= 1) return; // Guard: keep at least 1 article
    const filtered = articles.filter((a) => a.id !== id);
    onChange({
      ...draftData,
      articles: filtered,
    });
  };

  const handleMoveArticle = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= articles.length) return;

    const updated = [...articles];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    onChange({
      ...draftData,
      articles: updated,
    });
  };

  const toggleArticleCollapse = (id: string) => {
    setCollapsedArticles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAllArticles = () => {
    setCollapsedArticles({});
  };

  const handleCollapseAllArticles = () => {
    const allCollapsed: Record<string, boolean> = {};
    articles.forEach((a) => {
      allCollapsed[a.id] = true;
    });
    setCollapsedArticles(allCollapsed);
  };

  // FAQs CRUD
  const updateFaq = (index: number, updates: Partial<FaqItem>) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], ...updates };
    onChange({
      ...draftData,
      faqs: updated,
    });
  };

  const handleAddFaq = () => {
    const nextNum = faqs.length + 1;
    const newFaq: FaqItem = {
      question: `${nextNum}. NEW INQUIRY QUESTION?`,
      answer:
        "Clear and comprehensive answer describing development processes, technical deliverables, and collaboration terms.",
    };

    onChange({
      ...draftData,
      faqs: [...faqs, newFaq],
    });
  };

  const handleDeleteFaq = (index: number) => {
    if (faqs.length <= 1) return; // Guard: keep at least 1 FAQ
    const filtered = faqs.filter((_, i) => i !== index);
    onChange({
      ...draftData,
      faqs: filtered,
    });
  };

  const handleMoveFaq = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= faqs.length) return;

    const updated = [...faqs];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    onChange({
      ...draftData,
      faqs: updated,
    });
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Top Segmented Navigation Switcher */}
      <div className="bg-white border border-[#E2E2E2] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
            Active Studio View:
          </span>
          <div className="inline-flex items-center bg-[#F0F0F0] p-1 border border-[#E0E0E0] rounded-sm">
            <button
              type="button"
              onClick={() => setActiveSection("both")}
              className={`px-3 py-1 text-[11px] font-bold uppercase transition-colors cursor-pointer rounded-sm ${
                activeSection === "both"
                  ? "bg-[#111111] text-white"
                  : "text-[#666666] hover:text-[#111111]"
              }`}
            >
              Both ({articles.length + faqs.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveSection("articles")}
              className={`px-3 py-1 text-[11px] font-bold uppercase transition-colors cursor-pointer rounded-sm ${
                activeSection === "articles"
                  ? "bg-[#111111] text-white"
                  : "text-[#666666] hover:text-[#111111]"
              }`}
            >
              Articles ({articles.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveSection("faqs")}
              className={`px-3 py-1 text-[11px] font-bold uppercase transition-colors cursor-pointer rounded-sm ${
                activeSection === "faqs"
                  ? "bg-[#111111] text-white"
                  : "text-[#666666] hover:text-[#111111]"
              }`}
            >
              FAQs ({faqs.length})
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/articles"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#E84511] font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>/articles</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-[#CCCCCC]">|</span>
          <a
            href="/contact"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#E84511] font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>/contact</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* ================================================================ */}
      {/* SECTION 1: ENGINEERING ARTICLES FULL CRUD */}
      {/* ================================================================ */}
      {(activeSection === "both" || activeSection === "articles") && (
        <div className="space-y-6">
          {/* Top Summary & Action Toolbar */}
          <div className="bg-white border border-[#E2E2E2] p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 bg-[#111111] text-[#E84511]">
                    <Newspaper className="w-4 h-4" />
                  </span>
                  <h1 className="text-base font-extrabold uppercase tracking-wider text-[#111111] font-display">
                    Engineering Articles &amp; Insights Editor
                  </h1>
                  <span className="px-2.5 py-0.5 bg-[#111111] text-white text-[11px] font-mono font-bold">
                    {articles.length} ARTICLES
                  </span>
                </div>
                <p className="text-xs text-[#666666] leading-relaxed max-w-2xl">
                  Articles at slots <strong className="text-[#111111] font-mono">#01–#03</strong> power the Home page Insights Preview section. All <strong className="text-[#111111] font-mono">{articles.length} articles</strong> appear on the dedicated <code className="text-[#111111] font-mono">/articles</code> archive.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                <button
                  type="button"
                  onClick={handleExpandAllArticles}
                  className="px-3 py-2 bg-[#F6F6F6] hover:bg-[#EAEAEA] text-[#666666] hover:text-[#111111] text-[11px] font-bold uppercase tracking-wider transition-colors border border-[#E2E2E2] flex items-center gap-1.5 cursor-pointer"
                  title="Expand all articles"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">EXPAND ALL</span>
                </button>
                <button
                  type="button"
                  onClick={handleCollapseAllArticles}
                  className="px-3 py-2 bg-[#F6F6F6] hover:bg-[#EAEAEA] text-[#666666] hover:text-[#111111] text-[11px] font-bold uppercase tracking-wider transition-colors border border-[#E2E2E2] flex items-center gap-1.5 cursor-pointer"
                  title="Collapse all articles"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">COLLAPSE ALL</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddArticle}
                  className="bg-[#E84511] hover:bg-[#D63B0B] text-white text-xs font-extrabold uppercase tracking-wider px-4 py-2.5 flex items-center gap-2 transition-colors cursor-pointer shadow-sm active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ ADD NEW ARTICLE</span>
                </button>
              </div>
            </div>
          </div>

          {/* Articles Cards List */}
          <div className="space-y-6">
            {articles.map((article, idx) => {
              const isCollapsed = !!collapsedArticles[article.id];
              const slotBadge = getArticleSlotBadge(idx);

              return (
                <div
                  key={article.id || idx}
                  className="bg-white border border-[#E2E2E2] shadow-sm transition-all duration-200 hover:border-[#111111]/30"
                >
                  {/* Card Header Bar */}
                  <div className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAFAFA] border-b border-[#EAEAEA]">
                    <div className="flex items-center gap-2.5 flex-wrap min-w-0">
                      <span className="px-2 py-0.5 bg-[#111111] text-white text-xs font-mono font-extrabold tracking-wider">
                        #{String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-sm font-extrabold tracking-tight text-[#111111] truncate max-w-xs md:max-w-md font-display">
                        {article.title || "UNTITLED ARTICLE"}
                      </h3>
                      <span className="px-2 py-0.5 bg-[#F0F0F0] border border-[#E0E0E0] text-[#555555] text-[10px] font-mono font-bold uppercase">
                        {article.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-sm border ${slotBadge.classNames}`}
                      >
                        {slotBadge.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                      <button
                        type="button"
                        onClick={() => handleMoveArticle(idx, "up")}
                        disabled={idx === 0}
                        className="p-1.5 bg-white border border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        title="Move Article Up"
                        aria-label={`Move article ${article.title} up`}
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMoveArticle(idx, "down")}
                        disabled={idx === articles.length - 1}
                        className="p-1.5 bg-white border border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        title="Move Article Down"
                        aria-label={`Move article ${article.title} down`}
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleArticleCollapse(article.id)}
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
                        onClick={() => handleDeleteArticle(article.id)}
                        disabled={articles.length <= 1}
                        className="p-1.5 bg-white border border-red-200 hover:bg-red-50 text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        title={
                          articles.length <= 1
                            ? "At least one article required"
                            : "Delete Article"
                        }
                        aria-label={`Delete article ${article.title}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card Body (Collapsible) */}
                  {!isCollapsed && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 border-t border-[#EAEAEA]">
                      {/* Left Column: Form Details (7 cols) */}
                      <div className="lg:col-span-7 flex flex-col gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                            Article Headline / Title
                          </label>
                          <input
                            type="text"
                            value={article.title}
                            onChange={(e) =>
                              updateArticle(article.id, { title: e.target.value })
                            }
                            placeholder="Architecting Scalable Full-Stack Apps"
                            className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-sm font-extrabold px-3.5 py-2 outline-none font-display text-[#111111]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                            Article Excerpt / Abstract
                          </label>
                          <textarea
                            rows={3}
                            value={article.excerpt}
                            onChange={(e) =>
                              updateArticle(article.id, { excerpt: e.target.value })
                            }
                            placeholder="Brief technical summary..."
                            className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-medium px-3.5 py-2.5 outline-none text-[#111111] leading-relaxed resize-y"
                          />
                        </div>

                        {/* Category & Quick-Select Preset Chips */}
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                            Category
                          </label>
                          <input
                            type="text"
                            value={article.category}
                            onChange={(e) =>
                              updateArticle(article.id, { category: e.target.value })
                            }
                            placeholder="Architecture"
                            className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono font-semibold px-3 py-1.5 outline-none text-[#111111]"
                          />
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[10px] text-[#888888]">Presets:</span>
                            {PRESET_CATEGORIES.map((preset) => (
                              <button
                                key={preset}
                                type="button"
                                onClick={() =>
                                  updateArticle(article.id, { category: preset })
                                }
                                className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded transition-colors cursor-pointer ${
                                  article.category === preset
                                    ? "bg-[#111111] text-white"
                                    : "bg-[#F0F0F0] text-[#555555] hover:bg-[#E2E2E2]"
                                }`}
                              >
                                {preset}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Author & Date */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                              Author Name
                            </label>
                            <input
                              type="text"
                              value={article.author}
                              onChange={(e) =>
                                updateArticle(article.id, { author: e.target.value })
                              }
                              placeholder="BigSam"
                              className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-medium px-3 py-1.5 outline-none"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                              Publication Date
                            </label>
                            <input
                              type="text"
                              value={article.date}
                              onChange={(e) =>
                                updateArticle(article.id, { date: e.target.value })
                              }
                              placeholder="Oct 10, 2026"
                              className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono font-medium px-3 py-1.5 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Article Cover Image Picker (5 cols) */}
                      <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#EAEAEA] lg:pl-6 pt-4 lg:pt-0 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#E84511]" />
                              <span>Article Cover Asset (16:11)</span>
                            </span>
                          </div>

                          <ImageUploaderModal
                            label="Article Cover Image (16:11)"
                            description="Visual cover rendered in Home Insights Preview and the /articles archive."
                            value={article.image}
                            onChange={(url) => updateArticle(article.id, { image: url })}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* SECTION 2: SHARED EXPANDABLE FAQS FULL CRUD */}
      {/* ================================================================ */}
      {(activeSection === "both" || activeSection === "faqs") && (
        <div className="space-y-6 pt-4">
          <div className="bg-white border border-[#E2E2E2] p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="p-1.5 bg-[#111111] text-[#E84511]">
                    <HelpCircle className="w-4 h-4" />
                  </span>
                  <h2 className="text-base font-extrabold uppercase tracking-wider text-[#111111] font-display">
                    Shared Expandable FAQs Manager
                  </h2>
                  <span className="px-2.5 py-0.5 bg-[#111111] text-white text-[11px] font-mono font-bold">
                    {faqs.length} FAQS
                  </span>
                </div>
                <p className="text-xs text-[#666666] leading-relaxed max-w-2xl">
                  Shared interactive accordion items deployed simultaneously on both <code className="text-[#111111] font-mono">/contact</code> and <code className="text-[#111111] font-mono">/about</code>. Item #01 opens by default on page load.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddFaq}
                className="bg-[#E84511] hover:bg-[#D63B0B] text-white text-xs font-extrabold uppercase tracking-wider px-4 py-2.5 flex items-center gap-2 transition-colors cursor-pointer shadow-sm active:scale-95 self-start md:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>+ ADD FAQ QUESTION</span>
              </button>
            </div>
          </div>

          {/* FAQs List */}
          <div className="space-y-5">
            {faqs.map((faq, idx) => (
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
                      {faq.question || "UNTITLED INQUIRY"}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleMoveFaq(idx, "up")}
                      disabled={idx === 0}
                      className="p-1.5 bg-white border border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title="Move FAQ Earlier"
                      aria-label={`Move FAQ ${faq.question} up`}
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMoveFaq(idx, "down")}
                      disabled={idx === faqs.length - 1}
                      className="p-1.5 bg-white border border-[#E2E2E2] hover:bg-[#F0F0F0] text-[#111111] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title="Move FAQ Later"
                      aria-label={`Move FAQ ${faq.question} down`}
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteFaq(idx)}
                      disabled={faqs.length <= 1}
                      className="p-1.5 bg-white border border-red-200 hover:bg-red-50 text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      title={
                        faqs.length <= 1
                          ? "At least one FAQ required"
                          : "Delete FAQ"
                      }
                      aria-label={`Delete FAQ ${faq.question}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Body Inputs */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                      FAQ Question Header
                    </label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) =>
                        updateFaq(idx, { question: e.target.value.toUpperCase() })
                      }
                      placeholder="1. WHAT SERVICES DO YOU OFFER AS A FULL-STACK ENGINEER?"
                      className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-extrabold uppercase px-3.5 py-2 outline-none font-display text-[#111111]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                      FAQ Answer Explanation
                    </label>
                    <textarea
                      rows={3}
                      value={faq.answer}
                      onChange={(e) => updateFaq(idx, { answer: e.target.value })}
                      placeholder="Comprehensive answer..."
                      className="w-full bg-[#FAFAFA] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-medium px-3.5 py-2.5 outline-none text-[#111111] leading-relaxed resize-y"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

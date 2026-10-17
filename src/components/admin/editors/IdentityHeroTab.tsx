"use client";

import React from "react";
import {
  User,
  Sparkles,
  PhoneCall,
  Flame,
  Image as ImageIcon,
  Share2,
  Plus,
  Trash2,
} from "lucide-react";
import { PortfolioData, SocialLink } from "@/data/portfolioData";
import { ImageUploaderModal } from "@/components/admin/ImageUploaderModal";

export interface IdentityHeroTabProps {
  draftData: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

export const IdentityHeroTab: React.FC<IdentityHeroTabProps> = ({
  draftData,
  onChange,
}) => {
  const { personalInfo, heroFeaturedProject } = draftData;

  const updatePersonalInfo = (updates: Partial<typeof personalInfo>) => {
    onChange({
      ...draftData,
      personalInfo: {
        ...personalInfo,
        ...updates,
      },
    });
  };

  const updatePhilosophy = (
    field: "black" | "gray",
    val: string
  ) => {
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

  const updateHeroFeaturedProject = (
    updates: Partial<typeof heroFeaturedProject>
  ) => {
    onChange({
      ...draftData,
      heroFeaturedProject: {
        ...heroFeaturedProject,
        ...updates,
      },
    });
  };

  const handleAddSocialLink = () => {
    const updated = [
      ...(personalInfo.socialLinks || []),
      { name: "Platform", url: "https://" },
    ];
    updatePersonalInfo({ socialLinks: updated });
  };

  const handleUpdateSocialLink = (
    index: number,
    field: keyof SocialLink,
    value: string
  ) => {
    const updated = [...(personalInfo.socialLinks || [])];
    updated[index] = { ...updated[index], [field]: value };
    updatePersonalInfo({ socialLinks: updated });
  };

  const handleRemoveSocialLink = (index: number) => {
    const updated = personalInfo.socialLinks.filter((_, i) => i !== index);
    updatePersonalInfo({ socialLinks: updated });
  };

  return (
    <div className="space-y-8 select-none">
      {/* Tab Header */}
      <div>
        <h1 className="text-2xl font-extrabold uppercase tracking-tight text-[#111111] font-display">
          Identity & Hero Section Editor
        </h1>
        <p className="text-xs text-[#8E8E8E] mt-1">
          Configure Samuel’s personal brand titles, hero banner copy, contact info, visual portraits, and social links.
        </p>
      </div>

      {/* Card 1: Brand & Personal Names */}
      <div className="bg-white border border-[#E2E2E2] p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#E2E2E2]">
          <User className="w-4 h-4 text-[#E84511]" />
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#111111]">
            1. Brand & Personal Identity
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
              Display Name (Hero & Cards)
            </label>
            <input
              type="text"
              value={personalInfo.displayName || ""}
              onChange={(e) => updatePersonalInfo({ displayName: e.target.value })}
              className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-semibold px-3.5 py-2.5 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
              Legal / First Name
            </label>
            <input
              type="text"
              value={personalInfo.firstName || ""}
              onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
              className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-semibold px-3.5 py-2.5 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
              Brand Wordmark
            </label>
            <input
              type="text"
              value={personalInfo.brandName || ""}
              onChange={(e) => updatePersonalInfo({ brandName: e.target.value })}
              className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-semibold px-3.5 py-2.5 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
              Professional Title / Role
            </label>
            <input
              type="text"
              value={personalInfo.role || ""}
              onChange={(e) => updatePersonalInfo({ role: e.target.value })}
              className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-semibold px-3.5 py-2.5 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
              Footer Wordmark
            </label>
            <input
              type="text"
              value={personalInfo.footerWordmark || ""}
              onChange={(e) => updatePersonalInfo({ footerWordmark: e.target.value })}
              className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-semibold px-3.5 py-2.5 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
              Copyright Year
            </label>
            <input
              type="text"
              value={personalInfo.copyrightYear || ""}
              onChange={(e) => updatePersonalInfo({ copyrightYear: e.target.value })}
              className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-semibold px-3.5 py-2.5 outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Card 2: Hero Tagline & Bios */}
      <div className="bg-white border border-[#E2E2E2] p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#E2E2E2]">
          <Sparkles className="w-4 h-4 text-[#E84511]" />
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#111111]">
            2. Hero Tagline, Philosophy & Bio
          </h2>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
              Giant Hero Tagline (Marquee / Heading)
            </label>
            <textarea
              rows={2}
              value={personalInfo.heroTagline || ""}
              onChange={(e) => updatePersonalInfo({ heroTagline: e.target.value })}
              className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-semibold p-3.5 outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
                Philosophy Headline (Primary Black Text)
              </label>
              <input
                type="text"
                value={personalInfo.philosophyHeadline?.black || ""}
                onChange={(e) => updatePhilosophy("black", e.target.value)}
                className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-semibold px-3.5 py-2.5 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
                Philosophy Headline (Accent Gray Text)
              </label>
              <input
                type="text"
                value={personalInfo.philosophyHeadline?.gray || ""}
                onChange={(e) => updatePhilosophy("gray", e.target.value)}
                className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-semibold px-3.5 py-2.5 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
              Short Bio (Hero & About Previews)
            </label>
            <textarea
              rows={2}
              value={personalInfo.shortBio || ""}
              onChange={(e) => updatePersonalInfo({ shortBio: e.target.value })}
              className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-medium p-3.5 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
              Full Philosophy & Architecture Subtext
            </label>
            <textarea
              rows={3}
              value={personalInfo.philosophySubtext || ""}
              onChange={(e) => updatePersonalInfo({ philosophySubtext: e.target.value })}
              className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-medium p-3.5 outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Card 3: Contact & Booking Data */}
      <div className="bg-white border border-[#E2E2E2] p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#E2E2E2]">
          <PhoneCall className="w-4 h-4 text-[#E84511]" />
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#111111]">
            3. Contact Information & Office Availability
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={personalInfo.email || ""}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono px-3.5 py-2.5 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
              Phone (Display Format)
            </label>
            <input
              type="text"
              value={personalInfo.phone || ""}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono px-3.5 py-2.5 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
              Phone (Raw for WhatsApp: 234...)
            </label>
            <input
              type="text"
              value={personalInfo.phoneRaw || ""}
              onChange={(e) => updatePersonalInfo({ phoneRaw: e.target.value })}
              className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono px-3.5 py-2.5 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
              Location & Timezone
            </label>
            <input
              type="text"
              value={personalInfo.location || ""}
              onChange={(e) => updatePersonalInfo({ location: e.target.value })}
              className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-medium px-3.5 py-2.5 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
              Working Hours
            </label>
            <input
              type="text"
              value={personalInfo.officeHours || ""}
              onChange={(e) => updatePersonalInfo({ officeHours: e.target.value })}
              className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-medium px-3.5 py-2.5 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
              Booking / Scheduling URL
            </label>
            <input
              type="text"
              value={personalInfo.bookingUrl || ""}
              onChange={(e) => updatePersonalInfo({ bookingUrl: e.target.value })}
              className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono px-3.5 py-2.5 outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Card 4: Hero Featured Project */}
      <div className="bg-white border border-[#E2E2E2] p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#E2E2E2]">
          <Flame className="w-4 h-4 text-[#E84511]" />
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#111111]">
            4. Hero Featured Project Highlight (00:03 Reference)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
              Project Title
            </label>
            <input
              type="text"
              value={heroFeaturedProject?.title || ""}
              onChange={(e) => updateHeroFeaturedProject({ title: e.target.value })}
              className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-semibold px-3.5 py-2.5 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
              Category & Year Tag
            </label>
            <input
              type="text"
              value={heroFeaturedProject?.category || ""}
              onChange={(e) => updateHeroFeaturedProject({ category: e.target.value })}
              className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-semibold px-3.5 py-2.5 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-1.5">
              Target Link / Route
            </label>
            <input
              type="text"
              value={heroFeaturedProject?.link || ""}
              onChange={(e) => updateHeroFeaturedProject({ link: e.target.value })}
              className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono px-3.5 py-2.5 outline-none transition-colors"
            />
          </div>

          <div>
            <ImageUploaderModal
              label="Featured Project Thumbnail Image"
              value={heroFeaturedProject?.image || "/assets/samuel-impact.png"}
              onChange={(newUrl) => updateHeroFeaturedProject({ image: newUrl })}
            />
          </div>
        </div>
      </div>

      {/* Card 5: Visual Brand Assets */}
      <div className="bg-white border border-[#E2E2E2] p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#E2E2E2]">
          <ImageIcon className="w-4 h-4 text-[#E84511]" />
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#111111]">
            5. Visual Brand Assets & Editorial Portraits
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploaderModal
            label="Main Hero Portrait (Center Cutout)"
            description="High-resolution cutout portrait of Samuel rendered in HeroSection."
            value={personalInfo.heroPortrait || "/assets/hero-portrait.png"}
            onChange={(newUrl) => updatePersonalInfo({ heroPortrait: newUrl })}
          />

          <ImageUploaderModal
            label="Avatar Image (Bio / Header)"
            description="Circular avatar of Samuel used in ImpactSection and bio headers."
            value={personalInfo.avatarImage || "/assets/samuel-avatar.png"}
            onChange={(newUrl) => updatePersonalInfo({ avatarImage: newUrl })}
          />

          <ImageUploaderModal
            label="Impact Section Editorial Portrait"
            description="Large editorial photograph rendered in the center bento card of ImpactSection."
            value={personalInfo.impactPortrait || "/assets/samuel-impact.png"}
            onChange={(newUrl) => updatePersonalInfo({ impactPortrait: newUrl })}
          />

          <ImageUploaderModal
            label="Primary Brand Emblem (Dark Mode)"
            description="Gadex logo emblem used on dark surfaces and studio navigation."
            value={personalInfo.gadexLogo || "/assets/gadex-logo.png"}
            onChange={(newUrl) => updatePersonalInfo({ gadexLogo: newUrl })}
          />

          <ImageUploaderModal
            label="Alternative Brand Emblem (White Mode)"
            description="Gadex monochrome white emblem for high-contrast headers."
            value={personalInfo.gadexLogoWhite || "/assets/gadex-logo-white.png"}
            onChange={(newUrl) => updatePersonalInfo({ gadexLogoWhite: newUrl })}
          />
        </div>
      </div>

      {/* Card 6: Social Media Links */}
      <div className="bg-white border border-[#E2E2E2] p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E2E2]">
          <div className="flex items-center gap-2.5">
            <Share2 className="w-4 h-4 text-[#E84511]" />
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#111111]">
              6. Social Profiles & Network Links
            </h2>
          </div>

          <button
            type="button"
            onClick={handleAddSocialLink}
            className="px-3.5 py-1.5 bg-[#111111] hover:bg-[#E84511] text-white text-[10px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ADD SOCIAL LINK</span>
          </button>
        </div>

        <div className="space-y-3">
          {personalInfo.socialLinks?.map((social, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-[#F6F6F6] border border-[#E2E2E2]"
            >
              <div className="w-1/3">
                <input
                  type="text"
                  placeholder="Platform Name (e.g. GitHub)"
                  value={social.name}
                  onChange={(e) => handleUpdateSocialLink(index, "name", e.target.value)}
                  className="w-full bg-white border border-[#E2E2E2] focus:border-[#E84511] text-xs font-semibold px-3 py-2 outline-none"
                />
              </div>

              <div className="flex-1">
                <input
                  type="text"
                  placeholder="https://..."
                  value={social.url}
                  onChange={(e) => handleUpdateSocialLink(index, "url", e.target.value)}
                  className="w-full bg-white border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono px-3 py-2 outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemoveSocialLink(index)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                title="Delete social link"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

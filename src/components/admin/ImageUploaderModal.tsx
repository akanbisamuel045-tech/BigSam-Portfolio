"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  Link2,
  Image as ImageIcon,
  X,
  Check,
  Loader2,
  AlertCircle,
  FileImage,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageUploaderModalProps {
  value: string;
  onChange: (newUrl: string) => void;
  label?: string;
  description?: string;
}

const PRESET_ASSETS = [
  { label: "Hero Portrait", path: "/assets/hero-portrait.png" },
  { label: "Samuel Avatar", path: "/assets/samuel-avatar.png" },
  { label: "Impact Portrait", path: "/assets/samuel-impact.png" },
  { label: "Gadex Dark Emblem", path: "/assets/gadex-logo.png" },
  { label: "Gadex White Emblem", path: "/assets/gadex-logo-white.png" },
];

export const ImageUploaderModal: React.FC<ImageUploaderModalProps> = ({
  value,
  onChange,
  label,
  description,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState(value || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    setUrlInput(value || "");
    setSelectedFile(null);
    setFilePreview(null);
    setUploadError(null);
    setIsOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadError(null);
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success && result.url) {
        onChange(result.url);
        setIsOpen(false);
      } else {
        setUploadError(result.error || "Failed to upload image.");
      }
    } catch {
      setUploadError("A network error occurred while uploading.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    setIsOpen(false);
  };

  return (
    <div className="space-y-1.5 select-none">
      {label && (
        <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block">
          {label}
        </label>
      )}

      {description && (
        <p className="text-[11px] text-[#8E8E8E] leading-tight mb-1">{description}</p>
      )}

      {/* Trigger & Preview Card */}
      <div className="flex items-center gap-4 p-3 bg-[#F6F6F6] border border-[#E2E2E2] hover:border-[#111111] transition-colors">
        {/* Thumbnail Preview */}
        <div className="w-16 h-16 bg-[#111111] shrink-0 border border-black/10 overflow-hidden relative flex items-center justify-center">
          {value ? (
            <Image
              src={value}
              alt={label || "Selected asset"}
              fill
              className="object-cover"
              sizes="64px"
              unoptimized
            />
          ) : (
            <ImageIcon className="w-6 h-6 text-white/30" />
          )}
        </div>

        {/* Path Text & Change Button */}
        <div className="flex-1 min-w-0">
          <div className="text-xs font-mono text-[#111111] truncate font-medium">
            {value || "No image selected"}
          </div>
          <div className="text-[10px] text-[#8E8E8E] mt-0.5 truncate">
            {value.startsWith("/assets/uploads")
              ? "Uploaded custom asset"
              : value.startsWith("/assets")
              ? "Default portfolio asset"
              : value.startsWith("http")
              ? "External CDN / Web URL"
              : "Standard asset"}
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpen}
          className="px-3.5 py-2 bg-[#111111] hover:bg-[#E84511] text-white text-[11px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
        >
          SELECT / UPLOAD
        </button>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-xl bg-white border border-[#E2E2E2] shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#111111] text-white px-6 py-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <FileImage className="w-4 h-4 text-[#E84511]" />
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-white">
                  IMAGE ASSET MANAGER
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-[#E2E2E2] bg-[#F6F6F6]">
              <button
                type="button"
                onClick={() => setActiveTab("upload")}
                className={cn(
                  "flex-1 py-3 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer border-b-2",
                  activeTab === "upload"
                    ? "border-[#E84511] text-[#111111] bg-white font-bold"
                    : "border-transparent text-[#8E8E8E] hover:text-[#111111]"
                )}
              >
                <Upload className="w-3.5 h-3.5 text-[#E84511]" />
                <span>UPLOAD FILE (MAX 10MB)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("url")}
                className={cn(
                  "flex-1 py-3 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer border-b-2",
                  activeTab === "url"
                    ? "border-[#E84511] text-[#111111] bg-white font-bold"
                    : "border-transparent text-[#8E8E8E] hover:text-[#111111]"
                )}
              >
                <Link2 className="w-3.5 h-3.5 text-[#E84511]" />
                <span>CUSTOM URL / PRESETS</span>
              </button>
            </div>

            {/* Tab 1: Upload File */}
            {activeTab === "upload" && (
              <div className="p-6 space-y-5">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#E2E2E2] hover:border-[#E84511] bg-[#F6F6F6] hover:bg-orange-50/20 p-8 text-center cursor-pointer transition-colors"
                >
                  {filePreview ? (
                    <div className="space-y-3">
                      <div className="w-28 h-28 mx-auto relative bg-[#111111] border border-black/10 overflow-hidden shadow">
                        <Image
                          src={filePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="text-xs font-mono font-bold text-[#111111]">
                        {selectedFile?.name}
                      </div>
                      <div className="text-[10px] text-[#8E8E8E]">
                        Click or drag to choose a different file
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-[#E84511] mx-auto" />
                      <div className="text-xs font-extrabold uppercase tracking-wider text-[#111111]">
                        CLICK TO BROWSE OR DRAG IMAGE HERE
                      </div>
                      <div className="text-[10px] text-[#8E8E8E]">
                        Supported formats: PNG, JPEG, WebP, SVG, GIF (Up to 10MB)
                      </div>
                    </div>
                  )}
                </div>

                {uploadError && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{uploadError}</span>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#8E8E8E] hover:text-[#111111] transition-colors cursor-pointer"
                  >
                    CANCEL
                  </button>

                  <button
                    type="button"
                    onClick={handleUploadSubmit}
                    disabled={!selectedFile || isUploading}
                    className="px-6 py-2.5 bg-[#E84511] hover:bg-[#D63B0B] text-white text-xs font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>UPLOADING...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>CONFIRM UPLOAD</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Custom URL & Presets */}
            {activeTab === "url" && (
              <div className="p-6 space-y-6">
                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-2">
                    IMAGE WEB URL / CDN PATH
                  </label>
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://... or /assets/..."
                    className="w-full bg-[#F6F6F6] border border-[#E2E2E2] focus:border-[#E84511] text-xs font-mono px-3.5 py-3 outline-none transition-colors"
                  />
                </div>

                {/* Quick Presets */}
                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#8E8E8E] block mb-2.5">
                    QUICK DEFAULT ASSET PRESETS
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PRESET_ASSETS.map((preset) => (
                      <button
                        key={preset.path}
                        type="button"
                        onClick={() => setUrlInput(preset.path)}
                        className={cn(
                          "flex items-center gap-2.5 p-2.5 text-left border text-xs transition-colors cursor-pointer",
                          urlInput === preset.path
                            ? "bg-[#111111] text-white border-[#111111]"
                            : "bg-[#F6F6F6] text-[#111111] border-[#E2E2E2] hover:border-[#111111]"
                        )}
                      >
                        <div className="w-8 h-8 relative bg-black shrink-0 overflow-hidden">
                          <Image
                            src={preset.path}
                            alt={preset.label}
                            fill
                            className="object-cover"
                            sizes="32px"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-extrabold uppercase text-[10px] truncate">
                            {preset.label}
                          </div>
                          <div className="text-[9px] font-mono text-[#8E8E8E] truncate">
                            {preset.path}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#8E8E8E] hover:text-[#111111] transition-colors cursor-pointer"
                  >
                    CANCEL
                  </button>

                  <button
                    type="button"
                    onClick={handleUrlSubmit}
                    disabled={!urlInput.trim()}
                    className="px-6 py-2.5 bg-[#E84511] hover:bg-[#D63B0B] text-white text-xs font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>APPLY SELECTION</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

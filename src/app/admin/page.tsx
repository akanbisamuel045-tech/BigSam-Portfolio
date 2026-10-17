"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, ExternalLink, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { GadexLogo } from "@/components/ui/GadexLogo";
import { GridCrosshair } from "@/components/ui/GridCrosshair";

export default function AdminPage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/auth", {
        method: "DELETE",
      });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#111111] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none max-w-[1600px] mx-auto border-x border-white/[0.04] grid grid-cols-4 z-0">
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="h-full" />
      </div>

      {/* Ambient Orange Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E84511]/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Top Header Bar */}
      <header className="w-full max-w-[1600px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between border-b border-white/[0.06] relative z-20">
        <div className="flex items-center gap-6">
          <GadexLogo variant="dark" size="sm" />
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SESSION ACTIVE • AUTHENTICATED</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-bold uppercase tracking-widest text-[#8E8E8E] hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>LIVE SITE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 border border-white/10 cursor-pointer disabled:opacity-50"
          >
            <LogOut className="w-3.5 h-3.5 text-[#E84511]" />
            <span>{isLoggingOut ? "LOGGING OUT..." : "LOG OUT"}</span>
          </button>
        </div>
      </header>

      {/* Center Stage 3 Verification Card */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 relative z-20">
        <div className="w-full max-w-2xl bg-[#1A1A1A] border border-white/10 p-8 md:p-12 shadow-2xl relative">
          {/* Corner Crosshairs */}
          <GridCrosshair position="top-left" variant="dark" />
          <GridCrosshair position="top-right" variant="dark" />
          <GridCrosshair position="bottom-left" variant="dark" />
          <GridCrosshair position="bottom-right" variant="dark" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E84511]/10 border border-[#E84511]/30 rounded-full text-[10px] font-extrabold tracking-widest uppercase text-[#E84511] mb-5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ADMIN STAGE 3 • SECURITY GATE VERIFIED</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white mb-4 font-display">
            STAGE 3 AUTHENTICATED — GADEX® ADMIN CONTROL CENTER UNLOCKED
          </h1>

          <p className="text-sm text-[#8E8E8E] mb-8 leading-relaxed">
            Stateless cookie session authentication, Next.js Edge middleware route protection, and mutating API authorization gates are operating seamlessly.
          </p>

          {/* Feature Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-[#111111] border border-white/5 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Cookie Session Security
                </h4>
                <p className="text-[11px] text-[#8E8E8E] mt-0.5">
                  HTTP-Only signed cookie (7-day validity) with Web Crypto SHA-256.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#111111] border border-white/5 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Edge Route Protection
                </h4>
                <p className="text-[11px] text-[#8E8E8E] mt-0.5">
                  Unauthorized traffic to /admin redirected to /admin/login.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#111111] border border-white/5 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Mutating API Guard
                </h4>
                <p className="text-[11px] text-[#8E8E8E] mt-0.5">
                  PUT and POST /api/admin/content guarded by cookie or x-admin-key.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#111111] border border-white/5 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Clean Studio Isolation
                </h4>
                <p className="text-[11px] text-[#8E8E8E] mt-0.5">
                  Public Navbar, CtaBanner, and Footer hidden on /admin.
                </p>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/10">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 bg-[#E84511] hover:bg-[#D63B0B] text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>VIEW LIVE FRONTEND</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-white/10 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-[#E84511]" />
              <span>TEST LOGOUT CYCLE</span>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Architectural Security Footer */}
      <footer className="w-full max-w-[1600px] mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8E8E8E]/70 border-t border-white/[0.06] relative z-20">
        <div>GADEX® ARCHITECTURAL CMS • VERSION 2.0</div>
        <div className="font-mono text-[10px] mt-1 sm:mt-0 tracking-wider">
          AUTHENTICATED OPERATOR SESSION • ALL PRIVILEGES ACTIVE
        </div>
      </footer>
    </div>
  );
}

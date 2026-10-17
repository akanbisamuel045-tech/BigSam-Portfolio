"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, AlertCircle, Loader2 } from "lucide-react";
import { GadexLogo } from "@/components/ui/GadexLogo";
import { GridCrosshair } from "@/components/ui/GridCrosshair";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shakeCount, setShakeCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Successfully authenticated, navigate to admin dashboard
        router.push("/admin");
        router.refresh();
      } else {
        setError(result.error || "Invalid administrator passphrase.");
        setShakeCount((prev) => prev + 1);
      }
    } catch {
      setError("An unexpected network error occurred. Please try again.");
      setShakeCount((prev) => prev + 1);
    } finally {
      setIsLoading(false);
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

      {/* Ambient Orange Brand Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#E84511]/12 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Top Header Bar */}
      <header className="w-full max-w-[1600px] mx-auto px-6 md:px-10 py-6 flex items-center justify-between border-b border-white/[0.06] relative z-20">
        <GadexLogo variant="dark" size="sm" />
        <Link
          href="/"
          className="text-xs font-bold uppercase tracking-widest text-[#8E8E8E] hover:text-[#E84511] transition-colors flex items-center gap-1.5 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>BACK TO LIVE PORTFOLIO</span>
        </Link>
      </header>

      {/* Center Main Login Card */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 relative z-20">
        <motion.div
          key={shakeCount}
          animate={shakeCount > 0 ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-[#1A1A1A] border border-white/10 p-8 md:p-10 shadow-2xl relative"
        >
          {/* Architectural Corner Crosshairs */}
          <GridCrosshair position="top-left" variant="dark" />
          <GridCrosshair position="top-right" variant="dark" />
          <GridCrosshair position="bottom-left" variant="dark" />
          <GridCrosshair position="bottom-right" variant="dark" />

          {/* Micro Security Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full text-[10px] font-extrabold tracking-widest uppercase text-white/90 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E84511] animate-pulse" />
            <span>GADEX® • CMS SECURITY GATE</span>
          </div>

          {/* Headline & Subtitle */}
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white mb-2 font-display">
            ADMIN CONTROL
          </h1>
          <p className="text-xs text-[#8E8E8E] mb-6 leading-relaxed">
            Enter your administrator passphrase to unlock real-time portfolio editing.
          </p>

          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3.5 bg-red-950/70 border border-red-500/50 text-red-200 text-xs rounded-none mb-6"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-password"
                className="text-[10px] font-extrabold uppercase tracking-widest text-white/70 mb-2 block flex items-center justify-between"
              >
                <span>PASSPHRASE</span>
                <span className="text-white/30 text-[9px] font-mono">CONFIDENTIAL</span>
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator key..."
                  autoFocus
                  required
                  disabled={isLoading}
                  className="w-full bg-[#111111] border border-white/15 focus:border-[#E84511] focus:ring-1 focus:ring-[#E84511] text-white text-sm px-4 py-3.5 pr-12 rounded-none transition-colors outline-none font-mono placeholder:text-white/20 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide passphrase" : "Show passphrase"}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className="w-full bg-[#E84511] hover:bg-[#D63B0B] text-white font-extrabold uppercase tracking-wider text-xs py-4 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#E84511]/20 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-white/80 group-hover:scale-110 transition-transform" />
                  <span>UNLOCK ADMIN DASHBOARD</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </main>

      {/* Bottom Architectural Security Footer */}
      <footer className="w-full max-w-[1600px] mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8E8E8E]/70 border-t border-white/[0.06] relative z-20">
        <div>GADEX® ARCHITECTURAL CMS • VERSION 2.0</div>
        <div className="font-mono text-[10px] mt-1 sm:mt-0 tracking-wider">
          AES-256 ENCRYPTED SESSION GATEWAY
        </div>
      </footer>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { portfolioData } from "@/data/portfolioData";

export default function ContactPage() {
  const { personalInfo } = portfolioData;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !message) return;

    const fullMessage = `Hello ${personalInfo.displayName} (${personalInfo.brandName}),
My name is ${firstName} ${lastName}.
Email: ${email}

Project Inquiry:
${message}`;

    const waUrl = `https://wa.me/${personalInfo.phoneRaw}?text=${encodeURIComponent(
      fullMessage
    )}`;

    window.open(waUrl, "_blank");
    setSubmitted(true);
  };

  const contactCards = [
    {
      label: "Address:",
      value: personalInfo.location.toUpperCase(),
      subtext: "Accepting projects worldwide",
    },
    {
      label: "Open Hours:",
      value: "DAILY: 08 AM – 08 PM",
      subtext: personalInfo.officeHours,
    },
    {
      label: "Phone:",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phoneRaw}`,
      subtext: "WhatsApp & Direct Call",
    },
    {
      label: "Email:",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      subtext: "Inquiries & Consultations",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F6F6] text-[#111111] selection:bg-[#E84511] selection:text-white">
      {/* ============================================================== */}
      {/* SECTION 1: GIANT CONTACT ME HERO HEADER (01:37)                */}
      {/* ============================================================== */}
      <section className="w-full bg-[#F6F6F6] select-none">
        <div className="max-w-[1600px] mx-auto pt-14 md:pt-24 pb-12 md:pb-16 px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-[#111111] mb-2 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E84511] animate-pulse" />
              <span>{personalInfo.brandName}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2E2E2] pb-6 md:pb-8">
              <h1 className="text-[13.5vw] sm:text-[11.5vw] md:text-[9.5vw] font-display font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-[#111111]">
                CONTACT ME
              </h1>

              <div className="text-xs md:text-sm font-semibold font-mono pb-2 shrink-0">
                <span className="text-[#111111] font-bold">©{personalInfo.copyrightYear}</span>{" "}
                <span className="text-[#8E8E8E]">(Scroll to Explore)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: GET IN TOUCH & 2x2 INFO CARDS GRID (01:37-01:39)    */}
      {/* ============================================================== */}
      <section className="w-full bg-[#F6F6F6] pb-20 md:pb-28 px-6 md:px-10 select-none">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Heading & Booking Button */}
          <div className="lg:col-span-5 flex flex-col items-start pt-2">
            <div className="bg-[#EFEFEF] px-3.5 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider mb-5 inline-flex items-center gap-2 rounded-full border border-[#E2E2E2]">
              <Sparkles className="w-3.5 h-3.5 text-[#E84511] fill-[#E84511]" />
              <span>READY TO START?</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight leading-[1.0] text-[#111111] mb-8">
              GET IN <br />
              <span className="text-[#8E8E8E]">TOUCH</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#666666] leading-relaxed max-w-md font-normal mb-8">
              Whether you need a dedicated full-stack engineer for a new product, architectural consultation, or a fast-paced development sprint, I&#39;m here to help.
            </p>

            <ArrowButton
              text="BOOK A CALL"
              href={personalInfo.bookingUrl}
              external
              variant="dark"
            />
          </div>

          {/* Right Column: 2x2 Editorial Light-Gray Info Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {contactCards.map((card, idx) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#EFEFEF] hover:bg-white border border-transparent hover:border-[#E2E2E2] p-7 md:p-9 min-h-[210px] md:min-h-[240px] flex flex-col justify-between transition-all duration-300 rounded-sm shadow-2xs group"
              >
                <div className="space-y-1">
                  <span className="text-xs md:text-sm text-[#777777] font-mono font-medium block">
                    {card.label}
                  </span>
                  <span className="text-[11px] font-mono text-[#999999]">
                    {card.subtext}
                  </span>
                </div>

                <div className="pt-6">
                  {card.href ? (
                    <a
                      href={card.href}
                      className="text-base md:text-lg font-mono font-extrabold text-[#111111] group-hover:text-[#E84511] transition-colors break-all"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <span className="text-base md:text-lg font-display font-extrabold uppercase tracking-tight text-[#111111]">
                      {card.value}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: FULL-WIDTH DARK INTERACTIVE FORM (01:39-01:42)      */}
      {/* ============================================================== */}
      <section className="w-full bg-[#111111] text-white py-20 md:py-28 px-6 md:px-10 select-none">
        <div className="max-w-[1600px] mx-auto">
          {/* Top Dark Header */}
          <SectionHeader
            badge="HONORS & INQUIRIES"
            blackText={`${personalInfo.firstName}®`}
            grayText="DIRECT MESSAGE"
            theme="dark"
          />

          {/* Form Box */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6 }}
            className="mt-14 md:mt-20 bg-[#1A1A1A] border border-white/10 p-7 sm:p-10 md:p-14 max-w-[1100px] mx-auto rounded-sm shadow-2xl"
          >
            {submitted && (
              <div className="mb-8 p-4 rounded-sm bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-mono flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Thank you! Your direct consultation request is ready and opening in WhatsApp.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-white mb-2.5 block">
                    ©FIRST NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jane"
                    className="w-full bg-[#262626] border border-white/10 focus:border-[#E84511] text-white px-4 py-3.5 text-sm outline-none transition-colors rounded-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-white mb-2.5 block">
                    ©LAST NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Smith"
                    className="w-full bg-[#262626] border border-white/10 focus:border-[#E84511] text-white px-4 py-3.5 text-sm outline-none transition-colors rounded-xs"
                  />
                </div>
              </div>

              {/* Row 2: Email */}
              <div>
                <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-white mb-2.5 block">
                  ©EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="w-full bg-[#262626] border border-white/10 focus:border-[#E84511] text-white px-4 py-3.5 text-sm outline-none transition-colors rounded-xs"
                />
              </div>

              {/* Row 3: Message */}
              <div>
                <label className="text-xs font-mono font-extrabold uppercase tracking-wider text-white mb-2.5 block">
                  ©MESSAGE
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project, timeline, and goals..."
                  className="w-full bg-[#262626] border border-white/10 focus:border-[#E84511] text-white px-4 py-3.5 text-sm outline-none transition-colors resize-none rounded-xs leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <ArrowButton
                  text={submitted ? "MESSAGE DISPATCHED" : "SUBMIT NOW"}
                  type="submit"
                  variant="dark"
                />
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: MOUNT SHARED FAQ ACCORDION (01:42-01:44)             */}
      {/* ============================================================== */}
      <FaqAccordion />

      {/* ============================================================== */}
      {/* SECTION 5: PRE-FOOTER CTA BANNER                                */}
      {/* ============================================================== */}
      <CtaBanner />
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Compass,
  ShieldCheck,
  Sparkles,
  Terminal,
  Radio,
  TrendingUp,
  Globe2,
  ChevronRight,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenApisExplorer: () => void;
}

const BREAKING_HEADLINES = [
  { category: "Geo Politics", text: "Global semiconductor corridors trigger historic alliance shifts between US, EU & Asia." },
  { category: "Tech & AI", text: "Autonomous coding intelligence and multi-modal models reshape software engineering." },
  { category: "Crypto & Web3", text: "Institutional ETF capital inflows surpass $50B amidst macro decentralized surge." },
  { category: "Science & Space", text: "Deep space telemetry and quantum communication networks achieve record coherence." },
];

export default function HeroSection({
  onExploreClick,
  onOpenApisExplorer,
}: HeroSectionProps) {
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % BREAKING_HEADLINES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full relative z-10 flex flex-col justify-between pt-8 sm:pt-14 pb-12 sm:pb-20 overflow-hidden">
      {/* Radiant Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-[#D4A853]/15 via-[#0066FF]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Breaking Intelligence Ticker Bar */}
      <div className="max-w-4xl mx-auto px-4 w-full mb-6 sm:mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-xl shadow-lg"
        >
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4A853]/20 border border-[#D4A853]/40 text-[#D4A853] text-[10px] font-bold uppercase tracking-wider font-mono">
            <Radio className="w-2.5 h-2.5 animate-pulse" />
            <span>Live Dispatch</span>
          </div>

          <div className="flex-1 overflow-hidden h-5 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={headlineIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="text-xs text-white/80 truncate flex items-center gap-2"
              >
                <span className="font-semibold text-[#D4A853] hidden sm:inline">
                  [{BREAKING_HEADLINES[headlineIndex].category}]
                </span>
                <span className="truncate">{BREAKING_HEADLINES[headlineIndex].text}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <Link
            href="/stories"
            className="text-[11px] font-medium text-white/50 hover:text-[#D4A853] transition-colors flex items-center gap-0.5 whitespace-nowrap"
          >
            <span>View All</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </motion.div>
      </div>

      {/* Central Hero Content */}
      <div className="w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
        {/* Eyebrow Pill Tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 sm:mb-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4A853]/15 via-white/[0.06] to-[#D4A853]/15 border border-[#D4A853]/30 backdrop-blur-2xl text-white text-xs font-semibold uppercase tracking-widest shadow-[0_0_20px_rgba(212,168,83,0.15)]"
          id="hero-tagline"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4A853]" />
          <span>Independent Journal of High Intelligence</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] animate-ping" />
        </motion.div>

        {/* 3-line Majestic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-[38px] sm:text-[54px] md:text-[68px] lg:text-[76px] font-medium leading-[1.05] tracking-[-0.035em] max-w-4xl mx-auto select-none"
          id="hero-main-title"
        >
          <span className="block">
            Decipher <span className="font-serif-luxury italic font-normal bg-gradient-to-r from-white via-white/95 to-white/70 bg-clip-text text-transparent">Power.</span>
          </span>
          <span className="block">
            Navigate <span className="font-serif-luxury italic font-normal bg-gradient-to-r from-[#D4A853] via-[#E8D5A3] to-[#C4943F] bg-clip-text text-transparent">Innovation.</span>
          </span>
          <span className="block">
            Zero <span className="font-serif-luxury italic font-normal text-white/90 underline decoration-[#D4A853]/40 underline-offset-8">Distortions.</span>
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 sm:mt-7 text-sm sm:text-base md:text-lg text-white/70 font-normal leading-relaxed max-w-xl sm:max-w-2xl mx-auto select-none px-4"
          id="hero-subtitle"
        >
          Uncompromising geopolitical analysis, software engineering monographs, and macro market intelligence. Sourced continuously from open public APIs and published without algorithmic bias.
        </motion.p>

        {/* Interactive Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl w-full px-2"
        >
          <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl text-center">
            <span className="block text-xl sm:text-2xl font-bold font-mono text-[#D4A853]">500+</span>
            <span className="text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider">Curated Articles</span>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl text-center">
            <span className="block text-xl sm:text-2xl font-bold font-mono text-emerald-400">12+</span>
            <span className="text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider">Open API Sources</span>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl text-center">
            <span className="block text-xl sm:text-2xl font-bold font-mono text-[#E8D5A3]">0%</span>
            <span className="text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider">Paywalls or Ads</span>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl text-center">
            <span className="block text-xl sm:text-2xl font-bold font-mono text-cyan-400">99.9%</span>
            <span className="text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider">Telemetry Uptime</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onExploreClick}
            id="hero-cta-button"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#D4A853] via-[#E8D5A3] to-[#C4943F] text-black pl-6 pr-2 py-2 rounded-full font-semibold text-xs sm:text-sm shadow-[0_10px_30px_rgba(212,168,83,0.3)] hover:shadow-[0_15px_40px_rgba(212,168,83,0.5)] hover:brightness-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span className="font-semibold tracking-tight text-black">
              Explore Live Feeds
            </span>
            <span
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-[#D4A853] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 group-hover:scale-105 shadow-md"
              aria-hidden="true"
            >
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </span>
          </button>

          <button
            onClick={onOpenApisExplorer}
            id="hero-api-button"
            className="inline-flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.14] border border-white/[0.15] hover:border-[#D4A853]/40 text-white px-6 py-3 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer active:scale-95 backdrop-blur-2xl shadow-lg"
          >
            <Terminal className="w-4 h-4 text-[#D4A853]" />
            <span>Public APIs Directory</span>
          </button>

          <Link
            href="/category/current-affairs"
            className="inline-flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-white/80 hover:text-white px-5 py-3 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Latest News</span>
          </Link>
        </motion.div>
      </div>

      {/* Hero Bottom Symmetrical Luxury Split Cards */}
      <div className="w-full px-6 sm:px-10 md:px-14 pb-4 sm:pb-6 pt-14 sm:pt-20 z-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 max-w-6xl mx-auto justify-between items-end">
          {/* Left Split Card */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#0A0A0E]/80 hover:bg-[#0A0A0E] backdrop-blur-2xl border border-white/[0.1] hover:border-[#D4A853]/40 rounded-[24px] p-6 transition-all duration-500 shadow-2xl relative overflow-hidden group w-full md:w-auto md:max-w-[360px]"
            id="card-open-apis"
          >
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#D4A853]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D4A853]/20 transition-colors" />
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4A853]/20 to-white/10 border border-[#D4A853]/30 flex items-center justify-center mb-4 shadow-sm">
              <Globe2 className="w-5 h-5 text-[#D4A853]" />
            </div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-[17px] font-semibold text-white tracking-tight">
                Decentralized Data Ingestion
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                100% Free
              </span>
            </div>
            <p className="text-[13px] text-white/65 font-normal leading-relaxed">
              Continuous live syndication from verified GitHub Public APIs, Dev.to communities, and HackerNews with zero paywalls.
            </p>
          </motion.div>

          {/* Right Split Card */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#0A0A0E]/80 hover:bg-[#0A0A0E] backdrop-blur-2xl border border-white/[0.1] hover:border-[#D4A853]/40 rounded-[24px] p-6 transition-all duration-500 shadow-2xl relative overflow-hidden group w-full md:w-auto md:max-w-[360px] md:ml-auto"
            id="card-zero-noise"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#D4A853]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D4A853]/20 transition-colors" />
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4A853]/20 to-white/10 border border-[#D4A853]/30 flex items-center justify-center mb-4 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-[#D4A853]" />
            </div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-[17px] font-semibold text-white tracking-tight">
                Sovereign Editorial Rigor
              </h3>
              <span className="text-[10px] font-mono text-[#D4A853] bg-[#D4A853]/10 px-2 py-0.5 rounded-full border border-[#D4A853]/20">
                Ad-Free
              </span>
            </div>
            <p className="text-[13px] text-white/65 font-normal leading-relaxed">
              Kinematic Swiss typography, tactile micro-animations, and GSAP physical mass engineered for deep cognitive absorption.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

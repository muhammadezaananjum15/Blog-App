"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass, ShieldCheck, Sparkles, Terminal } from "lucide-react";

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenApisExplorer: () => void;
}

export default function HeroSection({
  onExploreClick,
  onOpenApisExplorer,
}: HeroSectionProps) {
  return (
    <div className="w-full relative z-10 flex flex-col justify-between pt-10 sm:pt-16 pb-12 sm:pb-16">
      {/* Central Hero Content */}
      <div className="w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
        {/* Eyebrow Pill Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3.5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-xl text-white/80 text-xs font-medium uppercase tracking-wider"
          id="hero-tagline"
        >
          <Compass className="w-3.5 h-3.5 text-[#0066FF]" />
          <span>The Next-Generation Editorial Feed</span>
        </motion.div>

        {/* 3-line Hero Title with Luxury Serif Italic Words */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-[34px] sm:text-[46px] md:text-[58px] lg:text-[66px] font-medium leading-[1.08] tracking-[-0.03em] max-w-3xl mx-auto select-none"
          id="hero-main-title"
        >
          <span className="block">
            Discover <span className="font-serif-luxury italic font-normal text-white/95">Intelligence.</span>
          </span>
          <span className="block">
            Read <span className="font-serif-luxury italic font-normal text-white/95">Deeper.</span>
          </span>
          <span className="block">
            With <span className="font-serif-luxury italic font-normal text-[#0066FF]">Precision.</span>
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-[15px] text-white/75 font-normal leading-relaxed max-w-sm sm:max-w-md mx-auto select-none px-4"
          id="hero-subtitle"
        >
          Curated journalism, breaking technological shifts, and deep-dive design essays delivered with pure clarity and zero noise. Powered directly by open public APIs.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={onExploreClick}
            id="hero-cta-button"
            className="group relative inline-flex items-center gap-3 bg-white text-black pl-5 pr-1.5 py-1.5 rounded-full font-medium text-xs sm:text-sm shadow-xl hover:bg-neutral-100 hover:shadow-2xl transition-all duration-200 cursor-pointer active:scale-95"
          >
            <span className="font-medium tracking-tight text-black">
              Explore Live Feeds
            </span>
            <span
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0066FF] flex items-center justify-center text-white transition-transform duration-300 group-hover:rotate-45 group-hover:scale-105 shadow-sm"
              aria-hidden="true"
            >
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
          </button>

          <button
            onClick={onOpenApisExplorer}
            id="hero-api-button"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white px-5 py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer active:scale-95 backdrop-blur-xl"
          >
            <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Public APIs Directory</span>
          </button>
        </motion.div>
      </div>

      {/* Hero Bottom Symmetrical Split Cards (DA matching travel-agency-seven-red) */}
      <div className="w-full px-6 sm:px-10 md:px-14 pb-4 sm:pb-6 pt-12 sm:pt-16 z-10">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 max-w-6xl mx-auto justify-between items-end">
          {/* Left Split Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-2xl border border-white/15 rounded-[22px] p-5 sm:p-5.5 transition-all duration-300 shadow-2xl relative overflow-hidden group w-full md:w-auto md:max-w-[340px]"
            id="card-open-apis"
          >
            <div className="absolute -top-20 -left-20 w-36 h-36 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:bg-white/10 transition-colors" />
            <div className="w-8 h-8 rounded-lg bg-white/95 flex items-center justify-center mb-3 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#0066FF]" />
            </div>
            <h3 className="text-[16px] sm:text-[17px] font-medium text-white tracking-tight mb-1.5">
              Decentralized Public Data
            </h3>
            <p className="text-[12.5px] sm:text-[13px] text-white/70 font-normal leading-relaxed">
              Real-time streams harvested from GitHub Public-APIs, Dev.to, and HackerNews with zero censorship or algorithmic distortions.
            </p>
          </motion.div>

          {/* Right Split Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-2xl border border-white/15 rounded-[22px] p-5 sm:p-5.5 transition-all duration-300 shadow-2xl relative overflow-hidden group w-full md:w-auto md:max-w-[340px] md:ml-auto"
            id="card-zero-noise"
          >
            <div className="absolute -top-20 -right-20 w-36 h-36 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:bg-white/10 transition-colors" />
            <div className="w-8 h-8 rounded-lg bg-white/95 flex items-center justify-center mb-3 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
            </div>
            <h3 className="text-[16px] sm:text-[17px] font-medium text-white tracking-tight mb-1.5">
              Uncompromising Aesthetics
            </h3>
            <p className="text-[12.5px] sm:text-[13px] text-white/70 font-normal leading-relaxed">
              Kinematic micro-animations, GSAP scroll physics, and editorial Swiss typography engineered for deep cognitive immersion.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

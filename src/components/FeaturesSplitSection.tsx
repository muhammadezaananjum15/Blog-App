"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Radio,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe2,
  Terminal,
} from "lucide-react";

export default function FeaturesSplitSection() {
  const leftFeatures = [
    {
      id: "curated-feeds",
      icon: <Compass className="w-4 h-4 text-[#0066FF]" />,
      title: "Curated Open Telemetry",
      description:
        "Continuous streaming from GitHub Public-APIs, Dev.to, and HackerNews normalized into unified editorial schemas.",
    },
    {
      id: "zero-algorithmic-bias",
      icon: <Radio className="w-4 h-4 text-[#0066FF]" />,
      title: "Zero Algorithmic Distortion",
      description:
        "No opaque engagement algorithms or artificial rage farming. Content is ranked strictly by intellectual substance.",
    },
  ];

  const rightFeatures = [
    {
      id: "tactile-physics",
      icon: <Sparkles className="w-4 h-4 text-[#0066FF]" />,
      title: "Kinematic GSAP Physics",
      description:
        "Silky 60fps spring transitions, hardware-accelerated transforms, and canvas particle interpolation.",
    },
    {
      id: "verified-integrity",
      icon: <ShieldCheck className="w-4 h-4 text-[#0066FF]" />,
      title: "Decentralized Open Source",
      description:
        "Built with Next.js 16, TypeScript, and open APIs. Transparent, privacy-first, and completely open.",
    },
  ];

  return (
    <section
      id="features-split-section"
      className="w-full bg-transparent text-white relative py-20 sm:py-28 px-6 sm:px-10 md:px-14 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column (2 Cards) */}
          <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6">
            {leftFeatures.map((feat, idx) => (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * idx,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-2xl border border-white/15 rounded-[22px] p-5 sm:p-6 transition-all duration-300 shadow-2xl relative overflow-hidden group"
                id={`split-card-${feat.id}`}
              >
                <div className="absolute -top-20 -left-20 w-36 h-36 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:bg-white/10 transition-colors" />
                <div className="w-8 h-8 rounded-lg bg-white/95 flex items-center justify-center mb-3.5 shadow-sm">
                  {feat.icon}
                </div>
                <h3 className="text-[16px] sm:text-[17px] font-medium text-white tracking-tight mb-1.5">
                  {feat.title}
                </h3>
                <p className="text-[12.5px] sm:text-[13px] text-white/70 font-normal leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Center Visual: Holographic Orbital Node */}
          <div
            id="center-visual-node"
            className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center min-h-[380px] w-full select-none relative"
          >
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-[spin_20s_linear_infinite]" />
              {/* Inner glowing ring */}
              <div className="absolute inset-6 rounded-full border border-white/15 animate-[spin_12s_linear_infinite_reverse]" />
              {/* Center orb with radial glow */}
              <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-[#0066FF]/40 to-[#FF5500]/20 backdrop-blur-xl border border-white/25 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,102,255,0.4)]">
                <Globe2 className="w-10 h-10 text-white animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/90 mt-2">
                  LUMIÈRE
                </span>
                <span className="text-[8px] text-white/50 tracking-wider">
                  NODE v16.3
                </span>
              </div>
            </div>
            <p className="text-xs text-white/50 uppercase tracking-widest font-mono mt-4">
              Real-time Ingestion Matrix
            </p>
          </div>

          {/* Right Column (2 Cards) */}
          <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6">
            {rightFeatures.map((feat, idx) => (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * idx,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-2xl border border-white/15 rounded-[22px] p-5 sm:p-6 transition-all duration-300 shadow-2xl relative overflow-hidden group"
                id={`split-card-${feat.id}`}
              >
                <div className="absolute -top-20 -right-20 w-36 h-36 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:bg-white/10 transition-colors" />
                <div className="w-8 h-8 rounded-lg bg-white/95 flex items-center justify-center mb-3.5 shadow-sm">
                  {feat.icon}
                </div>
                <h3 className="text-[16px] sm:text-[17px] font-medium text-white tracking-tight mb-1.5">
                  {feat.title}
                </h3>
                <p className="text-[12.5px] sm:text-[13px] text-white/70 font-normal leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Globe, Database, Cpu, Radio, Sparkles } from "lucide-react";

export default function TrustedSourcesMarquee() {
  const sources = [
    {
      id: "devto",
      name: "Dev.to Open API",
      category: "COMMUNITY",
      icon: <Code2 className="w-6 h-6 text-white" />,
      sub: "API V1",
    },
    {
      id: "hackernews",
      name: "Hacker News",
      category: "FIREBASE FEED",
      icon: <Radio className="w-6 h-6 text-[#FF5500]" />,
      sub: "OFFICIAL",
    },
    {
      id: "github",
      name: "GitHub Public-APIs",
      category: "COLLECTIVE",
      icon: <Database className="w-6 h-6 text-white" />,
      sub: "REGISTRY",
    },
    {
      id: "arxiv",
      name: "arXiv Open Science",
      category: "PREPRINTS",
      icon: <Cpu className="w-6 h-6 text-[#0066FF]" />,
      sub: "RESEARCH",
    },
    {
      id: "nasa",
      name: "NASA Open Data",
      category: "ASTRONOMY",
      icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
      sub: "TELEMETRY",
    },
  ];

  return (
    <section
      id="trusted-sources-section"
      className="w-full bg-transparent text-white relative overflow-hidden py-24 sm:py-32 px-4 sm:px-8 border-t border-white/10"
    >
      {/* Background Ambient Radial Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] sm:w-[700px] h-[340px] rounded-full pointer-events-none opacity-85 blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 102, 255, 0.22) 0%, rgba(255, 85, 0, 0.12) 40%, rgba(60, 100, 200, 0.06) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl select-none"
        >
          <h2 className="text-[34px] sm:text-[48px] md:text-[58px] lg:text-[64px] leading-[1.08] tracking-[-0.02em] font-normal text-white">
            <span
              className="block font-serif-luxury italic font-normal tracking-[-0.01em]"
            >
              Proudly Aggregated
            </span>
            <span className="block font-serif-luxury italic font-normal tracking-tight text-white/95 mt-0.5">
              from Open Intelligence & Public APIs
            </span>
            <span className="inline-flex items-baseline font-serif-luxury italic font-normal tracking-tight text-white/95 mt-0.5">
              Across the Globe
              <sup className="text-sm sm:text-base md:text-lg font-bold text-[#E53935] ml-1 not-italic select-none">
                ®
              </sup>
            </span>
          </h2>

          <div className="mt-5 sm:mt-7 text-xs sm:text-sm text-white/75 font-normal leading-relaxed max-w-sm sm:max-w-md mx-auto">
            <p className="font-serif-luxury italic text-white/90 text-xs sm:text-sm font-normal mb-0.5">
              We connect directly with verified open endpoints
            </p>
            <p className="text-white/70">
              to deliver unfiltered developer journals, breaking research,
            </p>
            <p className="text-white/70">
              and high-fidelity design essays in real time.
            </p>
          </div>
        </motion.div>

        {/* Elegant Thin Divider */}
        <div className="w-full max-w-4xl mt-14 sm:mt-20 mb-8 sm:mb-10 border-t border-white/10" />

        {/* Source Badges Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center justify-items-center"
        >
          {sources.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer group p-2 hover:scale-105"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                {item.icon}
              </div>
              <div className="text-center leading-none mt-1">
                <span className="block text-[11px] font-bold tracking-wider text-white uppercase">
                  {item.name}
                </span>
                <span className="block text-[8px] tracking-widest text-white/45 uppercase mt-0.5">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

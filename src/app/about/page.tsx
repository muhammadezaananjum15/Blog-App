"use client";

import React, { useState } from "react";
import CosmicCanvas from "@/components/CosmicCanvas";
import MagneticCursor from "@/components/MagneticCursor";
import HeaderNav from "@/components/HeaderNav";
import NewsletterModal from "@/components/NewsletterModal";
import PublicApisExplorerModal from "@/components/PublicApisExplorerModal";
import FooterSection from "@/components/FooterSection";
import { Sparkles, Compass, Shield, ArrowUpRight, Cpu, Globe2, Radio, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isApisExplorerOpen, setIsApisExplorerOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-transparent text-white relative selection:bg-[#D4A853] selection:text-black">
      <CosmicCanvas />
      <MagneticCursor />

      <HeaderNav
        bookmarkCount={0}
        onOpenApisExplorer={() => setIsApisExplorerOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* Hero */}
      <div className="pt-24 sm:pt-36 pb-16 px-6 sm:px-12 md:px-16 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4A853]/15 border border-[#D4A853]/30 text-[#D4A853] text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>The Content Hub Editorial Manifesto</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.08]"
        >
          In Pursuit of <span className="font-serif-luxury italic text-[#D4A853]">Depth</span> Over Noise.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-base sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          Content Hub was founded on a singular premise: digital publishing has sacrificed contemplative rigor in pursuit of ephemeral engagement algorithms. We build open software and write essays that restore intellectual dignity.
        </motion.p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 sm:p-10 rounded-[30px] bg-[#0A0A0E]/90 border border-white/15 relative overflow-hidden group shadow-2xl backdrop-blur-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#D4A853]/20 border border-[#D4A853]/40 flex items-center justify-center text-[#D4A853] mb-6 shadow-md">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Open Public Data
            </h3>
            <p className="text-sm text-white/65 leading-relaxed">
              We drink from open fountains. Sourcing metadata directly from verified GitHub public APIs, our publications remain decentralized and immune to corporate spin.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-[30px] bg-[#0A0A0E]/90 border border-white/15 relative overflow-hidden group shadow-2xl backdrop-blur-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#D4A853]/20 border border-[#D4A853]/40 flex items-center justify-center text-[#D4A853] mb-6 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Kinematic Craft
            </h3>
            <p className="text-sm text-white/65 leading-relaxed">
              Interfaces should feel alive. With GSAP physics, Framer Motion spring dampening, and bespoke typography, every pixel moves with intentional physical mass.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-[30px] bg-[#0A0A0E]/90 border border-white/15 relative overflow-hidden group shadow-2xl backdrop-blur-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 shadow-md">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Zero Synthetic Outrage
            </h3>
            <p className="text-sm text-white/65 leading-relaxed">
              No tracking surveillance, no intrusive popup banners, no artificial urgency. Only deep essays, elegant code monographs, and architectural contemplation.
            </p>
          </div>
        </div>

        {/* Manifesto Quote Box */}
        <div className="mt-16 p-8 sm:p-14 rounded-[36px] bg-gradient-to-r from-[#D4A853]/15 via-[#0A0A0E] to-[#D4A853]/10 border border-[#D4A853]/30 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4A853]/10 rounded-full blur-3xl pointer-events-none" />

          <blockquote className="font-serif-luxury italic text-2xl sm:text-3xl md:text-4xl text-white/95 leading-relaxed max-w-3xl mx-auto">
            “To design an interface with beauty and restraint is an act of deep respect for human attention.”
          </blockquote>
          <p className="mt-6 text-xs uppercase tracking-widest text-[#D4A853] font-mono font-semibold">
            — CONTENT HUB EDITORIAL COLLECTIVE
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A853] to-[#C4943F] text-black px-7 py-3.5 rounded-full text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-xl shadow-[#D4A853]/20"
            >
              <span>Explore The Archive</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] text-white px-6 py-3.5 rounded-full text-xs font-semibold transition-all cursor-pointer"
            >
              <span>Pitch an Article</span>
            </Link>
          </div>
        </div>
      </div>

      <FooterSection
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onOpenApisExplorer={() => setIsApisExplorerOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      <PublicApisExplorerModal
        isOpen={isApisExplorerOpen}
        onClose={() => setIsApisExplorerOpen(false)}
      />

      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />
    </div>
  );
}

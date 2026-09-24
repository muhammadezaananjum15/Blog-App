"use client";

import React, { useState } from "react";
import CosmicCanvas from "@/components/CosmicCanvas";
import MagneticCursor from "@/components/MagneticCursor";
import HeaderNav from "@/components/HeaderNav";
import NavigationDrawer from "@/components/NavigationDrawer";
import NewsletterModal from "@/components/NewsletterModal";
import PublicApisExplorerModal from "@/components/PublicApisExplorerModal";
import FooterSection from "@/components/FooterSection";
import { NavItem } from "@/lib/types";
import { Sparkles, Compass, Shield, Heart, ArrowUpRight, Cpu } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isApisExplorerOpen, setIsApisExplorerOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: "home", label: "Home" },
    { id: "feeds", label: "Stories" },
    { id: "pillars", label: "Editorial" },
    { id: "curators", label: "Curators" },
    { id: "bookmarks", label: "Saved" },
  ];

  return (
    <div className="w-full min-h-screen bg-transparent text-white relative selection:bg-white selection:text-black">
      <CosmicCanvas />
      <MagneticCursor />

      <HeaderNav
        navItems={navItems}
        activeNav="pillars"
        onSelectNav={(id) => {
          if (id === "home") window.location.href = "/";
          else window.location.href = `/stories`;
        }}
        onOpenMenu={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        bookmarkCount={0}
        onOpenApisExplorer={() => setIsApisExplorerOpen(true)}
      />

      {/* Hero */}
      <div className="pt-16 sm:pt-24 pb-16 px-6 sm:px-12 md:px-16 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/15 text-white/90 text-xs font-medium mb-6">
          <Compass className="w-3.5 h-3.5 text-[#0066FF]" />
          <span>The Lumière Editorial Manifesto</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.08]">
          In Pursuit of <span className="font-serif-luxury italic text-[#0066FF]">Substance</span> Over Noise.
        </h1>

        <p className="text-base sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Lumière was founded on a singular premise: modern digital media has sacrificed contemplative rigor in pursuit of ephemeral engagement algorithms. We build software and write essays that push back.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-[30px] bg-[#0A0A0D] border border-white/15 relative overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-[#0066FF]/20 border border-[#0066FF] flex items-center justify-center text-[#0066FF] mb-6">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-3">
              Open Public Data
            </h3>
            <p className="text-sm text-white/65 leading-relaxed">
              We drink from open fountains. By sourcing telemetry directly from verified GitHub public APIs, our publications remain decentralized and immune to corporate spin.
            </p>
          </div>

          <div className="p-8 rounded-[30px] bg-[#0A0A0D] border border-white/15 relative overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-[#FF5500]/20 border border-[#FF5500] flex items-center justify-center text-[#FF5500] mb-6">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-3">
              Kinematic Craft
            </h3>
            <p className="text-sm text-white/65 leading-relaxed">
              Interfaces should feel alive. With GSAP ScrollTrigger pinning and Framer Motion spring dampening, every pixel moves with intentional physical mass.
            </p>
          </div>

          <div className="p-8 rounded-[30px] bg-[#0A0A0D] border border-white/15 relative overflow-hidden group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mb-6">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-3">
              Zero Synthetic Outrage
            </h3>
            <p className="text-sm text-white/65 leading-relaxed">
              No tracking surveillance, no intrusive popup banners, no artificial urgency. Only deep essays, elegant code monographs, and architectural contemplation.
            </p>
          </div>
        </div>

        {/* Manifesto Quote Box */}
        <div className="mt-16 p-8 sm:p-12 rounded-[32px] bg-gradient-to-r from-blue-900/20 via-black to-orange-950/20 border border-white/20 text-center">
          <blockquote className="font-serif-luxury italic text-2xl sm:text-3xl md:text-4xl text-white/95 leading-relaxed max-w-3xl mx-auto">
            “To design an interface with beauty and restraint is an act of deep respect for human attention.”
          </blockquote>
          <p className="mt-6 text-xs uppercase tracking-widest text-[#0066FF] font-mono">
            — LUMIÈRE EDITORIAL COLLECTIVE, 2026
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-xs font-semibold hover:bg-neutral-200 transition-all cursor-pointer shadow-lg"
            >
              <span>Explore The Archive</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <FooterSection
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onOpenApisExplorer={() => setIsApisExplorerOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
        activeNav="pillars"
        onSelectNav={(id) => {
          if (id === "home") window.location.href = "/";
          else window.location.href = `/stories`;
        }}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
        onOpenApisExplorer={() => setIsApisExplorerOpen(true)}
        bookmarkCount={0}
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

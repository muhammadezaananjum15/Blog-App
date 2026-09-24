"use client";

import React from "react";
import { ArrowUp, Sparkles, Radio, Shield, ExternalLink, Mail } from "lucide-react";
import Link from "next/link";
import ContentHubLogo from "@/components/ContentHubLogo";

export interface FooterSectionProps {
  onScrollToTop?: () => void;
  onOpenApisExplorer?: () => void;
  onOpenNewsletter?: () => void;
}

export default function FooterSection({
  onScrollToTop,
  onOpenApisExplorer,
  onOpenNewsletter,
}: FooterSectionProps) {
  const handleScrollTop = () => {
    if (onScrollToTop) {
      onScrollToTop();
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#050505] text-white border-t border-white/[0.08] relative z-10 pt-20 pb-14 px-6 sm:px-12 md:px-16 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-[#D4A853]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-16 border-b border-white/[0.08] items-start">
          {/* Brand & Editorial Mission */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-block hover:opacity-95 transition-opacity">
              <ContentHubLogo size={36} />
            </Link>
            <p className="text-xs sm:text-[13px] text-white/60 leading-relaxed max-w-sm mt-3">
              An independent, ultra-premium editorial platform delivering real-time intelligence across current affairs, geopolitics, AI technologies, crypto markets, and cultural philosophy. Powered directly by open public APIs.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Connected • Dev.to & GitHub APIs</span>
              </div>
            </div>
          </div>

          {/* Editorial Channels */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-[11px] uppercase tracking-widest text-[#D4A853] font-semibold">
              Channels
            </p>
            <ul className="space-y-2.5 text-xs text-white/65">
              <li><Link href="/category/current-affairs" className="hover:text-[#D4A853] transition-colors premium-underline">Current Affairs</Link></li>
              <li><Link href="/category/geo-politics" className="hover:text-[#D4A853] transition-colors premium-underline">Geo Politics</Link></li>
              <li><Link href="/category/tech-ai" className="hover:text-[#D4A853] transition-colors premium-underline">Tech & AI</Link></li>
              <li><Link href="/category/crypto" className="hover:text-[#D4A853] transition-colors premium-underline">Crypto & Web3</Link></li>
              <li><Link href="/category/science" className="hover:text-[#D4A853] transition-colors premium-underline">Science & Space</Link></li>
              <li><Link href="/category/finance" className="hover:text-[#D4A853] transition-colors premium-underline">Finance & Markets</Link></li>
            </ul>
          </div>

          {/* Lifestyle & Thought */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-[11px] uppercase tracking-widest text-[#D4A853] font-semibold">
              Perspectives
            </p>
            <ul className="space-y-2.5 text-xs text-white/65">
              <li><Link href="/category/startups" className="hover:text-[#D4A853] transition-colors premium-underline">Startups & Business</Link></li>
              <li><Link href="/category/design" className="hover:text-[#D4A853] transition-colors premium-underline">Design & UI</Link></li>
              <li><Link href="/category/health" className="hover:text-[#D4A853] transition-colors premium-underline">Health & Wellness</Link></li>
              <li><Link href="/category/culture" className="hover:text-[#D4A853] transition-colors premium-underline">Culture & Ideas</Link></li>
              <li><Link href="/stories" className="hover:text-[#D4A853] transition-colors premium-underline">Full Archive</Link></li>
              <li><Link href="/explore-apis" className="hover:text-[#D4A853] transition-colors premium-underline">Open APIs Directory</Link></li>
            </ul>
          </div>

          {/* Organization */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-[11px] uppercase tracking-widest text-[#D4A853] font-semibold">
              The Collective
            </p>
            <ul className="space-y-2.5 text-xs text-white/65">
              <li><Link href="/about" className="hover:text-[#D4A853] transition-colors premium-underline">Editorial Manifesto</Link></li>
              <li><Link href="/jobs" className="hover:text-[#D4A853] transition-colors premium-underline">Careers & Fellowships</Link></li>
              <li><Link href="/contact" className="hover:text-[#D4A853] transition-colors premium-underline">Press & Contact</Link></li>
              <li><Link href="/disclaimer" className="hover:text-[#D4A853] transition-colors premium-underline">Editorial Ethics & Terms</Link></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-2 space-y-3.5">
            <p className="text-[11px] uppercase tracking-widest text-[#D4A853] font-semibold">
              Weekly Dispatch
            </p>
            <p className="text-[11px] text-white/55 leading-relaxed">
              Curated intelligence briefing delivered directly to your inbox every Sunday morning.
            </p>
            {onOpenNewsletter ? (
              <button
                onClick={onOpenNewsletter}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#C4943F] text-black text-[12px] font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg shadow-[#D4A853]/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Subscribe Free</span>
              </button>
            ) : (
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#C4943F] text-black text-[12px] font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg shadow-[#D4A853]/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Subscribe Free</span>
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Content Hub Editorial Collective. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/disclaimer" className="hover:text-[#D4A853] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/disclaimer" className="hover:text-[#D4A853] transition-colors">
              Terms of Use
            </Link>
            <Link href="/disclaimer" className="hover:text-[#D4A853] transition-colors">
              API Provenance
            </Link>

            <button
              onClick={handleScrollTop}
              className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-[#D4A853] hover:text-black border border-white/[0.1] flex items-center justify-center text-white/70 transition-all cursor-pointer active:scale-90 shadow-md"
              title="Return to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

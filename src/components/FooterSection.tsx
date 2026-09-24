"use client";

import React from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import Link from "next/link";
import ContentHubLogo from "@/components/ContentHubLogo";

export default function FooterSection() {
  return (
    <footer className="w-full bg-[#050505] text-white border-t border-white/[0.08] relative z-10 pt-16 pb-12 px-6 sm:px-12 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08] items-start">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <ContentHubLogo size={32} />
            <p className="text-xs text-white/55 leading-relaxed max-w-sm mt-3">
              An independent, premium editorial platform delivering real-time intelligence across current affairs, geopolitics, technology, crypto markets, and cultural analysis. Powered by open public APIs.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-white/45">
                Live • Connected to Dev.to Open API
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-[11px] uppercase tracking-widest text-[#D4A853]/60 font-semibold">
              Categories
            </p>
            <ul className="space-y-2 text-xs text-white/60">
              <li><Link href="/category/current-affairs" className="hover:text-[#D4A853] transition-colors premium-underline">Current Affairs</Link></li>
              <li><Link href="/category/geo-politics" className="hover:text-[#D4A853] transition-colors premium-underline">Geo Politics</Link></li>
              <li><Link href="/category/tech-ai" className="hover:text-[#D4A853] transition-colors premium-underline">Tech & AI</Link></li>
              <li><Link href="/category/crypto" className="hover:text-[#D4A853] transition-colors premium-underline">Crypto & Web3</Link></li>
              <li><Link href="/category/science" className="hover:text-[#D4A853] transition-colors premium-underline">Science & Space</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <p className="text-[11px] uppercase tracking-widest text-[#D4A853]/60 font-semibold">
              More
            </p>
            <ul className="space-y-2 text-xs text-white/60">
              <li><Link href="/category/finance" className="hover:text-[#D4A853] transition-colors premium-underline">Finance & Markets</Link></li>
              <li><Link href="/category/health" className="hover:text-[#D4A853] transition-colors premium-underline">Health & Wellness</Link></li>
              <li><Link href="/category/startups" className="hover:text-[#D4A853] transition-colors premium-underline">Startups & Business</Link></li>
              <li><Link href="/category/design" className="hover:text-[#D4A853] transition-colors premium-underline">Design & UI</Link></li>
              <li><Link href="/category/culture" className="hover:text-[#D4A853] transition-colors premium-underline">Culture & Ideas</Link></li>
            </ul>
          </div>

          {/* Pages / Company */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-[11px] uppercase tracking-widest text-[#D4A853]/60 font-semibold">
              Company
            </p>
            <ul className="space-y-2 text-xs text-white/60">
              <li><Link href="/about" className="hover:text-[#D4A853] transition-colors premium-underline">About</Link></li>
              <li><Link href="/contact" className="hover:text-[#D4A853] transition-colors premium-underline">Contact</Link></li>
              <li><Link href="/jobs" className="hover:text-[#D4A853] transition-colors premium-underline">Careers</Link></li>
              <li><Link href="/disclaimer" className="hover:text-[#D4A853] transition-colors premium-underline">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-[11px] uppercase tracking-widest text-[#D4A853]/60 font-semibold">
              Stay Informed
            </p>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Receive our weekly intelligence briefing directly in your inbox.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#C4943F] text-black text-[11px] font-semibold hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-[#D4A853]/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Subscribe</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/35">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Content Hub. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/disclaimer" className="hover:text-[#D4A853] transition-colors">
              Privacy
            </Link>
            <Link href="/disclaimer" className="hover:text-[#D4A853] transition-colors">
              Terms
            </Link>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-[#D4A853]/20 border border-white/[0.1] hover:border-[#D4A853]/30 flex items-center justify-center text-white/60 hover:text-[#D4A853] transition-all cursor-pointer"
              title="Return to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

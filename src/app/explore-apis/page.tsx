"use client";

import React, { useState, useEffect } from "react";
import CosmicCanvas from "@/components/CosmicCanvas";
import MagneticCursor from "@/components/MagneticCursor";
import HeaderNav from "@/components/HeaderNav";
import NavigationDrawer from "@/components/NavigationDrawer";
import NewsletterModal from "@/components/NewsletterModal";
import FooterSection from "@/components/FooterSection";
import { PublicApiEntry, NavItem } from "@/lib/types";
import {
  Terminal,
  Search,
  ExternalLink,
  Shield,
  Lock,
  Globe,
  Database,
  RefreshCw,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function ExploreApisPage() {
  const [apis, setApis] = useState<PublicApiEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: "home", label: "Home" },
    { id: "feeds", label: "Stories" },
    { id: "pillars", label: "Editorial" },
    { id: "curators", label: "Curators" },
    { id: "bookmarks", label: "Saved" },
  ];

  const categories = [
    "all",
    "Development",
    "News",
    "Science",
    "Open Intelligence",
    "Design",
    "Weather",
  ];

  const fetchApis = async (cat = selectedCategory, q = search) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/public-apis?category=${encodeURIComponent(cat)}&search=${encodeURIComponent(q)}`
      );
      if (res.ok) {
        const data = await res.json();
        setApis(data.entries || []);
      }
    } catch {}
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApis(selectedCategory, search);
  }, [selectedCategory]);

  return (
    <div className="w-full min-h-screen bg-transparent text-white relative selection:bg-white selection:text-black">
      <CosmicCanvas />
      <MagneticCursor />

      <HeaderNav
        navItems={navItems}
        activeNav="open"
        onSelectNav={(id) => {
          if (id === "home") window.location.href = "/";
          else window.location.href = `/stories`;
        }}
        onOpenMenu={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        bookmarkCount={0}
        onOpenApisExplorer={() => {}}
      />

      {/* Hero */}
      <div className="pt-12 sm:pt-16 pb-8 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/15 text-white/90 text-xs font-medium mb-4">
          <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
          <span>Powered by github.com/public-apis</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-4">
          Open Public APIs <span className="font-serif-luxury italic text-[#0066FF]">Registry</span>
        </h1>
        <p className="text-sm sm:text-base text-white/65 max-w-xl mx-auto leading-relaxed">
          The definitive index of free public APIs for software engineers, journalists, and decentralized data architects.
        </p>

        {/* Telemetry Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mt-10">
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
            <span className="block text-2xl sm:text-3xl font-bold font-mono text-white">
              {apis.length}+
            </span>
            <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">
              APIs Indexed
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
            <span className="block text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
              100%
            </span>
            <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">
              Free Access
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
            <span className="block text-2xl sm:text-3xl font-bold font-mono text-[#0066FF]">
              98.4%
            </span>
            <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">
              HTTPS Verified
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
            <span className="block text-2xl sm:text-3xl font-bold font-mono text-[#FF5500]">
              Zero
            </span>
            <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">
              Subscription Fees
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 mb-10">
        <div className="p-5 rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-xl space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search APIs by protocol, keywords, or description..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  fetchApis(selectedCategory, e.target.value);
                }}
                className="w-full bg-white/5 border border-white/15 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <button
              onClick={() => fetchApis(selectedCategory, search)}
              className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all cursor-pointer whitespace-nowrap"
            >
              Filter APIs
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#0066FF] text-white shadow-md font-semibold"
                    : "bg-white/5 text-white/70 hover:text-white border border-white/10"
                }`}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* API Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pb-24">
        {loading ? (
          <div className="py-24 text-center flex flex-col items-center justify-center text-white/50 text-xs">
            <RefreshCw className="w-8 h-8 animate-spin text-[#0066FF] mb-3" />
            <span className="font-mono">Syncing with github.com/public-apis...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apis.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[24px] bg-[#0A0A0D] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-[0_15px_30px_rgba(0,102,255,0.1)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/15">
                      {item.category}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>

                  <h3 className="text-lg font-semibold text-white group-hover:text-[#0066FF] transition-colors mb-2">
                    {item.api}
                  </h3>

                  <p className="text-xs text-white/65 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* Security specs */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-t border-white/10 text-[10px] font-mono text-white/60 mb-4">
                    <div>
                      <span className="block text-white/40">Auth</span>
                      <span className="text-white font-medium">{item.auth || "None"}</span>
                    </div>
                    <div>
                      <span className="block text-white/40">HTTPS</span>
                      <span className="text-emerald-400 font-medium">
                        {item.https ? "Verified" : "No"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-white/40">CORS</span>
                      <span className="text-white font-medium">{item.cors || "Yes"}</span>
                    </div>
                  </div>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Visit Documentation</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FooterSection
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onOpenApisExplorer={() => {}}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
        activeNav="open"
        onSelectNav={(id) => {
          if (id === "home") window.location.href = "/";
          else window.location.href = `/stories`;
        }}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
        onOpenApisExplorer={() => {}}
        bookmarkCount={0}
      />

      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />
    </div>
  );
}

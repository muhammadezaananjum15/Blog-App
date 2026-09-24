"use client";

import React, { useState, useEffect } from "react";
import CosmicCanvas from "@/components/CosmicCanvas";
import MagneticCursor from "@/components/MagneticCursor";
import HeaderNav from "@/components/HeaderNav";
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
import { motion } from "framer-motion";

export default function ExploreApisPage() {
  const [apis, setApis] = useState<PublicApiEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  const categories = [
    "all",
    "Development",
    "News",
    "Science",
    "Open Intelligence",
    "Design",
    "Weather",
    "Finance",
    "Cryptocurrency",
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
    <div className="w-full min-h-screen bg-transparent text-white relative selection:bg-[#D4A853] selection:text-black">
      <CosmicCanvas />
      <MagneticCursor />

      <HeaderNav
        bookmarkCount={0}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* Hero */}
      <div className="pt-24 sm:pt-36 pb-10 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4A853]/15 border border-[#D4A853]/30 text-[#D4A853] text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Decentralized Public APIs Registry</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.08]"
        >
          Open Public APIs <span className="font-serif-luxury italic text-[#D4A853]">Registry.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          The definitive, searchable index of free public APIs for software engineers, independent journalists, and decentralized data architects.
        </motion.p>

        {/* Telemetry Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mt-10">
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-center backdrop-blur-xl">
            <span className="block text-2xl sm:text-3xl font-bold font-mono text-[#D4A853]">
              {apis.length > 0 ? `${apis.length}+` : "140+"}
            </span>
            <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">
              APIs Indexed
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-center backdrop-blur-xl">
            <span className="block text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
              100%
            </span>
            <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">
              Free & Open
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-center backdrop-blur-xl">
            <span className="block text-2xl sm:text-3xl font-bold font-mono text-cyan-400">
              99.2%
            </span>
            <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">
              HTTPS Verified
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-center backdrop-blur-xl">
            <span className="block text-2xl sm:text-3xl font-bold font-mono text-[#E8D5A3]">
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
        <div className="p-5 rounded-3xl bg-[#0A0A0E]/90 border border-white/[0.12] backdrop-blur-2xl space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search APIs by protocol, keywords, or endpoints..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  fetchApis(selectedCategory, e.target.value);
                }}
                className="w-full bg-white/[0.05] border border-white/[0.12] rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D4A853] transition-colors"
              />
            </div>

            <button
              onClick={() => fetchApis(selectedCategory, search)}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4A853] to-[#C4943F] text-black text-xs font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap shadow-lg shadow-[#D4A853]/20"
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
                    ? "bg-gradient-to-r from-[#D4A853] to-[#C4943F] text-black font-semibold shadow-md"
                    : "bg-white/[0.04] text-white/70 hover:text-white border border-white/[0.08]"
                }`}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* API Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pb-28">
        {loading ? (
          <div className="py-24 text-center flex flex-col items-center justify-center text-white/50 text-xs">
            <RefreshCw className="w-8 h-8 animate-spin text-[#D4A853] mb-3" />
            <span className="font-mono">Syncing with github.com/public-apis...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apis.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.4) }}
                className="p-6 rounded-[24px] bg-[#0A0A0E]/80 hover:bg-[#0A0A0E] border border-white/[0.08] hover:border-[#D4A853]/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-[0_15px_30px_rgba(212,168,83,0.1)] backdrop-blur-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#D4A853]/15 text-[#D4A853] border border-[#D4A853]/25 uppercase">
                      {item.category}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <h3 className="text-lg font-semibold text-white group-hover:text-[#D4A853] transition-colors mb-2">
                    {item.api}
                  </h3>

                  <p className="text-xs text-white/65 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* Security specs */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-t border-white/[0.08] text-[10px] font-mono text-white/60 mb-4">
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
                    className="w-full py-2.5 rounded-full bg-white/[0.08] hover:bg-[#D4A853] text-white hover:text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shadow-md border border-white/[0.1] hover:border-[#D4A853]"
                  >
                    <span>Visit Documentation</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <FooterSection
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />
    </div>
  );
}

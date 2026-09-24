"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  ExternalLink,
  Shield,
  Lock,
  Globe,
  Database,
  Terminal,
  RefreshCw,
} from "lucide-react";
import { PublicApiEntry } from "@/lib/types";

interface PublicApisExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PublicApisExplorerModal({
  isOpen,
  onClose,
}: PublicApisExplorerModalProps) {
  const [apis, setApis] = useState<PublicApiEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    "all",
    "Development",
    "News",
    "Science",
    "Open Intelligence",
    "Design",
    "Weather",
  ];

  useEffect(() => {
    if (isOpen && apis.length === 0) {
      fetchApis();
    }
  }, [isOpen]);

  const fetchApis = async (cat = activeCategory, q = search) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/public-apis?category=${encodeURIComponent(cat)}&search=${encodeURIComponent(q)}`
      );
      if (res.ok) {
        const data = await res.json();
        setApis(data.entries || []);
      }
    } catch {
      // Keep existing
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    fetchApis(cat, search);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchApis(activeCategory, search);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative w-full max-w-4xl h-[88vh] bg-[#0C0C0C] border border-white/20 rounded-[28px] p-6 sm:p-8 shadow-2xl flex flex-col z-10 text-white overflow-hidden"
            id="public-apis-modal"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0066FF]/20 border border-[#0066FF] flex items-center justify-center text-[#0066FF]">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span>Public APIs Directory</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 font-mono">
                      github.com/public-apis
                    </span>
                  </h3>
                  <p className="text-xs text-white/60">
                    Live curated collection of free public APIs for blogs, telemetry, and open software.
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="py-4 space-y-3">
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search APIs by name, category, or description..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all cursor-pointer shadow-sm"
                >
                  Search
                </button>
              </form>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      activeCategory === cat
                        ? "bg-[#0066FF] text-white"
                        : "bg-white/5 text-white/70 hover:text-white border border-white/10"
                    }`}
                  >
                    {cat === "all" ? "All APIs" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* APIs List */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3 mt-2">
              {loading ? (
                <div className="py-20 text-center flex flex-col items-center justify-center text-white/50 text-xs">
                  <RefreshCw className="w-6 h-6 animate-spin text-[#0066FF] mb-2" />
                  <span>Syncing with GitHub Public APIs...</span>
                </div>
              ) : apis.length === 0 ? (
                <div className="py-20 text-center text-white/50 text-xs">
                  No public APIs found matching your criteria.
                </div>
              ) : (
                apis.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-white group-hover:text-[#0066FF] transition-colors">
                          {item.api}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-white/70">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {item.description}
                      </p>
                      {/* Security & Access Badges */}
                      <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px] text-white/50 font-mono">
                        <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10">
                          Auth: {item.auth || "None"}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10">
                          HTTPS: {item.https ? "✓ Enabled" : "✗ No"}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10">
                          CORS: {item.cors}
                        </span>
                      </div>
                    </div>

                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium transition-all whitespace-nowrap cursor-pointer"
                    >
                      <span>Documentation</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40 mt-4">
              <span>{apis.length} APIs available in registry</span>
              <a
                href="https://github.com/public-apis/public-apis"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline inline-flex items-center gap-1"
              >
                <span>View on GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

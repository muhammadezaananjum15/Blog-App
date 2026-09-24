"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Sparkles, Terminal, Bookmark, Radio } from "lucide-react";
import { NavItem } from "@/lib/types";

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  activeNav: string;
  onSelectNav: (id: string) => void;
  onOpenNewsletter: () => void;
  onOpenApisExplorer: () => void;
  bookmarkCount: number;
}

export default function NavigationDrawer({
  isOpen,
  onClose,
  navItems,
  activeNav,
  onSelectNav,
  onOpenNewsletter,
  onOpenApisExplorer,
  bookmarkCount,
}: NavigationDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
          />

          {/* Sliding drawer panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[460px] bg-[#0A0A0A] border-l border-white/15 p-6 sm:p-10 z-50 flex flex-col justify-between overflow-y-auto"
            id="menu-drawer-panel"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-8 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-2xl tracking-tight uppercase">
                    LUMIÈRE
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="mt-8 flex flex-col gap-2">
                <p className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-2">
                  Navigation & Feeds
                </p>
                {navItems.map((item) => {
                  const isActive = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectNav(item.id);
                        onClose();
                      }}
                      className={`flex items-center justify-between p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-white text-black font-semibold shadow-md"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.id === "bookmarks" && (
                          <Bookmark className={`w-4 h-4 ${isActive ? "text-black" : "text-[#0066FF]"}`} />
                        )}
                        <span className="text-lg">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.id === "bookmarks" && bookmarkCount > 0 && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                              isActive ? "bg-black text-white" : "bg-white/20 text-white"
                            }`}
                          >
                            {bookmarkCount}
                          </span>
                        )}
                        <ChevronRight
                          className={`w-4 h-4 ${isActive ? "text-black" : "text-white/40"}`}
                        />
                      </div>
                    </button>
                  );
                })}

                {/* Direct Public APIs Directory link */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenApisExplorer();
                  }}
                  className="flex items-center justify-between p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer text-white/80 hover:text-white hover:bg-white/10 border border-white/10 mt-2 group"
                >
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-[#FF5500] group-hover:rotate-12 transition-transform" />
                    <span className="text-lg">Public APIs Explorer</span>
                  </div>
                  <Sparkles className="w-4 h-4 text-white/40 group-hover:text-white" />
                </button>
              </nav>

              {/* Status & Live Telemetry Card */}
              <div className="mt-8 p-5 rounded-2xl bg-white/[0.05] border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-[#0066FF] animate-pulse" />
                    <p className="text-xs uppercase tracking-wider font-semibold text-white/80">
                      Live Telemetry
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Online 99.9%
                  </span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Aggregating from GitHub Public APIs, Dev.to, and Hacker News. Real-time updates every 180s.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-8 border-t border-white/10 mt-6">
              <button
                onClick={() => {
                  onClose();
                  onOpenNewsletter();
                }}
                className="w-full bg-white hover:bg-neutral-200 text-black py-3.5 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Subscribe to Dispatch</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="mt-4 flex items-center justify-between text-xs text-white/40">
                <span>© {new Date().getFullYear()} LUMIÈRE JOURNAL</span>
                <span>Open Intelligence</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

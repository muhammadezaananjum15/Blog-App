"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bookmark, ChevronDown, Sparkles, Terminal, ArrowUpRight, Radio } from "lucide-react";
import Link from "next/link";
import ContentHubLogo from "@/components/ContentHubLogo";
import { NavItem } from "@/lib/types";

export interface HeaderNavProps {
  bookmarkCount?: number;
  navItems?: NavItem[];
  activeNav?: string;
  onSelectNav?: (id: string) => void;
  onOpenMenu?: () => void;
  isMenuOpen?: boolean;
  onOpenApisExplorer?: () => void;
  onOpenNewsletter?: () => void;
}

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

interface NavLink {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "News & Politics",
    dropdown: [
      { label: "Current Affairs", href: "/category/current-affairs", description: "Breaking news & global developments", badge: "Live" },
      { label: "Geo Politics", href: "/category/geo-politics", description: "International relations & strategy" },
      { label: "Finance & Markets", href: "/category/finance", description: "Global macroeconomics & trends" },
    ],
  },
  {
    label: "Tech & Innovation",
    dropdown: [
      { label: "Tech & AI", href: "/category/tech-ai", description: "Machine learning, LLMs & software", badge: "Trending" },
      { label: "Crypto & Web3", href: "/category/crypto", description: "DeFi, blockchains & tokenomics" },
      { label: "Science & Space", href: "/category/science", description: "Space exploration & quantum physics" },
      { label: "Startups & Business", href: "/category/startups", description: "Venture capital & founder playbooks" },
    ],
  },
  {
    label: "Lifestyle & Culture",
    dropdown: [
      { label: "Design & UI", href: "/category/design", description: "Kinematic aesthetics & interaction" },
      { label: "Health & Wellness", href: "/category/health", description: "Bio-hacking & mental longevity" },
      { label: "Culture & Ideas", href: "/category/culture", description: "Essays on the modern zeitgeist" },
    ],
  },
  { label: "Stories Archive", href: "/stories" },
  { label: "Explore APIs", href: "/explore-apis" },
  { label: "Careers", href: "/jobs" },
  { label: "About", href: "/about" },
];

export default function HeaderNav({
  bookmarkCount = 0,
  navItems,
  activeNav,
  onSelectNav,
  onOpenMenu,
  isMenuOpen: controlledMenuOpen,
  onOpenApisExplorer,
  onOpenNewsletter,
}: HeaderNavProps) {
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const isMenuOpen = controlledMenuOpen !== undefined ? controlledMenuOpen : internalMenuOpen;
  const toggleMenu = () => {
    if (onOpenMenu) {
      onOpenMenu();
    } else {
      setInternalMenuOpen(!internalMenuOpen);
    }
  };

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 180);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050505]/90 backdrop-blur-2xl border-b border-white/[0.09] shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-2.5"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="flex items-center justify-between h-12 sm:h-14" ref={dropdownRef}>
            {/* Brand Logo with Glowing Hover */}
            <Link
              href="/"
              className="flex items-center group transition-transform duration-300 hover:scale-[1.02] active:scale-95"
            >
              <ContentHubLogo size={32} />
            </Link>

            {/* Desktop Navigation with Dynamic Glass Dropdowns */}
            <nav className="hidden xl:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-full border border-white/[0.08] backdrop-blur-xl shadow-inner" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown && handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.href ? (
                    <Link
                      href={link.href}
                      className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-white/75 hover:text-white hover:bg-white/[0.08] transition-all duration-200 flex items-center gap-1 select-none"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer select-none ${
                        activeDropdown === link.label
                          ? "bg-white/[0.12] text-[#D4A853]"
                          : "text-white/75 hover:text-white hover:bg-white/[0.08]"
                      }`}
                      onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          activeDropdown === link.label ? "rotate-180 text-[#D4A853]" : "text-white/50"
                        }`}
                      />
                    </button>
                  )}

                  {/* Dropdown Panel */}
                  <AnimatePresence>
                    {link.dropdown && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-0 mt-2 w-[310px] bg-[#0A0A0E]/95 backdrop-blur-3xl border border-white/[0.12] rounded-2xl p-2.5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)] z-50 overflow-hidden"
                        onMouseEnter={() => link.dropdown && handleMouseEnter(link.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-[#D4A853]/5 to-transparent pointer-events-none" />
                        <div className="relative space-y-1">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="flex flex-col p-3 rounded-xl hover:bg-white/[0.07] border border-transparent hover:border-white/[0.06] transition-all duration-200 group"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[13px] font-semibold text-white group-hover:text-[#D4A853] transition-colors">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#D4A853]/20 text-[#D4A853] border border-[#D4A853]/30">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              {item.description && (
                                <span className="text-[11px] text-white/50 mt-1 leading-relaxed">
                                  {item.description}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Quick Actions */}
            <div className="flex items-center gap-3">
              {/* Telemetry live beacon */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>API Live</span>
              </div>

              {/* Bookmark Indicator */}
              {bookmarkCount > 0 && (
                <Link
                  href="/stories?category=bookmarks"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4A853]/15 border border-[#D4A853]/30 text-[#D4A853] text-xs font-medium hover:bg-[#D4A853]/25 transition-all"
                  title="View Saved Bookmarks"
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                  <span className="font-mono font-bold">{bookmarkCount}</span>
                </Link>
              )}

              {/* Contact Button (desktop) */}
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-black bg-gradient-to-r from-[#D4A853] via-[#E8D5A3] to-[#C4943F] shadow-lg shadow-[#D4A853]/20 hover:brightness-110 active:scale-95 transition-all duration-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Pitch Story</span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={toggleMenu}
                className="xl:hidden w-10 h-10 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] flex items-center justify-center text-white transition-all cursor-pointer active:scale-95 shadow-md"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X className="w-5 h-5 text-[#D4A853]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Full Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 xl:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#0A0A0E] border-l border-white/[0.12] z-50 overflow-y-auto p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                  <ContentHubLogo size={30} />
                  <button
                    onClick={toggleMenu}
                    className="w-10 h-10 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] flex items-center justify-center text-white cursor-pointer active:scale-90 transition-all"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="mt-6 space-y-1.5">
                  <p className="text-[11px] uppercase tracking-widest text-[#D4A853]/70 font-semibold mb-3">
                    Editorial Channels & Pages
                  </p>

                  {NAV_LINKS.map((link) => (
                    <div key={link.label}>
                      {link.href ? (
                        <Link
                          href={link.href}
                          onClick={() => setInternalMenuOpen(false)}
                          className="flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium text-white/85 hover:text-white hover:bg-white/[0.08] transition-all"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="w-4 h-4 text-white/30" />
                        </Link>
                      ) : (
                        <>
                          <button
                            onClick={() =>
                              setMobileExpanded(mobileExpanded === link.label ? null : link.label)
                            }
                            className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium text-white/85 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                          >
                            <span>{link.label}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                mobileExpanded === link.label ? "rotate-180 text-[#D4A853]" : "text-white/40"
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {mobileExpanded === link.label && link.dropdown && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden bg-white/[0.02] rounded-xl my-1"
                              >
                                <div className="pl-4 py-1.5 space-y-1">
                                  {link.dropdown.map((item) => (
                                    <Link
                                      key={item.label}
                                      href={item.href}
                                      onClick={() => setInternalMenuOpen(false)}
                                      className="flex flex-col px-4 py-2.5 rounded-lg text-sm text-white/70 hover:text-[#D4A853] hover:bg-white/[0.06] transition-all"
                                    >
                                      <span className="font-medium text-[13px]">{item.label}</span>
                                      {item.description && (
                                        <span className="text-[11px] text-white/40 mt-0.5">
                                          {item.description}
                                        </span>
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </div>
                  ))}

                  {/* Direct Contact & Legal Links */}
                  <div className="pt-4 mt-4 border-t border-white/[0.08] space-y-2">
                    <Link
                      href="/contact"
                      onClick={() => setInternalMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3.5 rounded-xl text-[14px] font-semibold text-black bg-gradient-to-r from-[#D4A853] to-[#C4943F] shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Pitch an Intelligence Story</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href="/disclaimer"
                      onClick={() => setInternalMenuOpen(false)}
                      className="flex items-center px-4 py-2.5 rounded-xl text-xs text-white/50 hover:text-white hover:bg-white/[0.04] transition-all"
                    >
                      Editorial Ethics & Data Provenance
                    </Link>
                  </div>
                </nav>
              </div>

              {/* Bottom Card */}
              <div className="mt-8 pt-4 border-t border-white/[0.08]">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#D4A853]/10 via-white/[0.02] to-transparent border border-[#D4A853]/20">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#D4A853] mb-1">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    <span>Live Public API Telemetry</span>
                  </div>
                  <p className="text-[11px] text-white/60 leading-relaxed">
                    Connected to open public API registries. Real-time news streams with zero paywalls.
                  </p>
                </div>
                <div className="mt-4 text-center text-[11px] text-white/30">
                  © {new Date().getFullYear()} Content Hub. All rights reserved.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

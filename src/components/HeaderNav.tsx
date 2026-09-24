"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bookmark, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import ContentHubLogo from "@/components/ContentHubLogo";

interface HeaderNavProps {
  bookmarkCount?: number;
}

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
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
      { label: "Current Affairs", href: "/category/current-affairs", description: "Breaking news & global events" },
      { label: "Geo Politics", href: "/category/geo-politics", description: "International relations & diplomacy" },
      { label: "Finance & Markets", href: "/category/finance", description: "Global markets & economics" },
    ],
  },
  {
    label: "Tech & Innovation",
    dropdown: [
      { label: "Tech & AI", href: "/category/tech-ai", description: "AI, software & digital innovation" },
      { label: "Crypto & Web3", href: "/category/crypto", description: "Blockchain, DeFi & digital assets" },
      { label: "Science & Space", href: "/category/science", description: "Research frontiers & space exploration" },
      { label: "Startups & Business", href: "/category/startups", description: "Entrepreneurship & venture capital" },
    ],
  },
  {
    label: "Lifestyle",
    dropdown: [
      { label: "Design & UI", href: "/category/design", description: "Interface design & visual aesthetics" },
      { label: "Health & Wellness", href: "/category/health", description: "Medical advances & wellness" },
      { label: "Culture & Ideas", href: "/category/culture", description: "Philosophy, art & the zeitgeist" },
    ],
  },
  { label: "Jobs", href: "/jobs" },
  { label: "About", href: "/about" },
];

export default function HeaderNav({ bookmarkCount = 0 }: HeaderNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
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
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050505]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14">
          <div className="flex items-center justify-between h-16 sm:h-[72px]" ref={dropdownRef}>
            {/* Brand Logo */}
            <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
              <ContentHubLogo size={30} />
            </Link>

            {/* Desktop Navigation with Dropdowns */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
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
                      className="px-3.5 py-2 rounded-lg text-[13px] font-medium text-white/75 hover:text-white hover:bg-white/[0.06] transition-all duration-200 flex items-center gap-1"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      className="px-3.5 py-2 rounded-lg text-[13px] font-medium text-white/75 hover:text-white hover:bg-white/[0.06] transition-all duration-200 flex items-center gap-1 cursor-pointer"
                      onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}

                  {/* Dropdown Panel */}
                  <AnimatePresence>
                    {link.dropdown && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-0 mt-1 w-[280px] bg-[#0D0D10]/95 backdrop-blur-2xl border border-white/[0.1] rounded-2xl p-2 shadow-2xl z-50"
                        onMouseEnter={() => link.dropdown && handleMouseEnter(link.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="flex flex-col px-3.5 py-2.5 rounded-xl hover:bg-white/[0.06] transition-all duration-150 group"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="text-[13px] font-medium text-white group-hover:text-[#D4A853] transition-colors">
                              {item.label}
                            </span>
                            {item.description && (
                              <span className="text-[11px] text-white/40 mt-0.5">
                                {item.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2.5">
              {/* Contact Link (desktop) */}
              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-[#D4A853] border border-[#D4A853]/30 hover:bg-[#D4A853]/10 transition-all duration-200"
              >
                <Sparkles className="w-3 h-3" />
                Contact
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0A0A0C] border-l border-white/[0.1] z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                  <ContentHubLogo size={28} />
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Nav Items */}
                <nav className="mt-6 space-y-1">
                  {NAV_LINKS.map((link) => (
                    <div key={link.label}>
                      {link.href ? (
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center px-4 py-3.5 rounded-xl text-[15px] font-medium text-white/80 hover:text-white hover:bg-white/[0.06] transition-all"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <>
                          <button
                            onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                            className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium text-white/80 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
                          >
                            {link.label}
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                mobileExpanded === link.label ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {mobileExpanded === link.label && link.dropdown && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 py-1 space-y-0.5">
                                  {link.dropdown.map((item) => (
                                    <Link
                                      key={item.label}
                                      href={item.href}
                                      onClick={() => setIsMenuOpen(false)}
                                      className="flex flex-col px-4 py-2.5 rounded-lg text-sm text-white/60 hover:text-[#D4A853] hover:bg-white/[0.04] transition-all"
                                    >
                                      <span className="font-medium">{item.label}</span>
                                      {item.description && (
                                        <span className="text-[11px] text-white/35 mt-0.5">{item.description}</span>
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

                  {/* Extra mobile links */}
                  <div className="pt-4 mt-4 border-t border-white/[0.08] space-y-1">
                    <Link
                      href="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-3.5 rounded-xl text-[15px] font-medium text-[#D4A853] hover:bg-[#D4A853]/10 transition-all"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Contact Us
                    </Link>
                    <Link
                      href="/disclaimer"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-3.5 rounded-xl text-[15px] font-medium text-white/50 hover:text-white/70 hover:bg-white/[0.04] transition-all"
                    >
                      Disclaimer
                    </Link>
                  </div>
                </nav>

                {/* Bottom */}
                <div className="mt-8 p-4 rounded-2xl glass-gold">
                  <p className="text-xs text-[#D4A853]/70 font-medium mb-1">Content Hub Premium</p>
                  <p className="text-[11px] text-white/50 leading-relaxed">
                    Real-time intelligence powered by open public APIs. Zero editorial compromise.
                  </p>
                </div>

                <div className="mt-6 text-center text-[11px] text-white/30">
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

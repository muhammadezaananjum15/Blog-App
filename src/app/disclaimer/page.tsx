"use client";

import React, { useState } from "react";
import CosmicCanvas from "@/components/CosmicCanvas";
import MagneticCursor from "@/components/MagneticCursor";
import HeaderNav from "@/components/HeaderNav";
import FooterSection from "@/components/FooterSection";
import NewsletterModal from "@/components/NewsletterModal";
import PublicApisExplorerModal from "@/components/PublicApisExplorerModal";
import {
  Shield,
  FileText,
  Lock,
  Database,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DisclaimerPage() {
  const [activeTab, setActiveTab] = useState<"ethics" | "provenance" | "privacy" | "terms">("ethics");
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isApisExplorerOpen, setIsApisExplorerOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-transparent text-white relative selection:bg-[#D4A853] selection:text-black">
      <CosmicCanvas />
      <MagneticCursor />

      <HeaderNav
        onOpenApisExplorer={() => setIsApisExplorerOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* Hero Header */}
      <div className="pt-24 sm:pt-32 pb-10 px-6 sm:px-12 md:px-16 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4A853]/15 border border-[#D4A853]/30 text-[#D4A853] text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Governance, Provenance & Legal Telemetry</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.08]"
        >
          Editorial Ethics & <span className="font-serif-luxury italic text-[#D4A853]">Standards.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          Complete transparency regarding our public API data pipelines, syndication rights, zero-tracking privacy architecture, and editorial independence.
        </motion.p>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-5xl mx-auto px-6 sm:px-12 md:px-16 mb-12">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {[
            { id: "ethics", label: "Editorial Ethics", icon: Shield },
            { id: "provenance", label: "Public API Provenance", icon: Database },
            { id: "privacy", label: "Zero-Tracking Privacy", icon: Lock },
            { id: "terms", label: "Terms of Service", icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#D4A853] to-[#C4943F] text-black shadow-lg shadow-[#D4A853]/20"
                    : "bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-5xl mx-auto px-6 sm:px-12 md:px-16 pb-28">
        <div className="p-8 sm:p-12 rounded-[32px] bg-[#0A0A0E]/90 border border-white/[0.12] backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          {activeTab === "ethics" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-sm text-white/80 leading-relaxed">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Editorial Independence & Fact Verification</h2>
              <p>
                Content Hub operates as a non-partisan, sovereign digital publication. All analyses, monographs, and investigative briefings are produced free of advertiser influence, venture capital sponsorship demands, or state media directives.
              </p>
              <h3 className="text-lg font-semibold text-white pt-3">Peer Review & Citation Integrity</h3>
              <p>
                Every published piece cross-references primary documents, cryptographic signatures, open-source repositories, or verified academic preprints. We do not publish unsubstantiated rumors or unverified algorithmic summaries.
              </p>
              <h3 className="text-lg font-semibold text-white pt-3">Corrections & Accountability</h3>
              <p>
                If a material factual error occurs in any dispatch, we publish a transparent timestamped correction at the top of the article within 12 hours of editorial verification.
              </p>
            </motion.div>
          )}

          {activeTab === "provenance" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-sm text-white/80 leading-relaxed">
              <h2 className="text-2xl font-semibold text-white mb-4">2. Public API Ingestion & Data Telemetry</h2>
              <p>
                Content Hub integrates with the decentralized GitHub Public APIs registry (<code className="text-[#D4A853] font-mono text-xs">github.com/public-apis</code>), Dev.to API, HackerNews Firebase endpoints, and open scholarly APIs.
              </p>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2 font-mono text-xs text-white/70">
                <p>• Telemetry Polling Rate: 180 seconds</p>
                <p>• Data Attribution: 100% CC-BY-SA and Permissive MIT Licenses</p>
                <p>• Zero Paywall Enforcement on Syndicated Metadata</p>
              </div>
              <h3 className="text-lg font-semibold text-white pt-3">Attribution & Fair Use</h3>
              <p>
                All original developer authors, code contributors, and community publications are visibly credited with direct canonical URLs, author avatars, and repository links.
              </p>
            </motion.div>
          )}

          {activeTab === "privacy" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-sm text-white/80 leading-relaxed">
              <h2 className="text-2xl font-semibold text-white mb-4">3. Zero-Tracking Privacy Architecture</h2>
              <p>
                We believe privacy is an absolute human right. Content Hub does not deploy third-party advertising cookies, browser fingerprinting scripts, Google Analytics trackers, or cross-site tracking beacons.
              </p>
              <h3 className="text-lg font-semibold text-white pt-3">Client-Side Storage</h3>
              <p>
                Bookmarks and reading preferences are stored exclusively on your device via standard browser <code className="text-[#D4A853] font-mono text-xs">localStorage</code>. No telemetry regarding your reading history is ever uploaded to our servers.
              </p>
            </motion.div>
          )}

          {activeTab === "terms" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-sm text-white/80 leading-relaxed">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Terms of Service & Permissive Syndication</h2>
              <p>
                By accessing Content Hub, you agree to utilize our open intelligence feeds in accordance with international digital copyright and open-access conventions.
              </p>
              <h3 className="text-lg font-semibold text-white pt-3">Reproduction & Educational Re-use</h3>
              <p>
                Non-commercial educational reproduction of our essays is permitted provided prominent canonical attribution to Content Hub and the original author is maintained.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <FooterSection
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

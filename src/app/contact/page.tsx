"use client";

import React, { useState } from "react";
import CosmicCanvas from "@/components/CosmicCanvas";
import MagneticCursor from "@/components/MagneticCursor";
import HeaderNav from "@/components/HeaderNav";
import FooterSection from "@/components/FooterSection";
import NewsletterModal from "@/components/NewsletterModal";
import PublicApisExplorerModal from "@/components/PublicApisExplorerModal";
import {
  Sparkles,
  Send,
  Mail,
  MessageSquare,
  Shield,
  CheckCircle2,
  Lock,
  Globe,
  HelpCircle,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "pitch",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isApisExplorerOpen, setIsApisExplorerOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", topic: "pitch", message: "" });
    }, 1200);
  };

  const faqs = [
    {
      q: "How does Content Hub source and verify its intelligence?",
      a: "Our feeds ingest live metadata from verified public API registries, academic preprints, and developer community nodes. Every story undergoes algorithmic provenance checks and rigorous human editorial peer review.",
    },
    {
      q: "Can independent researchers and journalists pitch stories?",
      a: "Yes. We actively invite investigative journalism, systems architecture monographs, and geopolitical analyses. Submit your draft outline using the editorial pitch desk on this page.",
    },
    {
      q: "Is Content Hub free to read without ads or subscriptions?",
      a: "100% free. We operate on open-web principles, supported by research fellowships and grant endowments. There are zero paywalls, intrusive trackers, or clickbait popups.",
    },
    {
      q: "How can I integrate Content Hub APIs into my application?",
      a: "Browse our Public APIs Registry page to explore endpoint documentation, rate limits, and JSON schemas for developers.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-transparent text-white relative selection:bg-[#D4A853] selection:text-black">
      <CosmicCanvas />
      <MagneticCursor />

      <HeaderNav
        onOpenApisExplorer={() => setIsApisExplorerOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* Hero Header */}
      <div className="pt-24 sm:pt-32 pb-12 px-6 sm:px-12 md:px-16 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4A853]/15 border border-[#D4A853]/30 text-[#D4A853] text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Editorial Bureau & Press Inquiries</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.08]"
        >
          Connect With Our{" "}
          <span className="font-serif-luxury italic text-[#D4A853]">Editorial Desk.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          Pitch an investigative monograph, report breaking intelligence, or partner with our open data syndication network.
        </motion.p>
      </div>

      {/* Main Grid: Form + Info Cards */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-[32px] bg-[#0A0A0E]/90 border border-white/[0.12] backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-60 h-60 bg-[#D4A853]/10 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-2xl sm:text-3xl font-medium text-white mb-2">
              Send a Transmission
            </h2>
            <p className="text-xs sm:text-sm text-white/55 mb-8">
              Encrypted channel. Our senior editors review incoming pitches every 4 hours.
            </p>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-[#D4A853]/10 border border-[#D4A853]/30 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#D4A853]/20 text-[#D4A853] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Transmission Received
                </h3>
                <p className="text-xs text-white/70 max-w-sm mx-auto mb-6">
                  Thank you for submitting to Content Hub. Our editorial bureau will review your briefing and follow up via encrypted dispatch.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4A853] to-[#C4943F] text-black text-xs font-semibold hover:brightness-110 transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wider">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Elena Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#D4A853] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@research.institute"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#D4A853] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wider">
                    Channel / Purpose
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#0F0F14] border border-white/[0.12] text-white text-sm focus:outline-none focus:border-[#D4A853] transition-colors cursor-pointer"
                  >
                    <option value="pitch">Editorial Pitch / Monograph Submission</option>
                    <option value="leak">Confidential Intelligence / Leaks</option>
                    <option value="api">API Integration & Data Syndication</option>
                    <option value="press">Press & Media Inquiries</option>
                    <option value="careers">Careers & Research Fellowships</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wider">
                    Executive Briefing / Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Outline your hypothesis, story summary, or technical inquiry with references..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#D4A853] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4A853] via-[#E8D5A3] to-[#C4943F] text-black font-semibold text-sm hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-[#D4A853]/20"
                >
                  {isSubmitting ? (
                    <span>Encrypting & Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Dispatch to Editors</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Secure Channel Badge */}
            <div className="p-6 rounded-3xl bg-[#0A0A0E]/80 border border-white/[0.1] backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4A853]/20 border border-[#D4A853]/40 flex items-center justify-center text-[#D4A853]">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Sovereign Confidentiality
                  </h3>
                  <p className="text-xs text-white/50">Zero IP logging or metadata tracking</p>
                </div>
              </div>
              <p className="text-xs text-white/65 leading-relaxed">
                We protect source confidentiality under international press freedom doctrines. All sensitive data is scrubbed at the gateway.
              </p>
            </div>

            {/* Direct Contact Channels */}
            <div className="p-6 rounded-3xl bg-[#0A0A0E]/80 border border-white/[0.1] backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D4A853]">
                Direct Desks
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-white/40 block mb-0.5">Editorial Inquiries</span>
                  <span className="text-white font-mono font-medium">editor@contenthub.network</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-white/40 block mb-0.5">Public APIs & Engineering</span>
                  <span className="text-white font-mono font-medium">engineering@contenthub.network</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-white/40 block mb-0.5">Press & Syndication</span>
                  <span className="text-white font-mono font-medium">press@contenthub.network</span>
                </div>
              </div>
            </div>

            {/* Live Status */}
            <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
              <div className="flex items-center gap-2 font-semibold mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Editorial Bureau: Online</span>
              </div>
              <p className="text-[11px] text-emerald-400/80">
                Average response latency: 2 hours. Global coverage 24/7 across London, New York, and Tokyo bureaus.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 pt-16 border-t border-white/[0.08] max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-white mb-2">
              Frequently Answered <span className="font-serif-luxury italic text-[#D4A853]">Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/55">
              Everything you need to know about our publication ethics and submission policies.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0A0A0E]/80 border border-white/[0.08] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-[#D4A853] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ml-4 ${
                        isOpen ? "rotate-180 text-[#D4A853]" : "text-white/40"
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="px-5 pb-5 text-xs text-white/65 leading-relaxed border-t border-white/[0.04] pt-3">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
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

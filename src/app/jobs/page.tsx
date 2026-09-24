"use client";

import React, { useState, useEffect } from "react";
import CosmicCanvas from "@/components/CosmicCanvas";
import MagneticCursor from "@/components/MagneticCursor";
import HeaderNav from "@/components/HeaderNav";
import FooterSection from "@/components/FooterSection";
import NewsletterModal from "@/components/NewsletterModal";
import PublicApisExplorerModal from "@/components/PublicApisExplorerModal";
import { JobPost } from "@/lib/types";
import { getAllJobs } from "@/lib/curatedPosts";
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  Search,
  Filter,
  ArrowUpRight,
  Shield,
  Zap,
  Globe2,
  X,
  CheckCircle2,
  Send,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);

  // Application Modal state
  const [isApplying, setIsApplying] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPortfolio, setApplicantPortfolio] = useState("");
  const [applicantNote, setApplicantNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isApisExplorerOpen, setIsApisExplorerOpen] = useState(false);

  useEffect(() => {
    setJobs(getAllJobs());
  }, []);

  const departments = [
    { id: "all", label: "All Roles" },
    { id: "Editorial", label: "Editorial & Intelligence" },
    { id: "Engineering", label: "Engineering & Data" },
    { id: "Design", label: "Design & UX" },
    { id: "Research", label: "Research & Climate" },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesDept =
      selectedDept === "all" ||
      job.tags.some((t) => t.toLowerCase().includes(selectedDept.toLowerCase())) ||
      job.title.toLowerCase().includes(selectedDept.toLowerCase());

    const matchesType =
      selectedType === "all" || job.type.toLowerCase() === selectedType.toLowerCase();

    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDept && matchesType && matchesSearch;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setIsSubmitted(true);
    }, 1200);
  };

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
          <Briefcase className="w-3.5 h-3.5" />
          <span>Careers & Research Fellowships</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.08]"
        >
          Build The Future of{" "}
          <span className="font-serif-luxury italic text-[#D4A853]">Open Media.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          Join our decentralized collective of investigative analysts, systems engineers, and visual designers dedicated to algorithmic transparency and uncompromised intellectual depth.
        </motion.p>
      </div>

      {/* Culture Values Grid */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#0A0A0E]/80 border border-white/[0.08] backdrop-blur-xl">
            <div className="w-10 h-10 rounded-xl bg-[#D4A853]/20 border border-[#D4A853]/30 flex items-center justify-center text-[#D4A853] mb-4">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Remote-First & Async</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              We work asynchronously across 14 time zones with sovereign autonomy and competitive global compensation.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0A0A0E]/80 border border-white/[0.08] backdrop-blur-xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Research Grants</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Every fellowship recipient receives dedicated computational budgets and open-access publication stipends.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0A0A0E]/80 border border-white/[0.08] backdrop-blur-xl">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Top-Tier Benefits</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Comprehensive health coverage, unlimited learning allowance, modern hardware stipends, and wellness retreats.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 mb-10">
        <div className="p-5 rounded-3xl bg-[#0A0A0E]/90 border border-white/[0.12] backdrop-blur-2xl space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search positions by role, tech stack, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.05] border border-white/[0.12] rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D4A853] transition-colors"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2.5 rounded-full bg-[#0F0F14] border border-white/[0.12] text-xs text-white focus:outline-none focus:border-[#D4A853] transition-colors cursor-pointer"
              >
                <option value="all">All Employment Types</option>
                <option value="full-time">Full-time</option>
                <option value="remote">Remote</option>
                <option value="contract">Contract</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedDept === dept.id
                    ? "bg-gradient-to-r from-[#D4A853] to-[#C4943F] text-black font-semibold shadow-md shadow-[#D4A853]/20"
                    : "bg-white/[0.04] text-white/70 hover:text-white border border-white/[0.08]"
                }`}
              >
                {dept.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 pb-28">
        {filteredJobs.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-white/15 rounded-3xl p-8 bg-white/[0.02]">
            <h3 className="text-xl font-medium text-white mb-2">No matching positions found</h3>
            <p className="text-xs text-white/50 max-w-sm mx-auto mb-6">
              Try adjusting your search criteria or explore our speculative applications.
            </p>
            <button
              onClick={() => {
                setSelectedDept("all");
                setSelectedType("all");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4A853] to-[#C4943F] text-black text-xs font-semibold hover:brightness-110 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 sm:p-7 rounded-[24px] bg-[#0A0A0E]/80 hover:bg-[#0A0A0E] border border-white/[0.08] hover:border-[#D4A853]/40 backdrop-blur-xl transition-all duration-300 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-[#D4A853]/20 text-[#D4A853] border border-[#D4A853]/30 uppercase tracking-wider">
                      {job.type}
                    </span>
                    {job.salary && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-medium bg-white/[0.06] text-emerald-400 border border-white/[0.1]">
                        {job.salary}
                      </span>
                    )}
                    <span className="text-xs text-white/40 font-mono">{job.postedAt}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-white group-hover:text-[#D4A853] transition-colors">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-white/60">
                    <span className="flex items-center gap-1 font-medium text-white/80">
                      <Building2 className="w-3.5 h-3.5 text-[#D4A853]" />
                      {job.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-white/40" />
                      {job.location}
                    </span>
                  </div>

                  <p className="text-xs sm:text-[13px] text-white/60 leading-relaxed max-w-2xl pt-1">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {job.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/45 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setIsSubmitted(false);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/[0.08] hover:bg-[#D4A853] text-white hover:text-black font-semibold text-xs transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-lg border border-white/[0.1] hover:border-[#D4A853]"
                  >
                    <span>View & Apply</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0A0A0E] border border-white/[0.12] rounded-[32px] p-6 sm:p-10 shadow-2xl z-10 my-8 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.1] flex items-center justify-center text-white cursor-pointer active:scale-90"
              >
                <X className="w-4 h-4" />
              </button>

              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Application Received</h3>
                  <p className="text-xs text-white/60 max-w-md mx-auto mb-6">
                    Your credentials for <span className="text-[#D4A853] font-medium">{selectedJob.title}</span> at <span className="text-white font-medium">{selectedJob.company}</span> have been registered. Our recruiting team will reach out shortly.
                  </p>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4A853] to-[#C4943F] text-black text-xs font-semibold hover:brightness-110 transition-all cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <div>
                  <div className="pr-8 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#D4A853]/20 text-[#D4A853] border border-[#D4A853]/30 uppercase">
                        {selectedJob.type}
                      </span>
                      {selectedJob.salary && (
                        <span className="text-xs text-emerald-400 font-mono font-medium">
                          {selectedJob.salary}
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {selectedJob.title}
                    </h2>
                    <p className="text-xs text-white/60">
                      {selectedJob.company} • {selectedJob.location}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8 text-xs text-white/75 leading-relaxed bg-white/[0.02] p-5 rounded-2xl border border-white/[0.06]">
                    <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
                      Role Overview & Requirements
                    </h4>
                    <p>{selectedJob.description}</p>
                    <ul className="list-disc list-inside space-y-1.5 pl-1 text-white/65">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <form onSubmit={handleApplySubmit} className="space-y-4">
                    <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-2">
                      Submit Your Application
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase text-white/60 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Jane Doe"
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-xs text-white focus:outline-none focus:border-[#D4A853]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase text-white/60 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="jane@domain.com"
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-xs text-white focus:outline-none focus:border-[#D4A853]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase text-white/60 mb-1">
                        Portfolio / GitHub / Research Link
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/yourhandle"
                        value={applicantPortfolio}
                        onChange={(e) => setApplicantPortfolio(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-xs text-white focus:outline-none focus:border-[#D4A853]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase text-white/60 mb-1">
                        Brief Cover Note / Relevant Experience
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Highlight your notable projects or publications..."
                        value={applicantNote}
                        onChange={(e) => setApplicantNote(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-xs text-white focus:outline-none focus:border-[#D4A853] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isApplying}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#C4943F] text-black font-semibold text-xs hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4A853]/20"
                    >
                      {isApplying ? (
                        <span>Processing Application...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Fellowship Application</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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

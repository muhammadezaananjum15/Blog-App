"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Bookmark,
  BookmarkCheck,
  Share2,
  Clock,
  Heart,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ExternalLink,
  Check,
  Sparkles,
} from "lucide-react";
import { BlogPost } from "@/lib/types";

interface ArticleModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string | number) => void;
}

export default function ArticleModal({
  post,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
}: ArticleModalProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [reactionCount, setReactionCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (post) {
      setReactionCount(post.reactionsCount);
      setHasLiked(false);
      setIsPlayingAudio(false);
      setScrollProgress(0);
    }
  }, [post]);

  const handleScroll = () => {
    const el = contentContainerRef.current;
    if (!el) return;
    const total = el.scrollHeight - el.clientHeight;
    if (total <= 0) {
      setScrollProgress(0);
      return;
    }
    const current = el.scrollTop;
    setScrollProgress(Math.min(100, Math.max(0, (current / total) * 100)));
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleLike = () => {
    if (!hasLiked) {
      setReactionCount((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setReactionCount((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  if (!post) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Reader Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-4xl h-[92vh] bg-[#0A0A0A] border border-white/20 rounded-[28px] shadow-2xl flex flex-col overflow-hidden z-10 text-white"
            id="article-reader-modal"
          >
            {/* Sticky Reading Progress Bar at the top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30">
              <div
                className="h-full bg-[#0066FF] transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            {/* Reader Modal Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-md z-20">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[11px] font-medium border border-white/15">
                  {post.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#0066FF]" />
                  {post.readingTime}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Audio Listen Simulation Button */}
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all border cursor-pointer ${
                    isPlayingAudio
                      ? "bg-[#0066FF]/20 text-[#0066FF] border-[#0066FF]/40"
                      : "bg-white/5 hover:bg-white/10 text-white/80 border-white/15"
                  }`}
                  title="Simulate Audio Narration"
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Listening</span>
                      <div className="flex items-end gap-0.5 h-3 ml-1">
                        <span className="w-0.5 bg-[#0066FF] animate-wave-1 rounded-full" />
                        <span className="w-0.5 bg-[#0066FF] animate-wave-2 rounded-full" />
                        <span className="w-0.5 bg-[#0066FF] animate-wave-3 rounded-full" />
                        <span className="w-0.5 bg-[#0066FF] animate-wave-4 rounded-full" />
                      </div>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span className="hidden sm:inline">Listen</span>
                    </>
                  )}
                </button>

                {/* Bookmark Button */}
                <button
                  onClick={() => onToggleBookmark(post.id)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                    isBookmarked
                      ? "bg-[#0066FF] border-[#0066FF] text-white"
                      : "bg-white/5 hover:bg-white/10 border-white/15 text-white/80"
                  }`}
                  title={isBookmarked ? "Bookmarked" : "Bookmark this essay"}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4 fill-current" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>

                {/* Share Button */}
                <button
                  onClick={handleCopyLink}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer relative"
                  title="Share article link"
                >
                  {copiedLink ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer ml-1"
                  aria-label="Close reader"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Article Body */}
            <div
              ref={contentContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-8 sm:py-10 space-y-8"
            >
              {/* Header Title & Subtitle */}
              <div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.15] text-white mb-4">
                  {post.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-white/70 font-normal leading-relaxed max-w-3xl">
                  {post.description}
                </p>
              </div>

              {/* Author & Source Metadata Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-11 h-11 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {post.author.name}
                    </h4>
                    <p className="text-xs text-white/50">
                      {post.author.role} • {post.publishedAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-white/60">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>{post.apiSource}</span>
                  </span>
                  {post.url && post.url !== "#" && (
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#0066FF] hover:underline"
                    >
                      <span>Original Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Hero Image */}
              <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden relative shadow-2xl">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Audio Player Sticky Capsule when playing */}
              {isPlayingAudio && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-xl flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#0066FF] flex items-center justify-center text-white">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        AI Audio Narration Active
                      </p>
                      <p className="text-[11px] text-white/60">
                        Synthesizing editorial monologue • 1.0x Speed
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsPlayingAudio(false)}
                    className="text-xs text-white/60 hover:text-white underline cursor-pointer"
                  >
                    Pause
                  </button>
                </motion.div>
              )}

              {/* Article Markdown/Rich Body */}
              <div className="prose prose-invert max-w-none text-white/80 leading-relaxed text-sm sm:text-base space-y-6">
                {post.content.split("\n\n").map((paragraph, idx) => {
                  const p = paragraph.trim();
                  if (!p) return null;

                  if (p.startsWith("# ")) {
                    return (
                      <h2
                        key={idx}
                        className="text-2xl sm:text-3xl font-medium tracking-tight text-white pt-4 pb-2 border-b border-white/10"
                      >
                        {p.replace("# ", "")}
                      </h2>
                    );
                  }

                  if (p.startsWith("### ")) {
                    return (
                      <h3
                        key={idx}
                        className="text-xl sm:text-2xl font-medium tracking-tight text-white pt-3"
                      >
                        {p.replace("### ", "")}
                      </h3>
                    );
                  }

                  if (p.startsWith("> ")) {
                    return (
                      <blockquote
                        key={idx}
                        className="p-5 my-6 rounded-2xl bg-white/[0.04] border-l-4 border-[#0066FF] font-serif-luxury italic text-base sm:text-xl text-white/95 leading-relaxed"
                      >
                        {p.replace("> ", "")}
                      </blockquote>
                    );
                  }

                  if (p.startsWith("```")) {
                    return (
                      <pre
                        key={idx}
                        className="p-4 rounded-xl bg-black/80 border border-white/15 overflow-x-auto text-xs font-mono text-emerald-400 my-4"
                      >
                        <code>{p.replace(/```[a-z]*/g, "").trim()}</code>
                      </pre>
                    );
                  }

                  if (p.startsWith("- ")) {
                    const items = p.split("\n").filter((i) => i.startsWith("- "));
                    return (
                      <ul key={idx} className="list-disc list-inside space-y-1.5 pl-2 text-white/80">
                        {items.map((item, iIdx) => (
                          <li key={iIdx}>{item.replace("- ", "")}</li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p key={idx} className="text-white/80 text-[15px] sm:text-[16px] leading-[1.75]">
                      {p}
                    </p>
                  );
                })}
              </div>

              {/* Tags & Interaction Footer */}
              <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/15 text-white/70"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                      hasLiked
                        ? "bg-[#FF5500]/20 border-[#FF5500] text-[#FF5500]"
                        : "bg-white/5 hover:bg-white/10 border-white/15 text-white/80"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${hasLiked ? "fill-current" : ""}`} />
                    <span>{reactionCount} Applaud</span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all cursor-pointer shadow-lg"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? "Link Copied!" : "Share Essay"}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

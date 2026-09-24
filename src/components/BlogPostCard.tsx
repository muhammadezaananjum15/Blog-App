"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Clock,
  Heart,
  Bookmark,
  BookmarkCheck,
  ArrowUpRight,
  Eye,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/lib/types";

interface BlogPostCardProps {
  post: BlogPost;
  isSaved?: boolean;
  onToggleBookmark?: (id: string | number) => void;
  onQuickView?: (post: BlogPost) => void;
  variant?: "default" | "featured" | "compact";
}

export default function BlogPostCard({
  post,
  isSaved = false,
  onToggleBookmark,
  onQuickView,
  variant = "default",
}: BlogPostCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt on hover
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const impactScore = post.metrics?.impactScore || Math.min(99, 75 + Math.floor(post.reactionsCount / 5));

  // Category-based accent color
  const getCategoryColor = () => {
    switch (post.category) {
      case "Current Affairs": return "#EF4444";
      case "Geo Politics": return "#3B82F6";
      case "Tech & AI": return "#8B5CF6";
      case "Crypto & Web3": return "#F59E0B";
      case "Design & UI": return "#EC4899";
      case "Science & Space": return "#6366F1";
      case "Health & Wellness": return "#10B981";
      case "Finance & Markets": return "#22C55E";
      case "Startups & Business": return "#F97316";
      case "Culture & Ideas": return "#D946EF";
      default: return "#D4A853";
    }
  };

  const accentColor = getCategoryColor();

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className="group relative bg-[#0A0A0E] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-500 cursor-pointer will-change-transform"
    >
      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.06] group-hover:border-white/[0.15] transition-all duration-500 z-10 pointer-events-none" />
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        style={{
          boxShadow: `0 25px 60px -12px ${accentColor}15, 0 0 0 1px rgba(255,255,255,0.04) inset`,
        }}
      />

      {/* RECTANGULAR Cover Image — 16:9 aspect ratio */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[900ms] ease-out"
          loading="lazy"
        />

        {/* Multi-layer gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-[#0A0A0E]/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0E]/10 via-transparent to-[#0A0A0E]/10 pointer-events-none" />

        {/* Floating top bar */}
        <div className="absolute top-0 left-0 right-0 p-3.5 flex items-start justify-between z-20">
          {/* Category pill */}
          <div className="flex items-center gap-2">
            <span
              className="px-3 py-1 rounded-lg text-[10px] font-semibold backdrop-blur-xl border text-white uppercase tracking-wider"
              style={{
                backgroundColor: `${accentColor}20`,
                borderColor: `${accentColor}40`,
              }}
            >
              {post.category}
            </span>
            {post.featured && (
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#D4A853]/20 backdrop-blur-xl border border-[#D4A853]/40 text-[#D4A853] flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Featured
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            {onQuickView && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onQuickView(post);
                }}
                className="w-8 h-8 rounded-lg bg-black/40 hover:bg-black/70 border border-white/10 backdrop-blur-xl flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer active:scale-90"
                title="Quick Read"
                aria-label="Quick Read"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            )}

            {onToggleBookmark && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onToggleBookmark(post.id);
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-xl border transition-all cursor-pointer active:scale-90 ${
                  isSaved
                    ? "bg-[#D4A853]/80 border-[#D4A853] text-white shadow-[0_0_16px_rgba(212,168,83,0.5)]"
                    : "bg-black/40 border-white/10 text-white/70 hover:text-white hover:bg-black/70"
                }`}
                title={isSaved ? "Remove Bookmark" : "Save Story"}
                aria-label="Bookmark article"
              >
                {isSaved ? (
                  <BookmarkCheck className="w-3.5 h-3.5 fill-current" />
                ) : (
                  <Bookmark className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Bottom banner inside image */}
        <div className="absolute bottom-3 left-3.5 right-3.5 z-20 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-white/70 bg-black/50 backdrop-blur-xl px-3 py-1 rounded-lg border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono">{post.apiSource || post.source}</span>
          </div>

          {/* Impact score */}
          <div className="flex items-center gap-1 text-[10px] bg-black/50 backdrop-blur-xl px-2.5 py-1 rounded-lg border border-white/10">
            <TrendingUp className="w-3 h-3" style={{ color: accentColor }} />
            <span className="text-white/80 font-mono font-bold">
              {impactScore}
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between relative z-10">
        {/* Meta row */}
        <div>
          <div className="flex items-center gap-3 text-[11px] text-white/40 mb-3">
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3" style={{ color: accentColor }} />
              {post.readingTime}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>{post.publishedAt}</span>
          </div>

          {/* Title */}
          <Link href={`/stories/${post.id}`} className="block group/title">
            <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight leading-snug group-hover/title:text-[#D4A853] transition-colors duration-300 line-clamp-2 mb-2.5">
              {post.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs sm:text-[13px] text-white/50 font-normal leading-relaxed line-clamp-2 mb-4">
            {post.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[9px] px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/40 uppercase tracking-wider font-mono hover:bg-white/[0.08] hover:text-white/60 transition-all"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-[9px] px-2 py-0.5 text-white/25 font-mono">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3.5 border-t border-white/[0.06] flex items-center justify-between mt-auto">
          {/* Author — rectangular avatar */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-lg object-cover border border-white/[0.1]"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0A0A0E]" />
            </div>
            <div className="leading-tight">
              <span className="block text-xs font-medium text-white/80">
                {post.author.name}
              </span>
              <span className="block text-[10px] text-white/30">
                {post.author.role || "Contributor"}
              </span>
            </div>
          </div>

          {/* Social metrics & CTA */}
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1 text-xs text-white/35 cursor-default">
              <Heart className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px]">{post.reactionsCount}</span>
            </span>

            <Link
              href={`/stories/${post.id}`}
              className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-[#D4A853] border border-white/[0.08] hover:border-[#D4A853] text-white/50 hover:text-black flex items-center justify-center transition-all duration-300 active:scale-90"
              title="Read Full Story"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

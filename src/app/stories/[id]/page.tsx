"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import CosmicCanvas from "@/components/CosmicCanvas";
import MagneticCursor from "@/components/MagneticCursor";
import HeaderNav from "@/components/HeaderNav";
import NewsletterModal from "@/components/NewsletterModal";
import PublicApisExplorerModal from "@/components/PublicApisExplorerModal";
import FooterSection from "@/components/FooterSection";
import BlogPostCard from "@/components/BlogPostCard";
import { BlogPost, NavItem } from "@/lib/types";
import { getPostById, CURATED_POSTS } from "@/lib/curatedPosts";
import {
  ArrowLeft,
  Clock,
  Heart,
  Share2,
  Bookmark,
  BookmarkCheck,
  Volume2,
  Play,
  Pause,
  Sparkles,
  ExternalLink,
  Check,
  Compass,
} from "lucide-react";

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const postId = resolvedParams.id;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isApisExplorerOpen, setIsApisExplorerOpen] = useState(false);

  // Load post
  useEffect(() => {
    // Check curated posts first
    const found = getPostById(postId);
    if (found) {
      setPost(found);
      setLikes(found.reactionsCount);
      setLoading(false);
    } else {
      // Fetch from API
      fetch(`/api/feed?search=${encodeURIComponent(postId)}`)
        .then((r) => r.json())
        .then((data) => {
          const apiFound = data.posts?.find(
            (p: BlogPost) => String(p.id) === String(postId)
          );
          if (apiFound) {
            setPost(apiFound);
            setLikes(apiFound.reactionsCount);
          } else {
            // Default fallback to first curated
            setPost(CURATED_POSTS[0]);
            setLikes(CURATED_POSTS[0].reactionsCount);
          }
        })
        .catch(() => {
          setPost(CURATED_POSTS[0]);
        })
        .finally(() => setLoading(false));
    }
  }, [postId]);

  // Load bookmarks
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lumiere_bookmarks");
      if (saved) setBookmarks(JSON.parse(saved));
    } catch {}
  }, []);

  // Track window scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = (window.scrollY / total) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleBookmark = (id: string | number) => {
    const str = String(id);
    let updated: string[];
    if (bookmarks.includes(str)) {
      updated = bookmarks.filter((b) => b !== str);
    } else {
      updated = [...bookmarks, str];
    }
    setBookmarks(updated);
    try {
      localStorage.setItem("lumiere_bookmarks", JSON.stringify(updated));
    } catch {}
  };

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const isSaved = post ? bookmarks.includes(String(post.id)) : false;
  const relatedPosts = CURATED_POSTS.filter((p) => String(p.id) !== String(postId)).slice(0, 3);

  if (loading || !post) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#D4A853] border-t-transparent animate-spin" />
          <p className="text-xs uppercase tracking-widest text-[#D4A853] font-mono">
            Ingesting Editorial Telemetry...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-transparent text-white relative selection:bg-[#D4A853] selection:text-black">
      <CosmicCanvas />
      <MagneticCursor />

      {/* Top Sticky Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#D4A853] to-[#C4943F] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <HeaderNav
        bookmarkCount={bookmarks.length}
        onOpenApisExplorer={() => setIsApisExplorerOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* Main Article Container */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-14 pt-24 sm:pt-32 pb-24">
        {/* Back Link & Category */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-xs font-medium text-white/70 hover:text-[#D4A853] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Stories</span>
          </Link>

          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#D4A853]/20 text-[#D4A853] border border-[#D4A853]/30 uppercase tracking-wider">
            {post.category}
          </span>
        </div>

        {/* Title & Description */}
        <div className="mb-10 text-left">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.12] text-white mb-6">
            {post.title}
          </h1>
          <p className="text-base sm:text-xl text-white/75 font-normal leading-relaxed max-w-4xl">
            {post.description}
          </p>
        </div>

        {/* Hero Cover Image */}
        <div className="w-full h-72 sm:h-[480px] rounded-[32px] overflow-hidden relative shadow-2xl mb-12 border border-white/15">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

          {/* Bottom Banner inside Image */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white/80">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-xl border border-white/20 object-cover"
              />
              <div>
                <p className="font-semibold text-white">{post.author.name}</p>
                <p className="text-[11px] text-white/60">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-mono text-[#D4A853]">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
              <span>•</span>
              <span>{post.publishedAt}</span>
            </div>
          </div>
        </div>

        {/* 2-Column Article Layout with Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Sticky Left Sidebar on Desktop */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            {/* Audio Simulation Box */}
            <div className="p-5 rounded-2xl bg-[#0A0A0E]/90 border border-white/15 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-white/70">
                  Audio Monologue
                </span>
                <span className="text-[10px] text-[#D4A853] font-mono">Synthesized Voice</span>
              </div>
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isPlayingAudio
                    ? "bg-gradient-to-r from-[#D4A853] to-[#C4943F] text-black shadow-lg shadow-[#D4A853]/20"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause Narration</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Listen to Article ({post.readingTime})</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Actions (Bookmark, Like, Share) */}
            <div className="p-5 rounded-2xl bg-[#0A0A0E]/90 border border-white/15 backdrop-blur-xl flex flex-col gap-3">
              <button
                onClick={() => handleToggleBookmark(post.id)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-medium flex items-center justify-between transition-all border cursor-pointer ${
                  isSaved
                    ? "bg-[#D4A853]/20 border-[#D4A853] text-[#D4A853]"
                    : "bg-white/5 hover:bg-white/10 border-white/15 text-white/80"
                }`}
              >
                <div className="flex items-center gap-2">
                  {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  <span>{isSaved ? "Saved in Bookmarks" : "Save this Essay"}</span>
                </div>
                <span className="text-[10px] uppercase font-mono">Toggle</span>
              </button>

              <button
                onClick={handleLike}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-medium flex items-center justify-between transition-all border cursor-pointer ${
                  hasLiked
                    ? "bg-[#D4A853]/20 border-[#D4A853] text-[#D4A853]"
                    : "bg-white/5 hover:bg-white/10 border-white/15 text-white/80"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Heart className={`w-4 h-4 ${hasLiked ? "fill-current text-[#D4A853]" : ""}`} />
                  <span>{likes} Applaud</span>
                </div>
                <span className="text-[10px] uppercase font-mono">React</span>
              </button>

              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/15 text-white flex items-center justify-between transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? "Link Copied to Clipboard" : "Share Article"}</span>
                </div>
                <span className="text-[10px] uppercase font-mono">Copy</span>
              </button>
            </div>

            {/* Source & Telemetry */}
            <div className="p-5 rounded-2xl bg-[#0A0A0E]/90 border border-white/15 text-xs text-white/60 space-y-2">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-[#D4A853]">
                Data Provenance
              </p>
              <p>Source Protocol: <span className="text-white font-mono">{post.apiSource || post.source}</span></p>
              <p>Impact Score: <span className="text-[#D4A853] font-bold font-mono">{post.metrics?.impactScore || 98}/100</span></p>
              <p>Verified Views: <span className="text-white font-mono">{post.metrics?.views || "24.5k"}</span></p>
            </div>
          </aside>

          {/* Article Main Body */}
          <main className="lg:col-span-8 prose prose-invert max-w-none text-white/80 text-base sm:text-lg leading-[1.8] space-y-8">
            {post.content.split("\n\n").map((paragraph, idx) => {
              const p = paragraph.trim();
              if (!p) return null;

              if (p.startsWith("# ")) {
                return (
                  <h2
                    key={idx}
                    className="text-3xl sm:text-4xl font-medium tracking-tight text-white pt-6 pb-2 border-b border-white/10"
                  >
                    {p.replace("# ", "")}
                  </h2>
                );
              }

              if (p.startsWith("### ")) {
                return (
                  <h3
                    key={idx}
                    className="text-2xl sm:text-3xl font-medium tracking-tight text-white pt-4"
                  >
                    {p.replace("### ", "")}
                  </h3>
                );
              }

              if (p.startsWith("> ")) {
                return (
                  <blockquote
                    key={idx}
                    className="p-6 sm:p-8 my-8 rounded-3xl bg-white/[0.04] border-l-4 border-[#D4A853] font-serif-luxury italic text-xl sm:text-2xl text-white/95 leading-relaxed shadow-xl"
                  >
                    {p.replace("> ", "")}
                  </blockquote>
                );
              }

              if (p.startsWith("```")) {
                return (
                  <pre
                    key={idx}
                    className="p-5 rounded-2xl bg-black/90 border border-white/15 overflow-x-auto text-xs sm:text-sm font-mono text-emerald-400 my-6 shadow-inner"
                  >
                    <code>{p.replace(/```[a-z]*/g, "").trim()}</code>
                  </pre>
                );
              }

              if (p.startsWith("- ")) {
                const items = p.split("\n").filter((i) => i.startsWith("- "));
                return (
                  <ul key={idx} className="list-disc list-inside space-y-2 pl-2 text-white/80">
                    {items.map((item, iIdx) => (
                      <li key={iIdx}>{item.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={idx} className="text-white/80 text-[16px] sm:text-[18px] leading-[1.8]">
                  {p}
                </p>
              );
            })}

            {/* Tags Bottom */}
            <div className="pt-10 border-t border-white/10 flex flex-wrap gap-2">
              {post.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/5 border border-white/15 text-white/70"
                >
                  #{t}
                </span>
              ))}
            </div>
          </main>
        </div>

        {/* Related Stories Section */}
        <section className="mt-28 pt-16 border-t border-white/10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D4A853] font-semibold">
                Keep Reading
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium text-white mt-1">
                Related Editorial <span className="font-serif-luxury italic text-[#D4A853]">Essays</span>
              </h3>
            </div>
            <Link
              href="/stories"
              className="text-xs font-semibold text-white/80 hover:text-[#D4A853] underline"
            >
              Browse All Stories →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <BlogPostCard
                key={related.id}
                post={related}
                isSaved={bookmarks.includes(String(related.id))}
                onToggleBookmark={handleToggleBookmark}
              />
            ))}
          </div>
        </section>
      </div>

      <FooterSection
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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

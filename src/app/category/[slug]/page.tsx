"use client";

import React, { useState, useEffect, use } from "react";
import CosmicCanvas from "@/components/CosmicCanvas";
import MagneticCursor from "@/components/MagneticCursor";
import HeaderNav from "@/components/HeaderNav";
import FooterSection from "@/components/FooterSection";
import BlogPostCard from "@/components/BlogPostCard";
import ArticleModal from "@/components/ArticleModal";
import PublicApisExplorerModal from "@/components/PublicApisExplorerModal";
import NewsletterModal from "@/components/NewsletterModal";
import { BlogPost, CATEGORY_CONFIG, CategoryConfig } from "@/lib/types";
import { CURATED_POSTS } from "@/lib/curatedPosts";
import {
  ArrowLeft,
  Search,
  Filter,
  RefreshCw,
  Sparkles,
  BookOpen,
  TrendingUp,
  Compass,
  Radio,
  Share2,
} from "lucide-react";
import Link from "next/link";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const config =
    CATEGORY_CONFIG.find((c) => c.slug === slug || c.id === slug) || {
      id: slug,
      label: slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      slug: slug,
      description: "In-depth investigative reports, analysis, and dispatches.",
      icon: "Newspaper",
      gradient: "from-amber-500/20 to-yellow-500/20",
      accentColor: "#D4A853",
    };

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "readingTime">("latest");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isApisExplorerOpen, setIsApisExplorerOpen] = useState(false);

  // Load bookmarks
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lumiere_bookmarks");
      if (saved) setBookmarks(JSON.parse(saved));
    } catch {}
  }, []);

  const handleToggleBookmark = (id: string | number) => {
    const stringId = String(id);
    let updated: string[];
    if (bookmarks.includes(stringId)) {
      updated = bookmarks.filter((b) => b !== stringId);
    } else {
      updated = [...bookmarks, stringId];
    }
    setBookmarks(updated);
    try {
      localStorage.setItem("lumiere_bookmarks", JSON.stringify(updated));
    } catch {}
  };

  // Fetch or filter posts for this category
  const fetchCategoryPosts = async (query = searchQuery) => {
    setIsLoading(true);
    try {
      // First find matching curated posts
      const matchedCurated = CURATED_POSTS.filter(
        (p) =>
          p.category.toLowerCase().includes(config.label.toLowerCase()) ||
          p.category.toLowerCase().replace(/[^a-z0-9]/g, "-").includes(slug) ||
          p.tags.some((t) => t.toLowerCase().includes(slug.replace("-", " ")))
      );

      // Fetch live feed from dev.to API route
      const res = await fetch(
        `/api/feed?category=${encodeURIComponent(config.label)}&search=${encodeURIComponent(query)}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.posts && data.posts.length > 0) {
          // Combine unique posts
          const combined = [...matchedCurated];
          data.posts.forEach((apiPost: BlogPost) => {
            if (!combined.some((p) => String(p.id) === String(apiPost.id))) {
              combined.push(apiPost);
            }
          });
          setPosts(combined);
          return;
        }
      }

      setPosts(matchedCurated.length > 0 ? matchedCurated : CURATED_POSTS.slice(0, 6));
    } catch {
      const fallback = CURATED_POSTS.filter((p) =>
        p.category.toLowerCase().includes(config.label.toLowerCase())
      );
      setPosts(fallback.length > 0 ? fallback : CURATED_POSTS.slice(0, 6));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryPosts(searchQuery);
  }, [slug]);

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "popular") return (b.reactionsCount || 0) - (a.reactionsCount || 0);
    if (sortBy === "readingTime") {
      const aMin = parseInt(a.readingTime) || 5;
      const bMin = parseInt(b.readingTime) || 5;
      return bMin - aMin;
    }
    return 0;
  });

  return (
    <div className="w-full min-h-screen bg-transparent text-white relative selection:bg-[#D4A853] selection:text-black">
      <CosmicCanvas />
      <MagneticCursor />

      {/* Navigation Header */}
      <HeaderNav
        bookmarkCount={bookmarks.length}
        onOpenApisExplorer={() => setIsApisExplorerOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* Category Hero Header */}
      <div className="pt-24 sm:pt-32 pb-12 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-white/50 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/stories" className="hover:text-white transition-colors">
            Categories
          </Link>
          <span>/</span>
          <span className="text-[#D4A853] font-medium">{config.label}</span>
        </div>

        <div className="p-8 sm:p-12 rounded-[32px] bg-[#0A0A0E]/90 border border-white/[0.12] relative overflow-hidden backdrop-blur-2xl shadow-2xl">
          {/* Radiant glow accent */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: config.accentColor }}
          />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/15 text-xs font-semibold mb-4">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: config.accentColor }}
              />
              <span style={{ color: config.accentColor }}>Editorial Channel</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-4">
              {config.label}{" "}
              <span className="font-serif-luxury italic text-[#D4A853]">Chronicle</span>
            </h1>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl">
              {config.description}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-white/[0.08] text-xs text-white/60">
              <div>
                <span className="block text-xl font-bold font-mono text-white">
                  {sortedPosts.length}
                </span>
                <span className="text-[11px] text-white/40 uppercase">Published Dispatches</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-mono text-emerald-400">
                  Live
                </span>
                <span className="text-[11px] text-white/40 uppercase">API Stream Status</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-mono text-[#D4A853]">
                  98.5%
                </span>
                <span className="text-[11px] text-white/40 uppercase">Editorial Rigor Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {CATEGORY_CONFIG.map((cat) => {
            const isActive = cat.slug === slug || cat.id === slug;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#D4A853] to-[#C4943F] text-black font-semibold shadow-lg shadow-[#D4A853]/20"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white border border-white/[0.08]"
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 mb-10">
        <div className="p-4 sm:p-5 rounded-3xl bg-white/[0.04] border border-white/[0.1] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder={`Search in ${config.label}...`}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                fetchCategoryPosts(e.target.value);
              }}
              className="w-full bg-white/[0.05] border border-white/[0.12] rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D4A853] transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.12] rounded-full px-3.5 py-2 text-xs text-white/80">
              <Filter className="w-3.5 h-3.5 text-[#D4A853]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort articles"
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer pr-1"
              >
                <option value="latest" className="bg-[#121212] text-white">Latest Dispatches</option>
                <option value="popular" className="bg-[#121212] text-white">Most Impactful</option>
                <option value="readingTime" className="bg-[#121212] text-white">Deep Reads</option>
              </select>
            </div>

            <button
              onClick={() => fetchCategoryPosts(searchQuery)}
              disabled={isLoading}
              className="p-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] text-white transition-all cursor-pointer active:scale-90"
              title="Refresh Feeds"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-[#D4A853]" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pb-28">
        {isLoading ? (
          <div className="py-24 text-center flex flex-col items-center justify-center text-white/50 text-xs">
            <RefreshCw className="w-8 h-8 animate-spin text-[#D4A853] mb-3" />
            <span className="font-mono">Syncing {config.label} telemetry...</span>
          </div>
        ) : sortedPosts.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-white/15 rounded-3xl p-8 bg-white/[0.02]">
            <h3 className="text-xl font-medium text-white mb-2">No articles found in {config.label}</h3>
            <p className="text-xs text-white/50 max-w-sm mx-auto mb-6">
              Try adjusting your search query or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                fetchCategoryPosts("");
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4A853] to-[#C4943F] text-black text-xs font-semibold hover:brightness-110 transition-all cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sortedPosts.map((post) => (
              <BlogPostCard
                key={post.id}
                post={post}
                isSaved={bookmarks.includes(String(post.id))}
                onToggleBookmark={handleToggleBookmark}
                onQuickView={(p) => setSelectedPost(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <FooterSection
        onOpenApisExplorer={() => setIsApisExplorerOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* Modals */}
      <PublicApisExplorerModal
        isOpen={isApisExplorerOpen}
        onClose={() => setIsApisExplorerOpen(false)}
      />

      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />

      <ArticleModal
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        isBookmarked={selectedPost ? bookmarks.includes(String(selectedPost.id)) : false}
        onToggleBookmark={handleToggleBookmark}
      />
    </div>
  );
}

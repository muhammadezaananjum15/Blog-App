"use client";

import React, { useState, useEffect } from "react";
import CosmicCanvas from "@/components/CosmicCanvas";
import MagneticCursor from "@/components/MagneticCursor";
import HeaderNav from "@/components/HeaderNav";
import BlogPostCard from "@/components/BlogPostCard";
import ArticleModal from "@/components/ArticleModal";
import PublicApisExplorerModal from "@/components/PublicApisExplorerModal";
import NewsletterModal from "@/components/NewsletterModal";
import FooterSection from "@/components/FooterSection";
import { BlogPost, NavItem } from "@/lib/types";
import { CURATED_POSTS } from "@/lib/curatedPosts";
import { Sparkles, RefreshCw, Search, Filter, BookOpen } from "lucide-react";

export default function StoriesPage() {
  const [activeNav, setActiveNav] = useState("feeds");
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isApisExplorerOpen, setIsApisExplorerOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const [posts, setPosts] = useState<BlogPost[]>(CURATED_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "readingTime">("latest");
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const navItems: NavItem[] = [
    { id: "home", label: "Home" },
    { id: "feeds", label: "Live Feeds" },
    { id: "pillars", label: "Editorial" },
    { id: "curators", label: "Curators" },
    { id: "bookmarks", label: "Saved" },
  ];

  const categories = [
    { id: "all", label: "All Stories" },
    { id: "Current Affairs", label: "Current Affairs" },
    { id: "Geo Politics", label: "Geo Politics" },
    { id: "Tech & AI", label: "Tech & AI" },
    { id: "Crypto & Web3", label: "Crypto & Web3" },
    { id: "Science & Space", label: "Science & Space" },
    { id: "Design & UI", label: "Design & UI" },
    { id: "Culture & Ideas", label: "Culture & Ideas" },
    { id: "bookmarks", label: "Saved Articles" },
  ];

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

  const fetchFeed = async (cat = selectedCategory, search = searchQuery) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/feed?category=${encodeURIComponent(cat)}&search=${encodeURIComponent(search)}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts);
        }
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory !== "bookmarks") {
      fetchFeed(selectedCategory, searchQuery);
    }
  }, [selectedCategory]);

  const displayedPosts =
    selectedCategory === "bookmarks"
      ? posts.filter((p) => bookmarks.includes(String(p.id)))
      : posts;

  const sortedPosts = [...displayedPosts].sort((a, b) => {
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

      {/* Header */}
      <HeaderNav
        navItems={navItems}
        activeNav={activeNav}
        onSelectNav={(id) => {
          if (id === "home") window.location.href = "/";
          else if (id === "bookmarks") setSelectedCategory("bookmarks");
          else setActiveNav(id);
        }}
        bookmarkCount={bookmarks.length}
        onOpenApisExplorer={() => setIsApisExplorerOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* Page Title Hero */}
      <div className="pt-24 sm:pt-36 pb-10 px-6 sm:px-12 md:px-16 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4A853]/15 border border-[#D4A853]/30 text-[#D4A853] text-xs font-semibold uppercase tracking-wider mb-6">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Global Dispatch Archive</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.08]">
          All Stories & <span className="font-serif-luxury italic text-[#D4A853]">Live Feeds.</span>
        </h1>
        <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
          Explore real-time developer essays, architectural monographs, and cultural commentaries harvested continuously from open public networks.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 mb-10">
        <div className="p-4 sm:p-5 rounded-3xl bg-[#0A0A0E]/90 border border-white/[0.12] backdrop-blur-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xl">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-[#D4A853] to-[#C4943F] text-black font-semibold shadow-md shadow-[#D4A853]/20"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white border border-white/[0.08]"
                }`}
              >
                {cat.label}
                {cat.id === "bookmarks" && bookmarks.length > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-black text-[#D4A853] font-bold">
                    {bookmarks.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search, Sort, Sync */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px] flex-1 sm:flex-initial">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  fetchFeed(selectedCategory, e.target.value);
                }}
                className="w-full bg-white/[0.05] border border-white/[0.12] rounded-full pl-11 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D4A853] transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.12] rounded-full px-3.5 py-2 text-xs text-white/80">
              <Filter className="w-3.5 h-3.5 text-[#D4A853]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort articles by"
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer pr-1"
              >
                <option value="latest" className="bg-[#121212] text-white">Latest</option>
                <option value="popular" className="bg-[#121212] text-white">Most Read</option>
                <option value="readingTime" className="bg-[#121212] text-white">Long Reads</option>
              </select>
            </div>

            <button
              onClick={() => fetchFeed(selectedCategory, searchQuery)}
              disabled={isLoading}
              className="p-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] text-white transition-all cursor-pointer active:scale-90"
              title="Refresh Feeds"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#D4A853]" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pb-28">
        {sortedPosts.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-white/15 rounded-3xl p-8 bg-white/[0.02]">
            <h3 className="text-xl font-medium text-white mb-2">No articles found</h3>
            <p className="text-xs text-white/50 max-w-sm mx-auto mb-6">
              {selectedCategory === "bookmarks"
                ? "Your saved bookmark list is currently empty."
                : "Try adjusting your query or category filters."}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
                fetchFeed("all", "");
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4A853] to-[#C4943F] text-black text-xs font-semibold hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-[#D4A853]/20"
            >
              Reset Filters
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

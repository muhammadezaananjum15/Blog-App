"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bookmark,
  BookmarkCheck,
  Clock,
  Heart,
  MessageSquare,
  Sparkles,
  RefreshCw,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { BlogPost } from "@/lib/types";
import BlogPostCard from "@/components/BlogPostCard";

interface LiveBlogFeedProps {
  posts: BlogPost[];
  isLoading: boolean;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onRefresh: () => void;
  bookmarks: string[];
  onToggleBookmark: (id: string | number) => void;
  onSelectPost: (post: BlogPost) => void;
}

export default function LiveBlogFeed({
  posts,
  isLoading,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onRefresh,
  bookmarks,
  onToggleBookmark,
  onSelectPost,
}: LiveBlogFeedProps) {
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "readingTime">("latest");

  const categories = [
    { id: "all", label: "All Stories" },
    { id: "tech", label: "Tech & AI" },
    { id: "design", label: "Design & UI" },
    { id: "culture", label: "Culture & Ideas" },
    { id: "architecture", label: "Architecture" },
    { id: "open", label: "Open Intelligence" },
    { id: "bookmarks", label: "Saved" },
  ];

  // Sorting
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "popular") {
      return (b.reactionsCount || 0) - (a.reactionsCount || 0);
    }
    if (sortBy === "readingTime") {
      const aMin = parseInt(a.readingTime) || 5;
      const bMin = parseInt(b.readingTime) || 5;
      return bMin - aMin;
    }
    return 0; // Default order
  });

  return (
    <section
      id="live-feeds-section"
      className="w-full bg-transparent text-white relative py-20 sm:py-28 px-4 sm:px-8 md:px-12 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/15 text-white/90 text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Real-Time Public Streams</span>
            </div>
            <h2 className="text-[32px] sm:text-[44px] md:text-[50px] font-medium tracking-tight text-white leading-tight">
              The Living <span className="font-serif-luxury italic font-normal text-[#0066FF]">Chronicle</span>
            </h2>
            <p className="text-white/60 text-xs sm:text-sm mt-2 max-w-lg">
              Dynamic articles, developer insights, and cultural essays fetched directly from open-source APIs and our editorial archives.
            </p>
          </div>

          {/* Quick Refresh Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              title="Fetch fresh data from public APIs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#0066FF]" : "text-white"}`} />
              <span>{isLoading ? "Refreshing..." : "Sync Live API"}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-white text-black font-semibold shadow-md"
                      : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
                  }`}
                >
                  {cat.label}
                  {cat.id === "bookmarks" && bookmarks.length > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-[#0066FF] text-white">
                      {bookmarks.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[220px] sm:min-w-[280px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search essays, tags, authors..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/15 rounded-full px-3 py-1.5 text-xs text-white/80">
              <Filter className="w-3 h-3 text-[#0066FF]" />
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
          </div>
        </div>

        {/* Articles Grid */}
        <AnimatePresence mode="popLayout">
          {sortedPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-white/15 rounded-3xl"
            >
              <Bookmark className="w-8 h-8 text-white/30 mb-3" />
              <h3 className="text-lg font-medium text-white mb-1">No articles found</h3>
              <p className="text-xs text-white/50 max-w-sm">
                {selectedCategory === "bookmarks"
                  ? "You haven't bookmarked any essays yet. Click the bookmark icon on any card to save it."
                  : `No results matching "${searchQuery}". Try a different keyword or category.`}
              </p>
              <button
                onClick={() => {
                  onSelectCategory("all");
                  onSearchChange("");
                }}
                className="mt-5 px-5 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {sortedPosts.map((post) => {
                const isSaved = bookmarks.includes(String(post.id));
                return (
                  <BlogPostCard
                    key={post.id}
                    post={post}
                    isSaved={isSaved}
                    onToggleBookmark={onToggleBookmark}
                    onQuickView={onSelectPost}
                  />
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

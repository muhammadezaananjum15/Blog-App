"use client";

import React, { useState, useEffect } from "react";
import CosmicCanvas from "@/components/CosmicCanvas";
import MagneticCursor from "@/components/MagneticCursor";
import HeaderNav from "@/components/HeaderNav";
import NavigationDrawer from "@/components/NavigationDrawer";
import HeroSection from "@/components/HeroSection";
import TrustedSourcesMarquee from "@/components/TrustedSourcesMarquee";
import EditorialPillars from "@/components/EditorialPillars";
import LiveBlogFeed from "@/components/LiveBlogFeed";
import StickyPinnedShowcase from "@/components/StickyPinnedShowcase";
import HorizontalScrollShowcase from "@/components/HorizontalScrollShowcase";
import ScrollRevealTimeline from "@/components/ScrollRevealTimeline";
import CuratorSpotlight from "@/components/CuratorSpotlight";
import FeaturesSplitSection from "@/components/FeaturesSplitSection";
import ArticleModal from "@/components/ArticleModal";
import PublicApisExplorerModal from "@/components/PublicApisExplorerModal";
import NewsletterModal from "@/components/NewsletterModal";
import FooterSection from "@/components/FooterSection";
import { BlogPost, NavItem } from "@/lib/types";
import { CURATED_POSTS } from "@/lib/curatedPosts";

export default function HomePage() {
  const [activeNav, setActiveNav] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isApisExplorerOpen, setIsApisExplorerOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Feed State
  const [posts, setPosts] = useState<BlogPost[]>(CURATED_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Navigation Items
  const navItems: NavItem[] = [
    { id: "home", label: "Home" },
    { id: "feeds", label: "Live Feeds" },
    { id: "pillars", label: "Editorial" },
    { id: "curators", label: "Curators" },
    { id: "bookmarks", label: "Saved" },
  ];

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lumiere_bookmarks");
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Save bookmarks
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
    } catch {
      // Ignore
    }
  };

  // Fetch live articles from API
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
      // Fallback already in memory
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory !== "bookmarks") {
      fetchFeed(selectedCategory, searchQuery);
    }
  }, [selectedCategory]);

  // Filtered posts calculation for bookmarks
  const displayedPosts =
    selectedCategory === "bookmarks"
      ? posts.filter((p) => bookmarks.includes(String(p.id)))
      : posts;

  // Navigation Handler
  const handleSelectNav = (id: string) => {
    setActiveNav(id);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "feeds") {
      const el = document.getElementById("live-feeds-section");
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (id === "pillars") {
      const el = document.getElementById("editorial-pillars-section");
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (id === "curators") {
      const el = document.getElementById("curator-spotlight-section");
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (id === "bookmarks") {
      setSelectedCategory("bookmarks");
      const el = document.getElementById("live-feeds-section");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full overflow-x-hidden bg-transparent text-white selection:bg-white selection:text-black min-h-screen relative">
      {/* Interactive Cosmic Particles Canvas Background */}
      <CosmicCanvas />

      {/* GSAP Magnetic Fluid Pointer */}
      <MagneticCursor />

      {/* Main Container / Hero Wrapper matching travel-agency-seven-red height & flex */}
      <div className="w-full min-h-[100svh] sm:min-h-[900px] bg-transparent text-white flex flex-col justify-between relative overflow-hidden pb-10 sm:pb-0">
        {/* Floating Top Navigation Header */}
        <HeaderNav
          navItems={navItems}
          activeNav={activeNav}
          onSelectNav={handleSelectNav}
          onOpenMenu={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
          bookmarkCount={bookmarks.length}
          onOpenApisExplorer={() => setIsApisExplorerOpen(true)}
        />

        {/* Hero Section with bottom split cards */}
        <HeroSection
          onExploreClick={() => handleSelectNav("feeds")}
          onOpenApisExplorer={() => setIsApisExplorerOpen(true)}
        />
      </div>

      {/* Trusted Open Sources / Public APIs Badges */}
      <TrustedSourcesMarquee />

      {/* About / Editorial Pillars (4 Offset Glass Cards) */}
      <EditorialPillars
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById("live-feeds-section");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* GSAP Horizontal Scroll Parallax Showcase */}
      <HorizontalScrollShowcase />

      {/* Live Blog & Public API Stream */}
      <LiveBlogFeed
        posts={displayedPosts}
        isLoading={isLoading}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (cat === "bookmarks") {
            // No need to fetch
          } else {
            fetchFeed(cat, searchQuery);
          }
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          fetchFeed(selectedCategory, q);
        }}
        onRefresh={() => fetchFeed(selectedCategory, searchQuery)}
        bookmarks={bookmarks}
        onToggleBookmark={handleToggleBookmark}
        onSelectPost={(post) => setSelectedPost(post)}
      />

      {/* GSAP Sticky Pinned Card Deck Section */}
      <StickyPinnedShowcase />

      {/* Scroll Reveal Pipeline Timeline */}
      <ScrollRevealTimeline />

      {/* Curator Testimonials Spotlight */}
      <CuratorSpotlight />

      {/* Features Split Section (2 left, central visual node, 2 right) */}
      <FeaturesSplitSection />

      {/* Luxury Minimalist Footer */}
      <FooterSection
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onOpenApisExplorer={() => setIsApisExplorerOpen(true)}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
      />

      {/* Sliding Mobile & Navigation Drawer */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        onOpenNewsletter={() => setIsNewsletterOpen(true)}
        onOpenApisExplorer={() => setIsApisExplorerOpen(true)}
        bookmarkCount={bookmarks.length}
      />

      {/* Public APIs Explorer Modal */}
      <PublicApisExplorerModal
        isOpen={isApisExplorerOpen}
        onClose={() => setIsApisExplorerOpen(false)}
      />

      {/* Newsletter Subscription Modal */}
      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
      />

      {/* Full-Featured Article Reader Modal */}
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

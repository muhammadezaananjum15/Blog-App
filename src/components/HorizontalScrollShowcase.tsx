"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Zap, Globe, Code2, Palette, Cpu } from "lucide-react";
import Link from "next/link";

const showcaseItems = [
  {
    id: 1,
    title: "Real-Time API Feeds",
    subtitle: "Decentralized Intelligence",
    description:
      "Continuously harvesting data from Dev.to, HackerNews, and 50+ open public APIs — zero gatekeeping, zero algorithmic bias.",
    icon: Globe,
    color: "#0066FF",
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800&auto=format&fit=crop",
    stat: "50+ APIs",
    statLabel: "Connected Sources",
  },
  {
    id: 2,
    title: "GSAP Kinematic Engine",
    subtitle: "Physics-Based Interactions",
    description:
      "Every scroll, hover, and transition powered by GSAP ScrollTrigger with spring dampening and inertia-based motion curves.",
    icon: Zap,
    color: "#FF5500",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
    stat: "120fps",
    statLabel: "Buttery Smooth",
  },
  {
    id: 3,
    title: "Next.js 16 Architecture",
    subtitle: "Turbopack & Server Components",
    description:
      "Built on the bleeding edge — App Router, streaming SSR, Turbopack compilation, and React 19 concurrent features.",
    icon: Code2,
    color: "#10B981",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    stat: "< 80ms",
    statLabel: "First Paint",
  },
  {
    id: 4,
    title: "Swiss Editorial Design",
    subtitle: "Typographic Precision",
    description:
      "Instrument Serif meets DM Sans in a dark-luxury grid system inspired by Müller-Brockmann's international modernist principles.",
    icon: Palette,
    color: "#8B5CF6",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    stat: "4 Fonts",
    statLabel: "Curated Typefaces",
  },
  {
    id: 5,
    title: "Zero-Noise Reading",
    subtitle: "Intellectual Sanctuary",
    description:
      "No ads, no tracking pixels, no synthetic outrage algorithms. Pure editorial craft designed for deep cognitive immersion.",
    icon: Cpu,
    color: "#F59E0B",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop",
    stat: "0 Ads",
    statLabel: "Pure Experience",
  },
];

export default function HorizontalScrollShowcase() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Calculate how far to scroll horizontally
      const totalWidth = track.scrollWidth - window.innerWidth;

      // Horizontal scroll animation
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth + 600}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Parallax fade for headline
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          opacity: 0.15,
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "30% top",
            scrub: 1,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#050508] text-white relative overflow-hidden border-t border-white/10"
      id="horizontal-showcase-section"
    >
      {/* Background ambient */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none opacity-20 blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 102, 255, 0.3) 0%, rgba(139, 92, 246, 0.15) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Fixed headline that fades on scroll */}
      <div
        ref={headlineRef}
        className="absolute top-12 left-8 sm:left-16 z-20 pointer-events-none"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/40 font-mono block mb-2">
          Platform Architecture
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white/90 leading-[1.1]">
          Built <span className="font-serif-luxury italic text-white/70">Different.</span>
        </h2>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex items-center gap-8 sm:gap-10 h-screen px-8 sm:px-16 will-change-transform"
        style={{ width: "fit-content" }}
      >
        {/* Spacer for headline visibility */}
        <div className="w-[30vw] sm:w-[40vw] shrink-0" />

        {showcaseItems.map((item, idx) => (
          <div
            key={item.id}
            className="relative w-[340px] sm:w-[420px] h-[520px] sm:h-[560px] shrink-0 rounded-[32px] overflow-hidden group border border-white/10 hover:border-white/25 transition-all duration-500 shadow-2xl"
          >
            {/* Background image */}
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 pointer-events-none" />

            {/* Top badge */}
            <div className="absolute top-6 left-6 z-10">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center border backdrop-blur-xl shadow-lg"
                style={{
                  backgroundColor: `${item.color}15`,
                  borderColor: `${item.color}40`,
                }}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
            </div>

            {/* Stat badge */}
            <div className="absolute top-6 right-6 z-10 text-right">
              <span
                className="block text-2xl sm:text-3xl font-bold font-mono"
                style={{ color: item.color }}
              >
                {item.stat}
              </span>
              <span className="block text-[10px] text-white/50 uppercase tracking-wider mt-0.5">
                {item.statLabel}
              </span>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/40 block mb-2">
                {item.subtitle}
              </span>
              <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-white/60 leading-relaxed mb-5 line-clamp-3">
                {item.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-white/30">
                  0{idx + 1} / 05
                </span>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center border transition-all group-hover:scale-110"
                  style={{
                    borderColor: `${item.color}50`,
                    backgroundColor: `${item.color}15`,
                  }}
                >
                  <ArrowUpRight
                    className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform"
                    style={{ color: item.color }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* End CTA card */}
        <div className="w-[320px] sm:w-[380px] h-[520px] sm:h-[560px] shrink-0 rounded-[32px] overflow-hidden border border-white/15 bg-gradient-to-br from-[#0066FF]/10 via-[#0A0A0D] to-[#FF5500]/10 flex flex-col items-center justify-center text-center p-8 sm:p-10">
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-6">
            <ArrowUpRight className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-medium text-white mb-3 tracking-tight">
            Explore the <span className="font-serif-luxury italic text-[#0066FF]">Archive</span>
          </h3>
          <p className="text-xs text-white/50 mb-8 max-w-[250px] leading-relaxed">
            Dive into our complete collection of editorials, monographs, and live API feeds.
          </p>
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-xs font-semibold hover:bg-neutral-200 transition-all active:scale-95 shadow-xl"
          >
            <span>Browse All Stories</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* End spacer */}
        <div className="w-[10vw] shrink-0" />
      </div>
    </section>
  );
}

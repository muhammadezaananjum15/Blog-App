"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles, Terminal, Shield, Cpu, Layers } from "lucide-react";
import Link from "next/link";

export default function StickyPinnedShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const card3Ref = useRef<HTMLDivElement | null>(null);
  const stepNumberRef = useRef<HTMLSpanElement | null>(null);
  const stepTitleRef = useRef<HTMLHeadingElement | null>(null);
  const stepDescRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean);

    // GSAP Context for clean cleanup
    const ctx = gsap.context(() => {
      // Create pinned ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=2200",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (stepNumberRef.current && stepTitleRef.current && stepDescRef.current) {
              if (progress < 0.33) {
                stepNumberRef.current.innerText = "01 / 03";
                stepTitleRef.current.innerHTML = "Decentralized <span class='font-serif-luxury italic text-[#0066FF]'>Open Telemetry</span>";
                stepDescRef.current.innerText = "Harvesting real-time records directly from GitHub public APIs with zero corporate mediation.";
              } else if (progress < 0.66) {
                stepNumberRef.current.innerText = "02 / 03";
                stepTitleRef.current.innerHTML = "Kinematic <span class='font-serif-luxury italic text-[#FF5500]'>Physical Motion</span>";
                stepDescRef.current.innerText = "Crafting digital spaces with physical mass, dampening springs, and buttery smooth GSAP interpolation.";
              } else {
                stepNumberRef.current.innerText = "03 / 03";
                stepTitleRef.current.innerHTML = "Intellectual <span class='font-serif-luxury italic text-emerald-400'>Deep Sanctuary</span>";
                stepDescRef.current.innerText = "Refusing ephemeral algorithmic feeds in favor of enduring technical and cultural monographs.";
              }
            }
          },
        },
      });

      // Card 1 starts visible, Card 2 scales up and stacks on top of Card 1
      tl.fromTo(
        card2Ref.current,
        { yPercent: 120, scale: 0.9, opacity: 0.2, rotateX: 10 },
        { yPercent: 0, scale: 1, opacity: 1, rotateX: 0, duration: 1, ease: "power2.out" }
      );

      // Card 1 subtly recesses backward
      tl.to(
        card1Ref.current,
        { scale: 0.94, opacity: 0.35, yPercent: -5, duration: 1, ease: "power2.out" },
        "<"
      );

      // Card 3 scales up and stacks on top of Card 2
      tl.fromTo(
        card3Ref.current,
        { yPercent: 120, scale: 0.9, opacity: 0.2, rotateX: 10 },
        { yPercent: 0, scale: 1, opacity: 1, rotateX: 0, duration: 1, ease: "power2.out" }
      );

      // Card 2 subtly recesses backward
      tl.to(
        card2Ref.current,
        { scale: 0.94, opacity: 0.35, yPercent: -5, duration: 1, ease: "power2.out" },
        "<"
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="pinned-showcase-section"
      className="w-full min-h-screen bg-[#060608] text-white relative overflow-hidden py-16 sm:py-24 px-6 sm:px-12 md:px-16 border-t border-white/10 flex items-center"
    >
      {/* Background ambient radial glows */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-25 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 102, 255, 0.4) 0%, rgba(255, 85, 0, 0.15) 50%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Sticky Column */}
        <div ref={leftPanelRef} className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/15 text-white/90 text-xs font-medium w-fit">
            <Layers className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>GSAP ScrollTrigger Architecture</span>
          </div>

          {/* Dynamic Counter */}
          <div className="flex items-center gap-3">
            <span
              ref={stepNumberRef}
              className="text-xs font-mono uppercase tracking-widest text-[#0066FF] font-bold px-3 py-1 rounded-full bg-[#0066FF]/15 border border-[#0066FF]/30"
            >
              01 / 03
            </span>
            <span className="h-[1px] w-12 bg-white/20" />
            <span className="text-xs text-white/40 uppercase tracking-widest">
              Interactive Pinning
            </span>
          </div>

          {/* Dynamic Title */}
          <h2
            ref={stepTitleRef}
            className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.12]"
          >
            Decentralized <span className="font-serif-luxury italic text-[#0066FF]">Open Telemetry</span>
          </h2>

          {/* Dynamic Description */}
          <p
            ref={stepDescRef}
            className="text-sm sm:text-base text-white/70 font-normal leading-relaxed max-w-md"
          >
            Harvesting real-time records directly from GitHub public APIs with zero corporate mediation.
          </p>

          {/* Quick CTA */}
          <div className="pt-4 flex items-center gap-4">
            <Link
              href="/stories"
              className="group inline-flex items-center gap-2.5 bg-white text-black px-6 py-3 rounded-full text-xs font-semibold hover:bg-neutral-200 transition-all cursor-pointer shadow-xl active:scale-95"
            >
              <span>Explore All Stories</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
            </Link>

            <Link
              href="/explore-apis"
              className="inline-flex items-center gap-2 text-xs text-white/70 hover:text-white transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Public APIs Hub</span>
            </Link>
          </div>
        </div>

        {/* Right Sticky Pinned Cards Deck */}
        <div className="lg:col-span-7 relative h-[440px] sm:h-[480px] w-full flex items-center justify-center perspective-[1000px]">
          {/* Card 1 */}
          <div
            ref={card1Ref}
            className="absolute inset-0 rounded-[30px] p-6 sm:p-8 bg-[#0D0D10] border border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden group"
            style={{
              background:
                "radial-gradient(ellipse at bottom right, rgba(0, 102, 255, 0.28) 0%, rgba(13, 13, 16, 0.95) 70%)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-white/70 px-3 py-1 rounded-full bg-white/10 border border-white/15">
                Pillar 01 • Telemetry
              </span>
              <Sparkles className="w-5 h-5 text-[#0066FF]" />
            </div>

            <div className="my-auto py-6">
              <h3 className="text-2xl sm:text-3xl font-medium text-white mb-3">
                Decentralized Open Ingestion Engine
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-lg mb-4">
                We tap directly into raw schemas across public endpoints. Open data ensures transparency, independence from proprietary paywalls, and unadulterated intellectual truth.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-white/60">
                <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10">REST & GraphQL</span>
                <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10">Zero-Auth Public Feeds</span>
                <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10">CORS Compliant</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
              <span>Source: github.com/public-apis</span>
              <span className="text-[#0066FF] font-medium">Stream Active →</span>
            </div>
          </div>

          {/* Card 2 */}
          <div
            ref={card2Ref}
            className="absolute inset-0 rounded-[30px] p-6 sm:p-8 bg-[#0F0D14] border border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden group"
            style={{
              background:
                "radial-gradient(ellipse at bottom right, rgba(255, 85, 0, 0.25) 0%, rgba(15, 13, 20, 0.95) 70%)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-white/70 px-3 py-1 rounded-full bg-white/10 border border-white/15">
                Pillar 02 • Kinematics
              </span>
              <Cpu className="w-5 h-5 text-[#FF5500]" />
            </div>

            <div className="my-auto py-6">
              <h3 className="text-2xl sm:text-3xl font-medium text-white mb-3">
                Hardware-Accelerated Liquid Physics
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-lg mb-4">
                Motion that mimics physical inertia. Using GSAP ScrollTrigger and Framer Motion spring physics, UI surfaces respond with organic weight and zero perceptual latency.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-white/60">
                <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10">60-120fps GPU Scroller</span>
                <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10">Spring Dampening</span>
                <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10">Hardware Lerp</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
              <span>Engine: GSAP v3.15 + Turbopack</span>
              <span className="text-[#FF5500] font-medium">Kinematics Verified →</span>
            </div>
          </div>

          {/* Card 3 */}
          <div
            ref={card3Ref}
            className="absolute inset-0 rounded-[30px] p-6 sm:p-8 bg-[#0A1110] border border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden group"
            style={{
              background:
                "radial-gradient(ellipse at bottom right, rgba(16, 185, 129, 0.25) 0%, rgba(10, 17, 16, 0.95) 70%)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-white/70 px-3 py-1 rounded-full bg-white/10 border border-white/15">
                Pillar 03 • Sanctuary
              </span>
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="my-auto py-6">
              <h3 className="text-2xl sm:text-3xl font-medium text-white mb-3">
                The Quiet Sanctuary of Deep Thought
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-lg mb-4">
                No tracking pixels, no intrusive interstitials, no synthetic rage algorithms. Just pure editorial craft, razor-sharp typography, and profound technological explorations.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-white/60">
                <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10">100% Ad-Free</span>
                <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10">Local Offline Bookmarks</span>
                <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10">Swiss Modernist Grid</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
              <span>Philosophy: Lumière Manifesto</span>
              <span className="text-emerald-400 font-medium">Read Manifesto →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

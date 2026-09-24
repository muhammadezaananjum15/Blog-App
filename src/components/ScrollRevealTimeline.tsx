"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Database,
  Layers,
  Aperture,
  Rocket,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const timelineSteps = [
  {
    number: "01",
    title: "Ingestion",
    subtitle: "Real-Time Public API Streams",
    description:
      "Our pipeline connects directly to Dev.to, HackerNews, GitHub, and 50+ verified open endpoints. Every 3 minutes, fresh content flows into the Chronicle — no human curation bias, no corporate sponsorship filters.",
    icon: Database,
    color: "#0066FF",
    detail: "Zero-latency REST polling with ISR revalidation",
  },
  {
    number: "02",
    title: "Curation",
    subtitle: "AI-Assisted Editorial Taxonomy",
    description:
      "Incoming articles are classified into five editorial pillars — Tech & AI, Design & UI, Architecture, Culture & Ideas, and Open Intelligence. Tags, reading times, and impact scores are computed in real-time.",
    icon: Layers,
    color: "#FF5500",
    detail: "5 pillars · 20+ tag dimensions · Impact scoring",
  },
  {
    number: "03",
    title: "Rendering",
    subtitle: "GSAP + Framer Motion Kinematics",
    description:
      "Every element on screen is orchestrated by GSAP ScrollTrigger timelines and Framer Motion spring physics. Pinned sections, horizontal parallax, and staggered card reveals create a reading experience with real physical mass.",
    icon: Aperture,
    color: "#8B5CF6",
    detail: "ScrollTrigger pinning · Spring dampening · GPU compositing",
  },
  {
    number: "04",
    title: "Delivery",
    subtitle: "Next.js 16 Turbopack Edge",
    description:
      "Pages are pre-rendered at build time with ISR fallback. Dynamic routes stream server components while static shells load instantly. The result is a sub-80ms first contentful paint with zero layout shift.",
    icon: Rocket,
    color: "#10B981",
    detail: "SSG + ISR · Streaming SSR · Turbopack compilation",
  },
  {
    number: "05",
    title: "Experience",
    subtitle: "The Quiet Reading Sanctuary",
    description:
      "No tracking pixels. No interstitials. No synthetic outrage. Just beautifully typeset essays, progressive audio narration, local bookmarks, and a dark editorial canvas designed to honor the reader's attention.",
    icon: BookOpen,
    color: "#F59E0B",
    detail: "Zero ads · Local storage · Privacy-first architecture",
  },
];

export default function ScrollRevealTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Animate the progress bar height
      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 60%",
              end: "bottom 80%",
              scrub: 1,
            },
          }
        );
      }

      // Animate each step
      stepsRef.current.forEach((step, idx) => {
        if (!step) return;

        // Stagger reveal from alternating sides
        const fromLeft = idx % 2 === 0;

        gsap.fromTo(
          step,
          {
            opacity: 0,
            x: fromLeft ? -60 : 60,
            scale: 0.92,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.5,
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#050508] text-white relative overflow-hidden py-24 sm:py-36 px-6 sm:px-12 md:px-16 border-t border-white/10"
      id="timeline-section"
    >
      {/* Background ambient */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-15 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(0, 102, 255, 0.2) 50%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-20 sm:mb-28">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/15 text-white/90 text-xs font-medium mb-5">
            <Aperture className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>How It Works</span>
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-[1.1] mb-5">
            From Raw Data to{" "}
            <span className="font-serif-luxury italic text-[#0066FF]">
              Refined
            </span>{" "}
            Editorial
          </h2>
          <p className="text-sm sm:text-base text-white/55 max-w-xl mx-auto leading-relaxed">
            A five-stage pipeline that transforms chaotic public API streams
            into a contemplative, beautifully-crafted reading experience.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central progress line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10 hidden lg:block">
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#0066FF] via-[#8B5CF6] to-[#F59E0B] origin-top"
              style={{ height: "100%" }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 sm:space-y-20 lg:space-y-28">
            {timelineSteps.map((step, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={step.number}
                  ref={(el) => {
                    stepsRef.current[idx] = el;
                  }}
                  className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    isLeft ? "" : "lg:direction-rtl"
                  }`}
                >
                  {/* Content side */}
                  <div
                    className={`${
                      isLeft ? "lg:text-right lg:pr-16" : "lg:order-2 lg:text-left lg:pl-16"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-3 mb-4 ${
                        isLeft ? "lg:justify-end" : "lg:justify-start"
                      }`}
                    >
                      <span
                        className="text-xs font-mono font-bold px-3 py-1 rounded-full border"
                        style={{
                          color: step.color,
                          borderColor: `${step.color}40`,
                          backgroundColor: `${step.color}15`,
                        }}
                      >
                        {step.number}
                      </span>
                      <span className="h-[1px] w-8 bg-white/20" />
                      <span className="text-xs text-white/40 uppercase tracking-widest font-medium">
                        {step.title}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-3 leading-snug">
                      {step.subtitle}
                    </h3>

                    <p className="text-sm text-white/60 leading-relaxed mb-4 max-w-md lg:max-w-none">
                      {step.description}
                    </p>

                    <span
                      className="inline-block text-[10px] font-mono px-3 py-1.5 rounded-lg border bg-black/40"
                      style={{
                        color: `${step.color}CC`,
                        borderColor: `${step.color}25`,
                      }}
                    >
                      {step.detail}
                    </span>
                  </div>

                  {/* Visual side */}
                  <div
                    className={`${
                      isLeft ? "lg:order-2 lg:pl-16" : "lg:pr-16"
                    } flex items-center ${isLeft ? "lg:justify-start" : "lg:justify-end"}`}
                  >
                    <div
                      className="relative w-full max-w-sm h-64 sm:h-72 rounded-[28px] overflow-hidden border shadow-2xl group"
                      style={{ borderColor: `${step.color}25` }}
                    >
                      {/* Gradient bg */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(ellipse at bottom right, ${step.color}25 0%, rgba(10,10,13,0.95) 70%)`,
                        }}
                      />

                      {/* Icon center */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-20 h-20 rounded-3xl flex items-center justify-center border backdrop-blur-xl"
                          style={{
                            backgroundColor: `${step.color}10`,
                            borderColor: `${step.color}30`,
                          }}
                        >
                          <step.icon
                            className="w-8 h-8"
                            style={{ color: step.color }}
                          />
                        </div>
                      </div>

                      {/* Corner decoration */}
                      <div
                        className="absolute top-4 right-4 w-2 h-2 rounded-full"
                        style={{ backgroundColor: step.color }}
                      />
                      <div
                        className="absolute bottom-4 left-4 text-[10px] font-mono"
                        style={{ color: `${step.color}80` }}
                      >
                        STAGE {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Center dot on timeline */}
                  <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div
                      className="w-4 h-4 rounded-full border-2 bg-[#050508]"
                      style={{ borderColor: step.color }}
                    >
                      <div
                        className="absolute inset-1 rounded-full"
                        style={{ backgroundColor: step.color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 sm:mt-32 text-center">
          <Link
            href="/explore-apis"
            className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-all active:scale-95 shadow-2xl"
          >
            <span>Explore the Public APIs Registry</span>
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

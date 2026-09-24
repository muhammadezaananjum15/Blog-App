"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Reviewer {
  id: string;
  quote: string;
  name: string;
  role: string;
  image: string;
  metrics: {
    value: string;
    label: string;
  }[];
}

const REVIEWERS: Reviewer[] = [
  {
    id: "elena-rostova",
    quote:
      "«LUMIÈRE RESTORED MY FAITH IN DIGITAL JOURNALISM. INSTEAD OF ENDLESS SYNTHETIC CLICKBAIT, WE RECEIVE HIGH-CALIBER TECHNICAL MONOGRAPHS AND DIRECT PUBLIC APIS TELEMETRY.»",
    name: "DR. ELENA ROSTOVA",
    role: "SYSTEMS ARCHITECT & RESEARCHER",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    metrics: [
      { value: "1.2M+", label: "ACTIVE READERS" },
      { value: "48+", label: "OPEN APIS INTEGRATED" },
      { value: "100%", label: "AD-FREE SUBSTANCE" },
    ],
  },
  {
    id: "marcus-vance",
    quote:
      "«THE FUSION OF SWISS MODERNIST TYPOGRAPHY WITH GSAP KINEMATICS MAKES READING ESSAYS AN ABSOLUTE WORK OF ART. IT FEELS LIKE AN ARCHITECTURAL MONOGRAPH COME TO LIFE.»",
    name: "MARCUS VANCE",
    role: "PRINCIPAL DESIGN FELLOW",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    metrics: [
      { value: "60 FPS", label: "FLUID MOTION" },
      { value: "99.9%", label: "PUBLIC API UPTIME" },
      { value: "Zero", label: "ALGORITHMIC NOISE" },
    ],
  },
];

export default function CuratorSpotlight() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = REVIEWERS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWERS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWERS.length) % REVIEWERS.length);
  };

  return (
    <section
      id="curator-spotlight-section"
      className="w-full bg-transparent text-white relative py-20 sm:py-28 px-4 sm:px-8 md:px-12 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 relative rounded-[28px] overflow-hidden border border-white/15 shadow-2xl bg-neutral-900 min-h-[380px] sm:min-h-[440px] lg:min-h-full group"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                src={current.image}
                alt={current.name}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover object-top absolute inset-0 group-hover:scale-105 transition-transform duration-700"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

            {/* Mobile metadata overlay */}
            <div className="absolute bottom-5 left-5 right-5 lg:hidden z-10">
              <div className="bg-black/60 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl">
                <p className="text-xs font-semibold text-white tracking-wider">
                  {current.name}
                </p>
                <p className="text-[10px] text-white/60 tracking-wider uppercase">
                  {current.role}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Luxury Quote & Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 relative rounded-[28px] border border-white/15 backdrop-blur-2xl p-6 sm:p-10 md:p-12 flex flex-col justify-between overflow-hidden shadow-2xl min-h-[440px]"
            style={{
              background:
                "radial-gradient(ellipse at bottom right, rgba(0, 102, 255, 0.38) 0%, rgba(0, 70, 190, 0.22) 40%, rgba(255, 255, 255, 0.04) 100%)",
            }}
          >
            {/* Corner ambient blur glows */}
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#0066FF]/35 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#0066FF]/15 rounded-full blur-[90px] pointer-events-none" />

            {/* Quote */}
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="text-white text-[16px] sm:text-[19px] md:text-[22px] lg:text-[23px] font-semibold uppercase leading-[1.3] tracking-[-0.015em] max-w-2xl select-none"
                >
                  {current.quote}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Metrics */}
            <div className="relative z-10 my-8 sm:my-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 border-t border-white/10"
                >
                  {current.metrics.map((metric, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[26px] sm:text-[36px] md:text-[44px] font-medium text-white tracking-tight leading-none">
                        {metric.value}
                      </span>
                      <span className="text-[10px] sm:text-[11.5px] uppercase tracking-wider text-white/55 font-medium mt-2">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Author Footer & Next/Prev Controls */}
            <div className="relative z-10 flex items-end justify-between pt-4 border-t border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
                    — {current.name}
                  </p>
                  <p className="text-[10.5px] sm:text-xs text-white/50 tracking-wider uppercase mt-0.5">
                    {current.role}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label="Previous quote"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label="Next quote"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

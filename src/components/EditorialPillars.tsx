"use client";

import React from "react";
import { motion } from "framer-motion";

interface EditorialPillarsProps {
  onSelectCategory: (cat: string) => void;
}

export default function EditorialPillars({ onSelectCategory }: EditorialPillarsProps) {
  const pillars = [
    {
      id: "intelligence",
      tag: "Intelligence",
      title: "Decentralized APIs & Open Data Networks",
      description:
        "Harvesting raw telemetry from global repositories to build transparent, sovereign knowledge feeds.",
      isOffset: false,
      filterKey: "open",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "architecture",
      tag: "Architecture",
      title: "Physical Weight in Digital Interfaces",
      description:
        "Balancing rigid modernist grid systems with spring kinematics, GSAP physics, and tactile liquid surfaces.",
      isOffset: true,
      filterKey: "architecture",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "monograph",
      tag: "Engineering",
      title: "Next.js 16 & Reactive Agent Tooling",
      description:
        "Rigorous code breakdowns, memory optimizations, and state architectures for next-decade web apps.",
      isOffset: false,
      filterKey: "tech",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "quietude",
      tag: "Culture",
      title: "Slow Journalism & Intellectual Clarity",
      description:
        "Refusing algorithmic outrage in favor of deliberate, long-form contemplation and editorial honesty.",
      isOffset: true,
      filterKey: "culture",
      image: "https://images.unsplash.com/photo-1507842229451-7f01be837a27?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section
      id="editorial-pillars-section"
      className="w-full bg-transparent text-white relative overflow-hidden py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <span className="text-[#FF5500] text-xs sm:text-sm font-medium tracking-wide uppercase">
            About Our Editorial Collective
          </span>
        </motion.div>

        {/* Big Editorial Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto text-center relative mb-8 sm:mb-12"
        >
          <h2 className="text-[30px] sm:text-[42px] md:text-[52px] lg:text-[58px] leading-[1.12] tracking-[-0.025em] font-medium text-white">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block text-[#FF5500] text-2xl sm:text-3xl md:text-4xl animate-pulse">
                ✹
              </span>
              <span>Lumière Chronicle — is a premier</span>
            </span>{" "}
            <span>journal for the discerning reader</span>{" "}
            <span className="text-white/50">that delivers the depth of modern technology</span>{" "}
            <span className="text-white/50">with unmatched aesthetic clarity</span>
          </h2>
          <p className="mt-6 text-xs sm:text-sm text-white/55 font-normal max-w-lg mx-auto leading-relaxed">
            We bridge open public protocols and editorial prose to create an immersive sanctuary for modern technologists, architects, and thinkers.
          </p>
        </motion.div>

        {/* 4 Offset Cards Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-start mt-8 sm:mt-12">
          {pillars.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 * idx, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectCategory(card.filterKey)}
              className={`group relative border border-white/15 rounded-[26px] p-6 sm:p-7 transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden cursor-pointer ${
                card.isOffset
                  ? "lg:translate-y-10 min-h-[360px] sm:min-h-[380px]"
                  : "min-h-[400px] sm:min-h-[440px]"
              }`}
              style={{
                background:
                  "radial-gradient(ellipse at bottom right, rgba(0, 102, 255, 0.38) 0%, rgba(0, 70, 190, 0.22) 40%, rgba(255, 255, 255, 0.04) 100%)",
              }}
              id={`pillar-card-${card.id}`}
            >
              {/* Blur Orb */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF5500]/10 transition-colors duration-500" />

              {/* Background Image */}
              {card.image && (
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-90 group-hover:scale-105 transition-transform duration-700 z-0"
                />
              )}

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent/10 pointer-events-none z-0" />

              {/* Top Tag */}
              <div className="flex items-center justify-between w-full z-10">
                <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/15 text-white/90 text-xs font-medium backdrop-blur-md">
                  {card.tag}
                </div>
              </div>

              {/* Bottom Content */}
              <div className="mt-auto pt-12 z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5500] mb-3.5 shadow-[0_0_10px_rgba(255,85,0,0.7)]" />
                <h3 className="text-[17px] sm:text-[19px] font-medium text-white tracking-tight leading-snug mb-2 group-hover:text-white transition-colors">
                  {card.title}
                </h3>
                <p className="text-[12.5px] sm:text-[13px] text-white/65 font-normal leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

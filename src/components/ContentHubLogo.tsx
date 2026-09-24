import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export default function ContentHubLogo({ size = 32, className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Crystal Diamond Icon - SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A853" />
            <stop offset="50%" stopColor="#E8D5A3" />
            <stop offset="100%" stopColor="#C4943F" />
          </linearGradient>
          <linearGradient id="gold-gradient-dark" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B8922E" />
            <stop offset="100%" stopColor="#8B6914" />
          </linearGradient>
          <linearGradient id="gold-highlight" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#F5E6C0" />
            <stop offset="100%" stopColor="#D4A853" />
          </linearGradient>
        </defs>
        {/* Outer diamond frame */}
        <path
          d="M24 2L44 24L24 46L4 24L24 2Z"
          stroke="url(#gold-gradient)"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Top facet */}
        <path d="M24 2L36 16L24 14L12 16L24 2Z" fill="url(#gold-highlight)" opacity="0.6" />
        {/* Left facet */}
        <path d="M4 24L12 16L24 14L18 24L12 34L4 24Z" fill="url(#gold-gradient)" opacity="0.4" />
        {/* Right facet */}
        <path d="M44 24L36 16L24 14L30 24L36 34L44 24Z" fill="url(#gold-gradient-dark)" opacity="0.5" />
        {/* Bottom facet */}
        <path d="M24 46L12 34L18 24L24 26L30 24L36 34L24 46Z" fill="url(#gold-gradient)" opacity="0.3" />
        {/* Center crystal */}
        <path d="M18 24L24 14L30 24L24 26Z" fill="url(#gold-highlight)" opacity="0.8" />
        {/* Inner cross lines */}
        <line x1="24" y1="14" x2="24" y2="46" stroke="url(#gold-gradient)" strokeWidth="0.5" opacity="0.4" />
        <line x1="4" y1="24" x2="44" y2="24" stroke="url(#gold-gradient)" strokeWidth="0.5" opacity="0.4" />
        {/* Sparkle dot at top */}
        <circle cx="24" cy="2" r="1.5" fill="#F5E6C0" opacity="0.9" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none select-none">
          <span className="text-base sm:text-lg font-bold tracking-[0.06em] uppercase bg-gradient-to-r from-[#D4A853] via-[#E8D5A3] to-[#C4943F] bg-clip-text text-transparent">
            Content Hub
          </span>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop/mouse)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Instant pinpoint dot
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: "power2.out",
      });

      // Silky interpolated outer follower ring
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.75, borderColor: "#0066FF", duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1, borderColor: "rgba(255, 255, 255, 0.4)", duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Hover detection for clickable items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("article") ||
        target.closest("[role='button']") ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA"
      ) {
        gsap.to(cursor, {
          scale: 1.6,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderColor: "rgba(255, 255, 255, 0.7)",
          duration: 0.25,
        });
      } else {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.4)",
          duration: 0.25,
        });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  return (
    <>
      {/* Outer Follower Ring */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 transition-opacity duration-300 hidden md:block ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Center Pinpoint Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 transition-opacity duration-300 hidden md:block ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

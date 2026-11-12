"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const overlayRef   = useRef<HTMLDivElement>(null);
  const gifRef       = useRef<HTMLDivElement>(null);
  const brandRef     = useRef<HTMLDivElement>(null);
  const taglineRef   = useRef<HTMLDivElement>(null);
  const progressRef  = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const bottomRef    = useRef<HTMLDivElement>(null);

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Hide scrollbar while loading
    document.documentElement.style.overflow = "hidden";

    const overlay    = overlayRef.current;
    const gif        = gifRef.current;
    const brand      = brandRef.current;
    const tagline    = taglineRef.current;
    const progress   = progressRef.current;
    const progressBar= progressBarRef.current;
    const bottom     = bottomRef.current;

    if (!overlay || !gif || !brand || !tagline || !progress || !progressBar || !bottom) return;

    // ── Initial State ──────────────────────────────────────────────
    gsap.set(gif,        { opacity: 0, scale: 0.94 });
    gsap.set(brand,      { opacity: 0, y: 16 });
    gsap.set(tagline,    { opacity: 0, y: 10 });
    gsap.set(progress,   { opacity: 0, y: 8 });
    gsap.set(progressBar,{ scaleX: 0, transformOrigin: "left center" });
    gsap.set(bottom,     { opacity: 0 });

    // Progress counter object
    const counter = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        // Restore scrollbar then exit
        document.documentElement.style.overflow = "";
        gsap.to(overlay, {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
          onComplete,
        });
      },
    });

    // 01 — Animated GIF fades in gracefully
    tl.to(gif, {
      opacity: 1,
      scale: 1,
      duration: 0.65,
      ease: "power2.out",
    });

    // 02 — Brand name slides up
    tl.to(
      brand,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.2"
    );

    // 03 — Tagline fades in
    tl.to(
      tagline,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      },
      "-=0.15"
    );

    // 04 — Progress bar & bottom details appear
    tl.to(
      [progress, bottom],
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: "power2.out",
      },
      "-=0.1"
    );

    // 05 — Progress bar fills to 100% while rose blossoms
    tl.to(
      progressBar,
      {
        scaleX: 1,
        duration: 1.6,
        ease: "power2.inOut",
      },
      "-=0.2"
    );

    // Increment numeric percentage in sync
    tl.to(
      counter,
      {
        val: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => setPercent(Math.round(counter.val)),
      },
      "<"
    );

    // 06 — Hold for bloom crescendo before curtain exit
    tl.to({}, { duration: 0.35 });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#171514] select-none overflow-hidden"
    >
      {/* Ambient luxury radial glow */}
      <div className="absolute w-[540px] h-[540px] bg-[#A76570]/14 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[240px] h-[240px] bg-[#B08A57]/10 rounded-full blur-[70px] pointer-events-none" />

      {/* Main Animated GIF Container */}
      <div
        ref={gifRef}
        style={{ opacity: 0 }}
        className="relative flex flex-col items-center justify-center pointer-events-none select-none"
      >
        <div className="relative w-[280px] h-[230px] sm:w-[320px] sm:h-[264px] flex items-center justify-center drop-shadow-[0_12px_32px_rgba(167,101,112,0.18)]">
          <Image
            src="/rose-loader.gif"
            alt="RoseDsigns Blooming Rose Monogram"
            width={510}
            height={421}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>
      </div>

      {/* Brand Identity / Wordmark */}
      <div
        ref={brandRef}
        style={{ opacity: 0 }}
        className="mt-4 flex flex-col items-center gap-1 pointer-events-none text-center"
      >
        <span className="font-serif text-2xl sm:text-3xl tracking-[0.28em] font-bold text-[#F7F3EC] uppercase">
          RoseDsigns
        </span>
      </div>

      {/* Tagline */}
      <div
        ref={taglineRef}
        style={{ opacity: 0 }}
        className="mt-2 pointer-events-none text-center"
      >
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-[#D9B1AE] font-medium flex items-center justify-center gap-2">
          <span>Ideas that make your brand bloom</span>
          <span className="text-[#B08A57] text-xs">❖</span>
        </span>
      </div>

      {/* Luxury Progress Bar & Percentage */}
      <div
        ref={progressRef}
        style={{ opacity: 0 }}
        className="mt-8 flex flex-col items-center gap-2.5 w-48 sm:w-56 pointer-events-none"
      >
        {/* Track */}
        <div className="w-full h-[2px] bg-[#E8E2D8]/15 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="w-full h-full bg-gradient-to-r from-[#A76570] via-[#B08A57] to-[#D9B1AE] rounded-full"
          />
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between w-full text-[10px] font-mono tracking-widest text-[#A79A8F]">
          <span>LOADING</span>
          <span>{percent}%</span>
        </div>
      </div>

      {/* Bottom Subtitle / Badge */}
      <div
        ref={bottomRef}
        style={{ opacity: 0 }}
        className="absolute bottom-8 text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[#A79A8F]/60 font-mono pointer-events-none"
      >
        Creative · Branding · Advertising
      </div>
    </div>
  );
}

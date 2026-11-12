"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import TextReveal from "./TextReveal";
import GsapReveal from "./GsapReveal";

interface Testimonial {
  quote: string;
  role: string;
  client: string;
  industry: string;
  metric?: string;
  logo: string;
  cover: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "RoseDsigns completely elevated our presence across Western Australia. From our responsive website to social reels that generated over 129,000 organic views during Navaratri, their strategic vision brought our food culture to life.",
    role: "Leadership & Hospitality",
    client: "A2B Perth",
    industry: "South Indian Vegetarian Dining",
    metric: "129K+ Campaign Views",
    logo: "/assets/a2b.webp",
    cover: "/assets/a2b-website-supplied.webp",
  },
  {
    quote:
      "Distributing Indian cinema across Australia, New Zealand, Fiji, and PNG requires immediate visual impact and seamless digital rollouts. RoseDsigns delivered promotional storytelling that connected deeply with filmgoers.",
    role: "Distribution & Marketing",
    client: "Thirai Flicks",
    industry: "Cinema & Live Entertainment",
    metric: "4 Pacific Territories",
    logo: "/assets/thirai.webp",
    cover: "/assets/thirai-full-frame.webp",
  },
  {
    quote:
      "Before we served our first meal, RoseDsigns had already shaped our entire visual identity, packaging design, and teaser reels. They gave Biriyani Box an unforgettable personality that had customers queuing on opening day.",
    role: "Culinary Entrepreneur",
    client: "Biriyani Box",
    industry: "Food & Takeaway Brand",
    metric: "High-Engagement Launch",
    logo: "/assets/biriyani.webp",
    cover: "/assets/biriyani-website-supplied.webp",
  },
];

const AUTOPLAY_MS = 4500;

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setActiveIndex(idx);
  }, []);

  const handleNext = useCallback(() => {
    go((activeIndex + 1) % testimonials.length, 1);
  }, [activeIndex, go]);

  const handlePrev = useCallback(() => {
    go((activeIndex - 1 + testimonials.length) % testimonials.length, -1);
  }, [activeIndex, go]);

  const handleSelect = (idx: number) => {
    if (idx === activeIndex) return;
    go(idx, idx > activeIndex ? 1 : -1);
  };

  // Smooth interval-based autoplay — no drift, resets on manual interaction
  useEffect(() => {
    if (paused) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(handleNext, AUTOPLAY_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [activeIndex, paused, handleNext]);

  const current = testimonials[activeIndex];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 32 : -32, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -32 : 32, opacity: 0 }),
  };

  return (
    <section
      className="py-20 md:py-28 bg-[#F7F3EC] border-t border-[#E8E2D8]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* ── Header ── */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A76570]">
              Client Praise &amp; Impact
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#171514] font-semibold leading-tight">
              <TextReveal as="span" delay={0.1}>Trusted by founders,</TextReveal>
              <br />
              <em className="italic text-[#672D39]">
                <TextReveal as="span" delay={0.3}>celebrated by audiences.</TextReveal>
              </em>
            </h2>
          </div>

          {/* Prev / counter / next */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-[#E8E2D8] bg-white flex items-center justify-center text-[#171514] hover:bg-[#171514] hover:text-white hover:border-[#171514] transition-all duration-300 cursor-pointer active:scale-95"
            >←</button>
            <span className="font-mono text-xs text-[#A79A8F] w-14 text-center tabular-nums">
              0{activeIndex + 1}&nbsp;/&nbsp;0{testimonials.length}
            </span>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-[#E8E2D8] bg-white flex items-center justify-center text-[#171514] hover:bg-[#171514] hover:text-white hover:border-[#171514] transition-all duration-300 cursor-pointer active:scale-95"
            >→</button>
          </div>
        </div>

        {/* ── Main card ── */}
        <GsapReveal>
          <div className="rounded-3xl border border-[#E8E2D8] shadow-sm bg-white overflow-hidden">
            <div className="flex flex-col lg:flex-row">

              {/* Image panel */}
              <div className="relative w-full lg:w-[42%] shrink-0 h-64 sm:h-80 lg:h-auto lg:min-h-[480px] overflow-hidden">
                <AnimatePresence mode="sync" initial={false} custom={direction}>
                  <motion.div
                    key={`cover-${activeIndex}`}
                    initial={{ opacity: 0, x: direction > 0 ? 30 : -30, scale: 1.04 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: direction > 0 ? -20 : 20, scale: 0.98 }}
                    transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={current.cover}
                      alt={current.client}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171514]/65 via-[#171514]/10 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Logo badge */}
                <div className="absolute top-4 right-4 w-11 h-11 rounded-xl bg-white/90 backdrop-blur-sm border border-white/40 p-1.5 shadow-lg overflow-hidden z-10">
                  <Image src={current.logo} alt={current.client} width={40} height={40} className="w-full h-full object-contain" />
                </div>

                {/* Metric badge */}
                {current.metric && (
                  <motion.div
                    key={`metric-${activeIndex}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                    className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#171514]/80 backdrop-blur-sm border border-white/15 text-white text-[10px] font-semibold uppercase tracking-widest"
                  >
                    <span className="text-[#B08A57]">❖</span>
                    <span>{current.metric}</span>
                  </motion.div>
                )}

                {/* Mobile dots */}
                <div className="absolute bottom-4 right-4 z-10 flex gap-1.5 lg:hidden">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      aria-label={`Slide ${i + 1}`}
                      className={`rounded-full transition-all duration-300 cursor-pointer ${
                        i === activeIndex ? "w-5 h-1.5 bg-[#B08A57]" : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Quote panel */}
              <div className="flex-1 flex flex-col p-7 sm:p-9 lg:p-11 relative">

                {/* Decorative quote mark */}
                <span className="absolute top-5 right-7 font-serif text-[6rem] leading-none text-[#B08A57]/10 select-none pointer-events-none">
                  &ldquo;
                </span>

                {/* Animated quote */}
                <div className="flex-1 flex flex-col justify-center min-h-[160px]">
                  <AnimatePresence mode="wait" initial={false} custom={direction}>
                    <motion.div
                      key={`quote-${activeIndex}`}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-5"
                    >
                      <p className="font-serif text-base sm:text-lg lg:text-xl text-[#171514] leading-relaxed italic">
                        &ldquo;{current.quote}&rdquo;
                      </p>
                      <div>
                        <p className="font-sans font-bold text-sm text-[#171514]">{current.client}</p>
                        <p className="text-[11px] text-[#A76570] font-medium tracking-wide uppercase mt-0.5">
                          {current.role} · {current.industry}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Client selector tabs */}
                <div className="mt-8 pt-6 border-t border-[#E8E2D8] grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {testimonials.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                        activeIndex === idx
                          ? "bg-[#171514] border-[#171514]"
                          : "bg-[#F7F3EC] border-[#E8E2D8] hover:border-[#A79A8F] hover:bg-white"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg overflow-hidden shrink-0 border ${
                        activeIndex === idx ? "border-white/20 bg-white/10" : "border-[#E8E2D8] bg-white"
                      }`}>
                        <Image src={item.logo} alt={item.client} width={32} height={32} className="w-full h-full object-contain p-0.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-serif text-xs font-semibold leading-tight truncate ${activeIndex === idx ? "text-white" : "text-[#171514]"}`}>
                          {item.client}
                        </p>
                        <p className={`text-[9px] uppercase tracking-wider mt-0.5 truncate ${activeIndex === idx ? "text-[#D9B1AE]" : "text-[#A79A8F]"}`}>
                          {item.industry}
                        </p>
                      </div>
                      {/* Progress bar on active */}
                      {activeIndex === idx && !paused && (
                        <div className="shrink-0 w-0.5 h-6 bg-white/20 rounded-full overflow-hidden ml-auto">
                          <motion.div
                            key={`prog-${activeIndex}`}
                            className="w-full bg-[#B08A57] rounded-full origin-top"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                            style={{ height: "100%" }}
                          />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GsapReveal>

        {/* Desktop dot indicators */}
        <div className="hidden lg:flex justify-center gap-2 mt-7">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex ? "w-6 h-1.5 bg-[#B08A57]" : "w-1.5 h-1.5 bg-[#E8E2D8] hover:bg-[#A79A8F]"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

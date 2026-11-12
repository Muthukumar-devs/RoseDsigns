"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  { value: 129,  suffix: "K+", label: "Campaign Views",      description: "Organic reach on a single viral reel campaign" },
  { value: 8,    suffix: "+",  label: "Brands Built",        description: "Distinctive identities crafted from the ground up" },
  { value: 4,    suffix: "",   label: "Pacific Territories",  description: "Cinema campaigns across AU, NZ, Fiji & PNG" },
  { value: 100,  suffix: "%",  label: "Client Satisfaction",  description: "Every project delivered with care and precision" },
];

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  return (
    <span>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section id="stats" ref={sectionRef} className="bg-[#F7F3EC] py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: image ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-none">
              <Image
                src="/assets/philosophy-brand-board.webp"
                alt="RoseDsigns brand board"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 bg-[#171514]/80 backdrop-blur-sm px-4 py-2.5 border border-[#B08A57]/30">
                <p className="text-[9px] uppercase tracking-[0.28em] text-[#B08A57] font-semibold">RoseDsigns Studio</p>
                <p className="text-xs text-white/70 mt-0.5">Perth, Western Australia</p>
              </div>
            </div>
            {/* Decorative gold line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
              className="h-[2px] bg-gradient-to-r from-[#B08A57] to-transparent mt-4"
            />
          </motion.div>

          {/* ── Right: stats + copy ── */}
          <div className="space-y-10">
            {/* Eyebrow + heading */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#A76570]">
                04 / Impact & Numbers
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#171514] font-semibold leading-tight">
                Results that speak.<br />
                <em className="italic text-[#672D39]">Brands that endure.</em>
              </h2>
              <p className="text-sm text-[#171514]/65 font-sans leading-relaxed max-w-md">
                Every number represents a real brand, a real audience, and a real story brought to life through considered creative work.
              </p>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.15 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-1 border-t border-[#E8E2D8] pt-4"
                >
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-[#171514] leading-none">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A76570]">
                    {stat.label}
                  </p>
                  <p className="text-xs text-[#171514]/55 font-sans leading-relaxed">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

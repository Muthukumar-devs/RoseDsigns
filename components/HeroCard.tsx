"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface HeroCardProps {
  play?: boolean;
}

export default function HeroCard({ play = false }: HeroCardProps) {
  return (
    <div className="relative w-full select-none">

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-[#A76570]/10 blur-3xl"
      />

      {/* Main card — width-wipe reveal (same method as real-estate hero) */}
      <motion.div
        initial={{ width: "0%" }}
        animate={play ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        className="relative overflow-hidden rounded-[2rem] border border-[#B08A57]/25 bg-[#171514] shadow-2xl"
      >
        <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden" style={{ minWidth: 340 }}>

          <Image
            src="/hero-studio-workspace.jpg"
            alt="RoseDsigns studio workspace"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 480px"
          />

          {/* Top-left: studio label */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#171514]/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#B08A57]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A76570]" />
            <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-[#D9B1AE]">
              RoseDsigns
            </span>
          </div>

          {/* Bottom gradient + brand mark */}
          <div className="absolute bottom-0 left-0 right-0 z-10 h-20 bg-gradient-to-t from-[#171514] to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-0 right-0 z-10 flex items-center justify-between px-5">
            <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-[#D9B1AE]/70">
              Perth · WA
            </span>
            <span className="text-[#B08A57]/80 text-xs">❖</span>
          </div>
        </div>
      </motion.div>

      {/* Floor shadow glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 h-14 w-3/4 -translate-x-1/2 rounded-full bg-[#A76570]/15 blur-2xl"
      />
    </div>
  );
}

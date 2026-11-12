"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TextReveal from "./TextReveal";
import GsapReveal from "./GsapReveal";

export default function StudioPhilosophy() {
  const steps = [
    {
      num: "01",
      name: "Discover",
      desc: "Your story, audience and ambitions.",
      tag: "Immersion & Clarity",
    },
    {
      num: "02",
      name: "Create",
      desc: "A distinctive identity and digital presence.",
      tag: "Craft & Architecture",
    },
    {
      num: "03",
      name: "Connect",
      desc: "Bring your brand to the people who matter.",
      tag: "Campaigns & Growth",
    },
  ];

  const brandMotifs = [
    {
      symbol: "The Rose",
      meaning: "Symbolises creativity, growth and flourishing ideas.",
      accent: "text-[#A76570]",
    },
    {
      symbol: "The Letter D",
      meaning: "Strength, structure, and foundational identity.",
      accent: "text-[#171514]",
    },
    {
      symbol: "The Curve",
      meaning: "Used as an organic graphic element across brand creatives.",
      accent: "text-[#B08A57]",
    },
    {
      symbol: "The Diamond ❖",
      meaning: "A refined accent for precision dividers and luxury icons.",
      accent: "text-[#672D39]",
    },
  ];

  return (
    <section
      id="studio"
      className="py-24 md:py-32 bg-[#F7F3EC] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Showcase of Studio Identity with GSAP Reveal */}
          <GsapReveal className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#B08A57]/30 shadow-2xl bg-white p-4 group">
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-[#F7F3EC] shadow-sm">
                <Image
                  src="/assets/studio-brand-showcase.jpg"
                  alt="RoseDsigns Editorial Studio & Bespoke Brand Identity Showcase"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                {/* Floating Studio Badge */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-3 left-3 bg-[#171514]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[#F7F3EC] flex items-center gap-2 shadow-md"
                >
                  <span className="w-2 h-2 rounded-full bg-[#D9B1AE]" />
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white">
                    Bespoke Studio Craft
                  </span>
                </motion.div>
              </div>

              {/* Aesthetic Card Footer */}
              <div className="pt-4 px-2 flex items-center justify-between text-[11px] uppercase tracking-widest text-[#A79A8F]">
                <span>Tactile Brand Identity</span>
                <span className="text-[#672D39] font-semibold flex items-center gap-1.5">
                  <span>RoseDsigns Studio</span>
                  <span className="text-[#B08A57]">❖</span>
                </span>
              </div>
            </div>
          </GsapReveal>

          {/* Right Column: Philosophy Narrative & Steps */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B08A57]/30 bg-white/60">
                <span className="text-[#A76570] text-xs">❖</span>
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#672D39]">
                  Our Philosophy
                </span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#171514] font-semibold leading-tight">
                <TextReveal as="span" delay={0.1}>
                  Rooted in purpose.
                </TextReveal>{" "}
                <br />
                <em className="italic text-[#A76570]">
                  <TextReveal as="span" delay={0.3}>
                    Made to be seen.
                  </TextReveal>
                </em>
              </h2>

              <p className="text-lg sm:text-xl text-[#171514]/90 font-sans leading-relaxed">
                We create{" "}
                <strong className="font-semibold text-[#171514]">
                  meaningful brands
                </strong>
                ,{" "}
                <strong className="font-semibold text-[#171514]">
                  compelling content
                </strong>{" "}
                and{" "}
                <strong className="font-semibold text-[#171514]">
                  impactful campaigns
                </strong>{" "}
                that help businesses stand out and grow.
              </p>

              <p className="text-base text-[#171514]/75 font-sans leading-relaxed">
                Every brand has a story worth telling. We bring clarity, care,
                and creativity to the way yours is seen, heard, and remembered.
              </p>
            </div>

            {/* 3 Steps */}
            <GsapReveal delay={0.2} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E8E2D8]">
              {steps.map((st) => (
                <div
                  key={st.num}
                  className="p-5 rounded-2xl bg-white/80 border border-[#E8E2D8] space-y-2 hover:bg-white hover:border-[#A76570]/40 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#A79A8F] group-hover:text-[#A76570]">
                      {st.num}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-[#A76570]">
                      {st.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-[#171514] font-medium">
                    {st.name}
                  </h3>
                  <p className="text-xs text-[#171514]/70 font-sans leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              ))}
            </GsapReveal>
          </div>
        </div>

        {/* Brand Elements Breakdown */}
        <GsapReveal className="bg-white rounded-3xl p-8 lg:p-12 border border-[#E8E2D8] shadow-xs">
          <div className="border-b border-[#E8E2D8] pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#A76570]">
                Brand DNA &amp; Motifs
              </p>
              <h3 className="font-serif text-lg sm:text-xl text-[#171514] font-semibold mt-1">
                The Anatomy of RoseDsigns
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#171514]/70 max-w-md">
              Each visual element is deeply intentional, pairing organic grace
              with architectural poise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandMotifs.map((motif, mIdx) => (
              <motion.div
                key={mIdx}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl bg-[#F7F3EC] border border-[#E8E2D8] space-y-3 hover:border-[#B08A57]/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h4
                    className={`font-serif text-lg font-semibold ${motif.accent}`}
                  >
                    {motif.symbol}
                  </h4>
                  <span className="text-[#A79A8F] text-xs">❖</span>
                </div>
                <p className="text-xs text-[#171514]/75 font-sans leading-relaxed">
                  {motif.meaning}
                </p>
              </motion.div>
            ))}
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}

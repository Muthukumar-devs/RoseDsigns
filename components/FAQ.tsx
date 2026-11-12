"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import TextReveal from "./TextReveal";
import GsapReveal from "./GsapReveal";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question:
      "What is your typical timeline for a branding or website project?",
    answer:
      "A focused visual identity and brand guidelines package generally takes 2 to 4 weeks. Full custom responsive website design and development typically spans 3 to 6 weeks, which includes content architecture, mobile optimization, and testing.",
  },
  {
    question:
      "Can RoseDsigns handle both visual design and full technical development?",
    answer:
      "Yes. We are a unified creative & digital studio. We guide you from initial brand strategy, logo typography, and art direction, right through to responsive web development, WhatsApp integrations, and Google Business setup.",
  },
  {
    question: "Do you collaborate with brands outside of Perth?",
    answer:
      "Absolutely. While we are proudly based in Western Australia, our portfolio spans clients across Australia, New Zealand, Fiji, Papua New Guinea, and global digital markets.",
  },
  {
    question: "What deliverables are included in a brand identity project?",
    answer:
      "You receive a complete brand system: primary logo, monochrome/minimalist variants, full colour palette specs, typography hierarchy, social media templates, and comprehensive brand guidelines for consistent execution across digital and print media.",
  },
  {
    question: "How do we take the first step together?",
    answer:
      "Use our interactive brief builder below to select your desired services and share a quick note about your vision. We will review your brief and coordinate an initial discovery consultation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 md:py-32 bg-[#F7F3EC] border-t border-[#E8E2D8]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-12">
        {/* Header with Text Reveal */}
        <div className="text-center space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#A76570]">
            COMMON QUESTIONS
          </p>
          <h2 className="font-serif text-xl sm:text-2xl text-[#171514] font-semibold">
            <TextReveal as="span" delay={0.1}>
              Everything you need
            </TextReveal>{" "}
            <br />
            <em className="italic text-[#183B32]">
              <TextReveal as="span" delay={0.3}>
                to know before we begin.
              </TextReveal>
            </em>
          </h2>
        </div>

        {/* FAQ Accordion List with Motion */}
        <GsapReveal>
          <div className="divide-y divide-[#E8E2D8] border-y border-[#E8E2D8]">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={idx} className="transition-colors hover:bg-white/40">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full py-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-sm sm:text-base text-[#171514] font-semibold pr-4 group-hover:text-[#672D39] transition-colors">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-8 h-8 rounded-full border border-[#E8E2D8] flex items-center justify-center text-sm shrink-0 ${
                        isOpen
                          ? "bg-[#171514] text-[#F7F3EC]"
                          : "bg-white text-[#171514] group-hover:border-[#A76570]"
                      }`}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.25, 1, 0.5, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pr-8 text-sm sm:text-base text-[#171514]/80 font-sans leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </GsapReveal>

        {/* Quick Contact Prompt */}
        <GsapReveal delay={0.2}>
          <div className="p-6 rounded-2xl bg-white border border-[#E8E2D8] text-center space-y-3">
            <p className="text-sm text-[#171514]/80 font-sans">
              Have a unique project or need a custom solution?
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#672D39] hover:underline"
            >
              <span>Start a conversation with our team</span>
              <span>↗</span>
            </Link>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}

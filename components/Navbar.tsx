"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.location.hash) window.history.pushState(null, "", window.location.pathname);
    setMobileOpen(false);
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", `#${id}`);
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "Our work",   id: "work"     },
    { label: "Services",   id: "services" },
    { label: "The studio", id: "studio"   },
    { label: "Stats",      id: "stats"    },
    { label: "FAQ",        id: "faq"      },
  ];

  const mobileLinks = [
    { label: "Our Work",   id: "work"     },
    { label: "Services",   id: "services" },
    { label: "The Studio", id: "studio"   },
    { label: "Stats",      id: "stats"    },
    { label: "FAQ",        id: "faq"      },
  ];

  return (
    <>
      {/* ── Sticky Header ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500 ${
          isScrolled
            ? "translate-y-0 opacity-100 pointer-events-auto bg-[#0F1923]/95 backdrop-blur-xl border-b-2 border-[#B08A57]/60 shadow-lg py-0"
            : "translate-y-0 opacity-100 pointer-events-auto bg-[#0F1923] border-b-2 border-[#B08A57]/60 py-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-14 flex items-center justify-between h-[88px]">

          {/* Logo */}
          <Link
            href="/"
            onClick={scrollToTop}
            className="flex items-center gap-4 cursor-pointer select-none"
            aria-label="RoseDsigns — Return to top"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="relative w-16 h-16 shrink-0"
            >
              <Image
                src="/assets/transparent-monogram.webp"
                alt="RoseDsigns monogram"
                fill
                sizes="64px"
                className="object-contain drop-shadow-sm"
                priority
              />
            </motion.div>
            <span
              className="font-serif text-[1.65rem] font-bold leading-none tracking-[0.08em]"
              style={{ color: "#B08A57", fontVariant: "small-caps" }}
            >
              RoseDsigns
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => scrollToSection(e, id)}
                className="relative text-[0.88rem] font-normal text-white/80 hover:text-white transition-colors duration-200 cursor-pointer group py-1"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B08A57] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-[0.88rem] font-normal text-[#B08A57] border border-[#B08A57]/70 hover:border-[#B08A57] hover:bg-[#B08A57]/10 transition-all duration-200 cursor-pointer"
            >
              Let&apos;s create ↗
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="md:hidden flex items-center justify-center w-10 h-10 text-white/80 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Open menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Full-screen Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] md:hidden bg-[#0A1018] text-white flex flex-col overflow-hidden"
          >
            {/* Ambient glow */}
            <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#A76570]/8 rounded-full blur-[100px]" />
            <div className="pointer-events-none absolute bottom-1/4 right-0 w-[200px] h-[200px] bg-[#B08A57]/8 rounded-full blur-[80px]" />

            {/* Drawer header */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
              className="flex items-center justify-between px-6 pt-8 pb-6 border-b border-[#B08A57]/20"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 shrink-0">
                  <Image
                    src="/assets/transparent-monogram.webp"
                    alt="RoseDsigns monogram"
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="font-serif text-xl font-bold tracking-[0.08em] block" style={{ color: "#B08A57" }}>
                    RoseDsigns
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.28em] text-white/40">
                    Creative · Branding · Advertising
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/8 border border-white/10 text-white hover:bg-white/15 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>

            {/* Nav links — staggered */}
            <nav className="flex flex-col px-6 py-6 gap-0 flex-1 justify-center">
              {mobileLinks.map(({ label, id }, index) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => scrollToSection(e, id)}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center justify-between py-4 border-b border-white/8 last:border-b-0 cursor-pointer"
                >
                  <span className="text-2xl font-serif font-light tracking-tight text-white group-hover:text-[#D9B1AE] transition-colors duration-200">
                    {label}
                  </span>
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.07, duration: 0.35 }}
                    className="text-[#B08A57]/60 group-hover:text-[#B08A57] transition-colors"
                  >
                    ↗
                  </motion.span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 pb-10 pt-6 border-t border-[#B08A57]/20"
            >
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="w-full flex items-center justify-center gap-2 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#0F1923] bg-[#B08A57] hover:bg-[#D9B1AE] transition-colors cursor-pointer"
              >
                Let&apos;s create together ↗
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

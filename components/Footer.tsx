"use client";

import Image from "next/image";

const YEAR = 2026;

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0F1923] border-t border-[#B08A57]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

        {/* Left: Logo + tagline */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 shrink-0">
            <Image
              src="/assets/transparent-monogram.webp"
              alt="RoseDsigns monogram"
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          <div>
            <span
              className="font-serif text-[1.4rem] font-bold tracking-[0.08em] leading-none block"
              style={{ color: "#B08A57", fontVariant: "small-caps" }}
            >
              RoseDsigns
            </span>
            <span className="text-[9px] uppercase tracking-[0.28em] text-white/35 font-medium">
              Brands that Bloom.
            </span>
          </div>
        </div>

        {/* Center: disciplines */}
        <p className="text-[0.82rem] text-white/50 tracking-wide">
          Creative · Branding · Advertising
        </p>

        {/* Right: back to top + copyright */}
        <div className="flex items-center gap-6 text-[0.78rem] text-white/40">
          <span>© {YEAR} RoseDsigns</span>
          <button
            onClick={scrollToTop}
            className="text-white/50 hover:text-[#B08A57] transition-colors cursor-pointer flex items-center gap-1"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

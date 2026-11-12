"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import RoseBlossom from "./RoseBlossom";
import HeroCard from "./HeroCard";

interface HeroProps {
  isLoading?: boolean;
}

export default function Hero({ isLoading = false }: HeroProps) {
  const containerRef   = useRef<HTMLElement>(null);
  const heroPanelRef   = useRef<HTMLDivElement>(null);
  const showcaseRef    = useRef<HTMLDivElement>(null);
  const introRef       = useRef<gsap.core.Timeline | null>(null);
  const introDoneRef   = useRef(false);

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", `#${id}`);
  };

  // Play intro when loading screen exits
  useEffect(() => {
    if (!isLoading && introRef.current && !introDoneRef.current) {
      introRef.current.play();
      introRef.current.then(() => { introDoneRef.current = true; });
    }
  }, [isLoading]);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add(
          {
            desktop: "(min-width: 1024px)",
            mobile: "(max-width: 1023px)",
            reduceMotion: "(prefers-reduced-motion: reduce)",
          },
          (context) => {
            const { desktop, reduceMotion } = context.conditions as {
              desktop: boolean;
              mobile: boolean;
              reduceMotion: boolean;
            };

            const panel    = heroPanelRef.current;
            const showcase = showcaseRef.current;

            if (!panel || !showcase) return;

            // ── Reduced motion: clear everything ──────────────────
            if (reduceMotion) {
              gsap.set(
                [panel, showcase, ".hero-eyebrow", ".hero-line-inner", ".hero-cta", ".hero-meta-row"],
                { clearProps: "all" }
              );
              return;
            }

            // ── Initial state ──────────────────────────────────────
            // If intro already played (tab switch / resize), skip hiding
            if (introDoneRef.current) {
              gsap.set(
                [showcase, ".hero-eyebrow", ".hero-line-inner", ".hero-cta", ".hero-meta-row"],
                { clearProps: "all" }
              );
            } else {
            gsap.set(".hero-eyebrow", { y: 20, opacity: 0 });
            gsap.set(".hero-line-inner", { yPercent: 115, opacity: 0 });
            gsap.set(".hero-cta", { y: 22, opacity: 0 });
            gsap.set(".hero-meta-row", { y: 14, opacity: 0 });
            }

            // ── Master intro timeline — paused until loading exits ─
            const intro = gsap.timeline({
              paused: true,
              defaults: { ease: "power3.out" },
            });

            introRef.current = intro;

            if (!isLoading && !introDoneRef.current) intro.play();

            intro.then(() => { introDoneRef.current = true; });

            // 01 — Eyebrow
            intro.to(
              ".hero-eyebrow",
              { y: 0, opacity: 1, duration: 0.7 },
              0.1
            );

            // 02 — Headline lines stagger
            intro.to(
              ".hero-line-inner",
              {
                yPercent: 0,
                opacity: 1,
                duration: desktop ? 1.0 : 0.85,
                stagger: desktop ? 0.1 : 0.07,
                ease: "power4.out",
              },
              0.2
            );

            // 03 — CTA buttons
            intro.to(
              ".hero-cta",
              { y: 0, opacity: 1, duration: 0.75, stagger: 0.1 },
              0.65
            );

            // 04 — Meta row
            intro.to(
              ".hero-meta-row",
              { y: 0, opacity: 1, duration: 0.65 },
              0.75
            );

            // 05 — Showcase card handled by HeroCard Framer Motion width-wipe

            // ── Idle float on showcase card ────────────────────────
            gsap.to(showcase, {
              y: desktop ? -6 : -3,
              duration: 3.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 2.5,
            });

            // ── Button micro-interactions ──────────────────────────
            const btns = containerRef.current?.querySelectorAll(".hero-magnetic");
            btns?.forEach((btn) => {
              btn.addEventListener("mouseenter", () =>
                gsap.to(btn, { y: -2, duration: 0.3, ease: "power3.out" })
              );
              btn.addEventListener("mouseleave", () =>
                gsap.to(btn, { y: 0, duration: 0.4, ease: "power3.out" })
              );
            });
          }
        );

        return () => mm.revert();
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative pt-10 pb-20 md:pt-16 md:pb-28 bg-[#F7F3EC]"
    >
      {/* Ambient background glows — reduced motion, no layout impact */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D9B1AE]/15 rounded-full blur-3xl pointer-events-none -z-0"
      />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#B08A57]/12 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Rose blossom — large decorative, top-right of left column */}
      <div className="absolute top-0 left-[38%] -translate-x-1/2 -translate-y-[18%] pointer-events-none select-none hidden lg:block" style={{ opacity: 0.28, zIndex: 1 }}>
        <RoseBlossom play={!isLoading} size={520} />
      </div>
      {/* Mobile rose — smaller, top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[22%] pointer-events-none select-none lg:hidden" style={{ opacity: 0.22, zIndex: 1 }}>
        <RoseBlossom play={!isLoading} size={300} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Hero panel — clip-path revealed by GSAP */}
        <div
          ref={heroPanelRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center"
        >
          {/* ── Left: storytelling ── */}
          <div className="lg:col-span-7 space-y-6 text-left relative">

            {/* Inline rose accent — desktop only */}
            <div className="hidden lg:block absolute -top-8 right-0 pointer-events-none select-none" style={{ opacity: 0.75 }}>
              <RoseBlossom play={!isLoading} size={88} />
            </div>

            {/* Eyebrow */}
            <p className="hero-eyebrow text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#171514]/50">
              RoseDsigns / Creative &amp; Digital Studio
            </p>

            {/* Headline */}
            <div className="space-y-0">
              <h1 className="font-serif text-[2rem] sm:text-[2.6rem] lg:text-[3rem] xl:text-[3.4rem] tracking-tight text-[#171514] font-bold leading-[1.05]">
                <span className="block relative overflow-hidden pb-1">
                  <span className="hero-line-inner inline-block">Ideas that make</span>
                </span>
                <span className="block relative overflow-hidden pb-1">
                  <span className="hero-line-inner inline-block">
                    your brand{" "}
                    <em className="italic font-normal text-[#A76570]">bloom.</em>
                    <span className="inline-block align-middle ml-2 -mt-1 pointer-events-none select-none" style={{ opacity: 0.7 }}>
                      <RoseBlossom size={36} />
                    </span>
                  </span>
                </span>
              </h1>
            </div>

            {/* Body copy */}
            <p className="hero-cta max-w-sm text-[0.95rem] text-[#171514]/60 font-sans leading-relaxed">
              Distinctive identities. Considered websites. Stories that connect.
              We shape a presence that feels unmistakably yours.
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-start gap-3 pt-1">
              <a
                href="#work"
                onClick={(e) => scrollTo(e, "work")}
                className="hero-cta hero-magnetic inline-flex items-center gap-3 px-7 py-3.5 rounded-none text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F7F3EC] bg-[#171514] hover:bg-[#672D39] shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                <span>Discover our work</span>
                <span className="text-[#D9B1AE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
              </a>
              <a
                href="#services"
                onClick={(e) => scrollTo(e, "services")}
                className="hero-cta hero-magnetic text-[11px] font-semibold uppercase tracking-[0.2em] text-[#171514]/60 hover:text-[#171514] underline underline-offset-4 decoration-[#171514]/25 hover:decoration-[#171514] transition-all duration-300 cursor-pointer"
              >
                Discover what we do
              </a>
            </div>

            {/* Meta row */}
            <div className="hero-meta-row pt-5 border-t border-[#E8E2D8] flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A79A8F] max-w-sm">
              <span>Strategy Meets Creativity</span>
              <span>01 — RoseDsigns</span>
            </div>
          </div>

          {/* ── Right: HeroCard ── */}
          <div ref={showcaseRef} className="lg:col-span-5 relative">
            <HeroCard play={!isLoading} />
          </div>
        </div>
      </div>
    </section>
  );
}

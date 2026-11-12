"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import TextReveal from "./TextReveal";
import GsapReveal from "./GsapReveal";

interface SlideItem {
  image: string;
  title: string;
  url: string;
  type?: "reel" | "image";
}

interface ChannelGroup {
  heading: string;
  links: { label: string; url: string }[];
}

interface ProjectItem {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  websiteUrl?: string;
  videoId?: string;
  metrics?: string;
  slides: SlideItem[];
  channelGroups: ChannelGroup[];
}

const projects: ProjectItem[] = [
  {
    id: "a2b-perth",
    name: "A2B Perth",
    logo: "/assets/a2b.webp",
    category: "Food & Hospitality",
    description:
      "Bringing the flavours and traditions of South Indian vegetarian dining to Perth. For A2B's Harrisdale and Yokine locations, our portfolio brings together a welcoming website, vibrant social content and reels that showcase festive meals, signature catering and the experience behind the food.",
    websiteUrl: "https://a2bperth.com.au",
    videoId: "yHSzoPraJVQ",
    metrics: "129K+ Views on Viral Navaratri Campaign",
    slides: [
      { image: "/assets/a2b-facebook-hd.webp",            title: "A2B Perth · Facebook",          url: "https://www.facebook.com/profile.php?id=61550215796504" },
      { image: "/assets/a2b-catering-thumbnail.webp",     title: "A2B Perth · Catering Film",     url: "https://www.youtube.com/watch?v=yHSzoPraJVQ", type: "reel" },
      { image: "/assets/a2b-website-supplied.webp",       title: "A2B Perth · Website",           url: "https://a2bperth.com.au" },
      { image: "/assets/a2b-instagram-hd.webp",           title: "A2B Perth · Instagram",         url: "https://www.instagram.com/a2bperth/" },
    ],
    channelGroups: [
      {
        heading: "Harrisdale / A2B Perth",
        links: [
          { label: "Facebook · Harrisdale", url: "https://www.facebook.com/profile.php?id=61550215796504" },
          { label: "Instagram · A2B Perth",  url: "https://www.instagram.com/a2bperth/" },
        ],
      },
      {
        heading: "Yokine",
        links: [
          { label: "Facebook · Yokine",   url: "https://www.facebook.com/profile.php?id=61576073338236" },
          { label: "Instagram · Yokine",  url: "https://www.instagram.com/a2byokine/" },
        ],
      },
    ],
  },
  {
    id: "thirai-flicks",
    name: "Thirai Flicks",
    logo: "/assets/thirai.webp",
    category: "Film & Entertainment",
    description:
      "Bringing Indian cinema and live entertainment to audiences across Australia, New Zealand, Fiji and Papua New Guinea. Our Thirai Flicks portfolio connects film releases, promotional video and social storytelling, creating a cohesive digital presence that brings audiences closer to the stories and events they love.",
    websiteUrl: "https://thiraiflicks.com/past-releases",
    videoId: "WGW4HYoVm_I",
    metrics: "Pan-Oceanic Cinema Campaigns",
    slides: [
      { image: "/assets/thirai-full-frame.webp",          title: "Thirai Flicks · Featured Film",  url: "https://www.youtube.com/watch?v=WGW4HYoVm_I", type: "reel" },
      { image: "/assets/thirai-facebook-featured.webp",   title: "Thirai Flicks · Facebook",       url: "https://www.facebook.com/thiraiflicks1" },
      { image: "/assets/thirai-instagram-hd.webp",        title: "Thirai Flicks · Instagram",      url: "https://www.instagram.com/thiraiflicks/" },
    ],
    channelGroups: [
      {
        heading: "Channels",
        links: [
          { label: "Facebook Community",  url: "https://www.facebook.com/thiraiflicks1" },
          { label: "Instagram Releases",  url: "https://www.instagram.com/thiraiflicks/" },
        ],
      },
    ],
  },
  {
    id: "biriyani-box",
    name: "Biriyani Box",
    logo: "/assets/biriyani.webp",
    category: "Food & Takeaway",
    description:
      "A South Indian biriyani and takeaway brand preparing to bring bold flavours to Perth. Our Biriyani Box portfolio brings together a distinctive identity, a digital presence and playful launch reels that build anticipation and introduce the brand's food and personality.",
    websiteUrl: "https://biriyanibox.com.au",
    metrics: "Launch Teasers & High-Engagement Reels",
    slides: [
      { image: "/assets/biriyani-facebook-hd.webp",  title: "Biriyani Box · Website",   url: "https://biriyanibox.com.au" },
      { image: "/assets/biriyani-website-supplied.webp",       title: "Biriyani Box · Facebook",  url: "https://www.facebook.com/profile.php?id=61594620573498" },
    ],
    channelGroups: [
      {
        heading: "Channels",
        links: [
          { label: "Facebook Official",  url: "https://www.facebook.com/profile.php?id=61594620573498" },
          { label: "Instagram Official", url: "https://www.instagram.com/biriyanibox_bb/" },
        ],
      },
    ],
  },
];

const upcomingProjects = [
  { title: "Reflections",      subtitle: "The resilience of extraordinary lives",      category: "Documentary & Storytelling" },
  { title: "Palayam Peppers",  subtitle: "A new culinary story rooted in spice",       category: "Culinary & Brand Identity"  },
];

export default function Portfolio() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [slideIndices, setSlideIndices] = useState<Record<string, number>>({
    "a2b-perth": 0, "thirai-flicks": 0, "biriyani-box": 0,
  });
  const [slideDirections, setSlideDirections] = useState<Record<string, number>>({
    "a2b-perth": 1, "thirai-flicks": 1, "biriyani-box": 1,
  });

  const nextSlide = (id: string, max: number) => {
    setSlideDirections((p) => ({ ...p, [id]: 1 }));
    setSlideIndices((p) => ({ ...p, [id]: ((p[id] ?? 0) + 1) % max }));
  };
  const prevSlide = (id: string, max: number) => {
    setSlideDirections((p) => ({ ...p, [id]: -1 }));
    setSlideIndices((p) => ({ ...p, [id]: ((p[id] ?? 0) - 1 + max) % max }));
  };

  return (
    <section id="work" className="py-24 md:py-32 bg-[#F7F3EC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Section header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#E8E2D8] pb-14 mb-20">
          <div className="lg:col-span-8 space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#A76570]">
              01 / The Portfolio
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#171514] font-semibold leading-tight">
              <TextReveal as="span" delay={0.1}>Distinctive brands.</TextReveal>{" "}
              <br />
              <em className="italic text-[#672D39]">
                <TextReveal as="span" delay={0.3}>Thoughtfully brought to life.</TextReveal>
              </em>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <p className="text-sm text-[#171514]/70 font-sans max-w-sm lg:ml-auto">
              A selection of identities, digital experiences, and stories across food, hospitality, and entertainment.
            </p>
          </div>
        </div>

        {/* ── Project entries ── */}
        <div className="space-y-0">
          {projects.map((project, idx) => {
            const slideIdx = slideIndices[project.id] ?? 0;
            const slide    = project.slides[slideIdx];
            const dir      = slideDirections[project.id] ?? 1;

            return (
              <GsapReveal key={project.id} delay={idx * 0.08}>
                <article className={`grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-start py-16 border-b border-[#E8E2D8] last:border-b-0 ${idx % 2 === 1 ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}>

                  {/* ── Left: image slider ── */}
                  <div className="space-y-4">
                    {/* Image */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#E8E2D8]">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={`${project.id}-${slideIdx}`}
                          initial={{ x: dir > 0 ? 60 : -60, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: dir > 0 ? -60 : 60, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          {/* Reel play button */}
                          {slide.type === "reel" && (
                            <button
                              onClick={() => setActiveVideo(project.videoId || "")}
                              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#171514]/75 text-white flex items-center justify-center text-xl hover:bg-[#672D39] hover:scale-110 transition-all shadow-xl cursor-pointer z-20"
                              aria-label="Play reel"
                            >
                              ▶
                            </button>
                          )}
                          <a href={slide.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" aria-label={slide.title} />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Slide counter + arrows */}
                    <div className="flex items-center justify-between text-xs text-[#171514]/60 px-0.5">
                      <span className="font-mono text-[11px]">
                        {String(slideIdx + 1).padStart(2, "0")} / {String(project.slides.length).padStart(2, "0")}
                        {" — "}
                        <span className="text-[#171514]/80 font-medium">{slide.title}</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => prevSlide(project.id, project.slides.length)}
                          className="w-9 h-9 border border-[#E8E2D8] flex items-center justify-center text-[#171514] hover:bg-[#E8E2D8] transition-colors cursor-pointer active:scale-90"
                          aria-label="Previous"
                        >←</button>
                        <button
                          onClick={() => nextSlide(project.id, project.slides.length)}
                          className="w-9 h-9 border border-[#E8E2D8] flex items-center justify-center text-[#171514] hover:bg-[#E8E2D8] transition-colors cursor-pointer active:scale-90"
                          aria-label="Next"
                        >→</button>
                      </div>
                    </div>
                  </div>

                  {/* ── Right: project details ── */}
                  <div className="space-y-6 pt-2 lg:pt-4">

                    {/* Category + logo */}
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#A76570]">
                        {project.category}
                      </p>
                      <div className="relative w-20 h-14 shrink-0 border border-[#E8E2D8] bg-white p-1.5 flex items-center justify-center">
                        <Image
                          src={project.logo}
                          alt={`${project.name} logo`}
                          width={64}
                          height={44}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    </div>

                    {/* Project name */}
                    <h3 className="font-serif text-4xl sm:text-5xl text-[#171514] font-semibold leading-tight tracking-tight">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-[#171514]/75 font-sans leading-relaxed">
                      {project.description}
                    </p>

                    {/* Visit website */}
                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-[#171514] border-b border-[#171514]/40 hover:border-[#A76570] hover:text-[#A76570] transition-colors pb-0.5"
                      >
                        Visit website ↗
                      </a>
                    )}

                    {/* Follow channels */}
                    <div className="pt-2 space-y-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#171514]/50">
                        Follow {project.name}
                      </p>
                      <div className={`grid gap-x-8 gap-y-4 ${project.channelGroups.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                        {project.channelGroups.map((group, gIdx) => (
                          <div key={gIdx} className="space-y-2">
                            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#A79A8F]">
                              {group.heading}
                            </p>
                            {group.links.map((link, lIdx) => (
                              <a
                                key={lIdx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sm text-[#171514] hover:text-[#A76570] transition-colors group"
                              >
                                <span className="border-b border-[#171514]/25 group-hover:border-[#A76570] pb-px">
                                  {link.label}
                                </span>
                                <span className="text-xs opacity-60 group-hover:opacity-100">↗</span>
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metric badge */}
                    {project.metrics && (
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#B08A57]/40 text-[11px] font-semibold uppercase tracking-wider text-[#B08A57]">
                        <span>❖</span><span>{project.metrics}</span>
                      </div>
                    )}
                  </div>
                </article>
              </GsapReveal>
            );
          })}
        </div>

        {/* ── On the horizon ── */}
        <GsapReveal delay={0.2} className="pt-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B08A57] mb-8">
            On The Horizon
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingProjects.map((item, idx) => (
              <div
                key={idx}
                className="p-8 border border-[#E8E2D8] bg-white flex flex-col justify-between hover:border-[#A76570]/40 transition-all duration-300"
              >
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#A79A8F]">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-2xl text-[#171514] font-medium">{item.title}</h4>
                  <p className="text-sm text-[#171514]/70 font-sans">{item.subtitle}</p>
                </div>
                <div className="pt-6 flex items-center justify-between border-t border-[#E8E2D8]/60 mt-6">
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#A76570]">Coming soon ↗</span>
                  <span className="text-xs text-[#B08A57]">❖</span>
                </div>
              </div>
            ))}
          </div>
        </GsapReveal>
      </div>

      {/* ── Video modal ── */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#171514]/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/25 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close video"
              >✕</button>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1`}
                title="Project Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

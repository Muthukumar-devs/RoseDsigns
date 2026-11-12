"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, CheckCircle2 } from "lucide-react";

interface ServiceItem {
  id: string;
  number: string;
  name: string;
  summary: string;
  thumbnail: string;
  deliverables: string[];
}

const servicesData: ServiceItem[] = [
  {
    id: "website",
    number: "01",
    name: "Website Design & Development",
    summary:
      "Responsive, beautifully crafted websites that reflect your brand and convert visitors into loyal customers.",
    thumbnail:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=400&auto=format&fit=crop",
    deliverables: [
      "Responsive website layouts",
      "Clear navigation and content structure",
      "Ongoing website updates",
    ],
  },
  {
    id: "branding",
    number: "02",
    name: "Branding & Identity",
    summary:
      "Logos, taglines, colour palettes, typography and brand guidelines that make your business unmistakable.",
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400&auto=format&fit=crop",
    deliverables: [
      "Logo and visual identity",
      "Colour palette and typography",
      "Brand guidelines for consistent use",
    ],
  },
  {
    id: "social",
    number: "03",
    name: "Social Media Presence",
    summary:
      "Profile setup, content planning, creatives and ongoing management that builds a community around your brand.",
    thumbnail:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=400&auto=format&fit=crop",
    deliverables: [
      "Content planning and profile setup",
      "Social creatives and captions",
      "Ongoing social media management",
    ],
  },
  {
    id: "seo",
    number: "04",
    name: "SEO & Digital Visibility",
    summary:
      "Website and local search optimisation so the right people find you at exactly the right moment.",
    thumbnail:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=400&auto=format&fit=crop",
    deliverables: [
      "Website search optimisation",
      "Local search visibility",
      "Consistent business information",
    ],
  },
  {
    id: "graphics-video",
    number: "05",
    name: "Graphics & Video for Advertising",
    summary:
      "Campaign graphics, promotional videos, reels and digital advertisements that stop the scroll.",
    thumbnail:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=400&auto=format&fit=crop",
    deliverables: [
      "Campaign and promotional graphics",
      "Reels and advertising videos",
      "Creative adapted for digital channels",
    ],
  },
  {
    id: "analytics",
    number: "06",
    name: "Analytics, Tracking & Reporting",
    summary:
      "Website and campaign tracking, performance analysis and clear reporting to guide every next step.",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
    deliverables: [
      "Website and campaign measurement",
      "Performance analysis",
      "Clear reporting to guide next steps",
    ],
  },
  {
    id: "whatsapp",
    number: "07",
    name: "WhatsApp Business Integration",
    summary:
      "Enquiry links, QR codes and seamless connections across websites and campaigns for instant customer reach.",
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=400&auto=format&fit=crop",
    deliverables: [
      "WhatsApp enquiry journeys",
      "QR codes and click-to-chat links",
      "Website and campaign connections",
    ],
  },
  {
    id: "google-business",
    number: "08",
    name: "Google Business Profile Management",
    summary:
      "Profile setup, optimisation, location management and review support to dominate local search.",
    thumbnail:
      "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=400&auto=format&fit=crop",
    deliverables: [
      "Business profile setup and updates",
      "Location information and optimisation",
      "Review support and management",
    ],
  },
];

export default function Services() {
  const [openId, setOpenId] = useState<string>("");

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? "" : id));
  };

  const scrollToContact = (serviceName: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-service", { detail: serviceName })
      );
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#171514] px-4 py-24 text-white sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-20">

          {/* ── LEFT: sticky header column ── */}
          <div className="lg:sticky lg:top-28 lg:col-span-5">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 flex items-center gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-[#D9B1AE]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#A79A8F] sm:text-xs">
                02 / What We Do
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl text-3xl font-light leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Considered creativity.
              <br />
              <em className="font-normal italic text-[#D9B1AE]">
                Connected expertise.
              </em>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-md text-sm font-light leading-relaxed text-[#A79A8F] sm:text-base"
            >
              From the first impression to the everyday details. Explore the
              ways we can shape, build, and grow your brand.
            </motion.p>

            {/* CTA */}
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#F7F3EC] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#171514] shadow-xl transition-colors hover:bg-[#D9B1AE]"
            >
              <span>Start a Project</span>
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>

          {/* ── RIGHT: accordion cards ── */}
          <div className="lg:col-span-7">
            {/*
              items-end aligns every card's RIGHT edge.
              Each card grows from RIGHT → LEFT via width animation.
            */}
            <div className="flex flex-col items-end gap-4">
              {servicesData.map((service, index) => {
                const isOpen = openId === service.id;

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, width: "10%" }}
                    whileInView={{ opacity: 1, width: "85%" }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 1.05,
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ transformOrigin: "right center" }}
                    className="relative w-full will-change-transform sm:w-[90%] lg:w-[82%]"
                  >
                    {/* Card — morphs between rounded-full and rounded-[2rem] */}
                    <motion.div
                      layout
                      transition={{
                        layout: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                      }}
                      className={`group relative overflow-hidden bg-[#F7F3EC] text-[#171514] shadow-[0_15px_40px_rgba(0,0,0,0.25)] ${
                        isOpen ? "rounded-[2rem]" : "rounded-full"
                      }`}
                    >
                      {/* ── Header row ── */}
                      <motion.div
                        onClick={() => toggle(service.id)}
                        whileHover={{
                          backgroundColor: isOpen ? "#F7F3EC" : "#EDE8E0",
                        }}
                        transition={{ duration: 0.25 }}
                        className="relative flex min-h-[78px] cursor-pointer select-none items-center gap-3 p-2 pr-3 sm:min-h-[84px] sm:gap-4 sm:p-2.5 sm:pr-4"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[#171514]/10 bg-[#E8E2D8] sm:h-[72px] sm:w-[72px]">
                          <motion.div
                            initial={{ opacity: 0, scale: 1.08 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.8,
                              delay: 0.25 + index * 0.1,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={service.thumbnail}
                              alt={service.name}
                              fill
                              sizes="(max-width: 640px) 56px, 72px"
                              className="object-cover"
                            />
                          </motion.div>
                          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
                        </div>

                        {/* Title + number */}
                        <motion.div
                          initial={{ opacity: 0, x: 25 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.7,
                            delay: 0.38 + index * 0.1,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="min-w-0 flex-1"
                        >
                          <div className="flex items-center gap-2">
                            <span className="truncate text-xl font-light tracking-tight text-[#171514] sm:text-2xl">
                              {service.name}
                            </span>
                            <span className="shrink-0 text-[9px] font-medium text-[#A79A8F]">
                              {service.number}
                            </span>
                          </div>
                        </motion.div>

                        {/* Chevron */}
                        <motion.div
                          animate={{
                            rotate: isOpen ? 180 : 0,
                            scale: isOpen ? 1.05 : 1,
                          }}
                          transition={{
                            duration: 0.45,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#171514]/60"
                        >
                          <ChevronDown className="h-5 w-5 stroke-[1.5]" />
                        </motion.div>
                      </motion.div>

                      {/* ── Expandable body ── */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: isOpen ? "auto" : 0,
                          opacity: isOpen ? 1 : 0,
                        }}
                        transition={{
                          height: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.3 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#171514]/8 px-6 pb-7 pt-5 sm:px-8">

                          {/* Summary */}
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={
                              isOpen
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 10 }
                            }
                            transition={{ duration: 0.45, delay: 0.08 }}
                            className="max-w-xl text-sm font-normal leading-relaxed text-[#171514]/75"
                          >
                            {service.summary}
                          </motion.p>

                          {/* Deliverables */}
                          <div className="mt-5 space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#A79A8F]">
                              Deliverables &amp; Inclusions
                            </p>
                            {service.deliverables.map((item, dIdx) => (
                              <motion.div
                                key={dIdx}
                                initial={{ opacity: 0, x: -12 }}
                                animate={
                                  isOpen
                                    ? { opacity: 1, x: 0 }
                                    : { opacity: 0, x: -12 }
                                }
                                transition={{
                                  duration: 0.4,
                                  delay: 0.12 + dIdx * 0.07,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                                className="flex items-center gap-2 text-xs text-[#171514]/80"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#A76570]" />
                                <span>{item}</span>
                              </motion.div>
                            ))}
                          </div>

                          {/* CTA */}
                          <motion.button
                            initial={{ opacity: 0, y: 12 }}
                            animate={
                              isOpen
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 12 }
                            }
                            transition={{
                              duration: 0.5,
                              delay: 0.3,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              scrollToContact(service.name);
                            }}
                            className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#171514] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-[#F7F3EC] transition-colors hover:bg-[#672D39]"
                          >
                            <span>Discuss this service</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

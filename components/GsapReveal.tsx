"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface GsapRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
}

export default function GsapReveal({
  children,
  className = "",
  delay = 0,
  yOffset = 35,
  duration = 0.9,
}: GsapRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const el = elementRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          y: yOffset,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: duration,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, elementRef);

    return () => ctx.revert();
  }, [delay, duration, yOffset]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}


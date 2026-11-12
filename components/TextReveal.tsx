"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  stagger?: number;
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  as = "h2",
  stagger = 0.04,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = children.split(" ");

  const Tag = as;

  return (
    <Tag className={`inline-block ${className}`}>
      <span ref={ref} className="inline-block">
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden pb-1 -mb-1 mr-[0.25em] last:mr-0 align-top"
          >
            <motion.span
              initial={{ y: "115%", opacity: 0 }}
              animate={
                isInView ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }
              }
              transition={{
                duration: 0.75,
                delay: delay + i * stagger,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

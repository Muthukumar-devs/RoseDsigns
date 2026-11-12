"use client";

import { motion } from "framer-motion";

// Petal path: base at (0, 0), tip pointing up at (0, -height)
function petalPath(h: number, w: number): string {
  return [
    `M 0 0`,
    `C ${w} ${-h * 0.28}  ${w * 0.55} ${-h * 0.82}  0 ${-h}`,
    `C ${-w * 0.55} ${-h * 0.82}  ${-w} ${-h * 0.28}  0 0`,
    `Z`,
  ].join(" ");
}

interface RoseBlossomProps {
  size?: number;
  delay?: number;
  className?: string;
  opacity?: number;
  play?: boolean;
}

interface LayerConfig {
  count: number;
  angle0: number;
  h: number;
  w: number;
  fill: string;
  delay: number;
}

export default function RoseBlossom({
  size = 240,
  delay = 0,
  className = "",
  opacity = 1,
  play = false,
}: RoseBlossomProps) {
  const cx = size / 2;
  const cy = size / 2;

  // Petal layers from outermost → innermost
  const layers: LayerConfig[] = [
    { count: 6, angle0: 0,  h: size * 0.44, w: size * 0.125, fill: "#E8A0A8", delay: 0.00 },
    { count: 5, angle0: 32, h: size * 0.37, w: size * 0.11,  fill: "#D4828E", delay: 0.20 },
    { count: 5, angle0: 8,  h: size * 0.29, w: size * 0.095, fill: "#C4687A", delay: 0.38 },
    { count: 5, angle0: 20, h: size * 0.21, w: size * 0.08,  fill: "#B05068", delay: 0.54 },
    { count: 4, angle0: 5,  h: size * 0.14, w: size * 0.062, fill: "#8B3A52", delay: 0.68 },
    { count: 3, angle0: 60, h: size * 0.085,w: size * 0.048, fill: "#6E2840", delay: 0.80 },
    { count: 3, angle0: 20, h: size * 0.05, w: size * 0.034, fill: "#4E1A2C", delay: 0.90 },
  ];

  // Unique id for SVG defs to avoid conflicts when multiple roses rendered
  const id = `rose-${Math.round(size)}-${Math.round(delay * 10)}`;

  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size, opacity }}
      // Gentle float loop — starts after bloom is done
      animate={play ? { y: [0, -8, 0] } : { y: 0 }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay + 1.8,
      }}
    >
      {/* Subtle sway */}
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        overflow="visible"
        animate={play ? { rotate: [-1.5, 1.5, -1.5] } : { rotate: 0 }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.5,
        }}
      >
        <defs>
          {/* Golden centre gradient */}
          <radialGradient id={`${id}-cg`} cx="42%" cy="32%" r="58%">
            <stop offset="0%"   stopColor="#FAE08A" />
            <stop offset="48%"  stopColor="#C49A45" />
            <stop offset="100%" stopColor="#8B6228" />
          </radialGradient>

          {/* Soft drop shadow for depth */}
          <filter id={`${id}-sh`} x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow
              dx="0"
              dy={size * 0.012}
              stdDeviation={size * 0.018}
              floodColor="#5a1a26"
              floodOpacity="0.18"
            />
          </filter>
        </defs>

        {/* ── Petal layers ── */}
        {layers.map((layer, lIdx) =>
          Array.from({ length: layer.count }, (_, i) => {
            const angle = layer.angle0 + (360 / layer.count) * i;
            const petalDelay = delay + layer.delay + i * 0.065;

            return (
              // Translate to rose centre, rotate to petal angle
              <g key={`l${lIdx}-p${i}`} transform={`translate(${cx},${cy}) rotate(${angle})`}>
                <motion.path
                  d={petalPath(layer.h, layer.w)}
                  fill={layer.fill}
                  filter={`url(#${id}-sh)`}
                  // Bloom from centre: scale petal from base (bottom of its bbox)
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={play ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
                  transition={{
                    scaleY: {
                      duration: 0.55,
                      delay: petalDelay,
                      ease: [0.34, 1.4, 0.64, 1], // overshoot spring feel
                    },
                    opacity: { duration: 0.35, delay: petalDelay },
                  }}
                  // originY: 1 = bottom of petal bbox = rose centre
                  style={{ originX: 0.5, originY: 1 }}
                />
              </g>
            );
          })
        )}

        {/* ── Centre disc ── */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={size * 0.075}
          fill={`url(#${id}-cg)`}
          filter={`url(#${id}-sh)`}
          initial={{ scale: 0, opacity: 0 }}
          animate={play ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{
            duration: 0.45,
            delay: delay + 1.1,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          style={{ originX: 0.5, originY: 0.5 }}
        />

        {/* ── Stamen ring ── */}
        {Array.from({ length: 11 }, (_, i) => {
          const a = (i / 11) * Math.PI * 2 - Math.PI / 2;
          const sr = size * 0.046;
          const sx = cx + Math.cos(a) * sr;
          const sy = cy + Math.sin(a) * sr;
          return (
            <motion.circle
              key={`s${i}`}
              cx={sx}
              cy={sy}
              r={size * 0.011}
              fill="#D4A843"
              initial={{ scale: 0, opacity: 0 }}
              animate={play ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{
                duration: 0.2,
                delay: delay + 1.18 + i * 0.028,
              }}
              style={{ originX: 0.5, originY: 0.5 }}
            />
          );
        })}
      </motion.svg>
    </motion.div>
  );
}


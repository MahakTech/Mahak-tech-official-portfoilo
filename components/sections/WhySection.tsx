"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const STATEMENTS = [
  "Technology with purpose.",
  "Design with intention.",
  "Engineering without compromise.",
  "Experiences people remember.",
];

function Statement({
  text,
  index,
  progress,
}: {
  text: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const step = 1 / STATEMENTS.length;
  const start = index * step;
  const end = start + step;
  const opacity = useTransform(
    progress,
    [start - 0.05, start + step * 0.25, end - step * 0.25, end],
    [0, 1, 1, index === STATEMENTS.length - 1 ? 1 : 0]
  );
  const y = useTransform(progress, [start - 0.05, start + step * 0.25], [40, 0]);
  const blur = useTransform(progress, [start - 0.05, start + step * 0.25], ["blur(12px)", "blur(0px)"]);

  return (
    <motion.p
      style={{ opacity, y, filter: blur }}
      className="absolute inset-0 flex items-center justify-center text-center px-4 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[1.05] text-white text-glow"
    >
      <span>
        {text.split(" ").map((w, i, arr) => (
          <span
            key={i}
            className={i === arr.length - 1 ? "bg-gradient-to-r from-cyanGlow to-electric bg-clip-text text-transparent" : ""}
          >
            {w}{" "}
          </span>
        ))}
      </span>
    </motion.p>
  );
}

export function WhySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section
      id="why"
      ref={ref}
      className="relative bg-space-950 border-t border-slate-900/80"
      style={{ height: `${STATEMENTS.length * 70}vh` }}
      aria-label="Why MahakTech"
    >
      {/* Accessible static version for screen readers */}
      <h2 className="sr-only">Why MahakTech</h2>
      <ul className="sr-only">
        {STATEMENTS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <div className="sticky top-0 h-screen overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,102,255,0.14),transparent_60%)]" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-xs font-mono tracking-widest text-cyanGlow uppercase">
          06 // Why MahakTech
        </div>
        <div className="relative w-full h-full">
          {STATEMENTS.map((s, i) => (
            <Statement key={s} text={s} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

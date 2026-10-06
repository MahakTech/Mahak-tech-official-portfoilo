"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";

const VisionScene = dynamic(() => import("@/components/3d/VisionScene").then((m) => m.VisionScene), {
  ssr: false,
});

export function VisionSection() {
  const { ref, inView } = useInView<HTMLElement>("200px");

  return (
    <section
      id="vision"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-28 px-4 md:px-8 bg-space-950 border-t border-slate-900/80 overflow-hidden"
      aria-label="Vision"
    >
      {inView && <VisionScene />}
      <div className="absolute inset-0 bg-gradient-to-b from-space-950 via-transparent to-space-950 pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric/30 bg-electric/10 text-cyanGlow text-xs font-mono tracking-widest uppercase mb-6"
        >
          07 // Vision
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase leading-[1] text-glow"
        >
          THE FUTURE IS{" "}
          <span className="bg-gradient-to-r from-cyanGlow via-electric to-royal-500 bg-clip-text text-transparent">
            BUILT.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 text-lg sm:text-xl md:text-2xl text-slate-200 font-light leading-relaxed max-w-3xl mx-auto"
        >
          We believe the next generation of digital products will not simply be used. They will be experienced.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-base sm:text-lg font-mono tracking-wider text-cyanGlow"
        >
          MahakTech is building toward that future.
        </motion.p>
      </div>
    </section>
  );
}

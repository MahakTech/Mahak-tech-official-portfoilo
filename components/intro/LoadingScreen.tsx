"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onDone: () => void;
}

const RADIUS = 52;
const CIRC = 2 * Math.PI * RADIUS;

/**
 * Real (non-fake) loader: progress reflects the actual readiness of
 * the logo asset, web fonts and the window load event.
 */
export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [done, setDone] = useState({ logo: false, fonts: false, page: false });
  const completed = Object.values(done).filter(Boolean).length;
  const progress = completed / 3;

  useEffect(() => {
    let cancelled = false;
    const mark = (k: "logo" | "fonts" | "page") => {
      if (!cancelled) setDone((d) => ({ ...d, [k]: true }));
    };

    const img = new window.Image();
    img.onload = img.onerror = () => mark("logo");
    img.src = "/assets/mahaktech-logo.jpeg";

    if (document.fonts?.ready) document.fonts.ready.then(() => mark("fonts"));
    else mark("fonts");

    if (document.readyState === "complete") mark("page");
    else window.addEventListener("load", () => mark("page"), { once: true });

    // Safety net so the loader can never block the site
    const safety = setTimeout(() => {
      mark("logo");
      mark("fonts");
      mark("page");
    }, 4000);

    return () => {
      cancelled = true;
      clearTimeout(safety);
    };
  }, []);

  useEffect(() => {
    if (progress === 1) {
      const t = setTimeout(onDone, 450);
      return () => clearTimeout(t);
    }
  }, [progress, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-space-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      role="status"
      aria-live="polite"
      aria-label="Loading MahakTech"
    >
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="rgba(0,102,255,0.15)" strokeWidth="2" />
          <motion.circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke="#00d2ff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            animate={{ strokeDashoffset: CIRC * (1 - Math.max(progress, 0.08)) }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 6px #00d2ff)" }}
          />
        </svg>
        <div className="relative w-24 h-24 rounded-full overflow-hidden">
          <Image
            src="/assets/mahaktech-logo.jpeg"
            alt="MahakTech"
            fill
            priority
            sizes="96px"
            className="object-cover"
          />
        </div>
      </div>
      <p className="mt-6 text-xs font-mono tracking-[0.3em] text-slate-400">INITIALIZING</p>
    </motion.div>
  );
}

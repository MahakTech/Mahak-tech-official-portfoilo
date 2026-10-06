"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface PortalIntroProps {
  onEnter: () => void;
}

export function PortalIntro({ onEnter }: PortalIntroProps) {
  const [stage, setStage] = useState<"emerging" | "revealed" | "transitioning">("emerging");

  useEffect(() => {
    // Stage 1: Logo emerges, lighting activates
    const t1 = setTimeout(() => {
      setStage("revealed");
    }, 1800);

    return () => clearTimeout(t1);
  }, []);

  const handleExplore = () => {
    setStage("transitioning");
    setTimeout(() => {
      onEnter();
    }, 1100);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#010206] overflow-hidden select-none"
        initial={{ opacity: 1 }}
        animate={{
          opacity: stage === "transitioning" ? 0 : 1,
          scale: stage === "transitioning" ? 1.15 : 1,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Skip button for accessibility */}
        <button
          onClick={onEnter}
          className="absolute top-6 right-6 z-20 text-xs font-mono tracking-widest text-slate-400 hover:text-cyanGlow px-3 py-1.5 rounded-full border border-slate-800 hover:border-cyanGlow/40 bg-space-900/60 backdrop-blur-sm transition-all focus:outline-none focus:ring-1 focus:ring-cyanGlow"
          aria-label="Skip introductory sequence"
        >
          SKIP INTRO →
        </button>

        {/* Dynamic Portal Warp Background Lights */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Central Blue Portal Bloom */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-radial from-electric/30 via-royal-600/10 to-transparent blur-3xl pointer-events-none"
            animate={{
              scale: stage === "transitioning" ? [1, 2.5, 4] : [0.85, 1.05, 0.85],
              opacity: stage === "transitioning" ? [0.6, 1, 0] : [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: stage === "transitioning" ? 1.0 : 4.5,
              repeat: stage === "transitioning" ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Floating subtle ambient particles */}
          <div className="absolute inset-0 bg-[radial-gradient(#0066ff_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
        </div>

        {/* Portal Core Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl">
          {/* Logo Container with Traveling Orbit Ring */}
          <div className="relative mb-8 flex items-center justify-center">
            {/* Traveling Light Ring */}
            <div className="absolute -inset-4 md:-inset-6 pointer-events-none">
              <svg className="w-full h-full animate-spin-slow" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="88"
                  fill="none"
                  stroke="rgba(0, 102, 255, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4 8"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="88"
                  fill="none"
                  stroke="url(#portalGlow)"
                  strokeWidth="2.5"
                  strokeDasharray="40 180"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="portalGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d2ff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#0066ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Glowing Backdrop Ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-electric-glow/20 blur-xl"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [0.95, 1.1, 0.95],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Official MahakTech Logo Image */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, filter: "brightness(0)" }}
              animate={{
                scale: stage === "transitioning" ? 1.4 : 1,
                opacity: 1,
                filter: "brightness(1)",
              }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden p-1 bg-gradient-to-br from-electric via-space-900 to-cyanGlow/40 shadow-neon-blue"
            >
              <Image
                src="/assets/mahaktech-logo.jpeg"
                alt="MahakTech Official Logo"
                fill
                priority
                className="object-cover rounded-full"
              />
            </motion.div>
          </div>

          {/* Typography Reveals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: stage !== "emerging" ? 1 : 0,
              y: stage !== "emerging" ? 0 : 20,
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric/30 bg-electric/10 text-cyanGlow text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Digital Dimension Initialized</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight">
              <span className="block text-electric-glow tracking-wider text-xl md:text-2xl font-mono mb-2">
                MAHAKTECH
              </span>
              Building Digital Experiences
              <span className="block bg-gradient-to-r from-white via-cyanGlow to-electric bg-clip-text text-transparent">
                That Move The Future.
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-300 font-light tracking-widest uppercase">
              Technology. Design. Innovation.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: stage !== "emerging" ? 1 : 0,
              scale: stage !== "emerging" ? 1 : 0.9,
            }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8"
          >
            <button
              onClick={handleExplore}
              disabled={stage === "transitioning"}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-mono text-sm tracking-wider uppercase text-white bg-gradient-to-r from-electric to-royal-600 hover:from-cyanGlow hover:to-electric transition-all duration-300 shadow-neon-blue hover:shadow-neon-cyan focus:outline-none focus:ring-2 focus:ring-cyanGlow"
            >
              <span>{stage === "transitioning" ? "ENTERING PORTAL..." : "EXPLORE MAHAKTECH"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              <span className="absolute -inset-0.5 rounded-full bg-cyanGlow/40 blur opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

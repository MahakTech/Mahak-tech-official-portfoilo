"use client";

import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Mail, Compass } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene").then((m) => m.HeroScene), {
  ssr: false,
});

export function HeroSection({ active = true }: { active?: boolean }) {
  const scrollToLab = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("lab");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 md:px-8"
      aria-label="Hero Section"
    >
      {/* 3D Interactive WebGL Scene (loaded lazily once the portal opens) */}
      {active && <HeroScene />}

      {/* Atmospheric Vignette and Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-950/40 via-transparent to-space-950 pointer-events-none z-[1]" />

      {/* Center Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center mt-6">
        {/* Holographic MahakTech Logo Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8"
        >
          <div className="relative p-1 rounded-full bg-gradient-to-tr from-electric via-space-900 to-cyanGlow/50 shadow-[0_0_35px_rgba(0,102,255,0.4)] animate-float">
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-electric/40 bg-space-950">
              <Image
                src="/assets/mahaktech-logo.jpeg"
                alt="MahakTech Official Logo"
                fill
                priority
                className="object-cover rounded-full"
              />
            </div>
            {/* Pulsing Aura Ring */}
            <div className="absolute -inset-2 rounded-full border border-electric/30 animate-pulse pointer-events-none" />
          </div>
        </motion.div>

        {/* Company Title & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-electric/30 bg-electric/10 text-cyanGlow text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-cyanGlow animate-ping" />
            <span>Digital Innovation & Engineering</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[1.05]">
            MAHAKTECH
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-slate-200 font-sans max-w-3xl mx-auto">
            &ldquo;Engineering ideas into digital reality.&rdquo;
          </p>

          <p className="text-sm md:text-base text-slate-400 font-normal max-w-2xl mx-auto leading-relaxed pt-2">
            We design, build and transform digital experiences, products and technology solutions for the modern world.
          </p>
        </motion.div>

        {/* Hero Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Magnetic className="w-full sm:w-auto">
            <a
              href="#lab"
              onClick={scrollToLab}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 min-h-[48px] rounded-full font-mono text-xs md:text-sm tracking-wider uppercase text-white bg-gradient-to-r from-electric to-royal-600 hover:from-cyanGlow hover:to-electric transition-all duration-300 shadow-neon-blue hover:shadow-neon-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-cyanGlow"
            >
              <Compass className="w-4 h-4 text-cyanGlow" />
              <span>EXPLORE THE LAB</span>
            </a>
          </Magnetic>

          <Magnetic className="w-full sm:w-auto">
            <a
              href="mailto:mahaktech90@gmail.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 min-h-[48px] rounded-full font-mono text-xs md:text-sm tracking-wider uppercase text-slate-200 hover:text-white bg-space-900/80 hover:bg-space-800 border border-slate-700/80 hover:border-cyanGlow/50 transition-all duration-200 backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyanGlow"
            >
              <Mail className="w-4 h-4 text-cyanGlow" />
              <span>START A CONVERSATION</span>
            </a>
          </Magnetic>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 md:mt-24 flex flex-col items-center gap-2 text-slate-500 font-mono text-[11px] tracking-widest"
        >
          <span>SCROLL TO ENTER</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyanGlow" />
        </motion.div>
      </div>
    </section>
  );
}

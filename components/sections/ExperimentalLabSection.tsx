"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/lib/useInView";
import {
  BrainCircuit,
  Atom,
  HeartPulse,
  MonitorOff,
  Dna,
  Box,
  ShieldAlert,
  Sparkles,
  Zap,
  Lock,
  Unlock,
  Radio,
} from "lucide-react";

const ExperimentalLabCanvas = dynamic(
  () =>
    import("@/components/3d/ExperimentalLabCanvas").then(
      (m) => m.ExperimentalLabCanvas
    ),
  { ssr: false }
);

interface ExperimentInfo {
  num: string;
  name: string;
  category: string;
  statement: string;
  concept: string;
  icon: React.ElementType;
  telemetry: string;
}

const EXPERIMENTS: ExperimentInfo[] = [
  {
    num: "01",
    name: "NEURAL SPACE",
    category: "AI × INTERACTION",
    statement: "WHAT IF INTERFACES COULD THINK?",
    concept:
      "An experimental interface where an AI-generated environment reacts in real time to the user's velocity, cursor proximity, and spatial gestures.",
    icon: BrainCircuit,
    telemetry: "SYNAPSE MESH // ACTIVE",
  },
  {
    num: "02",
    name: "DIGITAL GRAVITY",
    category: "3D × PHYSICS",
    statement: "WHAT IF A WEBSITE HAD PHYSICS?",
    concept:
      "A futuristic gravitational field where kinetic matter orbits your cursor. Move closer to attract objects, move away to allow escape velocity, or trigger a gravity shockwave.",
    icon: Atom,
    telemetry: "GRAVITATIONAL WELL // VELOCITY RUNTIME",
  },
  {
    num: "03",
    name: "LIVING INTERFACE",
    category: "HUMAN × MACHINE",
    statement: "INTERFACES SHOULD FEEL ALIVE.",
    concept:
      "An abstract technological bio-geometry that continuously breathes, expands, contracts, and modulates its particle density in rhythm with user attention.",
    icon: HeartPulse,
    telemetry: "HARMONIC BIO-LATTICE // 1.2 HZ",
  },
  {
    num: "04",
    name: "ZERO GRAVITY DESKTOP",
    category: "FUTURE COMPUTING",
    statement: "WHAT IF THE SCREEN DISAPPEARED?",
    concept:
      "A spatial computing environment where windows, telemetry cards, and controls float freely across three dimensions rather than being confined to a flat plane.",
    icon: MonitorOff,
    telemetry: "SPATIAL ARRAYS // 3-AXIS DEGREE",
  },
  {
    num: "05",
    name: "DIGITAL DNA",
    category: "GENERATIVE TECHNOLOGY",
    statement: "EVERY IDEA HAS A STRUCTURE.",
    concept:
      "A rotating algorithmic double helix constructed from code fragments, glowing data points, and generative nodes that re-weave dynamically.",
    icon: Dna,
    telemetry: "GENERATIVE HELIX // 48 BASE PAIRS",
  },
  {
    num: "06",
    name: "THE FUTURE ROOM",
    category: "SPATIAL COMPUTING",
    statement: "THE COMPUTER DOESN'T HAVE TO BE A SCREEN.",
    concept:
      "A perspective wireframe lab chamber housing floating interface screens and a central holographic data pillar that responds as you navigate.",
    icon: Box,
    telemetry: "VOLUMETRIC ROOM // 5×4.5 METER BOUNDS",
  },
  {
    num: "07",
    name: "UNKNOWN",
    category: "CLASSIFIED",
    statement: "WE ARE STILL BUILDING THE FUTURE.",
    concept:
      "A high-energy containment field shielding our most ambitious exploratory research. Sealed behind security clearance.",
    icon: ShieldAlert,
    telemetry: "CONTAINMENT SEAL // RESTRICTED",
  },
];

export function ExperimentalLabSection() {
  const { ref, inView } = useInView<HTMLElement>("350px");
  const [activeExp, setActiveExp] = useState<number>(0);
  const [shockwaveCount, setShockwaveCount] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isRevealing, setIsRevealing] = useState<boolean>(false);

  const current = EXPERIMENTS[activeExp];
  const CurrentIcon = current.icon;

  const handleTriggerShockwave = () => {
    setShockwaveCount((c) => c + 1);
  };

  const handleRevealClassified = () => {
    setIsRevealing(true);
    setTimeout(() => {
      setIsRevealed(true);
      setIsRevealing(false);
    }, 900);
  };

  return (
    <section
      id="lab"
      ref={ref}
      className="relative py-28 px-4 md:px-8 bg-[#010309] border-t border-slate-900 overflow-hidden"
      aria-label="MahakTech Experimental Lab"
    >
      {/* Quarantine Facility Ambient Grid & Scanning Line */}
      <div className="absolute inset-0 bg-cyber-grid [background-size:40px_40px] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,102,255,0.12),transparent_70%)] pointer-events-none" />

      {/* Animated Security Laser Scanner Beam */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyanGlow to-transparent shadow-[0_0_15px_#00d2ff] pointer-events-none z-20"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ========================================================================= */}
        {/* ENTRY MANIFESTO & SCANNING SEQUENCE */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-start max-w-4xl mb-16 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyanGlow/40 bg-electric/15 text-cyanGlow text-xs font-mono tracking-widest uppercase mb-5">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyanGlow" />
            <span>CLASSIFIED DIGITAL RESEARCH FACILITY</span>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-mono tracking-[0.3em] text-slate-500 uppercase">
              FACILITY AUTHORIZATION // PROTOCOL 07
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-[1.02]">
              MAHAKTECH{" "}
              <span className="bg-gradient-to-r from-cyanGlow via-electric to-royal-500 bg-clip-text text-transparent">
                EXPERIMENTAL LAB
              </span>
            </h2>
          </div>

          <p className="mt-4 text-xs sm:text-sm font-mono tracking-widest text-cyanGlow uppercase">
            UNRELEASED IDEAS. UNUSUAL EXPERIMENTS. POSSIBLE FUTURES.
          </p>

          {/* Strategic Brand Statement */}
          <div className="mt-8 p-6 rounded-2xl border border-electric/30 bg-space-950/80 backdrop-blur-md max-w-2xl">
            <p className="text-lg sm:text-xl font-bold text-white uppercase font-sans tracking-tight">
              &ldquo;NOT EVERYTHING WE BUILD IS MEANT TO BE SHIPPED.&rdquo;
            </p>
            <p className="mt-2 text-sm sm:text-base font-light text-slate-300">
              &ldquo;SOME THINGS ARE BUILT TO DISCOVER WHAT&apos;S POSSIBLE.&rdquo;
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAB NAVIGATION TELEMETRY RAIL (STATIONS 01 to 07) */}
        {/* ========================================================================= */}
        <div
          role="tablist"
          aria-label="Experimental Stations"
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 [scrollbar-width:none]"
        >
          {EXPERIMENTS.map((exp, idx) => {
            const isCurrent = idx === activeExp;
            const ExpIcon = exp.icon;
            return (
              <button
                key={exp.num}
                role="tab"
                id={`lab-tab-${exp.num}`}
                aria-selected={isCurrent}
                aria-controls="lab-viewport"
                onClick={() => {
                  setActiveExp(idx);
                  if (idx !== 6) setIsRevealed(false);
                }}
                className={`flex items-center gap-2.5 px-4 py-2.5 min-h-[44px] rounded-full font-mono text-xs whitespace-nowrap transition-all duration-200 border focus:outline-none focus-visible:ring-2 focus-visible:ring-cyanGlow ${
                  isCurrent
                    ? "bg-electric/25 border-cyanGlow text-white shadow-neon-blue"
                    : "bg-space-900/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <ExpIcon
                  className={`w-3.5 h-3.5 ${
                    isCurrent ? "text-cyanGlow" : "text-slate-500"
                  }`}
                />
                <span>
                  {exp.num} {"//"} {exp.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* MAIN CINEMATIC EXPERIMENT STAGE */}
        {/* ========================================================================= */}
        <div
          id="lab-viewport"
          role="tabpanel"
          aria-labelledby={`lab-tab-${current.num}`}
          className="relative rounded-3xl glass-panel border border-electric/30 overflow-hidden shadow-glass-elevated min-h-[560px]"
        >
          {/* Master 3D WebGL Canvas Layer */}
          <div className="absolute inset-0 z-0">
            {inView && (
              <ExperimentalLabCanvas
                activeExperiment={activeExp}
                shockwaveCount={shockwaveCount}
                isRevealed={isRevealed}
              />
            )}
          </div>

          {/* Holographic Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/40 to-transparent pointer-events-none z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-r from-space-950/90 via-space-950/30 to-transparent pointer-events-none z-[1] hidden md:block" />

          {/* Interactive Experiment Telemetry & Controls Overlay */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[560px] pointer-events-none">
            {/* Top Telemetry Header */}
            <div className="flex items-center justify-between gap-4 pointer-events-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-space-950/80 border border-slate-800 text-xs font-mono text-cyanGlow">
                <CurrentIcon className="w-3.5 h-3.5" />
                <span>{current.category}</span>
              </div>
              <div className="font-mono text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyanGlow animate-ping" />
                <span>{current.telemetry}</span>
              </div>
            </div>

            {/* Center / Lower Descriptive Module */}
            <div className="my-8 max-w-2xl pointer-events-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.num}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <span className="font-mono text-5xl sm:text-7xl font-black text-slate-700/60 block mb-2">
                    {current.num} / 07
                  </span>

                  <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
                    {current.name}
                  </h3>

                  <p className="mt-3 text-lg sm:text-2xl font-light text-cyanGlow font-mono text-glow">
                    &ldquo;{current.statement}&rdquo;
                  </p>

                  <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                    {current.concept}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Special Interactive Trigger for Experiment 02: Digital Gravity */}
              {activeExp === 1 && (
                <div className="mt-6">
                  <button
                    onClick={handleTriggerShockwave}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-electric to-royal-600 hover:from-cyanGlow hover:to-electric text-white font-mono text-xs tracking-wider uppercase shadow-neon-blue transition-all"
                  >
                    <Zap className="w-4 h-4 text-cyanGlow" />
                    <span>Trigger Gravity Shockwave ({shockwaveCount})</span>
                  </button>
                  <span className="block mt-2 text-[11px] font-mono text-slate-400">
                    MOVE CURSOR TO CONTROL ORBIT // CLICK TO DETONATE
                  </span>
                </div>
              )}

              {/* Special Interactive Trigger for Experiment 07: Classified Unknown */}
              {activeExp === 6 && (
                <div className="mt-6">
                  {!isRevealed ? (
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-950/30 border border-red-500/40 text-red-400 font-mono text-xs">
                        <Lock className="w-4 h-4 text-red-400" />
                        <span>STATUS: CLASSIFIED // ACCESS: RESTRICTED</span>
                      </div>
                      <div>
                        <button
                          onClick={handleRevealClassified}
                          disabled={isRevealing}
                          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-cyanGlow text-space-950 hover:bg-white font-mono text-xs font-bold tracking-widest uppercase shadow-neon-cyan transition-all"
                        >
                          <Unlock className="w-4 h-4" />
                          <span>{isRevealing ? "DE-ENCRYPTING..." : "REVEAL"}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-5 rounded-2xl border border-cyanGlow/50 bg-electric/20 backdrop-blur-xl max-w-lg"
                    >
                      <div className="flex items-center gap-2 text-cyanGlow font-mono text-xs mb-2">
                        <Sparkles className="w-4 h-4" />
                        <span>CONTAINMENT FIELD BREACHED // TRANSMISSION REVEALED</span>
                      </div>
                      <h4 className="text-2xl font-black text-white uppercase text-glow">
                        &ldquo;WE ARE STILL BUILDING THE FUTURE.&rdquo;
                      </h4>
                      <p className="mt-2 text-xs text-slate-300 font-mono">
                        The frontier is continuous. New experiments are forged daily within MahakTech research.
                      </p>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400 pointer-events-auto">
              <span>MAHAKTECH DIGITAL RESEARCH FACILITY</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveExp((e) => (e - 1 + 7) % 7)}
                  className="px-3 py-1 rounded-full border border-slate-800 hover:border-cyanGlow/50 text-slate-300 hover:text-white transition-colors"
                  aria-label="Previous experiment"
                >
                  ← PREV
                </button>
                <span className="text-cyanGlow font-bold">
                  {current.num} / 07
                </span>
                <button
                  onClick={() => setActiveExp((e) => (e + 1) % 7)}
                  className="px-3 py-1 rounded-full border border-slate-800 hover:border-cyanGlow/50 text-slate-300 hover:text-white transition-colors"
                  aria-label="Next experiment"
                >
                  NEXT →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FINAL LAB STATEMENT */}
        {/* ========================================================================= */}
        <div className="mt-24 pt-16 border-t border-slate-900 text-center max-w-3xl mx-auto">
          <p className="text-xs font-mono tracking-[0.3em] text-cyanGlow uppercase mb-4">
            FACILITY OUTRO // ARCHIVE STATE
          </p>

          <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            THE LAB NEVER CLOSES.
          </h3>

          <p className="mt-4 text-lg sm:text-xl text-slate-300 font-light">
            THE NEXT IDEA COULD CHANGE EVERYTHING.
          </p>

          <p className="mt-6 text-sm font-mono tracking-widest text-electric-glow font-bold uppercase">
            MAHAKTECH
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Cpu, Globe, Rocket, CheckCircle2 } from "lucide-react";

const PILLARS = [
  {
    num: "01",
    title: "Digital Products",
    desc: "Purpose-built software architectures engineered for reliability, high performance, and real business utility.",
    icon: Layers,
  },
  {
    num: "02",
    title: "Creative Technology",
    desc: "Blending modern code with motion, real-time 3D graphics, and human-centered design aesthetics.",
    icon: Cpu,
  },
  {
    num: "03",
    title: "Interactive Experiences",
    desc: "Immersive digital environments that communicate value, engage users, and leave lasting impressions.",
    icon: Globe,
  },
  {
    num: "04",
    title: "Future-Ready Solutions",
    desc: "Scalable, maintainable systems designed to gracefully expand alongside emerging technological horizons.",
    icon: Rocket,
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-28 px-4 md:px-8 border-t border-slate-900/80 bg-space-950/70 overflow-hidden"
      aria-label="About MahakTech"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-royal-700/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-electric/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric/30 bg-electric/10 text-cyanGlow text-xs font-mono tracking-widest uppercase mb-4">
            <span>01 // About The Company</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            WE DON&apos;T JUST BUILD SOFTWARE.{" "}
            <span className="bg-gradient-to-r from-cyanGlow via-electric to-royal-500 bg-clip-text text-transparent">
              WE BUILD EXPERIENCES.
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            MahakTech is a technology-driven company focused on creating modern digital products, interactive experiences and practical software solutions. We combine engineering, design and innovation to turn ideas into meaningful digital products.
          </p>
        </div>

        {/* 4 Strategic Capability Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="group relative p-6 sm:p-7 rounded-2xl glass-panel hover:glass-panel-glow transition-all duration-300 flex flex-col justify-between"
              >
                {/* Accent line on hover */}
                <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-cyanGlow/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-bold text-electric group-hover:text-cyanGlow transition-colors">
                      {pillar.num}
                    </span>
                    <div className="p-2.5 rounded-xl bg-space-900 border border-slate-800 group-hover:border-electric/50 text-slate-300 group-hover:text-cyanGlow transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyanGlow transition-colors mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-mono text-slate-500 group-hover:text-cyanGlow transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Production Quality</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

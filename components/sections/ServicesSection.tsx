"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useInView } from "@/lib/useInView";

const ServicesScene = dynamic(() => import("@/components/3d/ServicesScene").then((m) => m.ServicesScene), {
  ssr: false,
});
import {
  Code,
  Palette,
  Terminal,
  BrainCircuit,
  Box,
  Layers,
  ChevronRight,
} from "lucide-react";

const SERVICES = [
  {
    num: "01",
    title: "Web Development",
    desc: "Modern, responsive and high-performance websites and web applications engineered with cutting-edge fullstack frameworks.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    icon: Code,
  },
  {
    num: "02",
    title: "UI/UX Design",
    desc: "Human-centered interfaces and digital experiences designed for clarity, visual impact, and effortless interaction.",
    tech: ["Design Systems", "Prototyping", "Micro-interactions", "Usability"],
    icon: Palette,
  },
  {
    num: "03",
    title: "Software Development",
    desc: "Scalable software products engineered around real business requirements, robust architecture, and sustainable codebases.",
    tech: ["Node.js", "APIs", "Database Architecture", "System Design"],
    icon: Terminal,
  },
  {
    num: "04",
    title: "AI & Intelligent Systems",
    desc: "AI-powered workflows, automation and intelligent digital solutions tailored to enhance operational agility.",
    tech: ["Intelligent Agents", "Workflow Automation", "API Integration", "Python"],
    icon: BrainCircuit,
  },
  {
    num: "05",
    title: "3D & Interactive Experiences",
    desc: "Immersive websites, interactive interfaces and motion-driven digital experiences that elevate brand distinction.",
    tech: ["Three.js", "WebGL", "Motion Design", "Interactive Shaders"],
    icon: Box,
  },
  {
    num: "06",
    title: "Digital Product Development",
    desc: "From initial concept and architectural blueprints to engineering execution and production-grade deployment.",
    tech: ["Concept Validation", "Full-Lifecycle Build", "DevOps", "Scale Strategy"],
    icon: Layers,
  },
];

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { ref, inView } = useInView<HTMLElement>("300px");

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-28 px-4 md:px-8 bg-space-950 border-t border-slate-900/80 overflow-hidden"
      aria-label="MahakTech Services"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric/30 bg-electric/10 text-cyanGlow text-xs font-mono tracking-widest uppercase mb-4">
            <span>02 // Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            ENGINEERED WITH{" "}
            <span className="bg-gradient-to-r from-cyanGlow via-electric to-royal-500 bg-clip-text text-transparent">
              PRECISION.
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Hover or select any discipline below to inspect our specialized technology and product development focus.
          </p>
        </div>

        {/* 2-Column Layout: Services List + Interactive 3D Reactive Hologram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Services Selector (7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            {SERVICES.map((service, index) => {
              const isActive = activeIndex === index;
              const Icon = service.icon;

              return (
                <div
                  key={service.num}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`relative p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? "bg-space-900/90 border-cyanGlow/40 shadow-neon-blue"
                      : "bg-space-900/40 border-slate-800/80 hover:bg-space-900/60 hover:border-slate-700"
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveIndex(index);
                    }
                  }}
                  aria-pressed={isActive}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Number badge */}
                      <span
                        className={`font-mono text-xl sm:text-2xl font-bold transition-all duration-200 ${
                          isActive
                            ? "text-cyanGlow scale-110 drop-shadow-[0_0_8px_#00d2ff]"
                            : "text-slate-600"
                        }`}
                      >
                        {service.num}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <Icon
                            className={`w-4 h-4 transition-colors ${
                              isActive ? "text-cyanGlow" : "text-slate-400"
                            }`}
                          />
                          <h3
                            className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                              isActive ? "text-white" : "text-slate-300"
                            }`}
                          >
                            {service.title}
                          </h3>
                        </div>

                        <p className="mt-2 text-sm text-slate-400 leading-relaxed max-w-xl">
                          {service.desc}
                        </p>

                        {/* Technology tags */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {service.tech.map((t) => (
                            <span
                              key={t}
                              className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border transition-colors ${
                                isActive
                                  ? "border-electric/40 bg-electric/15 text-cyanGlow"
                                  : "border-slate-800 bg-space-950/60 text-slate-500"
                              }`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-5 h-5 transition-transform duration-200 mt-1 shrink-0 ${
                        isActive ? "text-cyanGlow translate-x-1" : "text-slate-600"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive 3D Reactive Visual (5 Cols Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative rounded-2xl glass-panel p-6 border border-electric/30 overflow-hidden flex flex-col items-center shadow-glass-elevated">
              {/* Top Status Bar */}
              <div className="w-full flex items-center justify-between pb-4 border-b border-slate-800/80 text-xs font-mono">
                <span className="text-slate-400">ACTIVE DISCIPLINE</span>
                <span className="text-cyanGlow tracking-widest font-bold">
                  {SERVICES[activeIndex].num} {"//"} {SERVICES[activeIndex].title}
                </span>
              </div>

              {/* 3D Scene Viewport */}
              <div className="w-full h-72 sm:h-80 relative flex items-center justify-center my-2">
                {inView && <ServicesScene activeIndex={activeIndex} />}
              </div>

              {/* Bottom Telemetry Info */}
              <div className="w-full pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>INTERACTIVE PREVIEW</span>
                <span className="text-electric-glow">HOLOGRAPHIC MODE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

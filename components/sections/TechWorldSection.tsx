"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { TECH_LIST, type TechNode } from "@/components/3d/tech-data";
import { useInView } from "@/lib/useInView";
import { Cpu, Terminal, Sparkles } from "lucide-react";

const TechnologyConstellation = dynamic(
  () => import("@/components/3d/TechnologyConstellation").then((m) => m.TechnologyConstellation),
  { ssr: false }
);

export function TechWorldSection() {
  const [selectedNode, setSelectedNode] = useState<TechNode | null>(TECH_LIST[0]);
  const { ref, inView } = useInView<HTMLElement>("300px");

  return (
    <section
      id="technologies"
      ref={ref}
      className="relative py-28 px-4 md:px-8 bg-space-950 border-t border-slate-900/80 overflow-hidden"
      aria-label="Technology Stack"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric/30 bg-electric/10 text-cyanGlow text-xs font-mono tracking-widest uppercase mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>03 // Technology Constellation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            OUR TECHNOLOGY{" "}
            <span className="bg-gradient-to-r from-cyanGlow via-electric to-royal-500 bg-clip-text text-transparent">
              WORLD.
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-400">
            A dynamic network of engineering frameworks, languages, and modern tools utilized across MahakTech projects. Click or hover any node in the constellation or grid below.
          </p>
        </div>

        {/* 3D Constellation Viewport + Interactive HUD */}
        <div className="relative w-full h-[460px] md:h-[540px] rounded-3xl border border-electric/25 bg-space-900/30 overflow-hidden backdrop-blur-sm shadow-glass-elevated">
          {/* 3D WebGL Constellation */}
          {inView && (
            <TechnologyConstellation activeNodeId={selectedNode?.id ?? null} onSelectNode={setSelectedNode} />
          )}

          {/* Top Left Instructions Overlay */}
          <div className="absolute top-5 left-5 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-space-950/80 border border-slate-800 text-[11px] font-mono text-slate-400 pointer-events-none">
            <Sparkles className="w-3 h-3 text-cyanGlow" />
            <span>HOVER / TAP A NODE</span>
          </div>

          {/* Active Node Detail Card (Bottom Right Floating Glass HUD) */}
          {selectedNode && (
            <div className="absolute bottom-5 right-5 left-5 sm:left-auto sm:max-w-xs z-10 p-5 rounded-2xl glass-panel-glow border-cyanGlow/40 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-widest text-cyanGlow uppercase">
                  {selectedNode.category}
                </span>
                <span className="w-2 h-2 rounded-full bg-cyanGlow animate-ping" />
              </div>
              <h3 className="text-xl font-bold text-white font-mono">{selectedNode.name}</h3>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">{selectedNode.desc}</p>
            </div>
          )}
        </div>

        {/* Quick Technology Chips Selector */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {TECH_LIST.map((tech) => {
            const isSelected = selectedNode?.id === tech.id;
            return (
              <button
                key={tech.id}
                onClick={() => setSelectedNode(tech)}
                onMouseEnter={() => setSelectedNode(tech)}
                className={`px-4 py-2 rounded-full font-mono text-xs transition-all duration-200 border flex items-center gap-2 ${
                  isSelected
                    ? "bg-electric/25 border-cyanGlow text-white shadow-neon-blue"
                    : "bg-space-900/60 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <Terminal className="w-3 h-3 text-cyanGlow" />
                <span>{tech.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, Layers, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { GITHUB_ORG_URL, PROJECTS } from "@/lib/projects";

function ProjectScene({ index }: { index: number }) {
  const project = PROJECTS[index];
  const ref = useRef<HTMLDivElement>(null);
  const mx = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const rotateY = useTransform(mx, [-0.5, 0.5], [-14, 14]);
  const rotateX = useTransform(my, [-0.5, 0.5], [12, -12]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="relative h-full min-h-[320px] flex items-center justify-center overflow-hidden [perspective:1000px]"
      aria-hidden="true"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-15`} />
      <div className="absolute inset-0 bg-cyber-grid [background-size:36px_36px] opacity-60" />

      <motion.div
        key={project.id}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.8, z: -200 }}
        animate={{ opacity: 1, scale: 1, z: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-56 h-56 sm:w-64 sm:h-64"
      >
        {/* Layered glass plates give depth */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-3xl border border-cyanGlow/40 bg-space-900/40 backdrop-blur-sm"
            style={{ transform: `translateZ(${i * 36 - 36}px)`, opacity: 1 - i * 0.2 }}
          />
        ))}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
          style={{ transform: "translateZ(80px)" }}
        >
          <span className="font-mono text-6xl font-black text-cyanGlow text-glow">{project.num}</span>
          <span className="mt-3 font-mono text-sm tracking-widest text-white uppercase">{project.title}</span>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  const [index, setIndex] = useState(0);
  const project = PROJECTS[index];
  const total = PROJECTS.length;

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + total) % total), [total]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  return (
    <section
      id="projects"
      className="relative py-28 px-4 md:px-8 bg-space-950 border-t border-slate-900/80 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-start max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric/30 bg-electric/10 text-cyanGlow text-xs font-mono tracking-widest uppercase mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>04 // Projects</span>
          </div>
          <h2 id="projects-heading" className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            ENTER THE{" "}
            <span className="bg-gradient-to-r from-cyanGlow via-electric to-royal-500 bg-clip-text text-transparent">
              WORLDS WE BUILD.
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Each project is its own small universe. Choose one to step inside.
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Projects"
          onKeyDown={onKey}
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 [scrollbar-width:none]"
        >
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              id={`tab-${p.id}`}
              aria-selected={i === index}
              aria-controls="project-panel"
              tabIndex={i === index ? 0 : -1}
              onClick={() => setIndex(i)}
              className={`px-4 py-2.5 min-h-[44px] rounded-full font-mono text-xs whitespace-nowrap transition-all duration-200 border focus:outline-none focus-visible:ring-2 focus-visible:ring-cyanGlow ${
                i === index
                  ? "bg-electric/25 border-cyanGlow text-white shadow-neon-blue"
                  : "bg-space-900/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              {p.num} {"//"} {p.title}
            </button>
          ))}
        </div>

        <div
          id="project-panel"
          role="tabpanel"
          aria-labelledby={`tab-${project.id}`}
          className="relative rounded-3xl glass-panel border border-electric/30 overflow-hidden shadow-glass-elevated"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between mb-4 gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-space-900 border border-slate-800 text-cyanGlow font-mono text-xs tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-600">
                      {project.num} / {String(total).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-4xl sm:text-6xl font-black text-white tracking-tight mt-2 mb-5">
                    {project.title}
                  </h3>
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">{project.desc}</p>

                  <div className="mt-8">
                    <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase block mb-2.5">
                      Technology &amp; Focus
                    </span>
                    <ul className="flex flex-wrap gap-2">
                      {project.tags.map((t) => (
                        <li
                          key={t}
                          className="text-xs font-mono px-3 py-1 rounded-full bg-space-900 border border-electric/30 text-slate-300"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-full bg-gradient-to-r from-electric to-royal-600 text-white font-mono text-xs tracking-wider uppercase shadow-neon-blue hover:from-cyanGlow hover:to-electric transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> View Project
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    title="A public link for this project is not available yet"
                    className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-full border border-slate-800 bg-space-900/60 text-slate-500 font-mono text-xs tracking-wider uppercase cursor-not-allowed"
                  >
                    <Lock className="w-3.5 h-3.5" /> View Project · Soon
                  </button>
                )}

                <a
                  href={project.repoUrl ?? GITHUB_ORG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-full bg-space-900 border border-slate-800 hover:border-cyanGlow/50 text-slate-300 hover:text-white font-mono text-xs tracking-wider uppercase transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  {project.repoUrl ? "GitHub" : "MahakTech on GitHub"}
                </a>

                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() => go(-1)}
                    aria-label="Previous project"
                    className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-slate-800 text-slate-300 hover:text-cyanGlow hover:border-cyanGlow/50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => go(1)}
                    aria-label="Next project"
                    className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-slate-800 text-slate-300 hover:text-cyanGlow hover:border-cyanGlow/50 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-slate-800/80 bg-space-900/40">
              <ProjectScene index={index} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

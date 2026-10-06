"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Search, PenTool, Cpu, SlidersHorizontal, Rocket } from "lucide-react";

const STAGES = [
  { num: "01", title: "DISCOVER", desc: "Understand the problem, goals and users.", icon: Search },
  { num: "02", title: "DESIGN", desc: "Turn ideas into clear and powerful digital experiences.", icon: PenTool },
  { num: "03", title: "ENGINEER", desc: "Build reliable and scalable technology.", icon: Cpu },
  { num: "04", title: "REFINE", desc: "Test, optimize and improve every detail.", icon: SlidersHorizontal },
  { num: "05", title: "DELIVER", desc: "Launch a polished and production-ready product.", icon: Rocket },
];

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const lineHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="approach"
      className="relative py-28 px-4 md:px-8 bg-space-950 border-t border-slate-900/80 overflow-hidden"
      aria-label="Our approach"
    >
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-electric/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col items-start max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric/30 bg-electric/10 text-cyanGlow text-xs font-mono tracking-widest uppercase mb-4">
            <span>05 // How We Build</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            FROM IDEA TO{" "}
            <span className="bg-gradient-to-r from-cyanGlow via-electric to-royal-500 bg-clip-text text-transparent">
              IMPACT.
            </span>
          </h2>
        </div>

        <div ref={ref} className="relative">
          {/* Track */}
          <div
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 md:-translate-x-1/2"
            aria-hidden="true"
          />
          {/* Progress line driven by scroll */}
          <motion.div
            className="absolute left-5 md:left-1/2 top-0 w-px md:-translate-x-1/2 bg-gradient-to-b from-cyanGlow via-electric to-royal-500 shadow-[0_0_12px_#00d2ff]"
            style={{ height: lineHeight }}
            aria-hidden="true"
          />

          <ol className="space-y-16 md:space-y-24">
            {STAGES.map((stage, i) => {
              const Icon = stage.icon;
              const right = i % 2 === 0;
              return (
                <motion.li
                  key={stage.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-16 items-center`}
                >
                  {/* Node */}
                  <span
                    className="absolute left-5 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-space-950 border border-cyanGlow/60 text-cyanGlow shadow-neon-blue z-10"
                    aria-hidden="true"
                  >
                    <Icon className="w-4 h-4" />
                  </span>

                  <div className={right ? "md:col-start-2" : "md:col-start-1 md:text-right md:row-start-1"}>
                    <div className="p-6 rounded-2xl glass-panel hover:glass-panel-glow transition-all">
                      <span className="font-mono text-sm text-electric tracking-widest">{stage.num}</span>
                      <h3 className="mt-1 text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {stage.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">{stage.desc}</p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

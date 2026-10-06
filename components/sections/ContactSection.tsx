"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight, Copy, Check } from "lucide-react";

const EMAIL = "mahaktech90@gmail.com";
const GITHUB = "https://github.com/MahakTech";
const LINKEDIN = "https://www.linkedin.com/company/mahak-tech/?viewAsMember=true";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — mailto link still works */
    }
  };

  return (
    <section
      id="contact"
      className="relative py-32 px-4 md:px-8 bg-space-950 border-t border-slate-900/80 overflow-hidden"
      aria-label="Contact"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(0,102,255,0.22),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric/30 bg-electric/10 text-cyanGlow text-xs font-mono tracking-widest uppercase mb-6">
            08 // Contact
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-[1.05]"
          >
            LET&apos;S BUILD SOMETHING{" "}
            <span className="bg-gradient-to-r from-cyanGlow via-electric to-royal-500 bg-clip-text text-transparent">
              WORTH REMEMBERING.
            </span>
          </motion.h2>
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Have an idea, product or digital experience in mind? Let&apos;s start a conversation.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Email */}
          <div className="group relative p-6 rounded-2xl glass-panel hover:glass-panel-glow transition-all flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-mono tracking-widest text-cyanGlow">EMAIL</span>
              <Mail className="w-5 h-5 text-cyanGlow" />
            </div>
            <a
              href={`mailto:${EMAIL}`}
              className="text-base sm:text-lg font-mono font-bold text-white break-all hover:text-cyanGlow transition-colors"
            >
              {EMAIL}
            </a>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-electric to-royal-600 text-white text-xs font-mono tracking-wider uppercase shadow-neon-blue min-h-[44px]"
              >
                Write to us <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={copyEmail}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full border border-slate-700 text-slate-300 hover:text-white hover:border-cyanGlow/50 text-xs font-mono min-h-[44px]"
                aria-label="Copy email address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-cyanGlow" /> : <Copy className="w-3.5 h-3.5" />}
                <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* GitHub */}
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 rounded-2xl glass-panel hover:glass-panel-glow transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-mono tracking-widest text-cyanGlow">GITHUB</span>
              <Github className="w-5 h-5 text-cyanGlow" />
            </div>
            <span className="text-base sm:text-lg font-mono font-bold text-white break-all group-hover:text-cyanGlow transition-colors">
              {GITHUB}
            </span>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-slate-400 group-hover:text-cyanGlow">
              Open in new tab <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 rounded-2xl glass-panel hover:glass-panel-glow transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-mono tracking-widest text-cyanGlow">LINKEDIN</span>
              <Linkedin className="w-5 h-5 text-cyanGlow" />
            </div>
            <span className="text-base font-mono font-bold text-white break-all group-hover:text-cyanGlow transition-colors">
              {LINKEDIN}
            </span>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-slate-400 group-hover:text-cyanGlow">
              Open in new tab <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

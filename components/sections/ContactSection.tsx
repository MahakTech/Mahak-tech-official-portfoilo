"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Youtube, ArrowUpRight, Copy, Check, Calendar } from "lucide-react";
import { BOOKING_URL } from "@/lib/constants";

const EMAIL = "mahaktech90@gmail.com";
const GITHUB = "https://github.com/MahakTech";
const LINKEDIN = "https://www.linkedin.com/company/mahak-tech/?viewAsMember=true";
const YOUTUBE = "https://www.youtube.com/@MahakTech-b6b";

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

      <div className="relative z-10 max-w-6xl mx-auto">
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

        {/* Prominent Discovery Call Booking Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 p-8 sm:p-10 rounded-3xl glass-panel border border-electric/40 bg-gradient-to-b from-space-900/90 via-space-950 to-space-950 flex flex-col md:flex-row items-center justify-between gap-8 shadow-glass-elevated relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-electric/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="space-y-3 text-center md:text-left relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric/30 bg-electric/10 text-cyanGlow text-xs font-mono tracking-widest uppercase">
              <Calendar className="w-3.5 h-3.5" />
              <span>DISCOVERY CALL</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Schedule Your Discovery Call
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Have a project in mind? Book a discovery call and let&apos;s discuss how MahakTech can bring your vision to life.
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full sm:w-auto flex flex-col items-center sm:items-end gap-2">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 min-h-[50px] rounded-full font-mono text-xs sm:text-sm tracking-wider uppercase text-white bg-gradient-to-r from-electric via-royal-500 to-cyanGlow hover:from-cyanGlow hover:to-electric transition-all duration-300 shadow-neon-blue hover:shadow-neon-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-cyanGlow font-bold"
              aria-label="Book a Discovery Call with MahakTech (opens in a new tab)"
            >
              <Calendar className="w-4 h-4 text-cyanGlow" />
              <span>Book a Discovery Call</span>
              <ArrowUpRight className="w-4 h-4 opacity-80" />
            </a>
            <span className="text-[11px] font-mono text-slate-400">
              Opens Google Forms • Free Consultation
            </span>
          </div>
        </motion.div>

        {/* Direct Communication Channels */}
        <div className="mt-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-slate-800/80 flex-1" />
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Or connect directly via
            </span>
            <div className="h-px bg-slate-800/80 flex-1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Email */}
            <div className="group relative p-6 rounded-2xl glass-panel hover:glass-panel-glow transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono tracking-widest text-cyanGlow">EMAIL</span>
                <Mail className="w-5 h-5 text-cyanGlow" />
              </div>
              <a
                href={`mailto:${EMAIL}`}
                className="text-sm sm:text-base font-mono font-bold text-white break-all hover:text-cyanGlow transition-colors"
              >
                {EMAIL}
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-electric to-royal-600 text-white text-xs font-mono tracking-wider uppercase shadow-neon-blue min-h-[44px]"
              >
                Write to us <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={copyEmail}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-slate-700 text-slate-300 hover:text-white hover:border-cyanGlow/50 text-xs font-mono min-h-[44px]"
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
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono tracking-widest text-cyanGlow">GITHUB</span>
                <Github className="w-5 h-5 text-cyanGlow" />
              </div>
              <span className="text-sm sm:text-base font-mono font-bold text-white break-all group-hover:text-cyanGlow transition-colors">
                MahakTech
              </span>
            </div>
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
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono tracking-widest text-cyanGlow">LINKEDIN</span>
                <Linkedin className="w-5 h-5 text-cyanGlow" />
              </div>
              <span className="text-sm sm:text-base font-mono font-bold text-white break-all group-hover:text-cyanGlow transition-colors">
                MahakTech
              </span>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-slate-400 group-hover:text-cyanGlow">
              Open in new tab <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* YouTube */}
          <a
            href={YOUTUBE}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 rounded-2xl glass-panel hover:glass-panel-glow transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono tracking-widest text-red-400">YOUTUBE</span>
                <Youtube className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-sm sm:text-base font-mono font-bold text-white break-all group-hover:text-red-400 transition-colors">
                @MahakTech-b6b
              </span>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-slate-400 group-hover:text-red-400">
              Watch on YouTube <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
);
}

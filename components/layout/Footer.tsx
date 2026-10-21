"use client";

import Image from "next/image";
import { useTelemetry } from "@/components/providers/TelemetryProvider";
import { Eye, MousePointerClick, Calendar, ArrowUpRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/constants";

export function Footer() {
  const { views, clicks, isClickPulsing } = useTelemetry();

  return (
    <footer className="relative bg-space-950 border-t border-slate-900/80 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-electric/40">
            <Image src="/assets/mahaktech-logo.jpeg" alt="MahakTech logo" fill className="object-cover" />
          </div>
          <div>
            <p className="font-mono font-bold tracking-wider text-white">MahakTech</p>
            <p className="text-xs text-slate-400 font-mono tracking-wider">Technology. Design. Innovation.</p>
          </div>
        </div>

        {/* Live Site Telemetry Readout */}
        <div className="flex items-center gap-4 px-4 py-2 rounded-full border border-slate-800/80 bg-space-900/50 backdrop-blur-md font-mono text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-cyanGlow">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyanGlow opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-semibold text-slate-300">LIVE TELEMETRY:</span>
          </span>
          <span className="inline-flex items-center gap-1 text-slate-200" title="Total recorded views">
            <Eye className="w-3.5 h-3.5 text-cyanGlow" />
            <strong className="font-mono text-white">{views.toLocaleString()}</strong>
            <span className="text-[10px] text-slate-500 uppercase">views</span>
          </span>
          <span className="text-slate-700">•</span>
          <span
            className={`inline-flex items-center gap-1 transition-colors ${
              isClickPulsing ? "text-cyanGlow font-bold" : "text-slate-200"
            }`}
            title="Total recorded user interactions/clicks"
          >
            <MousePointerClick className="w-3.5 h-3.5 text-electric" />
            <strong className="font-mono text-white">{clicks.toLocaleString()}</strong>
            <span className="text-[10px] text-slate-500 uppercase">clicks</span>
          </span>
        </div>

        <nav aria-label="Footer" className="flex items-center flex-wrap gap-5 text-sm font-mono text-slate-300">
          <a
            href="https://github.com/MahakTech"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyanGlow transition-colors py-2"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/company/mahak-tech/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyanGlow transition-colors py-2"
          >
            LinkedIn
          </a>
          <a
            href="https://www.youtube.com/@MahakTech-b6b"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition-colors py-2"
          >
            YouTube
          </a>
          <a href="mailto:mahaktech90@gmail.com" className="hover:text-cyanGlow transition-colors py-2">
            Email
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-electric/40 bg-electric/15 text-cyanGlow hover:bg-electric hover:text-white transition-all duration-200 text-xs font-mono tracking-wider uppercase shadow-[0_0_12px_rgba(0,102,255,0.2)] hover:shadow-neon-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-cyanGlow"
            aria-label="Book a Discovery Call with MahakTech (opens in a new tab)"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book a Call</span>
            <ArrowUpRight className="w-3 h-3 opacity-80" />
          </a>
        </nav>
      </div>
      <p className="mt-10 text-center text-xs text-slate-500 font-mono">
        © 2026 MahakTech. All rights reserved.
      </p>
    </footer>
  );
}

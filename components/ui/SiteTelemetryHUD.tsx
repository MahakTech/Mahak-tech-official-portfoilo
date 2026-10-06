"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, MousePointerClick, Activity, ChevronDown, ChevronUp, Zap, Users } from "lucide-react";
import { useTelemetry } from "@/components/providers/TelemetryProvider";

export function SiteTelemetryHUD() {
  const { views, uniqueVisitors, clicks, sessionClicks, isClickPulsing, recordManualClick } = useTelemetry();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      aria-label="Live Website Telemetry"
      className="fixed bottom-4 right-4 z-40 select-none font-mono pointer-events-auto"
    >
      <div className="relative">
        {/* Main Floating Capsule */}
        <div
          className={`flex items-center gap-3 px-3.5 py-2 rounded-full border backdrop-blur-xl transition-all duration-300 shadow-2xl ${
            isClickPulsing
              ? "border-cyanGlow bg-space-900/95 shadow-[0_0_25px_rgba(0,240,255,0.4)] scale-[1.02]"
              : "border-slate-800/80 bg-space-950/85 hover:border-slate-700/80"
          }`}
        >
          {/* Live Activity Dot */}
          <div className="flex items-center gap-2 pr-2 border-r border-slate-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyanGlow opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-[10px] tracking-wider text-slate-400 font-bold hidden sm:inline uppercase">
              LIVE
            </span>
          </div>

          {/* Views Indicator */}
          <div
            className="flex items-center gap-1.5 text-xs text-slate-300"
            title="Actual recorded website page visits"
          >
            <Eye className="w-3.5 h-3.5 text-cyanGlow" />
            <span className="font-bold text-white tracking-wider">
              {views.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest hidden md:inline">
              views
            </span>
          </div>

          <span className="text-slate-700">|</span>

          {/* Live Clicks Indicator with Real-Time Pulse */}
          <button
            onClick={recordManualClick}
            className={`flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full transition-all duration-200 ${
              isClickPulsing
                ? "bg-cyanGlow/20 text-cyanGlow scale-105"
                : "text-slate-300 hover:text-white hover:bg-space-800"
            }`}
            title="Click anywhere on the website to increment actual live interaction counter"
          >
            <MousePointerClick
              className={`w-3.5 h-3.5 transition-transform ${
                isClickPulsing ? "text-cyanGlow scale-125" : "text-electric"
              }`}
            />
            <span
              className={`font-bold tracking-wider transition-colors ${
                isClickPulsing ? "text-cyanGlow" : "text-white"
              }`}
            >
              {clicks.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest hidden md:inline">
              clicks
            </span>
          </button>

          {/* Expand Details Trigger */}
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label={isExpanded ? "Collapse telemetry details" : "Expand telemetry details"}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-space-800 transition-colors ml-0.5"
          >
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Expanded Telemetry Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-12 right-0 w-72 p-4 rounded-2xl glass-panel border border-slate-800 bg-space-950/95 shadow-2xl backdrop-blur-2xl text-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-2 text-cyanGlow">
                  <Activity className="w-4 h-4" />
                  <span className="font-bold tracking-wider uppercase text-[11px]">
                    Actual Telemetry
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">SERVER: LIVE</span>
              </div>

              <div className="space-y-2 text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Eye className="w-3 h-3 text-cyanGlow" /> Actual Page Views
                  </span>
                  <span className="font-bold text-white">{views.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-emerald-400" /> Unique Visitors
                  </span>
                  <span className="font-bold text-emerald-300">{uniqueVisitors.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-electric" /> Actual Recorded Clicks
                  </span>
                  <span className="font-bold text-cyanGlow">{clicks.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-900">
                  <span className="text-slate-400">Your Session Clicks</span>
                  <span className="font-bold text-emerald-400">+{sessionClicks}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Real backend-recorded analytics. Every visitor load and user interaction across the site increments the server counter in real time.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}

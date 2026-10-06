"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

interface TelemetryContextType {
  views: number;
  clicks: number;
  sessionClicks: number;
  isClickPulsing: boolean;
  mounted: boolean;
  recordManualClick: () => void;
}

const TelemetryContext = createContext<TelemetryContextType>({
  views: 18420,
  clicks: 42890,
  sessionClicks: 0,
  isClickPulsing: false,
  mounted: false,
  recordManualClick: () => {},
});

const BASE_VIEWS = 18420;
const BASE_CLICKS = 42890;

export function TelemetryProvider({ children }: { children: React.ReactNode }) {
  const [views, setViews] = useState<number>(BASE_VIEWS);
  const [clicks, setClicks] = useState<number>(BASE_CLICKS);
  const [sessionClicks, setSessionClicks] = useState<number>(0);
  const [isClickPulsing, setIsClickPulsing] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    // 1. Initialize & increment Page Views
    try {
      const storedViews = localStorage.getItem("mahaktech_telemetry_views");
      const hasViewedThisSession = sessionStorage.getItem("mahaktech_view_registered");
      let currentViews = storedViews ? parseInt(storedViews, 10) : BASE_VIEWS;

      if (isNaN(currentViews) || currentViews < BASE_VIEWS) {
        currentViews = BASE_VIEWS;
      }

      if (!hasViewedThisSession) {
        currentViews += 1;
        sessionStorage.setItem("mahaktech_view_registered", "true");
        localStorage.setItem("mahaktech_telemetry_views", currentViews.toString());
      }

      setViews(currentViews);
    } catch {
      // Fallback if localStorage is restricted
      setViews(BASE_VIEWS + 1);
    }

    // 2. Initialize Clicks
    try {
      const storedClicks = localStorage.getItem("mahaktech_telemetry_clicks");
      let currentClicks = storedClicks ? parseInt(storedClicks, 10) : BASE_CLICKS;
      if (isNaN(currentClicks) || currentClicks < BASE_CLICKS) {
        currentClicks = BASE_CLICKS;
      }
      setClicks(currentClicks);
    } catch {
      setClicks(BASE_CLICKS);
    }

    // 3. Listen to all window clicks/taps to record live user interactions
    let pulseTimer: NodeJS.Timeout;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      // Ignore right clicks
      if ("button" in e && e.button !== 0 && e.button !== undefined) return;

      setClicks((prev) => {
        const next = prev + 1;
        try {
          localStorage.setItem("mahaktech_telemetry_clicks", next.toString());
        } catch {
          /* ignore storage error */
        }
        return next;
      });

      setSessionClicks((prev) => prev + 1);

      // Trigger pulse animation
      setIsClickPulsing(true);
      clearTimeout(pulseTimer);
      pulseTimer = setTimeout(() => {
        setIsClickPulsing(false);
      }, 350);
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      clearTimeout(pulseTimer);
    };
  }, []);

  const recordManualClick = useCallback(() => {
    setClicks((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem("mahaktech_telemetry_clicks", next.toString());
      } catch {
        /* ignore */
      }
      return next;
    });
    setSessionClicks((prev) => prev + 1);
    setIsClickPulsing(true);
    setTimeout(() => setIsClickPulsing(false), 350);
  }, []);

  return (
    <TelemetryContext.Provider
      value={{
        views,
        clicks,
        sessionClicks,
        isClickPulsing,
        mounted,
        recordManualClick,
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
}

export function useTelemetry() {
  return useContext(TelemetryContext);
}

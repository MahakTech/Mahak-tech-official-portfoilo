"use client";

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";

interface TelemetryContextType {
  views: number;
  uniqueVisitors: number;
  clicks: number;
  sessionClicks: number;
  isClickPulsing: boolean;
  mounted: boolean;
  isLoading: boolean;
  recordManualClick: () => void;
}

const TelemetryContext = createContext<TelemetryContextType>({
  views: 0,
  uniqueVisitors: 0,
  clicks: 0,
  sessionClicks: 0,
  isClickPulsing: false,
  mounted: false,
  isLoading: true,
  recordManualClick: () => {},
});

export function TelemetryProvider({ children }: { children: React.ReactNode }) {
  const [views, setViews] = useState<number>(0);
  const [uniqueVisitors, setUniqueVisitors] = useState<number>(0);
  const [clicks, setClicks] = useState<number>(0);
  const [sessionClicks, setSessionClicks] = useState<number>(0);
  const [isClickPulsing, setIsClickPulsing] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const pendingClicksRef = useRef<number>(0);
  const flushTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Send accumulated clicks to the backend API
  const flushClicks = useCallback(async () => {
    const toFlush = pendingClicksRef.current;
    if (toFlush <= 0) return;

    pendingClicksRef.current = 0;

    try {
      const res = await fetch("/api/telemetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "click", count: toFlush }),
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof data.clicks === "number") {
          setClicks(data.clicks);
        }
      }
    } catch (err) {
      // Re-queue on network error
      pendingClicksRef.current += toFlush;
    }
  }, []);

  useEffect(() => {
    setMounted(true);

    // Get or generate anonymous visitor identifier
    let visitorId = "";
    try {
      visitorId = localStorage.getItem("mahaktech_visitor_id") || "";
      if (!visitorId) {
        visitorId = "vis_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36);
        localStorage.setItem("mahaktech_visitor_id", visitorId);
      }
    } catch {
      visitorId = "vis_anon_" + Date.now();
    }

    const isSessionViewRegistered = (() => {
      try {
        return sessionStorage.getItem("mahaktech_session_view") === "true";
      } catch {
        return false;
      }
    })();

    // 1. Fetch initial telemetry and record view if new session
    const initTelemetry = async () => {
      try {
        if (!isSessionViewRegistered) {
          // Record actual new view on the server
          const res = await fetch("/api/telemetry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "view", visitorId }),
          });
          if (res.ok) {
            const data = await res.json();
            setViews(data.views ?? 0);
            setUniqueVisitors(data.uniqueVisitors ?? 0);
            setClicks(data.clicks ?? 0);
            try {
              sessionStorage.setItem("mahaktech_session_view", "true");
            } catch {}
          }
        } else {
          // Already registered this session, fetch latest counts
          const res = await fetch("/api/telemetry");
          if (res.ok) {
            const data = await res.json();
            setViews(data.views ?? 0);
            setUniqueVisitors(data.uniqueVisitors ?? 0);
            setClicks(data.clicks ?? 0);
          }
        }
      } catch (err) {
        console.error("Failed to load telemetry:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initTelemetry();

    // 2. Poll server every 30 seconds for live synchronized visitor counts
    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch("/api/telemetry");
        if (res.ok) {
          const data = await res.json();
          setViews(data.views ?? 0);
          setUniqueVisitors(data.uniqueVisitors ?? 0);
          setClicks((prev) => Math.max(prev, data.clicks ?? 0));
        }
      } catch {}
    }, 30000);

    // 3. Global pointer listener for real user clicks
    let pulseTimer: NodeJS.Timeout;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if ("button" in e && e.button !== 0 && e.button !== undefined) return;

      // Update client state immediately
      setClicks((prev) => prev + 1);
      setSessionClicks((prev) => prev + 1);
      pendingClicksRef.current += 1;

      // Visual pulse
      setIsClickPulsing(true);
      clearTimeout(pulseTimer);
      pulseTimer = setTimeout(() => {
        setIsClickPulsing(false);
      }, 350);

      // Debounce sync to server (flush after 1.5s of activity or when idle)
      if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
      flushTimerRef.current = setTimeout(() => {
        flushClicks();
      }, 1500);
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    // Flush any pending clicks on page unload using sendBeacon
    const handleUnload = () => {
      if (pendingClicksRef.current > 0) {
        const payload = JSON.stringify({ action: "click", count: pendingClicksRef.current });
        navigator.sendBeacon("/api/telemetry", payload);
      }
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      clearInterval(pollInterval);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("beforeunload", handleUnload);
      clearTimeout(pulseTimer);
      if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
      flushClicks();
    };
  }, [flushClicks]);

  const recordManualClick = useCallback(() => {
    setClicks((prev) => prev + 1);
    setSessionClicks((prev) => prev + 1);
    pendingClicksRef.current += 1;
    setIsClickPulsing(true);
    setTimeout(() => setIsClickPulsing(false), 350);

    if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
    flushTimerRef.current = setTimeout(() => {
      flushClicks();
    }, 1500);
  }, [flushClicks]);

  return (
    <TelemetryContext.Provider
      value={{
        views,
        uniqueVisitors,
        clicks,
        sessionClicks,
        isClickPulsing,
        mounted,
        isLoading,
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

"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { LoadingScreen } from "@/components/intro/LoadingScreen";
import { PortalIntro } from "@/components/intro/PortalIntro";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TechWorldSection } from "@/components/sections/TechWorldSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WhySection } from "@/components/sections/WhySection";
import { VisionSection } from "@/components/sections/VisionSection";
import { ContactSection } from "@/components/sections/ContactSection";

type Phase = "loading" | "intro" | "main";

export function SiteShell() {
  const [phase, setPhase] = useState<Phase>("loading");

  const onLoaded = useCallback(() => setPhase("intro"), []);
  const onEnter = useCallback(() => {
    setPhase("main");
    window.scrollTo(0, 0);
  }, []);

  // Lock page scroll while loader / intro are on screen
  useEffect(() => {
    document.documentElement.style.overflow = phase === "main" ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [phase]);

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <CustomCursor />
        <div className="ambient-bg" aria-hidden="true" />

        <AnimatePresence>
          {phase === "loading" && <LoadingScreen key="loading" onDone={onLoaded} />}
          {phase === "intro" && <PortalIntro key="intro" onEnter={onEnter} />}
        </AnimatePresence>

        <Navbar />
        <main id="main" className="relative z-[1]">
          <HeroSection active={phase === "main"} />
          <AboutSection />
          <ServicesSection />
          <TechWorldSection />
          <ProjectsSection />
          <ProcessSection />
          <WhySection />
          <VisionSection />
          <ContactSection />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </MotionConfig>
  );
}

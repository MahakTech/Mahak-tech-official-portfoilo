"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Mail } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Technologies", href: "#technologies" },
  { name: "Lab", href: "#lab" },
  { name: "Approach", href: "#approach" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Detect active section
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-3.5 px-4 md:px-8 ${
          isScrolled
            ? "bg-space-950/80 backdrop-blur-xl border-b border-electric/15 shadow-glass"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Brand Anchor */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-cyanGlow rounded-lg p-1"
            aria-label="MahakTech Home"
          >
            <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border border-electric/40 p-0.5 group-hover:border-cyanGlow transition-colors shadow-[0_0_12px_rgba(0,102,255,0.4)]">
              <Image
                src="/assets/mahaktech-logo.jpeg"
                alt="MahakTech Logo"
                fill
                priority
                className="object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm md:text-base font-bold tracking-wider text-white group-hover:text-cyanGlow transition-colors">
                MAHAKTECH
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 font-mono -mt-1 hidden sm:block">
                DIGITAL UNIVERSE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full border border-slate-800/80 bg-space-900/60 backdrop-blur-md"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-mono tracking-wider transition-colors duration-200 rounded-full ${
                    isActive ? "text-cyanGlow" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-electric/20 border border-cyanGlow/40"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Direct Contact Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="mailto:mahaktech90@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase text-white bg-electric/20 border border-electric/50 hover:bg-electric hover:border-cyanGlow transition-all duration-200 shadow-[0_0_15px_rgba(0,102,255,0.25)] hover:shadow-neon-blue"
            >
              <Mail className="w-3.5 h-3.5 text-cyanGlow" />
              <span>Let&apos;s Connect</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-slate-800 bg-space-900/80 text-slate-200 hover:text-cyanGlow hover:border-cyanGlow/40 transition-colors focus:outline-none focus:ring-1 focus:ring-cyanGlow"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-30 pt-20 px-6 pb-8 bg-space-950/95 backdrop-blur-2xl flex flex-col justify-between lg:hidden border-b border-electric/20"
          >
            <div className="flex flex-col space-y-4 pt-4">
              <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                Navigation
              </span>
              <div className="flex flex-col space-y-2">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`text-lg font-mono tracking-wide py-2 px-3 rounded-lg flex items-center justify-between transition-colors ${
                        isActive
                          ? "bg-electric/20 text-cyanGlow border border-cyanGlow/30"
                          : "text-slate-300 hover:text-white hover:bg-space-900"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-60" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80 space-y-3">
              <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                Direct Contact
              </span>
              <a
                href="mailto:mahaktech90@gmail.com"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gradient-to-r from-electric to-royal-600 text-white font-mono text-sm tracking-wider shadow-neon-blue"
              >
                <Mail className="w-4 h-4" />
                <span>mahaktech90@gmail.com</span>
              </a>
              <div className="flex justify-center gap-6 pt-2 text-xs font-mono text-slate-400">
                <a
                  href="https://github.com/MahakTech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyanGlow transition-colors"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/company/mahak-tech/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyanGlow transition-colors"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

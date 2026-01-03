"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import WaitlistModal from "@/components/WaitlistModal";

export default function Navbar() {
  const [isExcited, setIsExcited] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  // Handle Mascot Interaction
  useEffect(() => {
    const handleMascotHover = (e: CustomEvent) => setIsExcited(e.detail?.active ?? false);
    window.addEventListener("vylera-mascot-hover" as any, handleMascotHover);
    return () => window.removeEventListener("vylera-mascot-hover" as any, handleMascotHover);
  }, []);

  // Handle Waitlist Open Logic (Body Lock)
  useEffect(() => {
    if (isWaitlistOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isWaitlistOpen]);

  // Handle Active Section Scrolling
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["platform", "manifesto", "research"];
      const scrollPosition = window.scrollY + 100; // Offset

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ href, targetId, children }: { href: string; targetId: string; children: React.ReactNode }) => {
    const isActive = activeSection === targetId;

    return (
      <Link href={href} className="relative group flex flex-col items-center justify-center">
        <motion.span
          className={`text-base font-medium tracking-wide transition-all duration-300 ${isActive ? "text-white" : "text-slate-400/80 group-hover:text-white"}`}
          animate={{ scale: isActive ? 1.05 : 1 }}
          style={{ textShadow: isActive || isExcited ? "0 0 8px rgba(100,255,218,0.6)" : "none" }}
        >
          {children}
        </motion.span>

        {/* Neon Underline - Expands from center */}
        <motion.div
          className="absolute -bottom-1 h-[2px] bg-cyan shadow-[0_0_10px_#64ffda]"
          initial={{ width: "0%" }}
          animate={{
            width: isActive ? "100%" : "0%",
            opacity: isActive ? 1 : 0
          }}
          whileHover={{ width: "100%", opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Active Breathing Effect on Underline */}
        {isActive && (
          <motion.div
            className="absolute -bottom-1 h-[2px] w-full bg-cyan shadow-[0_0_15px_#64ffda]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </Link>
    );
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] h-24 flex items-center justify-between px-6 md:px-12 backdrop-blur-md bg-[#0a192f]/90 border-b border-white/5 shadow-2xl"
      >
        <div className="flex items-center gap-5">
          {/* Digital Iris Logo - Command Center Scale */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <motion.svg
              className="w-full h-full"
              viewBox="0 0 40 40"
              animate={{ rotate: isWaitlistOpen ? 360 : (isExcited ? 60 : 0) }}
              transition={{
                duration: isWaitlistOpen ? 2 : 0.8,
                ease: isWaitlistOpen ? "linear" : "circOut",
                repeat: isWaitlistOpen ? Infinity : 0
              }}
            >
              {/* Center Core */}
              <circle cx="20" cy="20" r="3" stroke="#64ffda" strokeWidth="1" fill="none" opacity="0.6" />

              {/* 6 Iris Nodes - Clockwise Loading Pulse */}
              {[...Array(6)].map((_, i) => (
                <motion.g
                  key={i}
                  transform={`rotate(${i * 60} 20 20)`}
                >
                  <motion.rect
                    x="18.5"
                    y="5"
                    width="3"
                    height="8"
                    rx="1.5"
                    fill="#64ffda"
                    initial={{ opacity: 0.3 }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scaleY: [1, 1.1, 1],
                      filter: (isExcited || isWaitlistOpen) ? "drop-shadow(0 0 6px #64ffda)" : "none"
                    }}
                    transition={{
                      duration: isWaitlistOpen ? 0.5 : 2, // Rapid pulse when waitlist open
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * (isWaitlistOpen ? 0.08 : 0.33), // Rapid wave vs slow wave
                    }}
                  />
                </motion.g>
              ))}
            </motion.svg>
          </div>

          {/* Branding - Upscaled & Precision Tracking */}
          <div className="flex items-baseline gap-2 select-none">
            <span className="text-light font-bold text-xl tracking-[0.1em]">VYLERA</span>
            <span className="text-slate font-extralight text-xl tracking-[0.2em] leading-none opacity-80">LABS</span>
          </div>
        </div>

        {/* Navigation - Neural Interface */}
        <div className="hidden md:flex items-center gap-12">
          <NavLink href="#platform" targetId="platform">Platform</NavLink>
          <NavLink href="#manifesto" targetId="manifesto">Manifesto</NavLink>
          <NavLink href="#research" targetId="research">Research</NavLink>
        </div>

        {/* Grant Access - "AWAKEN YOUR HOME" */}
        <div className="relative group">
          <button
            onClick={() => setIsWaitlistOpen(true)}
            className="relative z-10 px-8 py-3 bg-cyan-500/5 backdrop-blur-xl border border-cyan-500/30 text-cyan text-sm tracking-widest font-bold uppercase transition-all duration-300 overflow-hidden hover:bg-cyan-500/10"
          >
            {/* Text Content */}
            <span className="relative z-20">AWAKEN YOUR HOME</span>

            {/* Linear Shimmer Scan Effect */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-[shimmer_1.5s_infinite]" />

            {/* Heartbeat Pulse Shadow */}
            <motion.div
              className="absolute inset-0 rounded-sm"
              animate={{ boxShadow: ["0 0 0px rgba(100,255,218,0)", "0 0 20px rgba(100,255,218,0.2)", "0 0 0px rgba(100,255,218,0)"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Insert Modal Here */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </>
  );
}

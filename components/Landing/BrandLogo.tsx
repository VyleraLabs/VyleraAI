"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function BrandLogo({ className = "w-full h-full" }: { className?: string }) {
    const [isExcited, setIsExcited] = useState(false);

    // Optional: Handle Mascot Interaction if it exists
    useEffect(() => {
        const handleMascotHover = (e: CustomEvent) => setIsExcited(e.detail?.active ?? false);
        window.addEventListener("vylera-mascot-hover" as any, handleMascotHover);
        return () => window.removeEventListener("vylera-mascot-hover" as any, handleMascotHover);
    }, []);

    return (
        <div className={`relative flex items-center gap-4 ${className}`}>
            {/* Digital Iris Logo - Command Center Scale */}
            <div className="relative w-10 h-10 flex items-center justify-center flex-shrink-0">
                <motion.svg
                    className="w-full h-full"
                    viewBox="0 0 40 40"
                    animate={{ rotate: isExcited ? 60 : 0 }}
                    transition={{
                        duration: 0.8,
                        ease: "circOut",
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
                                    filter: isExcited ? "drop-shadow(0 0 6px #64ffda)" : "none"
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.33,
                                }}
                            />
                        </motion.g>
                    ))}
                </motion.svg>
            </div>

            {/* Branding - Upscaled & Precision Tracking */}
            <div className="flex items-baseline gap-2 select-none overflow-hidden shrink-0 pt-0.5">
                <span className="text-[#e2e8f0] font-bold text-lg md:text-xl tracking-[0.1em]">VYLERA</span>
                <span className="text-[#94a3b8] font-extralight text-lg md:text-xl tracking-[0.2em] leading-none opacity-80">LABS</span>
            </div>
        </div>
    );
}

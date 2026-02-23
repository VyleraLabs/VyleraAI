"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("@/components/3d/HeroCanvas"), { ssr: false });

export default function EntryHero() {
    const [isHovered, setIsHovered] = useState(false);
    const [mount3D, setMount3D] = useState(false);

    useEffect(() => {
        // Strictly delay the massive Three.js chunk from fetching until well after the LCP paint.
        const timer = setTimeout(() => setMount3D(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy pt-24"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered(true)}
        >
            {/* Background Grid (Subtle) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(100,255,218,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,255,218,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

            {/* Breathing Node Container */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none mt-24">
                {/* Core Glow - The "Soul" */}
                <motion.div
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-cyan blur-[60px]"
                />

                {/* Outer Ring 1 - Expansion */}
                <motion.div
                    animate={{
                        scale: [0.8, 1.2, 0.8],
                        borderWidth: ["1px", "2px", "1px"],
                        borderColor: ["rgba(100, 255, 218, 0.1)", "rgba(100, 255, 218, 0.3)", "rgba(100, 255, 218, 0.1)"]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2
                    }}
                    className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-cyan/20 opacity-50"
                />

                {/* Center Point - The "Singularity" */}
                <div className="absolute w-2 h-2 rounded-full bg-cyan shadow-[0_0_15px_rgba(100,255,218,1)]" />
            </div>

            {/* 3D Meti Mascot (Hero Background) */}
            <div className="absolute inset-0 w-full h-full z-0 block pointer-events-none opacity-60 mt-24">
                {mount3D && <HeroCanvas isHovered={isHovered} />}
            </div>

            {/* Text Content - Floating above */}
            <div className="relative z-10 text-center max-w-5xl mx-auto px-6 mt-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-cyan/20 bg-cyan/5 text-cyan font-mono text-sm tracking-[0.2em] uppercase">
                        Let's solve tomorrow's problems, today.
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-light tracking-tighter leading-[1] mb-8 uppercase" style={{
                        background: "linear-gradient(180deg, #FFFFFF 0%, #A0AEC0 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}>
                        Vylera
                        <span className="block text-4xl md:text-6xl lg:text-7xl tracking-[0.2em] font-light mt-4" style={{
                            background: "linear-gradient(180deg, rgba(160, 174, 192, 0.8) 0%, rgba(160, 174, 192, 0.2) 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>Labs</span>
                    </h1>
                </motion.div>
            </div>
        </section>
    );
}

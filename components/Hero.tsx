"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { MetiMascot } from "./3d/MetiMascot";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy">
            {/* Background Grid (Subtle) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(100,255,218,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,255,218,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

            {/* Breathing Node Container */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
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
                    className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-cyan blur-[100px]"
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
            <div className="absolute inset-0 w-full h-full z-0 block pointer-events-none opacity-60">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <MetiMascot />
                </Canvas>
            </div>

            {/* Text Content - Floating above */}
            <div className="relative z-10 text-center max-w-5xl mx-auto px-6 mt-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-block mb-4 px-3 py-1 rounded-full border border-cyan/20 bg-cyan/5 text-cyan font-mono text-xs tracking-[0.2em] uppercase">
                        Status: Private Beta (v0.9) // Powered by Google Cloud
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-light tracking-tight leading-[1.1] mb-8">
                        The Sovereign OS for Fragmented IoT.
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="text-slate text-lg md:text-2xl font-light tracking-wide max-w-3xl mx-auto leading-relaxed"
                >
                    Vylera unifies disparate hardware ecosystems (Tuya, Zigbee, Matter) into a single, intelligent Neural Core. Powered by Google Vertex AI.
                </motion.p>
            </div>
        </section>
    );
}

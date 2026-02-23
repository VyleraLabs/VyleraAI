"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function NeuralBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Deep Obsidian Background */}
            <div className="absolute inset-0 bg-[#050B14]" />

            {/* Ambient Deep Field Aura */}
            <motion.div
                animate={{
                    opacity: [0.05, 0.15, 0.05],
                    scale: [0.9, 1.1, 0.9]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] rounded-[100%] bg-gradient-to-tr from-cyan-900/20 via-blue-900/10 to-transparent blur-[120px] pointer-events-none"
            />
        </div>
    );
}

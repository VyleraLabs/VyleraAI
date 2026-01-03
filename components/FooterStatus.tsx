"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wifi, Brain, ShieldCheck } from "lucide-react";

export default function FooterStatus() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour12: false }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
            className="fixed bottom-0 left-0 right-0 h-10 bg-black/40 backdrop-blur-md border-t border-slate-800 z-50 flex items-center justify-between px-4 md:px-6 text-[10px] md:text-xs font-mono text-slate/60 uppercase tracking-wider"
        >
            {/* Left: Version */}
            <div className="hidden md:block">
                VYLERA CORE v1.0.4-BETA
            </div>
            <div className="md:hidden">v1.0.4</div>

            {/* Center: System Nodes */}
            <div className="flex items-center gap-4 md:gap-8">

                {/* Vylera AI */}
                <div className="flex items-center gap-2">
                    <div className="relative flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
                    </div>
                    <span className="hidden md:inline">VYLERA AI: CONNECTED</span>
                    <Wifi className="w-3 h-3 md:hidden" />
                </div>

                {/* Vertex AI */}
                <div className="flex items-center gap-2">
                    <div className="relative flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
                        <div className="absolute inset-0 rounded-full bg-cyan animate-ping opacity-75" />
                    </div>
                    <span className="hidden md:inline text-cyan">VERTEX AI: OPTIMIZED</span>
                    <Brain className="w-3 h-3 md:hidden text-cyan" />
                </div>

                {/* Sanctuary Protocol */}
                <div className="flex items-center gap-2">
                    <div className="relative flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
                    </div>
                    <span className="hidden md:inline">SANCTUARY: ACTIVE</span>
                    <ShieldCheck className="w-3 h-3 md:hidden" />
                </div>

            </div>

            {/* Right: Clock */}
            <div className="hidden md:block w-20 text-right">
                {time}
            </div>
        </motion.div>
    );
}

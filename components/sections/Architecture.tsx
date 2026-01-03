"use client";

import { motion } from "framer-motion";
import { Cpu, Cloud, Home, Database, Zap } from "lucide-react";

export default function Architecture() {
    return (
        <section className="bg-navy py-24 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(100,255,218,0.03),transparent_60%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-cyan font-mono text-sm tracking-widest uppercase mb-4">
                        System Architecture
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
                        The Edge-to-Core Pipeline
                    </h3>
                </div>

                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Diagram Container */}
                    <div className="relative w-full aspect-[4/3] bg-[#050c18] border border-white/10 rounded-xl p-6 shadow-2xl overflow-hidden flex items-center justify-center">

                        {/* Connecting Lines (Animated SVG) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 600 450">
                            {/* Path 1: Sensors -> Edge */}
                            <motion.path
                                d="M100,225 L250,225"
                                stroke="rgba(100,255,218,0.2)"
                                strokeWidth="2"
                                fill="none"
                            />
                            <motion.path
                                d="M100,225 L250,225"
                                stroke="#64ffda"
                                strokeWidth="2"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Path 2: Edge -> Cloud */}
                            <motion.path
                                d="M350,225 L500,225"
                                stroke="rgba(100,255,218,0.2)"
                                strokeWidth="2"
                                fill="none"
                            />
                            <motion.path
                                d="M350,225 L500,225"
                                stroke="#64ffda"
                                strokeWidth="2"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                            />
                        </svg>

                        {/* Nodes */}
                        <div className="relative z-10 w-full flex justify-between items-center px-12">

                            {/* Node 1: Home Sensors */}
                            <div className="flex flex-col items-center gap-4 text-center">
                                <div className="w-16 h-16 rounded-full bg-navy border border-white/20 flex items-center justify-center relative">
                                    <Home className="w-6 h-6 text-slate-400" />
                                    <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-sm">Sensors</div>
                                    <div className="text-slate-500 text-xs">Zigbee / Matter</div>
                                </div>
                            </div>

                            {/* Node 2: Vylera AI (Edge) */}
                            <div className="flex flex-col items-center gap-4 text-center">
                                <div className="w-24 h-24 rounded-2xl bg-[#0a192f] border border-cyan flex items-center justify-center relative shadow-[0_0_30px_rgba(100,255,218,0.1)]">
                                    <Database className="w-8 h-8 text-cyan" />
                                    {/* Ring Animation */}
                                    <motion.div
                                        className="absolute inset-0 border border-cyan/30 rounded-2xl"
                                        animate={{ scale: [1, 1.2], opacity: [1, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>
                                <div>
                                    <div className="text-cyan font-bold text-sm">Vylera AI</div>
                                    <div className="text-slate-400 text-xs font-mono">Local Ingestion</div>
                                </div>
                            </div>

                            {/* Node 3: Vertex AI (Cloud) */}
                            <div className="flex flex-col items-center gap-4 text-center">
                                <div className="w-16 h-16 rounded-full bg-navy border border-white/20 flex items-center justify-center relative">
                                    <Cloud className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-sm">Vertex AI</div>
                                    <div className="text-slate-500 text-xs">Inference Core</div>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Text Description */}
                    <div className="space-y-8">
                        {/* Logic Block 1 */}
                        <div className="flex gap-4">
                            <div className="mt-1">
                                <div className="w-8 h-8 rounded bg-cyan/10 flex items-center justify-center text-cyan">
                                    <Zap className="w-4 h-4" />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">Local Vectorization</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    0.0ms Latency. Visual and audio data formats are converted to tensors instantly on the local gateway, isolating raw data from the external network.
                                </p>
                            </div>
                        </div>

                        {/* Logic Block 2 */}
                        <div className="flex gap-4">
                            <div className="mt-1">
                                <div className="w-8 h-8 rounded bg-purple-500/10 flex items-center justify-center text-purple-400">
                                    <Cpu className="w-4 h-4" />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">Vertex AI Inference</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Leveraging distributed compute units, high-level intent is extracted from anonymized vector streams, allowing Vylera to "understand" context without "seeing" the home.
                                </p>
                            </div>
                        </div>

                        {/* Outcome */}
                        <div className="p-6 border border-white/5 bg-white/5 rounded-lg">
                            <div className="text-xs text-slate-500 font-mono mb-2 uppercase tracking-wide">Outcome</div>
                            <div className="text-white font-serif text-xl italic">
                                "Ad-Free Ambient Response via YouTube Premium Integration for seamless auditory environments."
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}

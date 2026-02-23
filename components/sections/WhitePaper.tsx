"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Download, FileText, Lock, Terminal } from "lucide-react";
import TechnicalAbstractModal from "@/components/TechnicalAbstractModal";

const logs = [
    "[14:20:01] INGEST: Sensor_Cluster_Alpha (Zigbee) -> Packet_Received",
    "[14:20:01] VECTORIZE: Facial_Landmarks (128pts) -> Tensor_Float32",
    "[14:20:02] SENTIMENT: 0.98 Displeasure detected",
    "[14:20:02] QUERY: Knowledge_Graph -> 'Lighting.Preferences.Evening'",
    "[14:20:02] INFERENCE: Context match 'Headache' (Confidence: 87%)",
    "[14:20:03] ADJUST: Dimming Lights to 20% (Warmth: 2700K)",
    "[14:20:03] REINFORCE: Weighting Lighting.Logic +0.05",
    "[14:20:04] SANCTUARY: Flushing VRAM. No images stored.",
    "[14:20:05] IDLE: Awaiting context vectors...",
];

export default function WhitePaper() {
    const [isAbstractOpen, setIsAbstractOpen] = useState(false);

    return (
        <section className="bg-navy py-24 px-6 md:px-12 border-t border-white/5 relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                {/* Left: Content Architecture */}
                <div className="space-y-12">

                    {/* Header */}
                    <div className="space-y-4">
                        <h2 className="text-cyan font-mono text-sm tracking-widest uppercase flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Technical White Paper
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-serif text-light tracking-tight border-l-2 border-cyan pl-6">
                            Vylera-1: A Foundation Model for Ambient Intelligence.
                        </h3>
                    </div>

                    {/* The Problem */}
                    <div className="prose prose-invert prose-sm">
                        <h4 className="text-light font-bold text-lg mb-2">1. The Latency of Command</h4>
                        <p className="text-slate-300 font-light leading-relaxed">
                            Traditional smart homes suffer from cognitive friction. The requirement to speak a command ("Hey Google") or navigate an app introduces a latency of intent. Vylera eliminates this by acting on context, not instruction.
                        </p>
                    </div>

                    {/* The Solution */}
                    <div className="prose prose-invert prose-sm">
                        <h4 className="text-light font-bold text-lg mb-2">2. The Vylera Stack</h4>
                        <ul className="list-none space-y-2 p-0 text-slate-300 font-light">
                            <li className="flex items-start gap-2">
                                <span className="text-cyan font-mono text-xs mt-1">01</span>
                                <span><strong className="text-slate-200">Ingestion:</strong> Multi-protocol bridge (MQTT, Zigbee, Matter) unifying disparate hardware.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan font-mono text-xs mt-1">02</span>
                                <span><strong className="text-slate-200">Perception:</strong> Real-time gait analysis & facial sentiment extraction via Vertex AI.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan font-mono text-xs mt-1">03</span>
                                <span><strong className="text-slate-200">Action:</strong> Predictive state changes. The home acts before you ask.</span>
                            </li>
                        </ul>
                    </div>

                    {/* The Privacy Paradigm */}
                    <div>
                        <h4 className="text-light font-bold text-lg mb-2 flex items-center gap-2">
                            3. The Sanctuary Protocol
                            <Lock className="w-4 h-4 text-cyan" />
                        </h4>
                        <p className="text-slate-300 font-light leading-relaxed text-sm">
                            We operate on a "Vector-Only" basis. Visual data is converted to mathematical abstractions (tensors) locally. No raw images ever leave the premises or touch the cloud.
                        </p>
                    </div>

                    {/* Download Button (Triggers Modal) */}
                    <div className="pt-4">
                        <button
                            onClick={() => setIsAbstractOpen(true)}
                            className="group flex items-center gap-3 px-6 py-3 border border-slate/30 text-slate text-sm font-mono hover:border-cyan hover:text-cyan transition-colors bg-transparent relative overflow-hidden"
                        >
                            {/* Soft Glow Background on Hover */}
                            <div className="absolute inset-0 bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <Download className="w-4 h-4 relative z-10" />
                            <span className="relative z-10">DOWNLOAD_FULL_PAPER_V1.PDF</span>
                            <span className="text-xs text-slate-400 group-hover:text-cyan/40 ml-2 relative z-10">(Technical Abstract)</span>
                        </button>
                    </div>

                </div>

                {/* Right: Visual Schema (Live Logs) */}
                <div className="relative mt-8 lg:mt-0">
                    <div className="absolute -inset-1 bg-cyan/20 blur opacity-20" />
                    <div className="relative bg-[#050f1e] rounded border border-white/10 p-1 font-mono text-xs shadow-2xl">

                        {/* Terminal Header */}
                        <div className="bg-[#0a192f] border-b border-white/5 p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="text-slate-400 flex items-center gap-2">
                                <Terminal className="w-3 h-3" />
                                vylera-kernel-v1.log
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-6 h-[400px] overflow-hidden relative">
                            <motion.div
                                initial={{ y: 0 }}
                                animate={{ y: "-50%" }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="space-y-3"
                            >
                                {[...logs, ...logs, ...logs].map((log, i) => (
                                    <div key={i} className="flex gap-3 text-slate/70 font-light">
                                        <span className="text-slate-400 select-none w-6 text-right">{(i + 1).toString().padStart(2, '0')}</span>
                                        <span className={
                                            log.includes("INGEST") ? "text-blue-400" :
                                                log.includes("VECTORIZE") ? "text-purple-400" :
                                                    log.includes("SENTIMENT") ? "text-red-400" :
                                                        log.includes("QUERY") ? "text-yellow-400" :
                                                            log.includes("INFERENCE") ? "text-green-400" :
                                                                log.includes("SANCTUARY") ? "text-cyan" :
                                                                    "text-slate-400"
                                        }>
                                            {log}
                                        </span>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Gradient Fade Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050f1e] to-transparent pointer-events-none" />
                        </div>
                    </div>

                    {/* Decorative Tag */}
                    <div className="absolute -right-4 top-1/2 -rotate-90 text-[10px] text-slate/20 font-mono tracking-widest origin-center">
                        SYSTEM_TELEMETRY_LIVE
                    </div>
                </div>

            </div>

            {/* Technical Abstract Modal */}
            <TechnicalAbstractModal isOpen={isAbstractOpen} onClose={() => setIsAbstractOpen(false)} />
        </section>
    );
}

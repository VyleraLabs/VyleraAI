"use client";

import { motion } from "framer-motion";

const milestones = [
    {
        quarter: "Q1 2026",
        title: "The Ingestion Layer",
        description: "Vylera AI & Sanctuary Protocol. Local vectorization of 15+ hardware standards (Zigbee, Matter, Tuya) into a unified privacy-first local stream.",
        status: "Completed",
    },
    {
        quarter: "Q2 2026",
        title: "Sentiment-Aware Alpha",
        description: "Deployment of Vertex AI feedback loops. System begins quantizing vocal tone and facial micro-expressions to determine automation success rates.",
        status: "In Progress",
    },
    {
        quarter: "Q4 2026",
        title: "Behavioral Synthesis",
        description: "Gait analysis integration. Vylera learns to distinguish occupants by footsteps and movement patterns, enabling intent-based proactive entry.",
        status: "Upcoming",
    },
    {
        quarter: "Q2 2027",
        title: "Vylera 1.0",
        description: "Full hardware agnosticism and Ambient OS API launch. Opening the neural core for third-party context-aware plugin development.",
        status: "Upcoming",
    },
];

export default function Roadmap() {
    return (
        <section id="research" className="bg-[#0a192f] py-32 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
            {/* Background Blueprint Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(136,146,176,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(136,146,176,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />

            <div className="max-w-4xl mx-auto relative">
                <div className="text-center mb-16">
                    <h2 className="text-cyan font-mono text-sm tracking-widest uppercase mb-4">Development Timeline</h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-light tracking-tight">The Road to Sentience</h3>
                </div>

                {/* Vertical Center Line */}
                <div className="absolute left-8 md:left-1/2 top-40 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan/50 to-transparent" />

                <div className="space-y-16">
                    {milestones.map((milestone, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                            className={`flex flex-col md:flex-row items-start gap-8 relative ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Timeline Node (Center) */}
                            <div className="absolute left-8 md:left-1/2 -translate-x-[5px] w-2.5 h-2.5 rounded-full bg-[#0a192f] border border-cyan flex items-center justify-center z-10 shadow-[0_0_10px_rgba(100,255,218,0.5)]">
                                <div className="w-1 h-1 rounded-full bg-cyan animate-pulse" />
                            </div>

                            {/* Content Space (Right or Left) */}
                            <div className="pl-20 md:pl-0 md:w-1/2 md:px-12">
                                <div className={`flex flex-col ${index % 2 === 0 ? "md:items-start md:text-left" : "md:items-end md:text-right"}`}>
                                    <span className="text-cyan font-mono text-xs mb-2 tracking-wider flex items-center gap-2">
                                        {milestone.quarter}
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase border ${milestone.status === "Completed" ? "border-green-500/30 text-green-400 bg-green-500/10" :
                                            milestone.status === "In Progress" ? "border-cyan/30 text-cyan bg-cyan/10" :
                                                "border-slate-500/30 text-slate-500 bg-slate-500/10"
                                            }`}>
                                            {milestone.status}
                                        </span>
                                    </span>
                                    <h4 className="text-light text-xl font-bold mb-3">{milestone.title}</h4>
                                    <p className="text-slate-300 text-sm font-light leading-relaxed max-w-sm">
                                        {milestone.description}
                                    </p>
                                </div>
                            </div>

                            {/* Empty Space for alignment on alternate sides */}
                            <div className="hidden md:block md:w-1/2" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

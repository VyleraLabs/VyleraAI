"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Thermometer, Lightbulb, Lock, LockOpen, Zap, Terminal, Fan } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Pipeline() {
    const t = useTranslations('Pipeline');
    const [activeId, setActiveId] = useState<string | null>(null);
    const [phase, setPhase] = useState<"idle" | "ingress" | "processing" | "egress">("idle");

    const DEMOS = [
        {
            id: "camera",
            label: t('cameraLabel'),
            icon: Camera,
            outputLabel: t('cameraOutput'),
            outputIcon: LockOpen,
            log: t('cameraLog'),
            description: t('cameraDesc'),
            y: 100,
        },
        {
            id: "thermo",
            label: t('thermoLabel'),
            icon: Thermometer,
            outputLabel: t('thermoOutput'),
            outputIcon: Fan,
            log: t('thermoLog'),
            description: t('thermoDesc'),
            y: 200,
        },
        {
            id: "switch",
            label: t('switchLabel'),
            icon: Lightbulb,
            outputLabel: t('switchOutput'),
            outputIcon: Lightbulb,
            log: t('switchLog'),
            description: t('switchDesc'),
            y: 300,
        },
    ];

    // Auto-play sequence when a node is activated
    useEffect(() => {
        if (!activeId) return;

        setPhase("ingress");

        // Sequence Timings
        const t1 = setTimeout(() => setPhase("processing"), 1000); // 1s travel time
        const t2 = setTimeout(() => setPhase("egress"), 1500);    // 0.5s processing punch
        const t3 = setTimeout(() => {
            // Loop if still active
            setPhase("idle");
        }, 2500); // 1s egress

        // Simple loop mechanism
        const loop = setInterval(() => {
            setPhase("ingress");
            setTimeout(() => setPhase("processing"), 1000);
            setTimeout(() => setPhase("egress"), 1500);
        }, 3000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearInterval(loop);
        };
    }, [activeId]);

    const activeDemo = DEMOS.find(d => d.id === activeId) || DEMOS[0];

    return (
        <section className="bg-[#0a192f] border-y border-slate-800 py-24 px-6 md:px-12 overflow-hidden relative">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-12">
                    <h2 className="text-cyan font-mono text-sm tracking-widest uppercase mb-4">{t('title')}</h2>
                    <p className="text-slate text-lg font-light max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t.raw('subtitle') }} />
                </div>

                <div className="relative aspect-[1.5/1] md:aspect-[2.5/1] w-full bg-[#050f1e] rounded-xl border border-white/5 shadow-2xl overflow-hidden">

                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(100,255,218,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,255,218,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50 pointer-events-none" />

                    {/* SVG Canvas */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400">
                        <defs>
                            <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="8" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                            <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#1e293b" />
                                <stop offset="100%" stopColor="#1e293b" />
                            </linearGradient>
                        </defs>

                        {/* Connection Paths (Always visible, subtle) */}
                        {DEMOS.map((demo) => (
                            <path
                                key={demo.id}
                                d={`M100 ${demo.y} C 250 ${demo.y}, 250 200, 400 200`}
                                fill="none"
                                stroke={activeId === demo.id ? "rgba(100,255,218,0.2)" : "rgba(148,163,184,0.1)"}
                                strokeWidth="2"
                                strokeDasharray="4 4"
                            />
                        ))}
                        {/* Egress Path */}
                        <path
                            d="M400 200 L700 200"
                            fill="none"
                            stroke={activeId ? "rgba(100,255,218,0.2)" : "rgba(148,163,184,0.1)"}
                            strokeWidth="2"
                            strokeDasharray="4 4"
                        />

                        {/* Neural Core (Center: 400, 200) */}
                        <g transform="translate(400, 200)">
                            {/* Spinning Rings */}
                            <motion.circle
                                r="80" fill="none" stroke="#64ffda" strokeWidth="1" strokeDasharray="5 15" opacity="0.2"
                                animate={{ rotate: 360, scale: phase === "processing" ? 1.1 : 1 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.circle
                                r="60" fill="none" stroke="#64ffda" strokeWidth="1" strokeDasharray="10 10" opacity="0.4"
                                animate={{ rotate: -360, scale: phase === "processing" ? 1.1 : 1 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Central Processor */}
                            <motion.circle
                                r="30" fill="#0f2942" stroke="#64ffda" strokeWidth="2"
                                animate={{
                                    scale: phase === "processing" ? [1, 1.2, 1] : 1,
                                    strokeOpacity: phase === "processing" ? 1 : 0.5,
                                    fill: phase === "processing" ? "#1e3a5f" : "#0f2942"
                                }}
                                transition={{ duration: 0.5 }}
                            />
                        </g>

                        {/* PACKET ANIMATIONS */}
                        <AnimatePresence>
                            {/* Ingress Packet (Grey -> "Dumb Data") */}
                            {activeId && phase === "ingress" && (
                                <motion.circle
                                    r="4"
                                    fill="#94a3b8" // Slate-400
                                    style={{
                                        offsetDistance: "0%",
                                        offsetPath: `path("M100 ${DEMOS.find(d => d.id === activeId)?.y} C 250 ${DEMOS.find(d => d.id === activeId)?.y}, 250 200, 400 200")`
                                    } as any}
                                    animate={{ offsetDistance: "100%" }}
                                    transition={{ duration: 1, ease: "linear" }}
                                />
                            )}

                            {/* Egress Packet (Cyan -> "Sentient Logic") */}
                            {activeId && phase === "egress" && (
                                <motion.circle
                                    r="6"
                                    fill="#64ffda"
                                    filter="url(#glow-cyan)"
                                    style={{
                                        offsetDistance: "0%",
                                        offsetPath: `path("M400 200 L700 200")`
                                    } as any}
                                    animate={{ offsetDistance: "100%" }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            )}
                        </AnimatePresence>

                    </svg>

                    {/* OVERLAY INTERFACE */}

                    {/* Left: Interactive Hardware Inputs */}
                    <div className="absolute left-[5%] top-0 bottom-0 flex flex-col justify-between py-[calc(100px-2rem)] z-10">
                        {DEMOS.map((demo) => {
                            const isActive = activeId === demo.id;
                            return (
                                <button
                                    key={demo.id}
                                    onClick={() => setActiveId(demo.id)}
                                    className={`group relative flex items-center gap-4 transition-all duration-300 ${isActive ? "translate-x-4" : "hover:translate-x-2"}`}
                                >
                                    <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all duration-300 bg-[#0a192f] shadow-lg
                        ${isActive
                                            ? "border-cyan text-cyan scale-110 shadow-[0_0_20px_rgba(100,255,218,0.2)]"
                                            : "border-slate-800 text-slate-500 group-hover:border-slate-600 group-hover:text-slate-300"
                                        }
                     `}>
                                        <demo.icon className="w-8 h-8" />

                                        {/* Pulse Ring on Send */}
                                        {isActive && phase === "ingress" && (
                                            <motion.div
                                                className="absolute inset-0 rounded-xl border border-cyan"
                                                initial={{ scale: 1, opacity: 1 }}
                                                animate={{ scale: 1.5, opacity: 0 }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                            />
                                        )}
                                    </div>

                                    <div className={`text-left transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-50 group-hover:opacity-80"}`}>
                                        <div className="text-xs font-mono uppercase tracking-widest mb-1 text-slate-400">{demo.label}</div>
                                        <div className="text-[10px] text-slate-600 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 inline-block">
                                            {demo.description}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right: Sentience Output */}
                    <div className="absolute right-[5%] top-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                        <AnimatePresence mode="wait">
                            {activeId && phase === "egress" ? (
                                <motion.div
                                    key="active-output"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center gap-4"
                                >
                                    <div className="w-20 h-20 rounded-full border-2 border-cyan bg-cyan/10 flex items-center justify-center shadow-[0_0_30px_rgba(100,255,218,0.3)]">
                                        {(() => {
                                            const Icon = activeDemo.outputIcon;
                                            return <Icon className="w-10 h-10 text-cyan" />;
                                        })()}
                                    </div>
                                    <div className="text-center bg-[#0a192f] border border-cyan/30 p-4 rounded-lg shadow-xl backdrop-blur-md">
                                        <div className="text-cyan font-bold text-sm mb-1">{activeDemo.outputLabel}</div>
                                        <div className="text-xs font-mono text-slate-400">{t('actionExecuted')}</div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="idle-output"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.3 }}
                                    className="w-20 h-20 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center p-4"
                                >
                                    <span className="text-[10px] text-center text-slate-600 font-mono">{t('awaitingLogic')}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Center: Live Logic Log */}
                    {activeId && (
                        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 pointer-events-none">
                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="bg-black/60 backdrop-blur border border-cyan/20 px-4 py-2 rounded text-[10px] font-mono text-cyan shadow-lg"
                            >
                                <div className="flex items-center gap-2 mb-1 opacity-50 border-b border-cyan/10 pb-1">
                                    <Terminal className="w-3 h-3" />
                                    {t('kernelLog')}
                                </div>
                                {phase === "ingress" && t('ingesting')}
                                {phase === "processing" && t('vectorizing')}
                                {phase === "egress" && activeDemo.log}
                            </motion.div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}

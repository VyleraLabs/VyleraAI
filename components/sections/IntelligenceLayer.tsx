"use client";

import { motion } from "framer-motion";
import { Cpu, ShieldAlert, Brain, Zap, Radio, CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const IntelligenceMascotCanvas = dynamic(() => import("../3d/IntelligenceMascotCanvas"), { ssr: false });


export default function IntelligenceLayer() {
    const t = useTranslations('IntelligenceLayer');
    const [mascotState, setMascotState] = useState<"emerald" | "cyan" | "amber">("emerald");

    return (
        <section className="bg-navy py-24 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
            {/* Scanline Effect */}
            <motion.div
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan/30 to-transparent z-0 pointer-events-none"
            />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* 1. Header */}
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-cyan font-mono text-sm tracking-widest uppercase">
                        {t('headerSubtitle')}
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-light tracking-tight">
                        {t('headerTitle1')}<span className="text-slate">{t('headerTitle2')}</span>
                    </h3>
                    <p className="text-slate text-lg font-light max-w-2xl mx-auto pt-4" dangerouslySetInnerHTML={{ __html: t.raw('headerDesc') }} />
                </div>

                {/* 2. Visual Specification: Neural Pipeline */}
                <div className="mb-24 relative">
                    <div className="absolute inset-0 border-y border-white/5 opacity-50" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 py-12 relative">

                        {/* Node 1: Meti (The Vylera Guardian) */}
                        <motion.div
                            className="relative z-10 w-full md:w-auto flex flex-col items-center group"
                            onHoverStart={() => setMascotState("amber")}
                            onHoverEnd={() => setMascotState("emerald")}
                        >
                            {/* Speech Bubble */}
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: mascotState === "amber" ? 1 : 0, y: mascotState === "amber" ? 0 : 10, scale: mascotState === "amber" ? 1 : 0.9 }}
                                className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 bg-white text-navy p-4 rounded-xl rounded-bl-none shadow-xl z-20 pointer-events-none"
                            >
                                <p className="text-xs font-bold leading-relaxed">
                                    {t('mascotBubble')}
                                </p>
                            </motion.div>

                            {/* Mascot Container with Aura */}
                            <div className={`relative w-32 h-32 rounded-full border-2 flex items-center justify-center transition-colors duration-500 bg-[#0f172a] overflow-visible
                                ${mascotState === "emerald" ? "border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]" : ""}
                                ${mascotState === "cyan" ? "border-cyan shadow-[0_0_30px_rgba(100,255,218,0.2)]" : ""}
                                ${mascotState === "amber" ? "border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.3)]" : ""}
                            `}>
                                {/* Aura Ring Animation */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className={`absolute -inset-2 rounded-full border border-dashed opacity-50
                                        ${mascotState === "emerald" ? "border-emerald-500" : ""}
                                        ${mascotState === "cyan" ? "border-cyan" : ""}
                                        ${mascotState === "amber" ? "border-amber-500" : ""}
                                    `}
                                />

                                {/* 3D METI MASCOT */}
                                <div className="absolute inset-0 rounded-full overflow-hidden">
                                    <IntelligenceMascotCanvas />
                                </div>
                            </div>

                            <div className="mt-4 text-center">
                                <div className={`font-mono text-xs uppercase tracking-wider mb-1 font-bold transition-colors
                                    ${mascotState === "emerald" ? "text-emerald-400" : ""}
                                    ${mascotState === "cyan" ? "text-cyan" : ""}
                                    ${mascotState === "amber" ? "text-amber-400" : ""}
                                `}>
                                    {mascotState === "amber" ? t('mascotModeSocial') : t('mascotModeSystem')}
                                </div>
                                <div className="text-slate-400 text-sm">{t('mascotLabel')}</div>
                            </div>
                        </motion.div>

                        {/* Connector Line 1 */}
                        <div className="hidden md:flex flex-1 h-[1px] bg-slate/10 relative overflow-hidden">
                            <motion.div
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/50 to-transparent"
                            />
                        </div>
                        <ArrowRight className="md:hidden text-slate/20 w-6 h-6 rotate-90 md:rotate-0 my-4" />


                        {/* Node 2: The Processor (Vylera Core) */}
                        <div className="flex flex-col items-center gap-4 relative z-10 w-full md:w-auto" onMouseEnter={() => setMascotState("cyan")}>
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                {/* Spinning Rings */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full border border-cyan/30 border-t-transparent"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-2 rounded-full border border-cyan/20 border-b-transparent"
                                />
                                {/* Pulsing Orb */}
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-6 rounded-full bg-cyan/10 blur-sm border border-cyan/50"
                                />
                                <Brain className="w-10 h-10 text-cyan relative z-10" />
                            </div>

                            <div className="text-center">
                                <div className="text-cyan font-mono text-xs uppercase tracking-wider mb-1">{t('processorTitle')}</div>
                                <div className="h-6 overflow-hidden relative w-48 bg-black/20 rounded border border-white/5">
                                    <motion.div
                                        animate={{ y: ["0%", "-50%"] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                        className="text-[10px] font-mono text-cyan/70 space-y-1 p-1 text-left"
                                    >
                                        <div>{t('processorLog1')}</div>
                                        <div>{t('processorLog2')}</div>
                                        <div>{t('processorLog3')}</div>
                                        <div>{t('processorLog4')}</div>
                                        <div>{t('processorLog1')}</div>
                                        <div>{t('processorLog2')}</div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>


                        {/* Connector Line 2 */}
                        <div className="hidden md:flex flex-1 h-[1px] bg-slate/10 relative overflow-hidden">
                            <motion.div
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/50 to-transparent"
                            />
                        </div>
                        <ArrowRight className="md:hidden text-slate/20 w-6 h-6 rotate-90 md:rotate-0 my-4" />


                        {/* Node 3: The Outcome */}
                        <div className="flex flex-col items-center gap-4 relative z-10 w-full md:w-auto">
                            <div className="w-16 h-16 rounded-lg bg-cyan/10 border border-cyan flex items-center justify-center shadow-[0_0_20px_rgba(100,255,218,0.2)]">
                                <Zap className="w-8 h-8 text-cyan" />
                            </div>
                            <div className="text-center">
                                <div className="text-cyan font-mono text-xs uppercase tracking-wider mb-1">{t('outcomeTitle')}</div>
                                <div className="text-light text-sm">{t('outcomeDesc')}</div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* 3. Cognitive Scenarios Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {/* Level 0: Legacy */}
                    <div className="bg-[#112240] p-8 rounded-xl border border-white/5 opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-start gap-4 mb-4">
                            <ShieldAlert className="w-6 h-6 text-slate" />
                            <h4 className="text-slate font-bold text-lg">{t('scenario0Title')}</h4>
                        </div>
                        <div className="font-mono text-xs bg-black/30 p-4 rounded text-slate-400 mb-4 border border-white/5">
                            {t('scenario0Log1')}<br />
                            {t('scenario0Log2')}<br />
                            {t('scenario0Log3')}
                        </div>
                        <p className="text-slate-300 text-sm font-light">
                            {t('scenario0Desc')}
                        </p>
                    </div>

                    {/* Level 1: Contextual */}
                    <div className="bg-[#0f2942] p-8 rounded-xl border border-cyan/30 shadow-[0_0_30px_rgba(100,255,218,0.05)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 bg-cyan/10 border-b border-l border-cyan/20 rounded-bl-lg">
                            <span className="text-[10px] font-mono text-cyan uppercase tracking-widest">{t('scenario1Badge')}</span>
                        </div>
                        <div className="flex items-start gap-4 mb-4">
                            <Brain className="w-6 h-6 text-cyan" />
                            <h4 className="text-light font-bold text-lg">{t('scenario1Title')}</h4>
                        </div>
                        <div className="font-mono text-xs bg-black/30 p-4 rounded text-cyan/80 mb-4 border border-cyan/10">
                            {t('scenario1Log1')}<br />
                            {t('scenario1Log2')}<br />
                            {t('scenario1Log3')}<br />
                            {t('scenario1Log4')}
                        </div>
                        <p className="text-slate-300 text-sm font-light">
                            {t('scenario1Desc')}
                        </p>
                    </div>
                </div>

                {/* 4. Feedback Loop Footer */}
                <div className="border border-slate/10 bg-[#112240]/50 rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="p-3 bg-cyan/10 rounded-full">
                        <CheckCircle2 className="w-6 h-6 text-cyan" />
                    </div>
                    <div className="flex-1">
                        <h5 className="text-light font-semibold mb-2">{t('feedbackTitle')}</h5>
                        <p className="text-slate-300 text-sm font-light leading-relaxed">
                            {t('feedbackDesc')}
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}

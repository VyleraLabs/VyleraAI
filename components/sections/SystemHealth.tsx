"use client";

import { motion } from "framer-motion";
import { Server, Zap, Globe, Database, Cpu, BrainCircuit } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function SystemHealth() {
    const t = useTranslations('SystemHealth');
    return (
        <section className="bg-[#020617] py-24 px-6 md:px-12 border-t border-emerald-500/20 relative overflow-hidden">
            {/* Cyber-Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-emerald-500 font-mono text-sm tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
                        <Zap className="w-4 h-4" /> {t('subtitle')}
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
                        {t('title')}
                    </h3>
                </div>

                <div className="relative">
                    {/* SVG Layer for Connections */}
                    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 h-40 pointer-events-none hidden lg:block">
                        <svg className="w-full h-full">
                            {/* Path: Edge -> Transport */}
                            <motion.path
                                d="M200,80 L500,80"
                                stroke="rgba(16,185,129,0.2)"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="5 5"
                            />
                            {/* Particle: Edge -> Transport */}
                            <motion.circle r="3" fill="#10b981">
                                <animateMotion
                                    path="M200,80 L500,80"
                                    dur="2s"
                                    repeatCount="indefinite"
                                    keyPoints="0;1"
                                    keyTimes="0;1"
                                />
                            </motion.circle>

                            {/* Path: Transport -> Brain */}
                            <motion.path
                                d="M600,80 L900,80"
                                stroke="rgba(16,185,129,0.2)"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="5 5"
                            />
                            {/* Particle: Transport -> Brain */}
                            <motion.circle r="3" fill="#10b981">
                                <animateMotion
                                    path="M600,80 L900,80"
                                    dur="2s"
                                    repeatCount="indefinite"
                                    begin="0.5s"
                                    keyPoints="0;1"
                                    keyTimes="0;1"
                                />
                            </motion.circle>
                        </svg>
                    </div>

                    {/* Nodes Container */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

                        {/* NODE A: THE EDGE */}
                        <motion.div
                            className="relative p-8 bg-[#0a1525]/80 border border-emerald-500/30 rounded-xl backdrop-blur-sm"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="absolute inset-0 bg-emerald-500/5 rounded-xl animate-pulse" />
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                    <Server className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h4 className="text-white font-bold text-lg mb-2">{t('node1Title')}</h4>
                                <div className="text-emerald-500/60 font-mono text-xs uppercase mb-4">{t('node1Badge')}</div>
                                <p className="text-slate-400 text-sm">
                                    {t('node1Desc')}
                                </p>
                            </div>
                        </motion.div>

                        {/* NODE B: THE TRANSPORT */}
                        <motion.div
                            className="relative p-8 bg-[#0a1525]/80 border border-emerald-500/30 rounded-xl backdrop-blur-sm"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full bg-[#020617] border-2 border-dashed border-emerald-500/50 flex items-center justify-center mb-6 relative">
                                    <Database className="w-8 h-8 text-emerald-400" />
                                    <motion.div
                                        className="absolute inset-0 rounded-full border border-emerald-500/30 border-t-transparent"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>
                                <h4 className="text-white font-bold text-lg mb-2">{t('node2Title')}</h4>
                                <div className="text-emerald-500/60 font-mono text-xs uppercase mb-4">{t('node2Badge')}</div>
                                <p className="text-slate-400 text-sm">
                                    {t('node2Desc')}
                                </p>
                            </div>
                        </motion.div>

                        {/* NODE C: THE BRAIN */}
                        <motion.div
                            className="relative p-8 bg-[#0a1525]/80 border border-emerald-500/30 rounded-xl backdrop-blur-sm group cursor-help"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.5)] relative">
                                    <BrainCircuit className="w-8 h-8 text-emerald-400" />
                                    <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                                </div>
                                <h4 className="text-white font-bold text-lg mb-2">{t('node3Title')}</h4>
                                <div className="text-emerald-500/60 font-mono text-xs uppercase mb-4">{t('node3Badge')}</div>
                                <p className="text-slate-400 text-sm">
                                    {t('node3Desc')}
                                </p>
                                <div className="mt-2 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">{t('node3Loc')}</div>

                                {/* Hover Tooltip */}
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 bg-emerald-900/90 border border-emerald-500/50 text-emerald-100 text-xs text-center p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl backdrop-blur-md">
                                    {t('node3Tooltip')}
                                    <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-900/90 border-b border-r border-emerald-500/50 rotate-45"></div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* Logic Text */}
                <div className="mt-20 max-w-3xl mx-auto text-center border-t border-emerald-500/10 pt-10">
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed italic" dangerouslySetInnerHTML={{ __html: t.raw('footerQuote') }} />
                </div>
            </div>
        </section>
    );
}

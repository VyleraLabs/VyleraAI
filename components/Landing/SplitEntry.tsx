"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SplitEntry() {
    const t = useTranslations('SplitEntry');
    const [hoveredSector, setHoveredSector] = useState<"enterprise" | "residential" | null>(null);

    return (
        <section className="relative w-full h-screen bg-[#03070C] flex flex-col items-center justify-center overflow-hidden z-20 pb-12 pt-24">

            {/* Ambient Base Void - Pure Opacity Transitions (GPU Accelerated & Glitch Free) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,rgba(3,7,12,1)_50%)] transition-opacity duration-1000 ease-in-out" style={{ opacity: hoveredSector === null ? 1 : 0 }} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,211,238,0.1)_0%,rgba(3,7,12,1)_60%)] transition-opacity duration-1000 ease-in-out" style={{ opacity: hoveredSector === "enterprise" ? 1 : 0 }} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(52,211,153,0.1)_0%,rgba(3,7,12,1)_60%)] transition-opacity duration-1000 ease-in-out" style={{ opacity: hoveredSector === "residential" ? 1 : 0 }} />
            </div>

            {/* Typography Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative z-30 text-center mb-16 px-6"
            >
                <h2 className="text-sm tracking-[0.4em] uppercase font-mono text-slate-500 mb-4 opacity-80">
                    {t('title')}
                </h2>
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-500/30 to-transparent mx-auto" />
            </motion.div>

            {/* The Monoliths */}
            <div
                className="relative z-30 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full max-w-[90vw] md:max-w-7xl h-[60vh] md:h-[65vh] px-4"
                onMouseLeave={() => setHoveredSector(null)}
            >
                {/* Enterprise Monolith */}
                <motion.div
                    onMouseEnter={() => setHoveredSector("enterprise")}
                    onClick={() => setHoveredSector("enterprise")}
                    animate={{
                        flex: hoveredSector === "residential" ? 1 : hoveredSector === "enterprise" ? 4 : 2,
                        opacity: hoveredSector === "residential" ? 0.4 : 1,
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full rounded-2xl md:rounded-3xl border border-white/5 bg-[#03070C] backdrop-blur-md overflow-hidden cursor-pointer group shadow-2xl"
                >
                    {/* Background Video */}
                    <div className="absolute inset-0 z-0 bg-black">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            poster="/assets/enterprise_poster.webp"
                            className="w-full h-full object-cover opacity-20 group-hover:opacity-60 transition-opacity duration-1000 will-change-[opacity]"
                        >
                            <source src="/assets/enterpriseplaceholder.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#03070C] via-[#03070C]/60 to-transparent" />
                        <div className="absolute inset-0 bg-cyan-900/10 mix-blend-overlay" />
                    </div>

                    {/* Content */}
                    <motion.div
                        className="relative z-10 w-full h-full flex flex-col justify-end p-8 md:p-12 lg:p-16"
                        animate={{ x: hoveredSector === "enterprise" ? 0 : 0 }}
                    >
                        <span className="text-cyan-400 font-mono tracking-[0.2em] text-[10px] uppercase mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                            {t('sector01')}
                        </span>
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-4 whitespace-nowrap">
                            {t('enterpriseTitle')}
                        </h3>

                        <AnimatePresence>
                            {(hoveredSector === "enterprise" || hoveredSector === null) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-slate-400 font-light text-sm md:text-base leading-relaxed max-w-md mb-8">
                                        {t('enterpriseDesc')}
                                    </p>
                                    <Link href="/enterprise" className="inline-flex items-center gap-3 px-6 py-3 border border-cyan-500/30 text-cyan-400 text-xs tracking-widest uppercase font-bold hover:bg-cyan-500/10 transition-colors rounded-sm group/btn w-max">
                                        {t('enterpriseBtn')}
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Edge Highlight */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </motion.div>

                {/* Residential Monolith */}
                <motion.div
                    onMouseEnter={() => setHoveredSector("residential")}
                    onClick={() => setHoveredSector("residential")}
                    animate={{
                        flex: hoveredSector === "enterprise" ? 1 : hoveredSector === "residential" ? 4 : 2,
                        opacity: hoveredSector === "enterprise" ? 0.4 : 1,
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full rounded-2xl md:rounded-3xl border border-white/5 bg-[#03070C] backdrop-blur-md overflow-hidden cursor-pointer group shadow-2xl"
                >
                    {/* Background Video */}
                    <div className="absolute inset-0 z-0 bg-black">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            poster="/assets/residential_poster.webp"
                            className="w-full h-full object-cover opacity-20 group-hover:opacity-60 transition-opacity duration-1000 will-change-[opacity]"
                        >
                            <source src="/assets/residentialplaceholder.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#03070C] via-[#03070C]/60 to-transparent" />
                        <div className="absolute inset-0 bg-emerald-900/10 mix-blend-overlay" />
                    </div>

                    {/* Content */}
                    <motion.div
                        className="relative z-10 w-full h-full flex flex-col justify-end p-8 md:p-12 lg:p-16"
                        animate={{ x: hoveredSector === "residential" ? 0 : 0 }}
                    >
                        <span className="text-emerald-400 font-mono tracking-[0.2em] text-[10px] uppercase mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                            {t('sector02')}
                        </span>
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-4 whitespace-nowrap">
                            {t('residentialTitle')}
                        </h3>

                        <AnimatePresence>
                            {(hoveredSector === "residential" || hoveredSector === null) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-slate-400 font-light text-sm md:text-base leading-relaxed max-w-md mb-8">
                                        {t('residentialDesc')}
                                    </p>
                                    <Link href="/tech" className="inline-flex items-center gap-3 px-6 py-3 border border-emerald-500/30 text-emerald-400 text-xs tracking-widest uppercase font-bold hover:bg-emerald-500/10 transition-colors rounded-sm group/btn w-max">
                                        {t('residentialBtn')}
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Edge Highlight */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Technology() {
    const t = useTranslations('Technology');
    return (
        <section id="technology" className="min-h-screen bg-navy flex items-center justify-center px-6 md:px-12 py-24 border-t border-white/5">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left: Text Content */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-cyan font-mono text-sm tracking-widest uppercase mb-4">
                            {t('archTitle')}
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-light mb-6 tracking-tight" dangerouslySetInnerHTML={{ __html: t.raw('title') }} />
                        <p className="text-slate-300 text-lg font-light leading-relaxed max-w-md">
                            {t('desc1')}
                        </p>
                        <p className="text-slate-300 text-lg font-light leading-relaxed max-w-md mt-4">
                            {t('desc2')}
                        </p>
                    </motion.div>

                    <div className="flex gap-4 pt-4">
                        <div className="px-4 py-2 border border-slate/20 rounded text-xs text-slate-400 font-mono uppercase tracking-wider">
                            {t('stat1')}
                        </div>
                        <div className="px-4 py-2 border border-slate/20 rounded text-xs text-slate-400 font-mono uppercase tracking-wider">
                            {t('stat2')}
                        </div>
                    </div>
                </div>

                {/* Right: Schematic Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative h-[400px] w-full bg-[#0a192f] rounded-xl border border-slate/10 overflow-hidden flex items-center justify-center"
                >
                    {/* Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(136,146,176,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(136,146,176,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

                    {/* Label: CLOUD (Outside) */}
                    <div className="absolute top-4 right-4 text-[10px] font-mono text-slate/30 uppercase tracking-widest">
                        {t('cloudLayer')}
                    </div>
                    {/* Label: PREMISE (Inside) */}
                    <div className="absolute bottom-4 left-4 text-[10px] font-mono text-cyan/30 uppercase tracking-widest">
                        {t('premiseLayer')}
                    </div>


                    {/* The Firewall Barrier */}
                    <div className="absolute inset-0 m-auto w-[320px] h-[320px] rounded-full border-2 border-dashed border-slate/20 pointer-events-none" />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 m-auto w-[320px] h-[320px] rounded-full border-t border-cyan/30"
                    />

                    {/* Home Node */}
                    <div className="relative w-40 h-40 rounded-full bg-[#112240] border border-cyan/20 z-10 flex items-center justify-center shadow-[0_0_30px_rgba(10,25,47,0.8)]">
                        <div className="absolute inset-0 bg-cyan/5 rounded-full animate-pulse" />
                        <span className="text-cyan font-mono text-xs tracking-widest">{t('core')}</span>

                        {/* Data Particles (Trapped Inside) */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-cyan rounded-full"
                                animate={{
                                    x: [0, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60, 0],
                                    y: [0, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60, 0],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>

                    {/* Blocked Particles (Hitting Firewall) */}
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={`blocked-${i}`}
                            className="absolute w-1 h-1 bg-red-400 rounded-full"
                            initial={{ opacity: 0, x: 0, y: 0 }}
                            animate={{
                                opacity: [0, 1, 0],
                                x: [0, Math.cos(i) * 140], // Move towards firewall radius (~160px) but stop short or hit
                                y: [0, Math.sin(i) * 140],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: i * 1,
                                ease: "easeOut",
                            }}
                        />
                    ))}

                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function AboutNarrative() {
    const t = useTranslations('AboutNarrative');
    return (
        <section className="relative w-full pt-40 pb-20 px-6 md:px-12 bg-[#0a1525] overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none opacity-50" />

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">

                {/* Google for Startups Badge/Mention */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-12 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                >
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span className="text-xs tracking-[0.15em] text-slate-300 uppercase font-medium">{t('badge')}</span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight mb-8 leading-tight"
                    dangerouslySetInnerHTML={{ __html: t.raw('title') }}
                />

                {/* Core Narrative */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-slate-400 text-sm md:text-base leading-relaxed max-w-3xl mb-16 font-light"
                >
                    {t('desc')}
                </motion.p>

                {/* Two Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

                    {/* Enterprise Pillar */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-[#050B14]/50 border border-white/5 p-8 rounded-xl text-left relative group overflow-hidden"
                    >
                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <span className="text-cyan-400 font-mono tracking-[0.2em] uppercase text-[10px] mb-4 block">{t('sec1Badge')}</span>
                        <h3 className="text-2xl font-serif text-white mb-4">{t('sec1Title')}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed font-light">
                            {t('sec1Desc')}
                        </p>
                    </motion.div>

                    {/* Residential Pillar */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-[#050B14]/50 border border-white/5 p-8 rounded-xl text-left relative group overflow-hidden"
                    >
                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <span className="text-emerald-400 font-mono tracking-[0.2em] uppercase text-[10px] mb-4 block">{t('sec2Badge')}</span>
                        <h3 className="text-2xl font-serif text-white mb-4">{t('sec2Title')}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed font-light">
                            {t('sec2Desc')}
                        </p>
                    </motion.div>

                </div>

                {/* Download Company Profile */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-24 flex flex-col items-center"
                >
                    <h3 className="text-xl md:text-2xl font-serif text-white mb-8 tracking-tight">{t('downloadTitle')}</h3>
                    <a
                        href="/assets/COMPROWEB%20Vylera%20Labs%20Indonesia%20-%20AI%20Enterprise%20Solutions%20-%202026.pdf"
                        download="Vylera_Labs_Company_Profile_2026.pdf"
                        className="relative group px-8 py-3.5 bg-white/5 border border-amber-500/30 text-amber-500 text-xs tracking-[0.2em] uppercase font-bold overflow-hidden rounded-sm hover:border-amber-400/80 transition-all duration-500 flex items-center gap-3"
                    >
                        <span className="relative z-10 group-hover:text-amber-300 transition-colors">{t('downloadButton')}</span>
                        <svg className="w-4 h-4 relative z-10 group-hover:text-amber-300 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>

                        {/* Embedded Gold Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                        <motion.div
                            className="absolute inset-0 rounded-sm pointer-events-none"
                            animate={{ boxShadow: ["0 0 0px rgba(245,158,11,0)", "0 0 15px rgba(245,158,11,0.3)", "0 0 0px rgba(245,158,11,0)"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

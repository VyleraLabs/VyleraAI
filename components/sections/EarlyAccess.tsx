"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EarlyAccess() {
    const t = useTranslations('EarlyAccess');
    return (
        <section className="bg-navy py-24 px-6 md:px-12 border-t border-white/5 relative z-20">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="relative p-10 md:p-14 bg-gradient-to-br from-[#112240] to-[#0a1525] border border-cyan/20 rounded-2xl shadow-[0_0_50px_rgba(100,255,218,0.05)] overflow-hidden group">

                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 blur-[80px] rounded-full pointer-events-none" />

                        <div className="relative z-10 text-center space-y-6">
                            <h2 className="text-cyan font-mono text-sm tracking-widest uppercase">
                                {t('subtitle')}
                            </h2>

                            <h3 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
                                {t('title')}
                            </h3>

                            <p className="text-slate-300 text-lg font-light leading-relaxed max-w-xl mx-auto">
                                {t('desc')}
                            </p>

                            <div className="pt-8">
                                <a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.dispatchEvent(new CustomEvent("vylera-open-beta"));
                                    }}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-cyan text-navy font-bold tracking-widest uppercase rounded hover:bg-cyan/90 transition-all shadow-[0_0_20px_rgba(100,255,218,0.3)] hover:shadow-[0_0_30px_rgba(100,255,218,0.5)] group/btn cursor-pointer"
                                >
                                    <span>{t('cta')}</span>
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Decorative Borders */}
                        <div className="absolute inset-0 border border-cyan/0 group-hover:border-cyan/10 transition-colors duration-500 rounded-2xl pointer-events-none" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

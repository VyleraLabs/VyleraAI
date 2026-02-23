"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProblemSolution() {
    const t = useTranslations('ProblemSolution');
    return (
        <section id="mission" className="bg-navy py-24 px-6 md:px-12 border-t border-white/5 relative z-20">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-400 mb-12">
                        {t('title')}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                    {/* The Problem */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#112240] p-8 rounded-xl border border-red-500/20 relative overflow-hidden group hover:border-red-500/40 transition-colors h-full"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[50px] rounded-full pointer-events-none" />

                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-6 h-6 text-red-400" />
                            <h3 className="text-light font-serif text-2xl">{t('problemTitle')}</h3>
                        </div>

                        <p className="text-lg text-gray-300 leading-relaxed font-light">
                            {t('problemDesc')}
                        </p>
                    </motion.div>

                    {/* The Solution */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-[#112240] p-8 rounded-xl border border-emerald-500/20 relative overflow-hidden group hover:border-emerald-500/40 transition-colors h-full"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] rounded-full pointer-events-none" />

                        <div className="flex items-center gap-3 mb-4">
                            <Zap className="w-6 h-6 text-emerald-400" />
                            <h3 className="text-light font-serif text-2xl">{t('solutionTitle')}</h3>
                        </div>

                        <p className="text-lg text-gray-300 leading-relaxed font-light">
                            {t('solutionDesc')}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

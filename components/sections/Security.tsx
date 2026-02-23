"use client";

import { motion } from "framer-motion";
import { Shield, Lock, EyeOff, Server, Activity, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Security() {
    const t = useTranslations('Security');
    return (
        <section className="bg-[#050f1e] py-24 px-6 md:px-12 relative border-t border-white/5 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Security Narrative */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-cyan font-mono text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                {t('subtitle')}
                            </h2>
                            <h3 className="text-3xl md:text-5xl font-bold text-light tracking-tight" dangerouslySetInnerHTML={{ __html: t.raw('title') }} />
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="mt-1 p-2 bg-[#112240] rounded border border-white/5 h-fit">
                                    <Activity className="w-5 h-5 text-cyan" />
                                </div>
                                <div>
                                    <h4 className="text-light font-bold text-lg">{t('feature1Title')}</h4>
                                    <p className="text-slate-300 font-light text-sm leading-relaxed mt-2">
                                        {t('feature1Desc')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1 p-2 bg-[#112240] rounded border border-white/5 h-fit">
                                    <Lock className="w-5 h-5 text-cyan" />
                                </div>
                                <div>
                                    <h4 className="text-light font-bold text-lg">{t('feature2Title')}</h4>
                                    <p className="text-slate-300 font-light text-sm leading-relaxed mt-2">
                                        {t('feature2Desc')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1 p-2 bg-[#112240] rounded border border-white/5 h-fit">
                                    <EyeOff className="w-5 h-5 text-cyan" />
                                </div>
                                <div>
                                    <h4 className="text-light font-bold text-lg">{t('feature3Title')}</h4>
                                    <p className="text-slate-300 font-light text-sm leading-relaxed mt-2">
                                        {t('feature3Desc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Security Health Widget */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-cyan/5 blur-xl rounded-full" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative bg-[#0a192f] border border-cyan/30 rounded-xl p-8 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-cyan animate-pulse shadow-[0_0_10px_#64ffda]" />
                                    <span className="text-light font-mono text-sm tracking-widest">{t('widgetHeader')}</span>
                                </div>
                                <Lock className="w-5 h-5 text-cyan/50" />
                            </div>

                            <div className="space-y-4 font-mono text-xs">
                                <div className="flex items-center justify-between p-4 bg-[#112240] rounded border border-white/5">
                                    <span className="text-slate-400">{t('widgetRow1Name')}</span>
                                    <span className="text-cyan flex items-center gap-2">
                                        <CheckCircle2 className="w-3 h-3" /> {t('widgetRow1Status')}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-[#112240] rounded border border-white/5">
                                    <span className="text-slate-400">{t('widgetRow2Name')}</span>
                                    <span className="text-cyan flex items-center gap-2">
                                        <CheckCircle2 className="w-3 h-3" /> {t('widgetRow2Status')}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-[#112240] rounded border border-white/5">
                                    <span className="text-slate-400">{t('widgetRow3Name')}</span>
                                    <span className="text-cyan flex items-center gap-2">
                                        <CheckCircle2 className="w-3 h-3" /> {t('widgetRow3Status')}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-[#112240] rounded border border-white/5">
                                    <span className="text-slate-400">{t('widgetRow4Name')}</span>
                                    <span className="text-cyan flex items-center gap-2">
                                        <CheckCircle2 className="w-3 h-3" /> {t('widgetRow4Status')}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <div className="inline-flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest border border-white/5 px-3 py-1 rounded-full">
                                    <Server className="w-3 h-3" />
                                    {t('widgetFooter')}
                                </div>
                            </div>

                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}

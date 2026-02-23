"use client";

import { motion } from "framer-motion";
import { TrendingUp, Globe, Server, CheckCircle2, ArrowRight, Lock } from "lucide-react";
import { useTranslations } from "next-intl";

export default function InvestorRelations() {
    const t = useTranslations('InvestorRelations');
    return (
        <section className="bg-navy py-24 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

            <div className="max-w-7xl mx-auto">

                {/* Header: INDONESIA BERDAIA */}
                <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs tracking-widest uppercase mb-4">
                            <Globe className="w-4 h-4" />
                            {t('badge')}
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight mb-6" dangerouslySetInnerHTML={{ __html: t.raw('title') }} />
                        {/* Brand Story Tooltip */}
                        <div className="absolute top-0 -right-6 lg:left-['350px'] group/tooltip hidden lg:block">
                            <div className="w-4 h-4 rounded-full border border-emerald-500/50 text-emerald-500 text-[10px] flex items-center justify-center cursor-help">?</div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-navy border border-emerald-500/30 rounded-xl shadow-2xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
                                <div className="text-xs text-slate-300 leading-relaxed">
                                    <strong className="text-emerald-400 block mb-1">{t('tooltipTitle')}</strong>
                                    {t('tooltipDesc')}
                                </div>
                            </div>
                        </div>

                        <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 mt-12" dangerouslySetInnerHTML={{ __html: t.raw('desc') }} />
                    </div>
                </div>


                {/* Financial Glass Table (Unit Economics) */}
                <div className="mb-20">
                    <h3 className="text-emerald-500 font-mono text-center text-xs tracking-widest uppercase mb-8">
                        {t('tableTitle')}
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="w-full max-w-4xl mx-auto border-contain border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
                            <thead className="bg-[#050c18] border-b border-white/10">
                                <tr>
                                    <th className="py-4 px-6 text-left text-slate-500 font-mono text-xs uppercase tracking-wider">{t('th1')}</th>
                                    <th className="py-4 px-6 text-left text-slate-500 font-mono text-xs uppercase tracking-wider">{t('th2')}</th>
                                    <th className="py-4 px-6 text-left text-emerald-500 font-mono text-xs uppercase tracking-wider font-bold">{t('th3')}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-[#0a1525]/80 divide-y divide-white/5">
                                <tr className="group hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6 text-white font-medium text-sm">{t('tableR1C1')}</td>
                                    <td className="py-4 px-6 text-slate-400 text-sm" dangerouslySetInnerHTML={{ __html: t.raw('tableR1C2') }} />
                                    <td className="py-4 px-6 text-emerald-400 font-bold text-sm group-hover:animate-pulse" dangerouslySetInnerHTML={{ __html: t.raw('tableR1C3') }} />
                                </tr>
                                <tr className="group hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6 text-white font-medium text-sm">{t('tableR2C1')}</td>
                                    <td className="py-4 px-6 text-slate-400 text-sm" dangerouslySetInnerHTML={{ __html: t.raw('tableR2C2') }} />
                                    <td className="py-4 px-6 text-emerald-400 font-bold text-sm group-hover:animate-pulse" dangerouslySetInnerHTML={{ __html: t.raw('tableR2C3') }} />
                                </tr>
                                <tr className="group hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6 text-white font-medium text-sm">{t('tableR3C1')}</td>
                                    <td className="py-4 px-6 text-slate-400 text-sm" dangerouslySetInnerHTML={{ __html: t.raw('tableR3C2') }} />
                                    <td className="py-4 px-6 text-emerald-400 font-bold text-sm group-hover:animate-pulse" dangerouslySetInnerHTML={{ __html: t.raw('tableR3C3') }} />
                                </tr>
                                <tr className="group hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6 text-white font-medium text-sm">{t('tableR4C1')}</td>
                                    <td className="py-4 px-6 text-slate-400 text-sm" dangerouslySetInnerHTML={{ __html: t.raw('tableR4C2') }} />
                                    <td className="py-4 px-6 text-emerald-400 font-bold text-sm group-hover:animate-pulse" dangerouslySetInnerHTML={{ __html: t.raw('tableR4C3') }} />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Investor CTA */}
                <div className="text-center bg-[#050c18] border border-emerald-500/20 rounded-2xl p-10 md:p-14 max-w-3xl mx-auto shadow-[0_0_80px_rgba(16,185,129,0.1)]">
                    <h3 className="text-white text-2xl font-serif mb-2">{t('ctaTitle')}</h3>
                    <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm" dangerouslySetInnerHTML={{ __html: t.raw('ctaDesc') }} />

                    <button className="group relative px-8 py-3 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-bold tracking-widest uppercase text-sm hover:bg-emerald-500 hover:text-navy transition-all duration-300">
                        <span className="flex items-center gap-2">
                            {t('ctaButton')}
                            <ArrowRight className="w-4 h-4" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                    </button>

                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                        <Lock className="w-3 h-3" />
                        <span>{t('secureText')}</span>
                    </div>
                </div>

            </div>
        </section>
    );
}

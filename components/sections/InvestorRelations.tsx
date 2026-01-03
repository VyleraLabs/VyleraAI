"use client";

import { motion } from "framer-motion";
import { TrendingUp, Globe, Server, CheckCircle2, ArrowRight, Lock } from "lucide-react";

export default function InvestorRelations() {
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
                            Indonesia Emas 2045
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight mb-6">
                            Building Indonesia's <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 relative inline-block">
                                Sovereign AI Infrastructure.
                                {/* Brand Story Tooltip */}
                                <div className="absolute top-0 -right-6 group/tooltip">
                                    <div className="w-4 h-4 rounded-full border border-emerald-500/50 text-emerald-500 text-[10px] flex items-center justify-center cursor-help">?</div>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-navy border border-emerald-500/30 rounded-xl shadow-2xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
                                        <div className="text-xs text-slate-300 leading-relaxed">
                                            <strong className="text-emerald-400 block mb-1">Why Meti?</strong>
                                            A nod to the 'Merah Putih' (Red & White) flag, symbolizing our commitment to the Indonesia BerdAIa 2045 vision.
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </h2>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                            Vylera Labs is a flagship "Indonesia BerdAIa" initiative, designed to provide the Agentic AI layer for 60M+ Indonesian households. By utilizing the <strong>Jakarta Cloud Region (asia-southeast2)</strong>, we ensure 100% Data Sovereignty and compliance with the 2026 National AI Roadmap.
                        </p>
                    </div>
                </div>

                {/* 3-Column Differentiator */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {/* Card 1 */}
                    <div className="p-8 bg-[#0a1525] border border-emerald-500/20 rounded-xl relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50" />
                        <Server className="w-8 h-8 text-emerald-400 mb-6" />
                        <h3 className="text-white font-bold text-lg mb-3">Vylera AI OEM (v1.0)</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            A localized telemetry hub that keeps your data in Jakarta. Dedicated hardware residency for enterprise compliance.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="p-8 bg-[#0a1525] border border-emerald-500/20 rounded-xl relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50" />
                        <TrendingUp className="w-8 h-8 text-emerald-400 mb-6" />
                        <h3 className="text-white font-bold text-lg mb-3">Wholesale Margins</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            By bundling with Google Workspace & YouTube Premium, we secure wholesale rates that guarantee &gt;65% SaaS margins.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="p-8 bg-[#0a1525] border border-emerald-500/20 rounded-xl relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50" />
                        <Lock className="w-8 h-8 text-emerald-400 mb-6" />
                        <h3 className="text-white font-bold text-lg mb-3">The Google AI-First Advantage</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Being part of the Google Startup program gives us direct access to Gemini 3 Deep Reasoning pipelines before the mass market.
                        </p>
                    </div>
                </div>

                {/* Financial Glass Table (Unit Economics) */}
                <div className="mb-20">
                    <h3 className="text-emerald-500 font-mono text-center text-xs tracking-widest uppercase mb-8">
                        Unit Economics (2026 Projections)
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="w-full max-w-4xl mx-auto border-contain border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
                            <thead className="bg-[#050c18] border-b border-white/10">
                                <tr>
                                    <th className="py-4 px-6 text-left text-slate-500 font-mono text-xs uppercase tracking-wider">Metric</th>
                                    <th className="py-4 px-6 text-left text-slate-500 font-mono text-xs uppercase tracking-wider">Industry Avg</th>
                                    <th className="py-4 px-6 text-left text-emerald-500 font-mono text-xs uppercase tracking-wider font-bold">Vylera Model</th>
                                </tr>
                            </thead>
                            <tbody className="bg-[#0a1525]/80 divide-y divide-white/5">
                                <tr className="group hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6 text-white font-medium text-sm">Gross Margin</td>
                                    <td className="py-4 px-6 text-slate-400 text-sm">15% <span className="text-xs opacity-50 ml-1">(Hardware-only)</span></td>
                                    <td className="py-4 px-6 text-emerald-400 font-bold text-sm group-hover:animate-pulse">65% <span className="text-xs font-normal text-emerald-500/60 ml-1">(Wholesale Bundle)</span></td>
                                </tr>
                                <tr className="group hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6 text-white font-medium text-sm">GPU Burn Rate</td>
                                    <td className="py-4 px-6 text-slate-400 text-sm">$4.00 <span className="text-xs opacity-50 ml-1">/ user</span></td>
                                    <td className="py-4 px-6 text-emerald-400 font-bold text-sm">$0.50 <span className="text-xs font-normal text-emerald-500/60 ml-1">(Dedicated Lane)</span></td>
                                </tr>
                                <tr className="group hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6 text-white font-medium text-sm">CAC Payback</td>
                                    <td className="py-4 px-6 text-slate-400 text-sm">14 Months</td>
                                    <td className="py-4 px-6 text-emerald-400 font-bold text-sm">4 Months <span className="text-xs font-normal text-emerald-500/60 ml-1">(Bundled Incentives)</span></td>
                                </tr>
                                <tr className="group hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6 text-white font-medium text-sm">LTV (Lifetime Value)</td>
                                    <td className="py-4 px-6 text-slate-400 text-sm">$120</td>
                                    <td className="py-4 px-6 text-emerald-400 font-bold text-sm">$2,400 <span className="text-xs font-normal text-emerald-500/60 ml-1">(10yr Retention)</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Investor CTA */}
                <div className="text-center bg-[#050c18] border border-emerald-500/20 rounded-2xl p-10 md:p-14 max-w-3xl mx-auto shadow-[0_0_80px_rgba(16,185,129,0.1)]">
                    <h3 className="text-white text-2xl font-serif mb-2">Partner in the Future.</h3>
                    <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm">
                        Vylera Labs is currently raising a <strong>$1.5M Seed round</strong> to scale local manufacturing and Jakarta-region infrastructure.
                    </p>

                    <button className="group relative px-8 py-3 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-bold tracking-widest uppercase text-sm hover:bg-emerald-500 hover:text-navy transition-all duration-300">
                        <span className="flex items-center gap-2">
                            Access Data Room (Q3 Seed Round)
                            <ArrowRight className="w-4 h-4" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                    </button>

                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                        <Lock className="w-3 h-3" />
                        <span>Secure Access | Accredited Investors Only</span>
                    </div>
                </div>

            </div>
        </section>
    );
}

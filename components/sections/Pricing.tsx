"use client";

import { motion } from "framer-motion";
import { Check, Youtube, Box, Cpu, HardDrive, Info } from "lucide-react";
import { useState } from "react";

export default function Pricing() {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <section className="bg-navy py-24 px-6 md:px-12 border-t border-white/5 relative">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-cyan font-mono text-sm tracking-widest uppercase mb-4">
                        Membership Tiers
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
                        Choose Your Reality
                    </h3>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">

                    {/* Card 1: Standard */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="group relative p-8 md:p-10 bg-[#0a1525] border border-white/10 rounded-2xl flex flex-col hover:border-white/20 transition-colors"
                    >
                        <div className="mb-6">
                            <div className="text-slate-400 font-medium tracking-widest text-sm uppercase mb-2">Standard Path</div>
                            <div className="text-4xl font-bold text-white">$0 <span className="text-lg text-slate-500 font-normal">/ Forever</span></div>
                        </div>

                        <ul className="space-y-4 mb-10 flex-grow">
                            <li className="flex items-center gap-3 text-slate-300 text-sm">
                                <Check className="w-4 h-4 text-slate-500" />
                                <span>Vylera AI Local Ingestion</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm">
                                <Check className="w-4 h-4 text-slate-500" />
                                <span>Core Sanctuary Protocol (Local Only)</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm">
                                <Check className="w-4 h-4 text-slate-500" />
                                <span>Universal Support (Tuya / Alexa / Matter)</span>
                            </li>
                        </ul>

                        <button className="w-full py-3 border border-slate-600 text-slate-300 font-medium tracking-wide uppercase text-sm hover:border-white hover:text-white transition-colors rounded">
                            Start with Basics
                        </button>
                    </motion.div>

                    {/* Card 2: Pro (Google Bundle) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative p-8 md:p-10 bg-gradient-to-b from-[#0e1f3a] to-[#0a1525] border border-cyan/30 rounded-2xl flex flex-col shadow-[0_0_40px_rgba(100,255,218,0.05)] overflow-visible"
                    >
                        {/* Glow Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 blur-[80px] rounded-full pointer-events-none" />

                        <div className="mb-6 relative z-10">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-cyan font-bold tracking-widest text-sm uppercase">Pro Sentience</div>
                                <div className="px-2 py-1 bg-cyan/10 text-cyan text-[10px] font-bold tracking-wider rounded border border-cyan/20">
                                    GOOGLE PARTNER BUNDLE
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-white flex items-center gap-2 relative">
                                $19.90
                                <span className="text-lg text-slate-500 font-normal">/ mo</span>

                                {/* Info Tooltip Wrapper */}
                                <div className="relative group/tooltip inline-block ml-1">
                                    <Info className="w-5 h-5 text-slate-400 cursor-pointer hover:text-cyan transition-colors" />

                                    {/* Tooltip Popup */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-slate-900 border border-cyan/30 rounded-lg shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
                                        <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-b border-r border-cyan/30 rotate-45"></div>
                                        <div className="space-y-2 text-xs">
                                            <div className="flex justify-between text-slate-400">
                                                <span>Retail Value:</span>
                                                <span className="line-through">$32.90/mo</span>
                                            </div>
                                            <div className="flex justify-between text-emerald-400 font-bold">
                                                <span>Vylera Partner Discount:</span>
                                                <span>-$13.00</span>
                                            </div>
                                            <div className="pt-2 border-t border-white/10 text-slate-300 italic leading-relaxed">
                                                "You save 40% by bundling your Sanctuary OS with Google Cloud."
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ul className="space-y-5 mb-10 flex-grow relative z-10">
                            <li className="flex items-start gap-3 text-white text-sm">
                                <div className="mt-1"><Cpu className="w-4 h-4 text-cyan" /></div>
                                <span><strong>Advanced Sentiment Analysis</strong> via Vertex AI</span>
                            </li>
                            <li className="flex items-start gap-3 text-white text-sm">
                                <div className="mt-1"><Youtube className="w-4 h-4 text-red-500" /></div>
                                <span><strong>YouTube Premium Included</strong> (Ad-free Ambient Audio)</span>
                            </li>
                            <li className="flex items-start gap-3 text-white text-sm">
                                <div className="mt-1"><HardDrive className="w-4 h-4 text-blue-400" /></div>
                                <span><strong>2TB Google One Storage</strong> + Gemini Advanced AI</span>
                            </li>
                            <li className="flex items-start gap-3 text-white text-sm">
                                <div className="mt-1"><Box className="w-4 h-4 text-yellow-400" /></div>
                                <span>Vylera OEM 'Elite' Hardware Discounts (20% Off)</span>
                            </li>
                        </ul>

                        <div className="text-[10px] text-slate-500 mb-4 italic text-center">
                            *Price reflects Google Cloud Partner wholesale rates for 2026.
                        </div>

                        <button className="relative z-10 w-full py-4 bg-cyan text-navy font-bold tracking-[0.15em] hover:bg-cyan/90 transition-all uppercase rounded shadow-[0_0_20px_rgba(100,255,218,0.4)] group overflow-hidden">
                            <span className="relative z-20">AWAKEN YOUR HOME</span>
                            {/* Shimmer */}
                            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-[shimmer_1s_infinite]" />
                        </button>
                    </motion.div>

                </div>

                {/* Compatibility Bar */}
                <div className="mt-20 pt-12 border-t border-white/5 text-center">
                    <div className="max-w-4xl mx-auto mb-10 space-y-6">
                        <h3 className="text-2xl font-serif text-white">
                            Stop the "App Hell". One Brain for Everything.
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Your home shouldn't feel like a fragmented mess of ten different apps for ten different brands.
                            Vylera acts as the <strong>Universal Bridge</strong>, unifying your Tuya bulbs, Zigbee sensors, and Google devices into one seamless, sovereign interface.
                        </p>

                        {/* TRANSFORMATION GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">

                            {/* Scenario 1: Security */}
                            <div className="bg-white/5 border border-white/10 rounded-lg p-6 relative overflow-hidden group hover:border-cyan/30 transition-colors">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/5 blur-[50px] rounded-full pointer-events-none" />
                                <h4 className="text-cyan font-bold text-xs tracking-wide uppercase mb-3 flex items-center gap-2">
                                    <Cpu className="w-4 h-4" /> Security Uplift
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                                        <div className="w-2 h-2 rounded-full bg-slate-600" />
                                        <span>Generic $30 Door Cam</span>
                                    </div>
                                    <div className="pl-4 border-l border-cyan/20">
                                        <p className="text-slate-300 text-sm">
                                            Vylera injects <strong>Enterprise Facial Recognition</strong>. It doesn't just record; it differentiates between 'Delivery Driver' and 'Stranger', alerting you only when it matters.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Scenario 2: Ambiance */}
                            <div className="bg-white/5 border border-white/10 rounded-lg p-6 relative overflow-hidden group hover:border-purple-400/30 transition-colors">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] rounded-full pointer-events-none" />
                                <h4 className="text-purple-400 font-bold text-xs tracking-wide uppercase mb-3 flex items-center gap-2">
                                    <Box className="w-4 h-4" /> Ambiance Sync
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                                        <div className="w-2 h-2 rounded-full bg-slate-600" />
                                        <span>Standard $10 Tuya RGB Bulb</span>
                                    </div>
                                    <div className="pl-4 border-l border-purple-400/20">
                                        <p className="text-slate-300 text-sm">
                                            Becomes a <strong>Circadian Health Device</strong>. Vylera syncs color temp with local sunrise/set data and your sleep health metrics, automating 'Golden Hour' drift.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Scenario 3: Climate */}
                            <div className="bg-white/5 border border-white/10 rounded-lg p-6 relative overflow-hidden group hover:border-orange-400/30 transition-colors">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[50px] rounded-full pointer-events-none" />
                                <h4 className="text-orange-400 font-bold text-xs tracking-wide uppercase mb-3 flex items-center gap-2">
                                    <HardDrive className="w-4 h-4" /> Climate Predictive
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                                        <div className="w-2 h-2 rounded-full bg-slate-600" />
                                        <span>Legacy Zigbee Thermostat</span>
                                    </div>
                                    <div className="pl-4 border-l border-orange-400/20">
                                        <p className="text-slate-300 text-sm">
                                            Evolves into a <strong>Predictive Climate Engine</strong>. Pre-cools your home based on your ETA from Maps and real-time weather alerts, saving 30% energy effortlessly.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Scenario 4: Privacy */}
                            <div className="bg-white/5 border border-white/10 rounded-lg p-6 relative overflow-hidden group hover:border-emerald-400/30 transition-colors">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] rounded-full pointer-events-none" />
                                <h4 className="text-emerald-400 font-bold text-xs tracking-wide uppercase mb-3 flex items-center gap-2">
                                    <Check className="w-4 h-4" /> Sovereign Shield
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                                        <div className="w-2 h-2 rounded-full bg-slate-600" />
                                        <span>Cloud-Dependent Smart Plug</span>
                                    </div>
                                    <div className="pl-4 border-l border-emerald-400/20">
                                        <p className="text-slate-300 text-sm">
                                            Cut the cord. Vylera intercepts raw signals locally. The Vylera AI <strong>Vectorizes</strong> your data before it touches the cloud, ensuring only abstract mathematical representations reach Vertex AI—never your raw private moments.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">

                        {/* Matter */}
                        <div className="h-8 w-auto text-white flex items-center justify-center" title="Matter">
                            <svg viewBox="0 0 460 460" className="h-8 w-auto fill-current">
                                <path d="M230 0l200 115v230L230 460 30 345V115L230 0z" fill="none" /> {/* Hexagon Outline optional */}
                                <path d="M230 43L63 139v192l167 96 167-96V139L230 43zm0 327L96 293V177l134-77 134 77v116L230 370z" fill="white" /> {/* Basic Hex shape representation for Matter */}
                                <path d="M230 180l-70 40v80l70 40 70-40v-80l-70-40z" fill="currentColor" />
                            </svg>
                            <span className="ml-2 font-bold tracking-widest text-lg hidden md:block">matter</span>
                        </div>

                        {/* Zigbee */}
                        <div className="h-8 w-auto text-red-500 flex items-center justify-center" title="Zigbee">
                            <svg viewBox="0 0 100 100" className="h-8 w-auto fill-current">
                                <path d="M20 20h60v10H35l45 40v10H20V70h45L20 30V20z" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="5" />
                            </svg>
                        </div>

                        {/* Google Home */}
                        <div className="h-8 w-auto flex items-center justify-center gap-2" title="Google Home">
                            <svg viewBox="0 0 24 24" className="h-8 w-8">
                                <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
                                <path d="M12 4.5L6 10.5V19h4v-5h4v5h4v-8.5L12 4.5z" fill="currentColor" className="text-slate-200" />
                                {/* Google Colors Accent */}
                                <circle cx="12" cy="12" r="2" className="fill-blue-500" />
                            </svg>
                            <span className="font-bold text-slate-300 tracking-tight hidden md:block">Google Home</span>
                        </div>

                        {/* Tuya */}
                        <div className="h-7 w-auto flex items-center justify-center" title="Tuya">
                            <svg viewBox="0 0 100 30" className="h-7 w-auto fill-current text-white">
                                <path d="M10 5h5v20h-5V5zM30 5h5v15h10V5h5v20H30V5zM60 5l-5 20h5l1.5-6h7l1.5 6h5l-5-20H60zm3.5 10l2-8 2 8h-4z" />
                                {/* Stylized text approximation for 'tuya' */}
                                <text x="0" y="25" fontSize="25" fontWeight="bold" fontFamily="sans-serif">tuya</text>
                            </svg>
                        </div>

                        {/* Alexa */}
                        <div className="h-8 w-auto flex items-center justify-center gap-2" title="Alexa">
                            <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current text-cyan-400">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2V9h2v8z" />
                                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
                            </svg>
                            <span className="font-bold text-slate-300 tracking-tight hidden md:block">alexa</span>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}

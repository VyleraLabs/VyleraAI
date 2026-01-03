"use client";

import { motion } from "framer-motion";
import { Shield, Lock, EyeOff, Server, Activity, CheckCircle2 } from "lucide-react";

export default function Security() {
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
                                The Sanctuary Protocol
                            </h2>
                            <h3 className="text-3xl md:text-5xl font-bold text-light tracking-tight">
                                Privacy by Design. <br />
                                <span className="text-slate opacity-60">Not by Policy.</span>
                            </h3>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="mt-1 p-2 bg-[#112240] rounded border border-white/5 h-fit">
                                    <Activity className="w-5 h-5 text-cyan" />
                                </div>
                                <div>
                                    <h4 className="text-light font-bold text-lg">The Vectorization Principle</h4>
                                    <p className="text-slate font-light text-sm leading-relaxed mt-2">
                                        Vylera does NOT store images or audio. Raw sensor data is converted into mathematical vectors (tensors) LOCALLY on the edge. Only these abstract vectors reach our logic core.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1 p-2 bg-[#112240] rounded border border-white/5 h-fit">
                                    <Lock className="w-5 h-5 text-cyan" />
                                </div>
                                <div>
                                    <h4 className="text-light font-bold text-lg">AES-256 Vault</h4>
                                    <p className="text-slate font-light text-sm leading-relaxed mt-2">
                                        All telemetry data is encrypted at rest using AES-256 and transmitted via TLS 1.3. Your home’s behavioral signature looks like static to the outside world.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1 p-2 bg-[#112240] rounded border border-white/5 h-fit">
                                    <EyeOff className="w-5 h-5 text-cyan" />
                                </div>
                                <div>
                                    <h4 className="text-light font-bold text-lg">Zero-Knowledge Architecture</h4>
                                    <p className="text-slate font-light text-sm leading-relaxed mt-2">
                                        We cannot see into your home. Our system only sees anonymized "Intent Triggers" (e.g., "Lights: ON"). We have no access to the raw visual or audio feed.
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
                                    <span className="text-light font-mono text-sm tracking-widest">SYSTEM_INTEGRITY</span>
                                </div>
                                <Lock className="w-5 h-5 text-cyan/50" />
                            </div>

                            <div className="space-y-4 font-mono text-xs">
                                <div className="flex items-center justify-between p-4 bg-[#112240] rounded border border-white/5">
                                    <span className="text-slate">LOCAL_ENCRYPTION</span>
                                    <span className="text-cyan flex items-center gap-2">
                                        <CheckCircle2 className="w-3 h-3" /> ACTIVE
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-[#112240] rounded border border-white/5">
                                    <span className="text-slate">VECTORIZATION_ENGINE</span>
                                    <span className="text-cyan flex items-center gap-2">
                                        <CheckCircle2 className="w-3 h-3" /> SECURE
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-[#112240] rounded border border-white/5">
                                    <span className="text-slate">CLOUD_BRIDGE (TLS 1.3)</span>
                                    <span className="text-cyan flex items-center gap-2">
                                        <CheckCircle2 className="w-3 h-3" /> ENCRYPTED
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-[#112240] rounded border border-white/5">
                                    <span className="text-slate">ANONYMIZATION_LAYER</span>
                                    <span className="text-cyan flex items-center gap-2">
                                        <CheckCircle2 className="w-3 h-3" /> VERIFIED
                                    </span>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <div className="inline-flex items-center gap-2 text-[10px] text-slate/40 uppercase tracking-widest border border-white/5 px-3 py-1 rounded-full">
                                    <Server className="w-3 h-3" />
                                    Audited by 3rd Party Security Firm
                                </div>
                            </div>

                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}

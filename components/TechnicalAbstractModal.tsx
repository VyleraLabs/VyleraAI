"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Network, Cpu, Lock } from "lucide-react";

interface TechnicalAbstractModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TechnicalAbstractModal({ isOpen, onClose }: TechnicalAbstractModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl cursor-pointer"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Heavy Ease
                        className="relative w-full max-w-2xl bg-[#0a1525] border border-cyan/20 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 bg-[#0a1525] relative">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
                            <div className="flex items-center justify-between">
                                <h2 className="font-serif text-2xl text-white tracking-tight">
                                    Vylera Architectural Abstract <span className="text-cyan font-mono text-base ml-2">v1.0</span>
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="text-slate-500 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="p-8 overflow-y-auto space-y-10 custom-scrollbar">

                            {/* Section 1: Ingestion */}
                            <div className="space-y-4">
                                <h3 className="flex items-center gap-3 text-cyan font-bold tracking-widest text-sm uppercase">
                                    <Network className="w-5 h-5" />
                                    01. Ingestion Layer
                                </h3>
                                <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                                    The Vylera AI acts as a unified event bus, ingesting high-velocity streams from disparate protocols (MQTT, Zigbee, Matter) simultaneously. This eliminates the "polling lag" found in traditional hubs, ensuring state changes are registered in &lt;5ms.
                                </p>
                            </div>

                            {/* Section 2: Perception */}
                            <div className="space-y-4">
                                <h3 className="flex items-center gap-3 text-cyan font-bold tracking-widest text-sm uppercase">
                                    <Cpu className="w-5 h-5" />
                                    02. Perception Engine
                                </h3>
                                <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                                    Our localized Vertex AI pipeline processes video feeds for gait analysis and micro-expression sentiment extraction. By unifying these vectors, Vylera infers <i>intent</i> rather than just presence, distinguishing between a user who is "relaxing" versus "working."
                                </p>
                            </div>

                            {/* Section 3: Sanctuary */}
                            <div className="space-y-4">
                                <h3 className="flex items-center gap-3 text-cyan font-bold tracking-widest text-sm uppercase">
                                    <Lock className="w-5 h-5" />
                                    03. Sanctuary Protocol
                                </h3>
                                <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                                    Privacy is architectural, not policy-based. All visual data is instantly converted into mathematical tensors (float32 vectors) on the local edge cluster. No raw image data is ever written to disk or transmitted to the cloud, rendering the system blind to optics but keen on context.
                                </p>
                            </div>

                            {/* Section 4: Hardware Specs */}
                            <div className="space-y-4 pt-6 border-t border-white/5">
                                <h3 className="flex items-center gap-3 text-cyan font-bold tracking-widest text-sm uppercase">
                                    <Cpu className="w-5 h-5" />
                                    04. The Meti Edge Reference Design
                                </h3>
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="bg-cyan/5 border border-cyan/10 p-3 rounded text-center">
                                        <div className="text-cyan font-mono text-xs mb-1">CPU Core</div>
                                        <div className="text-white font-bold text-sm">Quad-Core ARM</div>
                                    </div>
                                    <div className="bg-cyan/5 border border-cyan/10 p-3 rounded text-center">
                                        <div className="text-cyan font-mono text-xs mb-1">Memory</div>
                                        <div className="text-white font-bold text-sm">4GB LPDDR4</div>
                                    </div>
                                    <div className="bg-cyan/5 border border-cyan/10 p-3 rounded text-center">
                                        <div className="text-cyan font-mono text-xs mb-1">Neural Engine</div>
                                        <div className="text-white font-bold text-sm">4 TOPS NPU</div>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-xs italic border-l-2 border-slate-600 pl-4">
                                    "Vylera is hardware-agnostic. While we offer a proprietary Bridge, the Sanctuary Protocol can be deployed on any NPU-enabled edge gateway to ensure total Cloud Isolation."
                                </p>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/5 bg-[#050c18] flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan hover:bg-cyan/5 transition-all text-sm tracking-wide uppercase font-medium"
                            >
                                Close Abstract
                            </button>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

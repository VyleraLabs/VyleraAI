"use client";

import { motion } from "framer-motion";
import { ScanEye, Cpu, MessageSquareText, Radio, Lock, Activity, Server } from "lucide-react";

const features = [
    {
        title: "Proactive",
        description: "Anticipates needs via Privacy-First Observation. We process locally, ensuring your data never leaves the sanctuary.",
        icon: ScanEye,
    },
    {
        title: "Universal",
        description: "Hardware Agnostic (Tuya/Zigbee). We provide the Brain, connecting disparate devices into a single coherent organism.",
        icon: Cpu,
    },
    {
        title: "Native Fluency",
        description: "Standard American English core with Hyper-Regional fine-tuning (e.g., Ammani, Jaksel). Conversational, not robotic.",
        icon: MessageSquareText,
    },
];

const specs = [
    {
        label: "Ingestion",
        value: "Zigbee 3.0, Matter, MQTT, BLE Mesh",
        icon: Radio,
    },
    {
        label: "Intelligence",
        value: "Google Vertex AI, Vision API, Sentiment Vectorization",
        icon: Server,
    },
    {
        label: "Privacy",
        value: "The Sanctuary Protocol (AES-256 Local Encryption)",
        icon: Lock,
    },
    {
        label: "Latency",
        value: "Sub-100ms Proactive Triggering",
        icon: Activity,
    },
];

export default function Features() {
    return (
        <section id="platform" className="bg-navy py-24 px-6 md:px-12 relative z-10">
            <div className="max-w-7xl mx-auto space-y-32">

                {/* Main Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                                delay: index * 0.2
                            }}
                            whileHover={{
                                borderColor: "rgba(100, 255, 218, 0.5)",
                                boxShadow: "0 0 20px rgba(100, 255, 218, 0.1)"
                            }}
                            className="group bg-[#112240] p-8 rounded-xl border border-white/5 transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="mb-6">
                                <feature.icon className="w-10 h-10 text-cyan mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                                <h3 className="text-xl font-bold text-light mb-3">{feature.title}</h3>
                                <p className="text-slate leading-relaxed font-light text-sm md:text-base">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Technical Specifications Grid */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-white/10 flex-1" />
                        <h3 className="text-cyan font-mono text-sm tracking-widest uppercase">Technical Specifications</h3>
                        <div className="h-px bg-white/10 flex-1" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {specs.map((spec, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group border border-white/5 p-6 hover:bg-white/[0.02] transition-colors relative"
                            >
                                {/* Glowing Borders on Hover */}
                                <div className="absolute inset-0 border border-cyan/0 group-hover:border-cyan/30 transition-colors duration-300 pointer-events-none" />

                                <spec.icon className="w-5 h-5 text-slate/50 mb-3 group-hover:text-cyan transition-colors" />
                                <h4 className="text-slate font-bold text-sm mb-1">{spec.label}</h4>
                                <p className="text-cyan font-mono text-xs leading-relaxed opacity-80">
                                    {spec.value}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

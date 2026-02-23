"use client";

import { motion } from "framer-motion";

export default function Manifesto() {
    return (
        <section id="manifesto" className="relative bg-[#0a0a0f] text-light py-32 overflow-hidden">
            {/* Background Noise & Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#111827] to-[#0a0a0f] z-0" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="font-serif text-5xl md:text-7xl mb-6 tracking-tight text-white/90">
                        The Invisible Era:<br />
                        <span className="italic text-cyan/80">A Vylera Manifesto.</span>
                    </h2>
                    <div className="w-px h-24 bg-gradient-to-b from-cyan/0 via-cyan/50 to-cyan/0 mx-auto mt-12" />
                </motion.div>

                {/* Section 1: End of Manual Living */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-right"
                    >
                        <h3 className="font-serif text-3xl mb-4 text-white">The End of Manual Living.</h3>
                        <p className="text-slate/80 text-lg font-light leading-relaxed">
                            Why do we still 'manage' our homes? True intelligence shouldn't require an app or a voice command.
                            Vylera observes the subtle rhythms of your life—a tired gait, a frustrated sigh—and responds before you ask.
                        </p>
                    </motion.div>

                    <div className="hidden md:block w-px h-full bg-slate/10 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan shadow-[0_0_10px_#64ffda]" />
                    </div>

                    <div className="hidden md:block" /> {/* Spacer */}
                </div>


                {/* Section 2: The Intelligence Compound */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 items-center mb-24">
                    <div className="hidden md:block" /> {/* Spacer */}

                    <div className="hidden md:block w-px h-full bg-slate/10 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan shadow-[0_0_10px_#64ffda]" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="font-serif text-3xl mb-4 text-white">The Intelligence Compound.<br /><span className="text-cyan font-sans text-xl tracking-widest font-bold">1 + 1 = 3</span></h3>
                        <p className="text-slate/80 text-lg font-light leading-relaxed">
                            Vylera AI bridges the gap between generic hardware and elite intelligence. By linking a simple Tuya PIR sensor with a Door Cam and a Google-powered Thermostat, we create a <strong>'Sensory Net'</strong>.
                            The more devices you add, the more 'context' Vylera AI gains, turning fragmented gadgets into a unified, sentient ecosystem.
                        </p>
                    </motion.div>
                </div>


                {/* Section 3: The Sanctuary Protocol */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-right"
                    >
                        <h3 className="font-serif text-3xl mb-4 text-white">The Sanctuary Protocol.</h3>
                        <p className="text-slate/80 text-lg font-light leading-relaxed">
                            Ethical AI means local-first logic. Your home’s 'eyes' are for your benefit alone.
                            We process micro-expressions into anonymous vectors, ensuring your sanctuary remains yours.
                        </p>
                    </motion.div>

                    <div className="hidden md:block w-px h-full bg-slate/10 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan shadow-[0_0_10px_#64ffda]" />
                    </div>

                    <div className="hidden md:block" /> {/* Spacer */}
                </div>


                {/* Section 4: Google Cloud Nexus */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 items-center mb-32">
                    <div className="hidden md:block" /> {/* Spacer */}

                    <div className="hidden md:block w-px h-full bg-slate/10 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan shadow-[0_0_10px_#64ffda]" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="font-serif text-3xl mb-4 text-white">The Google Cloud Nexus.</h3>
                        <p className="text-slate/80 text-lg font-light leading-relaxed">
                            We leverage the world's most advanced AI infrastructure—<strong>Google Vertex AI</strong>—to give ordinary electronics a human-level understanding of comfort and safety.
                        </p>
                    </motion.div>
                </div>


                {/* Footer Signature */}
                <div className="text-center opacity-60">
                    <div className="font-serif italic text-2xl tracking-widest text-cyan">Vylera Labs Founding Team</div>
                    <div className="h-px w-32 bg-cyan/30 mx-auto mt-4" />
                </div>

            </div>
        </section>
    );
}

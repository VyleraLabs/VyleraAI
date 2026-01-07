"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const team = [
  {
    name: "Katherina Aytakin",
    role: "Founder // Lead Architect",
    image: "/team/founder.jpg",
    bio: "Former Security Analyst specializing in high-stakes penetration testing (Denuvo) and industrial Oracle architectures. Architecting the secure, sovereign neural fabric of Vylera."
  },
  {
    name: "Magna Putra",
    role: "Lead Engineer",
    image: "/team/lead-eng.jpg", // Use a logo or abstract avatar here
    bio: "Senior Systems Engineer with a background in SAP/ABAP architecture. Previously optimized mission-critical logistic networks for UNICEF. Building Vylera's reliable edge infrastructure."
  }
];

export default function TeamSection() {
    return (
        <section id="team" className="relative bg-[#0a0a0f] text-slate-300 py-32 overflow-hidden">
             {/* Background Noise & Gradient similar to Manifesto - ID added for navigation */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#111827] to-[#0a0a0f] z-0" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                     <h2 className="font-serif text-4xl md:text-5xl mb-6 tracking-tight text-white/90">
                        The Architects of <span className="italic text-cyan/80">Vylera.</span>
                    </h2>
                     <div className="w-px h-16 bg-gradient-to-b from-cyan/0 via-cyan/50 to-cyan/0 mx-auto mt-8" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 p-6 rounded-lg max-w-sm w-full hover:border-cyan/30 transition-colors duration-300"
                        >
                            <div className="relative w-full aspect-square mb-6 rounded-md overflow-hidden bg-[#000]">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                            <p className="text-cyan/80 text-sm font-medium tracking-wide mb-4 uppercase">{member.role}</p>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {member.bio}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

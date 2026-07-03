"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function TeamSection() {
    const t = useTranslations('TeamSection');

    const teams = [
        {
            region: "Vylera Indonesia",
            members: [
                {
                    name: "Katherina Aytakin",
                    role: t('roleFounder'),
                    image: "/team/founder.webp",
                    linkedin: "https://www.linkedin.com/in/katherina-aytakin",
                    bio: t('bioFounder')
                },
                {
                    name: "Magna Putra",
                    role: t('roleCTO'),
                    image: "/team/CTO.webp",
                    linkedin: "https://www.linkedin.com/in/magna-bumi-putra-33523555/",
                    bio: t('bioCTO')
                },
                {
                    name: "Kristiyan Dimitrov Mechev",
                    role: t('roleCOO'),
                    image: "/team/kmechev.webp",
                    linkedin: "https://www.linkedin.com/in/kristiyan-mechev-a51803247/",
                    bio: t('bioCOO')
                }
            ]
        },
        {
            region: "Vylera Philippines",
            members: [
                {
                    name: "Paolo Gonzales",
                    role: "CEO and Co-founder",
                    image: "/team/paolo-gonzales.jpg",
                    linkedin: "https://www.linkedin.com/in/aapagonzales/",
                    bio: "Paolo guides Vylera Philippines with a focus on disciplined market entry, partner relationships, and practical AI adoption. He runs the Philippine business and the company's marketing division at the same time, so the brand and the business decisions come from the same person. His standard: disciplined market entry, real partnerships over paper ones, and AI that works in production, not just in a demo."
                },
                {
                    name: "Paolo Garciano",
                    role: "COO and Co-founder",
                    image: "/team/paolo-garciano.jpg",
                    linkedin: "https://www.linkedin.com/in/juan-paolo-garciano-2317a7190/",
                    bio: "Paolo leads Vylera Philippines' operational execution, partner coordination, and practical AI adoption. As COO and Co-Founder, he helps translate business opportunities into structured projects, aligning technical, client-facing, and implementation teams to deliver AI-enabled solutions that improve real operational workflows."
                },
                {
                    name: "Dan Santos",
                    role: "CTO and Co-founder",
                    image: "/team/dan-santos.jpg",
                    linkedin: "https://www.linkedin.com/in/gilan-daniel-santos-549719120/",
                    bio: "Dan steers the technical direction for Vylera Philippines, bringing over a decade of expertise in architecture and DevOps. With a deep background in scaling high-growth E-Commerce and Fintech platforms, he specializes in connecting high-level product strategy with implementation realities to build resilient, production-ready systems."
                }
            ]
        }
    ];

    return (
        <section id="team" className="relative bg-[#0a0a0f] text-slate-300 pb-32 pt-10 overflow-hidden">
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
                    className="text-center mb-16"
                >
                    <h2 className="font-serif text-3xl md:text-4xl mb-4 tracking-tight text-white/90" dangerouslySetInnerHTML={{ __html: t.raw('title') }} />
                    <div className="w-px h-12 bg-gradient-to-b from-cyan/0 via-cyan/50 to-cyan/0 mx-auto mt-6" />
                </motion.div>

                <div className="space-y-20">
                    {teams.map((team, teamIndex) => (
                        <div key={team.region}>
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: teamIndex * 0.1 }}
                                className="mb-8 text-center"
                            >
                                <h3 className="font-serif text-2xl md:text-3xl text-white/90">{team.region}</h3>
                                <div className="w-16 h-px bg-gradient-to-r from-cyan/0 via-cyan/60 to-cyan/0 mx-auto mt-4" />
                            </motion.div>

                            <div className="flex flex-wrap justify-center gap-8">
                                {team.members.map((member, index) => (
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
                                                alt={`${member.name} - ${member.role}`}
                                                fill
                                                className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between gap-4 mb-1">
                                            <h4 className="text-xl font-bold text-white">{member.name}</h4>
                                            {member.linkedin && (
                                                <a
                                                    href={member.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-slate-400 hover:text-cyan-400 transition-colors shrink-0"
                                                    aria-label={`${member.name} LinkedIn`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                        <p className="text-cyan/80 text-sm font-medium tracking-wide mb-4 uppercase">{member.role}</p>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            {member.bio}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

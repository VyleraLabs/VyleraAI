"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function SplitEntry() {
    const enterpriseVideoRef = useRef<HTMLVideoElement>(null);
    const residentialVideoRef = useRef<HTMLVideoElement>(null);

    const playVideo = (ref: React.RefObject<HTMLVideoElement | null>) => {
        if (ref.current) {
            ref.current.play().catch(e => console.log("Playback prevented:", e));
        }
    };

    const pauseVideo = (ref: React.RefObject<HTMLVideoElement | null>) => {
        if (ref.current) {
            ref.current.pause();
        }
    };

    return (
        <div className="relative z-10 w-full h-screen overflow-hidden flex flex-col pointer-events-none">

            {/* Enterprise Section (Top Half) */}
            <section
                id="enterprise"
                className="relative h-1/2 w-full flex items-center justify-center pointer-events-auto group border-b border-white/5"
                onMouseEnter={() => playVideo(enterpriseVideoRef)}
                onMouseLeave={() => pauseVideo(enterpriseVideoRef)}
                onClick={() => playVideo(enterpriseVideoRef)}
            >
                {/* Background Setup */}
                <div className="absolute inset-0 bg-[#050B14] z-0 overflow-hidden">
                    {/* The background should only fill the photo area logically, but for glowing purposes we cover it all and layer the layout on top */}
                    <div className="w-full h-full bg-gradient-to-br from-cyan-950/30 to-black/80 group-hover:bg-cyan-900/10 transition-colors duration-700" />
                </div>

                {/* 65% Photo / 35% Text Flex Wrapper */}
                <div className="relative z-10 w-full h-full flex flex-col md:flex-row">

                    {/* Text Column - 50% Width */}
                    <div className="w-full md:w-[50%] h-full flex flex-col justify-center px-12 lg:px-20 border-r border-white/5 bg-[#050B14]/95 z-20 shadow-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            <span className="text-cyan-400 font-mono text-[10px] md:text-sm tracking-[0.3em] mb-4 block uppercase opacity-90">
                                Strategic Intelligence
                            </span>
                            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tight">
                                Enterprise
                            </h2>
                            <p className="text-slate-300 font-light leading-relaxed text-sm md:text-md mb-8">
                                Unified analytics, neural security, and profound system controls tailored for high-stakes infrastructure.
                            </p>

                            <Link href="/enterprise" className="inline-flex items-center gap-3 text-cyan-400 tracking-[0.2em] text-xs md:text-sm uppercase font-bold group/link">
                                Explore Sector
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 group-hover/link:translate-x-2 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Video Column - 50% Width */}
                    <div className="hidden md:block w-[50%] h-full relative overflow-hidden opacity-70 group-hover:opacity-100 transition-opacity duration-700 bg-black/50 z-10 order-1 md:order-2">
                        <video
                            ref={enterpriseVideoRef}
                            preload="none"
                            poster="/assets/enterprise_poster.png"
                            loop
                            muted
                            playsInline
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover transform-gpu"
                        >
                            <source src="/assets/enterpriseplaceholder.mp4" type="video/mp4" />
                        </video>

                        {/* Darken Overlay so text remains extremely readable */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700" />

                        {/* Inner Gradient for Style (Optimized for GPU natively without expensive mix-blend modes) */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/40 to-transparent pointer-events-none" />
                    </div>
                </div>
            </section>

            {/* Residential Section (Bottom Half) */}
            <section
                id="residential"
                className="relative h-1/2 w-full flex items-center justify-center pointer-events-auto group"
                onMouseEnter={() => playVideo(residentialVideoRef)}
                onMouseLeave={() => pauseVideo(residentialVideoRef)}
                onClick={() => playVideo(residentialVideoRef)}
            >
                <div className="absolute inset-0 bg-[#050B14] z-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-bl from-emerald-950/30 to-black/80 group-hover:bg-emerald-900/10 transition-colors duration-700" />
                </div>

                {/* 65% Photo / 35% Text Flex Wrapper (Reversed) */}
                <div className="relative z-10 w-full h-full flex flex-col md:flex-row">

                    {/* Video Column - 50% Width */}
                    <div className="hidden md:block w-[50%] h-full relative overflow-hidden opacity-70 group-hover:opacity-100 transition-opacity duration-700 bg-black/50 z-10 order-2 md:order-1 border-r border-white/5">
                        <video
                            ref={residentialVideoRef}
                            preload="none"
                            poster="/assets/residential_poster.png"
                            loop
                            muted
                            playsInline
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover transform-gpu"
                        >
                            <source src="/assets/residentialplaceholder.mp4" type="video/mp4" />
                        </video>

                        {/* Darken Overlay so text remains extremely readable */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700" />

                        {/* Inner Gradient for Style (Optimized for GPU natively without expensive mix-blend modes) */}
                        <div className="absolute inset-0 bg-gradient-to-tl from-emerald-900/40 to-transparent pointer-events-none" />
                    </div>

                    {/* Text Column - 50% Width */}
                    <div className="w-full md:w-[50%] h-full flex flex-col justify-center px-12 lg:px-20 bg-[#050B14]/95 shadow-2xl order-1 md:order-2 z-20">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            <span className="text-emerald-400 font-mono text-[10px] md:text-sm tracking-[0.3em] mb-4 block uppercase opacity-90">
                                Ambient Living
                            </span>
                            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tight">
                                Residential
                            </h2>
                            <p className="text-slate-300 font-light leading-relaxed text-sm md:text-md mb-8">
                                Context-aware environment orchestration designed for unparalleled personal luxury, efficiency, and ease.
                            </p>

                            <Link href="/tech" className="inline-flex items-center gap-3 text-emerald-400 tracking-[0.2em] text-xs md:text-sm uppercase font-bold group/link">
                                Explore Sector
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 group-hover/link:translate-x-2 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

        </div>
    );
}

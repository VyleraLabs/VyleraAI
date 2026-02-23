"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function EntryHero() {
    const [isHovered, setIsHovered] = useState(false);
    const t = useTranslations('Hero');

    return (
        <section
            className="relative min-h-screen flex flex-col items-start justify-end overflow-hidden bg-navy pb-12 pl-6 md:pb-24 md:pl-20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered(true)}
        >
            {/* Background Grid (Subtle) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(100,255,218,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,255,218,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none z-0" />

            {/* Hero Main Graphic - Fullscreen */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <Image
                    src="/assets/herolanding.webp"
                    alt="Vylera Neural Core"
                    fill
                    className="object-cover object-center opacity-90"
                    priority
                />
            </div>

            {/* Bottom-left text "vylera." */}
            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1
                        className="text-white font-serif text-6xl md:text-8xl xl:text-[10rem] tracking-tight leading-none flex items-baseline"
                        style={{ textShadow: "0 10px 40px rgba(0,0,0,0.8)" }}
                    >
                        {t('vylera')}
                        <span className="text-cyan-400 drop-shadow-[0_0_40px_rgba(34,211,238,0.9)] ml-1 md:ml-2">.</span>
                    </h1>
                </motion.div>
            </div>
        </section>
    );
}

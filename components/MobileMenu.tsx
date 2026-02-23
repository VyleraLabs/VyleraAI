"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
    isEntryRoute?: boolean;
}

export default function MobileMenu({ isEntryRoute = false }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Contextual references depending on global root layout position
    const links = [
        { label: "Enterprise", href: "/enterprise" },
        { label: "Residential", href: "/tech" },
        { label: "Tech", href: "/tech" },
        { label: "About Us", href: "/about" },
        { label: "Investors", href: "/investors" },
    ];

    return (
        <>
            <button
                onClick={toggleMenu}
                className="md:hidden flex items-center justify-center ml-2 lg:ml-4 text-cyan-400 p-2 hover:bg-white/5 border border-transparent hover:border-white/10 rounded-md transition-all relative z-[110]"
                aria-label="Toggle Mobile Menu"
            >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[105] bg-[#050B14]/95 flex flex-col items-center justify-center min-h-screen px-6"
                    >
                        <div className="flex flex-col items-center gap-12 w-full max-w-sm">
                            {links.map((link, idx) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * idx, duration: 0.5, ease: "easeOut" }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-4xl md:text-5xl font-serif text-slate-300 hover:text-cyan-400 transition-colors tracking-tight text-center block"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Immersive technical footer lines */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute bottom-24 w-48 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

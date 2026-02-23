"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BrandLogo from "@/components/Landing/BrandLogo";

export default function Footer() {
    return (
        <footer className="w-full bg-[#050B14] border-t border-white/5 py-12 px-6 md:px-12 relative z-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                {/* Brand & Copyright */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <Link href="/" className="h-16 w-40 flex items-center justify-start group">
                        <BrandLogo className="w-full h-full group-hover:scale-105 transition-transform duration-500 origin-left" />
                    </Link>
                    <div className="flex items-center gap-4 mt-2">
                        <a href="https://www.linkedin.com/company/vyleralabs/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                    </div>
                    <p className="text-slate-400 text-xs font-mono tracking-widest uppercase">
                        © 2026 Vylera Labs. All Rights Reserved.
                    </p>

                    <div className="mt-4">
                        <a
                            href="/assets/COMPRO%20Vylera%20Labs%20Indonesia%20-%20AI%20Enterprise%20Solutions%20-%202026.pdf"
                            download="Vylera_Labs_Company_Profile_2026.pdf"
                            aria-label="Download Vylera Labs Company Profile PDF"
                            className="relative group px-6 py-2.5 bg-white/5 border border-amber-500/30 text-amber-500 text-[10px] tracking-[0.2em] uppercase font-bold overflow-hidden rounded-sm hover:border-amber-400/80 transition-all duration-500 flex items-center justify-center gap-2 w-fit"
                        >
                            <span className="relative z-10 group-hover:text-amber-300 transition-colors">Download Profile</span>
                            <svg className="w-3.5 h-3.5 relative z-10 group-hover:text-amber-300 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>

                            {/* Embedded Gold Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                            <motion.div
                                className="absolute inset-0 rounded-sm pointer-events-none"
                                animate={{ boxShadow: ["0 0 0px rgba(245,158,11,0)", "0 0 15px rgba(245,158,11,0.3)", "0 0 0px rgba(245,158,11,0)"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex gap-6 md:gap-12">
                    <div className="flex flex-col gap-3 text-center md:text-left">
                        <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-xs mb-2">Platform</span>
                        <Link href="/enterprise" className="text-xs text-slate-400 hover:text-white transition-colors uppercase tracking-wider">Enterprise</Link>
                        <Link href="/tech" className="text-xs text-slate-400 hover:text-white transition-colors uppercase tracking-wider">Residential</Link>
                        <Link href="/tech" className="text-xs text-slate-400 hover:text-white transition-colors uppercase tracking-wider">Technology</Link>
                    </div>

                    <div className="flex flex-col gap-3 text-center md:text-left">
                        <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-xs mb-2">Company</span>
                        <Link href="/about" className="text-xs text-slate-400 hover:text-white transition-colors uppercase tracking-wider">About</Link>
                        <Link href="/investors" className="text-xs text-slate-400 hover:text-white transition-colors uppercase tracking-wider">Investors</Link>
                        <Link href="/tech#contact" className="text-xs text-slate-400 hover:text-white transition-colors uppercase tracking-wider">Contact</Link>
                    </div>

                    <div className="flex flex-col gap-3 text-center md:text-left max-w-[220px]">
                        <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-xs mb-2">Indonesian Branch</span>
                        <p className="text-xs text-slate-400 leading-relaxed tracking-wider font-light">
                            PT Vylera Labs Indonesia<br />
                            Wisma BCA BSD, HQ, Lt. 1 Suite 102<br />
                            Jl. Pahlawan Seribu No.8, Lengkong Gudang<br />
                            Kec. Serpong, Kota Tangerang Selatan<br />
                            Banten 15310, Indonesia
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

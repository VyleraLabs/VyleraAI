"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { motion } from "framer-motion";
import BrandLogo from "@/components/Landing/BrandLogo";
import { signIn } from "next-auth/react";
import MobileMenu from "@/components/MobileMenu";

export default function Navbar() {
  const t = useTranslations('Navigation');
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] h-24 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-[#050B14]/80 border-b border-white/5 shadow-2xl" : "bg-transparent border-b border-transparent"
          }`}
      >
        {/* Left: Standardized Global Logo */}
        <div className="flex items-center gap-4 h-full">
          <Link href="/" className="h-24 w-56 flex items-center justify-start group pl-2 md:pl-0" aria-label="Vylera Labs Home">
            <BrandLogo className="w-full h-full group-hover:scale-105 transition-transform duration-500 origin-left" />
          </Link>
        </div>

        {/* Navigation - Unified 5-Route System */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-8 lg:gap-14">
          <Link
            href="/enterprise"
            className="text-xs lg:text-sm font-medium tracking-[0.15em] uppercase text-slate-300 hover:text-cyan-400 transition-colors duration-300 relative group"
          >
            {t('enterprise')}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/tech"
            className="text-xs lg:text-sm font-medium tracking-[0.15em] uppercase text-slate-300 hover:text-emerald-400 transition-colors duration-300 relative group"
          >
            {t('residential')}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-400 transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/about"
            className="text-xs lg:text-sm font-medium tracking-[0.15em] uppercase text-slate-400 hover:text-white transition-colors duration-300 relative group"
          >
            {t('about')}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end">
          <LanguageSwitcher />

          <button
            onClick={() => signIn("google", { callbackUrl: "/contact" })}
            className="relative group px-6 py-2.5 bg-white/5 border border-white/10 text-white text-xs tracking-[0.2em] uppercase font-bold overflow-hidden rounded-sm hover:border-cyan-400/50 transition-all duration-500"
          >
            <span className="relative z-10 group-hover:text-cyan-300 transition-colors">{t('contact')}</span>

            {/* Embedded Glow Effect matching EntryNavbar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
            <motion.div
              className="absolute inset-0 rounded-sm pointer-events-none"
              animate={{ boxShadow: ["0 0 0px rgba(34,211,238,0)", "0 0 15px rgba(34,211,238,0.3)", "0 0 0px rgba(34,211,238,0)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </button>

          <MobileMenu />
        </div>
      </motion.nav>
    </>
  );
}

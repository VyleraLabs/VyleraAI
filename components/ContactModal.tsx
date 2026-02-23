"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Mail, Building2, Briefcase, Home } from "lucide-react";

import { useTranslations } from "next-intl";

const getDepartments = (t: any) => [
    {
        id: 'enterprise',
        name: t('deptEnterpriseName'),
        email: "solutions@vyleralabs.com",
        icon: Building2,
        desc: t('deptEnterpriseDesc')
    },
    {
        id: 'investor',
        name: t('deptInvestorName'),
        email: "founder@vyleralabs.com",
        icon: Briefcase,
        desc: t('deptInvestorDesc')
    },
    {
        id: 'residential',
        name: t('deptResidentialName'),
        email: "kmechev@vyleralabs.com",
        icon: Home,
        desc: t('deptResidentialDesc')
    }
];

export default function ContactModal() {
    const t = useTranslations('ContactModal');
    const [isOpen, setIsOpen] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener("open-contact-modal", handleOpen);
        return () => window.removeEventListener("open-contact-modal", handleOpen);
    }, []);

    const handleCopy = (email: string) => {
        navigator.clipboard.writeText(email);
        setCopiedEmail(email);
        setTimeout(() => setCopiedEmail(null), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-[200] bg-[#050B14]/80 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[210] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-[#0a1525] border border-cyan-500/20 rounded-2xl w-full max-w-2xl overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.1)] pointer-events-auto relative">
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5 z-50"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>

                            {/* Header */}
                            <div className="p-8 border-b border-white/5 relative overflow-hidden">
                                {/* Simple ambient glow */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                                <h2 className="text-3xl font-serif text-white tracking-tight mb-2 relative z-10">
                                    {t('title')}
                                </h2>
                                <p className="text-slate-400 text-sm relative z-10">
                                    {t('desc')}
                                </p>
                            </div>

                            {/* Departments */}
                            <div className="p-8 flex flex-col gap-4">
                                {getDepartments(t).map((dept) => (
                                    <div
                                        key={dept.id}
                                        className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-white/5 hover:border-cyan-500/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden"
                                    >
                                        <div className="flex items-start gap-4 mb-4 sm:mb-0">
                                            <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
                                                <dept.icon size={24} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-medium mb-1 tracking-wide">{dept.name}</h3>
                                                <p className="text-slate-400 text-xs hidden sm:block">{dept.desc}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                                            <button
                                                onClick={() => { window.location.href = `mailto:${dept.email}`; }}
                                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-mono rounded border border-cyan-500/20 transition-colors"
                                            >
                                                <Mail size={14} />
                                                {t('emailLabel')}
                                            </button>
                                            <button
                                                onClick={() => handleCopy(dept.email)}
                                                className="flex items-center justify-center p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors relative"
                                                aria-label="Copy email"
                                            >
                                                {copiedEmail === dept.email ? (
                                                    <Check size={16} className="text-emerald-400" />
                                                ) : (
                                                    <Copy size={16} />
                                                )}
                                                {copiedEmail === dept.email && (
                                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">
                                                        {t('copyLabel')}
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

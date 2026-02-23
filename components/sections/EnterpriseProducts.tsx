"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function EnterpriseProducts() {
    const t = useTranslations('EnterpriseProducts');

    const products = [
        { name: "Vylera Pulse (AI POS)", market: t('products.posMarket'), desc: t('products.posDesc') },
        { name: "Vylera Talent (AI HRIS)", market: t('products.hrMarket'), desc: t('products.hrDesc') },
        { name: "Vylera Move (AI FMS)", market: t('products.fmsMarket'), desc: t('products.fmsDesc') },
        { name: "Vylera Nexus (AI Web)", market: t('products.webMarket'), desc: t('products.webDesc') },
        { name: "Vylera Scribe (AI Note Taker)", market: t('products.noteMarket'), desc: t('products.noteDesc') },
        { name: "Vylera Authenticate (AI E-Sign)", market: t('products.esignMarket'), desc: t('products.esignDesc') },
        { name: "Vylera Sentinel (AI DLP)", market: t('products.dlpMarket'), desc: t('products.dlpDesc') },
        { name: "Vylera Core (AI DWH)", market: t('products.dwhMarket'), desc: t('products.dwhDesc') },
        { name: "Vylera Ledger (AI Finance)", market: t('products.finMarket'), desc: t('products.finDesc') },
        { name: "Vylera Relation (AI CRM)", market: t('products.crmMarket'), desc: t('products.crmDesc') },
    ];

    return (
        <section className="relative w-full min-h-screen bg-[#050B14] py-32 px-6 md:px-12 overflow-hidden z-10">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col pt-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center md:text-left"
                >
                    <span className="text-cyan-400 font-mono tracking-[0.3em] text-xs uppercase mb-4 block">{t('subtitle')}</span>
                    <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight mb-6">{t('title')}</h2>
                    <p className="text-slate-400 max-w-2xl font-light text-sm md:text-base leading-relaxed">
                        {t('desc')}
                    </p>
                </motion.div>

                {/* SaaS Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="group relative flex flex-col p-6 md:p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover Ambient Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent transition-all duration-700 pointer-events-none" />

                            {/* Accent Line */}
                            <div className="absolute top-0 left-0 w-[2px] h-0 bg-cyan-400 group-hover:h-full transition-all duration-700 ease-out" />

                            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start relative z-10">
                                {/* Index Metric */}
                                <div className="flex-shrink-0 pt-1">
                                    <span className="font-mono text-xs text-white/20 group-hover:text-cyan-400/50 transition-colors duration-300">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col w-full">
                                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-cyan-500 mb-2">
                                        {product.market}
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-serif text-white mb-4 group-hover:text-cyan-50 transition-colors duration-300">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm font-light text-slate-400 leading-relaxed max-w-lg">
                                        {product.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

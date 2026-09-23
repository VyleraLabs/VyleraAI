"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { products, whyVylera } from "@/data/products";

const accentStyles = {
  blue: {
    text: "text-blue-400",
    border: "border-blue-500/40",
    bg: "bg-blue-500",
    glow: "group-hover:from-blue-500/10"
  },
  teal: {
    text: "text-teal-400",
    border: "border-teal-500/40",
    bg: "bg-teal-500",
    glow: "group-hover:from-teal-500/10"
  },
  purple: {
    text: "text-purple-300",
    border: "border-purple-500/40",
    bg: "bg-purple-600",
    glow: "group-hover:from-purple-500/10"
  }
};

export default function ProductsOverview() {
  return (
    <section className="relative w-full min-h-screen bg-[#050B14] pt-40 pb-24 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_45%_at_50%_0%,#000_60%,transparent_100%)] opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 h-[520px] w-[900px] -translate-x-1/2 bg-blue-900/20 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-4xl"
        >
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            <span className="ml-2 text-xs font-mono tracking-[0.25em] uppercase text-slate-500">VyleraLabs PH</span>
            <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-300">Google Cloud Partner</span>
          </div>

          <span className="text-cyan-400 font-mono tracking-[0.3em] text-xs uppercase mb-4 block">Enterprise Products</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight mb-6">Our Products</h1>
          <p className="text-slate-400 text-base md:text-xl leading-relaxed font-light max-w-3xl">
            Enterprise-grade software and cloud services built for growing businesses, combining Google Cloud partnership with practical operating systems for support and governance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-28">
          {products.map((product, index) => {
            const accent = accentStyles[product.accent];
            return (
              <motion.article
                key={product.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className={`group relative min-h-[360px] overflow-hidden border ${accent.border} bg-white/[0.035] p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.055]`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent ${accent.glow} transition-all duration-700 pointer-events-none`} />
                <div className={`absolute top-0 left-0 h-1 w-full ${accent.bg}`} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start gap-5 mb-6">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${accent.bg} text-xl font-bold text-white`}>
                      {product.initial}
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-serif text-white mb-1">{product.title}</h2>
                      <p className={`${accent.text} text-sm md:text-base`}>{product.category}</p>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-6">{product.summary}</p>

                  <ul className="space-y-3 mb-8">
                    {product.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${accent.text}`} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-auto inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase text-slate-200 hover:text-cyan-300 transition-colors"
                  >
                    View Product
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="text-emerald-400 font-mono tracking-[0.3em] text-xs uppercase mb-4 block">Why VyleraLabs?</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Direct Google partner. Enterprise products. Fraction of the price.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {whyVylera.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="group border border-white/5 bg-white/[0.03] p-7 md:p-8 hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 border border-cyan-400/20 text-cyan-300 font-bold">
                  {item.initial}
                </div>
                <div>
                  <h3 className="text-xl font-serif text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border border-emerald-400/20 bg-emerald-500/10 p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="h-5 w-5 text-emerald-300" />
              <h2 className="text-2xl md:text-3xl font-serif text-white">Ready to get started?</h2>
            </div>
            <p className="text-slate-300">Contact us for a demo, pilot pricing, or white-label partnership inquiry.</p>
          </div>
          <button
            onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
            className="w-fit border border-emerald-300/40 bg-emerald-400/10 px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase text-emerald-200 hover:bg-emerald-400/20 transition-colors"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu, ShieldCheck } from "lucide-react";
import type { Product } from "@/data/products";
import ProductMark from "@/components/ProductMark";

const accentStyles = {
  blue: {
    text: "text-blue-400",
    border: "border-blue-500/40",
    bg: "bg-blue-500",
    soft: "bg-blue-500/10",
    line: "from-blue-500"
  },
  teal: {
    text: "text-teal-400",
    border: "border-teal-500/40",
    bg: "bg-teal-500",
    soft: "bg-teal-500/10",
    line: "from-teal-500"
  },
  purple: {
    text: "text-purple-300",
    border: "border-purple-500/40",
    bg: "bg-purple-600",
    soft: "bg-purple-500/10",
    line: "from-purple-500"
  }
};

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const accent = accentStyles[product.accent];

  return (
    <section className="relative w-full min-h-screen bg-[#050B14] pt-36 pb-24 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-0 h-[520px] w-[760px] bg-cyan-900/15 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <Link
          href="/products"
          className="mb-10 inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase text-slate-500 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className={`flex h-14 w-14 items-center justify-center rounded-full ${accent.bg} p-3 text-xl font-bold text-white`}>
                <ProductMark product={product} />
              </div>
              <span className={`rounded-full border ${accent.border} ${accent.soft} px-4 py-1.5 text-xs font-bold ${accent.text}`}>
                {product.category}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold text-slate-300">
                VyleraLabs PH
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight mb-5">{product.title}</h1>
            <p className={`${accent.text} text-lg md:text-2xl mb-6`}>{product.subtitle}</p>
            <p className="text-slate-400 text-base md:text-xl leading-relaxed font-light max-w-3xl">{product.summary}</p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className={`border ${accent.border} bg-white/[0.035] p-8 relative overflow-hidden`}
          >
            <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${accent.line} to-transparent`} />
            <h2 className="text-2xl font-serif text-white mb-6">Capability Snapshot</h2>
            <ul className="space-y-4">
              {product.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${accent.text}`} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            {product.pricing && (
              <div className="mt-8 border-t border-white/10 pt-6">
                <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-slate-500">Commercial Entry</span>
                <p className="mt-2 text-xl font-serif text-white">{product.pricing}</p>
              </div>
            )}
          </motion.aside>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-20">
          {product.sections.map((section, index) => (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="group border border-white/5 bg-white/[0.03] p-7 hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${accent.soft} border ${accent.border} ${accent.text} font-bold`}>
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-serif text-white mb-3">{section.title}</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">{section.description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {product.audience && (
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Cpu className="h-5 w-5 text-cyan-400" />
              <h2 className="text-3xl md:text-4xl font-serif text-white">Who it is for</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.audience.map((item) => (
                <div key={item.title} className="border border-white/5 bg-[#07111f] p-6">
                  <h3 className="text-lg font-serif text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(product.pricingDetails || product.note) && (
          <div className="mb-20 border border-amber-400/20 bg-amber-500/5 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="h-5 w-5 text-amber-300" />
              <h2 className="text-3xl font-serif text-white">Partner Advantage</h2>
            </div>
            {product.pricingDetails && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {product.pricingDetails.map((detail) => (
                  <li key={detail} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}
            {product.note && <p className="text-slate-300 leading-relaxed">{product.note}</p>}
          </div>
        )}

        <div className="border-t border-white/10 pt-10">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-slate-500">Explore More</span>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                className="group border border-white/5 bg-white/[0.03] p-5 hover:bg-white/[0.06] transition-colors"
              >
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">{item.category}</span>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <h3 className="text-lg font-serif text-white">{item.title}</h3>
                  <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

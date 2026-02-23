"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle, AlertCircle } from "lucide-react";

export default function BillingFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const questions = [
        {
            q: "What if I already have Google One or YouTube Premium?",
            a: "Vylera is an official Google Cloud Partner. Your existing plan will be upgraded to Vylera Pro, and Google will automatically issue a pro-rated credit for any remaining time on your old plan directly to your payment method."
        },
        {
            q: "Will I lose my 2TB of storage?",
            a: "No. Your storage is preserved and managed through the Vylera Sanctuary Protocol. We mount your existing Drive volume to the local Edge Gateway, ensuring zero data loss and continued access via the Vylera app or standard Google interfaces."
        },
        {
            q: "Can I use Vylera without the subscription?",
            a: "Yes. The 'Standard Path' is free forever and includes the local-only Sanctuary Protocol. The subscription is only required for advanced Cloud Sentiment analysis and the Google Partner benefits."
        }
    ];

    return (
        <div className="border-t border-white/5 pt-8 mt-8">
            <h4 className="flex items-center gap-2 text-slate-300 text-sm font-bold uppercase tracking-widest mb-4">
                <HelpCircle className="w-4 h-4 text-cyan" />
                Frequent Questions
            </h4>

            <div className="space-y-2">
                {questions.map((item, i) => (
                    <div key={i} className="border border-white/5 rounded-lg bg-[#050c18] overflow-hidden">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                        >
                            <span className="text-slate-200 text-sm font-medium pr-4">{item.q}</span>
                            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 pt-0 text-slate-400 text-sm leading-relaxed border-t border-white/5 bg-[#0a1525]">
                                        {item.a}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex items-start gap-3 p-3 bg-cyan/5 border border-cyan/10 rounded">
                <AlertCircle className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400">
                    <strong>Trust Promise:</strong> All billing cycles are handled via Stripe or Google Pay. Vylera never stores your credit card details locally or on our servers.
                </p>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ContactFormProps {
    name: string;
    email: string;
}

export default function ContactForm({ name, email }: ContactFormProps) {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    // Basic Client-Side XSS Sanitization (Stripping out obvious script/html tags)
    // Real protection will be enforced on the server-side API route.
    const sanitizeInput = (input: string) => {
        return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMsg("");

        // Sanitize before transmission
        const sanitizedSubject = sanitizeInput(subject);
        const sanitizedMessage = sanitizeInput(message);

        // Client-side regex check for sketchy payloads
        const xssRegex = /<\/?script|javascript:|on\w+=/i;
        if (xssRegex.test(subject) || xssRegex.test(message)) {
            setStatus("error");
            setErrorMsg("Invalid characters or potential script detected. Please remove them and try again.");
            return;
        }

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    subject: sanitizedSubject,
                    message: sanitizedMessage
                })
            });

            if (response.ok) {
                setStatus("success");
                setSubject("");
                setMessage("");
            } else {
                const data = await response.json();
                setStatus("error");
                setErrorMsg(data.error || "Failed to submit. Please try again later.");
            }
        } catch (error) {
            setStatus("error");
            setErrorMsg("A network error occurred.");
        }
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg mx-auto bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-8 text-center backdrop-blur-md"
            >
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">Message Transmitted.</h3>
                <p className="text-slate-400 text-sm">We have received your communications. Our engineering team will review it and reply to {email}.</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg mx-auto bg-[#0a1525]/80 backdrop-blur-xl border border-white/10 rounded-xl p-8 shadow-2xl relative overflow-hidden"
        >
            {/* Aesthetic neural lines */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            <h3 className="text-2xl font-serif text-white mb-6">Secure Comm Link</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* Pre-filled Authenticated Data */}
                <div className="flex gap-4 opacity-60 pointer-events-none">
                    <div className="flex-1 border-b border-white/10 pb-2">
                        <span className="text-[10px] uppercase tracking-widest text-cyan-500 block mb-1">Authenticated ID</span>
                        <p className="text-sm text-slate-300">{name}</p>
                    </div>
                    <div className="flex-1 border-b border-white/10 pb-2">
                        <span className="text-[10px] uppercase tracking-widest text-cyan-500 block mb-1">Verified Node</span>
                        <p className="text-sm text-slate-300">{email}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-xs uppercase tracking-widest text-slate-400">Subject</label>
                    <input
                        id="subject"
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                        placeholder="e.g. Enterprise Solution Inquiry"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs uppercase tracking-widest text-slate-400">Transmission Payload</label>
                    <textarea
                        id="message"
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                        placeholder="Enter your encrypted message..."
                    />
                </div>

                {errorMsg && (
                    <div className="bg-red-950/40 border border-red-500/30 rounded-md p-3 text-red-400 text-xs text-center">
                        {errorMsg}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="relative group w-full py-4 mt-2 bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 tracking-[0.2em] text-xs uppercase font-bold rounded-sm overflow-hidden hover:bg-cyan-900/40 hover:border-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="relative z-10">{status === "submitting" ? "Encrypting & Sending..." : "Transmit"}</span>
                    {status !== "submitting" && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                    )}
                </button>
            </form>
        </motion.div>
    );
}

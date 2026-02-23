"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Loader2, Ghost, Sparkles, BrainCircuit } from "lucide-react";
import BillingFAQ from "@/components/BillingFAQ";

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Step = "auth" | "persona" | "success";
type Persona = "invisible" | "attentive";

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
    const [email, setEmail] = useState("");
    const [step, setStep] = useState<Step>("auth");
    const [status, setStatus] = useState<"idle" | "syncing" | "network_check">("idle");
    const [googleDetected, setGoogleDetected] = useState(false);
    const [selectedPersona, setSelectedPersona] = useState<Persona>("invisible");

    // Phase 1: Auth Handlers
    const handleGoogleSignIn = () => {
        setStatus("syncing");
        setTimeout(() => {
            setGoogleDetected(true);
            setStatus("idle");
        }, 2000);
    };

    const handleAuthSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("network_check");

        // Transition to Persona Step instead of Success
        setTimeout(() => {
            setStatus("idle");
            setStep("persona");
        }, 1500);
    };

    // Phase 2: Persona Handlers
    const handlePersonaSubmit = () => {
        setStatus("network_check");
        setTimeout(() => {
            setStep("success");
            setStatus("idle");
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-2xl cursor-pointer"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-lg bg-[#0a1525] border border-cyan/30 rounded-2xl p-8 md:p-10 shadow-[0_0_60px_rgba(100,255,218,0.15)] overflow-hidden my-12"
                    >
                        {/* Connecting Line Animation (Top) */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />

                        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors z-20">
                            <X className="w-5 h-5" />
                        </button>

                        <div className="relative z-10">

                            {/* STEP 3: SUCCESS */}
                            {step === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-10"
                                >
                                    <div className="w-20 h-20 bg-cyan/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                                        <CheckCircle2 className="w-10 h-10 text-cyan" />
                                        <div className="absolute inset-0 border border-cyan/40 rounded-full animate-ping opacity-20" />
                                    </div>
                                    <h3 className="font-serif text-3xl text-white mb-2">Connectivity Established.</h3>
                                    <p className="text-slate-400 mb-8">
                                        Persona: <span className="text-cyan font-bold uppercase">{selectedPersona}</span><br />
                                        Your sanctuary is being prepared.
                                    </p>

                                    {googleDetected && (
                                        <div className="mb-8 p-4 border border-green-500/20 bg-green-500/5 rounded text-sm text-green-200">
                                            ✓ Google One & YouTube benefits successfully bridged.
                                        </div>
                                    )}

                                    <button onClick={onClose} className="text-cyan text-sm hover:text-white transition-colors tracking-widest uppercase font-medium">
                                        Return to Core
                                    </button>
                                </motion.div>
                            )}

                            {/* STEP 2: PERSONALITY SYNC */}
                            {step === "persona" && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">Vylera Persona</h2>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-8 flex items-center gap-2">
                                        <BrainCircuit className="w-4 h-4 text-cyan" />
                                        Powered by Gemini 3 Emotional Intelligence.
                                    </p>

                                    <div className="space-y-4 mb-8">
                                        {/* Option: Invisible */}
                                        <div
                                            onClick={() => setSelectedPersona("invisible")}
                                            className={`p-5 rounded-xl border cursor-pointer transition-all ${selectedPersona === "invisible" ? "bg-cyan/10 border-cyan shadow-[0_0_20px_rgba(100,255,218,0.1)]" : "bg-[#050c18] border-white/10 hover:border-white/30"}`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <Ghost className={`w-5 h-5 ${selectedPersona === "invisible" ? "text-cyan" : "text-slate-500"}`} />
                                                    <span className={`font-bold ${selectedPersona === "invisible" ? "text-white" : "text-slate-400"}`}>Invisible</span>
                                                </div>
                                                {selectedPersona === "invisible" && <CheckCircle2 className="w-5 h-5 text-cyan" />}
                                            </div>
                                            <p className="text-slate-400 text-sm pl-8">Quietly optimizes your home in the background. Zero notifications unless critical.</p>
                                        </div>

                                        {/* Option: Attentive */}
                                        <div
                                            onClick={() => setSelectedPersona("attentive")}
                                            className={`p-5 rounded-xl border cursor-pointer transition-all ${selectedPersona === "attentive" ? "bg-cyan/10 border-cyan shadow-[0_0_20px_rgba(100,255,218,0.1)]" : "bg-[#050c18] border-white/10 hover:border-white/30"}`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <Sparkles className={`w-5 h-5 ${selectedPersona === "attentive" ? "text-cyan" : "text-slate-500"}`} />
                                                    <span className={`font-bold ${selectedPersona === "attentive" ? "text-white" : "text-slate-400"}`}>Attentive</span>
                                                </div>
                                                {selectedPersona === "attentive" && <CheckCircle2 className="w-5 h-5 text-cyan" />}
                                            </div>
                                            <p className="text-slate-400 text-sm pl-8">Proactively checks in, suggests ambient music, and learns your daily 'vibe'.</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handlePersonaSubmit}
                                        disabled={status === "network_check"}
                                        className="w-full py-4 bg-cyan text-navy font-bold tracking-[0.15em] hover:bg-cyan/90 transition-all uppercase relative overflow-hidden group rounded-sm disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {status === "network_check" ? "Syncing Neural Profile..." : "Confirm & Connect"}
                                            {status !== "network_check" && <ArrowRight className="w-4 h-4" />}
                                            {status === "network_check" && <Loader2 className="w-4 h-4 animate-spin" />}
                                        </span>
                                        <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                    </button>
                                </motion.div>
                            )}


                            {/* STEP 1: AUTH */}
                            {step === "auth" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >

                                    {status === "syncing" ? (
                                        <div className="py-20 text-center">
                                            <Loader2 className="w-10 h-10 text-cyan animate-spin mx-auto mb-6" />
                                            <h3 className="text-white font-medium text-lg">Detecting active Google One benefits...</h3>
                                            <p className="text-slate-500 text-sm mt-2">Handshaking with Google Identity API v4</p>
                                        </div>
                                    ) : (
                                        <>
                                            <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">
                                                The First Step<br />Toward Sentience.
                                            </h2>
                                            <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                                Vylera is moving from 'Smart' to 'Ambient'. Join the private alpha for the Invisible Era.
                                            </p>

                                            {/* Google Sign In */}
                                            {!googleDetected ? (
                                                <button
                                                    onClick={handleGoogleSignIn}
                                                    className="w-full flex items-center justify-center gap-3 bg-white text-slate-800 font-medium py-3 rounded hover:bg-slate-50 transition-colors mb-6 shadow-sm border border-slate-200"
                                                >
                                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" />
                                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                    </svg>
                                                    Sign in with Google
                                                </button>
                                            ) : (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="bg-cyan/5 border border-cyan/20 p-4 rounded mb-8"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
                                                        <div>
                                                            <div className="text-cyan font-bold text-sm mb-1">Google One Benefits Detected</div>
                                                            <p className="text-slate-300 text-xs leading-relaxed">
                                                                Vylera Pro will seamlessly replace your current Google subscription. Pro-rated refunds applied automatically.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Divider */}
                                            {!googleDetected && (
                                                <div className="relative text-center mb-6">
                                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
                                                    <span className="relative bg-[#0a1525] px-2 text-xs text-slate-500 uppercase tracking-widest">Or enter manually</span>
                                                </div>
                                            )}

                                            <form onSubmit={handleAuthSubmit} className="space-y-8">
                                                <div className="group relative">
                                                    <input
                                                        type="email"
                                                        required
                                                        placeholder=" "
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="peer w-full bg-transparent border-b border-slate-700 py-3 text-white text-lg focus:border-cyan outline-none transition-colors"
                                                    />
                                                    <label className="absolute left-0 top-3 text-slate-500 text-base transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyan peer-valid:-top-4 peer-valid:text-xs peer-valid:text-cyan pointer-events-none">
                                                        Enter your email coordinates
                                                    </label>
                                                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan origin-left scale-x-0 peer-focus:scale-x-100 transition-transform duration-300" />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={status === "network_check"}
                                                    className="w-full py-4 bg-cyan text-navy font-bold tracking-[0.15em] hover:bg-cyan/90 transition-all uppercase relative overflow-hidden group rounded-sm disabled:opacity-70 disabled:cursor-not-allowed"
                                                >
                                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                                        {status === "network_check" ? "Processing..." : (googleDetected ? "Link Subscription" : "Initiate Connection")}
                                                        {status !== "network_check" && <ArrowRight className="w-4 h-4" />}
                                                        {status === "network_check" && <Loader2 className="w-4 h-4 animate-spin" />}
                                                    </span>
                                                    <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                                </button>

                                                {!googleDetected && (
                                                    <p className="text-center text-xs text-slate-500">
                                                        Vylera Pro unifies your existing Google perks with Ambient Home Intelligence.
                                                    </p>
                                                )}
                                            </form>

                                            <BillingFAQ />
                                        </>
                                    )}
                                </motion.div>
                            )}

                        </div>

                        {/* Decor: Corner Accents */}
                        <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-cyan/30" />
                        <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-cyan/30" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

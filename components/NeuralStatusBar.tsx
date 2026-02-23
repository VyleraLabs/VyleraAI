"use client";

import { useState, useEffect } from "react";
import { heartbeat } from "@/lib/gemini-connection";
import { Activity, ShieldCheck, Zap, Server } from "lucide-react";

export default function NeuralStatusBar() {
    const [latency, setLatency] = useState<number | null>(null);
    const [status, setStatus] = useState<"SECURE" | "SYNCING" | "ALERT">("SECURE");

    useEffect(() => {
        const ping = async () => {
            const data = await heartbeat();
            if (data.latency) setLatency(data.latency);
        };

        // Initial ping
        ping();

        // Poll every 10 seconds
        const interval = setInterval(ping, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a1525]/90 backdrop-blur-md border-t border-cyan/20 px-6 py-3 flex items-center justify-between font-mono text-xs md:text-sm shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">

            {/* LEFT: Identity */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-cyan font-bold tracking-widest">
                    <Activity className="w-4 h-4 animate-pulse" />
                    <span className="hidden md:inline">VYLERA NEURAL KERNEL</span>
                    <span className="md:hidden">VYLERA</span>
                </div>
                <div className="h-4 w-px bg-white/10" />
                <div className="flex items-center gap-2 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>SYSTEM: {status}</span>
                </div>
            </div>

            {/* CENTER: Latency (Hidden on small mobile) */}
            <div className="hidden md:flex items-center gap-6 text-slate-400">
                <div className="flex items-center gap-2">
                    <Server className="w-3 h-3 text-slate-500" />
                    <span>REGION: <span className="text-emerald-400">JAKARTA (asia-southeast2)</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-slate-500" />
                    <span>PROTO: <span className="text-purple-400">Sanctuary-v1</span></span>
                </div>
            </div>

            {/* RIGHT: Live Heartbeat */}
            <div className="flex items-center gap-3">
                <span className="text-slate-500 hidden md:inline">HEARTBEAT:</span>
                <span className={`font-bold ${latency && latency < 100 ? "text-cyan" : "text-amber-400"}`}>
                    {latency ? `${latency}ms` : "PINGING..."}
                </span>
                <div className={`w-2 h-2 rounded-full ${latency ? "bg-cyan animate-ping" : "bg-slate-500"}`} />
            </div>
        </div>
    );
}

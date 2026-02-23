import Navbar from "@/components/Navbar";

export default function InvestorsPage() {
    return (
        <main className="min-h-screen bg-[#0a1525] text-slate-300 selection:bg-cyan/30 selection:text-cyan-100 flex flex-col pt-24">
            <Navbar />

            <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-16">
                <div className="max-w-3xl mb-16">
                    <span className="text-cyan-400 font-mono text-sm tracking-[0.2em] mb-4 block uppercase opacity-90">
                        Capital Allocation
                    </span>
                    <h1 className="text-5xl md:text-6xl font-serif text-white mb-6 tracking-tight">
                        Investor <span className="italic text-cyan/80">Relations.</span>
                    </h1>
                    <p className="text-slate-400 font-light leading-relaxed text-lg pb-8 border-b border-white/10">
                        Partnering with visionaries to accelerate the deployment of sovereign, ambient intelligence architectures worldwide.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-cyan-500/30 transition-colors duration-300 group">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Q1 2026 Earnings</h3>
                        <p className="text-slate-400 mb-6 font-light">Available for registered stakeholders only. Please authenticate to view financial disclosures and growth metrics.</p>
                        <button className="px-6 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm tracking-widest font-bold uppercase rounded-sm hover:bg-cyan-500/20 transition-all">
                            Authenticate
                        </button>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-emerald-500/30 transition-colors duration-300 group">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Press Kit & Pitch Deck</h3>
                        <p className="text-slate-400 mb-6 font-light">Download high-resolution assets, founder biographies, and our architecture thesis.</p>
                        <button className="px-6 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm tracking-widest font-bold uppercase rounded-sm hover:bg-emerald-500/20 transition-all">
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

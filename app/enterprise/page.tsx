import Navbar from "@/components/Navbar";
import EnterpriseProducts from "@/components/sections/EnterpriseProducts";

export default function Enterprise() {
    return (
        <main className="bg-[#050B14] text-slate-300 min-h-screen overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100">
            <Navbar />
            <EnterpriseProducts />
        </main>
    );
}

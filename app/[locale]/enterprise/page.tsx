import Navbar from "@/components/Navbar";
import EnterpriseProducts from "@/components/sections/EnterpriseProducts";

export default async function Enterprise({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return (
        <main className="bg-[#050B14] text-slate-300 min-h-screen overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100">
            <Navbar />
            <EnterpriseProducts />
        </main>
    );
}

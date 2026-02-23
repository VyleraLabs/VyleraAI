import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";

export default async function ContactPage() {
    // Note: We normally would import authOptions, but since we defined the handler directly, 
    // we can pass the standard configuration or extract authOptions if it causes issues.
    // Assuming standard Google configuration allows default parsing.
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        // If they navigate directly here without auth, kick them to home. 
        // Our UI triggers signIn() before redirecting here.
        redirect("/");
    }

    return (
        <main className="min-h-screen bg-[#050B14] text-slate-300 overflow-x-hidden selection:bg-cyan/30 selection:text-cyan-100">
            <Navbar />

            <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
                {/* Background Details */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(100,255,218,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,255,218,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 w-full">
                    <div className="text-center mb-12">
                        <span className="text-cyan-400 font-mono tracking-[0.2em] uppercase text-xs">Vylera Networks</span>
                        <h1 className="text-4xl md:text-5xl font-serif text-white mt-4 mb-4">Establish Connection</h1>
                        <p className="text-slate-400 font-light max-w-xl mx-auto">
                            Submit a priority inquiry directly to the core engineering and solutions teams. End-to-end transmission secured.
                        </p>
                    </div>

                    <ContactForm
                        name={session.user.name || "Unknown Matrix"}
                        email={session.user.email || "unknown@node"}
                    />
                </div>
            </section>
        </main>
    );
}

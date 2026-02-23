import Navbar from "@/components/Navbar";
import AboutNarrative from "@/components/sections/AboutNarrative";
import TeamSection from "@/components/Landing/TeamSection";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main className="bg-[#0a1525] text-slate-300 min-h-screen selection:bg-cyan/30 selection:text-cyan-100">
      <Navbar />
      <AboutNarrative />
      {/* We are reusing the existing TeamSection here underneath the narrative */}
      <TeamSection />
    </main>
  );
}

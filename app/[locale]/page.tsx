import NeuralBackground from "@/components/Landing/NeuralBackground";
import EntryNavbar from "@/components/Landing/EntryNavbar";
import EntryHero from "@/components/Landing/EntryHero";
import dynamic from "next/dynamic";

const SplitEntry = dynamic(() => import("@/components/Landing/SplitEntry"));

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main className="relative min-h-screen bg-[#050B14] selection:bg-cyan/30 selection:text-cyan-100 overflow-x-hidden">
      <EntryNavbar />
      <NeuralBackground />
      <EntryHero />
      <SplitEntry />
    </main>
  );
}

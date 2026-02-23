import NeuralBackground from "@/components/Landing/NeuralBackground";
import SplitEntry from "@/components/Landing/SplitEntry";
import EntryNavbar from "@/components/Landing/EntryNavbar";
import EntryHero from "@/components/Landing/EntryHero";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050B14] selection:bg-cyan/30 selection:text-cyan-100 overflow-x-hidden">
      <EntryNavbar />
      <NeuralBackground />
      <EntryHero />
      <SplitEntry />
    </main>
  );
}

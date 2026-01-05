import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Architecture from "@/components/sections/Architecture";
import IntelligenceLayer from "@/components/sections/IntelligenceLayer";
import InvestorRelations from "@/components/sections/InvestorRelations";
import Manifesto from "@/components/sections/Manifesto";
import Pipeline from "@/components/sections/Pipeline";
import Pricing from "@/components/sections/Pricing";
import Roadmap from "@/components/sections/Roadmap";
import Security from "@/components/sections/Security";
import SystemHealth from "@/components/sections/SystemHealth";
import Technology from "@/components/sections/Technology";
import WhitePaper from "@/components/sections/WhitePaper";
import NeuralTrigger from "@/components/Meti/NeuralTrigger";

export default function Home() {
  return (
    <main className="bg-[#0a1525] text-slate-300 overflow-x-hidden selection:bg-cyan/30 selection:text-cyan-100">
      <NeuralTrigger />
      <Navbar />
      <Hero />
      <Manifesto />
      <IntelligenceLayer />
      <Technology />
      <Pipeline />
      <Architecture />
      <SystemHealth />
      <Security />
      <Pricing />
      <Roadmap />
      <WhitePaper />
      <InvestorRelations />
    </main>
  );
}

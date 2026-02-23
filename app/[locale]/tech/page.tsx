import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Architecture from "@/components/sections/Architecture";
import IntelligenceLayer from "@/components/sections/IntelligenceLayer";
import InvestorRelations from "@/components/sections/InvestorRelations";
import Manifesto from "@/components/sections/Manifesto";
import Pipeline from "@/components/sections/Pipeline";
import EarlyAccess from "@/components/sections/EarlyAccess";
import Roadmap from "@/components/sections/Roadmap";
import Security from "@/components/sections/Security";
import SystemHealth from "@/components/sections/SystemHealth";
import Technology from "@/components/sections/Technology";
import WhitePaper from "@/components/sections/WhitePaper";

import ProblemSolution from "@/components/sections/ProblemSolution";
import Features from "@/components/Features";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology | Vylera Labs",
  description: "Deep dive into Vylera's Neural Core, Hybrid-Edge Processing, and Sanctuary Protocol. Privacy-first intelligence for IoT.",
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main className="bg-[#0a1525] text-slate-300 overflow-x-hidden selection:bg-cyan/30 selection:text-cyan-100">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Features />
      <Manifesto />
      <IntelligenceLayer />
      <Technology />
      <Pipeline />
      <Architecture />
      <SystemHealth />
      <Security />
      <EarlyAccess />
      <Roadmap />
      <WhitePaper />

      <InvestorRelations />
    </main>
  );
}

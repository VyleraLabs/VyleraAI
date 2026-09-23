import Navbar from "@/components/Navbar";
import ProductsOverview from "@/components/sections/ProductsOverview";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Vylera Labs",
  description:
    "Explore VyleraLabs products for Google Cloud, Google Workspace, ticketing, and whistleblowing systems."
};

export default function ProductsPage() {
  return (
    <main className="bg-[#050B14] text-slate-300 min-h-screen overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100">
      <Navbar />
      <ProductsOverview />
    </main>
  );
}

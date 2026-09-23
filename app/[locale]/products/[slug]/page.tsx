import Navbar from "@/components/Navbar";
import ProductDetail from "@/components/sections/ProductDetail";
import { getProduct, products } from "@/data/products";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.title} | Vylera Labs`,
    description: product.summary
  };
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <main className="bg-[#050B14] text-slate-300 min-h-screen overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100">
      <Navbar />
      <ProductDetail product={product} related={related} />
    </main>
  );
}

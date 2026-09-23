"use client";

import { Ticket } from "lucide-react";
import type { Product } from "@/data/products";

type ProductMarkProps = {
  product: Pick<Product, "initial" | "icon" | "title">;
  className?: string;
};

export default function ProductMark({ product, className = "h-7 w-7" }: ProductMarkProps) {
  if (product.icon?.type === "image") {
    return (
      <img
        src={product.icon.src}
        alt={product.icon.alt}
        className={`${className} object-contain`}
      />
    );
  }

  if (product.icon?.type === "ticket") {
    return <Ticket className={className} strokeWidth={2.2} aria-label={`${product.title} icon`} />;
  }

  if (product.icon?.type === "whistle") {
    return (
      <svg
        viewBox="0 0 32 32"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        role="img"
        aria-label={`${product.title} icon`}
      >
        <path d="M4.5 14.5h8.8l7.9-5.2c1.8-1.2 4.2.1 4.2 2.3v4.8c0 2.2-2.4 3.5-4.2 2.3l-7.9-5.2H4.5z" />
        <path d="M4.5 14.5v6.2a3.8 3.8 0 0 0 3.8 3.8h4.5a5.6 5.6 0 0 0 5.6-5.6v-1.1" />
        <path d="M8.6 14.5v5.2" />
        <path d="M25.4 11.6h2.1" />
      </svg>
    );
  }

  return <span>{product.initial}</span>;
}

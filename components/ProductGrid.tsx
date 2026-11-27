"use client";

import { useState } from "react";
import { Product, categories } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  const [cat, setCat] = useState<string>("all");
  const shown = cat === "all" ? products : products.filter((p) => p.category === cat);
  return (
    <>
      <div className="tabs" role="tablist">
        {categories.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={cat === c.id}
            className={cat === c.id ? "tab active" : "tab"}
            onClick={() => setCat(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="grid">
        {shown.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}

"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Product, categories, featuredSlugs } from "@/data/products";
import ProductCard from "./ProductCard";
import { Arrow } from "./Icons";

// Bỏ dấu để tìm "pin du phong" vẫn ra "Pin dự phòng".
const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");

function sortFeaturedFirst(products: Product[]) {
  const rank = (p: Product) => {
    const i = featuredSlugs.indexOf(p.slug);
    return i === -1 ? featuredSlugs.length : i;
  };
  return [...products].sort((a, b) => rank(a) - rank(b));
}

function GridView({ products, cat, q, onCat }: {
  products: Product[];
  cat: string;
  q: string;
  onCat?: (c: string) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const sorted = sortFeaturedFirst(products);
  let shown: Product[];
  if (q) {
    const words = norm(q).split(/\s+/).filter(Boolean);
    shown = sorted.filter((p) => {
      const hay = norm(`${p.name} ${p.shortName}`);
      return words.every((w) => hay.includes(w));
    });
  } else if (cat !== "all") {
    shown = sorted.filter((p) => p.category === cat);
  } else {
    shown = showAll ? sorted : sorted.slice(0, featuredSlugs.length);
  }
  const collapsed = !q && cat === "all" && !showAll;

  return (
    <>
      <div className="section-head">
        <h2>{q ? `Kết quả cho “${q}”` : "Sản phẩm nổi bật"}</h2>
        {q ? (
          <Link href="/#san-pham" className="see-all">Xoá tìm kiếm</Link>
        ) : (
          collapsed && (
            <button className="see-all" onClick={() => setShowAll(true)}>
              <span className="see-all-full">Xem tất cả {products.length} sản phẩm</span>
              <span className="see-all-short">Xem tất cả</span>
              <Arrow />
            </button>
          )
        )}
      </div>
      {!q && (
        <div className="tabs" role="tablist">
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={cat === c.id}
              className={cat === c.id ? "tab active" : "tab"}
              onClick={() => onCat?.(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
      {shown.length ? (
        <div className="grid">
          {shown.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      ) : (
        <p className="empty">Chưa có sản phẩm phù hợp. Nhắn shop để được tư vấn nhé!</p>
      )}
    </>
  );
}

function GridWithParams({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const cat = params.get("cat") ?? "all";
  const q = (params.get("q") ?? "").trim();
  const setCat = (c: string) =>
    router.replace(c === "all" ? "/#san-pham" : `/?cat=${c}#san-pham`, { scroll: false });
  return <GridView key={`${cat}|${q}`} products={products} cat={cat} q={q} onCat={setCat} />;
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <Suspense fallback={<GridView products={products} cat="all" q="" />}>
      <GridWithParams products={products} />
    </Suspense>
  );
}

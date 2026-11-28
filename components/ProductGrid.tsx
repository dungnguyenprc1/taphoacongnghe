"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Product, categories } from "@/data/products";
import ProductCard from "./ProductCard";
import { Arrow } from "./Icons";

// Bỏ dấu để tìm "pin du phong" vẫn ra "Pin dự phòng".
const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");

// Số sản phẩm hiện trước khi bấm "Xem tất cả".
const PREVIEW = 12;

function GridView({ products, cat, q, onCat }: {
  products: Product[];
  cat: string;
  q: string;
  onCat?: (c: string) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const sorted = products;
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
    shown = showAll ? sorted : sorted.slice(0, PREVIEW);
  }
  const collapsed = !q && cat === "all" && !showAll;

  return (
    <>
      <div className="section-title">
        <h2>{q ? `Kết quả cho “${q}”` : "Tất cả sản phẩm"}</h2>
        <p>{q ? `${shown.length} sản phẩm phù hợp` : "Giá kho, cập nhật liên tục"}</p>
        {q && <Link href="/#san-pham" className="see-all">Xoá tìm kiếm</Link>}
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
      {collapsed && (
        <div className="more">
          <button className="btn btn-more" onClick={() => setShowAll(true)}>
            Xem tất cả {products.length} sản phẩm <Arrow />
          </button>
        </div>
      )}
    </>
  );
}

function GridWithParams({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const cat = params.get("cat") ?? "all";
  const q = (params.get("q") ?? "").trim();
  // Tìm từ ô ở header: cuộn xuống phần kết quả.
  useEffect(() => {
    if (!q) return;
    // Đợi Next xử lý cuộn của lượt chuyển trang xong rồi mới cuộn.
    const t = setTimeout(() => document.getElementById("san-pham")?.scrollIntoView(), 50);
    return () => clearTimeout(t);
  }, [q]);
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

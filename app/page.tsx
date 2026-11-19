import Link from "next/link";
import BannerSlider from "@/components/BannerSlider";
import FlashSale from "@/components/FlashSale";
import ProductCard from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/queries";
import type { Product } from "@/lib/types";

export default async function Home() {
  const [categories, flash, suggested, phones, laptops] = await Promise.all([
    getCategories(),
    getProducts({ sort: "discount", limit: 8 }),
    getProducts({ limit: 10 }),
    getProducts({ category: "dien-thoai" }),
    getProducts({ category: "laptop" }),
  ]);

  return (
    <>
      <BannerSlider />

      <section className="box">
        <div className="cat-grid">
          {categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="cat-item">
              <span className="cat-icon">{c.icon}</span>
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <FlashSale items={flash} />

      <section className="box">
        <h2 className="box-title">Gợi ý cho bạn</h2>
        <div className="grid">
          {suggested.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <Section title="Điện thoại nổi bật" slug="dien-thoai" items={phones} />
      <Section title="Laptop bán chạy" slug="laptop" items={laptops} />
    </>
  );
}

function Section({ title, slug, items }: { title: string; slug: string; items: Product[] }) {
  return (
    <section className="box">
      <div className="box-head">
        <h2 className="box-title">{title}</h2>
        <Link href={`/category/${slug}`}>Xem tất cả ›</Link>
      </div>
      <div className="grid">
        {items.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}

import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/queries";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const items = q.trim() ? await getProducts({ q: q.trim() }) : [];

  return (
    <section className="box">
      <h1 className="box-title">
        Kết quả cho “{q}” <small>({items.length})</small>
      </h1>
      {items.length ? (
        <div className="grid">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <p className="empty">Không tìm thấy sản phẩm phù hợp.</p>
      )}
    </section>
  );
}

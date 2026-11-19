import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getCategory, getProducts } from "@/lib/queries";
import { parseSort } from "@/lib/validation";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { sort } = await searchParams;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const items = getProducts({ category: slug, sort: parseSort(sort) });

  return (
    <section className="box">
      <div className="box-head">
        <h1 className="box-title">
          {cat.icon} {cat.name} <small>({items.length} sản phẩm)</small>
        </h1>
        <div className="sort">
          <a href={`?`}>Nổi bật</a>
          <a href={`?sort=asc`}>Giá thấp - cao</a>
          <a href={`?sort=desc`}>Giá cao - thấp</a>
        </div>
      </div>
      {items.length ? (
        <div className="grid">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <p className="empty">Chưa có sản phẩm trong danh mục này.</p>
      )}
    </section>
  );
}

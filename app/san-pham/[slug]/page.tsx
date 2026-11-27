import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct, formatPrice } from "@/data/products";
import OrderButtons from "@/components/OrderButtons";
import ProductCard from "@/components/ProductCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.shortName,
    description: `${p.name} – ${formatPrice(p.price)}. ${p.features.join(". ")}.`,
    openGraph: { images: [p.image] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);

  return (
    <div className="container section">
      <p className="crumbs"><Link href="/">Trang chủ</Link> / {p.shortName}</p>
      <div className="detail">
        <div className="detail-img">
          <Image src={p.image} alt={p.name} fill priority sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div>
          <h1>{p.name}</h1>
          <p className="price big">{formatPrice(p.price)}</p>
          {p.preorder && <p className="notice">⏳ {p.preorder} — nhận cọc giữ hàng</p>}
          <ul className="features">
            {p.features.map((f) => <li key={f}>✅ {f}</li>)}
          </ul>
          <p><strong>Bảo hành:</strong> {p.warranty}</p>
          {p.note && <p className="muted">Lưu ý: {p.note}</p>}
          <OrderButtons productName={p.shortName} />
        </div>
      </div>
      {related.length > 0 && (
        <>
          <h2>Sản phẩm cùng loại</h2>
          <div className="grid">
            {related.map((r) => <ProductCard key={r.slug} product={r} />)}
          </div>
        </>
      )}
    </div>
  );
}

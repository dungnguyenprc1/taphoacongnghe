import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct, formatPrice, categoryLabel } from "@/data/products";
import OrderButtons from "@/components/OrderButtons";
import ProductCard from "@/components/ProductCard";
import { Check } from "@/components/Icons";

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
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 5);
  const status = p.preorder ? "Hàng order" : p.inStock ? "Còn hàng" : "Hết hàng";

  return (
    <div className="container section">
      <nav className="crumbs">
        <Link href="/">Trang chủ</Link> / <Link href={`/?cat=${p.category}#san-pham`}>{categoryLabel(p.category)}</Link> / <span>{p.shortName}</span>
      </nav>
      <div className="detail">
        <div className="detail-media">
          <div className="detail-img">
            <Image src={p.image} alt={p.name} fill priority unoptimized={p.image.endsWith(".svg")} sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
        <div className="detail-info">
          <span className={`status ${p.inStock || p.preorder ? "" : "status-out"}`}>{status}</span>
          <h1>{p.name}</h1>
          <p className="price big">{formatPrice(p.price)}</p>
          <hr />
          {p.preorder && <p className="notice">⏳ {p.preorder} — nhận cọc giữ hàng</p>}
          <ul className="features">
            {p.features.map((f) => (
              <li key={f}><span className="feat-check"><Check size={12} /></span>{f}</li>
            ))}
          </ul>
          {p.note && <p className="note">Lưu ý: {p.note}</p>}
          <dl className="facts">
            <div><dt>Bảo hành</dt><dd>{p.warranty}</dd></div>
            <div><dt>Giao hàng</dt><dd>COD toàn quốc</dd></div>
            <div><dt>Đổi trả</dt><dd>Kiểm tra trước khi nhận</dd></div>
          </dl>
          <OrderButtons product={p} />
        </div>
      </div>
      {related.length > 0 && (
        <section className="related">
          <h2>Sản phẩm cùng loại</h2>
          <div className="grid grid-5">
            {related.map((r) => <ProductCard key={r.slug} product={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}

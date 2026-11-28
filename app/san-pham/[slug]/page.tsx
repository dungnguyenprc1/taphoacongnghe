import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct, formatPrice, categoryLabel, priceRange, type Product } from "@/data/products";
import { shop, siteUrl } from "@/lib/config";
import BuyBox from "@/components/BuyBox";
import ProductGallery from "@/components/ProductGallery";
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
    alternates: { canonical: `/san-pham/${p.slug}` },
    openGraph: { images: [p.image] },
  };
}

// Dữ liệu cho Google: tên, ảnh, giá, còn hàng. Giúp kết quả tìm kiếm hiện giá và "Còn hàng".
function productJsonLd(p: Product, images: string[]) {
  const url = `${siteUrl}/san-pham/${p.slug}`;
  const [low, high] = priceRange(p);
  const availability = !p.inStock
    ? "https://schema.org/OutOfStock"
    : p.preorder
      ? "https://schema.org/PreOrder"
      : "https://schema.org/InStock";
  const offer = {
    priceCurrency: "VND",
    availability,
    url,
    seller: { "@type": "Organization", name: shop.name },
  };
  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.name,
      image: images.map((i) => siteUrl + i),
      description: p.features.join(". "),
      sku: p.slug,
      category: categoryLabel(p.category),
      offers:
        low === high
          ? { "@type": "Offer", price: low, ...offer }
          : { "@type": "AggregateOffer", lowPrice: low, highPrice: high, offerCount: (p.variants ?? []).flatMap((g) => g.options).length, ...offer },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Trang chủ", item: siteUrl },
        { "@type": "ListItem", position: 2, name: categoryLabel(p.category), item: `${siteUrl}/?cat=${p.category}` },
        { "@type": "ListItem", position: 3, name: p.shortName, item: url },
      ],
    },
  ];
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 5);
  // Ảnh chính + ảnh của từng phân loại (không trùng).
  const gallery = [...new Set([p.image, ...(p.variants ?? []).flatMap((g) => g.options.map((o) => o.image)).filter((x): x is string => !!x)])];
  const status = p.preorder ? "Hàng order" : p.inStock ? "Còn hàng" : "Hết hàng";

  return (
    <div className="container section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(p, gallery)) }} />
      <nav className="crumbs">
        <Link href="/">Trang chủ</Link> / <Link href={`/?cat=${p.category}#san-pham`}>{categoryLabel(p.category)}</Link> / <span>{p.shortName}</span>
      </nav>
      <div className="detail">
        <ProductGallery images={gallery} alt={p.name} />
        <div className="detail-info">
          <span className={`status ${p.inStock || p.preorder ? "" : "status-out"}`}>{status}</span>
          <h1>{p.name}</h1>
          <BuyBox product={p}>
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
          </BuyBox>
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

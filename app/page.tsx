import Image from "next/image";
import Link from "next/link";
import { products, categories, getProduct, featuredSlugs, type Product } from "@/data/products";
import { shop } from "@/lib/config";
import ProductGrid from "@/components/ProductGrid";
import ProductCard from "@/components/ProductCard";
import { Bolt, Arrow } from "@/components/Icons";

const heroImages = ["pin-du-phong-20000mah-kem-2-cap", "cu-sac-voltme-revo-35-duo", "pin-magsafe-nohon-10000mah"]
  .map((s) => getProduct(s)!)
  .filter(Boolean);

const featured = featuredSlugs.map((s) => getProduct(s)).filter((p): p is Product => !!p);

// Ảnh đại diện mỗi danh mục: ưu tiên sản phẩm nổi bật, sau đó là sản phẩm đầu tiên có ảnh thật.
const withPhoto = products.filter((p) => !p.image.endsWith(".svg"));
const categoryCards = categories.slice(1).map((c) => {
  const inCat = withPhoto.filter((p) => p.category === c.id);
  const feat = featuredSlugs.map((s) => inCat.find((p) => p.slug === s)).find(Boolean);
  return { ...c, image: (feat ?? inCat[0])?.image };
});

// Các danh mục có khối riêng trên trang chủ (mỗi khối 4 sản phẩm).
const categorySections = (["pin", "sac-cap", "ghe-o-to", "camera"] as const)
  .map((id) => ({ ...categories.find((c) => c.id === id)!, items: products.filter((p) => p.category === id).slice(0, 4) }))
  .filter((s) => s.items.length);

const perks = [
  { title: "Giá kho", text: "Giá bán rõ ràng trên từng sản phẩm, không phí ẩn" },
  { title: "Ship COD", text: "Nhận hàng, kiểm tra rồi mới thanh toán" },
  { title: "Bảo hành rõ ràng", text: "Thời hạn bảo hành ghi trên từng sản phẩm" },
  { title: "Tư vấn tận tình", text: "Nhắn Messenger / Zalo để được gợi ý đúng món" },
];

const steps = [
  { title: "Chọn sản phẩm", text: "Xem giá, bảo hành ngay trên web" },
  { title: "Nhắn tin chốt đơn", text: "Bấm Liên hệ, dán thông tin vào Messenger" },
  { title: "Nhận hàng COD", text: "Kiểm tra hàng rồi mới thanh toán" },
];

function CategorySection({ id, label, items }: (typeof categorySections)[number]) {
  return (
    <section className="container section">
      <div className="cat-head">
        <h2>{label}</h2>
        <Link href={`/?cat=${id}#san-pham`} className="see-all">Xem tất cả <Arrow /></Link>
      </div>
      <div className="grid">
        {items.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Banner lớn */}
      <section className="banner-wrap">
        <div className="banner">
          <div className="banner-art" aria-hidden="true">
            {heroImages.map((p, i) => (
              <span key={p.slug} className={`banner-tile banner-tile-${i}`}>
                <Image src={p.image} alt="" fill priority={i === 0} sizes="220px" />
              </span>
            ))}
          </div>
          <span className="banner-circle" aria-hidden="true"><b>GIÁ</b>KHO</span>
          <div className="banner-copy">
            <p className="banner-kicker">Siêu giảm giá</p>
            <p className="banner-sub">Phụ kiện công nghệ chính hãng</p>
            <h1 className="banner-title">{shop.name}</h1>
            <a href="#san-pham" className="banner-btn">Mua ngay</a>
            <p className="banner-note">Ship COD toàn quốc · Kiểm tra trước khi nhận</p>
          </div>
        </div>
      </section>

      {/* Danh mục: ô màu tối, ảnh + tên in hoa */}
      <section className="container section">
        <div className="cat-tiles">
          {categoryCards.map((c, i) => (
            <Link key={c.id} href={`/?cat=${c.id}#san-pham`} className={`cat-tile cat-tile-${i}`}>
              <span className="cat-tile-img">
                {c.image && <Image src={c.image} alt="" fill sizes="(max-width: 860px) 40vw, 220px" />}
              </span>
              <span className="cat-tile-label">{c.short}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Sản phẩm nổi bật: khối nền navy */}
      <section className="container section">
        <div className="hot">
          <div className="hot-head">
            <h2><Bolt size={26} /> Nổi bật</h2>
            <span className="hot-pill">Giá kho · Ship COD</span>
            <a href="#san-pham" className="hot-all">Xem tất cả</a>
          </div>
          <div className="hot-row">
            {featured.map((p) => <ProductCard key={p.slug} product={p} tone="dark" />)}
          </div>
        </div>
      </section>

      <section className="container section" id="san-pham">
        <ProductGrid products={products} />
      </section>

      <section className="container section hide-mobile">
        <div className="perks">
          {perks.map((p) => (
            <div key={p.title} className="perk">
              <span className="perk-icon"><Bolt size={20} /></span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {categorySections.slice(0, 2).map((s) => <CategorySection key={s.id} {...s} />)}

      {/* 3 bước đặt hàng: 3 ô banner */}
      <section className="container section">
        <div className="steps">
          {steps.map((s, i) => (
            <div key={s.title} className={`step step-${i}`}>
              <span className="step-num">{i + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {categorySections.slice(2).map((s) => <CategorySection key={s.id} {...s} />)}
    </>
  );
}

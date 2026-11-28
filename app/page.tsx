import Image from "next/image";
import Link from "next/link";
import { products, categories, getProduct, formatPrice, featuredSlugs } from "@/data/products";
import { shop } from "@/lib/config";
import ProductGrid from "@/components/ProductGrid";
import { Bolt, Check } from "@/components/Icons";

const heroMain = getProduct("pin-du-phong-20000mah-kem-2-cap")!;
const heroTop = getProduct("pin-magsafe-nohon-10000mah")!;
const heroBottom = getProduct("cu-sac-voltme-revo-35-duo")!;

// Ảnh đại diện mỗi danh mục: ưu tiên sản phẩm nổi bật, sau đó là sản phẩm đầu tiên có ảnh thật.
const withPhoto = products.filter((p) => !p.image.endsWith(".svg"));
const categoryCards = categories.slice(1).map((c) => {
  const inCat = withPhoto.filter((p) => p.category === c.id);
  const featured = featuredSlugs.map((s) => inCat.find((p) => p.slug === s)).find(Boolean);
  return { ...c, image: (featured ?? inCat[0])?.image };
});

const perks = [
  { title: "Giá tốt", text: "Giá bán rõ ràng trên từng sản phẩm, không phí ẩn" },
  { title: "Ship COD", text: "Nhận hàng, kiểm tra rồi mới thanh toán" },
  { title: "Bảo hành rõ ràng", text: "Thời hạn bảo hành ghi trên từng sản phẩm" },
  { title: "Tư vấn tận tình", text: "Nhắn Messenger / Zalo để được gợi ý đúng món" },
];

const steps = [
  { title: "Chọn sản phẩm", text: "Xem giá, bảo hành ngay trên web" },
  { title: "Nhắn tin chốt đơn", text: "Gửi tên sản phẩm qua Messenger hoặc Zalo" },
  { title: "Nhận hàng COD", text: "Kiểm tra hàng rồi mới thanh toán" },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Phụ kiện công nghệ giá tốt</span>
            <h1>
              Phụ kiện công nghệ giá kho<span className="hero-h1-extra">, giao tận nhà</span>
            </h1>
            <p>
              <span className="hide-mobile">Pin dự phòng, củ sạc nhanh, cáp sạc, mic không dây.<br /></span>
              Chọn món, nhắn tin là chốt đơn — ship COD toàn quốc.
            </p>
            <div className="hero-actions">
              <a href="#san-pham" className="btn btn-primary btn-lg">Xem sản phẩm</a>
              <a href={shop.messenger} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg hide-mobile">
                Nhắn tin tư vấn
              </a>
            </div>
            <ul className="hero-perks">
              {["Ship COD toàn quốc", "Kiểm tra trước khi nhận", "Bảo hành theo sản phẩm"].map((t, i) => (
                <li key={t}>
                  <Check size={12} className="perk-check" />
                  <span className="perk-full">{t}</span>
                  <span className="perk-short">{["Ship COD", "Kiểm tra hàng", "Bảo hành"][i]}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-art">
            <Link href={`/san-pham/${heroMain.slug}`} className="hero-tile hero-tile-main">
              <Image src={heroMain.image} alt={heroMain.name} fill priority sizes="(max-width: 768px) 40vw, 300px" />
            </Link>
            <Link href={`/san-pham/${heroMain.slug}`} className="hero-price">
              <span>{heroMain.shortName}</span>
              <strong>{formatPrice(heroMain.price)}</strong>
            </Link>
            <Link href={`/san-pham/${heroTop.slug}`} className="hero-tile hero-tile-top">
              <Image src={heroTop.image} alt={heroTop.name} fill sizes="200px" />
            </Link>
            <Link href={`/san-pham/${heroBottom.slug}`} className="hero-tile hero-tile-bottom">
              <Image src={heroBottom.image} alt={heroBottom.name} fill sizes="260px" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container section">
        <h2><span className="hide-mobile">Mua theo danh mục</span><span className="show-mobile">Danh mục</span></h2>
        <div className="cat-grid">
          {categoryCards.map((c) => (
            <Link key={c.id} href={`/?cat=${c.id}#san-pham`} className="cat-card">
              <span className="cat-img">
                {c.image && <Image src={c.image} alt="" fill sizes="120px" />}
              </span>
              <span className="cat-label hide-mobile">{c.label}</span>
              <span className="cat-label show-mobile">{c.short}</span>
            </Link>
          ))}
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

      <section className="container section">
        <h2 className="center">Đặt hàng<span className="hide-mobile"> chỉ</span> với 3 bước</h2>
        <div className="steps">
          {steps.map((s, i) => (
            <div key={s.title} className="step">
              <div className="step-head"><span className="step-num">{i + 1}</span><h3>{s.title}</h3></div>
              <p className="hide-mobile">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section hide-mobile">
        <div className="cta">
          <div>
            <h2>Chưa biết chọn món nào?</h2>
            <p>Nhắn cho shop máy bạn đang dùng, shop gợi ý pin, củ sạc phù hợp.</p>
          </div>
          <a href={shop.messenger} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">Nhắn tin ngay</a>
        </div>
      </section>
    </>
  );
}

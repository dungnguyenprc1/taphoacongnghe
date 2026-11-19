import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import ProductCard from "@/components/ProductCard";
import { discount, formatPrice } from "@/lib/format";
import { getCategory, getProduct, getProducts } from "@/lib/queries";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getProduct(id);
  if (!p) notFound();
  const [cat, sameCategory] = await Promise.all([
    getCategory(p.category),
    getProducts({ category: p.category, limit: 6 }),
  ]);
  if (!cat) notFound();
  const related = sameCategory.filter((x) => x.id !== p.id).slice(0, 5);

  return (
    <>
      <div className="breadcrumb">
        <Link href="/">Trang chủ</Link> › <Link href={`/category/${cat.slug}`}>{cat.name}</Link> › {p.name}
      </div>
      <section className="box detail">
        <div className="detail-media">
          <div className="detail-thumb" style={{ background: p.color }}>
            {p.icon}
          </div>
          <ul className="policy">
            <li>✅ Hàng chính hãng, bảo hành 12 tháng</li>
            <li>🔄 1 đổi 1 trong 30 ngày nếu lỗi</li>
            <li>🚚 Giao hàng miễn phí toàn quốc</li>
          </ul>
        </div>
        <div className="detail-info">
          <h1>{p.name}</h1>
          <div className="rating">⭐ {p.rating} · Đã bán {p.sold.toLocaleString("vi-VN")}</div>
          <div className="detail-price">
            <span className="price">{formatPrice(p.price)}</span>
            <s>{formatPrice(p.oldPrice)}</s>
            <b>-{discount(p)}%</b>
          </div>
          <div className="promo">
            <h4>🎁 Khuyến mãi</h4>
            <ol>
              <li>Giảm thêm 5% tối đa 500.000₫ khi thanh toán qua ví điện tử</li>
              <li>Thu cũ đổi mới – trợ giá đến 2.000.000₫</li>
              {p.gift && <li>{p.gift}</li>}
              {p.installment && <li>Trả góp 0% qua thẻ tín dụng</li>}
            </ol>
          </div>
          <p className={p.stock > 0 ? "stock" : "stock out"}>
            {p.stock > 0 ? `Còn ${p.stock} sản phẩm` : "Tạm hết hàng"}
          </p>
          {p.stock > 0 && <AddToCart id={p.id} />}
          <h4>Thông số nổi bật</h4>
          <table className="spec-table">
            <tbody>
              {p.specs.map((s, i) => (
                <tr key={s}>
                  <td>{["Màn hình", "Cấu hình", "Đặc điểm"][i]}</td>
                  <td>{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {related.length > 0 && (
        <section className="box">
          <h2 className="box-title">Sản phẩm tương tự</h2>
          <div className="grid">
            {related.map((x) => (
              <ProductCard key={x.id} p={x} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

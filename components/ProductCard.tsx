import Link from "next/link";
import { discount, formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ p, flash = false }: { p: Product; flash?: boolean }) {
  return (
    <Link href={`/product/${p.id}`} className="card">
      {p.installment && <span className="tag">Trả góp 0%</span>}
      <div className="thumb" style={{ background: p.color }}>
        {p.icon}
      </div>
      <h3>{p.name}</h3>
      <div className="specs">
        {p.specs.slice(0, 2).map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <div className="price">{formatPrice(p.price)}</div>
      <div className="old">
        <s>{formatPrice(p.oldPrice)}</s> <b>-{discount(p)}%</b>
      </div>
      {flash ? (
        <div className="progress">
          <i style={{ width: `${30 + (p.sold % 60)}%` }} />
          <span>Đã bán {p.sold % 100}</span>
        </div>
      ) : (
        <div className="rating">
          ⭐ {p.rating} · Đã bán {p.sold.toLocaleString("vi-VN")}
        </div>
      )}
      {p.gift && !flash && <div className="gift">🎁 {p.gift}</div>}
    </Link>
  );
}

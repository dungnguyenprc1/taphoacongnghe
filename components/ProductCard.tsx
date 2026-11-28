import Image from "next/image";
import Link from "next/link";
import { Product, formatPrice, productBadge, priceRange, categoryLabel } from "@/data/products";
import { shop, orderMessage } from "@/lib/config";
import CopyOrderLink from "./CopyOrderLink";
import { CartPlus } from "./Icons";

// tone="dark": thẻ nằm trong khối nền navy (Sản phẩm nổi bật).
export default function ProductCard({ product, tone = "light" }: { product: Product; tone?: "light" | "dark" }) {
  const badge = productBadge(product);
  const href = `/san-pham/${product.slug}`;
  const [min, max] = priceRange(product);
  return (
    <div className={tone === "dark" ? "card card-dark" : "card"}>
      <Link href={href} className="card-img">
        <Image src={product.image} alt={product.name} fill unoptimized={product.image.endsWith(".svg")} sizes="(max-width: 640px) 50vw, 25vw" />
        {badge && <span className="badge">{badge}</span>}
      </Link>
      <div className="card-body">
        <Link href={`/?cat=${product.category}#san-pham`} className="card-cat">{categoryLabel(product.category)}</Link>
        <h3><Link href={href}>{product.name}</Link></h3>
        <p className="price">{min !== max && <span className="price-from">Từ </span>}{formatPrice(min)}</p>
        <CopyOrderLink className="btn btn-contact" href={shop.messenger} message={orderMessage({ ...product, price: min })}>
          <CartPlus size={15} /> Liên hệ
        </CopyOrderLink>
      </div>
    </div>
  );
}

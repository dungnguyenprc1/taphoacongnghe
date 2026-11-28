import Image from "next/image";
import Link from "next/link";
import { Product, formatPrice, productBadge, priceRange } from "@/data/products";
import { shop, orderMessage } from "@/lib/config";
import CopyOrderLink from "./CopyOrderLink";

export default function ProductCard({ product }: { product: Product }) {
  const badge = productBadge(product);
  const href = `/san-pham/${product.slug}`;
  const [min, max] = priceRange(product);
  return (
    <div className="card">
      <Link href={href} className="card-img">
        <Image src={product.image} alt={product.name} fill unoptimized={product.image.endsWith(".svg")} sizes="(max-width: 640px) 50vw, 25vw" />
        {badge && <span className="badge">{badge}</span>}
      </Link>
      <div className="card-body">
        <h3><Link href={href}>{product.name}</Link></h3>
        <p className="price">{min !== max && <span className="price-from">Từ </span>}{formatPrice(min)}</p>
        <p className="card-warranty">BH {product.warranty}</p>
        <CopyOrderLink className="btn btn-dark" href={shop.messenger} message={orderMessage({ ...product, price: min })}>Đặt qua Messenger</CopyOrderLink>
      </div>
    </div>
  );
}

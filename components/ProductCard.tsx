import Image from "next/image";
import Link from "next/link";
import { Product, formatPrice, productBadge } from "@/data/products";
import { shop } from "@/lib/config";

export default function ProductCard({ product }: { product: Product }) {
  const badge = productBadge(product);
  const href = `/san-pham/${product.slug}`;
  return (
    <div className="card">
      <Link href={href} className="card-img">
        <Image src={product.image} alt={product.name} fill unoptimized={product.image.endsWith(".svg")} sizes="(max-width: 640px) 50vw, 25vw" />
        {badge && <span className="badge">{badge}</span>}
      </Link>
      <div className="card-body">
        <h3><Link href={href}>{product.name}</Link></h3>
        <p className="price">{formatPrice(product.price)}</p>
        <p className="card-warranty">BH {product.warranty}</p>
        <a className="btn btn-dark" href={shop.messenger} target="_blank" rel="noopener noreferrer">Đặt qua Messenger</a>
      </div>
    </div>
  );
}

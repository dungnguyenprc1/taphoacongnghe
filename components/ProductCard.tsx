import Image from "next/image";
import Link from "next/link";
import { Product, formatPrice } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/san-pham/${product.slug}`} className="card">
      <div className="card-img">
        <Image src={product.image} alt={product.name} fill unoptimized={product.image.endsWith(".svg")} sizes="(max-width: 640px) 50vw, 25vw" />
        {product.preorder && <span className="badge">Hàng order</span>}
      </div>
      <div className="card-body">
        <h3>{product.shortName}</h3>
        <p className="price">{formatPrice(product.price)}</p>
        <p className="muted">Bảo hành {product.warranty}</p>
      </div>
    </Link>
  );
}

import { products } from "@/data/products";
import { shop } from "@/lib/config";
import ProductGrid from "@/components/ProductGrid";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Phụ kiện công nghệ <span className="hl">giá kho</span></h1>
          <p>Pin dự phòng, củ sạc nhanh, cáp sạc, mic không dây — chọn món, nhắn tin là chốt đơn.</p>
          <ul className="perks">
            {shop.policies.map((p) => <li key={p}>✓ {p}</li>)}
          </ul>
        </div>
      </section>
      <section className="container section">
        <h2>Sản phẩm</h2>
        <ProductGrid products={products} />
      </section>
    </>
  );
}

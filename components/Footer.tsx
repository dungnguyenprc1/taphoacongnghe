import Link from "next/link";
import { shop, zaloUrl, telUrl, prettyPhone } from "@/lib/config";
import { policies } from "@/data/policies";
import { categories } from "@/data/products";
import { Bolt } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="logo"><Bolt size={22} className="logo-bolt" /> {shop.name}</Link>
          <p>{shop.tagline}</p>
        </div>
        <div className="footer-col">
          <h4>Danh mục</h4>
          {categories.slice(1, 5).map((c) => (
            <Link key={c.id} href={`/?cat=${c.id}#san-pham`}>{c.label}</Link>
          ))}
        </div>
        <div className="footer-col">
          <h4>Chính sách</h4>
          {policies.map((p) => <Link key={p.slug} href={`/${p.slug}`}>{p.title}</Link>)}
        </div>
        <div className="footer-col">
          <h4>Liên hệ</h4>
          <a href={shop.facebook} target="_blank" rel="noopener noreferrer">Fanpage Facebook</a>
          <a href={shop.messenger} target="_blank" rel="noopener noreferrer">Messenger</a>
          {zaloUrl && <a href={zaloUrl} target="_blank" rel="noopener noreferrer">Zalo: {prettyPhone(shop.zalo)}</a>}
          {telUrl && <a href={telUrl}>Điện thoại: {prettyPhone(shop.phone)}</a>}
          {shop.email && <a href={`mailto:${shop.email}`}>Email: {shop.email}</a>}
          {shop.address && <span>Địa chỉ: {shop.address}</span>}
          {shop.owner && <span>Phụ trách: {shop.owner}</span>}
          <span>Hỗ trợ: {shop.hours}</span>
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} {shop.name} · {shop.domain}</div>
    </footer>
  );
}

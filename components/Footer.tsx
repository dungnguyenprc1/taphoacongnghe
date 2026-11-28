import Link from "next/link";
import { shop, zaloUrl, telUrl, prettyPhone } from "@/lib/config";
import { policies } from "@/data/policies";
import { categories } from "@/data/products";
import { Bolt, Phone, Chat, Clock } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer" id="lien-he">
      {/* Dải hotline nền navy */}
      <div className="footer-top">
        <div className="container footer-hotlines">
          {telUrl && (
            <a href={telUrl} className="hotline">
              <span className="hotline-icon"><Phone /></span>
              <span><small>Hotline / Zalo</small><b>{prettyPhone(shop.phone)}</b></span>
            </a>
          )}
          <a href={shop.messenger} target="_blank" rel="noopener noreferrer" className="hotline">
            <span className="hotline-icon"><Chat /></span>
            <span><small>Nhắn tin đặt hàng</small><b>Messenger</b></span>
          </a>
          <div className="hotline">
            <span className="hotline-icon"><Clock /></span>
            <span><small>Giờ hỗ trợ</small><b>{shop.hours}</b></span>
          </div>
        </div>
      </div>

      <div className="container footer-grid">
        <div className="footer-col">
          <h4>Thông tin</h4>
          <Link href="/" className="logo footer-logo">
            <span className="logo-mark"><Bolt size={18} /></span> {shop.name}
          </Link>
          <p>{shop.tagline}</p>
          {shop.owner && <span>Phụ trách: {shop.owner}</span>}
          {telUrl && <a href={telUrl}>Điện thoại: {prettyPhone(shop.phone)}</a>}
          {shop.email && <a href={`mailto:${shop.email}`}>Email: {shop.email}</a>}
          {shop.address && <span>Địa chỉ: {shop.address}</span>}
        </div>
        <div className="footer-col">
          <h4>Danh mục</h4>
          {categories.slice(1).map((c) => (
            <Link key={c.id} href={`/?cat=${c.id}#san-pham`}>{c.label}</Link>
          ))}
        </div>
        <div className="footer-col">
          <h4>Chính sách</h4>
          {policies.map((p) => <Link key={p.slug} href={`/${p.slug}`}>{p.title}</Link>)}
        </div>
        <div className="footer-col">
          <h4>Theo dõi chúng tôi</h4>
          <a href={shop.facebook} target="_blank" rel="noopener noreferrer">Fanpage Facebook</a>
          <a href={shop.messenger} target="_blank" rel="noopener noreferrer">Messenger</a>
          {zaloUrl && <a href={zaloUrl} target="_blank" rel="noopener noreferrer">Zalo: {prettyPhone(shop.zalo)}</a>}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">© {new Date().getFullYear()} {shop.name} · {shop.domain}</div>
      </div>
    </footer>
  );
}

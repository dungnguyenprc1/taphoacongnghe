import Link from "next/link";
import { shop, zaloUrl, telUrl, prettyPhone } from "@/lib/config";
import { categories } from "@/data/products";
import { policies } from "@/data/policies";
import { Bolt, Menu } from "./Icons";
import SearchBox from "./SearchBox";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="logo">
            <span className="logo-mark"><Bolt size={22} /></span>
            <span className="logo-text">{shop.name}</span>
          </Link>
          <NavLinks />
          <SearchBox className="search search-dark" placeholder="Tìm sản phẩm..." />
          <details className="mobile-menu">
            <summary aria-label="Mở menu"><Menu /></summary>
            <nav className="mobile-menu-panel">
              <p className="menu-title">Danh mục</p>
              {categories.slice(1).map((c) => (
                <Link key={c.id} href={`/?cat=${c.id}#san-pham`}>{c.label}</Link>
              ))}
              <p className="menu-title">Hỗ trợ</p>
              {policies.filter((p) => ["huong-dan-mua-hang", "chinh-sach-doi-tra", "chinh-sach-bao-hanh"].includes(p.slug)).map((p) => (
                <Link key={p.slug} href={`/${p.slug}`}>{p.title}</Link>
              ))}
              <p className="menu-title">Liên hệ</p>
              <a href={shop.messenger} target="_blank" rel="noopener noreferrer">Nhắn Messenger</a>
              {zaloUrl && <a href={zaloUrl} target="_blank" rel="noopener noreferrer">Chat Zalo</a>}
              {telUrl && <a href={telUrl}>Gọi {prettyPhone(shop.phone)}</a>}
            </nav>
          </details>
        </div>
      </header>
      <div className="mobile-search container">
        <SearchBox className="search search-light" placeholder="Tìm pin, củ sạc, cáp..." />
      </div>
    </>
  );
}

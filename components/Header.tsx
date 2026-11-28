import Link from "next/link";
import { shop, zaloUrl, telUrl, prettyPhone } from "@/lib/config";
import { categories } from "@/data/products";
import { Bolt, Menu } from "./Icons";
import SearchBox from "./SearchBox";

export default function Header() {
  return (
    <>
      <div className="topbar">
        <span className="topbar-full">{shop.policies.join(" · ")}</span>
        <span className="topbar-short">{shop.policies.slice(0, 2).join(" · ")}</span>
      </div>
      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="logo">
            <Bolt size={26} className="logo-bolt" /> {shop.name}
          </Link>
          <SearchBox className="search search-dark" placeholder="Tìm pin dự phòng, củ sạc, cáp..." />
          <div className="header-actions">
            {zaloUrl && (
              <a className="btn btn-zalo" href={zaloUrl} target="_blank" rel="noopener noreferrer">Chat Zalo</a>
            )}
            <a className="btn btn-primary" href={shop.messenger} target="_blank" rel="noopener noreferrer">Nhắn Messenger</a>
          </div>
          <details className="mobile-menu">
            <summary aria-label="Mở menu"><Menu /></summary>
            <nav className="mobile-menu-panel">
              <p className="menu-title">Danh mục</p>
              {categories.slice(1).map((c) => (
                <Link key={c.id} href={`/?cat=${c.id}#san-pham`}>{c.label}</Link>
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

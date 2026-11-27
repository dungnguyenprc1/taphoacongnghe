import type { Metadata } from "next";
import Link from "next/link";
import { shop } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${shop.name} – ${shop.tagline}`, template: `%s | ${shop.name}` },
  description: "Phụ kiện công nghệ giá kho: pin dự phòng, củ sạc nhanh, cáp sạc, mic không dây. Ship COD toàn quốc.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <header className="header">
          <div className="container header-inner">
            <Link href="/" className="logo">
              <span className="bolt">⚡</span> {shop.name}
            </Link>
            <a className="btn btn-primary btn-sm" href={shop.messenger} target="_blank" rel="noopener noreferrer">
              Nhắn tin
            </a>
          </div>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div className="container">
            <p><strong>{shop.name}</strong> · {shop.tagline}</p>
            <ul>
              {shop.policies.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <p>
              <a href={shop.facebook} target="_blank" rel="noopener noreferrer">Fanpage Facebook</a>
              {shop.phone && <> · Hotline: {shop.phone}</>}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

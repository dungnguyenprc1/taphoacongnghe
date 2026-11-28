import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { shop, zaloUrl } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(`https://www.${shop.domain}`),
  title: { default: `${shop.name} – ${shop.tagline}`, template: `%s | ${shop.name}` },
  description: "Phụ kiện công nghệ giá kho: pin dự phòng, củ sạc nhanh, cáp sạc, mic không dây. Ship COD toàn quốc.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={inter.className}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        {/* Thanh liên hệ cố định ở đáy màn hình điện thoại */}
        <div className="mobile-bar">
          {zaloUrl && <a className="btn btn-zalo" href={zaloUrl} target="_blank" rel="noopener noreferrer">Chat Zalo</a>}
          <a className="btn btn-primary" href={shop.messenger} target="_blank" rel="noopener noreferrer">Messenger</a>
        </div>
      </body>
    </html>
  );
}

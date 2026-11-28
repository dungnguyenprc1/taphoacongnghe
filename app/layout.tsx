import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { shop, zaloUrl, siteUrl, telUrl } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: { default: `${shop.name} – ${shop.tagline}`, template: `%s | ${shop.name}` },
  description: "Phụ kiện công nghệ giá kho: pin dự phòng, củ sạc nhanh, cáp sạc, mic không dây. Ship COD toàn quốc.",
};

// Thông tin cửa hàng cho Google (tên, web, số điện thoại, Facebook).
const storeJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: shop.name,
  url: siteUrl,
  image: `${siteUrl}/icon.svg`,
  ...(telUrl && { telephone: shop.phone }),
  sameAs: [shop.facebook],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={inter.className}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }} />
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

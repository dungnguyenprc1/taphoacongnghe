import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { getCategories } from "@/lib/queries";

// Pages read live data (stock, sold count) from SQLite on every request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "techzone – Điện thoại, Laptop, Phụ kiện chính hãng",
  description: "Cửa hàng điện thoại, laptop, tablet, phụ kiện – dự án demo Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <CartProvider>
          <Header categories={getCategories()} />
          <main className="container">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

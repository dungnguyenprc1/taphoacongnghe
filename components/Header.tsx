"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Category } from "@/lib/types";
import { useCart } from "./CartProvider";

export default function Header({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const { count } = useCart();
  const [q, setQ] = useState("");

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header className="header">
      <div className="topbar">
        <div className="container">Thu cũ đổi mới – Trợ giá đến 3 triệu · Trả góp 0% · Giao nhanh 2 giờ</div>
      </div>
      <div className="container header-main">
        <Link href="/" className="logo">
          <span className="logo-mark">TZ</span>
          <span>techzone</span>
        </Link>
        <form className="search" onSubmit={onSearch}>
          <span>🔍</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Bạn tìm gì..." />
        </form>
        <Link href="/orders/lookup" className="header-btn location">
          📦 Tra cứu đơn
        </Link>
        <Link href="/cart" className="header-btn">
          🛒 Giỏ hàng {count > 0 && <b className="badge">{count}</b>}
        </Link>
        <span className="header-btn location">📍 Hồ Chí Minh</span>
      </div>
      <nav className="container nav">
        {categories.map((c) => (
          <Link key={c.slug} href={`/category/${c.slug}`}>
            <span>{c.icon}</span> {c.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}

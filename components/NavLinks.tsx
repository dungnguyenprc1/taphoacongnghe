"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/data/products";

const links = [
  { key: "home", href: "/", label: "Trang chủ" },
  ...categories.slice(1).map((c) => ({ key: c.id, href: `/?cat=${c.id}#san-pham`, label: c.short })),
  { key: "contact", href: "#lien-he", label: "Liên hệ" },
];

function Links({ active }: { active: string }) {
  return (
    <>
      {links.map((l) => (
        <Link key={l.key} href={l.href} className={l.key === active ? "nav-link active" : "nav-link"}>
          {l.label}
        </Link>
      ))}
    </>
  );
}

function ActiveLinks() {
  const path = usePathname();
  const cat = useSearchParams().get("cat");
  const active = path !== "/" ? "" : cat ?? "home";
  return <Links active={active} />;
}

// Menu chính trên máy tính: chữ in hoa, mục đang xem tô xanh và gạch chân.
export default function NavLinks() {
  return (
    <nav className="main-nav" aria-label="Danh mục">
      <Suspense fallback={<Links active="" />}>
        <ActiveLinks />
      </Suspense>
    </nav>
  );
}

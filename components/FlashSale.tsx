"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

const pad = (n: number) => String(n).padStart(2, "0");

export default function FlashSale({ items }: { items: Product[] }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(24, 0, 0, 0);
      setLeft(Math.floor((end.getTime() - now.getTime()) / 1000));
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const h = left == null ? "--" : pad(Math.floor(left / 3600));
  const m = left == null ? "--" : pad(Math.floor((left % 3600) / 60));
  const s = left == null ? "--" : pad(left % 60);

  return (
    <section className="box flash">
      <div className="flash-head">
        <h2>⚡ FLASH SALE GIÁ SỐC</h2>
        <div className="countdown">
          Kết thúc trong <b>{h}</b>:<b>{m}</b>:<b>{s}</b>
        </div>
      </div>
      <div className="row-scroll">
        {items.map((p) => (
          <ProductCard key={p.id} p={p} flash />
        ))}
      </div>
    </section>
  );
}

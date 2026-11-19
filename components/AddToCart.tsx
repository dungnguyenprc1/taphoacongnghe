"use client";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";

export default function AddToCart({ id }: { id: string }) {
  const { add } = useCart();
  const router = useRouter();
  return (
    <div className="buy-btns">
      <button
        className="btn-buy"
        onClick={() => {
          add(id);
          router.push("/cart");
        }}
      >
        MUA NGAY
        <small>Giao nhanh 2 giờ hoặc nhận tại cửa hàng</small>
      </button>
      <button className="btn-cart" onClick={() => add(id)}>
        🛒 Thêm vào giỏ
      </button>
    </div>
  );
}

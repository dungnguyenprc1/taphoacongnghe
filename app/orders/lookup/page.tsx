"use client";
import { useState, type FormEvent } from "react";
import { formatPrice, orderStatusLabel, paymentLabel } from "@/lib/format";
import type { Order } from "@/lib/types";

export default function OrderLookupPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const res = await fetch("/api/orders/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: form.get("code"), phone: form.get("phone") }),
      });
      const json = await res.json();
      if (res.ok) setOrder(json.data);
      else setError(json.error ?? "Không tìm thấy đơn hàng");
    } catch {
      setError("Không kết nối được máy chủ, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="box cart">
      <h1 className="box-title">Tra cứu đơn hàng</h1>
      <form className="checkout lookup" onSubmit={onSubmit}>
        <label className="field">
          <span>Mã đơn hàng</span>
          <input name="code" placeholder="VD: TZ261115012345" required />
        </label>
        <label className="field">
          <span>Số điện thoại đặt hàng</span>
          <input name="phone" type="tel" required />
        </label>
        <button className="btn-buy" disabled={loading}>{loading ? "ĐANG TÌM..." : "TRA CỨU"}</button>
      </form>
      {error && <p className="form-error">{error}</p>}

      {order && (
        <div className="order-detail">
          <div className="order-head">
            <b className="order-code">{order.code}</b>
            <span className={`status ${order.status}`}>{orderStatusLabel[order.status]}</span>
          </div>
          <p className="muted">
            Đặt lúc {new Date(order.createdAt).toLocaleString("vi-VN")} · {paymentLabel[order.paymentMethod]}
          </p>
          <p>
            {order.customerName} · {order.address}
          </p>
          <table className="spec-table">
            <tbody>
              {order.items.map((i) => (
                <tr key={i.productId}>
                  <td>{i.name} × {i.qty}</td>
                  <td className="right">{formatPrice(i.price * i.qty)}</td>
                </tr>
              ))}
              <tr>
                <td><b>Tổng cộng</b></td>
                <td className="right price">{formatPrice(order.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

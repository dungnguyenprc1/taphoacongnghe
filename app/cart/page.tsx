"use client";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useCart } from "@/components/CartProvider";
import { formatPrice, paymentLabel } from "@/lib/format";
import type { Order, PaymentMethod, Product } from "@/lib/types";

type FieldErrors = Partial<Record<"customerName" | "phone" | "address" | "note" | "paymentMethod" | "items", string>>;

export default function CartPage() {
  const { items, setQty, clear, loaded } = useCart();
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<FieldErrors>({});
  const [order, setOrder] = useState<Order | null>(null);

  const ids = items.map((i) => i.id).join(",");
  useEffect(() => {
    if (!ids) return;
    setFetching(true);
    fetch(`/api/products?ids=${ids}`)
      .then((r) => r.json())
      .then(({ data }: { data: Product[] }) => setProducts(Object.fromEntries(data.map((p) => [p.id, p]))))
      .finally(() => setFetching(false));
  }, [ids]);

  const rows = items.filter((i) => products[i.id]).map((i) => ({ ...i, p: products[i.id] }));
  const total = rows.reduce((s, r) => s + r.p.price * r.qty, 0);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setSubmitting(true);
    setError("");
    setFields({});
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.get("customerName"),
          phone: form.get("phone"),
          address: form.get("address"),
          note: form.get("note"),
          paymentMethod: form.get("paymentMethod"),
          items: rows.map((r) => ({ id: r.id, qty: r.qty })),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Đặt hàng thất bại");
        setFields(json.fields ?? {});
        return;
      }
      clear();
      setOrder(json.data);
    } catch {
      setError("Không kết nối được máy chủ, vui lòng thử lại");
    } finally {
      setSubmitting(false);
    }
  };

  if (order)
    return (
      <section className="box cart-empty">
        <div className="big">🎉</div>
        <h2>Đặt hàng thành công!</h2>
        <p>
          Mã đơn hàng: <b className="order-code">{order.code}</b>
        </p>
        <p>
          Tổng tiền: <b className="price">{formatPrice(order.total)}</b> · {paymentLabel[order.paymentMethod]}
        </p>
        <p className="muted">Dùng mã đơn và số điện thoại để tra cứu trạng thái đơn hàng.</p>
        <div className="actions">
          <Link href="/orders/lookup" className="btn-cart pad">Tra cứu đơn</Link>
          <Link href="/" className="btn-buy small">Tiếp tục mua sắm</Link>
        </div>
      </section>
    );

  if (!loaded || (items.length > 0 && fetching && !rows.length))
    return <section className="box cart-empty muted">Đang tải giỏ hàng...</section>;

  if (!rows.length)
    return (
      <section className="box cart-empty">
        <div className="big">🛒</div>
        <h2>Giỏ hàng trống</h2>
        <Link href="/" className="btn-buy small">Về trang chủ</Link>
      </section>
    );

  return (
    <section className="box cart">
      <h1 className="box-title">Giỏ hàng</h1>
      {rows.map(({ id, qty, p }) => (
        <div key={id} className="cart-row">
          <div className="cart-thumb" style={{ background: p.color }}>{p.icon}</div>
          <Link href={`/product/${id}`} className="cart-name">
            {p.name}
            {qty > p.stock && <small className="warn">Chỉ còn {p.stock} sản phẩm</small>}
          </Link>
          <div className="qty">
            <button onClick={() => setQty(id, qty - 1)}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(id, Math.min(qty + 1, p.stock))}>+</button>
          </div>
          <div className="price">{formatPrice(p.price * qty)}</div>
          <button className="remove" onClick={() => setQty(id, 0)}>Xóa</button>
        </div>
      ))}
      <div className="cart-total">
        <span>Tạm tính:</span> <b className="price">{formatPrice(total)}</b>
      </div>

      <form className="checkout" onSubmit={onSubmit} noValidate>
        <h2>Thông tin nhận hàng</h2>
        <Field name="customerName" label="Họ và tên" error={fields.customerName} autoComplete="name" />
        <Field name="phone" label="Số điện thoại" error={fields.phone} type="tel" autoComplete="tel" />
        <Field name="address" label="Địa chỉ nhận hàng" error={fields.address} autoComplete="street-address" />
        <Field name="note" label="Ghi chú (không bắt buộc)" error={fields.note} />
        <fieldset>
          <legend>Phương thức thanh toán</legend>
          {(Object.keys(paymentLabel) as PaymentMethod[]).map((m, i) => (
            <label key={m} className="radio">
              <input type="radio" name="paymentMethod" value={m} defaultChecked={i === 0} /> {paymentLabel[m]}
            </label>
          ))}
        </fieldset>
        {error && <p className="form-error">{fields.items ?? error}</p>}
        <button className="btn-buy" disabled={submitting}>
          {submitting ? "ĐANG ĐẶT HÀNG..." : "ĐẶT HÀNG"}
        </button>
      </form>
    </section>
  );
}

function Field({ name, label, error, type = "text", autoComplete }: {
  name: string;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input name={name} type={type} autoComplete={autoComplete} aria-invalid={!!error} />
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

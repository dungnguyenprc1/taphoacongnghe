import type { CreateOrderInput, PaymentMethod, ProductSort } from "./types";

export const normalizePhone = (s: string) => s.replace(/[\s.-]/g, "");

const PHONE_RE = /^(0|\+84)\d{9}$/;
const PAYMENT_METHODS: PaymentMethod[] = ["cod", "bank_transfer"];
const SORTS: ProductSort[] = ["asc", "desc", "discount"];

export const parseSort = (s: string | null | undefined): ProductSort | undefined =>
  SORTS.includes(s as ProductSort) ? (s as ProductSort) : undefined;

type Result<T> = { ok: true; data: T } | { ok: false; errors: Record<string, string> };

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export function validateOrderInput(body: unknown): Result<CreateOrderInput> {
  const b = (body ?? {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const customerName = str(b.customerName);
  const phone = normalizePhone(str(b.phone));
  const address = str(b.address);
  const note = str(b.note);
  const paymentMethod = b.paymentMethod as PaymentMethod;

  if (customerName.length < 2 || customerName.length > 100) errors.customerName = "Vui lòng nhập họ tên";
  if (!PHONE_RE.test(phone)) errors.phone = "Số điện thoại không hợp lệ";
  if (address.length < 5 || address.length > 300) errors.address = "Vui lòng nhập địa chỉ nhận hàng";
  if (note.length > 500) errors.note = "Ghi chú tối đa 500 ký tự";
  if (!PAYMENT_METHODS.includes(paymentMethod)) errors.paymentMethod = "Phương thức thanh toán không hợp lệ";

  const rawItems = Array.isArray(b.items) ? b.items : [];
  const merged = new Map<string, number>();
  for (const it of rawItems as Record<string, unknown>[]) {
    const id = String(it?.id ?? "");
    const qty = Number(it?.qty);
    if (!/^\d+$/.test(id) || !Number.isInteger(qty) || qty < 1 || qty > 50) {
      errors.items = "Giỏ hàng không hợp lệ";
      break;
    }
    merged.set(id, (merged.get(id) ?? 0) + qty);
  }
  if (!merged.size) errors.items ??= "Giỏ hàng trống";
  if (merged.size > 50) errors.items = "Quá nhiều sản phẩm trong một đơn";

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    data: {
      customerName,
      phone,
      address,
      note,
      paymentMethod,
      items: [...merged].map(([id, qty]) => ({ id, qty })),
    },
  };
}

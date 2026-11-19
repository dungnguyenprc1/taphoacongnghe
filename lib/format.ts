import type { OrderStatus, PaymentMethod, Product } from "./types";

export const formatPrice = (n: number) => n.toLocaleString("vi-VN") + "₫";
export const discount = (p: Product) => Math.round((1 - p.price / p.oldPrice) * 100);

export const orderStatusLabel: Record<OrderStatus, string> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  shipping: "Đang giao",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

export const paymentLabel: Record<PaymentMethod, string> = {
  cod: "Thanh toán khi nhận hàng",
  bank_transfer: "Chuyển khoản ngân hàng",
};

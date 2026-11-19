export type Category = { slug: string; name: string; icon: string };

export type Product = {
  id: string;
  category: string;
  name: string;
  oldPrice: number;
  price: number;
  icon: string;
  rating: number;
  specs: string[];
  color: string;
  sold: number;
  stock: number;
  installment: boolean;
  gift: string | null;
};

export type ProductSort = "asc" | "desc" | "discount";

export type PaymentMethod = "cod" | "bank_transfer";

export type OrderStatus = "pending" | "confirmed" | "shipping" | "completed" | "cancelled";

export type OrderItem = { productId: string; name: string; price: number; qty: number };

export type Order = {
  code: string;
  customerName: string;
  phone: string;
  address: string;
  note: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  total: number;
  createdAt: string;
  items: OrderItem[];
};

export type CreateOrderInput = {
  customerName: string;
  phone: string;
  address: string;
  note?: string;
  paymentMethod: PaymentMethod;
  items: { id: string; qty: number }[];
};

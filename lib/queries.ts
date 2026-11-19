import { randomInt } from "node:crypto";
import { getDb } from "./db";
import { normalizePhone } from "./validation";
import type { Category, CreateOrderInput, Order, OrderItem, Product, ProductSort } from "./types";

type ProductRow = {
  id: number;
  category: string;
  name: string;
  price: number;
  old_price: number;
  icon: string;
  rating: number;
  specs: string;
  color: string;
  sold: number;
  stock: number;
  installment: number;
  gift: string | null;
};

type OrderRow = {
  id: number;
  code: string;
  customer_name: string;
  phone: string;
  address: string;
  note: string;
  payment_method: Order["paymentMethod"];
  status: Order["status"];
  total: number;
  created_at: string;
};

const toProduct = (r: ProductRow): Product => ({
  id: String(r.id),
  category: r.category,
  name: r.name,
  price: r.price,
  oldPrice: r.old_price,
  icon: r.icon,
  rating: r.rating,
  specs: JSON.parse(r.specs),
  color: r.color,
  sold: r.sold,
  stock: r.stock,
  installment: r.installment === 1,
  gift: r.gift,
});

// ---------- Categories ----------

export function getCategories(): Category[] {
  return getDb().prepare("SELECT slug, name, icon FROM categories ORDER BY position").all() as Category[];
}

export function getCategory(slug: string): Category | undefined {
  return getDb().prepare("SELECT slug, name, icon FROM categories WHERE slug = ?").get(slug) as Category | undefined;
}

// ---------- Products ----------

export type ProductFilter = {
  category?: string;
  q?: string;
  ids?: string[];
  sort?: ProductSort;
  limit?: number;
};

const orderBy: Record<ProductSort, string> = {
  asc: "price ASC",
  desc: "price DESC",
  discount: "(1.0 * price / old_price) ASC",
};

export function getProducts({ category, q, ids, sort, limit }: ProductFilter = {}): Product[] {
  const where: string[] = [];
  const params: (string | number)[] = [];

  if (category) {
    where.push("category = ?");
    params.push(category);
  }
  if (q) {
    where.push("name LIKE ? ESCAPE '\\'");
    params.push(`%${q.replace(/[\\%_]/g, (c) => "\\" + c)}%`);
  }
  if (ids) {
    const numeric = ids.map(Number).filter(Number.isInteger);
    if (!numeric.length) return [];
    where.push(`id IN (${numeric.map(() => "?").join(",")})`);
    params.push(...numeric);
  }

  let sql = "SELECT * FROM products";
  if (where.length) sql += " WHERE " + where.join(" AND ");
  sql += " ORDER BY " + (sort ? orderBy[sort] : "id ASC");
  if (limit) {
    sql += " LIMIT ?";
    params.push(limit);
  }

  return (getDb().prepare(sql).all(...params) as ProductRow[]).map(toProduct);
}

export function getProduct(id: string): Product | undefined {
  const row = getDb().prepare("SELECT * FROM products WHERE id = ?").get(Number(id)) as ProductRow | undefined;
  return row && toProduct(row);
}

// ---------- Orders ----------

export class OrderError extends Error {}

function newOrderCode() {
  const d = new Date();
  const ymd = `${d.getFullYear() % 100}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `TZ${ymd}${String(randomInt(0, 1_000_000)).padStart(6, "0")}`;
}

export function createOrder(input: CreateOrderInput): Order {
  const db = getDb();
  const getRow = db.prepare("SELECT * FROM products WHERE id = ?");
  const insertOrder = db.prepare(`
    INSERT INTO orders (code, customer_name, phone, address, note, payment_method, total)
    VALUES (@code, @customerName, @phone, @address, @note, @paymentMethod, @total)
  `);
  const insertItem = db.prepare(
    "INSERT INTO order_items (order_id, product_id, name, price, qty) VALUES (?, ?, ?, ?, ?)",
  );
  const takeStock = db.prepare(
    "UPDATE products SET stock = stock - ?, sold = sold + ? WHERE id = ? AND stock >= ?",
  );

  const code = db.transaction(() => {
    // Prices always come from the database, never from the client.
    const items: OrderItem[] = input.items.map(({ id, qty }) => {
      const row = getRow.get(Number(id)) as ProductRow | undefined;
      if (!row) throw new OrderError(`Sản phẩm #${id} không tồn tại`);
      const res = takeStock.run(qty, qty, row.id, qty);
      if (res.changes === 0) throw new OrderError(`"${row.name}" chỉ còn ${row.stock} sản phẩm`);
      return { productId: String(row.id), name: row.name, price: row.price, qty };
    });

    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    const code = newOrderCode();
    const { lastInsertRowid } = insertOrder.run({ ...input, note: input.note ?? "", code, total });
    for (const i of items) insertItem.run(lastInsertRowid, Number(i.productId), i.name, i.price, i.qty);
    return code;
  })();

  return getOrder(code)!;
}

export function getOrder(code: string): Order | undefined {
  const row = getDb().prepare("SELECT * FROM orders WHERE code = ?").get(code) as OrderRow | undefined;
  if (!row) return undefined;
  const items = getDb()
    .prepare("SELECT product_id AS productId, name, price, qty FROM order_items WHERE order_id = ? ORDER BY id")
    .all(row.id) as (Omit<OrderItem, "productId"> & { productId: number })[];

  return {
    code: row.code,
    customerName: row.customer_name,
    phone: row.phone,
    address: row.address,
    note: row.note,
    paymentMethod: row.payment_method,
    status: row.status,
    total: row.total,
    createdAt: row.created_at,
    items: items.map((i) => ({ ...i, productId: String(i.productId) })),
  };
}

// Customers look up an order with its code plus the phone number used to place it.
export function findOrderForCustomer(code: string, phone: string): Order | undefined {
  const order = getOrder(code.trim().toUpperCase());
  return order && order.phone === normalizePhone(phone) ? order : undefined;
}

import type { InValue, Row } from "@libsql/client";
import { randomInt } from "node:crypto";
import { getDb } from "./db";
import { normalizePhone } from "./validation";
import type { Category, CreateOrderInput, Order, OrderItem, Product, ProductSort } from "./types";

// libsql rows are array-like objects; read columns by name and convert to plain values.
const toCategory = (r: Row): Category => ({
  slug: String(r.slug),
  name: String(r.name),
  icon: String(r.icon),
});

const toProduct = (r: Row): Product => ({
  id: String(r.id),
  category: String(r.category),
  name: String(r.name),
  price: Number(r.price),
  oldPrice: Number(r.old_price),
  icon: String(r.icon),
  rating: Number(r.rating),
  specs: JSON.parse(String(r.specs)),
  color: String(r.color),
  sold: Number(r.sold),
  stock: Number(r.stock),
  installment: Number(r.installment) === 1,
  gift: r.gift == null ? null : String(r.gift),
});

// ---------- Categories ----------

export async function getCategories(): Promise<Category[]> {
  const { rows } = await getDb().execute("SELECT slug, name, icon FROM categories ORDER BY position");
  return rows.map(toCategory);
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  const { rows } = await getDb().execute({
    sql: "SELECT slug, name, icon FROM categories WHERE slug = ?",
    args: [slug],
  });
  return rows[0] && toCategory(rows[0]);
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

export async function getProducts({ category, q, ids, sort, limit }: ProductFilter = {}): Promise<Product[]> {
  const where: string[] = [];
  const args: InValue[] = [];

  if (category) {
    where.push("category = ?");
    args.push(category);
  }
  if (q) {
    where.push("name LIKE ? ESCAPE '\\'");
    args.push(`%${q.replace(/[\\%_]/g, (c) => "\\" + c)}%`);
  }
  if (ids) {
    const numeric = ids.map(Number).filter(Number.isInteger);
    if (!numeric.length) return [];
    where.push(`id IN (${numeric.map(() => "?").join(",")})`);
    args.push(...numeric);
  }

  let sql = "SELECT * FROM products";
  if (where.length) sql += " WHERE " + where.join(" AND ");
  sql += " ORDER BY " + (sort ? orderBy[sort] : "id ASC");
  if (limit) {
    sql += " LIMIT ?";
    args.push(limit);
  }

  const { rows } = await getDb().execute({ sql, args });
  return rows.map(toProduct);
}

export async function getProduct(id: string): Promise<Product | undefined> {
  const n = Number(id);
  if (!Number.isInteger(n)) return undefined;
  const { rows } = await getDb().execute({ sql: "SELECT * FROM products WHERE id = ?", args: [n] });
  return rows[0] && toProduct(rows[0]);
}

// ---------- Orders ----------

export class OrderError extends Error {}

function newOrderCode() {
  const d = new Date();
  const ymd = `${d.getFullYear() % 100}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `TZ${ymd}${String(randomInt(0, 1_000_000)).padStart(6, "0")}`;
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const tx = await getDb().transaction("write");
  let code: string;
  try {
    // Prices always come from the database, never from the client.
    const items: OrderItem[] = [];
    for (const { id, qty } of input.items) {
      const { rows } = await tx.execute({ sql: "SELECT id, name, price, stock FROM products WHERE id = ?", args: [Number(id)] });
      const row = rows[0];
      if (!row) throw new OrderError(`Sản phẩm #${id} không tồn tại`);
      const res = await tx.execute({
        sql: "UPDATE products SET stock = stock - ?, sold = sold + ? WHERE id = ? AND stock >= ?",
        args: [qty, qty, Number(row.id), qty],
      });
      if (res.rowsAffected === 0) throw new OrderError(`"${row.name}" chỉ còn ${row.stock} sản phẩm`);
      items.push({ productId: String(row.id), name: String(row.name), price: Number(row.price), qty });
    }

    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    code = newOrderCode();
    const { lastInsertRowid } = await tx.execute({
      sql: `INSERT INTO orders (code, customer_name, phone, address, note, payment_method, total)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [code, input.customerName, input.phone, input.address, input.note ?? "", input.paymentMethod, total],
    });
    for (const i of items) {
      await tx.execute({
        sql: "INSERT INTO order_items (order_id, product_id, name, price, qty) VALUES (?, ?, ?, ?, ?)",
        args: [lastInsertRowid!, Number(i.productId), i.name, i.price, i.qty],
      });
    }
    await tx.commit();
  } catch (e) {
    await tx.rollback();
    throw e;
  } finally {
    tx.close();
  }

  return (await getOrder(code))!;
}

export async function getOrder(code: string): Promise<Order | undefined> {
  const db = getDb();
  const { rows } = await db.execute({ sql: "SELECT * FROM orders WHERE code = ?", args: [code] });
  const row = rows[0];
  if (!row) return undefined;
  const items = await db.execute({
    sql: "SELECT product_id, name, price, qty FROM order_items WHERE order_id = ? ORDER BY id",
    args: [row.id],
  });

  return {
    code: String(row.code),
    customerName: String(row.customer_name),
    phone: String(row.phone),
    address: String(row.address),
    note: String(row.note),
    paymentMethod: row.payment_method as Order["paymentMethod"],
    status: row.status as Order["status"],
    total: Number(row.total),
    createdAt: String(row.created_at),
    items: items.rows.map((i) => ({
      productId: String(i.product_id),
      name: String(i.name),
      price: Number(i.price),
      qty: Number(i.qty),
    })),
  };
}

// Customers look up an order with its code plus the phone number used to place it.
export async function findOrderForCustomer(code: string, phone: string): Promise<Order | undefined> {
  const order = await getOrder(code.trim().toUpperCase());
  return order && order.phone === normalizePhone(phone) ? order : undefined;
}

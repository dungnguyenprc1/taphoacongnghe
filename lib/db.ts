import { createClient, type Client } from "@libsql/client";

// Turso in production (libsql://... + auth token); a local SQLite file in dev.
export const DATABASE_URL = process.env.TURSO_DATABASE_URL || "file:db/store.sqlite";

export const schema = `
CREATE TABLE IF NOT EXISTS categories (
  slug      TEXT PRIMARY KEY,
  name      TEXT NOT NULL,
  icon      TEXT NOT NULL,
  position  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  category     TEXT NOT NULL REFERENCES categories(slug),
  name         TEXT NOT NULL,
  price        INTEGER NOT NULL CHECK (price >= 0),
  old_price    INTEGER NOT NULL CHECK (old_price >= 0),
  icon         TEXT NOT NULL,
  rating       REAL NOT NULL DEFAULT 0,
  specs        TEXT NOT NULL DEFAULT '[]',
  color        TEXT NOT NULL,
  sold         INTEGER NOT NULL DEFAULT 0,
  stock        INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  installment  INTEGER NOT NULL DEFAULT 0,
  gift         TEXT
);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

CREATE TABLE IF NOT EXISTS orders (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  code            TEXT NOT NULL UNIQUE,
  customer_name   TEXT NOT NULL,
  phone           TEXT NOT NULL,
  address         TEXT NOT NULL,
  note            TEXT NOT NULL DEFAULT '',
  payment_method  TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pending',
  total           INTEGER NOT NULL,
  created_at      TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS order_items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id    INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id  INTEGER NOT NULL REFERENCES products(id),
  name        TEXT NOT NULL,
  price       INTEGER NOT NULL,
  qty         INTEGER NOT NULL CHECK (qty > 0)
);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
`;

// Created lazily so importing this module (e.g. during build) never opens a connection.
// The client lives on globalThis so dev hot reloads reuse it.
const globalForDb = globalThis as unknown as { db?: Client };
export function getDb() {
  return (globalForDb.db ??= createClient({
    url: DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  }));
}

import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { seedCategories, seedProducts } from "./seed";

const DB_PATH = process.env.DATABASE_PATH ?? path.join(process.cwd(), "db", "store.sqlite");

const schema = `
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

function seed(db: Database.Database) {
  const insertCategory = db.prepare(
    "INSERT INTO categories (slug, name, icon, position) VALUES (@slug, @name, @icon, @position)",
  );
  const insertProduct = db.prepare(`
    INSERT INTO products (category, name, price, old_price, icon, rating, specs, color, sold, stock, installment, gift)
    VALUES (@category, @name, @price, @oldPrice, @icon, @rating, @specs, @color, @sold, @stock, @installment, @gift)
  `);

  // IMMEDIATE takes the write lock up front, so concurrent processes can't both seed.
  db.transaction(() => {
    const hasData = db.prepare("SELECT COUNT(*) AS n FROM categories").get() as { n: number };
    if (hasData.n > 0) return;
    seedCategories.forEach((c, position) => insertCategory.run({ ...c, position }));
    for (const p of seedProducts) {
      insertProduct.run({ ...p, specs: JSON.stringify(p.specs), installment: p.installment ? 1 : 0 });
    }
  }).immediate();
}

function open() {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new Database(DB_PATH);
  // Wait instead of failing when another process (e.g. a build worker) holds the lock.
  db.pragma("busy_timeout = 5000");
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.exec(schema);
  seed(db);
  return db;
}

// Opened lazily on first query so importing this module (e.g. during build) never touches the file.
// The connection lives on globalThis so dev hot reloads reuse it.
const globalForDb = globalThis as unknown as { db?: Database.Database };
export function getDb() {
  return (globalForDb.db ??= open());
}

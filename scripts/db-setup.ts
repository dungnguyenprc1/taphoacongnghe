// Creates the tables and loads the sample catalogue if the database is empty.
//   npm run db:setup            -> uses TURSO_DATABASE_URL from .env.local, or the local file
//   npm run db:setup -- --reset -> drops everything first (deletes all orders!)
import { loadEnvConfig } from "@next/env";
import fs from "node:fs";

loadEnvConfig(process.cwd());

async function main() {
  // Imported after env is loaded, since lib/db reads it at import time.
  const { DATABASE_URL, getDb, schema } = await import("../lib/db");
  const { seedCategories, seedProducts } = await import("../lib/seed");

  if (DATABASE_URL.startsWith("file:")) fs.mkdirSync("db", { recursive: true });
  const db = getDb();
  console.log(`Database: ${DATABASE_URL.replace(/\?.*$/, "")}`);

  if (process.argv.includes("--reset")) {
    await db.executeMultiple(`
      DROP TABLE IF EXISTS order_items;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS categories;
    `);
    console.log("Dropped all tables");
  }

  await db.executeMultiple(schema);
  console.log("Schema ready");

  const { rows } = await db.execute("SELECT COUNT(*) AS n FROM categories");
  if (Number(rows[0].n) > 0) {
    console.log("Data already present, skipping seed");
    return;
  }

  await db.batch(
    [
      ...seedCategories.map((c, position) => ({
        sql: "INSERT INTO categories (slug, name, icon, position) VALUES (?, ?, ?, ?)",
        args: [c.slug, c.name, c.icon, position],
      })),
      ...seedProducts.map((p) => ({
        sql: `INSERT INTO products (category, name, price, old_price, icon, rating, specs, color, sold, stock, installment, gift)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          p.category, p.name, p.price, p.oldPrice, p.icon, p.rating, JSON.stringify(p.specs),
          p.color, p.sold, p.stock, p.installment ? 1 : 0, p.gift,
        ],
      })),
    ],
    "write",
  );
  console.log(`Seeded ${seedCategories.length} categories, ${seedProducts.length} products`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

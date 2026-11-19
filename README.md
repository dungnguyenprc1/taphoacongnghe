# taphoacongnghe

Electronics store built with Next.js 16 and Turso (hosted SQLite).

## Run locally

```bash
npm install
npm run db:setup   # creates db/store.sqlite with sample products
npm run dev        # http://localhost:3000
```

Without `TURSO_DATABASE_URL` the app uses the local file `db/store.sqlite`.
`npm run db:setup -- --reset` wipes the database (including orders) and reloads the sample data.

## Deploy to Vercel

1. **Create the Turso database** (free tier is enough):
   ```bash
   brew install tursodatabase/tap/turso
   turso auth login
   turso db create taphoacongnghe
   turso db show taphoacongnghe --url      # -> TURSO_DATABASE_URL
   turso db tokens create taphoacongnghe   # -> TURSO_AUTH_TOKEN
   ```
2. **Load the schema and sample data** into Turso from this machine: put both values in
   `.env.local` (see `.env.example`), then run `npm run db:setup`.
3. **Import the repo on Vercel**: vercel.com → Add New → Project → pick
   `dungnguyenprc1/taphoacongnghe`. Add `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`
   under Environment Variables, then Deploy.
4. **Connect the domain**: Project → Settings → Domains → add `taphoacongnghe.xyz`
   and `www.taphoacongnghe.xyz`, then create the DNS records Vercel shows at your
   domain registrar (usually `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com`).

Every push to `main` redeploys automatically.

## API

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/categories` | Categories |
| GET | `/api/products?category=&q=&sort=asc\|desc\|discount&ids=&limit=` | Product list |
| GET | `/api/products/[id]` | Product detail |
| POST | `/api/orders` | Place an order (prices and stock checked server-side) |
| POST | `/api/orders/lookup` | Find an order by code + phone |

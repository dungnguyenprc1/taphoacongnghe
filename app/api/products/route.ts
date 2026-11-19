import { NextResponse, type NextRequest } from "next/server";
import { getProducts } from "@/lib/queries";
import { parseSort } from "@/lib/validation";

// GET /api/products?category=laptop&q=nova&sort=asc|desc|discount&ids=1,2,3&limit=10
export function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const limit = Number(sp.get("limit"));

  const data = getProducts({
    category: sp.get("category") ?? undefined,
    q: sp.get("q")?.trim() || undefined,
    ids: sp.get("ids")?.split(",").filter(Boolean),
    sort: parseSort(sp.get("sort")),
    limit: Number.isInteger(limit) && limit > 0 ? Math.min(limit, 100) : undefined,
  });

  return NextResponse.json({ data });
}

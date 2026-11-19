import { NextResponse } from "next/server";
import { findOrderForCustomer } from "@/lib/queries";

// POST /api/orders/lookup  { code, phone }
// A POST body keeps the phone number out of URLs and server logs.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { code?: unknown; phone?: unknown } | null;
  const code = typeof body?.code === "string" ? body.code : "";
  const phone = typeof body?.phone === "string" ? body.phone : "";
  if (!code || !phone) {
    return NextResponse.json({ error: "Vui lòng nhập mã đơn hàng và số điện thoại" }, { status: 400 });
  }

  const order = await findOrderForCustomer(code, phone);
  if (!order) return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 });
  return NextResponse.json({ data: order });
}

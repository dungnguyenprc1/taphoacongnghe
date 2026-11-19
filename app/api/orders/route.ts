import { NextResponse } from "next/server";
import { createOrder, OrderError } from "@/lib/queries";
import { validateOrderInput } from "@/lib/validation";

// POST /api/orders  { customerName, phone, address, note?, paymentMethod, items: [{ id, qty }] }
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = validateOrderInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: "Thông tin đặt hàng chưa hợp lệ", fields: parsed.errors }, { status: 400 });
  }

  try {
    const order = createOrder(parsed.data);
    return NextResponse.json({ data: order }, { status: 201 });
  } catch (e) {
    if (e instanceof OrderError) return NextResponse.json({ error: e.message }, { status: 409 });
    throw e;
  }
}

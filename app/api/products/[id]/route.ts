import { NextResponse } from "next/server";
import { getProduct } from "@/lib/queries";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
  return NextResponse.json({ data: product });
}

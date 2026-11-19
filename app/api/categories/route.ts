import { NextResponse } from "next/server";
import { getCategories } from "@/lib/queries";

export async function GET() {
  return NextResponse.json({ data: await getCategories() });
}

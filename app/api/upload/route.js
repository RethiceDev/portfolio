import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAdmin } from "@/lib/auth";
export async function POST(req) {
  if (!isAdmin()) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const file = (await req.formData()).get("file");
  const blob = await put(`projects/${Date.now()}-${(file.name || "img.jpg").replace(/[^\w.-]/g, "_")}`, file, { access: "public" });
  return NextResponse.json({ url: blob.url });
}

import { NextResponse } from "next/server";
import { isAdmin, makeToken } from "@/lib/auth";
export async function GET() { return NextResponse.json({ ok: isAdmin() }); }
export async function POST(req) {
  const { password } = await req.json();
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD)
    return NextResponse.json({ ok: false }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin", makeToken(), { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  return res;
}
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("admin");
  return res;
}

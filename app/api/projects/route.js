import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getProjects, saveProjects } from "@/lib/store";
export const dynamic = "force-dynamic";
const no = () => NextResponse.json({ error: "Non autorisé" }, { status: 401 });
export async function GET() { return NextResponse.json(await getProjects()); }
export async function POST(req) {
  if (!isAdmin()) return no();
  const body = await req.json();
  const all = await getProjects();
  const p = { ...body, id: crypto.randomUUID(), createdAt: Date.now() };
  await saveProjects([p, ...all]);
  return NextResponse.json(p);
}
export async function PUT(req) {
  if (!isAdmin()) return no();
  const body = await req.json();
  const all = await getProjects();
  await saveProjects(all.map((x) => (x.id === body.id ? { ...x, ...body } : x)));
  return NextResponse.json({ ok: true });
}
export async function DELETE(req) {
  if (!isAdmin()) return no();
  const id = new URL(req.url).searchParams.get("id");
  const all = await getProjects();
  await saveProjects(all.filter((x) => x.id !== id));
  return NextResponse.json({ ok: true });
}

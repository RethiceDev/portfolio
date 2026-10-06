import { put, list } from "@vercel/blob";
const KEY = "data/projects.json";
export async function getProjects() {
  try {
    const { blobs } = await list({ prefix: KEY });
    const b = blobs.find((x) => x.pathname === KEY);
    if (!b) return [];
    const r = await fetch(b.url + "?t=" + Date.now(), { cache: "no-store" });
    return await r.json();
  } catch { return []; }
}
export async function saveProjects(p) {
  await put(KEY, JSON.stringify(p), { access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json", cacheControlMaxAge: 0 });
}

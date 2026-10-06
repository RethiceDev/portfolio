import crypto from "crypto";
import { cookies } from "next/headers";
export const makeToken = () =>
  crypto.createHmac("sha256", process.env.AUTH_SECRET || "dev").update(process.env.ADMIN_PASSWORD || "").digest("hex");
export function isAdmin() {
  if (!process.env.ADMIN_PASSWORD) return false;
  const c = cookies().get("admin")?.value;
  return !!c && c === makeToken();
}

// Edge-safe (no Node APIs) so it can be imported from middleware.ts as well as
// server-only code. Uses Web Crypto instead of node:crypto for that reason.

export const STAFF_COOKIE = "staff_session";

export async function getStaffMarker(): Promise<string> {
  const password = process.env.STAFF_PASSWORD ?? "";
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

import { cookies } from "next/headers";
import { STAFF_COOKIE, getStaffMarker } from "@/lib/staffAuth";

export async function requireStaff() {
  const marker = (await cookies()).get(STAFF_COOKIE)?.value;
  const expected = await getStaffMarker();
  if (!marker || marker !== expected) {
    throw new Error("Unauthorized: staff session required");
  }
}

export async function setStaffCookie() {
  const marker = await getStaffMarker();
  (await cookies()).set(STAFF_COOKIE, marker, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function staffSignOut() {
  "use server";
  (await cookies()).delete(STAFF_COOKIE);
}

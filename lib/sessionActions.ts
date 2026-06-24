"use server";

import { cookies } from "next/headers";
import { PROFILE_COOKIE } from "@/lib/profileCookie";

export async function signOut() {
  (await cookies()).delete(PROFILE_COOKIE);
}

import { cookies } from "next/headers";
import { getProfileById, type Profile } from "@/lib/supabase";
import { PROFILE_COOKIE } from "@/lib/profileCookie";

export async function getCurrentProfile(): Promise<Profile | null> {
  const id = (await cookies()).get(PROFILE_COOKIE)?.value;
  if (!id) return null;
  return getProfileById(id);
}

export async function setProfileCookie(profileId: string) {
  (await cookies()).set(PROFILE_COOKIE, profileId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

"use server";

import { redirect } from "next/navigation";
import { createProfile } from "@/lib/supabase";
import { setProfileCookie } from "@/lib/session";

export async function signUp(formData: FormData) {
  const firstInitial = ((formData.get("firstInitial") as string) ?? "").trim().toUpperCase();
  const lastInitial = ((formData.get("lastInitial") as string) ?? "").trim().toUpperCase();
  const phoneLast4 = ((formData.get("phoneLast4") as string) ?? "").trim();

  if (!/^[A-Z]$/.test(firstInitial) || !/^[A-Z]$/.test(lastInitial) || !/^\d{4}$/.test(phoneLast4)) {
    return { success: false as const, error: "Please fill in both initials and 4 digits." };
  }

  const profile = await createProfile(firstInitial, lastInitial, phoneLast4);
  await setProfileCookie(profile.id);
  redirect("/profile");
}

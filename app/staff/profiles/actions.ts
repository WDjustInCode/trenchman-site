"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/staffSession";
import { createProfile, deleteProfile } from "@/lib/supabase";

export async function createProfileAction(formData: FormData) {
  await requireStaff();

  const firstInitial = ((formData.get("firstInitial") as string) ?? "").trim().toUpperCase();
  const lastInitial = ((formData.get("lastInitial") as string) ?? "").trim().toUpperCase();
  const phoneLast4 = ((formData.get("phoneLast4") as string) ?? "").trim();

  if (!/^[A-Z]$/.test(firstInitial) || !/^[A-Z]$/.test(lastInitial) || !/^\d{4}$/.test(phoneLast4)) {
    return { success: false as const, error: "Please fill in both initials and 4 digits." };
  }

  const profile = await createProfile(firstInitial, lastInitial, phoneLast4);
  revalidatePath("/staff/profiles");
  redirect(`/staff/profiles/${profile.id}`);
}

export async function deleteProfileAction(profileId: string) {
  await requireStaff();
  await deleteProfile(profileId);
  revalidatePath("/staff/profiles");
  redirect("/staff/profiles");
}

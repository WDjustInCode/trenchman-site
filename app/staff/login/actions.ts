"use server";

import { redirect } from "next/navigation";
import { setStaffCookie } from "@/lib/staffSession";

export async function staffSignIn(formData: FormData) {
  const password = (formData.get("password") as string) ?? "";

  if (!process.env.STAFF_PASSWORD || password !== process.env.STAFF_PASSWORD) {
    return { success: false as const, error: "Incorrect password." };
  }

  await setStaffCookie();
  redirect("/staff");
}

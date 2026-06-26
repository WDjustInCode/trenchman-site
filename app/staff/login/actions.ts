"use server";

import { redirect } from "next/navigation";
import { setStaffCookie } from "@/lib/staffSession";
import { checkRateLimit, recordFailedAttempt, clearAttempts } from "@/lib/loginRateLimit";

export async function staffSignIn(formData: FormData) {
  const { blocked, minutesLeft } = await checkRateLimit();
  if (blocked) {
    return {
      success: false as const,
      error: `Too many failed attempts. Try again in ${minutesLeft} minute${minutesLeft === 1 ? "" : "s"}.`,
    };
  }

  const password = (formData.get("password") as string) ?? "";

  if (!process.env.STAFF_PASSWORD || password !== process.env.STAFF_PASSWORD) {
    await recordFailedAttempt();
    return { success: false as const, error: "Incorrect password." };
  }

  await clearAttempts();
  await setStaffCookie();
  redirect("/staff");
}

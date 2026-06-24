"use server";

import { redirect } from "next/navigation";
import { findProfiles, getSessionsForProfile } from "@/lib/supabase";
import { setProfileCookie } from "@/lib/session";

export interface SignInCandidate {
  id: string;
  created_at: string;
  trainingTypes: string[];
}

type SignInResult =
  | { status: "not_found" }
  | { status: "error"; error: string }
  | { status: "disambiguate"; candidates: SignInCandidate[] };

export async function signIn(formData: FormData): Promise<SignInResult | void> {
  const firstInitial = ((formData.get("firstInitial") as string) ?? "").trim().toUpperCase();
  const lastInitial = ((formData.get("lastInitial") as string) ?? "").trim().toUpperCase();
  const phoneLast4 = ((formData.get("phoneLast4") as string) ?? "").trim();

  if (!/^[A-Z]$/.test(firstInitial) || !/^[A-Z]$/.test(lastInitial) || !/^\d{4}$/.test(phoneLast4)) {
    return { status: "error", error: "Please fill in both initials and 4 digits." };
  }

  const matches = await findProfiles(firstInitial, lastInitial, phoneLast4);

  if (matches.length === 0) {
    return { status: "not_found" };
  }

  if (matches.length === 1) {
    await setProfileCookie(matches[0].id);
    redirect("/profile");
  }

  const candidates: SignInCandidate[] = await Promise.all(
    matches.map(async (m) => {
      const sessions = await getSessionsForProfile(m.id);
      return {
        id: m.id,
        created_at: m.created_at,
        trainingTypes: Array.from(new Set(sessions.map((s) => s.type))),
      };
    })
  );

  return { status: "disambiguate", candidates };
}

export async function selectProfile(profileId: string) {
  await setProfileCookie(profileId);
  redirect("/profile");
}

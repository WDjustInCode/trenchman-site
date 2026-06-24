import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/session";
import { getSessionsForProfile, type TrainingType } from "@/lib/supabase";
import TrainingSessionList from "@/components/TrainingSessionList";

export const metadata: Metadata = {
  title: "My Profile — Trenchman Academy",
};

const STAT_LABELS: Record<TrainingType, string> = {
  camp: "Camp Sessions",
  group: "Group Sessions",
  solo: "Solo Sessions",
};

export default async function ProfilePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/sign-in");

  const sessions = await getSessionsForProfile(profile.id);
  const counts: Record<TrainingType, number> = { camp: 0, group: 0, solo: 0 };
  for (const session of sessions) counts[session.type]++;

  return (
    <>
      <section className="pt-30 lg:pt-40 px-6 text-center bg-gradient-to-b from-gold/10 to-transparent">
        <div className="w-20 h-20 mx-auto rounded-full border-2 border-gold flex items-center justify-center font-bebas text-gold text-3xl tracking-wider mb-4">
          {profile.first_initial}
          {profile.last_initial}
        </div>
        <p className="font-bebas tracking-widest text-athletic-white/60 text-sm uppercase">
          Member since{" "}
          {new Date(profile.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(Object.keys(STAT_LABELS) as TrainingType[]).map((type) => (
            <div
              key={type}
              className="rounded-lg p-8 border-2 border-gold/40 flex flex-col items-center text-center gap-2"
            >
              <p className="font-rockwell text-gold text-5xl">{counts[type]}</p>
              <p className="font-novecento text-athletic-white tracking-widest uppercase text-sm">
                {STAT_LABELS[type]}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-novecento text-gold text-2xl lg:text-3xl tracking-widest mb-8 uppercase text-center">
          Training History
        </h2>
        <TrainingSessionList sessions={sessions} />
      </section>
    </>
  );
}

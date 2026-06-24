import Link from "next/link";
import { listProfiles } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function StaffProfilesPage() {
  const profiles = await listProfiles();

  return (
    <section className="pt-30 lg:pt-40 px-6 pb-32 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-novecento text-gold text-3xl tracking-widest uppercase">Profiles</h1>
        <Link
          href="/staff/profiles/new"
          className="font-bebas font-bold bg-gold text-deep-black px-5 py-2 rounded hover:bg-gold/80 transition-colors uppercase text-sm tracking-wider"
        >
          + New Profile
        </Link>
      </div>

      {profiles.length === 0 ? (
        <p className="text-athletic-white/40 text-sm text-center py-8">No profiles yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {profiles.map((p) => (
            <Link
              key={p.id}
              href={`/staff/profiles/${p.id}`}
              className="flex items-center justify-between border-2 border-gold/40 rounded-lg px-6 py-5 hover:border-gold transition-colors"
            >
              <p className="font-bebas text-athletic-white text-lg tracking-widest uppercase">
                {p.first_initial}
                {p.last_initial} · {p.phone_last4}
              </p>
              <p className="text-athletic-white/60 text-sm">
                Joined {new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

import Link from "next/link";
import { listProfiles } from "@/lib/supabase";
import { staffSignOut } from "@/lib/staffSession";

export const dynamic = "force-dynamic";

export default async function StaffDashboardPage() {
  const profiles = await listProfiles();

  return (
    <section className="pt-30 lg:pt-40 px-6 pb-32 max-w-4xl mx-auto">
      <div className="flex justify-end mb-4">
        <form action={staffSignOut}>
          <button
            type="submit"
            className="font-bebas text-athletic-white/60 hover:text-gold transition-colors uppercase text-sm tracking-wider"
          >
            Sign Out
          </button>
        </form>
      </div>
      <h1 className="font-rockwell text-4xl md:text-6xl text-athletic-white uppercase mb-12 text-center">
        Staff <span className="text-gold">Dashboard.</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/staff/profiles"
          className="rounded-lg p-8 border-2 border-gold/40 hover:border-gold hover:bg-gold/5 transition-all flex flex-col items-center text-center gap-2"
        >
          <p className="font-rockwell text-gold text-5xl">{profiles.length}</p>
          <p className="font-novecento text-athletic-white tracking-widest uppercase text-sm">
            Athlete Profiles
          </p>
        </Link>
        <Link
          href="/staff/profiles/new"
          className="rounded-lg p-8 border-2 border-gold/40 hover:border-gold hover:bg-gold/5 transition-all flex flex-col items-center justify-center text-center"
        >
          <p className="font-bebas text-gold tracking-widest uppercase text-lg">+ New Profile</p>
        </Link>
      </div>
    </section>
  );
}

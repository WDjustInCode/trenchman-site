import { notFound } from "next/navigation";
import { getProfileById, getSessionsForProfile } from "@/lib/supabase";
import { deleteProfileAction } from "../actions";
import StaffSessionRow from "@/components/StaffSessionRow";
import TrainingSessionForm from "@/app/staff/sessions/TrainingSessionForm";

export const dynamic = "force-dynamic";

export default async function StaffProfileDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await getProfileById(id);
  if (!profile) notFound();

  const sessions = await getSessionsForProfile(id);

  return (
    <section className="pt-30 lg:pt-40 px-6 pb-32 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-novecento text-gold text-3xl tracking-widest uppercase">
          {profile.first_initial}
          {profile.last_initial} · {profile.phone_last4}
        </h1>
        <form action={deleteProfileAction.bind(null, profile.id)}>
          <button
            type="submit"
            className="font-bebas text-red-400 hover:text-red-300 transition-colors uppercase text-sm tracking-wider"
          >
            Delete Profile
          </button>
        </form>
      </div>

      <h2 className="font-novecento text-athletic-white text-xl tracking-widest uppercase mb-4">
        Training Sessions
      </h2>
      <div className="flex flex-col gap-4 mb-12">
        {sessions.length === 0 ? (
          <p className="text-athletic-white/40 text-sm">No sessions logged yet.</p>
        ) : (
          sessions.map((s) => <StaffSessionRow key={s.id} session={s} />)
        )}
      </div>

      <h2 className="font-novecento text-athletic-white text-xl tracking-widest uppercase mb-4">
        Add Session
      </h2>
      <TrainingSessionForm profileId={profile.id} />
    </section>
  );
}

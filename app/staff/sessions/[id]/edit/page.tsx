import { notFound } from "next/navigation";
import { getSessionById } from "@/lib/supabase";
import TrainingSessionForm from "../../TrainingSessionForm";

export const dynamic = "force-dynamic";

export default async function EditSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSessionById(id);
  if (!session) notFound();

  return (
    <section className="pt-30 lg:pt-40 px-6 pb-32 max-w-md mx-auto">
      <h1 className="font-rockwell text-4xl text-athletic-white uppercase mb-8 text-center">
        Edit <span className="text-gold">Session.</span>
      </h1>
      <TrainingSessionForm profileId={session.profile_id} session={session} />
    </section>
  );
}

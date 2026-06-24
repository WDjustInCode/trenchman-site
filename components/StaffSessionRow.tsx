import Link from "next/link";
import type { TrainingSession } from "@/lib/supabase";
import { deleteSessionAction } from "@/app/staff/sessions/actions";

const TYPE_LABELS: Record<TrainingSession["type"], string> = {
  camp: "Camp",
  group: "Group",
  solo: "Solo",
};

const STATUS_LABELS: Record<TrainingSession["attendance_status"], string> = {
  attended: "Attended",
  no_show: "No Show",
  scheduled: "Scheduled",
};

export default function StaffSessionRow({ session }: { session: TrainingSession }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-2 border-gold/40 rounded-lg px-6 py-5 gap-4">
      <div>
        <p className="font-bebas text-gold text-xs tracking-widest uppercase mb-1">
          {TYPE_LABELS[session.type]} Training · {STATUS_LABELS[session.attendance_status]}
        </p>
        <p className="font-bebas text-athletic-white text-lg tracking-widest uppercase">
          {new Date(session.session_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className="text-athletic-white/60 text-sm">
          {[session.location, session.coach_name, session.focus_area].filter(Boolean).join(" · ") || "—"}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href={`/staff/sessions/${session.id}/edit`}
          className="font-bebas text-athletic-white hover:text-gold transition-colors uppercase text-sm tracking-wider"
        >
          Edit
        </Link>
        <form action={deleteSessionAction.bind(null, session.id, session.profile_id)}>
          <button
            type="submit"
            className="font-bebas text-red-400 hover:text-red-300 transition-colors uppercase text-sm tracking-wider"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}

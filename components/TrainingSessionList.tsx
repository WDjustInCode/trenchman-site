import type { TrainingSession } from "@/lib/supabase";

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

export default function TrainingSessionList({ sessions }: { sessions: TrainingSession[] }) {
  if (sessions.length === 0) {
    return (
      <p className="text-athletic-white/40 text-sm text-center py-8">
        No training sessions yet — check back after your first session.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between border-2 border-gold/40 rounded-lg px-6 py-5 gap-4 hover:border-gold transition-colors"
        >
          <div>
            <p className="font-bebas text-gold text-xs tracking-widest uppercase mb-1">
              {TYPE_LABELS[session.type]} Training
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
          <span className="font-bebas text-athletic-white/60 tracking-widest text-sm uppercase">
            {STATUS_LABELS[session.attendance_status]}
          </span>
        </div>
      ))}
    </div>
  );
}

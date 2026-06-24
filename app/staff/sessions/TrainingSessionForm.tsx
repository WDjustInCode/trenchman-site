"use client";

import { useState } from "react";
import { createSessionAction, updateSessionAction } from "./actions";
import type { TrainingSession } from "@/lib/supabase";

const inputClass =
  "bg-white/10 border-2 border-gold/40 rounded px-4 py-3 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold text-sm";

export default function TrainingSessionForm({
  profileId,
  session,
}: {
  profileId: string;
  session?: TrainingSession;
}) {
  const [status, setStatus] = useState<"idle" | "pending">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("pending");
    if (session) {
      await updateSessionAction(session.id, profileId, formData);
    } else {
      await createSessionAction(profileId, formData);
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <select name="type" defaultValue={session?.type ?? "camp"} required className={inputClass}>
        <option value="camp">Camp</option>
        <option value="group">Group</option>
        <option value="solo">Solo</option>
      </select>
      <input
        type="date"
        name="sessionDate"
        defaultValue={session?.session_date ?? ""}
        required
        className={inputClass}
      />
      <input
        type="text"
        name="location"
        placeholder="Location (optional)"
        defaultValue={session?.location ?? ""}
        className={inputClass}
      />
      <input
        type="text"
        name="coachName"
        placeholder="Coach name (optional)"
        defaultValue={session?.coach_name ?? ""}
        className={inputClass}
      />
      <input
        type="text"
        name="focusArea"
        placeholder="Focus area (optional)"
        defaultValue={session?.focus_area ?? ""}
        className={inputClass}
      />
      <textarea
        name="staffNotes"
        placeholder="Staff notes (optional)"
        defaultValue={session?.staff_notes ?? ""}
        rows={3}
        className={`${inputClass} resize-none`}
      />
      <select
        name="attendanceStatus"
        defaultValue={session?.attendance_status ?? "scheduled"}
        required
        className={inputClass}
      >
        <option value="scheduled">Scheduled</option>
        <option value="attended">Attended</option>
        <option value="no_show">No Show</option>
      </select>
      <button
        type="submit"
        disabled={status === "pending"}
        className="font-bebas font-bold bg-gold text-deep-black py-3 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "pending" ? "Saving..." : session ? "Save Changes" : "Add Session"}
      </button>
    </form>
  );
}

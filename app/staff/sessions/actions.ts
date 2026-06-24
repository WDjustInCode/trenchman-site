"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/staffSession";
import {
  createTrainingSession,
  updateTrainingSession,
  deleteTrainingSession,
  type TrainingType,
  type AttendanceStatus,
} from "@/lib/supabase";

function parseSessionFields(formData: FormData) {
  return {
    type: formData.get("type") as TrainingType,
    session_date: formData.get("sessionDate") as string,
    location: ((formData.get("location") as string) || "").trim() || null,
    coach_name: ((formData.get("coachName") as string) || "").trim() || null,
    focus_area: ((formData.get("focusArea") as string) || "").trim() || null,
    staff_notes: ((formData.get("staffNotes") as string) || "").trim() || null,
    attendance_status: formData.get("attendanceStatus") as AttendanceStatus,
  };
}

export async function createSessionAction(profileId: string, formData: FormData) {
  await requireStaff();
  await createTrainingSession({ profile_id: profileId, ...parseSessionFields(formData) });
  revalidatePath(`/staff/profiles/${profileId}`);
  redirect(`/staff/profiles/${profileId}`);
}

export async function updateSessionAction(sessionId: string, profileId: string, formData: FormData) {
  await requireStaff();
  await updateTrainingSession(sessionId, parseSessionFields(formData));
  revalidatePath(`/staff/profiles/${profileId}`);
  redirect(`/staff/profiles/${profileId}`);
}

export async function deleteSessionAction(sessionId: string, profileId: string) {
  await requireStaff();
  await deleteTrainingSession(sessionId);
  revalidatePath(`/staff/profiles/${profileId}`);
  redirect(`/staff/profiles/${profileId}`);
}

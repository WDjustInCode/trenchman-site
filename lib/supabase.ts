import { createClient } from "@supabase/supabase-js";

const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

export interface Profile {
  id: string;
  first_initial: string;
  last_initial: string;
  phone_last4: string;
  created_at: string;
}

export type TrainingType = "camp" | "group" | "solo";
export type AttendanceStatus = "attended" | "no_show" | "scheduled";

export interface TrainingSession {
  id: string;
  profile_id: string;
  type: TrainingType;
  session_date: string;
  location: string | null;
  coach_name: string | null;
  focus_area: string | null;
  staff_notes: string | null;
  attendance_status: AttendanceStatus;
  created_at: string;
  updated_at: string;
}

export async function findProfiles(
  firstInitial: string,
  lastInitial: string,
  phoneLast4: string
): Promise<Profile[]> {
  const { data, error } = await client
    .from("profiles")
    .select("*")
    .eq("first_initial", firstInitial)
    .eq("last_initial", lastInitial)
    .eq("phone_last4", phoneLast4)
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getProfileById(id: string): Promise<Profile | null> {
  const { data, error } = await client.from("profiles").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function createProfile(
  firstInitial: string,
  lastInitial: string,
  phoneLast4: string
): Promise<Profile> {
  const { data, error } = await client
    .from("profiles")
    .insert({ first_initial: firstInitial, last_initial: lastInitial, phone_last4: phoneLast4 })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function listProfiles(): Promise<Profile[]> {
  const { data, error } = await client
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function deleteProfile(id: string): Promise<void> {
  const { error } = await client.from("profiles").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function getSessionsForProfile(profileId: string): Promise<TrainingSession[]> {
  const { data, error } = await client
    .from("training_sessions")
    .select("*")
    .eq("profile_id", profileId)
    .order("session_date", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getSessionById(id: string): Promise<TrainingSession | null> {
  const { data, error } = await client
    .from("training_sessions")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function createTrainingSession(
  input: Omit<TrainingSession, "id" | "created_at" | "updated_at">
): Promise<TrainingSession> {
  const { data, error } = await client.from("training_sessions").insert(input).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateTrainingSession(
  id: string,
  input: Partial<Omit<TrainingSession, "id" | "profile_id" | "created_at" | "updated_at">>
): Promise<TrainingSession> {
  const { data, error } = await client
    .from("training_sessions")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteTrainingSession(id: string): Promise<void> {
  const { error } = await client.from("training_sessions").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

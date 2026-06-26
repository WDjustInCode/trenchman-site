import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";

const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 15;

function getClientIp(): string {
  const headersList = headers();
  const forwarded = headersList.get("x-forwarded-for");
  return (forwarded ? forwarded.split(",")[0] : "unknown").trim();
}

export async function checkRateLimit(): Promise<{ blocked: boolean; minutesLeft?: number }> {
  const ip = getClientIp();
  const windowCutoff = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();

  const { data } = await client
    .from("login_attempts")
    .select("attempt_count, window_start")
    .eq("ip_address", ip)
    .single();

  if (!data) return { blocked: false };

  // Reset if the window has expired
  if (data.window_start < windowCutoff) {
    await client.from("login_attempts").delete().eq("ip_address", ip);
    return { blocked: false };
  }

  if (data.attempt_count >= MAX_ATTEMPTS) {
    const windowEnd = new Date(data.window_start).getTime() + WINDOW_MINUTES * 60 * 1000;
    const minutesLeft = Math.ceil((windowEnd - Date.now()) / 60000);
    return { blocked: true, minutesLeft };
  }

  return { blocked: false };
}

export async function recordFailedAttempt(): Promise<void> {
  const ip = getClientIp();
  const windowCutoff = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();

  const { data } = await client
    .from("login_attempts")
    .select("attempt_count, window_start")
    .eq("ip_address", ip)
    .single();

  if (!data || data.window_start < windowCutoff) {
    // No row or expired window — start a fresh count
    await client
      .from("login_attempts")
      .upsert({ ip_address: ip, attempt_count: 1, window_start: new Date().toISOString() });
  } else {
    await client
      .from("login_attempts")
      .update({ attempt_count: data.attempt_count + 1 })
      .eq("ip_address", ip);
  }
}

export async function clearAttempts(): Promise<void> {
  const ip = getClientIp();
  await client.from("login_attempts").delete().eq("ip_address", ip);
}

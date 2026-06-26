-- Run this in the Supabase SQL editor (or via the Supabase CLI) to provision
-- the athlete profile + training session tables. See CLAUDE.md for context.

create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  first_initial char(1) not null,
  last_initial char(1) not null,
  phone_last4 text not null check (phone_last4 ~ '^[0-9]{4}$'),
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_lookup
  on profiles (first_initial, last_initial, phone_last4);

do $$ begin
  create type training_type as enum ('camp', 'group', 'solo');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type attendance_status as enum ('attended', 'no_show', 'scheduled');
exception
  when duplicate_object then null;
end $$;

create table if not exists training_sessions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  type training_type not null,
  session_date date not null,
  location text,
  coach_name text,
  focus_area text,
  staff_notes text,
  attendance_status attendance_status not null default 'scheduled',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_training_sessions_profile
  on training_sessions (profile_id, session_date desc);

-- Staff login rate limiting: tracks failed attempts per IP address.
-- Rows older than 15 minutes are ignored; a successful login clears the IP's row.
create table if not exists login_attempts (
  ip_address text primary key,
  attempt_count integer not null default 1,
  window_start timestamptz not null default now()
);


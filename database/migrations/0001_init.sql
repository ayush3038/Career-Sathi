-- CareerSathi V2 initial schema (Supabase / PostgreSQL)
-- Run in Supabase SQL editor or via `supabase db push`.

create extension if not exists "pgcrypto";

create table if not exists profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists careers (
  id text primary key,
  name text not null,
  domain text not null,
  description text,
  eligibility text,
  training text,
  skills text[] default '{}',
  duration text,
  work_environment text,
  next_steps text[] default '{}'
);

create table if not exists pathways (
  id text primary key,
  career_id text references careers(id) on delete cascade,
  title text not null,
  training_provider_type text,
  duration text,
  cost_band text,
  government_private text,
  location text,
  eligibility text,
  skills text[] default '{}'
);

create table if not exists recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  career_id text references careers(id),
  match_score int not null,
  reasons jsonb default '[]'::jsonb,
  constraints jsonb default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists roadmaps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  pathway_id text not null,
  title text not null,
  created_at timestamptz not null default now(),
  unique (user_id, pathway_id)
);

create table if not exists roadmap_milestones (
  id text primary key,
  roadmap_id uuid references roadmaps(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  description text,
  sequence int not null,
  status text not null default 'upcoming' check (status in ('completed','in_progress','upcoming')),
  estimated_duration text,
  action text,
  next_step text
);

create table if not exists family_decisions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists affordability_entries (
  id uuid primary key default gen_random_uuid(),
  pathway text,
  cost text,
  source text,
  verified boolean not null default false
);

create table if not exists scholarships (
  id uuid primary key default gen_random_uuid(),
  name text,
  eligibility text,
  amount text,
  source text,
  verified boolean not null default false
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  action text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_recommendations_user on recommendations(user_id);
create index if not exists idx_roadmaps_user on roadmaps(user_id);
create index if not exists idx_milestones_roadmap on roadmap_milestones(roadmap_id);
create index if not exists idx_pathways_career on pathways(career_id);

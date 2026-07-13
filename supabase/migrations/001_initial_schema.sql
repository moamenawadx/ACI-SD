-- ============================================================
-- ACI-SD Conference Platform — Initial Schema
-- Target: fresh Supabase project
-- Idempotent: yes (safe to re-run)
-- ============================================================

-- 0. EXTENSION
-- ============================================================
create extension if not exists "pgcrypto";

-- 1. ENUM TYPE
-- ============================================================
do $$ begin
    create type submission_status as enum ('pending', 'approved', 'rejected');
exception
    when duplicate_object then null;
end $$;

-- 2. TRIGGER FUNCTION (keeps updated_at in sync)
-- ============================================================
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- 2b. admin check helper — SECURITY DEFINER bypasses RLS recursion
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.registrations r
    where r.id = auth.uid()
      and r.is_admin = true
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- 3. TABLES
-- ============================================================

-- 3a. registrations (participant profiles, linked to Supabase Auth)
create table if not exists public.registrations (
    id                      uuid primary key references auth.users(id) on delete cascade,
    registration_number     text unique not null default 'REG-' || upper(substr(md5(random()::text), 1, 8)),
    is_admin                boolean not null default false,

    title                   text,
    full_name               text,
    name_on_certificate     text,
    gender                  text,
    nationality             text,
    passport_or_national_id text,

    university_organization text,
    faculty_department      text,
    position                text,
    country                 text,

    email                   text not null,
    mobile_phone            text,
    whatsapp                text,
    postal_address          text,

    attendance_mode         text,
    participation_type      text,
    presentation_type       text,
    paper_title             text,
    conference_topic        text,
    conference_topic_other  text,

    room_type               text,
    check_in                text,
    check_out               text,
    roommate                text,
    arrival_airport         text,
    arrival_date            text,
    arrival_time            text,
    departure_date          text,
    departure_time          text,
    invitation_letter       boolean default false,
    visa_support_letter     boolean default false,
    other_requirements      text,

    registration_category   text,
    payment_method          text,
    amount_paid             text,
    payment_date            text,
    transaction_reference   text,
    receipt_path            text,

    agree_declaration       boolean default false,

    created_at              timestamptz not null default now()
);

-- 3a2. auto-create registration row on user signup (bypasses RLS via SECURITY DEFINER)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.registrations (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- 3b. abstract_submissions
create table if not exists public.abstract_submissions (
    id              uuid primary key default gen_random_uuid(),
    registration_id uuid not null references public.registrations(id) on delete cascade,
    abstract_summary text,
    abstract_file_path text not null,
    status          submission_status not null default 'pending',
    review_notes    text,
    reviewed_by     text,
    reviewed_at     timestamptz,
    created_at      timestamptz not null default now(),
    updated_at      timestamptz,

    unique (registration_id)
);

drop trigger if exists update_abstract_submissions_updated_at on public.abstract_submissions;
create trigger update_abstract_submissions_updated_at
    before update on public.abstract_submissions
    for each row
    execute function update_updated_at_column();

-- 3c. poster_submissions
create table if not exists public.poster_submissions (
    id              uuid primary key default gen_random_uuid(),
    registration_id uuid not null references public.registrations(id) on delete cascade,
    poster_file_path text not null,
    status          submission_status not null default 'pending',
    review_notes    text,
    reviewed_by     text,
    reviewed_at     timestamptz,
    created_at      timestamptz not null default now(),
    updated_at      timestamptz,

    unique (registration_id)
);

drop trigger if exists update_poster_submissions_updated_at on public.poster_submissions;
create trigger update_poster_submissions_updated_at
    before update on public.poster_submissions
    for each row
    execute function update_updated_at_column();

-- 3d. oral_presentations
create table if not exists public.oral_presentations (
    id              uuid primary key default gen_random_uuid(),
    registration_id uuid not null references public.registrations(id) on delete cascade,
    oral_file_path  text not null,
    status          submission_status not null default 'pending',
    review_notes    text,
    reviewed_by     text,
    reviewed_at     timestamptz,
    created_at      timestamptz not null default now(),
    updated_at      timestamptz,

    unique (registration_id)
);

drop trigger if exists update_oral_presentations_updated_at on public.oral_presentations;
create trigger update_oral_presentations_updated_at
    before update on public.oral_presentations
    for each row
    execute function update_updated_at_column();

-- 4. INDEXES
-- ============================================================
create index if not exists idx_abstract_submissions_registration_id
    on public.abstract_submissions (registration_id);
create index if not exists idx_abstract_submissions_status
    on public.abstract_submissions (status);
create index if not exists idx_poster_submissions_registration_id
    on public.poster_submissions (registration_id);
create index if not exists idx_poster_submissions_status
    on public.poster_submissions (status);
create index if not exists idx_oral_presentations_registration_id
    on public.oral_presentations (registration_id);
create index if not exists idx_oral_presentations_status
    on public.oral_presentations (status);

-- 5. ROW LEVEL SECURITY
-- ============================================================

-- 5a. registrations
alter table public.registrations enable row level security;

drop policy if exists "registrations_participant_select" on public.registrations;
create policy "registrations_participant_select"
on public.registrations
for select
to authenticated
using (id = auth.uid());

drop policy if exists "registrations_participant_insert" on public.registrations;
create policy "registrations_participant_insert"
on public.registrations
for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "registrations_participant_update" on public.registrations;
create policy "registrations_participant_update"
on public.registrations
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "registrations_admin_select" on public.registrations;
create policy "registrations_admin_select"
on public.registrations
for select
to authenticated
using (public.is_admin());

-- 5b. abstract_submissions
alter table public.abstract_submissions enable row level security;

drop policy if exists "abstract_participant_select" on public.abstract_submissions;
create policy "abstract_participant_select"
on public.abstract_submissions
for select
to authenticated
using (registration_id = auth.uid());

drop policy if exists "abstract_participant_insert" on public.abstract_submissions;
create policy "abstract_participant_insert"
on public.abstract_submissions
for insert
to authenticated
with check (registration_id = auth.uid());

drop policy if exists "abstract_participant_update" on public.abstract_submissions;
create policy "abstract_participant_update"
on public.abstract_submissions
for update
to authenticated
using (registration_id = auth.uid())
with check (registration_id = auth.uid());

drop policy if exists "abstract_admin_select" on public.abstract_submissions;
create policy "abstract_admin_select"
on public.abstract_submissions
for select
to authenticated
using (public.is_admin());

drop policy if exists "abstract_admin_update" on public.abstract_submissions;
create policy "abstract_admin_update"
on public.abstract_submissions
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- 5c. poster_submissions
alter table public.poster_submissions enable row level security;

drop policy if exists "poster_participant_select" on public.poster_submissions;
create policy "poster_participant_select"
on public.poster_submissions
for select
to authenticated
using (registration_id = auth.uid());

drop policy if exists "poster_participant_insert" on public.poster_submissions;
create policy "poster_participant_insert"
on public.poster_submissions
for insert
to authenticated
with check (registration_id = auth.uid());

drop policy if exists "poster_participant_update" on public.poster_submissions;
create policy "poster_participant_update"
on public.poster_submissions
for update
to authenticated
using (registration_id = auth.uid())
with check (registration_id = auth.uid());

drop policy if exists "poster_admin_select" on public.poster_submissions;
create policy "poster_admin_select"
on public.poster_submissions
for select
to authenticated
using (public.is_admin());

drop policy if exists "poster_admin_update" on public.poster_submissions;
create policy "poster_admin_update"
on public.poster_submissions
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- 5d. oral_presentations
alter table public.oral_presentations enable row level security;

drop policy if exists "oral_participant_select" on public.oral_presentations;
create policy "oral_participant_select"
on public.oral_presentations
for select
to authenticated
using (registration_id = auth.uid());

drop policy if exists "oral_participant_insert" on public.oral_presentations;
create policy "oral_participant_insert"
on public.oral_presentations
for insert
to authenticated
with check (registration_id = auth.uid());

drop policy if exists "oral_participant_update" on public.oral_presentations;
create policy "oral_participant_update"
on public.oral_presentations
for update
to authenticated
using (registration_id = auth.uid())
with check (registration_id = auth.uid());

drop policy if exists "oral_admin_select" on public.oral_presentations;
create policy "oral_admin_select"
on public.oral_presentations
for select
to authenticated
using (public.is_admin());

drop policy if exists "oral_admin_update" on public.oral_presentations;
create policy "oral_admin_update"
on public.oral_presentations
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- 6. STORAGE BUCKETS (all private — signed URLs only)
-- ============================================================

insert into storage.buckets (id, name, public)
values ('receipts', 'receipts', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('abstracts', 'abstracts', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('posters', 'posters', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('oral-presentations', 'oral-presentations', false)
on conflict (id) do nothing;

-- 7. STORAGE POLICIES
-- ============================================================

-- 7a. receipts
drop policy if exists "receipts_participant_insert" on storage.objects;
create policy "receipts_participant_insert"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'receipts'
    and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "receipts_participant_select" on storage.objects;
create policy "receipts_participant_select"
on storage.objects
for select
to authenticated
using (
    bucket_id = 'receipts'
    and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "receipts_admin_all" on storage.objects;
create policy "receipts_admin_all"
on storage.objects
for all
to authenticated
using (
    bucket_id = 'receipts'
    and public.is_admin()
);

-- 7b. abstracts
drop policy if exists "abstracts_participant_insert" on storage.objects;
create policy "abstracts_participant_insert"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'abstracts'
    and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "abstracts_participant_select" on storage.objects;
create policy "abstracts_participant_select"
on storage.objects
for select
to authenticated
using (
    bucket_id = 'abstracts'
    and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "abstracts_participant_update" on storage.objects;
create policy "abstracts_participant_update"
on storage.objects
for update
to authenticated
using (
    bucket_id = 'abstracts'
    and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
    bucket_id = 'abstracts'
    and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "abstracts_admin_all" on storage.objects;
create policy "abstracts_admin_all"
on storage.objects
for all
to authenticated
using (
    bucket_id = 'abstracts'
    and public.is_admin()
);

-- 7c. posters
drop policy if exists "posters_participant_insert" on storage.objects;
create policy "posters_participant_insert"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'posters'
    and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "posters_participant_select" on storage.objects;
create policy "posters_participant_select"
on storage.objects
for select
to authenticated
using (
    bucket_id = 'posters'
    and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "posters_participant_update" on storage.objects;
create policy "posters_participant_update"
on storage.objects
for update
to authenticated
using (
    bucket_id = 'posters'
    and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
    bucket_id = 'posters'
    and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "posters_admin_all" on storage.objects;
create policy "posters_admin_all"
on storage.objects
for all
to authenticated
using (
    bucket_id = 'posters'
    and public.is_admin()
);

-- 7d. oral-presentations
drop policy if exists "oral_participant_insert" on storage.objects;
create policy "oral_participant_insert"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'oral-presentations'
    and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "oral_participant_select" on storage.objects;
create policy "oral_participant_select"
on storage.objects
for select
to authenticated
using (
    bucket_id = 'oral-presentations'
    and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "oral_participant_update" on storage.objects;
create policy "oral_participant_update"
on storage.objects
for update
to authenticated
using (
    bucket_id = 'oral-presentations'
    and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
    bucket_id = 'oral-presentations'
    and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "oral_admin_all" on storage.objects;
create policy "oral_admin_all"
on storage.objects
for all
to authenticated
using (
    bucket_id = 'oral-presentations'
    and public.is_admin()
);

-- 8. GRANTS
-- ============================================================
-- Supabase defaults already grant these, but we make them explicit.
grant usage on schema public to anon, authenticated;
grant all on all tables in schema public to anon, authenticated;
grant all on all sequences in schema public to anon, authenticated;

-- ============================================================
-- END OF MIGRATION
-- ============================================================

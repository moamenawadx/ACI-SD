-- ============================================================
-- ACI-SD Conference Platform: Production Upgrade Migration
-- Safe to run on existing database with production data.
-- Fully idempotent — safe to run multiple times.
-- ============================================================

-- 0. EXTENSIONS
-- ============================================================
create extension if not exists "pgcrypto";

-- 1. CUSTOM TYPES
-- ============================================================
do $$ begin
    create type submission_status as enum ('pending', 'approved', 'rejected');
exception
    when duplicate_object then null;
end $$;

-- 2. TRIGGER FUNCTION
-- ============================================================
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- 3. EXISTING TABLES — UPGRADE ONLY (no recreate)
-- ============================================================

-- 3a. registrations: add is_admin column (preserves all existing data)
alter table public.registrations add column if not exists is_admin boolean not null default false;

-- 3b. abstract_submissions: add missing columns, upgrade status type
do $$ begin
    if exists (
        select 1 from information_schema.tables
        where table_schema = 'public' and table_name = 'abstract_submissions'
    ) then
        -- add missing columns
        if not exists (
            select 1 from information_schema.columns
            where table_schema = 'public' and table_name = 'abstract_submissions'
            and column_name = 'review_notes'
        ) then
            alter table public.abstract_submissions add column review_notes text;
        end if;
        if not exists (
            select 1 from information_schema.columns
            where table_schema = 'public' and table_name = 'abstract_submissions'
            and column_name = 'updated_at'
        ) then
            alter table public.abstract_submissions add column updated_at timestamptz;
        end if;
        -- upgrade status column from text/varchar to submission_status if needed
        if exists (
            select 1 from information_schema.columns
            where table_schema = 'public' and table_name = 'abstract_submissions'
            and column_name = 'status' and data_type in ('text', 'character varying')
        ) then
            alter table public.abstract_submissions alter column status drop default;
            alter table public.abstract_submissions alter column status type public.submission_status
                using status::public.submission_status;
            alter table public.abstract_submissions alter column status set default 'pending'::public.submission_status;
        end if;
    end if;
end $$;

-- 3c. poster_submissions (create if missing)
create table if not exists public.poster_submissions (
    id              uuid primary key default gen_random_uuid(),
    registration_id uuid not null references public.registrations(id) on delete cascade,
    poster_file_url text not null,
    status          submission_status not null default 'pending',
    review_notes    text,
    reviewed_by     uuid references public.registrations(id),
    reviewed_at     timestamptz,
    created_at      timestamptz not null default now(),
    updated_at      timestamptz
);

-- 3d. oral_presentations (create if missing)
create table if not exists public.oral_presentations (
    id              uuid primary key default gen_random_uuid(),
    registration_id uuid not null references public.registrations(id) on delete cascade,
    oral_file_url   text not null,
    status          submission_status not null default 'pending',
    review_notes    text,
    reviewed_by     uuid references public.registrations(id),
    reviewed_at     timestamptz,
    created_at      timestamptz not null default now(),
    updated_at      timestamptz
);

-- 4. TRIGGERS (drop + recreate for idempotency)
-- ============================================================

drop trigger if exists update_abstract_submissions_updated_at on public.abstract_submissions;
create trigger update_abstract_submissions_updated_at
    before update on public.abstract_submissions
    for each row
    execute function update_updated_at_column();

drop trigger if exists update_poster_submissions_updated_at on public.poster_submissions;
create trigger update_poster_submissions_updated_at
    before update on public.poster_submissions
    for each row
    execute function update_updated_at_column();

drop trigger if exists update_oral_presentations_updated_at on public.oral_presentations;
create trigger update_oral_presentations_updated_at
    before update on public.oral_presentations
    for each row
    execute function update_updated_at_column();

-- 5. INDEXES
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

-- 6. ROW LEVEL SECURITY
-- ============================================================

-- 6a. registrations
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
using (
    exists (
        select 1
        from public.registrations r
        where r.id = auth.uid()
          and r.is_admin = true
    )
);

-- 6b. abstract_submissions
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

-- participants cannot DELETE (no delete policy)

drop policy if exists "abstract_admin_select" on public.abstract_submissions;
create policy "abstract_admin_select"
on public.abstract_submissions
for select
to authenticated
using (
    exists (
        select 1
        from public.registrations r
        where r.id = auth.uid()
          and r.is_admin = true
    )
);

drop policy if exists "abstract_admin_update" on public.abstract_submissions;
create policy "abstract_admin_update"
on public.abstract_submissions
for update
to authenticated
using (
    exists (
        select 1
        from public.registrations r
        where r.id = auth.uid()
          and r.is_admin = true
    )
);

-- 6c. poster_submissions
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
using (
    exists (
        select 1
        from public.registrations r
        where r.id = auth.uid()
          and r.is_admin = true
    )
);

drop policy if exists "poster_admin_update" on public.poster_submissions;
create policy "poster_admin_update"
on public.poster_submissions
for update
to authenticated
using (
    exists (
        select 1
        from public.registrations r
        where r.id = auth.uid()
          and r.is_admin = true
    )
);

-- 6d. oral_presentations
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
using (
    exists (
        select 1
        from public.registrations r
        where r.id = auth.uid()
          and r.is_admin = true
    )
);

drop policy if exists "oral_admin_update" on public.oral_presentations;
create policy "oral_admin_update"
on public.oral_presentations
for update
to authenticated
using (
    exists (
        select 1
        from public.registrations r
        where r.id = auth.uid()
          and r.is_admin = true
    )
);

-- 7. STORAGE
-- ============================================================

alter table storage.objects enable row level security;

-- 7a. receipts bucket
insert into storage.buckets (id, name, public)
values ('receipts', 'receipts', false)
on conflict (id) do nothing;

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
    and exists (
        select 1
        from public.registrations r
        where r.id = auth.uid()
          and r.is_admin = true
    )
);

-- 7b. abstracts bucket
insert into storage.buckets (id, name, public)
values ('abstracts', 'abstracts', false)
on conflict (id) do nothing;

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
    and exists (
        select 1
        from public.registrations r
        where r.id = auth.uid()
          and r.is_admin = true
    )
);

-- 7c. posters bucket
insert into storage.buckets (id, name, public)
values ('posters', 'posters', false)
on conflict (id) do nothing;

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
    and exists (
        select 1
        from public.registrations r
        where r.id = auth.uid()
          and r.is_admin = true
    )
);

-- 7d. oral-presentations bucket
insert into storage.buckets (id, name, public)
values ('oral-presentations', 'oral-presentations', false)
on conflict (id) do nothing;

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
    and exists (
        select 1
        from public.registrations r
        where r.id = auth.uid()
          and r.is_admin = true
    )
);

-- ============================================================
-- END OF UPGRADE MIGRATION
-- ============================================================

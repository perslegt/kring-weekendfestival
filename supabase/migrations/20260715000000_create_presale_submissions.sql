create extension if not exists pgcrypto;

create table if not exists public.presale_submissions (
  id uuid primary key default gen_random_uuid(),
  email text not null check (char_length(email) between 3 and 254),
  ticket_type text check (
    ticket_type is null
    or ticket_type in ('weekend', 'friday', 'saturday', 'sunday')
  ),
  wants_sleepover boolean,
  camping_type text check (
    camping_type is null
    or camping_type in ('regular', 'silent', 'couples', '24-hours')
  ),
  payment_confirmed_at timestamptz,
  extra_answers jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint presale_submissions_extra_answers_object check (
    extra_answers is null or jsonb_typeof(extra_answers) = 'object'
  )
);

create index if not exists presale_submissions_email_idx
  on public.presale_submissions (lower(email));

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_presale_submissions_updated_at
  on public.presale_submissions;

create trigger set_presale_submissions_updated_at
before update on public.presale_submissions
for each row execute function public.set_updated_at();

alter table public.presale_submissions enable row level security;

revoke all on table public.presale_submissions from anon, authenticated;
grant select, insert, update on table public.presale_submissions to service_role;

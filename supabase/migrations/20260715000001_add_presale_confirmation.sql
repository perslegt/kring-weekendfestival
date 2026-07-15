alter table public.presale_submissions
add column if not exists confirmed boolean not null default false;

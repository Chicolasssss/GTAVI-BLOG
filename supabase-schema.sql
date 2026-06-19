-- Ejecutar en el SQL Editor de Supabase

create table if not exists public.reserved_names (
  id        bigint generated always as identity primary key,
  discord_id    text not null,
  discord_email text,
  requested_name text not null unique,
  created_at    timestamptz default now() not null
);

-- índice para búsquedas rápidas por nombre
create index if not exists idx_reserved_names_name on public.reserved_names (requested_name);

-- Política de seguridad: solo el usuario autenticado puede ver su propia reserva
alter table public.reserved_names enable row level security;

create policy "Usuarios pueden ver su propia reserva"
  on public.reserved_names for select
  using (discord_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Permitir inserts desde la Server Action (service role)
-- (Las Server Actions usan el service role key, así que no necesitan RLS)

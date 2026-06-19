-- ==================== SUPABASE SQL — V2 ====================
-- Ejecutar después de supabase-schema.sql

-- 5. pre_registered_servers
create table if not exists public.pre_registered_servers (
  id          bigint generated always as identity primary key,
  user_id     text,
  server_name text not null,
  role_type   text not null check (role_type in ('serio', 'casual', 'gangs')),
  discord_link text,
  description text default '',
  approved    boolean not null default false,
  created_at  timestamptz default now() not null
);
create index if not exists idx_pre_reg_server_name on public.pre_registered_servers (server_name);

alter table public.pre_registered_servers enable row level security;
create policy "Lectura pública pre_registered_servers" on public.pre_registered_servers for select using (true);

-- 6. forum_categories (admin managed)
create table if not exists public.forum_categories (
  id          bigint generated always as identity primary key,
  name        text not null unique,
  slug        text not null unique,
  description text default '',
  color_hex   text not null default '#ff007f',
  created_at  timestamptz default now() not null
);

alter table public.forum_categories enable row level security;
create policy "Lectura pública forum_categories" on public.forum_categories for select using (true);

-- Insertar categorías por defecto
insert into public.forum_categories (name, slug, description, color_hex) values
  ('Discusión General', 'general', 'Temas generales sobre GTA VI', '#ff007f'),
  ('Roleplay', 'roleplay', 'Servers y comunidades roleplay', '#00ffff'),
  ('Mecánica / Coches', 'coches', 'Tuning, coches y mecánica', '#ff8800'),
  ('Salseo / Noticias', 'salseo', 'Noticias y rumores', '#ff00ff')
on conflict (slug) do nothing;

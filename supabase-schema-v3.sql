-- ==================== SUPABASE SQL — V3 (NEWS) ====================
-- Ejecutar en el SQL Editor de Supabase

create table if not exists public.articles (
  id          bigint generated always as identity primary key,
  slug        text not null unique,
  title       text not null,
  content     text not null default '',
  image_url   text,
  author_name text not null default 'Admin',
  created_at  timestamptz default now() not null
);

create index if not exists idx_articles_slug on public.articles (slug);
create index if not exists idx_articles_created on public.articles (created_at desc);

alter table public.articles enable row level security;

-- Políticas: cualquiera puede leer; solo service_role escribe
create policy "Lectura pública articles" on public.articles for select using (true);

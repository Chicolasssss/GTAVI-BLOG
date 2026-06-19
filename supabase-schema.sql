-- ==================== EJECUTAR EN SUPABASE SQL EDITOR ====================

-- Funciones auxiliares para upvotes
create or replace function increment_upvotes(row_id bigint)
returns void language plpgsql as $$
begin
  update public.posts set upvotes = upvotes + 1 where id = row_id;
end;
$$;

create or replace function decrement_upvotes(row_id bigint)
returns void language plpgsql as $$
begin
  update public.posts set upvotes = greatest(0, upvotes - 1) where id = row_id;
end;
$$;

-- 1. reserved_names (existing)
create table if not exists public.reserved_names (
  id          bigint generated always as identity primary key,
  discord_id  text not null,
  discord_email text,
  requested_name text not null unique,
  created_at  timestamptz default now() not null
);
create index if not exists idx_reserved_names_name on public.reserved_names (requested_name);

-- 2. forum posts
create table if not exists public.posts (
  id        bigint generated always as identity primary key,
  user_id   text not null,
  author_name text not null default 'Anónimo',
  title     text not null,
  content   text not null default '',
  category  text not null default 'general',
  upvotes   integer not null default 0,
  created_at timestamptz default now() not null
);
create index if not exists idx_posts_category on public.posts (category);
create index if not exists idx_posts_created on public.posts (created_at desc);

-- 3. comments on posts
create table if not exists public.comments (
  id        bigint generated always as identity primary key,
  post_id   bigint not null references public.posts(id) on delete cascade,
  user_id   text not null,
  author_name text not null default 'Anónimo',
  content   text not null,
  created_at timestamptz default now() not null
);
create index if not exists idx_comments_post on public.comments (post_id);

-- 4. upvote log (unique per user+post to prevent double votes)
create table if not exists public.upvotes_log (
  user_id text not null,
  post_id bigint not null references public.posts(id) on delete cascade,
  created_at timestamptz default now() not null,
  primary key (user_id, post_id)
);

-- RLS (opcional — las Server Actions usarán service_role)
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.upvotes_log enable row level security;

-- Políticas: cualquiera puede leer; solo service_role escribe
create policy "Lectura pública posts" on public.posts for select using (true);
create policy "Lectura pública comments" on public.comments for select using (true);
create policy "Lectura pública upvotes_log" on public.upvotes_log for select using (true);

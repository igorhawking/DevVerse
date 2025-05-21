-- Criação das tabelas principais do DevVerse

-- USERS (metadados extras)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  theme text default 'dark',
  avatar_url text,
  provider text,
  created_at timestamp with time zone default now()
);
create index if not exists idx_users_username on public.users(username);
create index if not exists idx_users_created_at on public.users(created_at);

-- WORKSPACES
create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  user_id uuid references public.users(id) on delete cascade,
  settings jsonb,
  created_at timestamp with time zone default now()
);
create index if not exists idx_workspaces_user_id on public.workspaces(user_id);
create index if not exists idx_workspaces_created_at on public.workspaces(created_at);

-- WORKSPACE_TABS
create table if not exists public.workspace_tabs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  title text not null,
  type text check (type in ('code', 'preview', 'terminal')),
  content text,
  position int,
  created_at timestamp with time zone default now()
);
create index if not exists idx_workspace_tabs_workspace_id on public.workspace_tabs(workspace_id);

-- SNIPPETS
create table if not exists public.snippets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  code text not null,
  language text not null,
  tags text[],
  user_id uuid references public.users(id) on delete cascade,
  created_at timestamp with time zone default now()
);
create index if not exists idx_snippets_user_id on public.snippets(user_id);
create index if not exists idx_snippets_created_at on public.snippets(created_at);
create index if not exists idx_snippets_language on public.snippets(language);

-- TASKS
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  title text not null,
  description text,
  status text check (status in ('todo', 'in_progress', 'done')) default 'todo',
  priority int default 1,
  assigned_to uuid references public.users(id),
  created_at timestamp with time zone default now()
);
create index if not exists idx_tasks_workspace_id on public.tasks(workspace_id);
create index if not exists idx_tasks_assigned_to on public.tasks(assigned_to);
create index if not exists idx_tasks_created_at on public.tasks(created_at);

-- TERMINALS
create table if not exists public.terminals (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  history text[],
  shell_type text check (shell_type in ('bash', 'zsh', 'node')),
  theme text,
  created_at timestamp with time zone default now()
);
create index if not exists idx_terminals_workspace_id on public.terminals(workspace_id);

-- DOCS
create table if not exists public.docs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  title text not null,
  content_md text,
  created_at timestamp with time zone default now()
);
create index if not exists idx_docs_workspace_id on public.docs(workspace_id);

-- INTEGRATIONS
create table if not exists public.integrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  type text check (type in ('github', 'vercel', 'webhook')),
  config_json jsonb,
  connected_at timestamp with time zone default now()
);
create index if not exists idx_integrations_user_id on public.integrations(user_id);

-- FAVORITES
create table if not exists public.favorites (
  user_id uuid references public.users(id) on delete cascade,
  resource_id uuid not null,
  resource_type text check (resource_type in ('workspace', 'snippet', 'doc')),
  created_at timestamp with time zone default now(),
  primary key (user_id, resource_id, resource_type)
);
create index if not exists idx_favorites_user_id on public.favorites(user_id);

-- ACTION LOGS
create table if not exists public.action_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id),
  action text,
  resource_type text,
  resource_id uuid,
  created_at timestamp with time zone default now()
);
create index if not exists idx_action_logs_user_id on public.action_logs(user_id);

-- RLS Policies detalhadas

-- WORKSPACES
alter table public.workspaces enable row level security;
drop policy if exists "Workspaces: only owner can access" on public.workspaces;
create policy "Workspaces: only owner can access" on public.workspaces
  for all using (user_id = auth.uid());

-- WORKSPACE_TABS
alter table public.workspace_tabs enable row level security;
drop policy if exists "Tabs: only owner can access" on public.workspace_tabs;
create policy "Tabs: only owner can access" on public.workspace_tabs
  for all using (
    workspace_id in (select id from workspaces where user_id = auth.uid())
  );

-- SNIPPETS
alter table public.snippets enable row level security;
drop policy if exists "Snippets: only owner can access" on public.snippets;
create policy "Snippets: only owner can access" on public.snippets
  for all using (user_id = auth.uid());

-- TASKS
alter table public.tasks enable row level security;
drop policy if exists "Tasks: only workspace owner can access" on public.tasks;
create policy "Tasks: only workspace owner can access" on public.tasks
  for all using (
    workspace_id in (select id from workspaces where user_id = auth.uid())
  );

-- TERMINALS
alter table public.terminals enable row level security;
drop policy if exists "Terminals: only workspace owner can access" on public.terminals;
create policy "Terminals: only workspace owner can access" on public.terminals
  for all using (
    workspace_id in (select id from workspaces where user_id = auth.uid())
  );

-- DOCS
alter table public.docs enable row level security;
drop policy if exists "Docs: only workspace owner can access" on public.docs;
create policy "Docs: only workspace owner can access" on public.docs
  for all using (
    workspace_id in (select id from workspaces where user_id = auth.uid())
  );

-- INTEGRATIONS
alter table public.integrations enable row level security;
drop policy if exists "Integrations: only owner can access" on public.integrations;
create policy "Integrations: only owner can access" on public.integrations
  for all using (user_id = auth.uid());

-- FAVORITES
alter table public.favorites enable row level security;
drop policy if exists "Favorites: only owner can access" on public.favorites;
create policy "Favorites: only owner can access" on public.favorites
  for all using (user_id = auth.uid());

-- ACTION_LOGS
alter table public.action_logs enable row level security;
drop policy if exists "ActionLogs: only owner can access" on public.action_logs;
create policy "ActionLogs: only owner can access" on public.action_logs
  for all using (user_id = auth.uid()); 
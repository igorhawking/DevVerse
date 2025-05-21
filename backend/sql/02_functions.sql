-- Função: Clonar workspace
create or replace function public.clone_workspace(source_workspace uuid, new_name text)
returns uuid as $$
declare
  new_ws_id uuid;
begin
  insert into workspaces (name, description, user_id, settings)
    select new_name, description, user_id, settings
    from workspaces where id = source_workspace
    returning id into new_ws_id;

  insert into workspace_tabs (workspace_id, title, type, content, position)
    select new_ws_id, title, type, content, position
    from workspace_tabs where workspace_id = source_workspace;

  return new_ws_id;
end;
$$ language plpgsql security definer;

-- Função: Exportar doc como markdown
create or replace function public.export_doc_md(doc_id uuid)
returns text as $$
  select content_md from docs where id = doc_id and workspace_id in (
    select id from workspaces where user_id = auth.uid()
  );
$$ language sql security definer;

-- Função: Filtrar snippets por linguagem/tag
create or replace function public.filter_snippets(lang text, tag text)
returns setof snippets as $$
  select * from snippets
  where user_id = auth.uid()
    and (language = lang or lang is null)
    and (tag = any(tags) or tag is null);
$$ language sql security definer; 
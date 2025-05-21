-- Usuários de exemplo
insert into public.users (id, username, theme, avatar_url, provider) values
  ('00000000-0000-0000-0000-000000000001', 'alice', 'dark', null, 'github'),
  ('00000000-0000-0000-0000-000000000002', 'bob', 'light', null, 'google');

-- Workspaces
insert into public.workspaces (id, name, description, user_id) values
  ('10000000-0000-0000-0000-000000000001', 'Workspace Frontend', 'React/Next.js', '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000002', 'Workspace Backend', 'Node/Express', '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000003', 'Workspace DevOps', 'CI/CD', '00000000-0000-0000-0000-000000000002');

-- Tasks
insert into public.tasks (workspace_id, title, description, status, priority, assigned_to) values
  ('10000000-0000-0000-0000-000000000001', 'Setup Next.js', 'Criar projeto base', 'todo', 1, '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000001', 'Configurar Tailwind', 'Adicionar Tailwind', 'in_progress', 2, '00000000-0000-0000-0000-000000000001'),
  ('10000000-0000-0000-0000-000000000002', 'Criar API', 'Endpoints REST', 'done', 1, '00000000-0000-0000-0000-000000000001');

-- Snippets
insert into public.snippets (title, code, language, tags, user_id) values
  ('Hello World JS', 'console.log("Hello World")', 'javascript', ARRAY['js','beginner'], '00000000-0000-0000-0000-000000000001'),
  ('Query SQL', 'SELECT * FROM users;', 'sql', ARRAY['sql','query'], '00000000-0000-0000-0000-000000000002'); 
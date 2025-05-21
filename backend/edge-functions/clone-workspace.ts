// @ts-expect-error Deno-only import
import { serve } from 'std/server'
import { createClient } from '@supabase/supabase-js'

serve(async (req: { json: () => PromiseLike<{ source_workspace: any; new_name: any }> | { source_workspace: any; new_name: any }; headers: { get: (arg0: string) => string } }) => {
  const { source_workspace, new_name } = await req.json()
  // @ts-expect-error Deno-only global
  const supabase = createClient(Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_ANON_KEY'), {
    global: { headers: { Authorization: req.headers.get('Authorization')! } }
  })

  const { data, error } = await supabase.rpc('clone_workspace', { source_workspace, new_name })
  if (error) return new Response(JSON.stringify({ error }), { status: 400 })
  return new Response(JSON.stringify({ new_workspace_id: data }), { status: 200 })
}) 
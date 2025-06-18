import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient, getUserFromRequest } from '@/lib/supabaseServer';

// GET: List all snippets for the authenticated user
export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('snippets').select('*').eq('user_id', user.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST: Create a new snippet for the authenticated user
export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  if (!body || !body.title || !body.code) {
    return NextResponse.json({ error: 'Missing snippet title or code' }, { status: 400 });
  }
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('snippets').insert([{ title: body.title, code: body.code, language: body.language || '', description: body.description || '', user_id: user.id }]).select();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data[0]);
}

// PATCH: Update a snippet (only for owner)
export async function PATCH(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  if (!body || !body.id) {
    return NextResponse.json({ error: 'Missing snippet id' }, { status: 400 });
  }
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('snippets')
    .update({ title: body.title, code: body.code, language: body.language, description: body.description })
    .eq('id', body.id)
    .eq('user_id', user.id)
    .select();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data[0]);
}

// DELETE: Remove a snippet (only for owner)
export async function DELETE(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  if (!body || !body.id) {
    return NextResponse.json({ error: 'Missing snippet id' }, { status: 400 });
  }
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from('snippets')
    .delete()
    .eq('id', body.id)
    .eq('user_id', user.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

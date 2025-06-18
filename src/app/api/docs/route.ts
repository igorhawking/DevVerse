import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient, getUserFromRequest } from '@/lib/supabaseServer';

// GET: List all docs for the authenticated user
export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('docs').select('*').eq('user_id', user.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST: Create a new doc for the authenticated user
export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  if (!body || !body.title || !body.content) {
    return NextResponse.json({ error: 'Missing doc title or content' }, { status: 400 });
  }
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('docs').insert([{ title: body.title, content: body.content, description: body.description || '', user_id: user.id }]).select();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data[0]);
}

// PATCH: Update a doc (only for owner)
export async function PATCH(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  if (!body || !body.id) {
    return NextResponse.json({ error: 'Missing doc id' }, { status: 400 });
  }
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('docs')
    .update({ title: body.title, content: body.content, description: body.description })
    .eq('id', body.id)
    .eq('user_id', user.id)
    .select();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data[0]);
}

// DELETE: Remove a doc (only for owner)
export async function DELETE(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  if (!body || !body.id) {
    return NextResponse.json({ error: 'Missing doc id' }, { status: 400 });
  }
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from('docs')
    .delete()
    .eq('id', body.id)
    .eq('user_id', user.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient, getUserFromRequest } from '@/lib/supabaseServer';

// GET: List all tasks for the authenticated user
export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('tasks').select('*').eq('user_id', user.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST: Create a new task for the authenticated user
export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  if (!body || !body.title) {
    return NextResponse.json({ error: 'Missing task title' }, { status: 400 });
  }
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('tasks').insert([{ title: body.title, description: body.description || '', status: body.status || 'TODO', user_id: user.id }]).select();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data[0]);
}

// PATCH: Update a task (only for owner)
export async function PATCH(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  if (!body || !body.id) {
    return NextResponse.json({ error: 'Missing task id' }, { status: 400 });
  }
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('tasks')
    .update({ title: body.title, description: body.description, status: body.status })
    .eq('id', body.id)
    .eq('user_id', user.id)
    .select();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data[0]);
}

// DELETE: Remove a task (only for owner)
export async function DELETE(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  if (!body || !body.id) {
    return NextResponse.json({ error: 'Missing task id' }, { status: 400 });
  }
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', body.id)
    .eq('user_id', user.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

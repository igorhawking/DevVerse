import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient, getUserFromRequest } from '@/lib/supabaseServer';

// GET: List all IA history for the authenticated user
export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('ia_history').select('*').eq('user_id', user.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST: Create a new IA history entry for the authenticated user
export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  if (!body || !body.action || !body.prompt) {
    return NextResponse.json({ error: 'Missing action or prompt' }, { status: 400 });
  }
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('ia_history').insert([{ action: body.action, prompt: body.prompt, context: body.context || '', language: body.language || '', date: body.date || new Date().toISOString(), user_id: user.id }]).select();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data[0]);
}

// PATCH: Update an IA history entry (only for owner)
export async function PATCH(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  if (!body || !body.id) {
    return NextResponse.json({ error: 'Missing ia-history id' }, { status: 400 });
  }
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('ia_history')
    .update({ action: body.action, prompt: body.prompt, context: body.context, language: body.language, date: body.date })
    .eq('id', body.id)
    .eq('user_id', user.id)
    .select();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data[0]);
}

// DELETE: Remove an IA history entry (only for owner)
export async function DELETE(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  if (!body || !body.id) {
    return NextResponse.json({ error: 'Missing ia-history id' }, { status: 400 });
  }
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from('ia_history')
    .delete()
    .eq('id', body.id)
    .eq('user_id', user.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '../lib/supabaseClient';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  console.log("reached to backend responses")
  console.log(id)

  if (!id) {
    return NextResponse.json(
      { error: 'Missing required query parameters: id' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
  .from('response')
  .select(`
    id,
    submission_id,
    admin_id,
    message,
    image_urls,
    created_at,
    likes,
    dislikes,
    ack_status,
    flagged,
    user (
      username
    )
  `)
  .eq('submission_id', id);
    

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
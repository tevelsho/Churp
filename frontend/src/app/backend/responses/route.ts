import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '../lib/supabaseClient';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  // console.log("reached to backend responses")
  // console.log(id)

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
  .eq('submission_id', id)
  .order('created_at', { ascending: false });
    

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}


//POST
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { submission_id, admin_id, replyText } = body;

  if (!submission_id || !admin_id || !replyText) {
    return NextResponse.json(
      { error: 'Missing required fields: submission_id, admin_id, or replyText' },
      { status: 400 }
    );
  }

 const { data, error } = await supabase
  .from('response')
  .insert(
    [
      {
        submission_id: submission_id,
        admin_id: admin_id,
        message: replyText,
        image_urls: [],                     // default empty array for _text
        created_at: new Date().toISOString(), // just to be safe
        likes: 0,
        dislikes: 0,
        ack_status: 'unread',              // assuming it's text
        flagged: '{}',                     // default empty stringified array for _text
      }
    ],

  )
  .single();
  console.log(data)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
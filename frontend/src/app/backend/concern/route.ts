import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '../lib/supabaseClient';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const allotmentName = searchParams.get('allotmentName');
  const id = searchParams.get('id');

  // console.log("reached to backend concern")
  // console.log(allotmentName)
  // console.log(id)

  if (!allotmentName || !id) {
    return NextResponse.json(
      { error: 'Missing required query parameters: allotmentName and id' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('submission')
    .select(`
      id,
      title,
      content,
      imageurl,
      status,
      publishedat,
      location,
      tags,
      likes,
      dislikes,
      ack_status,
      flagged,
      category
    `)
    .eq('location', allotmentName)
    .eq('id', id)
    .single(); // Expect only one post

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
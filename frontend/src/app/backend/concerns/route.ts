import { NextResponse, NextRequest } from 'next/server';
import { supabase } from './lib/supabaseClient';


//GET
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const allotmentName = searchParams.get('allotmentName');
  const { data, error } = await supabase
    .from('post')
    .select(`
      id,
      community_icon,
      community_name,
      created_at,
      title,
      content,
      upvotes,
      image_url
    `)
    .eq('community_name', allotmentName)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

//POST
export async function POST(request: Request) {
   try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const mobile = formData.get('mobileNumber') as string;
    const concern = formData.get('concernTitle') as string;
    const garden = formData.get('affectedGarden') as string;
    const description = formData.get('description') as string;

    if (!concern || !garden || !description) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Upload images to Supabase Storage
    const photos = formData.getAll('photos') as File[];
    const imageUrls: string[] = [];

    for (const photo of photos) {
      const filename = `post-images/${Date.now()}-${photo.name}`;

      const { data, error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(filename, photo, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        continue; // Skip failed uploads but proceed
      }

      const { data: urlData } = supabase.storage
        .from('post-images')
        .getPublicUrl(filename);

      if (urlData?.publicUrl) {
        imageUrls.push(urlData.publicUrl);
      }
    }


    // Create user (or reuse logic to find existing user)
    const { data: newUser, error: insertError } = await supabase
      .from('app_user')
      .insert({
        username: name,
        display_name: name,
        mobile_number: mobile,
      })
      .select()
      .single();

    if (insertError) {
      console.error('User insert error:', insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // Insert post
    const { data: post, error: postError } = await supabase
      .from('post')
      .insert({
        author_id: newUser.id,
        title: concern,
        community_icon: "https://placehold.co/20x20/4CAF50/fff?text=CG",
        community_name: garden,
        content: description,
        image_url: imageUrls.length > 0 ? imageUrls : null,
      })
      .select()
      .single();

    if (postError) {
      console.error('Post insert error:', postError);
      return NextResponse.json({ error: postError.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'Concern added successfully', data: post },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Internal error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
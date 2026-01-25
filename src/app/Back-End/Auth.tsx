import supabase from '../Back-End/supabase';

export async function POST(request: Request) {
  const { action, email, password } = await request.json();

  if (action === 'signup') {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json(data);
  }

  if (action === 'signin') {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json(data);
  }

  return Response.json({ error: 'Invalid action' }, { status: 400 });
}
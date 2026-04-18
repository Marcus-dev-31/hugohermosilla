import type { APIRoute } from 'astro';

const CLIENT_ID     = import.meta.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.GITHUB_CLIENT_SECRET;

export const GET: APIRoute = async ({ request }) => {
  const url    = new URL(request.url);
  const code   = url.searchParams.get('code');
  const state  = url.searchParams.get('state');

  if (!code) {
    const params = new URLSearchParams({
      client_id:    CLIENT_ID,
      scope:        'repo,user',
      state:        crypto.randomUUID(),
    });
    return Response.redirect(
      `https://github.com/login/oauth/authorize?${params}`
    );
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Accept':        'application/json',
    },
    body: JSON.stringify({
      client_id:     CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      state,
    }),
  });

  const { access_token, error } = await tokenRes.json();

  if (error || !access_token) {
    return new Response('Error de autenticación', { status: 401 });
  }

  const script = `
    <script>
      window.opener.postMessage(
        'authorization:github:success:${JSON.stringify({ token: access_token, provider: 'github' })}',
        '*'
      );
      window.close();
    </script>
  `;

  return new Response(script, {
    headers: { 'Content-Type': 'text/html' },
  });
};
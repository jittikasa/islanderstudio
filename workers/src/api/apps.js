/**
 * Apps API endpoints
 * TODO: Implement full CRUD operations
 */

export async function handleApps(request, env, method, path) {
  // GET /api/apps - List all apps
  if (method === 'GET' && path === '/api/apps') {
    const { results } = await env.DB.prepare(
      'SELECT * FROM apps ORDER BY name'
    ).all();

    return new Response(JSON.stringify({ apps: results }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // TODO: Add POST, PUT, DELETE endpoints

  return new Response(JSON.stringify({ error: 'Not implemented' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' },
  });
}

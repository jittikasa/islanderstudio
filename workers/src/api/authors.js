/**
 * Authors API endpoints
 * TODO: Implement full CRUD operations
 */

export async function handleAuthors(request, env, method, path) {
  // GET /api/authors - List all authors
  if (method === 'GET' && path === '/api/authors') {
    const { results } = await env.DB.prepare(
      'SELECT * FROM authors ORDER BY name'
    ).all();

    return new Response(JSON.stringify({ authors: results }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // TODO: Add POST, PUT, DELETE endpoints

  return new Response(JSON.stringify({ error: 'Not implemented' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' },
  });
}

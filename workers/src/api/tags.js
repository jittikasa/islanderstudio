/**
 * Tags API endpoints
 * TODO: Implement full CRUD operations
 */

export async function handleTags(request, env, method, path) {
  // GET /api/tags - List all tags
  if (method === 'GET' && path === '/api/tags') {
    const { results } = await env.DB.prepare(
      'SELECT * FROM tags ORDER BY title'
    ).all();

    return new Response(JSON.stringify({ tags: results }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // TODO: Add POST, PUT, DELETE endpoints

  return new Response(JSON.stringify({ error: 'Not implemented' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' },
  });
}

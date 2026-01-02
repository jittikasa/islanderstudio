/**
 * Categories API endpoints
 * TODO: Implement full CRUD operations
 */

export async function handleCategories(request, env, method, path) {
  // GET /api/categories - List all categories
  if (method === 'GET' && path === '/api/categories') {
    const { results } = await env.DB.prepare(
      'SELECT * FROM categories ORDER BY title'
    ).all();

    return new Response(JSON.stringify({ categories: results }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // TODO: Add POST, PUT, DELETE endpoints

  return new Response(JSON.stringify({ error: 'Not implemented' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' },
  });
}

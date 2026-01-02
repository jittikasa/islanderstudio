/**
 * Media (R2) API endpoints
 * TODO: Implement image upload/management
 */

export async function handleMedia(request, env, method, path) {
  // GET /api/media - List all media
  if (method === 'GET' && path === '/api/media') {
    // TODO: List objects from R2 bucket
    return new Response(JSON.stringify({ media: [] }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // POST /api/media - Upload image
  if (method === 'POST' && path === '/api/media') {
    // TODO: Handle multipart upload to R2
    return new Response(JSON.stringify({ error: 'Not implemented' }), {
      status: 501,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // TODO: Add DELETE endpoint

  return new Response(JSON.stringify({ error: 'Not implemented' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' },
  });
}

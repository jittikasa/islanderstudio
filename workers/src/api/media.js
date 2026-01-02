/**
 * Media (R2) API endpoints
 * Handles image upload, listing, and deletion
 */

/**
 * Generate a UUID v4
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get image dimensions from image data
 * This is a basic implementation - you may want to use a library for more robust parsing
 */
async function getImageDimensions(arrayBuffer, contentType) {
  // For simplicity, we'll skip dimension parsing
  // In production, you'd use a library to parse JPEG/PNG headers
  return { width: null, height: null };
}

export async function handleMedia(request, env, method, path) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // GET /api/media - List all media
  if (method === 'GET' && path === '/api/media') {
    try {
      const media = await env.DB.prepare(
        'SELECT * FROM media ORDER BY created_at DESC'
      ).all();

      return new Response(JSON.stringify({ media: media.results || [] }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } catch (error) {
      console.error('Error listing media:', error);
      return new Response(JSON.stringify({ error: 'Failed to list media' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  }

  // POST /api/media - Upload image
  if (method === 'POST' && path === '/api/media') {
    try {
      // Parse multipart form data
      const formData = await request.formData();
      const file = formData.get('file');
      const altText = formData.get('alt_text') || '';

      if (!file) {
        return new Response(JSON.stringify({ error: 'No file provided' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // Validate file type (only images)
      if (!file.type.startsWith('image/')) {
        return new Response(JSON.stringify({ error: 'Only image files are allowed' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // Generate unique key for R2
      const id = generateUUID();
      const extension = file.name.split('.').pop();
      const timestamp = Date.now();
      const key = `uploads/${timestamp}-${id}.${extension}`;

      // Upload to R2
      const arrayBuffer = await file.arrayBuffer();
      await env.MEDIA.put(key, arrayBuffer, {
        httpMetadata: {
          contentType: file.type,
        },
      });

      // Get image dimensions (basic implementation)
      const { width, height } = await getImageDimensions(arrayBuffer, file.type);

      // Construct public URL
      // Note: You'll need to configure R2 public access or use Cloudflare Images
      const url = `https://media.islanderstudio.app/${key}`;

      // Store metadata in D1
      await env.DB.prepare(
        `INSERT INTO media (id, filename, key, url, size, content_type, width, height, alt_text)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        id,
        file.name,
        key,
        url,
        file.size,
        file.type,
        width,
        height,
        altText
      ).run();

      return new Response(JSON.stringify({
        success: true,
        media: {
          id,
          filename: file.name,
          key,
          url,
          size: file.size,
          content_type: file.type,
          width,
          height,
          alt_text: altText,
        },
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } catch (error) {
      console.error('Error uploading media:', error);
      return new Response(JSON.stringify({ error: 'Failed to upload media' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  }

  // DELETE /api/media/:id - Delete image
  if (method === 'DELETE' && path.match(/^\/api\/media\/[^/]+$/)) {
    try {
      const id = path.split('/').pop();

      // Get media record to find R2 key
      const media = await env.DB.prepare(
        'SELECT * FROM media WHERE id = ?'
      ).bind(id).first();

      if (!media) {
        return new Response(JSON.stringify({ error: 'Media not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // Delete from R2
      await env.MEDIA.delete(media.key);

      // Delete from D1
      await env.DB.prepare(
        'DELETE FROM media WHERE id = ?'
      ).bind(id).run();

      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } catch (error) {
      console.error('Error deleting media:', error);
      return new Response(JSON.stringify({ error: 'Failed to delete media' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

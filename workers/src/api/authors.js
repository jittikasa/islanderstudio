/**
 * Authors API endpoints
 * Full CRUD operations for managing blog authors
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
 * Generate slug from name
 */
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 96);
}

/**
 * JSON response helper
 */
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function handleAuthors(request, env, method, path) {
  // GET /api/authors - List all authors
  if (method === 'GET' && path === '/api/authors') {
    try {
      const { results } = await env.DB.prepare(
        'SELECT * FROM authors ORDER BY name'
      ).all();

      return jsonResponse({ authors: results });
    } catch (error) {
      console.error('Error fetching authors:', error);
      return jsonResponse({ error: 'Failed to fetch authors' }, 500);
    }
  }

  // GET /api/authors/:id - Get single author
  if (method === 'GET' && path.match(/^\/api\/authors\/[^/]+$/)) {
    const id = path.split('/').pop();

    try {
      const author = await env.DB.prepare(
        'SELECT * FROM authors WHERE id = ? OR slug = ?'
      ).bind(id, id).first();

      if (!author) {
        return jsonResponse({ error: 'Author not found' }, 404);
      }

      return jsonResponse({ author });
    } catch (error) {
      console.error('Error fetching author:', error);
      return jsonResponse({ error: 'Failed to fetch author' }, 500);
    }
  }

  // POST /api/authors - Create new author
  if (method === 'POST' && path === '/api/authors') {
    try {
      const data = await request.json();

      // Validate required fields
      if (!data.name) {
        return jsonResponse({ error: 'Name is required' }, 400);
      }

      const authorId = generateUUID();
      const slug = data.slug || generateSlug(data.name);

      // Check if slug already exists
      const existing = await env.DB.prepare(
        'SELECT id FROM authors WHERE slug = ?'
      ).bind(slug).first();

      if (existing) {
        return jsonResponse({ error: 'Author with this slug already exists' }, 400);
      }

      // Insert author
      await env.DB.prepare(`
        INSERT INTO authors (
          id, name, slug, bio, image_url, email, social_links, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        authorId,
        data.name,
        slug,
        data.bio || null,
        data.imageUrl || null,
        data.email || null,
        data.socialLinks ? JSON.stringify(data.socialLinks) : null
      ).run();

      return jsonResponse({ success: true, authorId, slug }, 201);
    } catch (error) {
      console.error('Error creating author:', error);
      return jsonResponse({ error: 'Failed to create author' }, 500);
    }
  }

  // PUT /api/authors/:id - Update author
  if (method === 'PUT' && path.match(/^\/api\/authors\/[^/]+$/)) {
    const id = path.split('/').pop();

    try {
      const data = await request.json();

      // Check if author exists
      const existing = await env.DB.prepare(
        'SELECT id FROM authors WHERE id = ?'
      ).bind(id).first();

      if (!existing) {
        return jsonResponse({ error: 'Author not found' }, 404);
      }

      // Build update query dynamically
      const updates = [];
      const bindings = [];

      if (data.name) {
        updates.push('name = ?');
        bindings.push(data.name);
      }
      if (data.slug) {
        // Check if new slug conflicts with another author
        const slugConflict = await env.DB.prepare(
          'SELECT id FROM authors WHERE slug = ? AND id != ?'
        ).bind(data.slug, id).first();

        if (slugConflict) {
          return jsonResponse({ error: 'Slug already in use by another author' }, 400);
        }

        updates.push('slug = ?');
        bindings.push(data.slug);
      }
      if (data.bio !== undefined) {
        updates.push('bio = ?');
        bindings.push(data.bio);
      }
      if (data.imageUrl !== undefined) {
        updates.push('image_url = ?');
        bindings.push(data.imageUrl);
      }
      if (data.email !== undefined) {
        updates.push('email = ?');
        bindings.push(data.email);
      }
      if (data.socialLinks !== undefined) {
        updates.push('social_links = ?');
        bindings.push(data.socialLinks ? JSON.stringify(data.socialLinks) : null);
      }

      if (updates.length === 0) {
        return jsonResponse({ error: 'No fields to update' }, 400);
      }

      bindings.push(id);

      await env.DB.prepare(
        `UPDATE authors SET ${updates.join(', ')} WHERE id = ?`
      ).bind(...bindings).run();

      return jsonResponse({ success: true });
    } catch (error) {
      console.error('Error updating author:', error);
      return jsonResponse({ error: 'Failed to update author' }, 500);
    }
  }

  // DELETE /api/authors/:id - Delete author
  if (method === 'DELETE' && path.match(/^\/api\/authors\/[^/]+$/)) {
    const id = path.split('/').pop();

    try {
      // Check if author exists
      const existing = await env.DB.prepare(
        'SELECT id FROM authors WHERE id = ?'
      ).bind(id).first();

      if (!existing) {
        return jsonResponse({ error: 'Author not found' }, 404);
      }

      // Check if author is used in any posts
      const postsCount = await env.DB.prepare(
        'SELECT COUNT(*) as count FROM posts WHERE author_id = ?'
      ).bind(id).first();

      if (postsCount.count > 0) {
        return jsonResponse({
          error: `Cannot delete author. ${postsCount.count} post(s) are using this author.`
        }, 400);
      }

      // Delete author
      await env.DB.prepare('DELETE FROM authors WHERE id = ?').bind(id).run();

      return jsonResponse({ success: true });
    } catch (error) {
      console.error('Error deleting author:', error);
      return jsonResponse({ error: 'Failed to delete author' }, 500);
    }
  }

  return jsonResponse({ error: 'Not found' }, 404);
}

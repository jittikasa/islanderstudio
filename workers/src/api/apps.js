/**
 * Apps API endpoints
 * Full CRUD operations for managing blog apps
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

export async function handleApps(request, env, method, path) {
  // GET /api/apps - List all apps
  if (method === 'GET' && path === '/api/apps') {
    try {
      const { results } = await env.DB.prepare(
        'SELECT * FROM apps ORDER BY name'
      ).all();

      return jsonResponse({ apps: results });
    } catch (error) {
      console.error('Error fetching apps:', error);
      return jsonResponse({ error: 'Failed to fetch apps' }, 500);
    }
  }

  // GET /api/apps/:id - Get single app
  if (method === 'GET' && path.match(/^\/api\/apps\/[^/]+$/)) {
    const id = path.split('/').pop();

    try {
      const app = await env.DB.prepare(
        'SELECT * FROM apps WHERE id = ? OR slug = ? OR name = ?'
      ).bind(id, id, id).first();

      if (!app) {
        return jsonResponse({ error: 'App not found' }, 404);
      }

      return jsonResponse({ app });
    } catch (error) {
      console.error('Error fetching app:', error);
      return jsonResponse({ error: 'Failed to fetch app' }, 500);
    }
  }

  // POST /api/apps - Create new app
  if (method === 'POST' && path === '/api/apps') {
    try {
      const data = await request.json();

      // Validate required fields
      if (!data.name || !data.displayName) {
        return jsonResponse({ error: 'Name and displayName are required' }, 400);
      }

      const appId = generateUUID();
      const slug = data.slug || generateSlug(data.name);

      // Check if name already exists
      const existingName = await env.DB.prepare(
        'SELECT id FROM apps WHERE name = ?'
      ).bind(data.name).first();

      if (existingName) {
        return jsonResponse({ error: 'App with this name already exists' }, 400);
      }

      // Check if slug already exists
      const existingSlug = await env.DB.prepare(
        'SELECT id FROM apps WHERE slug = ?'
      ).bind(slug).first();

      if (existingSlug) {
        return jsonResponse({ error: 'App with this slug already exists' }, 400);
      }

      // Insert app
      await env.DB.prepare(`
        INSERT INTO apps (
          id, name, display_name, slug, description, url, icon_url, color, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        appId,
        data.name,
        data.displayName,
        slug,
        data.description || null,
        data.url || null,
        data.iconUrl || null,
        data.color || null
      ).run();

      return jsonResponse({ success: true, appId, slug }, 201);
    } catch (error) {
      console.error('Error creating app:', error);
      return jsonResponse({ error: 'Failed to create app' }, 500);
    }
  }

  // PUT /api/apps/:id - Update app
  if (method === 'PUT' && path.match(/^\/api\/apps\/[^/]+$/)) {
    const id = path.split('/').pop();

    try {
      const data = await request.json();

      // Check if app exists
      const existing = await env.DB.prepare(
        'SELECT id FROM apps WHERE id = ?'
      ).bind(id).first();

      if (!existing) {
        return jsonResponse({ error: 'App not found' }, 404);
      }

      // Build update query dynamically
      const updates = [];
      const bindings = [];

      if (data.name) {
        // Check if new name conflicts with another app
        const nameConflict = await env.DB.prepare(
          'SELECT id FROM apps WHERE name = ? AND id != ?'
        ).bind(data.name, id).first();

        if (nameConflict) {
          return jsonResponse({ error: 'Name already in use by another app' }, 400);
        }

        updates.push('name = ?');
        bindings.push(data.name);
      }
      if (data.displayName) {
        updates.push('display_name = ?');
        bindings.push(data.displayName);
      }
      if (data.slug) {
        // Check if new slug conflicts with another app
        const slugConflict = await env.DB.prepare(
          'SELECT id FROM apps WHERE slug = ? AND id != ?'
        ).bind(data.slug, id).first();

        if (slugConflict) {
          return jsonResponse({ error: 'Slug already in use by another app' }, 400);
        }

        updates.push('slug = ?');
        bindings.push(data.slug);
      }
      if (data.description !== undefined) {
        updates.push('description = ?');
        bindings.push(data.description);
      }
      if (data.url !== undefined) {
        updates.push('url = ?');
        bindings.push(data.url);
      }
      if (data.iconUrl !== undefined) {
        updates.push('icon_url = ?');
        bindings.push(data.iconUrl);
      }
      if (data.color !== undefined) {
        updates.push('color = ?');
        bindings.push(data.color);
      }

      if (updates.length === 0) {
        return jsonResponse({ error: 'No fields to update' }, 400);
      }

      bindings.push(id);

      await env.DB.prepare(
        `UPDATE apps SET ${updates.join(', ')} WHERE id = ?`
      ).bind(...bindings).run();

      return jsonResponse({ success: true });
    } catch (error) {
      console.error('Error updating app:', error);
      return jsonResponse({ error: 'Failed to update app' }, 500);
    }
  }

  // DELETE /api/apps/:id - Delete app
  if (method === 'DELETE' && path.match(/^\/api\/apps\/[^/]+$/)) {
    const id = path.split('/').pop();

    try {
      // Check if app exists
      const existing = await env.DB.prepare(
        'SELECT id FROM apps WHERE id = ?'
      ).bind(id).first();

      if (!existing) {
        return jsonResponse({ error: 'App not found' }, 404);
      }

      // Check if app is used in any posts
      const postsCount = await env.DB.prepare(
        'SELECT COUNT(*) as count FROM post_apps WHERE app_id = ?'
      ).bind(id).first();

      if (postsCount.count > 0) {
        return jsonResponse({
          error: `Cannot delete app. ${postsCount.count} post(s) are using this app.`
        }, 400);
      }

      // Delete app
      await env.DB.prepare('DELETE FROM apps WHERE id = ?').bind(id).run();

      return jsonResponse({ success: true });
    } catch (error) {
      console.error('Error deleting app:', error);
      return jsonResponse({ error: 'Failed to delete app' }, 500);
    }
  }

  return jsonResponse({ error: 'Not found' }, 404);
}

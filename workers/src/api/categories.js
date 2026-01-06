/**
 * Categories API endpoints
 * Full CRUD operations for managing blog categories
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
 * Generate slug from title
 */
function generateSlug(title) {
  return title
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

export async function handleCategories(request, env, method, path) {
  // GET /api/categories - List all categories
  if (method === 'GET' && path === '/api/categories') {
    try {
      const { results } = await env.DB.prepare(
        'SELECT * FROM categories ORDER BY title'
      ).all();

      return jsonResponse({ categories: results });
    } catch (error) {
      console.error('Error fetching categories:', error);
      return jsonResponse({ error: 'Failed to fetch categories' }, 500);
    }
  }

  // GET /api/categories/:id - Get single category
  if (method === 'GET' && path.match(/^\/api\/categories\/[^/]+$/)) {
    const id = path.split('/').pop();

    try {
      const category = await env.DB.prepare(
        'SELECT * FROM categories WHERE id = ? OR slug = ?'
      ).bind(id, id).first();

      if (!category) {
        return jsonResponse({ error: 'Category not found' }, 404);
      }

      return jsonResponse({ category });
    } catch (error) {
      console.error('Error fetching category:', error);
      return jsonResponse({ error: 'Failed to fetch category' }, 500);
    }
  }

  // POST /api/categories - Create new category
  if (method === 'POST' && path === '/api/categories') {
    try {
      const data = await request.json();

      // Validate required fields
      if (!data.title) {
        return jsonResponse({ error: 'Title is required' }, 400);
      }

      const categoryId = generateUUID();
      const slug = data.slug || generateSlug(data.title);

      // Check if slug already exists
      const existing = await env.DB.prepare(
        'SELECT id FROM categories WHERE slug = ?'
      ).bind(slug).first();

      if (existing) {
        return jsonResponse({ error: 'Category with this slug already exists' }, 400);
      }

      // Insert category
      await env.DB.prepare(`
        INSERT INTO categories (
          id, title, slug, description, color, icon, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        categoryId,
        data.title,
        slug,
        data.description || null,
        data.color || null,
        data.icon || null
      ).run();

      return jsonResponse({ success: true, categoryId, slug }, 201);
    } catch (error) {
      console.error('Error creating category:', error);
      return jsonResponse({ error: 'Failed to create category' }, 500);
    }
  }

  // PUT /api/categories/:id - Update category
  if (method === 'PUT' && path.match(/^\/api\/categories\/[^/]+$/)) {
    const id = path.split('/').pop();

    try {
      const data = await request.json();

      // Check if category exists
      const existing = await env.DB.prepare(
        'SELECT id FROM categories WHERE id = ?'
      ).bind(id).first();

      if (!existing) {
        return jsonResponse({ error: 'Category not found' }, 404);
      }

      // Build update query dynamically
      const updates = [];
      const bindings = [];

      if (data.title) {
        updates.push('title = ?');
        bindings.push(data.title);
      }
      if (data.slug) {
        // Check if new slug conflicts with another category
        const slugConflict = await env.DB.prepare(
          'SELECT id FROM categories WHERE slug = ? AND id != ?'
        ).bind(data.slug, id).first();

        if (slugConflict) {
          return jsonResponse({ error: 'Slug already in use by another category' }, 400);
        }

        updates.push('slug = ?');
        bindings.push(data.slug);
      }
      if (data.description !== undefined) {
        updates.push('description = ?');
        bindings.push(data.description);
      }
      if (data.color !== undefined) {
        updates.push('color = ?');
        bindings.push(data.color);
      }
      if (data.icon !== undefined) {
        updates.push('icon = ?');
        bindings.push(data.icon);
      }

      if (updates.length === 0) {
        return jsonResponse({ error: 'No fields to update' }, 400);
      }

      bindings.push(id);

      await env.DB.prepare(
        `UPDATE categories SET ${updates.join(', ')} WHERE id = ?`
      ).bind(...bindings).run();

      return jsonResponse({ success: true });
    } catch (error) {
      console.error('Error updating category:', error);
      return jsonResponse({ error: 'Failed to update category' }, 500);
    }
  }

  // DELETE /api/categories/:id - Delete category
  if (method === 'DELETE' && path.match(/^\/api\/categories\/[^/]+$/)) {
    const id = path.split('/').pop();

    try {
      // Check if category exists
      const existing = await env.DB.prepare(
        'SELECT id FROM categories WHERE id = ?'
      ).bind(id).first();

      if (!existing) {
        return jsonResponse({ error: 'Category not found' }, 404);
      }

      // Check if category is used in any posts
      const postsCount = await env.DB.prepare(
        'SELECT COUNT(*) as count FROM post_categories WHERE category_id = ?'
      ).bind(id).first();

      if (postsCount.count > 0) {
        return jsonResponse({
          error: `Cannot delete category. ${postsCount.count} post(s) are using this category.`
        }, 400);
      }

      // Delete category
      await env.DB.prepare('DELETE FROM categories WHERE id = ?').bind(id).run();

      return jsonResponse({ success: true });
    } catch (error) {
      console.error('Error deleting category:', error);
      return jsonResponse({ error: 'Failed to delete category' }, 500);
    }
  }

  return jsonResponse({ error: 'Not found' }, 404);
}

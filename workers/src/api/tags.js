/**
 * Tags API endpoints
 * Full CRUD operations for managing blog tags
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

export async function handleTags(request, env, method, path) {
  // GET /api/tags - List all tags with post counts
  if (method === 'GET' && path === '/api/tags') {
    try {
      const { results } = await env.DB.prepare(`
        SELECT
          t.*,
          COUNT(pt.post_id) as post_count
        FROM tags t
        LEFT JOIN post_tags pt ON t.id = pt.tag_id
        GROUP BY t.id
        ORDER BY t.title
      `).all();

      return jsonResponse({ tags: results });
    } catch (error) {
      console.error('Error fetching tags:', error);
      return jsonResponse({ error: 'Failed to fetch tags' }, 500);
    }
  }

  // POST /api/tags/merge - Merge multiple tags into one
  if (method === 'POST' && path === '/api/tags/merge') {
    try {
      const data = await request.json();
      const { sourceIds, targetId } = data;

      if (!sourceIds || !Array.isArray(sourceIds) || sourceIds.length === 0) {
        return jsonResponse({ error: 'sourceIds array is required' }, 400);
      }

      if (!targetId) {
        return jsonResponse({ error: 'targetId is required' }, 400);
      }

      // Verify target tag exists
      const targetTag = await env.DB.prepare(
        'SELECT id FROM tags WHERE id = ?'
      ).bind(targetId).first();

      if (!targetTag) {
        return jsonResponse({ error: 'Target tag not found' }, 404);
      }

      // Filter out the target from source ids
      const tagsToMerge = sourceIds.filter(id => id !== targetId);

      if (tagsToMerge.length === 0) {
        return jsonResponse({ error: 'No tags to merge' }, 400);
      }

      // For each source tag, update post_tags to point to target
      // We need to handle duplicates (a post might already have the target tag)
      for (const sourceId of tagsToMerge) {
        // Get posts that have the source tag but not the target tag
        await env.DB.prepare(`
          UPDATE post_tags
          SET tag_id = ?
          WHERE tag_id = ?
          AND post_id NOT IN (
            SELECT post_id FROM post_tags WHERE tag_id = ?
          )
        `).bind(targetId, sourceId, targetId).run();

        // Delete remaining post_tags for source (duplicates)
        await env.DB.prepare(
          'DELETE FROM post_tags WHERE tag_id = ?'
        ).bind(sourceId).run();

        // Delete the source tag
        await env.DB.prepare(
          'DELETE FROM tags WHERE id = ?'
        ).bind(sourceId).run();
      }

      return jsonResponse({
        success: true,
        mergedCount: tagsToMerge.length
      });
    } catch (error) {
      console.error('Error merging tags:', error);
      return jsonResponse({ error: 'Failed to merge tags' }, 500);
    }
  }

  // POST /api/tags/bulk-delete - Delete multiple unused tags
  if (method === 'POST' && path === '/api/tags/bulk-delete') {
    try {
      const data = await request.json();
      const { tagIds, unusedOnly } = data;

      if (unusedOnly) {
        // Delete all tags that have no posts
        const result = await env.DB.prepare(`
          DELETE FROM tags
          WHERE id NOT IN (
            SELECT DISTINCT tag_id FROM post_tags
          )
        `).run();

        return jsonResponse({
          success: true,
          deletedCount: result.meta?.changes || 0
        });
      }

      if (!tagIds || !Array.isArray(tagIds) || tagIds.length === 0) {
        return jsonResponse({ error: 'tagIds array is required' }, 400);
      }

      // Check which tags are unused
      let deletedCount = 0;
      const skippedTags = [];

      for (const tagId of tagIds) {
        const postsCount = await env.DB.prepare(
          'SELECT COUNT(*) as count FROM post_tags WHERE tag_id = ?'
        ).bind(tagId).first();

        if (postsCount.count > 0) {
          const tag = await env.DB.prepare(
            'SELECT title FROM tags WHERE id = ?'
          ).bind(tagId).first();
          skippedTags.push(tag?.title || tagId);
          continue;
        }

        await env.DB.prepare('DELETE FROM tags WHERE id = ?').bind(tagId).run();
        deletedCount++;
      }

      return jsonResponse({
        success: true,
        deletedCount,
        skippedTags
      });
    } catch (error) {
      console.error('Error bulk deleting tags:', error);
      return jsonResponse({ error: 'Failed to delete tags' }, 500);
    }
  }

  // GET /api/tags/:id - Get single tag
  if (method === 'GET' && path.match(/^\/api\/tags\/[^/]+$/)) {
    const id = path.split('/').pop();

    try {
      const tag = await env.DB.prepare(
        'SELECT * FROM tags WHERE id = ? OR slug = ?'
      ).bind(id, id).first();

      if (!tag) {
        return jsonResponse({ error: 'Tag not found' }, 404);
      }

      return jsonResponse({ tag });
    } catch (error) {
      console.error('Error fetching tag:', error);
      return jsonResponse({ error: 'Failed to fetch tag' }, 500);
    }
  }

  // POST /api/tags - Create new tag
  if (method === 'POST' && path === '/api/tags') {
    try {
      const data = await request.json();

      // Validate required fields
      if (!data.title) {
        return jsonResponse({ error: 'Title is required' }, 400);
      }

      const tagId = generateUUID();
      const slug = data.slug || generateSlug(data.title);

      // Check if slug already exists
      const existing = await env.DB.prepare(
        'SELECT id FROM tags WHERE slug = ?'
      ).bind(slug).first();

      if (existing) {
        return jsonResponse({ error: 'Tag with this slug already exists' }, 400);
      }

      // Insert tag
      await env.DB.prepare(`
        INSERT INTO tags (
          id, title, slug, description, created_at
        ) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        tagId,
        data.title,
        slug,
        data.description || null
      ).run();

      return jsonResponse({ success: true, tagId, slug }, 201);
    } catch (error) {
      console.error('Error creating tag:', error);
      return jsonResponse({ error: 'Failed to create tag' }, 500);
    }
  }

  // PUT /api/tags/:id - Update tag
  if (method === 'PUT' && path.match(/^\/api\/tags\/[^/]+$/)) {
    const id = path.split('/').pop();

    try {
      const data = await request.json();

      // Check if tag exists
      const existing = await env.DB.prepare(
        'SELECT id FROM tags WHERE id = ?'
      ).bind(id).first();

      if (!existing) {
        return jsonResponse({ error: 'Tag not found' }, 404);
      }

      // Build update query dynamically
      const updates = [];
      const bindings = [];

      if (data.title) {
        updates.push('title = ?');
        bindings.push(data.title);
      }
      if (data.slug) {
        // Check if new slug conflicts with another tag
        const slugConflict = await env.DB.prepare(
          'SELECT id FROM tags WHERE slug = ? AND id != ?'
        ).bind(data.slug, id).first();

        if (slugConflict) {
          return jsonResponse({ error: 'Slug already in use by another tag' }, 400);
        }

        updates.push('slug = ?');
        bindings.push(data.slug);
      }
      if (data.description !== undefined) {
        updates.push('description = ?');
        bindings.push(data.description);
      }

      if (updates.length === 0) {
        return jsonResponse({ error: 'No fields to update' }, 400);
      }

      bindings.push(id);

      await env.DB.prepare(
        `UPDATE tags SET ${updates.join(', ')} WHERE id = ?`
      ).bind(...bindings).run();

      return jsonResponse({ success: true });
    } catch (error) {
      console.error('Error updating tag:', error);
      return jsonResponse({ error: 'Failed to update tag' }, 500);
    }
  }

  // DELETE /api/tags/:id - Delete tag
  if (method === 'DELETE' && path.match(/^\/api\/tags\/[^/]+$/)) {
    const id = path.split('/').pop();

    try {
      // Check if tag exists
      const existing = await env.DB.prepare(
        'SELECT id FROM tags WHERE id = ?'
      ).bind(id).first();

      if (!existing) {
        return jsonResponse({ error: 'Tag not found' }, 404);
      }

      // Check if tag is used in any posts
      const postsCount = await env.DB.prepare(
        'SELECT COUNT(*) as count FROM post_tags WHERE tag_id = ?'
      ).bind(id).first();

      if (postsCount.count > 0) {
        return jsonResponse({
          error: `Cannot delete tag. ${postsCount.count} post(s) are using this tag.`
        }, 400);
      }

      // Delete tag
      await env.DB.prepare('DELETE FROM tags WHERE id = ?').bind(id).run();

      return jsonResponse({ success: true });
    } catch (error) {
      console.error('Error deleting tag:', error);
      return jsonResponse({ error: 'Failed to delete tag' }, 500);
    }
  }

  return jsonResponse({ error: 'Not found' }, 404);
}

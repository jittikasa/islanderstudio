/**
 * Posts API endpoints
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
 * Calculate reading time (words / 200 wpm)
 */
function calculateReadingTime(html) {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  return Math.ceil(words / 200);
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

/**
 * GET /api/posts
 * Query params:
 *  - status: filter by content_status
 *  - app: filter by related app
 *  - category: filter by category slug
 *  - tag: filter by tag slug
 *  - search: search in title, excerpt, and body
 *  - limit: number of posts to return
 *  - offset: pagination offset
 */
export async function handlePosts(request, env) {
  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const app = url.searchParams.get('app');
  const category = url.searchParams.get('category');
  const tag = url.searchParams.get('tag');
  const search = url.searchParams.get('search');
  const limit = Math.min(parseInt(url.searchParams.get('limit')) || 50, 100);
  const offset = parseInt(url.searchParams.get('offset')) || 0;

  try {
    let query = `
      SELECT
        p.*,
        a.name as author_name,
        a.image_url as author_image,
        GROUP_CONCAT(DISTINCT c.title) as categories,
        GROUP_CONCAT(DISTINCT t.title) as tags,
        GROUP_CONCAT(DISTINCT app.name) as related_apps
      FROM posts p
      LEFT JOIN authors a ON p.author_id = a.id
      LEFT JOIN post_categories pc ON p.id = pc.post_id
      LEFT JOIN categories c ON pc.category_id = c.id
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      LEFT JOIN post_apps pa ON p.id = pa.post_id
      LEFT JOIN apps app ON pa.app_id = app.id
    `;

    const conditions = [];
    const bindings = [];

    if (status) {
      conditions.push('p.content_status = ?');
      bindings.push(status);
    }

    if (app) {
      query += ` INNER JOIN post_apps pa2 ON p.id = pa2.post_id
                 INNER JOIN apps app2 ON pa2.app_id = app2.id`;
      conditions.push('app2.name = ?');
      bindings.push(app);
    }

    if (category) {
      query += ` INNER JOIN post_categories pc2 ON p.id = pc2.post_id
                 INNER JOIN categories c2 ON pc2.category_id = c2.id`;
      conditions.push('c2.slug = ?');
      bindings.push(category);
    }

    if (tag) {
      query += ` INNER JOIN post_tags pt2 ON p.id = pt2.post_id
                 INNER JOIN tags t2 ON pt2.tag_id = t2.id`;
      conditions.push('t2.slug = ?');
      bindings.push(tag);
    }

    if (search) {
      const searchPattern = `%${search}%`;
      conditions.push('(p.title LIKE ? OR p.excerpt LIKE ? OR p.body LIKE ?)');
      bindings.push(searchPattern, searchPattern, searchPattern);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += `
      GROUP BY p.id
      ORDER BY p.published_at DESC
      LIMIT ? OFFSET ?
    `;
    bindings.push(limit, offset);

    const { results } = await env.DB.prepare(query).bind(...bindings).all();

    // Parse concatenated strings into arrays
    const posts = results.map(post => ({
      ...post,
      categories: post.categories ? post.categories.split(',') : [],
      tags: post.tags ? post.tags.split(',') : [],
      relatedApps: post.related_apps ? post.related_apps.split(',') : [],
    }));

    return jsonResponse({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return jsonResponse({ error: 'Failed to fetch posts' }, 500);
  }
}

/**
 * GET /api/posts/:slug
 * Get a single post by slug with all relationships
 */
export async function handlePost(slug, env) {
  try {
    const query = `
      SELECT
        p.*,
        a.name as author_name,
        a.slug as author_slug,
        a.image_url as author_image,
        a.bio as author_bio,
        GROUP_CONCAT(DISTINCT c.id || ':' || c.title) as categories,
        GROUP_CONCAT(DISTINCT t.id || ':' || t.title) as tags,
        GROUP_CONCAT(DISTINCT app.id || ':' || app.name || ':' || app.display_name) as related_apps
      FROM posts p
      LEFT JOIN authors a ON p.author_id = a.id
      LEFT JOIN post_categories pc ON p.id = pc.post_id
      LEFT JOIN categories c ON pc.category_id = c.id
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      LEFT JOIN post_apps pa ON p.id = pa.post_id
      LEFT JOIN apps app ON pa.app_id = app.id
      WHERE p.slug = ?
      GROUP BY p.id
    `;

    const post = await env.DB.prepare(query).bind(slug).first();

    if (!post) {
      return jsonResponse({ error: 'Post not found' }, 404);
    }

    // Parse relationships
    const formattedPost = {
      ...post,
      categories: post.categories
        ? post.categories.split(',').map(c => {
            const [id, title] = c.split(':');
            return { id, title };
          })
        : [],
      tags: post.tags
        ? post.tags.split(',').map(t => {
            const [id, title] = t.split(':');
            return { id, title };
          })
        : [],
      relatedApps: post.related_apps
        ? post.related_apps.split(',').map(a => {
            const [id, name, displayName] = a.split(':');
            return { id, name, displayName };
          })
        : [],
    };

    return jsonResponse({ post: formattedPost });
  } catch (error) {
    console.error('Error fetching post:', error);
    return jsonResponse({ error: 'Failed to fetch post' }, 500);
  }
}

/**
 * POST /api/posts
 * Create a new post
 */
export async function createPost(request, env) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.excerpt || !data.body) {
      return jsonResponse({ error: 'Title, excerpt, and body are required' }, 400);
    }

    const postId = generateUUID();
    const slug = data.slug || generateSlug(data.title);
    const readingTime = calculateReadingTime(data.body);
    const now = new Date().toISOString();

    // Insert post
    await env.DB.prepare(`
      INSERT INTO posts (
        id, title, slug, excerpt, body, featured, reading_time,
        published_at, updated_at, content_status,
        seo_meta_title, seo_meta_description, seo_focus_keyword,
        seo_keywords, seo_og_image_url, seo_canonical_url,
        seo_no_index, seo_og_type,
        main_image_url, main_image_alt,
        author_id, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      postId,
      data.title,
      slug,
      data.excerpt,
      data.body,
      data.featured ? 1 : 0,
      readingTime,
      data.publishedAt || now,
      data.updatedAt || null,
      data.contentStatus || 'draft',
      data.seo?.metaTitle || null,
      data.seo?.metaDescription || null,
      data.seo?.focusKeyword || null,
      data.seo?.keywords ? JSON.stringify(data.seo.keywords) : null,
      data.seo?.ogImageUrl || null,
      data.seo?.canonicalUrl || null,
      data.seo?.noIndex ? 1 : 0,
      data.seo?.ogType || 'article',
      data.mainImageUrl || null,
      data.mainImageAlt || null,
      data.authorId || null,
      now
    ).run();

    // Insert relationships
    if (data.categories && data.categories.length > 0) {
      for (const categoryId of data.categories) {
        await env.DB.prepare(
          'INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)'
        ).bind(postId, categoryId).run();
      }
    }

    if (data.tags && data.tags.length > 0) {
      for (const tagId of data.tags) {
        await env.DB.prepare(
          'INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)'
        ).bind(postId, tagId).run();
      }
    }

    if (data.relatedApps && data.relatedApps.length > 0) {
      for (const appId of data.relatedApps) {
        await env.DB.prepare(
          'INSERT INTO post_apps (post_id, app_id) VALUES (?, ?)'
        ).bind(postId, appId).run();
      }
    }

    return jsonResponse({ success: true, postId, slug }, 201);
  } catch (error) {
    console.error('Error creating post:', error);
    return jsonResponse({ error: 'Failed to create post' }, 500);
  }
}

/**
 * PUT /api/posts/:id
 * Update an existing post
 */
export async function updatePost(id, request, env) {
  try {
    const data = await request.json();

    // Check if post exists
    const existing = await env.DB.prepare('SELECT id FROM posts WHERE id = ?').bind(id).first();
    if (!existing) {
      return jsonResponse({ error: 'Post not found' }, 404);
    }

    const readingTime = data.body ? calculateReadingTime(data.body) : undefined;
    const now = new Date().toISOString();

    // Build update query dynamically based on provided fields
    const updates = [];
    const bindings = [];

    if (data.title) {
      updates.push('title = ?');
      bindings.push(data.title);
    }
    if (data.slug) {
      updates.push('slug = ?');
      bindings.push(data.slug);
    }
    if (data.excerpt) {
      updates.push('excerpt = ?');
      bindings.push(data.excerpt);
    }
    if (data.body) {
      updates.push('body = ?', 'reading_time = ?');
      bindings.push(data.body, readingTime);
    }
    if (data.featured !== undefined) {
      updates.push('featured = ?');
      bindings.push(data.featured ? 1 : 0);
    }
    if (data.contentStatus) {
      updates.push('content_status = ?');
      bindings.push(data.contentStatus);
    }
    if (data.authorId) {
      updates.push('author_id = ?');
      bindings.push(data.authorId);
    }
    if (data.mainImageUrl !== undefined) {
      updates.push('main_image_url = ?');
      bindings.push(data.mainImageUrl);
    }
    if (data.mainImageAlt !== undefined) {
      updates.push('main_image_alt = ?');
      bindings.push(data.mainImageAlt);
    }

    updates.push('updated_at = ?');
    bindings.push(now);

    bindings.push(id);

    await env.DB.prepare(
      `UPDATE posts SET ${updates.join(', ')} WHERE id = ?`
    ).bind(...bindings).run();

    // Update relationships if provided
    if (data.categories) {
      await env.DB.prepare('DELETE FROM post_categories WHERE post_id = ?').bind(id).run();
      for (const categoryId of data.categories) {
        await env.DB.prepare(
          'INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)'
        ).bind(id, categoryId).run();
      }
    }

    if (data.tags) {
      await env.DB.prepare('DELETE FROM post_tags WHERE post_id = ?').bind(id).run();
      for (const tagId of data.tags) {
        await env.DB.prepare(
          'INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)'
        ).bind(id, tagId).run();
      }
    }

    if (data.relatedApps) {
      await env.DB.prepare('DELETE FROM post_apps WHERE post_id = ?').bind(id).run();
      for (const appId of data.relatedApps) {
        await env.DB.prepare(
          'INSERT INTO post_apps (post_id, app_id) VALUES (?, ?)'
        ).bind(id, appId).run();
      }
    }

    return jsonResponse({ success: true });
  } catch (error) {
    console.error('Error updating post:', error);
    return jsonResponse({ error: 'Failed to update post' }, 500);
  }
}

/**
 * DELETE /api/posts/:id
 * Delete a post
 */
export async function deletePost(id, env) {
  try {
    // Check if post exists
    const existing = await env.DB.prepare('SELECT id FROM posts WHERE id = ?').bind(id).first();
    if (!existing) {
      return jsonResponse({ error: 'Post not found' }, 404);
    }

    // Delete post (CASCADE will handle relationships)
    await env.DB.prepare('DELETE FROM posts WHERE id = ?').bind(id).run();

    return jsonResponse({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return jsonResponse({ error: 'Failed to delete post' }, 500);
  }
}

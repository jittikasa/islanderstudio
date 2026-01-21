/**
 * Stats API - Dashboard statistics
 */

/**
 * Get dashboard statistics
 */
export async function handleStats(request, env) {
  try {
    // Get counts for all entities
    const [
      postsResult,
      publishedPostsResult,
      draftPostsResult,
      authorsResult,
      categoriesResult,
      tagsResult,
      appsResult,
      recentPostsResult
    ] = await Promise.all([
      // Total posts
      env.DB.prepare('SELECT COUNT(*) as count FROM posts').first(),
      // Published posts
      env.DB.prepare("SELECT COUNT(*) as count FROM posts WHERE status = 'published'").first(),
      // Draft posts
      env.DB.prepare("SELECT COUNT(*) as count FROM posts WHERE status = 'draft'").first(),
      // Authors
      env.DB.prepare('SELECT COUNT(*) as count FROM authors').first(),
      // Categories
      env.DB.prepare('SELECT COUNT(*) as count FROM categories').first(),
      // Tags
      env.DB.prepare('SELECT COUNT(*) as count FROM tags').first(),
      // Apps
      env.DB.prepare('SELECT COUNT(*) as count FROM apps').first(),
      // Posts this week
      env.DB.prepare(`
        SELECT COUNT(*) as count FROM posts
        WHERE created_at >= datetime('now', '-7 days')
      `).first()
    ]);

    return new Response(JSON.stringify({
      stats: {
        posts: {
          total: postsResult?.count || 0,
          published: publishedPostsResult?.count || 0,
          drafts: draftPostsResult?.count || 0,
          thisWeek: recentPostsResult?.count || 0
        },
        authors: authorsResult?.count || 0,
        categories: categoriesResult?.count || 0,
        tags: tagsResult?.count || 0,
        apps: appsResult?.count || 0
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Stats error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch stats' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Get recent posts for dashboard
 */
export async function handleRecentPosts(request, env) {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit')) || 5;

    const result = await env.DB.prepare(`
      SELECT
        p.id,
        p.title,
        p.slug,
        p.status,
        p.published_at,
        p.created_at,
        p.updated_at,
        a.name as author_name
      FROM posts p
      LEFT JOIN authors a ON p.author_id = a.id
      ORDER BY p.updated_at DESC
      LIMIT ?
    `).bind(limit).all();

    return new Response(JSON.stringify({
      posts: result.results || []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Recent posts error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch recent posts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

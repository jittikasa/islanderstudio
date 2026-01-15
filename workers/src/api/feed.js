/**
 * RSS Feed Generator
 * Generates RSS 2.0 feed for blog posts
 */

const SITE_URL = 'https://islanderstudio.app';
const FEED_TITLE = 'Islander Studio Blog';
const FEED_DESCRIPTION = 'Thoughts, updates, and stories from Islander Studio. Read about our apps, design philosophy, and everyday moments.';
const FEED_LANGUAGE = 'en-us';

/**
 * Format date for RSS (RFC 822)
 */
function formatRFC822(dateString) {
  const date = new Date(dateString);
  return date.toUTCString();
}

/**
 * Escape XML special characters
 */
function escapeXml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Strip HTML tags for plain text description
 */
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Generate RSS feed
 */
export async function handleFeed(env) {
  try {
    // Fetch published posts with author info
    const { results: posts } = await env.DB.prepare(`
      SELECT
        p.title,
        p.slug,
        p.excerpt,
        p.body,
        p.published_at,
        p.main_image_url,
        a.name as author_name
      FROM posts p
      LEFT JOIN authors a ON p.author_id = a.id
      WHERE p.content_status = 'published'
      ORDER BY p.published_at DESC
      LIMIT 20
    `).all();

    const now = new Date().toUTCString();
    const lastBuildDate = posts.length > 0
      ? formatRFC822(posts[0].published_at)
      : now;

    // Build RSS XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">\n';
    xml += '  <channel>\n';
    xml += `    <title>${escapeXml(FEED_TITLE)}</title>\n`;
    xml += `    <link>${SITE_URL}</link>\n`;
    xml += `    <description>${escapeXml(FEED_DESCRIPTION)}</description>\n`;
    xml += `    <language>${FEED_LANGUAGE}</language>\n`;
    xml += `    <lastBuildDate>${lastBuildDate}</lastBuildDate>\n`;
    xml += `    <pubDate>${lastBuildDate}</pubDate>\n`;
    xml += `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>\n`;
    xml += `    <image>\n`;
    xml += `      <url>${SITE_URL}/branding/Logo-primary.png</url>\n`;
    xml += `      <title>${escapeXml(FEED_TITLE)}</title>\n`;
    xml += `      <link>${SITE_URL}</link>\n`;
    xml += `    </image>\n`;

    // Add items
    for (const post of posts) {
      const postUrl = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = formatRFC822(post.published_at);
      const description = post.excerpt || stripHtml(post.body).substring(0, 300) + '...';

      xml += '    <item>\n';
      xml += `      <title>${escapeXml(post.title)}</title>\n`;
      xml += `      <link>${postUrl}</link>\n`;
      xml += `      <guid isPermaLink="true">${postUrl}</guid>\n`;
      xml += `      <pubDate>${pubDate}</pubDate>\n`;
      xml += `      <description>${escapeXml(description)}</description>\n`;

      if (post.body) {
        xml += `      <content:encoded><![CDATA[${post.body}]]></content:encoded>\n`;
      }

      if (post.author_name) {
        xml += `      <author>support@islanderstudio.app (${escapeXml(post.author_name)})</author>\n`;
      }

      if (post.main_image_url) {
        xml += `      <enclosure url="${escapeXml(post.main_image_url)}" type="image/jpeg"/>\n`;
      }

      xml += '    </item>\n';
    }

    xml += '  </channel>\n';
    xml += '</rss>';

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1800', // Cache for 30 minutes
      },
    });
  } catch (error) {
    console.error('RSS feed generation error:', error);
    return new Response('Error generating RSS feed', { status: 500 });
  }
}

/**
 * Generate JSON Feed (alternative format)
 */
export async function handleJsonFeed(env) {
  try {
    // Fetch published posts with author info
    const { results: posts } = await env.DB.prepare(`
      SELECT
        p.title,
        p.slug,
        p.excerpt,
        p.body,
        p.published_at,
        p.main_image_url,
        a.name as author_name
      FROM posts p
      LEFT JOIN authors a ON p.author_id = a.id
      WHERE p.content_status = 'published'
      ORDER BY p.published_at DESC
      LIMIT 20
    `).all();

    const feed = {
      version: 'https://jsonfeed.org/version/1.1',
      title: FEED_TITLE,
      home_page_url: SITE_URL,
      feed_url: `${SITE_URL}/feed.json`,
      description: FEED_DESCRIPTION,
      icon: `${SITE_URL}/branding/Logo-primary.png`,
      favicon: `${SITE_URL}/favicon.svg`,
      language: FEED_LANGUAGE,
      items: posts.map(post => ({
        id: `${SITE_URL}/blog/${post.slug}`,
        url: `${SITE_URL}/blog/${post.slug}`,
        title: post.title,
        content_html: post.body,
        summary: post.excerpt || stripHtml(post.body).substring(0, 300) + '...',
        date_published: new Date(post.published_at).toISOString(),
        ...(post.author_name && {
          authors: [{ name: post.author_name }]
        }),
        ...(post.main_image_url && {
          image: post.main_image_url
        }),
      })),
    };

    return new Response(JSON.stringify(feed, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/feed+json; charset=utf-8',
        'Cache-Control': 'public, max-age=1800',
      },
    });
  } catch (error) {
    console.error('JSON feed generation error:', error);
    return new Response(JSON.stringify({ error: 'Error generating feed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

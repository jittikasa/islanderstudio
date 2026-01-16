/**
 * Cloudflare Workers API Client
 * Replaces Sanity CMS with D1 database backend
 */

const API_URL = import.meta.env.VITE_API_URL || 'https://api.islanderstudio.app';

/**
 * Helper function to make authenticated API requests
 */
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('admin_token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token for admin requests
  if (token && endpoint.includes('/api/posts') && options.method !== 'GET') {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Get all blog posts
 * Replaces: getBlogPosts() from Sanity
 */
export async function getBlogPosts() {
  const data = await apiRequest('/api/posts?status=published');
  return data.posts.map(formatPost);
}

/**
 * Get a single blog post by slug
 * Replaces: getBlogPost(slug) from Sanity
 */
export async function getBlogPost(slug) {
  const data = await apiRequest(`/api/posts/${slug}`);
  return formatPost(data.post);
}

/**
 * Get recent posts (for homepage or sidebar)
 * Replaces: getRecentPosts(limit) from Sanity
 */
export async function getRecentPosts(limit = 3) {
  const data = await apiRequest(`/api/posts?status=published&limit=${limit}`);
  return data.posts.map(formatPost);
}

/**
 * Get posts related to a specific app
 * Replaces: getPostsByApp(appName, limit) from Sanity
 */
export async function getPostsByApp(appName, limit = 2) {
  const data = await apiRequest(`/api/posts?app=${appName}&status=published&limit=${limit}`);
  return data.posts.map(formatPost);
}

/**
 * Format post from D1 API to match expected structure
 * This ensures compatibility with existing components
 */
function formatPost(post) {
  return {
    _id: post.id,
    title: post.title,
    slug: {
      current: post.slug,
      _type: 'slug',
    },
    publishedAt: post.published_at,
    updatedAt: post.updated_at,
    excerpt: post.excerpt,
    featured: post.featured === 1,
    readingTime: post.reading_time,
    authorName: post.author_name,
    authorBio: post.author_bio,
    authorImage: post.author_image ? { asset: { url: post.author_image } } : null,
    // Handle different response formats from API
    categories: Array.isArray(post.categories)
      ? post.categories.map(c => typeof c === 'string' ? c : c.title)
      : [],
    tags: Array.isArray(post.tags)
      ? post.tags.map(t => typeof t === 'string' ? t : t.title)
      : [],
    relatedApps: Array.isArray(post.relatedApps)
      ? post.relatedApps.map(a => typeof a === 'string' ? a : a.name)
      : [],
    mainImage: post.main_image_url ? {
      asset: { url: post.main_image_url },
      alt: post.main_image_alt,
    } : null,
    body: post.body, // HTML from D1
    seo: {
      metaTitle: post.seo_meta_title,
      metaDescription: post.seo_meta_description,
      focusKeyword: post.seo_focus_keyword,
      keywords: post.seo_keywords ? JSON.parse(post.seo_keywords) : [],
      ogImage: post.seo_og_image_url ? { asset: { url: post.seo_og_image_url } } : null,
      canonicalUrl: post.seo_canonical_url,
      noIndex: post.seo_no_index === 1,
      ogType: post.seo_og_type || 'article',
    },
  };
}

/**
 * Helper function to generate image URLs
 * Replaces: urlFor() from Sanity
 *
 * Since we're using R2 direct URLs now, we just return the URL
 * but maintain chainable API for compatibility
 */
export function urlFor(source) {
  if (!source) return null;

  // Get the base URL
  let baseUrl = null;

  if (typeof source === 'string') {
    baseUrl = source;
  } else if (source?.asset?.url) {
    baseUrl = source.asset.url;
  }

  if (!baseUrl) return null;

  // Return chainable object (R2 images are pre-sized, so dimensions are ignored)
  const chainable = {
    url: () => baseUrl,
    width: () => chainable,
    height: () => chainable,
  };

  return chainable;
}

/**
 * ADMIN FUNCTIONS (require authentication)
 */

/**
 * Create a new blog post
 */
export async function createPost(postData) {
  return apiRequest('/api/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
  });
}

/**
 * Update an existing blog post
 */
export async function updatePost(id, postData) {
  return apiRequest(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(postData),
  });
}

/**
 * Delete a blog post
 */
export async function deletePost(id) {
  return apiRequest(`/api/posts/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Get all authors
 */
export async function getAuthors() {
  const data = await apiRequest('/api/authors');
  return data.authors;
}

/**
 * Get all categories
 */
export async function getCategories() {
  const data = await apiRequest('/api/categories');
  return data.categories;
}

/**
 * Get all tags
 */
export async function getTags() {
  const data = await apiRequest('/api/tags');
  return data.tags;
}

/**
 * Get all apps
 */
export async function getApps() {
  const data = await apiRequest('/api/apps');
  return data.apps;
}

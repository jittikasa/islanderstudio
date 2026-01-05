/**
 * Islander Studio Blog API
 * Cloudflare Workers backend for D1-powered blog
 */

import { login, verify, logout, verifySession } from './auth.js';
import { handlePosts, handlePost, createPost, updatePost, deletePost } from './api/posts.js';
import { handleAuthors } from './api/authors.js';
import { handleCategories } from './api/categories.js';
import { handleTags } from './api/tags.js';
import { handleApps } from './api/apps.js';
import { handleMedia } from './api/media.js';
import { handleEmail } from './api/email.js';

/**
 * Get CORS headers for the request origin
 * Supports production (islanderstudio.app) and preview/development environments
 */
function getCorsHeaders(request) {
  const origin = request.headers.get('Origin');
  const allowedOrigins = [
    'https://islanderstudio.app',
    'https://www.islanderstudio.app',
    'http://localhost:5173',
    'http://localhost:3000',
  ];

  // Check if origin is allowed or is a Netlify/Cloudflare preview URL
  const isAllowed = allowedOrigins.includes(origin) ||
    origin?.includes('.netlify.app') ||
    origin?.includes('.pages.dev');

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'https://islanderstudio.app',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

/**
 * Handle OPTIONS requests for CORS
 */
function handleOptions(request) {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}

/**
 * Add CORS headers to response
 */
function addCorsHeaders(response, request) {
  const newResponse = new Response(response.body, response);
  Object.entries(getCorsHeaders(request)).forEach(([key, value]) => {
    newResponse.headers.set(key, value);
  });
  return newResponse;
}

/**
 * JSON response helper
 */
function jsonResponse(data, status = 200, request = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (request) {
    Object.assign(headers, getCorsHeaders(request));
  }

  return new Response(JSON.stringify(data), {
    status,
    headers,
  });
}

/**
 * Error response helper
 */
function errorResponse(message, status = 400, request = null) {
  return jsonResponse({ error: message }, status, request);
}

/**
 * Main request router
 */
export default {
  async fetch(request, env, ctx) {
    // Handle OPTIONS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions(request);
    }

    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    try {
      // Public routes (no auth required)
      if (path === '/api/auth/login' && method === 'POST') {
        return await login(request, env);
      }

      if (path === '/api/auth/verify' && method === 'GET') {
        return await verify(request, env);
      }

      if (path === '/api/auth/logout' && method === 'POST') {
        return await logout(request, env);
      }

      // Health check
      if (path === '/api/health') {
        return jsonResponse({ status: 'ok', timestamp: new Date().toISOString() }, 200, request);
      }

      // Public blog endpoints (no auth required)
      if (path === '/api/posts' && method === 'GET') {
        const response = await handlePosts(request, env);
        return addCorsHeaders(response, request);
      }
      if (path.match(/^\/api\/posts\/[^/]+$/) && method === 'GET') {
        const slug = path.split('/').pop();
        const response = await handlePost(slug, env);
        return addCorsHeaders(response, request);
      }

      // All other routes require authentication
      const session = await verifySession(request, env);
      if (!session) {
        return errorResponse('Unauthorized', 401, request);
      }

      // Protected API routes
      // Posts (write operations)
      if (path === '/api/posts' && method === 'POST') {
        return await createPost(request, env);
      }
      if (path.match(/^\/api\/posts\/[^/]+$/) && method === 'PUT') {
        const id = path.split('/').pop();
        return await updatePost(id, request, env);
      }
      if (path.match(/^\/api\/posts\/[^/]+$/) && method === 'DELETE') {
        const id = path.split('/').pop();
        return await deletePost(id, env);
      }

      // Authors
      if (path.startsWith('/api/authors')) {
        return await handleAuthors(request, env, method, path);
      }

      // Categories
      if (path.startsWith('/api/categories')) {
        return await handleCategories(request, env, method, path);
      }

      // Tags
      if (path.startsWith('/api/tags')) {
        return await handleTags(request, env, method, path);
      }

      // Apps
      if (path.startsWith('/api/apps')) {
        return await handleApps(request, env, method, path);
      }

      // Media (R2)
      if (path.startsWith('/api/media')) {
        return await handleMedia(request, env, method, path);
      }

      // Email
      if (path.startsWith('/api/email')) {
        return await handleEmail(request, env, method, path);
      }

      // 404 - Route not found
      return errorResponse('Not found', 404, request);
    } catch (error) {
      console.error('Error:', error);
      return errorResponse(error.message || 'Internal server error', 500, request);
    }
  },
};

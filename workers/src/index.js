/**
 * Islander Studio Blog API
 * Cloudflare Workers backend for D1-powered blog
 */

import { login, verify, logout, verifySession } from './auth.js';
import { googleAuthStart, googleAuthCallback } from './google-auth.js';
import { handlePosts, handlePost, createPost, updatePost, deletePost } from './api/posts.js';
import { handleAuthors } from './api/authors.js';
import { handleCategories } from './api/categories.js';
import { handleTags } from './api/tags.js';
import { handleApps } from './api/apps.js';
import { handleMedia } from './api/media.js';
import { handleEmail } from './api/email.js';

/**
 * Get CORS headers for the request origin
 * Supports production (islanderstudio.app) and Cloudflare Pages preview environments
 */
function getCorsHeaders(request) {
  const origin = request.headers.get('Origin');
  const allowedOrigins = [
    'https://islanderstudio.app',
    'https://www.islanderstudio.app',
    'http://localhost:5173',
    'http://localhost:3000',
  ];

  // Check if origin is allowed or is a Cloudflare Pages preview URL
  const isAllowed = allowedOrigins.includes(origin) ||
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
        const response = await login(request, env);
        return addCorsHeaders(response, request);
      }

      if (path === '/api/auth/verify' && method === 'GET') {
        const response = await verify(request, env);
        return addCorsHeaders(response, request);
      }

      if (path === '/api/auth/logout' && method === 'POST') {
        const response = await logout(request, env);
        return addCorsHeaders(response, request);
      }

      // Google OAuth routes (public)
      if (path === '/api/auth/google' && method === 'GET') {
        return await googleAuthStart(request, env);
      }

      if (path === '/api/auth/google/callback' && method === 'GET') {
        return await googleAuthCallback(request, env);
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
        const response = await createPost(request, env);
        return addCorsHeaders(response, request);
      }
      if (path.match(/^\/api\/posts\/[^/]+$/) && method === 'PUT') {
        const id = path.split('/').pop();
        const response = await updatePost(id, request, env);
        return addCorsHeaders(response, request);
      }
      if (path.match(/^\/api\/posts\/[^/]+$/) && method === 'DELETE') {
        const id = path.split('/').pop();
        const response = await deletePost(id, env);
        return addCorsHeaders(response, request);
      }

      // Authors
      if (path.startsWith('/api/authors')) {
        const response = await handleAuthors(request, env, method, path);
        return addCorsHeaders(response, request);
      }

      // Categories
      if (path.startsWith('/api/categories')) {
        const response = await handleCategories(request, env, method, path);
        return addCorsHeaders(response, request);
      }

      // Tags
      if (path.startsWith('/api/tags')) {
        const response = await handleTags(request, env, method, path);
        return addCorsHeaders(response, request);
      }

      // Apps
      if (path.startsWith('/api/apps')) {
        const response = await handleApps(request, env, method, path);
        return addCorsHeaders(response, request);
      }

      // Media (R2)
      if (path.startsWith('/api/media')) {
        const response = await handleMedia(request, env, method, path);
        return addCorsHeaders(response, request);
      }

      // Email
      if (path.startsWith('/api/email')) {
        const response = await handleEmail(request, env, method, path);
        return addCorsHeaders(response, request);
      }

      // 404 - Route not found
      return errorResponse('Not found', 404, request);
    } catch (error) {
      console.error('Error:', error);
      return errorResponse(error.message || 'Internal server error', 500, request);
    }
  },
};

/**
 * Rate Limiting Middleware
 * Prevents brute force attacks on authentication endpoints
 */

const RATE_LIMIT_CONFIG = {
  maxAttempts: 5,           // Maximum failed attempts before blocking
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  blockDurationMs: 15 * 60 * 1000, // Block for 15 minutes
};

/**
 * Get client IP from request
 */
function getClientIP(request) {
  // Cloudflare provides the real IP in CF-Connecting-IP header
  return request.headers.get('CF-Connecting-IP') ||
         request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
         'unknown';
}

/**
 * Generate rate limit key for KV storage
 */
function getRateLimitKey(ip, endpoint) {
  return `rate_limit:${endpoint}:${ip}`;
}

/**
 * Check if request should be rate limited
 * @param {Request} request
 * @param {Object} env - Environment bindings (must include RATE_LIMIT_KV)
 * @param {string} endpoint - Endpoint identifier (e.g., 'auth/login')
 * @returns {Object} { limited: boolean, remaining: number, resetAt: number, retryAfter: number }
 */
export async function checkRateLimit(request, env, endpoint = 'auth/login') {
  // If KV not configured, skip rate limiting
  if (!env.RATE_LIMIT_KV) {
    console.warn('RATE_LIMIT_KV not configured, skipping rate limit check');
    return { limited: false, remaining: RATE_LIMIT_CONFIG.maxAttempts, resetAt: 0, retryAfter: 0 };
  }

  const ip = getClientIP(request);
  const key = getRateLimitKey(ip, endpoint);

  try {
    const data = await env.RATE_LIMIT_KV.get(key, 'json');

    if (!data) {
      return { limited: false, remaining: RATE_LIMIT_CONFIG.maxAttempts, resetAt: 0, retryAfter: 0 };
    }

    const now = Date.now();

    // Check if still blocked
    if (data.blockedUntil && data.blockedUntil > now) {
      const retryAfter = Math.ceil((data.blockedUntil - now) / 1000);
      return {
        limited: true,
        remaining: 0,
        resetAt: data.blockedUntil,
        retryAfter,
      };
    }

    // Check if window has expired
    if (data.windowStart + RATE_LIMIT_CONFIG.windowMs < now) {
      // Window expired, reset
      return { limited: false, remaining: RATE_LIMIT_CONFIG.maxAttempts, resetAt: 0, retryAfter: 0 };
    }

    // Within window, check attempts
    const remaining = Math.max(0, RATE_LIMIT_CONFIG.maxAttempts - data.attempts);
    return {
      limited: remaining === 0,
      remaining,
      resetAt: data.windowStart + RATE_LIMIT_CONFIG.windowMs,
      retryAfter: remaining === 0 ? Math.ceil((data.blockedUntil - now) / 1000) : 0,
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    // On error, allow the request
    return { limited: false, remaining: RATE_LIMIT_CONFIG.maxAttempts, resetAt: 0, retryAfter: 0 };
  }
}

/**
 * Record a failed attempt
 * @param {Request} request
 * @param {Object} env
 * @param {string} endpoint
 */
export async function recordFailedAttempt(request, env, endpoint = 'auth/login') {
  if (!env.RATE_LIMIT_KV) {
    console.warn('RATE_LIMIT_KV not configured, skipping failed attempt recording');
    return;
  }

  const ip = getClientIP(request);
  const key = getRateLimitKey(ip, endpoint);
  const now = Date.now();

  try {
    let data = await env.RATE_LIMIT_KV.get(key, 'json');

    if (!data || data.windowStart + RATE_LIMIT_CONFIG.windowMs < now) {
      // Start new window
      data = {
        attempts: 1,
        windowStart: now,
        blockedUntil: null,
      };
    } else {
      // Increment attempts
      data.attempts += 1;

      // Block if exceeded max attempts
      if (data.attempts >= RATE_LIMIT_CONFIG.maxAttempts) {
        data.blockedUntil = now + RATE_LIMIT_CONFIG.blockDurationMs;
      }
    }

    // Store with TTL equal to block duration (auto-cleanup)
    const ttl = Math.ceil(RATE_LIMIT_CONFIG.blockDurationMs / 1000) + 60; // Add 60s buffer
    await env.RATE_LIMIT_KV.put(key, JSON.stringify(data), { expirationTtl: ttl });
  } catch (error) {
    console.error('Record failed attempt error:', error);
  }
}

/**
 * Reset rate limit on successful login
 * @param {Request} request
 * @param {Object} env
 * @param {string} endpoint
 */
export async function resetRateLimit(request, env, endpoint = 'auth/login') {
  if (!env.RATE_LIMIT_KV) {
    return;
  }

  const ip = getClientIP(request);
  const key = getRateLimitKey(ip, endpoint);

  try {
    await env.RATE_LIMIT_KV.delete(key);
  } catch (error) {
    console.error('Reset rate limit error:', error);
  }
}

/**
 * Create rate limit exceeded response
 * @param {number} retryAfter - Seconds until rate limit resets
 * @param {Request} request - Original request for CORS headers
 */
export function rateLimitResponse(retryAfter, request = null) {
  const headers = {
    'Content-Type': 'application/json',
    'Retry-After': String(retryAfter),
  };

  return new Response(
    JSON.stringify({
      error: 'Too many failed login attempts. Please try again later.',
      retryAfter,
    }),
    {
      status: 429,
      headers,
    }
  );
}

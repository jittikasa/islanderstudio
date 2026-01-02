/**
 * Password-only authentication system
 * Uses environment variable for admin password
 */

import bcrypt from 'bcryptjs';

/**
 * Generate a simple JWT-like token
 * (For production, use a proper JWT library like @tsndr/cloudflare-worker-jwt)
 */
function generateToken(secret) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
  }));

  // Simple signature (use proper crypto in production)
  const signature = btoa(secret + header + payload).substring(0, 32);

  return `${header}.${payload}.${signature}`;
}

/**
 * Verify a token
 */
function verifyToken(token, secret) {
  try {
    const [header, payload, signature] = token.split('.');

    // Verify signature
    const expectedSignature = btoa(secret + header + payload).substring(0, 32);
    if (signature !== expectedSignature) {
      return null;
    }

    // Check expiration
    const data = JSON.parse(atob(payload));
    if (data.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    return data;
  } catch (error) {
    return null;
  }
}

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
 * Login endpoint
 * POST /api/auth/login
 * Body: { password: string, rememberMe: boolean }
 */
export async function login(request, env) {
  try {
    const { password, rememberMe } = await request.json();

    if (!password) {
      return new Response(JSON.stringify({ error: 'Password is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get admin password hash from environment
    const adminPasswordHash = env.ADMIN_PASSWORD_HASH;
    if (!adminPasswordHash) {
      console.error('ADMIN_PASSWORD_HASH environment variable not set');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, adminPasswordHash);
    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Generate session token
    const token = generateToken(env.JWT_SECRET || 'default-secret');
    const sessionId = generateUUID();

    // Calculate expiration (24 hours or 30 days if "remember me")
    const expirationHours = rememberMe ? 30 * 24 : 24;
    const expiresAt = new Date(Date.now() + expirationHours * 60 * 60 * 1000);

    // Store session in D1
    await env.DB.prepare(
      'INSERT INTO sessions (id, token, expires_at) VALUES (?, ?, ?)'
    ).bind(sessionId, token, expiresAt.toISOString()).run();

    // Return token
    return new Response(JSON.stringify({
      success: true,
      token,
      expiresAt: expiresAt.toISOString(),
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Login failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

/**
 * Verify session middleware
 * Checks Authorization header for valid token
 */
export async function verifySession(request, env) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7); // Remove 'Bearer '

    // Verify token signature
    const tokenData = verifyToken(token, env.JWT_SECRET || 'default-secret');
    if (!tokenData) {
      return null;
    }

    // Check if session exists in database and not expired
    const session = await env.DB.prepare(
      'SELECT * FROM sessions WHERE token = ? AND expires_at > datetime("now")'
    ).bind(token).first();

    if (!session) {
      return null;
    }

    return session;
  } catch (error) {
    console.error('Session verification error:', error);
    return null;
  }
}

/**
 * Verify token endpoint
 * GET /api/auth/verify
 */
export async function verify(request, env) {
  try {
    const session = await verifySession(request, env);

    if (!session) {
      return new Response(JSON.stringify({ valid: false, error: 'Invalid or expired token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      valid: true,
      expiresAt: session.expires_at,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return new Response(JSON.stringify({ valid: false, error: 'Verification failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

/**
 * Logout endpoint
 * POST /api/auth/logout
 */
export async function logout(request, env) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'No token provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.substring(7);

    // Delete session from database
    await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Logout error:', error);
    return new Response(JSON.stringify({ error: 'Logout failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

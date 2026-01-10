/**
 * Google OAuth Authentication
 */

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

/**
 * Generate a random state for CSRF protection
 */
function generateState() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
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
 * Generate a simple JWT-like token
 */
function generateToken(secret) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days
  }));
  const signature = btoa(secret + header + payload).substring(0, 32);
  return `${header}.${payload}.${signature}`;
}

/**
 * Initiate Google OAuth flow
 * GET /api/auth/google
 */
export async function googleAuthStart(request, env) {
  const clientId = env.GOOGLE_CLIENT_ID;
  const redirectUri = `${new URL(request.url).origin}/api/auth/google/callback`;

  if (!clientId) {
    return new Response(JSON.stringify({ error: 'Google OAuth not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const state = generateState();

  // Store state in a cookie for CSRF validation
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state: state,
    access_type: 'offline',
    prompt: 'select_account'
  });

  const authUrl = `${GOOGLE_AUTH_URL}?${params.toString()}`;

  // Redirect to Google
  return new Response(null, {
    status: 302,
    headers: {
      'Location': authUrl,
      'Set-Cookie': `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
    }
  });
}

/**
 * Handle Google OAuth callback
 * GET /api/auth/google/callback
 */
export async function googleAuthCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');

  // Frontend URL for redirects
  const frontendUrl = 'https://islanderstudio.app';

  if (error) {
    return new Response(null, {
      status: 302,
      headers: { 'Location': `${frontendUrl}/admin?error=${encodeURIComponent(error)}` }
    });
  }

  if (!code) {
    return new Response(null, {
      status: 302,
      headers: { 'Location': `${frontendUrl}/admin?error=missing_code` }
    });
  }

  try {
    const clientId = env.GOOGLE_CLIENT_ID;
    const clientSecret = env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${url.origin}/api/auth/google/callback`;

    // Exchange code for tokens
    const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', errorData);
      return new Response(null, {
        status: 302,
        headers: { 'Location': `${frontendUrl}/admin?error=token_exchange_failed` }
      });
    }

    const tokens = await tokenResponse.json();

    // Get user info
    const userResponse = await fetch(GOOGLE_USERINFO_URL, {
      headers: { 'Authorization': `Bearer ${tokens.access_token}` }
    });

    if (!userResponse.ok) {
      return new Response(null, {
        status: 302,
        headers: { 'Location': `${frontendUrl}/admin?error=userinfo_failed` }
      });
    }

    const userInfo = await userResponse.json();

    // Optional: Restrict to specific email(s)
    const allowedEmails = env.ALLOWED_ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
    if (allowedEmails.length > 0 && !allowedEmails.includes(userInfo.email.toLowerCase())) {
      return new Response(null, {
        status: 302,
        headers: { 'Location': `${frontendUrl}/admin?error=unauthorized_email` }
      });
    }

    // Create session
    const token = generateToken(env.JWT_SECRET || 'default-secret');
    const sessionId = generateUUID();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    // Store session in D1
    await env.DB.prepare(
      'INSERT INTO sessions (id, token, expires_at, user_email) VALUES (?, ?, ?, ?)'
    ).bind(sessionId, token, expiresAt.toISOString(), userInfo.email).run();

    // Redirect to frontend with token
    return new Response(null, {
      status: 302,
      headers: {
        'Location': `${frontendUrl}/admin?token=${encodeURIComponent(token)}&expires=${encodeURIComponent(expiresAt.toISOString())}&email=${encodeURIComponent(userInfo.email)}`
      }
    });

  } catch (error) {
    console.error('Google OAuth error:', error);
    return new Response(null, {
      status: 302,
      headers: { 'Location': `${frontendUrl}/admin?error=server_error` }
    });
  }
}

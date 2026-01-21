# Google OAuth Setup Guide

This guide explains how to configure Google OAuth authentication for the Islander Studio admin dashboard.

## Prerequisites

- A Google Cloud Platform account
- Access to the Cloudflare Workers dashboard
- The Islander Studio API deployed to Cloudflare Workers

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter a project name (e.g., "Islander Studio Admin")
4. Click "Create"

## Step 2: Configure OAuth Consent Screen

1. In the Google Cloud Console, navigate to **APIs & Services** → **OAuth consent screen**
2. Select **External** user type (unless you have a Google Workspace account)
3. Click "Create"
4. Fill in the required fields:
   - **App name**: Islander Studio Admin
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
5. Click "Save and Continue"
6. On the "Scopes" page, click "Add or Remove Scopes"
7. Add the following scopes:
   - `openid`
   - `email`
   - `profile`
8. Click "Save and Continue"
9. On "Test users" page, add any email addresses that should have access during testing
10. Click "Save and Continue"

## Step 3: Create OAuth Credentials

1. Navigate to **APIs & Services** → **Credentials**
2. Click "Create Credentials" → "OAuth client ID"
3. Select **Web application** as the application type
4. Enter a name (e.g., "Islander Studio Web Client")
5. Add **Authorized JavaScript origins**:
   - `https://islanderstudio.app`
   - `https://api.islanderstudio.app`
   - `http://localhost:5173` (for local development)
6. Add **Authorized redirect URIs**:
   - `https://api.islanderstudio.app/api/auth/google/callback`
   - `http://localhost:8787/api/auth/google/callback` (for local development)
7. Click "Create"
8. Copy the **Client ID** and **Client Secret** - you'll need these for the next step

## Step 4: Configure Cloudflare Workers Environment Variables

Add the following secrets to your Cloudflare Workers project:

### Using Wrangler CLI

```bash
cd workers

# Set Google OAuth credentials
wrangler secret put GOOGLE_CLIENT_ID
# Paste your Client ID when prompted

wrangler secret put GOOGLE_CLIENT_SECRET
# Paste your Client Secret when prompted

# Optional: Restrict access to specific email addresses
wrangler secret put ALLOWED_ADMIN_EMAILS
# Enter comma-separated emails: admin@example.com,editor@example.com
```

### Using Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **islanderstudio-blog-api**
3. Click **Settings** → **Variables**
4. Add the following secrets:
   - `GOOGLE_CLIENT_ID`: Your OAuth Client ID
   - `GOOGLE_CLIENT_SECRET`: Your OAuth Client Secret
   - `ALLOWED_ADMIN_EMAILS`: (Optional) Comma-separated list of allowed emails

## Step 5: Test the OAuth Flow

1. Navigate to `https://islanderstudio.app/admin`
2. Click "Sign in with Google"
3. Select your Google account
4. You should be redirected back to the admin dashboard

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_CLIENT_ID` | Yes | OAuth 2.0 Client ID from Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Yes | OAuth 2.0 Client Secret from Google Cloud Console |
| `ALLOWED_ADMIN_EMAILS` | No | Comma-separated list of email addresses allowed to log in. If not set, any Google account can log in. |
| `JWT_SECRET` | Yes | Secret key for signing session tokens (shared with password auth) |

## OAuth Scopes Used

The application requests the following OAuth scopes:

| Scope | Purpose |
|-------|---------|
| `openid` | OpenID Connect authentication |
| `email` | Access to user's email address |
| `profile` | Access to user's basic profile info (name, picture) |

## How It Works

1. User clicks "Sign in with Google" on the admin page
2. Frontend redirects to `/api/auth/google`
3. Worker generates a CSRF state token and redirects to Google
4. User authenticates with Google and grants permissions
5. Google redirects back to `/api/auth/google/callback` with an authorization code
6. Worker exchanges the code for access tokens
7. Worker fetches user info using the access token
8. If `ALLOWED_ADMIN_EMAILS` is set, the email is validated against the list
9. Worker creates a session in the D1 database
10. User is redirected to the admin dashboard with the session token

## Troubleshooting

### "Google OAuth not configured" error

**Cause**: The `GOOGLE_CLIENT_ID` environment variable is not set.

**Solution**: Set the `GOOGLE_CLIENT_ID` secret in Cloudflare Workers.

### "redirect_uri_mismatch" error from Google

**Cause**: The callback URL doesn't match what's configured in Google Cloud Console.

**Solution**:
1. Check that `https://api.islanderstudio.app/api/auth/google/callback` is in your Authorized redirect URIs
2. Ensure there are no trailing slashes or typos
3. Wait a few minutes for Google to propagate changes

### "unauthorized_email" error

**Cause**: The logged-in email is not in the `ALLOWED_ADMIN_EMAILS` list.

**Solution**:
1. Add the email to `ALLOWED_ADMIN_EMAILS`
2. Or remove the `ALLOWED_ADMIN_EMAILS` variable to allow any Google account

### "token_exchange_failed" error

**Cause**: The authorization code exchange failed, often due to an incorrect client secret.

**Solution**:
1. Verify `GOOGLE_CLIENT_SECRET` is correct
2. Regenerate the client secret in Google Cloud Console if needed
3. Update the secret in Cloudflare Workers

### Session expires quickly

**Cause**: Sessions are set to expire after 30 days by default.

**Solution**: This is expected behavior. Users will need to re-authenticate after 30 days.

## Security Considerations

1. **Always use HTTPS** - OAuth tokens are sensitive and must be transmitted securely
2. **Restrict allowed emails** - Set `ALLOWED_ADMIN_EMAILS` in production to limit who can access the admin
3. **Keep secrets secure** - Never commit OAuth credentials to version control
4. **Use separate credentials** - Create different OAuth clients for development and production
5. **Review access regularly** - Periodically audit who has admin access

## Local Development

For local development, you'll need to:

1. Create a separate OAuth client in Google Cloud Console for localhost
2. Add `http://localhost:8787/api/auth/google/callback` to Authorized redirect URIs
3. Create a `.dev.vars` file in the `workers` directory:

```env
GOOGLE_CLIENT_ID=your-dev-client-id
GOOGLE_CLIENT_SECRET=your-dev-client-secret
JWT_SECRET=your-dev-secret
```

4. Run the worker locally: `wrangler dev`

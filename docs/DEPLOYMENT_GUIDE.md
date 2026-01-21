# Islander Studio Deployment Guide

This comprehensive guide covers deploying the Islander Studio blog platform to production on Cloudflare's infrastructure.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Cloudflare Edge Network                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Cloudflare Pages (Frontend)                  │  │
│  │           React 18 + Vite + React Router                  │  │
│  │              https://islanderstudio.app                   │  │
│  │                                                           │  │
│  │  Features:                                                │  │
│  │  - Code splitting with lazy loading                       │  │
│  │  - Service worker for offline support                     │  │
│  │  - Automatic preview deployments on PRs                   │  │
│  └──────────────────────┬───────────────────────────────────┘  │
│                         │                                        │
│                         │ HTTPS + JWT Authentication            │
│                         ▼                                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │            Cloudflare Workers (Backend API)               │  │
│  │                 https://api.islanderstudio.app            │  │
│  │                                                           │  │
│  │  Features:                                                │  │
│  │  - RESTful API endpoints                                  │  │
│  │  - JWT & Google OAuth authentication                      │  │
│  │  - Rate limiting via KV                                   │  │
│  │  - Cron triggers for scheduled tasks                      │  │
│  └─────┬───────────────────┬──────────────────┬─────────────┘  │
│        │                   │                  │                  │
│        ▼                   ▼                  ▼                  │
│  ┌──────────┐       ┌──────────┐       ┌──────────┐            │
│  │    D1    │       │    R2    │       │    KV    │            │
│  │ Database │       │ Storage  │       │  Cache   │            │
│  │ (SQLite) │       │ (Media)  │       │  (Rate   │            │
│  │          │       │          │       │  Limit)  │            │
│  └──────────┘       └──────────┘       └──────────┘            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Prerequisites

Before deploying, ensure you have:

- **Cloudflare Account** with Workers, Pages, D1, R2, and KV enabled
- **Node.js** v18 or later
- **Wrangler CLI** installed (`npm install -g wrangler`)
- **Git** for version control
- Domain configured in Cloudflare (for custom domains)

## Initial Setup

### 1. Create Cloudflare Resources

```bash
# Login to Cloudflare
wrangler login

# Create D1 Database
wrangler d1 create blog-database
# Note the database ID from the output

# Create R2 Bucket for media storage
wrangler r2 bucket create blog-media

# Create KV Namespace for rate limiting
wrangler kv:namespace create RATE_LIMIT_KV
# Note the namespace ID from the output
```

### 2. Configure wrangler.toml

Update `workers/wrangler.toml` with your resource IDs:

```toml
name = "islanderstudio-blog-api"
main = "src/index.js"
compatibility_date = "2024-01-01"

[vars]
FRONTEND_URL = "https://islanderstudio.app"

[[d1_databases]]
binding = "DB"
database_name = "blog-database"
database_id = "YOUR_D1_DATABASE_ID"

[[r2_buckets]]
binding = "MEDIA_BUCKET"
bucket_name = "blog-media"

[[kv_namespaces]]
binding = "RATE_LIMIT_KV"
id = "YOUR_KV_NAMESPACE_ID"

[triggers]
crons = [
  "*/5 * * * *",  # Every 5 minutes - publish scheduled posts
  "0 3 * * *"     # Daily at 3 AM UTC - session cleanup
]
```

### 3. Apply Database Migrations

```bash
cd workers

# Apply all migrations in order
npx wrangler d1 execute blog-database --remote --file=../docs/migrations/001_add_media_table.sql
npx wrangler d1 execute blog-database --remote --file=../docs/migrations/002_add_sessions_table.sql

# Verify tables were created
npx wrangler d1 execute blog-database --remote --command="SELECT name FROM sqlite_master WHERE type='table';"
```

## Environment Variables

### Workers Secrets

Set these using `wrangler secret put <SECRET_NAME>`:

| Secret | Required | Description |
|--------|----------|-------------|
| `ADMIN_PASSWORD_HASH` | Yes | bcrypt hash of admin password |
| `JWT_SECRET` | Yes | 32+ character secret for signing JWTs |
| `GOOGLE_CLIENT_ID` | For OAuth | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | For OAuth | Google OAuth client secret |
| `ALLOWED_ADMIN_EMAILS` | Optional | Comma-separated list of allowed OAuth emails |

**Generate password hash:**
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YOUR_PASSWORD', 10));"
```

**Generate JWT secret:**
```bash
openssl rand -base64 32
```

### Pages Environment Variables

Set in Cloudflare Dashboard → Pages → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://api.islanderstudio.app` |

## Deployment Steps

### Deploy Backend (Workers)

```bash
cd workers

# Install dependencies
npm install

# Deploy to production
npx wrangler deploy

# Verify deployment
curl https://api.islanderstudio.app/api/health
```

### Deploy Frontend (Pages)

```bash
# From project root
npm install
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=islanderstudio
```

Or connect your Git repository for automatic deployments:

1. Go to Cloudflare Dashboard → Pages
2. Click "Create a project" → "Connect to Git"
3. Select your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (project root)

## Custom Domain Configuration

### Frontend Domain (islanderstudio.app)

1. Go to Cloudflare Dashboard → Pages → Your project
2. Click "Custom domains"
3. Add `islanderstudio.app` and `www.islanderstudio.app`
4. DNS records are automatically configured

### API Domain (api.islanderstudio.app)

1. Go to Cloudflare Dashboard → Workers & Pages → Your worker
2. Click "Triggers" → "Custom Domains"
3. Add `api.islanderstudio.app`
4. DNS is automatically configured

### Media Domain (media.islanderstudio.app)

1. Go to Cloudflare Dashboard → R2 → blog-media bucket
2. Click "Settings" → "Public access"
3. Click "Connect Domain"
4. Enter `media.islanderstudio.app`
5. Update `workers/src/api/media.js` with the new URL

## R2 Storage Configuration

### Option A: Custom Domain (Recommended for Production)

```javascript
// workers/src/api/media.js line ~95
const url = `https://media.islanderstudio.app/${key}`;
```

### Option B: R2.dev Subdomain (Development)

1. Enable R2.dev subdomain in bucket settings
2. Copy the provided URL (e.g., `https://pub-abc123.r2.dev`)
3. Update the URL in media.js

## Cron Jobs

The worker includes scheduled tasks:

| Schedule | Task |
|----------|------|
| Every 5 minutes | Publish scheduled posts |
| Daily at 3 AM UTC | Clean up expired sessions |

Verify cron configuration:
```bash
npx wrangler triggers list
```

## Security Checklist

Before going to production:

- [ ] Set strong `ADMIN_PASSWORD_HASH` (12+ characters, mixed case, numbers, symbols)
- [ ] Set random `JWT_SECRET` (32+ characters)
- [ ] Configure `ALLOWED_ADMIN_EMAILS` if using OAuth
- [ ] Enable R2 bucket access logging
- [ ] Review CORS settings in `workers/src/index.js`
- [ ] Test rate limiting is working
- [ ] Verify all environment variables are set
- [ ] Test authentication flow end-to-end

## Rollback Procedures

### Rollback Workers

```bash
# List recent deployments
npx wrangler deployments list

# Rollback to previous version
npx wrangler rollback
```

### Rollback Pages

1. Go to Cloudflare Dashboard → Pages → Your project
2. Click "Deployments"
3. Find the previous working deployment
4. Click "..." → "Rollback to this deployment"

### Database Rollback

D1 has automatic point-in-time recovery:

```bash
# List available restore points
npx wrangler d1 time-travel info blog-database

# Restore to a specific point
npx wrangler d1 time-travel restore blog-database --timestamp "2025-01-20T12:00:00Z"
```

## Monitoring & Debugging

### View Worker Logs

```bash
# Real-time logs
npx wrangler tail

# With filters
npx wrangler tail --format=pretty --status=error
```

### Check Cron Execution

```bash
# View recent cron invocations
npx wrangler triggers list
```

### Database Inspection

```bash
# Query database
npx wrangler d1 execute blog-database --remote --command="SELECT COUNT(*) FROM posts;"

# Export data
npx wrangler d1 export blog-database --remote --output=backup.sql
```

## Troubleshooting

### Common Issues

#### "Worker not found" or 404 on API
- Verify worker is deployed: `npx wrangler deployments list`
- Check custom domain is configured in Triggers

#### "Invalid token" errors
- Clear browser localStorage
- Check JWT_SECRET hasn't changed
- Verify token hasn't expired

#### Images not loading
- Check R2 bucket public access is enabled
- Verify the URL in media.js matches your R2 domain
- Check browser console for CORS errors

#### Rate limiting blocking legitimate users
- Check KV namespace is correctly bound
- Verify IP isn't being shared (VPN, corporate network)
- Increase rate limits if needed

#### OAuth "redirect_uri_mismatch"
- Add callback URL to Google Cloud Console
- Ensure no trailing slashes
- Wait a few minutes for Google to propagate

#### Database migrations failed
- Check database ID in wrangler.toml
- Verify Wrangler has correct permissions
- Try applying migrations one at a time

### Debug Commands

```bash
# Check worker binding configuration
npx wrangler whoami

# Verify D1 database
npx wrangler d1 list
npx wrangler d1 info blog-database

# Check R2 bucket
npx wrangler r2 bucket list

# Check KV namespace
npx wrangler kv:namespace list
```

## Performance Optimization

### Frontend

- Code splitting is enabled for admin routes
- Images use lazy loading with OptimizedImage component
- Service worker caches static assets

### Backend

- D1 queries use indexes on slug, status, and dates
- Media uploads are streamed directly to R2
- Sessions are cleaned up automatically

### Caching

Consider adding these Workers caching strategies:

```javascript
// Cache public API responses for 5 minutes
const cacheControl = 'public, max-age=300';

// Use Cache API for expensive queries
const cache = caches.default;
```

## Backup Strategy

### Database Backups

```bash
# Manual export
npx wrangler d1 export blog-database --remote --output=backup-$(date +%Y%m%d).sql

# Set up automated backups using a cron job
# Add to your CI/CD pipeline
```

### Media Backups

R2 doesn't have built-in backup, but you can:
1. Enable object versioning in bucket settings
2. Use rclone to sync to another storage provider
3. Keep local copies of original uploads

## Updating the Application

```bash
# Pull latest changes
git pull origin main

# Update dependencies
npm install
cd workers && npm install && cd ..

# Deploy both
cd workers && npx wrangler deploy && cd ..
npm run build && npx wrangler pages deploy dist --project-name=islanderstudio
```

## Support

- Cloudflare Workers: https://developers.cloudflare.com/workers/
- Cloudflare Pages: https://developers.cloudflare.com/pages/
- Cloudflare D1: https://developers.cloudflare.com/d1/
- Cloudflare R2: https://developers.cloudflare.com/r2/
- Project Issues: https://github.com/islanderstudio/blog/issues

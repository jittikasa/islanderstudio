# Blog Deployment Checklist

Complete these steps to deploy the Islander Studio blog on Cloudflare infrastructure.

## Prerequisites

- Cloudflare account
- Wrangler CLI installed: `npm install -g wrangler`
- Logged in to Cloudflare: `wrangler login`

---

## 1. Create D1 Database

```bash
cd workers

# Create the database
wrangler d1 create blog-database

# Copy the database ID from the output and update wrangler.toml:
# [[d1_databases]]
# binding = "DB"
# database_name = "blog-database"
# database_id = "<YOUR_DATABASE_ID_HERE>"
```

## 2. Initialize Database Schema

```bash
# Run the initial schema
wrangler d1 execute blog-database --file=../docs/d1-blog-schema.sql

# Apply media table migration
wrangler d1 execute blog-database --file=../docs/migrations/001_add_media_table.sql

# Verify tables were created
wrangler d1 execute blog-database --command="SELECT name FROM sqlite_master WHERE type='table'"
```

## 3. Create R2 Bucket

```bash
# Create R2 bucket for media storage
wrangler r2 bucket create blog-media

# Update wrangler.toml if you used a different bucket name:
# [[r2_buckets]]
# binding = "MEDIA"
# bucket_name = "blog-media"
```

### Configure R2 Public Access

Option A: Use R2.dev subdomain (quickest)
```bash
# Enable public access to the bucket
wrangler r2 bucket domain add blog-media --jurisdiction=auto

# Note the R2.dev URL (e.g., https://pub-abc123.r2.dev)
# Set as environment variable R2_PUBLIC_URL
```

Option B: Custom domain (recommended for production)
1. Go to Cloudflare Dashboard > R2 > blog-media
2. Click "Connect Domain"
3. Set up `media.islanderstudio.app` to point to your R2 bucket
4. Update DNS settings as instructed
5. Set `R2_PUBLIC_URL=https://media.islanderstudio.app` in wrangler.toml

## 4. Configure Secrets

### A. Generate Admin Password Hash

```bash
# Install bcryptjs if not already installed
npm install bcryptjs

# Generate password hash (replace YOUR_PASSWORD with your actual password)
node -e "console.log(require('bcryptjs').hashSync('YOUR_PASSWORD', 10))"

# Set the secret
wrangler secret put ADMIN_PASSWORD_HASH
# Paste the hash when prompted
```

### B. Generate and Set JWT Secret

```bash
# Generate a secure random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Set the secret
wrangler secret put JWT_SECRET
# Paste the generated string when prompted
```

## 5. Configure Environment Variables

Edit `wrangler.toml` and add:

```toml
[vars]
R2_PUBLIC_URL = "https://pub-YOUR-R2-ID.r2.dev"  # or your custom domain
```

## 6. Deploy Workers API

```bash
# Install dependencies
npm install

# Deploy to Cloudflare Workers
npm run deploy

# Note the deployment URL (e.g., https://your-worker.your-subdomain.workers.dev)
```

## 7. Configure Frontend (Cloudflare Pages)

### A. Set Environment Variables in Cloudflare Pages

1. Go to Cloudflare Dashboard > Pages > Your Project > Settings > Environment Variables
2. Add the following variables for **Production**:

```
VITE_API_URL=https://your-worker.your-subdomain.workers.dev
```

### B. Deploy Frontend

```bash
cd ..  # Back to project root

# Build frontend
npm run build

# Deploy to Cloudflare Pages (if not set up with auto-deploy)
npx wrangler pages deploy dist --project-name=islanderstudio
```

## 8. Verify Deployment

### Test API Endpoints

```bash
# Get Workers URL from previous deployment
export API_URL="https://your-worker.your-subdomain.workers.dev"

# Test health endpoint
curl $API_URL/api/health

# Test blog posts endpoint (should return empty array initially)
curl $API_URL/api/posts?status=published
```

### Test Admin Access

1. Navigate to your frontend URL
2. Go to `/admin` (or your admin route)
3. Try logging in with your admin password
4. Verify you can access all CRUD endpoints

## 9. Seed Initial Data (Optional)

Create initial authors, categories, tags, and apps:

```bash
# Example: Create an author via API
curl -X POST $API_URL/api/authors \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Islander Studio","bio":"Creating beautiful mobile apps"}'
```

---

## Configuration Summary

### Required Secrets (via wrangler secret put)
- ✅ `ADMIN_PASSWORD_HASH` - Bcrypt hash of admin password
- ✅ `JWT_SECRET` - Random secure string for JWT signing

### Required Environment Variables (in wrangler.toml)
- ✅ `R2_PUBLIC_URL` - Public URL for R2 bucket

### Required D1 Database
- ✅ Created: `blog-database`
- ✅ Schema initialized
- ✅ Migrations applied

### Required R2 Bucket
- ✅ Created: `blog-media`
- ✅ Public access configured

### Frontend Environment Variables (Cloudflare Pages)
- ✅ `VITE_API_URL` - Workers API URL

---

## Troubleshooting

### Blog posts won't load
- Check `VITE_API_URL` is set correctly in Cloudflare Pages
- Verify CORS headers allow your frontend domain
- Check browser console for errors

### Login fails
- Verify `ADMIN_PASSWORD_HASH` secret is set correctly
- Check JWT_SECRET is set
- Verify password hash was generated correctly

### Images won't upload/display
- Check R2 bucket public access is configured
- Verify `R2_PUBLIC_URL` environment variable is correct
- Test R2 bucket access directly

### Database errors
- Verify D1 database ID in wrangler.toml matches actual database
- Check schema was initialized: `wrangler d1 execute blog-database --command="SELECT name FROM sqlite_master WHERE type='table'"`

---

## Quick Reference

### Useful Commands

```bash
# View Workers logs
wrangler tail

# Check D1 database
wrangler d1 execute blog-database --command="SELECT * FROM posts LIMIT 5"

# List R2 buckets
wrangler r2 bucket list

# View secrets (names only, not values)
wrangler secret list

# Re-deploy Workers
cd workers && npm run deploy

# Re-deploy Frontend
npm run build && npx wrangler pages deploy dist
```

### API Endpoints Reference

**Public (No Auth Required):**
- `GET /api/posts?status=published` - List published posts
- `GET /api/posts/:slug` - Get single post
- `GET /api/health` - Health check

**Protected (Auth Required):**
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify session
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- Full CRUD for: `/api/authors`, `/api/categories`, `/api/tags`, `/api/apps`
- Media: `/api/media` (GET, POST, DELETE)

---

## Next Steps After Deployment

1. Create initial content (authors, categories, tags, apps)
2. Write and publish first blog post
3. Test all admin panel features
4. Set up monitoring and alerts
5. Configure custom domain (if using workers.dev)
6. Set up automatic backups for D1 database

For more details, see the main DEPLOYMENT.md documentation.

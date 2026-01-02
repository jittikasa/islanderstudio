# Admin Panel Deployment Guide

This guide will help you deploy the complete admin panel with all features including image upload to Cloudflare R2.

## Prerequisites

- Cloudflare account with Workers and Pages enabled
- D1 database already created: `blog-database`
- R2 bucket already created: `blog-media`
- Cloudflare API token with appropriate permissions

## Step 1: Apply Database Migrations

The admin panel requires a new `media` table in your D1 database.

### Apply the Media Table Migration

```bash
cd workers
npx wrangler d1 execute blog-database --remote --file=../docs/migrations/001_add_media_table.sql
```

This will create the `media` table with the following schema:
- `id` - UUID primary key
- `filename` - Original filename
- `key` - R2 object storage key
- `url` - Public URL to access the image
- `size` - File size in bytes
- `content_type` - MIME type
- `width`, `height` - Image dimensions
- `alt_text` - Accessibility text
- `created_at` - Timestamp

## Step 2: Configure R2 Public Access

To serve images publicly, you need to configure your R2 bucket:

### Option A: R2 Custom Domain (Recommended)

1. Go to Cloudflare Dashboard → R2 → Your bucket (`blog-media`)
2. Click "Settings" → "Public access"
3. Click "Connect Domain"
4. Enter a subdomain like `media.islanderstudio.app`
5. Follow the prompts to complete DNS setup

Once configured, update the URL in `workers/src/api/media.js` line 95:
```javascript
const url = `https://media.islanderstudio.app/${key}`;
```

### Option B: R2.dev Subdomain (Development)

For development/testing, you can enable the R2.dev subdomain:

1. Go to R2 bucket settings
2. Enable "Allow Access" under R2.dev subdomain
3. Copy the URL (e.g., `https://pub-abc123.r2.dev`)
4. Update line 95 in `workers/src/api/media.js`:
```javascript
const url = `https://pub-abc123.r2.dev/${key}`;
```

## Step 3: Deploy Workers API

Deploy the updated Workers API with media endpoints:

```bash
cd workers
npm install
npx wrangler deploy
```

Verify deployment:
```bash
curl https://api.islanderstudio.app/api/health
```

## Step 4: Deploy Frontend (Pages)

Build and deploy the updated frontend with the media library:

```bash
# From project root
npm install
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=islanderstudio
```

## Step 5: Environment Variables

Ensure all required environment variables are set in Cloudflare:

### Workers Environment Variables
- `ADMIN_PASSWORD_HASH` - bcrypt hash of your admin password
- `JWT_SECRET` - Secret key for JWT token signing

To generate a password hash:
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-password', 10));"
```

### Pages Environment Variables
- `VITE_API_URL` - Your Workers API URL (e.g., `https://api.islanderstudio.app`)

## Step 6: Test the Admin Panel

1. Navigate to `https://islanderstudio.app/admin/login`
2. Login with your admin password
3. Test each tab:
   - **Posts**: Create/edit blog posts with Tiptap editor and SEO fields
   - **Media**: Upload images, browse library, delete images
   - **Authors**: Add/edit author profiles
   - **Categories**: Manage blog categories
   - **Tags**: Manage blog tags

## Step 7: Test Image Upload

1. Go to Admin Dashboard → Media tab
2. Click "+ Upload Image"
3. Select an image (max 5MB)
4. Verify the image appears in the grid
5. Click the image to select it
6. Try deleting the image

## Features Implemented

### Backend (Cloudflare Workers)
- ✅ JWT-based authentication with sessions
- ✅ RESTful API for posts, authors, categories, tags
- ✅ R2 image upload with multipart form data
- ✅ Media metadata storage in D1
- ✅ Image validation (type, size)
- ✅ CORS configuration

### Frontend (React + Vite)
- ✅ Password-only login with "Remember Me"
- ✅ Protected routes with authentication
- ✅ Post Manager with filtering (all/drafts/published)
- ✅ Tiptap rich text editor with formatting toolbar
- ✅ SEO fields with preview panel
- ✅ Character counters for meta title/description
- ✅ Media Library with upload/browse/delete
- ✅ Author Manager with CRUD operations
- ✅ Category Manager with CRUD operations
- ✅ Tag Manager with CRUD operations

## Architecture

```
┌─────────────────────────────────────────────┐
│         Cloudflare Pages (Frontend)         │
│   React + Vite + React Router + Tiptap      │
│      https://islanderstudio.app             │
└────────────────┬────────────────────────────┘
                 │
                 │ HTTPS + JWT Auth
                 ▼
┌─────────────────────────────────────────────┐
│       Cloudflare Workers (Backend)          │
│         Node.js + D1 + R2                   │
│      https://api.islanderstudio.app         │
└──────────┬──────────────────┬───────────────┘
           │                  │
           ▼                  ▼
    ┌──────────────┐   ┌──────────────┐
    │  D1 Database │   │  R2 Storage  │
    │  (SQLite)    │   │   (Images)   │
    └──────────────┘   └──────────────┘
```

## Troubleshooting

### Images not loading
- Check R2 bucket public access settings
- Verify the URL in `workers/src/api/media.js` matches your R2 domain
- Check browser console for CORS errors

### Upload fails
- Verify R2 bucket binding in `wrangler.toml`
- Check file size (must be < 5MB)
- Ensure file type is an image (jpeg, png, gif, webp)

### Database errors
- Confirm migration was applied successfully
- Check D1 database binding in `wrangler.toml`
- Verify database ID matches your actual D1 database

### Authentication issues
- Verify `ADMIN_PASSWORD_HASH` is set correctly
- Check `JWT_SECRET` is set
- Clear browser localStorage and try logging in again

## Next Steps

1. Configure R2 custom domain for production
2. Test all admin panel features
3. Create your first blog post with images
4. Set up automated backups for D1 database
5. Consider adding image optimization/resizing
6. Add image alt text editing in media library

## Support

For issues or questions, check:
- Cloudflare Workers docs: https://developers.cloudflare.com/workers/
- Cloudflare R2 docs: https://developers.cloudflare.com/r2/
- Cloudflare D1 docs: https://developers.cloudflare.com/d1/

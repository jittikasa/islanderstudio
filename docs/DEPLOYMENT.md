# Complete Cloudflare Deployment Guide

You've deleted Netlify. Now let's deploy everything to Cloudflare!

## Quick Overview

1. **Workers API** (backend) - Handles blog data, authentication
2. **D1 Database** - Stores blog posts, authors, categories, etc.
3. **R2 Storage** - Stores images
4. **Pages** (frontend) - Your React app

---

## Part 1: Deploy Workers API (Backend)

### Step 1: Install Wrangler CLI

```bash
npm install -g wrangler

# Login to Cloudflare
wrangler login
```

This will open a browser window to authenticate.

### Step 2: Create D1 Database

```bash
cd workers
wrangler d1 create blog-database
```

**Output will look like:**
```
✅ Successfully created DB 'blog-database'
database_id = "abc123def456"
```

**Copy the `database_id`** and update `workers/wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "blog-database"
database_id = "PASTE_YOUR_DATABASE_ID_HERE"  # ← Update this!
```

### Step 3: Run Database Migrations

```bash
# Still in workers/ directory
wrangler d1 execute blog-database --file=../docs/d1-blog-schema.sql
```

This creates all the tables (posts, authors, categories, tags, apps, sessions).

### Step 4: Create R2 Bucket

```bash
wrangler r2 bucket create blog-media
```

### Step 5: Set Admin Password

Generate a password hash:

```bash
node -e "console.log(require('bcryptjs').hashSync('YOUR_PASSWORD_HERE', 10))"
```

**Replace `YOUR_PASSWORD_HERE` with your actual admin password!**

Copy the output (looks like `$2a$10$abc123...`) and set it:

```bash
wrangler secret put ADMIN_PASSWORD_HASH
# Paste the bcrypt hash when prompted
```

Set JWT secret (random string):

```bash
wrangler secret put JWT_SECRET
# Paste a random 32+ character string (e.g., generate one with: openssl rand -base64 32)
```

### Step 6: Install Workers Dependencies

```bash
# Still in workers/ directory
npm install
```

### Step 7: Deploy Workers API

```bash
npm run deploy
```

**Success!** You'll get a URL like:
```
https://islanderstudio-blog-api.YOUR-SUBDOMAIN.workers.dev
```

**COPY THIS URL!** You'll need it for the frontend.

### Step 8: Test the API

```bash
# Test health endpoint
curl https://islanderstudio-blog-api.YOUR-SUBDOMAIN.workers.dev/api/health

# Should return: {"status":"ok","timestamp":"..."}
```

---

## Part 2: Seed Database (Optional)

If you want to add some initial data:

```bash
# Add a test author
wrangler d1 execute blog-database --command="INSERT INTO authors (id, name, slug, bio) VALUES ('author-001', 'Your Name', 'your-name', 'Your bio here')"

# Add the apps (already in schema, but if needed)
wrangler d1 execute blog-database --command="INSERT INTO apps (id, name, display_name, slug, url, color) VALUES ('app-001', 'shellist', 'Shellist', 'shellist', '/shellist', '#4A90A4'), ('app-002', 'polamoment', 'PolaMoment', 'polamoment', '/polamoment', '#EC4899'), ('app-003', 'postcard-studio', 'Postcard Studio', 'postcard-studio', '/postcard-studio', '#10B981')"
```

---

## Part 3: Deploy Frontend to Cloudflare Pages

### Step 1: Go to Cloudflare Dashboard

1. Visit [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Workers & Pages**
3. Click **Create application**
4. Click **Pages** tab
5. Click **Connect to Git**

### Step 2: Connect Your Repo

1. Select **GitHub**
2. Authorize Cloudflare (if first time)
3. Select repository: `jittikasa/islanderstudio`
4. Click **Begin setup**

### Step 3: Configure Build Settings

**Project name:** `islanderstudio` (or whatever you want)

**Production branch:** `main` (or your default branch)

**Build command:**
```
npm run build
```

**Build output directory:**
```
dist
```

**Root directory:** (leave empty)

**Environment variables:** Click **Add variable**

```
NODE_VERSION = 18
VITE_API_URL = https://islanderstudio-blog-api.YOUR-SUBDOMAIN.workers.dev
```

**Replace the Workers URL with YOUR actual URL from Step 7 above!**

### Step 4: Deploy!

Click **Save and Deploy**

Cloudflare will:
- Clone your repo
- Run `npm install`
- Run `npm run build`
- Deploy to edge network

**Takes ~2-3 minutes.**

You'll get a URL:
```
https://islanderstudio.pages.dev
```

---

## Part 4: Test Everything

### Test Frontend

Visit `https://islanderstudio.pages.dev`

- Homepage should load
- Navigate to different pages (Shellist, PolaMoment, etc.)
- Check browser console for errors

### Test Admin Login

1. Go to `https://islanderstudio.pages.dev/admin/login`
2. Enter your admin password
3. Should redirect to `/admin`

**Note:** The admin dashboard doesn't exist yet, so you'll get a 404. That's expected! The login works though.

---

## Part 5: Custom Domain (Optional)

If you have a domain:

1. **Cloudflare Pages** → Your site → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `islanderstudio.com`)
4. If domain is on Cloudflare already → Auto-configured
5. If not → Add CNAME record to your DNS:
   ```
   CNAME  @  islanderstudio.pages.dev
   ```

**SSL certificate auto-provisions in ~1 minute.**

---

## Troubleshooting

### Workers Deploy Fails

- **"No wrangler.toml found"** → Make sure you're in `workers/` directory
- **"database_id is required"** → Update `wrangler.toml` with your D1 database ID
- **"Module not found: bcryptjs"** → Run `npm install` in workers/ directory

### Pages Build Fails

- **Build timeout** → Check build logs in Cloudflare dashboard
- **Module not found** → Make sure `package.json` has all dependencies
- **Environment variables missing** → Add `VITE_API_URL` in Pages settings

### Login Doesn't Work

- **401 Unauthorized** → Check that `ADMIN_PASSWORD_HASH` is set correctly
- **CORS error** → Workers API CORS is set to `*`, should work. Check browser console.
- **Network error** → Make sure `VITE_API_URL` points to your Workers URL

---

## Summary

After deployment, you'll have:

- ✅ **Workers API**: `https://islanderstudio-blog-api.YOUR-SUBDOMAIN.workers.dev`
- ✅ **D1 Database**: Blog data storage
- ✅ **R2 Bucket**: Image storage (ready to use)
- ✅ **Pages Site**: `https://islanderstudio.pages.dev`
- ✅ **Admin Login**: Working password authentication

**No more:**
- ❌ Netlify build limits
- ❌ Sanity CMS fees
- ❌ Vendor lock-in
- ❌ Build minute emails

**Everything is FREE and UNLIMITED!** 🎉

---

## Next Steps

Once deployed:
1. Build the admin dashboard UI
2. Create posts via admin interface
3. Upload images to R2
4. Migrate any existing blog posts from Sanity (if you have them)

Ready to deploy? Start with **Part 1** above! 🚀

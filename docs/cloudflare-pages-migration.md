# Migrate from Netlify to Cloudflare Pages

## Why Cloudflare Pages?

**Netlify Problems:**
- ❌ **300 build minutes/month** (free tier)
- ❌ **Hits limit easily** with active development
- ❌ **$19/month for more minutes** (expensive)
- ❌ **Suspended builds** when limit is hit

**Cloudflare Pages Benefits:**
- ✅ **UNLIMITED builds** (yes, actually unlimited)
- ✅ **FREE forever** (no build minute tracking at all)
- ✅ **500 deployments/month** (way more than you'll ever need)
- ✅ **Faster builds** (edge network)
- ✅ **Better performance** (CDN at 300+ locations)
- ✅ **Integrates with Workers** (your blog API)
- ✅ **Free SSL** (auto-renews)

---

## Migration Steps

### 1. Connect to Cloudflare Pages (5 minutes)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Workers & Pages** → **Create Application** → **Pages**
3. Click **Connect to Git**
4. Authorize Cloudflare to access your GitHub repo
5. Select your repository: `jittikasa/islanderstudio`

### 2. Configure Build Settings

**Framework preset:** None (or Vite)

**Build command:**
```bash
npm run build
```

**Build output directory:**
```
dist
```

**Root directory:** `/` (leave empty)

**Environment variables:**
```
NODE_VERSION=18
VITE_API_URL=https://api.islanderstudio.com
```

> Note: You'll set `VITE_API_URL` to your Workers API URL once deployed (e.g., `https://islanderstudio-blog-api.your-subdomain.workers.dev`)

### 3. Deploy!

Click **Save and Deploy**

Cloudflare will:
- Clone your repo
- Install dependencies (`npm install`)
- Run build (`npm run build`)
- Deploy to edge network
- Give you a URL: `islanderstudio.pages.dev`

**First build takes ~2-3 minutes**, then you're live! 🚀

---

## Automatic Deployments

**Production (main branch):**
- Every push to `main` → Auto-deploy to `islanderstudio.pages.dev`

**Preview (other branches):**
- Every push to any branch → Preview URL
- Example: `claude-migrate-blogs-cloudflare-ijxh5.islanderstudio.pages.dev`
- Perfect for testing before merging!

---

## Custom Domain Setup

### If you own a domain:

1. **Cloudflare Dashboard** → **Workers & Pages** → Your site → **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `islanderstudio.com` (or `www.islanderstudio.com`)

**Two options:**

#### Option A: Domain already on Cloudflare
- Just click **Activate domain**
- DNS records added automatically
- SSL certificate auto-provisions (takes ~1 minute)

#### Option B: Domain NOT on Cloudflare
- Transfer nameservers to Cloudflare (recommended)
- Or add CNAME manually to your DNS provider:
  ```
  CNAME  www  islanderstudio.pages.dev
  ```

---

## What Happens to Netlify?

**After Cloudflare is live:**
1. Test your Cloudflare site thoroughly
2. Update your DNS to point to Cloudflare (if using custom domain)
3. Wait 24-48 hours for DNS propagation
4. Delete Netlify site:
   - Netlify Dashboard → Site settings → General → Delete site
   - **Bye bye build limits!** 👋

---

## Files Already Configured

✅ **`public/_redirects`** - SPA routing (works on Cloudflare)
✅ **`public/_headers`** - Security & cache headers (works on Cloudflare)
✅ **`package.json`** - Build scripts ready

**You don't need to change anything in your code!** Cloudflare Pages uses the same format as Netlify for these files.

---

## Comparison Table

| Feature | Netlify (Free) | Cloudflare Pages (Free) |
|---------|----------------|-------------------------|
| **Build Minutes** | 300/month ⚠️ | UNLIMITED ✅ |
| **Deployments** | Unlimited | 500/month ✅ |
| **Bandwidth** | 100GB/month | UNLIMITED ✅ |
| **Build Concurrency** | 1 | 1 |
| **Edge Locations** | ~10 | 300+ ✅ |
| **SSL** | Free ✅ | Free ✅ |
| **Custom Domain** | Free ✅ | Free ✅ |
| **Preview URLs** | Yes ✅ | Yes ✅ |
| **Rollbacks** | Yes ✅ | Yes ✅ |
| **Functions** | Netlify Functions | Cloudflare Workers ✅ |
| **Database** | Add-ons ($) | D1 (Free) ✅ |
| **Storage** | Add-ons ($) | R2 (Free) ✅ |

**Winner:** Cloudflare Pages 🏆

---

## Troubleshooting

### Build fails on Cloudflare?

Check build logs in Cloudflare Dashboard. Common issues:
- **Node version** - Set `NODE_VERSION=18` in environment variables
- **Missing dependencies** - Make sure `package.json` includes all deps
- **Build command** - Should be `npm run build`, not `npm build`

### SPA routing not working (404 on refresh)?

Make sure `public/_redirects` file exists with:
```
/*    /index.html   200
```

### Headers not applied?

Make sure `public/_headers` file exists (already created for you)

---

## Testing Checklist

Before switching DNS:

- [ ] Homepage loads (`/`)
- [ ] All pages load (shellist, polamoment, blog, etc.)
- [ ] Blog posts load (`/blog/:slug`)
- [ ] Images load correctly
- [ ] CSS/JS loads (check browser console)
- [ ] Navigation works (no 404s)
- [ ] Meta tags correct (view source)
- [ ] SSL certificate valid (green lock)
- [ ] Performance good (Lighthouse score)

---

## Next Steps

1. ✅ **Deploy to Cloudflare Pages** (follow steps above)
2. ✅ **Deploy Workers API** (for blog backend)
3. ✅ **Connect custom domain** (if you have one)
4. ✅ **Test everything**
5. ✅ **Delete Netlify** (goodbye build limits!)

---

## Need Help?

If something doesn't work, just ask! But honestly, Cloudflare Pages is usually plug-and-play for Vite apps like yours.

**You're about to be FREE from build limits forever!** 🎉

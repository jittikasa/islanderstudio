# Final Deployment Steps

## 1. Enable R2 Public Access (choose one option)

### Option A: R2.dev subdomain (quickest)
```bash
cd ~/Documents/islanderstudio/workers
npx wrangler r2 bucket dev-url enable blog-media
npx wrangler r2 bucket dev-url get blog-media
```
Copy the URL from output (e.g., `https://pub-abc123.r2.dev`)

### Option B: Custom domain
1. Go to Cloudflare Dashboard > R2 > blog-media
2. Click "Connect Domain"
3. Set up `media.islanderstudio.app`
4. Copy the URL: `https://media.islanderstudio.app`

## 2. Update R2_PUBLIC_URL

Edit `workers/wrangler.toml` and replace:
```toml
R2_PUBLIC_URL = "REPLACE_WITH_YOUR_R2_PUBLIC_URL"
```
With your actual URL from step 1.

## 3. Redeploy Workers
```bash
cd ~/Documents/islanderstudio/workers
npm run deploy
```

## 4. Configure Cloudflare Pages

1. Go to: Cloudflare Dashboard > Pages > islanderstudio > Settings > Environment Variables
2. Add for **Production**:
   - Name: `VITE_API_URL`
   - Value: `https://islanderstudio-blog-api.jittikasa.workers.dev`
3. Click "Save"

## 5. Redeploy Frontend

Your frontend will automatically redeploy when you push to the main branch, or you can trigger a manual redeploy in Cloudflare Pages dashboard.

---

## Deployment Complete

Your blog should now be fully functional at https://islanderstudio.app

## Credentials (SAVE THESE)

- **Admin Password:** `Amorfatigi88`
- **Password Hash:** `$2a$10$rN7kH7J4y3.2YKismEONi.tRkeCOwFTNuqea0f2X83yQT7y1I99fK`
- **JWT Secret:** `6a6ec495d66886e54034cdbab451cdf6aae5e8581314b614abfeeca7824aff18`
- **Database ID:** `7a69bf73-d4df-494b-a025-5d549c98164d`
- **Workers API:** `https://islanderstudio-blog-api.jittikasa.workers.dev`

## Test Your Deployment

```bash
# Test API health
curl https://islanderstudio-blog-api.jittikasa.workers.dev/api/health

# Test posts endpoint
curl https://islanderstudio-blog-api.jittikasa.workers.dev/api/posts?status=published
```

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

## Credentials

**Important:** Store credentials securely (e.g., password manager, Cloudflare Secrets).
Do NOT commit credentials to version control.

Required secrets (set via Cloudflare dashboard or `wrangler secret put`):
- `ADMIN_PASSWORD_HASH` - bcrypt hash of admin password
- `JWT_SECRET` - 256-bit random hex string

## Test Your Deployment

```bash
# Test API health
curl https://islanderstudio-blog-api.jittikasa.workers.dev/api/health

# Test posts endpoint
curl https://islanderstudio-blog-api.jittikasa.workers.dev/api/posts?status=published
```

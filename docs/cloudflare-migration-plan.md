# Blog Migration: Sanity → Cloudflare D1

## Why D1 Gives You MORE Flexibility Than Sanity

### ✅ What You Get With D1

| Feature | Sanity | Cloudflare D1 |
|---------|--------|---------------|
| **App Relations** | ✅ Via references | ✅ Full relational tables with foreign keys |
| **Add New Relations** | ⚠️ Need to update schema, rebuild | ✅ Just add a new table + join table |
| **Complex Queries** | ⚠️ GROQ query language (learning curve) | ✅ Standard SQL (easier, more powerful) |
| **Custom Fields** | ⚠️ Schema updates required | ✅ ALTER TABLE anytime |
| **Data Ownership** | ❌ Locked in Sanity | ✅ Full control, export anytime |
| **Cost** | ❌ $99-$199/mo for team | ✅ Free tier: 100K reads/day |
| **API Control** | ⚠️ Limited customization | ✅ Full control via Workers |
| **Performance** | ⚠️ External API calls | ✅ Edge compute (faster) |

### 🔗 Your App Relations - How It Works

#### Current Problem You're Facing:
Sanity's reference system works, but you're **limited by their schema design** and it's **expensive to scale**.

#### D1 Solution:
```sql
-- Link any blog post to multiple apps
INSERT INTO post_apps (post_id, app_id) VALUES
  ('post-123', 'shellist'),
  ('post-123', 'polamoment');

-- Get all blog posts for Shellist page
SELECT p.* FROM posts p
INNER JOIN post_apps pa ON p.id = pa.post_id
WHERE pa.app_id = 'shellist'
ORDER BY p.published_at DESC;
```

**Want to add more relationships later?**
- Add "Series" for multi-part tutorials → Just create 2 tables
- Add "Technologies" (React, Node, etc.) → Just create 2 tables
- Add "Difficulty Levels" → Just add a column
- Add "Related Products" → Just create 2 tables

**No schema rebuilds, no waiting, no Sanity limitations.**

---

## Migration Architecture

### Stack Overview

```
┌─────────────────────────────────────────────────────┐
│  Frontend (Current React App)                       │
│  ├─ Blog.jsx                                        │
│  ├─ BlogPost.jsx                                    │
│  └─ PostManager.jsx (Admin)                        │
└─────────────────────────────────────────────────────┘
                        ↓ API calls
┌─────────────────────────────────────────────────────┐
│  Cloudflare Workers (API Layer)                     │
│  ├─ GET  /api/posts                                 │
│  ├─ GET  /api/posts/:slug                           │
│  ├─ GET  /api/posts/by-app/:appName                 │
│  ├─ POST /api/posts (Admin)                         │
│  ├─ PUT  /api/posts/:id (Admin)                     │
│  └─ DELETE /api/posts/:id (Admin)                   │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  Cloudflare D1 (SQLite Database)                    │
│  ├─ posts                                           │
│  ├─ authors, categories, tags, apps                 │
│  └─ post_categories, post_tags, post_apps (joins)   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Cloudflare R2 (Image Storage)                      │
│  ├─ blog-images/                                    │
│  ├─ author-avatars/                                 │
│  └─ og-images/                                      │
└─────────────────────────────────────────────────────┘
```

---

## Implementation Plan

### Phase 1: Setup Cloudflare Infrastructure
1. Create D1 database: `wrangler d1 create blog-database`
2. Run schema: `wrangler d1 execute blog-database --file=./docs/d1-blog-schema.sql`
3. Create R2 bucket for images: `wrangler r2 bucket create blog-media`
4. Set up Cloudflare Workers project

### Phase 2: Build API Layer
Create Workers endpoints:
- `GET /api/posts` - List all published posts
- `GET /api/posts/:slug` - Get single post with all relations
- `GET /api/posts/by-app/:appName` - Get posts for specific app
- `POST /api/posts` - Create post (admin)
- `PUT /api/posts/:id` - Update post (admin)
- `DELETE /api/posts/:id` - Delete post (admin)

### Phase 3: Data Migration
1. Export all content from Sanity (posts, authors, categories, tags)
2. Download all images from Sanity CDN
3. Upload images to Cloudflare R2
4. Transform data to D1 schema
5. Insert into D1 database
6. Verify all relationships (post_apps, post_categories, post_tags)

### Phase 4: Update Frontend
1. Replace Sanity client with fetch to Cloudflare Workers
2. Update `src/lib/sanity.js` → `src/lib/api.js`
3. Update PostManager admin interface
4. Update image URLs to R2
5. Test all blog pages

### Phase 5: Deploy & Verify
1. Deploy Workers to Cloudflare
2. Test all API endpoints
3. Verify blog listing, single posts, app relations
4. Check SEO/meta tags still work
5. Remove Sanity dependencies

---

## Example API Responses

### GET /api/posts/by-app/shellist
```json
[
  {
    "id": "post-001",
    "title": "Automating Your Shell Scripts with Shellist",
    "slug": "automating-shell-scripts",
    "excerpt": "Learn how to automate your daily tasks...",
    "body": "<p>Full HTML content...</p>",
    "publishedAt": "2025-12-01T10:00:00Z",
    "featured": true,
    "readingTime": 8,
    "mainImage": "https://r2.yoursite.com/blog-images/shell-automation.jpg",
    "author": {
      "name": "Jane Doe",
      "image": "https://r2.yoursite.com/author-avatars/jane.jpg"
    },
    "categories": ["Tutorials", "Automation"],
    "tags": ["shell", "productivity", "cli"],
    "relatedApps": ["shellist", "postcard-studio"],
    "seo": {
      "metaTitle": "Shell Script Automation Guide",
      "metaDescription": "Complete guide to automating...",
      "ogImage": "https://r2.yoursite.com/og-images/post-001.jpg"
    }
  }
]
```

---

## Code Changes Required

### Before (Sanity):
```javascript
// src/lib/sanity.js
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true
})

export async function getBlogPosts() {
  return client.fetch(`*[_type == "post" && publishedAt <= now()] | order(publishedAt desc)`)
}
```

### After (Cloudflare):
```javascript
// src/lib/api.js
const API_URL = import.meta.env.VITE_API_URL || 'https://api.yoursite.com'

export async function getBlogPosts() {
  const response = await fetch(`${API_URL}/api/posts`)
  return response.json()
}

export async function getPostsByApp(appName) {
  const response = await fetch(`${API_URL}/api/posts/by-app/${appName}`)
  return response.json()
}
```

**Minimal code changes needed!** The API layer abstracts everything.

---

## Benefits Summary

### 🎯 You Get Complete Flexibility
- **Add new relationships anytime** without CMS limitations
- **Full SQL power** for complex queries
- **Complete data control** - it's your database

### 💰 Cost Savings
- **Sanity**: $99-199/month
- **Cloudflare D1**: FREE for 100K reads/day (5GB storage)
- **Cloudflare R2**: $0.015/GB/month (only storage, no egress fees)
- **Estimated savings**: ~$1,000+/year

### ⚡ Performance
- Edge compute (Workers run globally)
- R2 images served from CDN
- Faster than external Sanity API calls

### 🔧 Developer Experience
- Standard SQL (everyone knows it)
- Full API control
- No vendor lock-in
- Easy to debug

---

## Next Steps

**Ready to proceed?** I can:
1. ✅ Set up the D1 database with the schema above
2. ✅ Create the Cloudflare Workers API
3. ✅ Migrate your existing Sanity content
4. ✅ Update the frontend to use the new API
5. ✅ Help you add any NEW relationships you want (beyond what Sanity had)

**Just say the word and we'll get started!** 🚀

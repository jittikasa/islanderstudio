# Islander Studio Blog API Documentation

Base URL: `https://api.islanderstudio.app`

## Authentication

The API uses JWT-based authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer <token>
```

### Public Endpoints

These endpoints do not require authentication:

- `GET /api/posts` - List posts
- `GET /api/posts/:slug` - Get single post
- `GET /api/health` - Health check
- `GET /sitemap.xml` - XML sitemap
- `GET /feed.xml` - RSS feed
- `GET /feed.json` - JSON feed

### Protected Endpoints

All other endpoints require authentication.

---

## Authentication Endpoints

### Login with Password

```http
POST /api/auth/login
Content-Type: application/json

{
  "password": "your-admin-password",
  "rememberMe": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJ...",
  "expiresAt": "2025-02-20T12:00:00.000Z"
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Invalid password"
}
```

**Response (429 Too Many Requests):**
```json
{
  "error": "Too many failed login attempts. Please try again later.",
  "retryAfter": 900
}
```

### Login with Google OAuth

```http
GET /api/auth/google
```

Redirects to Google OAuth consent screen. After authentication, redirects back to the frontend with a token.

### Verify Session

```http
GET /api/auth/verify
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "valid": true,
  "expiresAt": "2025-02-20T12:00:00.000Z"
}
```

### Refresh Token

```http
POST /api/auth/refresh
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJ...",
  "expiresAt": "2025-02-21T12:00:00.000Z"
}
```

### Logout

```http
POST /api/auth/logout
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true
}
```

---

## Posts

### List Posts

```http
GET /api/posts
GET /api/posts?status=published
GET /api/posts?category=tutorials
GET /api/posts?tag=automation
GET /api/posts?app=shellist
GET /api/posts?search=keyword
GET /api/posts?limit=10&offset=0
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by status: `draft`, `published`, `scheduled` |
| `category` | string | Filter by category slug |
| `tag` | string | Filter by tag slug |
| `app` | string | Filter by related app: `shellist`, `polamoment` |
| `search` | string | Search in title, excerpt, and body |
| `limit` | number | Number of posts to return (default: 20) |
| `offset` | number | Number of posts to skip (default: 0) |

**Response (200 OK):**
```json
{
  "posts": [
    {
      "_id": "uuid",
      "title": "Post Title",
      "slug": { "current": "post-slug" },
      "excerpt": "Brief description...",
      "publishedAt": "2025-01-20T12:00:00.000Z",
      "readingTime": 5,
      "mainImage": {
        "url": "https://...",
        "alt": "Image description"
      },
      "authorName": "Author Name",
      "categories": ["Category 1"],
      "tags": ["tag1", "tag2"]
    }
  ],
  "total": 100,
  "hasMore": true
}
```

### Get Single Post

```http
GET /api/posts/:slug
```

**Response (200 OK):**
```json
{
  "_id": "uuid",
  "title": "Post Title",
  "slug": { "current": "post-slug" },
  "excerpt": "Brief description...",
  "body": "<p>HTML content...</p>",
  "publishedAt": "2025-01-20T12:00:00.000Z",
  "updatedAt": "2025-01-21T12:00:00.000Z",
  "readingTime": 5,
  "mainImage": {
    "url": "https://...",
    "alt": "Image description"
  },
  "authorName": "Author Name",
  "categories": ["Category 1"],
  "tags": ["tag1", "tag2"],
  "relatedApps": ["shellist"],
  "seo": {
    "metaTitle": "Custom SEO Title",
    "metaDescription": "Custom meta description",
    "keywords": ["keyword1", "keyword2"]
  }
}
```

### Create Post (Protected)

```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Post Title",
  "slug": "post-slug",
  "excerpt": "Brief description...",
  "body": "<p>HTML content...</p>",
  "authorId": "uuid",
  "categories": ["uuid1", "uuid2"],
  "tags": ["uuid1", "uuid2"],
  "relatedApps": ["uuid"],
  "mainImageUrl": "https://...",
  "mainImageAlt": "Image description",
  "featured": false,
  "contentStatus": "draft",
  "publishedAt": "2025-01-20T12:00:00.000Z",
  "seo": {
    "metaTitle": "Custom SEO Title",
    "metaDescription": "Custom meta description"
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "post": { ... }
}
```

### Update Post (Protected)

```http
PUT /api/posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  ...
}
```

### Delete Post (Protected)

```http
DELETE /api/posts/:id
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true
}
```

---

## Authors (Protected)

### List Authors

```http
GET /api/authors
Authorization: Bearer <token>
```

### Create Author

```http
POST /api/authors
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Author Name",
  "email": "author@example.com",
  "bio": "Author biography...",
  "avatarUrl": "https://...",
  "socialLinks": {
    "twitter": "https://twitter.com/...",
    "linkedin": "https://linkedin.com/..."
  }
}
```

### Update Author

```http
PUT /api/authors/:id
Authorization: Bearer <token>
```

### Delete Author

```http
DELETE /api/authors/:id
Authorization: Bearer <token>
```

---

## Categories (Protected)

### List Categories

```http
GET /api/categories
Authorization: Bearer <token>
```

**Response:**
```json
{
  "categories": [
    {
      "id": "uuid",
      "title": "Category Name",
      "slug": "category-slug",
      "description": "Category description",
      "color": "#6366f1"
    }
  ]
}
```

### Create Category

```http
POST /api/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Category Name",
  "slug": "category-slug",
  "description": "Category description",
  "color": "#6366f1"
}
```

### Update Category

```http
PUT /api/categories/:id
Authorization: Bearer <token>
```

### Delete Category

```http
DELETE /api/categories/:id
Authorization: Bearer <token>
```

---

## Tags (Protected)

### List Tags

```http
GET /api/tags
Authorization: Bearer <token>
```

**Response:**
```json
{
  "tags": [
    {
      "id": "uuid",
      "title": "Tag Name",
      "slug": "tag-slug",
      "post_count": 5
    }
  ]
}
```

### Create Tag

```http
POST /api/tags
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Tag Name",
  "slug": "tag-slug"
}
```

### Merge Tags

```http
POST /api/tags/merge
Authorization: Bearer <token>
Content-Type: application/json

{
  "sourceIds": ["uuid1", "uuid2"],
  "targetId": "uuid3"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Merged 2 tags into target tag",
  "postsUpdated": 5
}
```

### Bulk Delete Unused Tags

```http
POST /api/tags/bulk-delete
Authorization: Bearer <token>
Content-Type: application/json

{
  "unusedOnly": true
}
```

**Response:**
```json
{
  "success": true,
  "deletedCount": 3
}
```

---

## Apps (Protected)

### List Apps

```http
GET /api/apps
Authorization: Bearer <token>
```

### Create/Update/Delete App

```http
POST /api/apps
PUT /api/apps/:id
DELETE /api/apps/:id
Authorization: Bearer <token>
```

---

## Media (Protected)

### List Media

```http
GET /api/media
Authorization: Bearer <token>
```

### Upload Media

```http
POST /api/media
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <binary>
alt: "Image description"
```

**Response:**
```json
{
  "success": true,
  "media": {
    "id": "uuid",
    "filename": "image.jpg",
    "url": "https://...",
    "alt": "Image description",
    "size": 12345,
    "mimeType": "image/jpeg"
  }
}
```

### Delete Media

```http
DELETE /api/media/:id
Authorization: Bearer <token>
```

---

## Dashboard Stats (Protected)

### Get Dashboard Stats

```http
GET /api/stats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "stats": {
    "posts": {
      "total": 25,
      "published": 20,
      "drafts": 5,
      "thisWeek": 3
    },
    "authors": 2,
    "categories": 5,
    "tags": 15,
    "apps": 2
  }
}
```

### Get Recent Posts

```http
GET /api/stats/recent-posts?limit=5
Authorization: Bearer <token>
```

---

## Feeds (Public)

### RSS Feed

```http
GET /feed.xml
GET /rss.xml
GET /api/feed.xml
```

Returns an RSS 2.0 feed of published posts.

### JSON Feed

```http
GET /feed.json
GET /api/feed.json
```

Returns a JSON Feed (version 1.1) of published posts.

### Sitemap

```http
GET /sitemap.xml
GET /api/sitemap.xml
```

Returns an XML sitemap for search engines.

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message"
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing token |
| 404 | Not Found |
| 429 | Too Many Requests - Rate limited |
| 500 | Internal Server Error |

---

## Rate Limiting

The login endpoint (`POST /api/auth/login`) is rate limited:

- **Max attempts**: 5 failed attempts
- **Block duration**: 15 minutes
- **Reset**: Counter resets on successful login

When rate limited, the API returns:

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 900

{
  "error": "Too many failed login attempts. Please try again later.",
  "retryAfter": 900
}
```

---

## CORS

The API allows requests from:

- `https://islanderstudio.app`
- `https://www.islanderstudio.app`
- `http://localhost:5173` (development)
- `http://localhost:3000` (development)
- `*.pages.dev` (Cloudflare Pages previews)

Credentials (cookies) are allowed for authentication.

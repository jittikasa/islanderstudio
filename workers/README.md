# Islander Studio Blog API

Cloudflare Workers backend for the Islander Studio blog, powered by D1 (SQLite) and R2 (object storage).

## Setup Instructions

### 1. Install Dependencies

```bash
cd workers
npm install
```

### 2. Create D1 Database

```bash
wrangler d1 create blog-database
```

Copy the `database_id` from the output and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "blog-database"
database_id = "YOUR_DATABASE_ID_HERE"
```

### 3. Run Database Migrations

```bash
wrangler d1 execute blog-database --file=../docs/d1-blog-schema.sql
```

### 4. Create R2 Bucket

```bash
wrangler r2 bucket create blog-media
```

### 5. Set Environment Variables

Generate a password hash for admin login:

```bash
node -e "console.log(require('bcryptjs').hashSync('your-password-here', 10))"
```

Set environment variables in Cloudflare dashboard or using Wrangler:

```bash
# Admin password hash
wrangler secret put ADMIN_PASSWORD_HASH
# Paste the bcrypt hash from above

# JWT secret (generate a random string)
wrangler secret put JWT_SECRET
# Paste a random 32+ character string
```

### 6. Run Locally

```bash
npm run dev
```

The API will be available at `http://localhost:8787`

### 7. Deploy to Cloudflare

```bash
npm run deploy
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login with password
  ```json
  {
    "password": "your-password",
    "rememberMe": false
  }
  ```

### Posts

- `GET /api/posts` - List all posts (with filters)
- `GET /api/posts/:slug` - Get single post
- `POST /api/posts` - Create post (requires auth)
- `PUT /api/posts/:id` - Update post (requires auth)
- `DELETE /api/posts/:id` - Delete post (requires auth)

### Other Endpoints

- `GET /api/authors` - List authors
- `GET /api/categories` - List categories
- `GET /api/tags` - List tags
- `GET /api/apps` - List apps
- `GET /api/media` - List media (TODO)

## Testing

Test the login endpoint:

```bash
curl -X POST http://localhost:8787/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password":"your-password","rememberMe":false}'
```

Test authenticated endpoint:

```bash
curl http://localhost:8787/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Project Structure

```
workers/
├── src/
│   ├── index.js           # Main router
│   ├── auth.js            # Authentication logic
│   └── api/
│       ├── posts.js       # Posts CRUD
│       ├── authors.js     # Authors CRUD
│       ├── categories.js  # Categories CRUD
│       ├── tags.js        # Tags CRUD
│       ├── apps.js        # Apps CRUD
│       └── media.js       # Media/R2 handling
├── package.json
├── wrangler.toml
└── README.md
```

## Security Notes

- Never commit `ADMIN_PASSWORD_HASH` or `JWT_SECRET` to git
- Use strong passwords (12+ characters)
- Rotate JWT secret regularly
- Update CORS headers to your domain in production
- Consider rate limiting for login endpoint

## Next Steps

- [ ] Implement full CRUD for authors, categories, tags, apps
- [ ] Add image upload to R2
- [ ] Add rate limiting
- [ ] Add request logging
- [ ] Set up monitoring/alerts

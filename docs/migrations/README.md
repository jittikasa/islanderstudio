# Database Migrations

This folder contains SQL migration files for the Cloudflare D1 database.

## How to Apply Migrations

### Production (Remote Database)

Apply a migration to your production D1 database:

```bash
cd workers
npx wrangler d1 execute blog-database --remote --file=../docs/migrations/MIGRATION_FILE.sql
```

### Development (Local Database)

Apply a migration to your local D1 database for testing:

```bash
cd workers
npx wrangler d1 execute blog-database --local --file=../docs/migrations/MIGRATION_FILE.sql
```

## Migration Files

### 001_add_media_table.sql
**Date**: 2026-01-02
**Purpose**: Add `media` table for R2 image storage metadata

Creates the `media` table with:
- Image metadata (filename, size, content type)
- R2 storage key and public URL
- Image dimensions (width, height)
- Alt text for accessibility
- Timestamps

**Required for**: Media Library feature in admin panel

**Apply with**:
```bash
npx wrangler d1 execute blog-database --remote --file=../docs/migrations/001_add_media_table.sql
```

## Creating New Migrations

When adding new features that require database changes:

1. Create a new migration file with a sequential number:
   ```
   002_add_your_feature.sql
   ```

2. Include a comment at the top with date and purpose:
   ```sql
   -- Migration: Add your feature description
   -- Date: YYYY-MM-DD
   ```

3. Write your SQL statements (CREATE TABLE, ALTER TABLE, etc.)

4. Test locally first:
   ```bash
   npx wrangler d1 execute blog-database --local --file=../docs/migrations/002_add_your_feature.sql
   ```

5. Apply to production when ready:
   ```bash
   npx wrangler d1 execute blog-database --remote --file=../docs/migrations/002_add_your_feature.sql
   ```

## Important Notes

- ⚠️ **Always test migrations locally before applying to production**
- ⚠️ **D1 databases may be briefly unavailable during migration**
- ⚠️ **Migrations cannot be easily rolled back - plan carefully**
- ✅ **Keep migrations small and focused on one feature**
- ✅ **Document what each migration does**
- ✅ **Never modify existing migration files after they're applied**

## Checking Applied Migrations

To see the current database schema:

```bash
# List all tables
npx wrangler d1 execute blog-database --remote --command "SELECT name FROM sqlite_master WHERE type='table';"

# See specific table schema
npx wrangler d1 execute blog-database --remote --command "PRAGMA table_info(media);"
```

## Troubleshooting

### Error: "CLOUDFLARE_API_TOKEN environment variable not set"

You need to set up authentication:

1. Create an API token at: https://developers.cloudflare.com/fundamentals/api/get-started/create-token/
2. Set the token:
   ```bash
   export CLOUDFLARE_API_TOKEN="your-token-here"
   ```
3. Or use `npx wrangler login` for interactive authentication

### Error: "table already exists"

The migration has already been applied. Check if the table exists:

```bash
npx wrangler d1 execute blog-database --remote --command "SELECT name FROM sqlite_master WHERE type='table' AND name='media';"
```

### Error: "no such table"

The migration hasn't been applied yet. Apply it using the command above.

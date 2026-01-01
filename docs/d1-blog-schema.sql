-- ============================================================
-- CLOUDFLARE D1 BLOG DATABASE SCHEMA
-- Full flexibility with unlimited relationships
-- ============================================================

-- CORE TABLES
-- ============================================================

-- Blog Posts (main content table)
CREATE TABLE posts (
  id TEXT PRIMARY KEY,  -- UUID
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,  -- HTML or Markdown
  featured INTEGER DEFAULT 0,  -- Boolean (0/1)
  reading_time INTEGER,
  published_at DATETIME NOT NULL,
  updated_at DATETIME,
  content_status TEXT DEFAULT 'draft',  -- draft, review, optimized, published

  -- SEO fields (embedded)
  seo_meta_title TEXT,
  seo_meta_description TEXT,
  seo_focus_keyword TEXT,
  seo_keywords TEXT,  -- JSON array as text
  seo_og_image_url TEXT,
  seo_canonical_url TEXT,
  seo_no_index INTEGER DEFAULT 0,
  seo_og_type TEXT DEFAULT 'article',

  -- Main image
  main_image_url TEXT,
  main_image_alt TEXT,

  -- Foreign key to author
  author_id TEXT,
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE SET NULL,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Authors
CREATE TABLE authors (
  id TEXT PRIMARY KEY,  -- UUID
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  bio TEXT,
  image_url TEXT,
  email TEXT,
  social_links TEXT,  -- JSON object as text
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Categories
CREATE TABLE categories (
  id TEXT PRIMARY KEY,  -- UUID
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT,  -- Hex color for UI
  icon TEXT,  -- Icon name or emoji
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tags
CREATE TABLE tags (
  id TEXT PRIMARY KEY,  -- UUID
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Apps (your actual applications that blog posts relate to)
CREATE TABLE apps (
  id TEXT PRIMARY KEY,  -- UUID
  name TEXT UNIQUE NOT NULL,  -- shellist, polamoment, postcard-studio
  display_name TEXT NOT NULL,  -- "Shellist", "PolaMoment", "Postcard Studio"
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  url TEXT,  -- /shellist, /polamoment, etc.
  icon_url TEXT,
  color TEXT,  -- Brand color
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- AUTHENTICATION
-- ============================================================
-- Sessions table for password-only authentication
-- Admin password is stored in environment variable (ADMIN_PASSWORD_HASH)

CREATE TABLE sessions (
  id TEXT PRIMARY KEY,  -- UUID
  token TEXT UNIQUE NOT NULL,  -- JWT token
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);


-- RELATIONSHIP TABLES (JOIN TABLES)
-- ============================================================
-- This is what gives you UNLIMITED flexibility!
-- You can add as many relationship types as you want

-- Many-to-Many: Posts <-> Categories
CREATE TABLE post_categories (
  post_id TEXT NOT NULL,
  category_id TEXT NOT NULL,
  PRIMARY KEY (post_id, category_id),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Many-to-Many: Posts <-> Tags
CREATE TABLE post_tags (
  post_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  PRIMARY KEY (post_id, tag_id),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Many-to-Many: Posts <-> Apps (THIS IS YOUR APP RELATION!)
CREATE TABLE post_apps (
  post_id TEXT NOT NULL,
  app_id TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,  -- For sorting if needed
  PRIMARY KEY (post_id, app_id),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (app_id) REFERENCES apps(id) ON DELETE CASCADE
);


-- FUTURE-PROOF: EASY TO ADD MORE RELATIONSHIPS
-- ============================================================
-- Want to add Series? Easy:
-- CREATE TABLE series (
--   id TEXT PRIMARY KEY,
--   title TEXT NOT NULL,
--   description TEXT
-- );
-- CREATE TABLE post_series (
--   post_id TEXT NOT NULL,
--   series_id TEXT NOT NULL,
--   part_number INTEGER,
--   PRIMARY KEY (post_id, series_id),
--   FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
--   FOREIGN KEY (series_id) REFERENCES series(id) ON DELETE CASCADE
-- );

-- Want to add Topics? Easy:
-- CREATE TABLE topics (
--   id TEXT PRIMARY KEY,
--   name TEXT NOT NULL
-- );
-- CREATE TABLE post_topics (
--   post_id TEXT NOT NULL,
--   topic_id TEXT NOT NULL,
--   PRIMARY KEY (post_id, topic_id),
--   FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
--   FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
-- );

-- Want to link posts to other entities? Just create the table and join table!


-- INDEXES FOR PERFORMANCE
-- ============================================================
CREATE INDEX idx_posts_published_at ON posts(published_at);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_featured ON posts(featured);
CREATE INDEX idx_posts_status ON posts(content_status);

CREATE INDEX idx_authors_slug ON authors(slug);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_apps_name ON apps(name);

-- Indexes for relationships (faster JOINs)
CREATE INDEX idx_post_categories_post ON post_categories(post_id);
CREATE INDEX idx_post_categories_category ON post_categories(category_id);
CREATE INDEX idx_post_tags_post ON post_tags(post_id);
CREATE INDEX idx_post_tags_tag ON post_tags(tag_id);
CREATE INDEX idx_post_apps_post ON post_apps(post_id);
CREATE INDEX idx_post_apps_app ON post_apps(app_id);


-- SAMPLE QUERIES YOU CAN RUN
-- ============================================================

-- Get all posts for a specific app (e.g., "shellist"):
-- SELECT p.* FROM posts p
-- INNER JOIN post_apps pa ON p.id = pa.post_id
-- INNER JOIN apps a ON pa.app_id = a.id
-- WHERE a.name = 'shellist'
-- AND p.published_at <= CURRENT_TIMESTAMP
-- ORDER BY p.published_at DESC;

-- Get a single post with ALL relationships:
-- SELECT
--   p.*,
--   a.name as author_name,
--   a.image_url as author_image,
--   GROUP_CONCAT(DISTINCT c.title) as categories,
--   GROUP_CONCAT(DISTINCT t.title) as tags,
--   GROUP_CONCAT(DISTINCT app.name) as related_apps
-- FROM posts p
-- LEFT JOIN authors a ON p.author_id = a.id
-- LEFT JOIN post_categories pc ON p.id = pc.post_id
-- LEFT JOIN categories c ON pc.category_id = c.id
-- LEFT JOIN post_tags pt ON p.id = pt.post_id
-- LEFT JOIN tags t ON pt.tag_id = t.id
-- LEFT JOIN post_apps papa ON p.id = papa.post_id
-- LEFT JOIN apps app ON papa.app_id = app.id
-- WHERE p.slug = ?
-- GROUP BY p.id;

-- Get posts by multiple filters (app + category + tag):
-- SELECT DISTINCT p.* FROM posts p
-- INNER JOIN post_apps pa ON p.id = pa.post_id
-- INNER JOIN apps app ON pa.app_id = app.id
-- INNER JOIN post_categories pc ON p.id = pc.post_id
-- INNER JOIN categories c ON pc.category_id = c.id
-- INNER JOIN post_tags pt ON p.id = pt.post_id
-- INNER JOIN tags t ON pt.tag_id = t.id
-- WHERE app.name = 'shellist'
-- AND c.slug = 'tutorials'
-- AND t.slug = 'automation'
-- ORDER BY p.published_at DESC;


-- SEED DATA (Initial apps)
-- ============================================================
INSERT INTO apps (id, name, display_name, slug, url, color) VALUES
  ('app-001', 'shellist', 'Shellist', 'shellist', '/shellist', '#4F46E5'),
  ('app-002', 'polamoment', 'PolaMoment', 'polamoment', '/polamoment', '#EC4899'),
  ('app-003', 'postcard-studio', 'Postcard Studio', 'postcard-studio', '/postcard-studio', '#10B981');

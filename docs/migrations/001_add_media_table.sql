-- Migration: Add media table for R2 image storage
-- Date: 2026-01-02

CREATE TABLE media (
  id TEXT PRIMARY KEY,  -- UUID
  filename TEXT NOT NULL,  -- Original filename
  key TEXT UNIQUE NOT NULL,  -- R2 object key (storage path)
  url TEXT NOT NULL,  -- Public URL to access the image
  size INTEGER NOT NULL,  -- File size in bytes
  content_type TEXT NOT NULL,  -- MIME type (image/jpeg, image/png, etc.)
  width INTEGER,  -- Image width in pixels
  height INTEGER,  -- Image height in pixels
  alt_text TEXT,  -- Accessibility text
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_media_key ON media(key);
CREATE INDEX idx_media_created_at ON media(created_at);

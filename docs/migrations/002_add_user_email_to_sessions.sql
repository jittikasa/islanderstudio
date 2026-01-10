-- ============================================================
-- MIGRATION 002: Add user_email column to sessions table
-- Required for Google OAuth authentication
-- ============================================================

-- Add user_email column to track who created the session
ALTER TABLE sessions ADD COLUMN user_email TEXT;

-- Create index for faster lookups by email
CREATE INDEX IF NOT EXISTS idx_sessions_email ON sessions(user_email);

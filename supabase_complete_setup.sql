-- =====================================================
-- COMPLETE DATABASE SETUP FOR AI SOURCING LEAGUE GAME
-- =====================================================
-- Run this entire file in Supabase SQL Editor to set up everything
-- This will create the table with proper schema and RLS policies

-- =====================================================
-- Step 1: Drop existing table if needed (OPTIONAL - only if you want to start fresh)
-- =====================================================
-- WARNING: This will delete all existing data!
-- Uncomment the line below ONLY if you want to recreate the table from scratch
-- DROP TABLE IF EXISTS players CASCADE;

-- =====================================================
-- Step 2: Create the players table with complete schema
-- =====================================================
CREATE TABLE IF NOT EXISTS players (
  -- Primary key - auto-generated UUID
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Player information
  name TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  email TEXT,

  -- Session token for persistent authentication
  session_token TEXT UNIQUE,

  -- Game progress stored as JSONB
  progress JSONB DEFAULT '{
    "attempts": [],
    "achievements": []
  }'::jsonb,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- Step 3: Create indexes for performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_players_name ON players(name);
CREATE INDEX IF NOT EXISTS idx_players_session_token ON players(session_token);
CREATE INDEX IF NOT EXISTS idx_players_score ON players(score DESC);

-- =====================================================
-- Step 4: Add comments for documentation
-- =====================================================
COMMENT ON TABLE players IS 'Stores player information, scores, and game progress';
COMMENT ON COLUMN players.id IS 'Primary key - auto-generated UUID';
COMMENT ON COLUMN players.name IS 'Player display name - required';
COMMENT ON COLUMN players.score IS 'Total cumulative score from all game attempts';
COMMENT ON COLUMN players.session_token IS 'Persistent session token for authentication without passwords. UUID v4 format.';
COMMENT ON COLUMN players.progress IS 'JSONB field storing attempts array and achievements array';

-- =====================================================
-- Step 5: Enable Row Level Security
-- =====================================================
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- Step 6: Create RLS Policies
-- =====================================================

-- Allow public read access (for leaderboard)
CREATE POLICY "Public read access for leaderboard"
ON players
FOR SELECT
TO public
USING (true);

-- Allow public player creation
CREATE POLICY "Public insert for new players"
ON players
FOR INSERT
TO public
WITH CHECK (true);

-- Allow public updates (since we use session tokens, not auth)
CREATE POLICY "Public update access"
ON players
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Allow public delete (for account management)
CREATE POLICY "Public delete access"
ON players
FOR DELETE
TO public
USING (true);

-- =====================================================
-- Step 7: Verify setup
-- =====================================================
-- Check table structure
-- SELECT column_name, data_type, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'players'
-- ORDER BY ordinal_position;

-- Check RLS policies
-- SELECT * FROM pg_policies WHERE tablename = 'players';

-- Check indexes
-- SELECT indexname, indexdef
-- FROM pg_indexes
-- WHERE tablename = 'players';

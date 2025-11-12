-- =====================================================
-- RLS (Row Level Security) Policies for Players Table
-- =====================================================
-- This file sets up the security policies for the players table
-- Run this in Supabase SQL Editor after creating the table

-- First, enable RLS on the players table
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 1. SELECT Policy - Allow public read access
-- =====================================================
-- Everyone can view the leaderboard and player data
CREATE POLICY "Public read access for leaderboard"
ON players
FOR SELECT
TO public
USING (true);

-- =====================================================
-- 2. INSERT Policy - Allow public player creation
-- =====================================================
-- Anyone can create a new player account
CREATE POLICY "Public insert for new players"
ON players
FOR INSERT
TO public
WITH CHECK (true);

-- =====================================================
-- 3. UPDATE Policy - Allow anyone to update any player
-- =====================================================
-- Since we don't have user authentication, allow public updates
-- In a production app, you'd restrict this to session_token matching
CREATE POLICY "Public update access"
ON players
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- =====================================================
-- 4. DELETE Policy - Allow public delete
-- =====================================================
-- Allow deletion for account management
CREATE POLICY "Public delete access"
ON players
FOR DELETE
TO public
USING (true);

-- =====================================================
-- Verify policies are active
-- =====================================================
-- Run this query to check if policies are enabled:
-- SELECT * FROM pg_policies WHERE tablename = 'players';

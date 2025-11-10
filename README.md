<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1rjud0NAbuh4kYP2qkmo2fAD0a6NaD1tz

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Gemini usage & limits

The AI Coach calls Gemini briefly (max 120 output tokens) and truncates prompts to 2,800 characters so we stay within the free tier. The service also enforces a 30-second cooldown, so if you trigger feedback or coaching too rapidly you will see a polite request to wait. These protections keep the experience snappy while still showcasing helpful sourcing tips.

## Persistent leaderboard & progress tracking

1. Create a Supabase project, then run this SQL in the SQL editor to prepare the leaderboard table:

   ```sql
   create table if not exists players (
     name text primary key,
     score integer not null default 0,
     progress jsonb,
     updated_at timestamp with time zone default now()
   );
   ```

2. Expose the Supabase URL and anon key to the front end by adding the following to `.env.local` (and the matching environment variables in Vercel):

   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. The app automatically syncs every player record and leaderboard update with Supabase while keeping the localStorage cache as a fallback when the remote table is empty or the project is not configured yet.

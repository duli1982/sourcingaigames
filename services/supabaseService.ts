import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Player } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const supabaseClient: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;

const ensureConfig = () => {
  if (!isSupabaseConfigured || !supabaseClient) {
    console.warn('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return Boolean(supabaseClient);
};

export const fetchLeaderboard = async (): Promise<Player[]> => {
  if (!ensureConfig() || !supabaseClient) {
    return [];
  }

  const { data, error } = await supabaseClient
    .from('players')
    .select('name, score')
    .order('score', { ascending: false });

  if (error) {
    console.error('Failed to fetch leaderboard from Supabase:', error);
    return [];
  }

  return data?.map((row) => ({ name: row.name, score: row.score ?? 0 })) ?? [];
};

export const syncPlayerRecord = async (
  player: Player,
  progress?: Record<string, unknown>
): Promise<void> => {
  if (!ensureConfig() || !supabaseClient) {
    return;
  }

  try {
    await supabaseClient.from('players').upsert(
      {
        name: player.name,
        score: player.score,
        progress,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'name' }
    );
  } catch (error) {
    console.error('Failed to sync player record to Supabase:', error);
  }
};

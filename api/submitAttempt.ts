import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';
import { games } from './_lib/data/games.js';
import { Attempt, Player } from './_lib/types.js';
import { checkNewAchievements } from './_lib/data/achievements.js';

const GEMINI_MAX_OUTPUT_TOKENS = 120;
const GEMINI_PROMPT_CHAR_LIMIT = 2800;

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const getSupabase = () => {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Supabase service credentials are not configured');
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey);
};

const parseScore = (text: string): number | null => {
  const match = text.match(/SCORE:\s*(\d+)/i);
  if (!match) return null;
  const value = parseInt(match[1], 10);
  if (Number.isNaN(value)) return null;
  return Math.max(0, Math.min(100, value));
};

const mapPlayer = (row: any): Player => ({
  id: row.id,
  name: row.name,
  score: row.score ?? 0,
  sessionToken: row.session_token,
  attempts: row.progress?.attempts || [],
  achievements: row.progress?.achievements || [],
  pinHash: row.progress?.pinHash || undefined,
});

/**
 * Enhances feedback for high-scoring submissions (85%+)
 * Adds celebration message
 */
const enhanceFeedbackForHighScores = (feedback: string, score: number, gameTitle: string): string => {
  if (score >= 85) {
    const celebration = `

---

## 🎉 OUTSTANDING WORK! 🎉

You've achieved an **expert-level score** (${score}/100)! This is professional-grade sourcing that shows you really know your stuff.

Keep crushing it! 🌟`;

    return feedback + celebration;
  }

  return feedback;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionToken, gameId, submission } = (req.body ?? {}) as {
      sessionToken?: string;
      gameId?: string;
      submission?: string;
    };

    if (!sessionToken || typeof sessionToken !== 'string') {
      return res.status(401).json({ error: 'Missing session token' });
    }
    if (!gameId || typeof gameId !== 'string') {
      return res.status(400).json({ error: 'Missing gameId' });
    }
    if (!submission || typeof submission !== 'string' || !submission.trim()) {
      return res.status(400).json({ error: 'Missing submission' });
    }

    const game = games.find(g => g.id === gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    const supabase = getSupabase();
    const { data: playerRow, error: playerError } = await supabase
      .from('players')
      .select('*')
      .eq('session_token', sessionToken)
      .single();

    if (playerError || !playerRow) {
      return res.status(401).json({ error: 'Invalid session. Please log in again.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = game.promptGenerator(submission);
    const trimmedPrompt = prompt.slice(0, GEMINI_PROMPT_CHAR_LIMIT);

    // Use the Gemini SDK - try simple text input
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: trimmedPrompt,
    } as any);

    console.log('Gemini full response:', JSON.stringify(response, null, 2));

    // Try multiple ways to extract the text
    let feedbackText = response.text
      || response.candidates?.[0]?.content?.parts?.[0]?.text
      || response.candidates?.[0]?.text
      || response.response?.text;

    if (!feedbackText) {
      console.error('Gemini response structure:', JSON.stringify(response, null, 2));
      return res.status(500).json({
        error: 'Gemini did not return feedback',
        responseKeys: Object.keys(response)
      });
    }

    const score = parseScore(feedbackText);
    if (score === null) {
      return res.status(500).json({ error: 'Failed to parse score from AI response' });
    }

    // Enhance feedback for high scores (85%+)
    const enhancedFeedback = enhanceFeedbackForHighScores(feedbackText, score, game.title);

    const currentPlayer = mapPlayer(playerRow);
    const attempt: Attempt = {
      gameId: game.id,
      gameTitle: game.title,
      submission,
      score,
      skill: game.skillCategory,
      ts: new Date().toISOString(),
      feedback: enhancedFeedback,
    };

    const updatedAttempts = [...(currentPlayer.attempts || []), attempt];
    const updatedPlayer: Player = {
      ...currentPlayer,
      score: currentPlayer.score + score,
      attempts: updatedAttempts,
      pinHash: currentPlayer.pinHash,
    };

    const newAchievements = checkNewAchievements(updatedPlayer);
    const unlockedIds = new Set((currentPlayer.achievements || []).map(a => a.id));
    const mergedAchievements = [
      ...(currentPlayer.achievements || []),
      ...newAchievements
        .filter(def => !unlockedIds.has(def.id))
        .map(def => ({
          id: def.id,
          name: def.name,
          description: def.description,
          icon: def.icon,
          category: def.category,
          unlockedAt: new Date().toISOString(),
        })),
    ];

    const { data: savedPlayer, error: updateError } = await supabase
      .from('players')
      .update({
        score: updatedPlayer.score,
        progress: {
          attempts: updatedAttempts,
          achievements: mergedAchievements,
          pinHash: currentPlayer.pinHash || null,
        },
        updated_at: new Date().toISOString(),
      })
      .eq('id', currentPlayer.id)
      .select()
      .single();

    if (updateError || !savedPlayer) {
      return res.status(500).json({ error: 'Failed to save attempt' });
    }

    return res.status(200).json({
      score,
      feedback: enhancedFeedback,
      player: mapPlayer(savedPlayer),
    });
  } catch (error: any) {
    console.error('submitAttempt error:', error);
    console.error('Error stack:', error?.stack);
    console.error('Error details:', JSON.stringify(error, null, 2));
    const message = error?.message ?? 'Unknown error';
    return res.status(500).json({
      error: message,
      details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    });
  }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';
import { games } from './_lib/data/games.js';
import { Attempt, Player } from '../types.js';
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
 * Ensures the feedback string is HTML. If the model returns plain text/markdown,
 * we escape it and wrap it so the UI renders safely.
 */
const normalizeFeedbackHtml = (feedback: string): string => {
  const trimmed = feedback.trim();
  if (!trimmed) {
    throw new Error('Feedback is empty');
  }

  const looksLikeHtml = /<[^>]+>/.test(trimmed);
  if (looksLikeHtml) {
    return trimmed;
  }

  const escaped = trimmed
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const paragraphs = escaped
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => p.replace(/\n/g, '<br/>'));

  return paragraphs.length
    ? `<p>${paragraphs.join('</p><p>')}</p>`
    : `<p>${escaped}</p>`;
};

/**
 * Extracts the JSON payload from the model response and validates its shape.
 * Throws on any schema violation to avoid silently accepting malformed output.
 */
const parseAiResponse = (rawText: string): { score: number; feedback: string } => {
  const cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');

  if (start === -1 || end === -1 || end <= start) {
    throw new Error('No JSON object found in model response');
  }

  const jsonSlice = cleaned.slice(start, end + 1);
  let parsed: any;

  try {
    parsed = JSON.parse(jsonSlice);
  } catch {
    throw new Error('Model response contained invalid JSON');
  }

  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error('Model response JSON is not an object');
  }

  if (typeof parsed.score !== 'number' || Number.isNaN(parsed.score)) {
    throw new Error('Model response missing numeric score');
  }

  if (typeof parsed.feedback !== 'string') {
    throw new Error('Model response missing feedback string');
  }

  const normalizedScore = Math.max(0, Math.min(100, Math.round(parsed.score)));
  const normalizedFeedback = normalizeFeedbackHtml(parsed.feedback);

  return { score: normalizedScore, feedback: normalizedFeedback };
};

/**
 * Enhances feedback for high-scoring submissions (85%+)
 * Adds celebration message
 */
const enhanceFeedbackForHighScores = (feedback: string, score: number, gameTitle: string): string => {
  if (score >= 85) {
    const celebration = `
<hr/>
<p><strong>OUTSTANDING WORK!</strong></p>
<p>You've achieved an expert-level score (${score}/100) on ${gameTitle}. This is professional-grade sourcing that shows you really know your stuff.</p>
<p>Keep crushing it!</p>`;

    return feedback + celebration;
  }

  return feedback;
};

const sendError = (
  res: VercelResponse,
  status: number,
  code: string,
  message: string,
  details?: Record<string, unknown>
) => res.status(status).json({ error: { code, message, ...(details ? { details } : {}) } });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return sendError(res, 405, 'method_not_allowed', 'Only POST is supported for submissions.');
  }

  try {
    const { sessionToken, gameId, submission } = (req.body ?? {}) as {
      sessionToken?: string;
      gameId?: string;
      submission?: string;
    };

    if (!sessionToken || typeof sessionToken !== 'string') {
      return sendError(res, 401, 'missing_session_token', 'Please log in again to submit attempts.');
    }
    if (!gameId || typeof gameId !== 'string') {
      return sendError(res, 400, 'missing_game_id', 'We could not identify which game you are playing.');
    }
    if (!submission || typeof submission !== 'string' || !submission.trim()) {
      return sendError(res, 400, 'missing_submission', 'Submission text is required to score your attempt.');
    }

    const game = games.find(g => g.id === gameId);
    if (!game) {
      return sendError(res, 404, 'game_not_found', 'That game is unavailable. Please refresh and try again.');
    }

    // Initialize Supabase client once for all database operations
    const supabase = getSupabase();

    // Apply game override if exists
    let override: any = null;
    try {
      const { data: overrideRow } = await supabase
        .from('game_overrides')
        .select('*')
        .eq('id', gameId)
        .maybeSingle();
      override = overrideRow;
    } catch (err) {
      console.warn('Failed to fetch game override', err);
    }

    if (override && override.active === false) {
      return sendError(res, 404, 'game_inactive', 'This game is currently inactive.');
    }

    // Fetch player data
    const { data: playerRow, error: playerError } = await supabase
      .from('players')
      .select('*')
      .eq('session_token', sessionToken)
      .single();

    if (playerError || !playerRow) {
      return sendError(res, 401, 'invalid_session', 'Your session expired. Please re-open the app to continue playing.');
    }
    if (playerRow.status === 'banned') {
      return sendError(res, 403, 'player_banned', 'Your account is banned. Contact an admin for help.');
    }

    // Rate Limiting: Check last attempt timestamp
    const attempts = playerRow.progress?.attempts || [];
    if (attempts.length > 0) {
      const lastAttempt = attempts[attempts.length - 1];
      const lastAttemptTime = new Date(lastAttempt.ts).getTime();
      const now = Date.now();
      const cooldownMs = 30000; // 30 seconds

      if (now - lastAttemptTime < cooldownMs) {
        const remainingSeconds = Math.ceil((cooldownMs - (now - lastAttemptTime)) / 1000);
        return sendError(
          res,
          429,
          'cooldown_active',
          `Please wait ${remainingSeconds} seconds before submitting again.`
        );
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return sendError(res, 500, 'missing_gemini_key', 'AI feedback is temporarily unavailable. Please try again later.');
    }

    const ai = new GoogleGenAI({ apiKey });

    // Append strict JSON instruction to override any game-specific formatting
    const systemInstruction = `
*** CRITICAL INSTRUCTION ***
Ignore any previous instructions about the response format or score range (e.g., [1-5]).
You must evaluate the submission and return a STRICT JSON object.

Required JSON Structure:
{
  "score": number, // Integer between 0 and 100
  "feedback": "string" // Detailed feedback in HTML format. Use <ul>, <li>, <strong>, <p> tags. Do NOT use Markdown or code fences.
}

Example Response:
{"score": 85, "feedback": "<p><strong>Great job!</strong></p><ul><li>You correctly identified...</li><li>Consider adding...</li></ul>"}

Do not include any text outside the JSON object. Do not use markdown code blocks. Respond with valid JSON only.`;

    const promptBase = override?.prompt_template || game.promptGenerator(submission);
    const prompt = `${promptBase}\n\n${systemInstruction}`;
    const trimmedPrompt = prompt.slice(0, GEMINI_PROMPT_CHAR_LIMIT + 500); // Allow extra for our instruction

    // Use the Gemini SDK
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: trimmedPrompt,
    } as any);

    console.log('Gemini full response:', JSON.stringify(response, null, 2));

    // Extract text - using type assertion to handle dynamic Gemini SDK response structure
    const geminiResponse = response as any;
    let responseText = geminiResponse.text
      || geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text
      || geminiResponse.candidates?.[0]?.text
      || geminiResponse.response?.text;

    if (!responseText) {
      console.error('Gemini response structure:', JSON.stringify(response, null, 2));
      return sendError(res, 500, 'empty_model_response', 'AI feedback is temporarily unavailable. Please try again.');
    }

    // Strict JSON parsing with schema validation
    let score: number;
    let feedbackText: string;

    try {
      const parsed = parseAiResponse(responseText);
      score = parsed.score;
      feedbackText = parsed.feedback;
    } catch (parseError: any) {
      console.error('Failed to parse AI response:', parseError?.message);
      console.error('Raw AI response text:', responseText);
      return sendError(res, 500, 'invalid_model_json', 'AI feedback was not returned in the expected format. Please try again.');
    }

    // Enhance feedback for high scores (85%+)
    const enhancedFeedback = enhanceFeedbackForHighScores(feedbackText, score, game.title);

    const currentPlayer = mapPlayer(playerRow);
    const attempt: Attempt = {
      gameId: game.id,
      gameTitle: override?.title || game.title,
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
      return sendError(
        res,
        500,
        'save_attempt_failed',
        'We could not save your attempt. Please retry in a few seconds.',
        process.env.NODE_ENV === 'development'
          ? { supabaseError: updateError?.message, code: updateError?.code }
          : undefined
      );
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
    return sendError(
      res,
      500,
      'unexpected_error',
      'Unexpected error. Please try again.',
      process.env.NODE_ENV === 'development' ? { stack: error?.stack, message } : undefined
    );
  }
}

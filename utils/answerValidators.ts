import { compareTwoStrings } from 'string-similarity';
import { ValidationConfig, ValidationResult } from '../types';

export function validateSimilarity(
    submission: string,
    exampleSolution?: string
): number {
    if (!exampleSolution) return 0;
    return compareTwoStrings(submission.toLowerCase(), exampleSolution.toLowerCase());
}

export function validateBooleanSearch(
    submission: string,
    requirements: { keywords?: string[]; location?: string } = {}
): ValidationResult {
    const checks: Record<string, boolean> = {
        hasParentheses: /\([^)]+\)/.test(submission),
        hasAND: /\bAND\b/.test(submission), // Case sensitive usually for Boolean, but let's be strict
        hasOR: /\bOR\b/.test(submission),
        hasNot: /\bNOT\b/.test(submission) || /-/.test(submission),
    };

    const feedback: string[] = [];
    let score = 100;

    if (!checks.hasParentheses && (checks.hasOR || checks.hasAND)) {
        feedback.push('Missing parentheses for grouping logic.');
        score -= 15;
    }

    if (!checks.hasAND && !checks.hasOR) {
        feedback.push('Search string lacks basic boolean operators (AND, OR).');
        score -= 20;
    }

    // Keyword checks
    if (requirements.keywords) {
        const missingKeywords = requirements.keywords.filter(
            (k) => !new RegExp(k, 'i').test(submission)
        );
        if (missingKeywords.length > 0) {
            checks.hasKeywords = false;
            feedback.push(`Missing required keywords: ${missingKeywords.join(', ')}`);
            score -= 10 * missingKeywords.length;
        } else {
            checks.hasKeywords = true;
        }
    }

    return {
        score: Math.max(0, score),
        checks,
        feedback,
    };
}

export function validateOutreach(
    submission: string,
    maxWords: number = 150
): ValidationResult {
    const wordCount = submission.trim().split(/\s+/).length;
    const checks: Record<string, boolean> = {
        lengthOK: wordCount <= maxWords && wordCount > 10,
        hasSubjectLine: /Subject:/i.test(submission),
    };

    const feedback: string[] = [];
    let score = 100;

    if (wordCount < 10) {
        feedback.push('Message is too short.');
        score -= 40;
    } else if (wordCount > maxWords) {
        feedback.push(`Message is too long (${wordCount} words). Aim for under ${maxWords}.`);
        score -= 10;
    }

    const cliches = ['just checking in', 'circling back', 'per my last email'];
    const foundCliches = cliches.filter((c) =>
        new RegExp(c, 'i').test(submission)
    );

    if (foundCliches.length > 0) {
        checks.hasCliches = true;
        feedback.push(`Avoid cliches: ${foundCliches.join(', ')}`);
        score -= 5 * foundCliches.length;
    } else {
        checks.hasCliches = false;
    }

    return {
        score: Math.max(0, score),
        checks,
        feedback,
    };
}

export function validateGeneral(submission: string, config: ValidationConfig = {}): ValidationResult {
    const text = submission.trim();
    const wordCount = text ? text.split(/\s+/).length : 0;
    const sentenceCount = (text.match(/[.!?]/g) || []).length;

    const minWords = config.minWords ?? 25;
    const recommendedMinWords = config.recommendedMinWords ?? Math.max(45, (config.minWords ?? 0) + 5);
    const minSentences = config.minSentences ?? 2;
    const minChars = config.minChars ?? 0;

    const feedback: string[] = [];
    let score = 100;

    if (minChars > 0 && text.length < minChars) {
        feedback.push(`Too short; add more detail (at least ${minChars} characters).`);
        score = Math.min(score, 30);
    }

    if (wordCount < minWords) {
        feedback.push(`Too short; aim for at least ${minWords} words so we can evaluate your reasoning.`);
        score = Math.min(score, 25);
    } else if (wordCount < recommendedMinWords) {
        feedback.push(`Add more depth (aim for ~${recommendedMinWords} words) to cover the key points.`);
        score -= 15;
    }

    if (sentenceCount < minSentences) {
        feedback.push(`Provide at least ${minSentences} sentences (e.g., set up the issue + your recommendation).`);
        score -= 20;
    }

    return {
        score: Math.max(0, score),
        checks: {
            lengthOK: wordCount >= minWords,
            hasStructure: sentenceCount >= minSentences,
            meetsCharFloor: minChars === 0 || text.length >= minChars,
        },
        feedback
    };
}

export function validateCultureAddNote(submission: string): ValidationResult {
    const text = submission.trim();
    const wordCount = text ? text.split(/\s+/).length : 0;

    const checks: Record<string, boolean> = {
        hasEnoughDetail: wordCount >= 60,
        hasStructure: (text.match(/[.!?]/g) || []).length >= 2,
        callsOutRisk: /(danger|risk|bias|groupthink|homogen|exclusion)/i.test(text),
        explainsValue: /(value|benefit|strength|adds?\s+value|complement|diversity)/i.test(text),
        referencesCandidate: /(candidate|they|their|this person)/i.test(text),
    };

    const feedback: string[] = [];
    let score = 100;

    if (!checks.hasEnoughDetail) {
        feedback.push('Too short; aim for ~60-150 words with a clear argument.');
        score -= 60;
    }
    if (!checks.hasStructure) {
        feedback.push('Provide at least two sentences (risk + value) instead of a fragment.');
        score -= 15;
    }
    if (!checks.callsOutRisk) {
        feedback.push('Call out why over-indexing on "culture fit" is risky (bias, groupthink, sameness).');
        score -= 25;
    }
    if (!checks.explainsValue) {
        feedback.push('Explain the specific value this candidate adds to the team (skills, balance, outcomes).');
        score -= 20;
    }
    if (!checks.referencesCandidate) {
        feedback.push('Refer directly to the candidate and their strengths, not just abstract ideas.');
        score -= 10;
    }

    return {
        score: Math.max(0, score),
        checks,
        feedback,
    };
}

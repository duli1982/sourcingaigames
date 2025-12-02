import { compareTwoStrings } from 'string-similarity';
import { ValidationResult } from '../types';

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

export function validateGeneral(submission: string): ValidationResult {
    const wordCount = submission.trim().split(/\s+/).length;
    const feedback: string[] = [];
    let score = 100;

    if (wordCount < 5) {
        feedback.push('Submission is too short.');
        score = 20;
    }

    return {
        score,
        checks: { lengthOK: wordCount >= 5 },
        feedback
    };
}

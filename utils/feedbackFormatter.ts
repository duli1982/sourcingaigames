/**
 * Formats AI feedback text into structured HTML with proper styling
 * Handles code blocks, section headers, bullet points, and visual separators
 * while stripping any model-provided HTML.
 */

export function formatFeedback(feedbackText: string, score: number): string {
    const codeBlocks: string[] = [];
    const inlineCodes: string[] = [];

    // Capture fenced code blocks before escaping
    let html = feedbackText.replace(/```([\s\S]*?)```/g, (_, block) => {
        const index = codeBlocks.length;
        codeBlocks.push(block);
        return `__CODE_BLOCK_${index}__`;
    });

    // Capture inline code segments before escaping
    html = html.replace(/`([^`]+)`/g, (_, snippet) => {
        const index = inlineCodes.length;
        inlineCodes.push(snippet);
        return `__INLINE_CODE_${index}__`;
    });

    // Escape everything else up-front to neutralize arbitrary HTML
    html = escapeHtml(html);

    // Replace SCORE with styled header
    html = html.replace(
        /\*\*SCORE:\s*(\d+)\*\*/gi,
        `<div class="score-section">
            <div class="score-badge">
                <span class="score-label">Your Score</span>
                <span class="score-value">${score}/100</span>
            </div>
        </div>`
    );
    html = html.replace(
        /SCORE:\s*(\d+)/gi,
        `<div class="score-section">
            <div class="score-badge">
                <span class="score-label">Your Score</span>
                <span class="score-value">${score}/100</span>
            </div>
        </div>`
    );

    // Section headers with icons
    const sectionIcons: { [key: string]: string } = {
        'Analysis': 'dY"?',
        'Strengths': '�o.',
        'Areas for Improvement': 'dY'�',
        'Improved Search String': '�o"',
        'Why This Works Better': 'dYZ_',
        'Test plan': 'dY�',
        'Summary': 'dY"<'
    };

    for (const [section, icon] of Object.entries(sectionIcons)) {
        const regex = new RegExp(`\\*\\*${section}:?\\*\\*`, 'gi');
        html = html.replace(regex,
            `<div class="section-header">
                <span class="section-icon">${icon}</span>
                <span class="section-title">${section}</span>
            </div>`
        );
    }

    // Handle bold text (remaining ** patterns)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-cyan-300">$1</strong>');

    // Convert bullet points with proper indentation
    html = html.replace(/^[\-�?�]\s+(.+)$/gm, '<li class="bullet-item">$1</li>');
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="numbered-item">$1</li>');

    // Wrap consecutive <li> elements in lists
    html = html.replace(/(<li class="bullet-item">.*?<\/li>(?:\s*<li class="bullet-item">.*?<\/li>)*)/gs,
        '<ul class="bullet-list">$1</ul>');
    html = html.replace(/(<li class="numbered-item">.*?<\/li>(?:\s*<li class="numbered-item">.*?<\/li>)*)/gs,
        '<ol class="numbered-list">$1</ol>');

    // Convert newlines to breaks (but not inside pre/code blocks)
    html = html.replace(/\n/g, '<br />');

    // Add visual separators between major sections
    html = html.replace(/(<\/div>)(<div class="section-header">)/g, '$1<hr class="section-divider" />$2');

    // Restore sanitized inline code snippets
    inlineCodes.forEach((snippet, index) => {
        const token = new RegExp(`__INLINE_CODE_${index}__`, 'g');
        html = html.replace(token, `<code class="inline-code">${escapeHtml(snippet)}</code>`);
    });

    // Restore sanitized code blocks
    codeBlocks.forEach((block, index) => {
        const token = new RegExp(`__CODE_BLOCK_${index}__`, 'g');
        const trimmedCode = block.trim();
        html = html.replace(token, `<div class="code-block-wrapper">
            <div class="code-block-header">
                <span class="code-icon">dY'�</span>
                <span class="code-label">Code Example</span>
            </div>
            <pre class="code-block"><code>${escapeHtml(trimmedCode)}</code></pre>
        </div>`);
    });

    return html;
}

/**
 * Escapes HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (char) => map[char]);
}

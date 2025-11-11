/**
 * Formats AI feedback text into structured HTML with proper styling
 * Handles code blocks, section headers, bullet points, and visual separators
 */

export function formatFeedback(feedbackText: string, score: number): string {
    let html = feedbackText;

    // 1. Replace SCORE with styled header
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

    // 2. Handle code blocks with triple backticks
    html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
        const trimmedCode = code.trim();
        return `<div class="code-block-wrapper">
            <div class="code-block-header">
                <span class="code-icon">💻</span>
                <span class="code-label">Code Example</span>
            </div>
            <pre class="code-block"><code>${escapeHtml(trimmedCode)}</code></pre>
        </div>`;
    });

    // 3. Handle inline code with single backticks
    html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

    // 4. Section headers with icons
    const sectionIcons: { [key: string]: string } = {
        'Analysis': '🔍',
        'Strengths': '✅',
        'Areas for Improvement': '💡',
        'Improved Search String': '✨',
        'Why This Works Better': '🎯',
        'Test plan': '🧪',
        'Summary': '📋'
    };

    for (const [section, icon] of Object.entries(sectionIcons)) {
        // Match **Section:** or **Section**
        const regex = new RegExp(`\\*\\*${section}:?\\*\\*`, 'gi');
        html = html.replace(regex,
            `<div class="section-header">
                <span class="section-icon">${icon}</span>
                <span class="section-title">${section}</span>
            </div>`
        );
    }

    // 5. Handle bold text (remaining ** patterns)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-cyan-300">$1</strong>');

    // 6. Convert bullet points with proper indentation
    // Match lines starting with - or • or numbers like 1., 2.
    html = html.replace(/^[\-•]\s+(.+)$/gm, '<li class="bullet-item">$1</li>');
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="numbered-item">$1</li>');

    // 7. Wrap consecutive <li> elements in <ul> tags
    html = html.replace(/(<li class="bullet-item">.*?<\/li>(?:\s*<li class="bullet-item">.*?<\/li>)*)/gs,
        '<ul class="bullet-list">$1</ul>');
    html = html.replace(/(<li class="numbered-item">.*?<\/li>(?:\s*<li class="numbered-item">.*?<\/li>)*)/gs,
        '<ol class="numbered-list">$1</ol>');

    // 8. Convert newlines to breaks (but not inside pre/code blocks)
    html = html.replace(/\n/g, '<br />');

    // 9. Add visual separators between major sections
    html = html.replace(/(<\/div>)(<div class="section-header">)/g, '$1<hr class="section-divider" />$2');

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

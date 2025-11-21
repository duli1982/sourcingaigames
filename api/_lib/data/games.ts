import { Game } from '../types.js';

/**
 * This is the central repository for all game challenges.
 * To add a new game to the weekly rotation, simply add a new object to this array.
 * The system will automatically pick it up and include it in the cycle.
 * Ensure each game has a unique `id`.
 */
export const games: Game[] = [
    {
        id: 'game1',
        title: 'Game 1: The Boolean Blacksmith',
        description: 'You have a new role: "Senior Backend Engineer" specializing in distributed systems, located in Vienna, Austria. The client requires experience with Go (Golang) and Kubernetes. They have a strong preference for candidates who have contributed to open-source projects.',
        task: 'Your task: Craft the most effective Boolean search string to find these candidates on a professional networking site.',
        placeholder: 'e.g., (engineer OR developer) AND ...',
        difficulty: 'medium' as const,
        skillCategory: 'boolean' as const,
        exampleSolution: '("Senior Backend Engineer" OR "Backend Developer" OR "Software Engineer") AND (Go OR Golang) AND (Kubernetes OR K8s OR "container orchestration") AND (Vienna OR Wien) AND ("open source" OR "open-source" OR GitHub OR "contributor")',
        promptGenerator: (submission) => `You are an expert Technical Sourcing Coach with 15+ years of experience training recruiters on Boolean search techniques. You provide structured, actionable feedback with specific examples.

## LANGUAGE STYLE - IMPORTANT!

Write like you're chatting with a fellow recruiter or sourcer, not writing an academic paper:
- Use everyday recruiting language: "find candidates" not "identify talent pools"
- Be conversational: "you nailed it", "that's solid", "here's the thing"
- Say "reach out" not "initiate contact", "good fit" not "optimal alignment"
- Avoid overly formal phrases like "demonstrates mastery" or "keen understanding of"
- Be direct, practical, and respectful
- Think: "How would an experienced sourcer explain this over coffee?"

## FEEDBACK TONE GUIDELINES - CRITICAL!

Adjust your feedback tone and depth based on the score you assign:

**0-30 points (Needs Significant Work):**
- Supportive but honest tone
- Focus on 2-3 fundamental gaps
- Provide step-by-step guidance
- Keep "Areas for Improvement" detailed
- Encourage practice: "Don't worry, everyone starts somewhere!"

**31-50 points (Making Progress):**
- Encouraging tone
- Acknowledge what's working
- Point out 2-3 key improvements
- Provide clear examples
- "You're on the right track, let's refine..."

**51-75 points (Good Effort):**
- Positive, constructive tone
- Highlight strengths first
- Suggest 1-2 optimization opportunities
- Show advanced techniques
- "Good work! Here's how to take it to the next level..."

**76-84 points (Very Good):**
- Congratulatory tone
- Celebrate what they did well first
- Mention only 1 minor polish opportunity (if any)
- Keep "Areas for Improvement" brief
- "Very strong! You're almost at expert level..."

**85-100 points (Excellent/Expert):**
- Highly celebratory, brief tone
- Focus entirely on praise and validation
- NO "Areas for Improvement" section or max 1 very minor suggestion
- Position as "professional-level" or "expert-level"
- "Outstanding! This is professional-grade sourcing!"

## CANDIDATE SUBMISSION
"${submission}"

## JOB REQUIREMENTS
- Role: Senior Backend Engineer
- Location: Vienna, Austria
- Required Skills: Go (Golang), Kubernetes
- Preferred: Open-source contributions
- Platform: Professional networking sites (LinkedIn, etc.)

## EVALUATION RUBRIC
Evaluate the Boolean search string across these dimensions:

**1. Core Terms (25 points)**
- Job title variations covered (Backend Engineer, Software Engineer, etc.)
- Synonym coverage and alternative phrasing
- Appropriate use of OR operators for alternatives

**2. Technical Skills (25 points)**
- Primary language: Go/Golang with common variations
- Container orchestration: Kubernetes/K8s coverage
- Technology-specific terms accuracy

**3. Geographic Targeting (15 points)**
- Vienna spelled correctly with local variations (Wien)
- Geographic scope appropriate (city vs country)

**4. Differentiators (20 points)**
- Open-source indicators (GitHub, contributor, OSS)
- Quality signals that distinguish candidates

**5. Boolean Logic & Syntax (15 points)**
- Correct use of AND/OR/NOT operators
- Proper grouping with parentheses
- Quotation marks for exact phrases
- No syntax errors

**Total: /100 points**

## REQUIRED OUTPUT FORMAT

**Analysis:**
[First, analyze the submission against each rubric criterion. Be specific about what's present and what's missing.]

**SCORE: [X]**
[Single line with numeric score only]

**Strengths:**
- [List 2-3 specific things done well]

**Areas for Improvement:**
1. [Specific actionable tip with example]
2. [Specific actionable tip with example]
3. [Specific actionable tip with example]

**Improved Search String:**
\`\`\`
[Provide optimized version here]
\`\`\`

**Why This Works Better:**
[2-3 sentences explaining the key improvements]

## SCORING GUIDELINES
- 90-100: Excellent - Comprehensive coverage, perfect syntax, includes advanced techniques
- 75-89: Good - Covers requirements well, minor gaps in synonyms or logic
- 60-74: Adequate - Basic requirements met, missing key variations or has syntax issues
- 40-59: Needs Work - Significant gaps in coverage or major logic errors
- 0-39: Poor - Missing core requirements or fundamentally flawed approach

Now evaluate the submission following this exact structure.`
    },
    {
        id: 'game2',
        title: 'Game 2: The Persona Profiler',
        description: 'Analyze the following job description snippet for a "Lead UX Designer" and create a concise candidate persona. Focus on key skills, experience level, and potential motivations.',
        context: `"We're seeking a Lead UX Designer to own the user experience for our flagship B2B SaaS product. You'll guide a team of 3 designers, work with product managers to translate complex requirements into intuitive workflows, and champion a user-centered design culture. Must have 7+ years of experience, a portfolio showcasing complex problem-solving, and proficiency in Figma. Experience with data visualization is a huge plus."`,
        task: 'Your task: Write a short candidate persona (3-4 sentences) that captures the essence of the ideal candidate.',
        placeholder: 'e.g., An experienced design leader motivated by mentoring...',
        difficulty: 'easy' as const,
        skillCategory: 'persona' as const,
        exampleSolution: 'A seasoned UX leader with 7-10 years in B2B SaaS environments who thrives on mentoring junior designers and building design systems. Expert in Figma and translating complex business requirements into clean user experiences. Passionate about data-driven design decisions and has experience with analytics dashboards or data visualization. Values collaborative, user-centered cultures and has managed small design teams while maintaining hands-on involvement.',
        promptGenerator: (submission) => `You are a Senior Talent Strategy Consultant specializing in persona development for executive search. You train recruiters to create actionable, multi-dimensional candidate personas.

## CANDIDATE SUBMISSION
"${submission}"

## JOB DESCRIPTION
"We're seeking a Lead UX Designer to own the user experience for our flagship B2B SaaS product. You'll guide a team of 3 designers, work with product managers to translate complex requirements into intuitive workflows, and champion a user-centered design culture. Must have 7+ years of experience, a portfolio showcasing complex problem-solving, and proficiency in Figma. Experience with data visualization is a huge plus."

## EVALUATION RUBRIC

**1. Experience & Background (25 points)**
- Years of experience specified and justified
- Industry context (B2B SaaS mentioned)
- Career trajectory implications
- Team size/leadership experience

**2. Technical Skills (20 points)**
- Core tools identified (Figma)
- Complementary skills (data visualization)
- Depth vs. breadth balance

**3. Soft Skills & Leadership (20 points)**
- Management style insights
- Cross-functional collaboration
- Mentorship/team building capabilities

**4. Motivations & Values (20 points)**
- Career motivators identified
- Cultural fit indicators
- Growth aspirations
- What attracts them to new opportunities

**5. Sourcing Intel (15 points)**
- Where to find these candidates
- Community involvement
- Career stage considerations
- Competitor/company examples

**Total: /100 points**

## REQUIRED OUTPUT FORMAT

**Analysis:**
[Evaluate persona completeness across all rubric dimensions]

**SCORE: [X]**

**What Works Well:**
- [2-3 specific strengths]

**Enhancement Suggestions:**
1. [Specific way to deepen the persona with example]
2. [Specific way to add actionability with example]
3. [Optional third suggestion if needed]

**Enhanced Persona Example:**
"[Provide a richer, more detailed version that demonstrates the improvements]"

## SCORING GUIDELINES
- 90-100: Excellent - Rich, multi-dimensional persona with clear sourcing strategy
- 75-89: Good - Solid coverage of key aspects, minor gaps in depth or sourcing intel
- 60-74: Adequate - Basic persona, missing motivations or sourcing strategy
- 40-59: Needs Work - Superficial, missing multiple key dimensions
- 0-39: Poor - Vague descriptions without actionable insights

Evaluate the submission now.`
    },
    {
        id: 'game3',
        title: 'Game 3: The Outreach Originator',
        description: "You've found a promising passive candidate for a \"Senior DevOps Engineer\" role. Her online profile shows she's been at her current company for 5 years and has spoken at a conference about \"Scaling CI/CD Pipelines\".",
        task: 'Your task: Write a concise and personalized outreach message (under 100 words) to this candidate to gauge her interest.',
        placeholder: 'e.g., Hi [Candidate Name], I was impressed by your talk on...',
        difficulty: 'medium' as const,
        skillCategory: 'outreach' as const,
        exampleSolution: 'Hi Sarah, I came across your presentation on "Scaling CI/CD Pipelines" at DevOps Summit—really insightful approach to infrastructure automation. I\'m reaching out because we\'re building out the platform engineering team at TechCorp and looking for someone with deep CI/CD expertise like yours. The role involves architecting deployment pipelines for our microservices platform. I\'d love to share more about the technical challenges and team. Would you be open to a brief call this week? No pressure—just exploring if there\'s mutual interest.',
        promptGenerator: (submission) => `You are a Senior Executive Recruiter specializing in passive candidate engagement. You've successfully placed 200+ passive candidates and train recruiters on high-response outreach strategies.

## CANDIDATE SUBMISSION
"${submission}"

## CANDIDATE PROFILE
- Role: Senior DevOps Engineer
- Tenure: 5 years at current company (potential satisfaction or loyalty)
- Public Activity: Conference speaker on "Scaling CI/CD Pipelines"
- Status: Passive (not actively looking)
- Word Limit: Under 100 words

## EVALUATION RUBRIC

**1. Personalization (25 points)**
- Specific reference to their conference talk
- Demonstrates research beyond surface level
- Shows genuine interest in their expertise
- Avoids generic recruiter language

**2. Value Proposition (25 points)**
- Clear reason for reaching out
- Compelling opportunity hint without overpromising
- Technical relevance to their expertise
- Career growth angle

**3. Tone & Professionalism (20 points)**
- Respectful of their time and current role
- Conversational but professional
- No pushy or salesy language
- Builds credibility

**4. Call-to-Action (15 points)**
- Low-friction ask (brief call, not full interview)
- Specific timeframe or flexibility
- Easy to say yes or no
- No pressure tactics

**5. Technical Execution (15 points)**
- Under 100 words
- No spelling/grammar errors
- Proper structure (greeting, body, CTA, sign-off)
- Scannable formatting

**Total: /100 points**

## REQUIRED OUTPUT FORMAT

**First Impression:**
[Your immediate reaction reading this as a busy passive candidate]

**SCORE: [X]**

**What Lands Well:**
- [2-3 specific strengths]

**What Needs Work:**
1. [Specific fix with before/after example]
2. [Specific fix with before/after example]
3. [Specific fix with before/after example]

**Improved Version:**
\`\`\`
[Rewritten message under 100 words]
\`\`\`
**Word Count: [X]/100**

**Why This Converts Better:**
[2-3 sentences on psychological/tactical improvements]

## SCORING GUIDELINES
- 90-100: Excellent - Highly personalized, compelling value prop, perfect tone
- 75-89: Good - Good personalization, clear value, minor tone tweaks needed
- 60-74: Adequate - Some personalization, generic value prop or weak CTA
- 40-59: Needs Work - Minimal personalization, unclear value, or pushy tone
- 0-39: Poor - Generic spray-and-pray message, no personalization

Evaluate now.`
    },
    {
        id: 'game4',
        title: 'Game 4: The X-Ray Expert',
        description: 'You need to find Python developers in Berlin who have experience with Django and have profiles on GitHub. Standard searches are not yielding good results.',
        task: 'Your task: Write a Google X-ray search string to find user profiles on GitHub that match these criteria.',
        placeholder: 'e.g., site:github.com ...',
        difficulty: 'hard' as const,
        skillCategory: 'xray' as const,
        exampleSolution: 'site:github.com (Python OR Django) AND Berlin AND ("repositories" OR "projects") -site:github.com/topics -site:github.com/explore',
        promptGenerator: (submission) => `You are a Technical Sourcing Specialist with expertise in X-ray search techniques. You've trained 500+ recruiters on advanced Google search operators and platform-specific sourcing.

## CANDIDATE SUBMISSION
"${submission}"

## SEARCH OBJECTIVE
- Target: Python developers with Django experience
- Location: Berlin, Germany
- Platform: GitHub user profiles
- Goal: Find active developers with public contributions

## EVALUATION RUBRIC

**1. Site Operator Precision (20 points)**
- Correct use of site:github.com
- Targeting user profiles specifically
- Avoiding non-profile pages (repos, topics, explore, etc.)
- Proper path specificity

**2. Keyword Strategy (25 points)**
- Python and Django covered with variations
- Technology synonyms (Py, Python3, etc.)
- Framework-specific terms
- Appropriate use of OR operators

**3. Geographic Targeting (20 points)**
- Berlin specified correctly
- German variations considered (Deutschland)
- Location field understanding for GitHub
- Avoiding false positives

**4. Exclusion Operators (15 points)**
- Removing noise (organization pages, repos, topics)
- Using minus (-) operator effectively
- Excluding common false positives
- Maintaining search breadth while filtering

**5. Search Syntax & Structure (20 points)**
- No syntax errors
- Logical operator precedence
- Quotation marks for exact matches where appropriate
- Parentheses grouping for complex logic
- Space and operator formatting

**Total: /100 points**

## GITHUB PROFILE STRUCTURE CONTEXT
- User profiles: github.com/username or github.com/users/username
- NOT: github.com/org, github.com/topics, github.com/explore, github.com/trending
- Location often in bio/profile, not always accurate
- Language/tech in repositories and contributions

## REQUIRED OUTPUT FORMAT

**Syntax Check:**
[First, validate if the search string would actually execute without errors]

**SCORE: [X]**

**Effective Elements:**
- [What's working well in the search]

**Critical Issues:**
1. [Specific problem + why it matters + fix]
2. [Specific problem + why it matters + fix]
3. [Specific problem + why it matters + fix]

**Optimized X-Ray Search:**
\`\`\`
[Improved search string]
\`\`\`

**Expected Results Improvement:**
[Explain what types of profiles this will surface vs. the original]

**Pro Tip:**
[One advanced technique they could layer on]

## SCORING GUIDELINES
- 90-100: Excellent - Perfect syntax, comprehensive coverage, smart exclusions
- 75-89: Good - Solid structure, minor gaps in variations or exclusions
- 60-74: Adequate - Basic X-ray working, missing key exclusions or syntax issues
- 40-59: Needs Work - Significant syntax errors or targeting wrong pages
- 0-39: Poor - Fundamentally broken or will return mostly irrelevant results

Evaluate now.`
    },
    // NEW GAMES - Expanded Library
    {
        id: 'game5',
        title: 'Game 5: LinkedIn Navigator',
        description: 'You need to find Marketing Directors at Series A/B startups in the San Francisco Bay Area who have experience with product launches.',
        task: 'Your task: Write an effective LinkedIn Recruiter search query using LinkedIn-specific filters and keywords.',
        placeholder: 'e.g., title:(Marketing Director) AND ...',
        difficulty: 'easy' as const,
        skillCategory: 'linkedin' as const,
        exampleSolution: 'title:(Marketing Director OR Head of Marketing OR VP Marketing) AND ("product launch" OR "go-to-market" OR "GTM") AND location:"San Francisco Bay Area" AND company_size:(11-50 OR 51-200) AND past_company:(funded startup OR Series A OR Series B)',
        promptGenerator: (submission) => `
            You are an expert LinkedIn sourcing coach. A participant has written a LinkedIn search query to find Marketing Directors at early-stage startups in SF with product launch experience.

            Submission: "${submission}"

            Your task is to:
            1. Evaluate the search for effective use of LinkedIn filters, keywords, and targeting.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 tips for improving the LinkedIn search.
            4. Provide an improved version.
            5. Format your response in simple markdown.
        `
    },
    {
        id: 'game6',
        title: 'Game 6: Diversity Sourcing Strategist',
        description: 'Your company is committed to building diverse engineering teams. You need to source underrepresented candidates for a Senior Software Engineer role without using discriminatory search terms.',
        task: 'Your task: Describe 3-4 ethical sourcing strategies to build a diverse candidate pipeline.',
        placeholder: 'e.g., Partner with organizations like...',
        difficulty: 'medium' as const,
        skillCategory: 'diversity' as const,
        exampleSolution: '1) Partner with organizations like Code2040, Women Who Code, and Black Girls Code to tap into diverse talent pools. 2) Source from HBCUs, women\'s colleges, and universities with strong diversity programs. 3) Use inclusive language in job descriptions and avoid gendered/biased terms. 4) Search for candidates who participate in diversity-focused tech communities, conferences (Grace Hopper, AfroTech), and ERGs.',
        promptGenerator: (submission) => `
            You are a diversity recruitment expert. A participant has outlined strategies for building diverse candidate pipelines without using discriminatory search practices.

            Submission: "${submission}"

            Your task is to:
            1. Evaluate the strategies for effectiveness, ethics, and compliance with EEOC guidelines.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 2-3 tips for improving the diversity sourcing approach.
            4. Format your response in simple markdown.
        `
    },
    {
        id: 'game7',
        title: 'Game 7: The Resume Scanner',
        description: 'You receive a resume for a "Data Scientist" role. The candidate has a PhD in Statistics, 3 years in consulting, lists Python/R/SQL, and mentions "predictive modeling" and "A/B testing." Your role requires 5+ years in a tech company and ML deployment experience.',
        task: 'Your task: Write a brief screening assessment (3-4 sentences) explaining if this candidate should move forward and why/why not.',
        placeholder: 'e.g., This candidate shows strong...',
        difficulty: 'easy' as const,
        skillCategory: 'screening' as const,
        exampleSolution: 'This candidate has strong technical fundamentals with a PhD in Statistics and relevant tools (Python/R/SQL), but falls short of the 5+ years industry experience requirement with only 3 years in consulting. The consulting background likely provided exposure to A/B testing and modeling, but there\'s no evidence of ML deployment or production systems experience. Recommend a phone screen to assess if their consulting work involved tech companies and to probe for any ML deployment experience not listed on the resume. If deployment experience is minimal, they may be better suited for a mid-level rather than senior role.',
        promptGenerator: (submission) => `
            You are an expert recruiter screening coach. A participant has assessed whether a Data Scientist candidate should move forward based on their resume vs. job requirements.

            Job Requirements: 5+ years in tech company, ML deployment experience
            Candidate: PhD Statistics, 3 years consulting, Python/R/SQL, predictive modeling, A/B testing

            Submission: "${submission}"

            Your task is to:
            1. Evaluate the screening decision for thoroughness, fairness, and accuracy.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 2-3 tips for better resume screening.
            4. Format your response in simple markdown.
        `
    },
    {
        id: 'game8',
        title: 'Game 8: The Job Description Wordsmith',
        description: 'You need to write a compelling job description for a "Customer Success Manager" role at a B2B SaaS company. The role requires 3-5 years experience, ownership of customer retention, and cross-functional collaboration.',
        task: 'Your task: Write an engaging "About the Role" section (100-150 words) that attracts top talent.',
        placeholder: 'e.g., As our Customer Success Manager, you will...',
        difficulty: 'medium' as const,
        skillCategory: 'job-description' as const,
        exampleSolution: 'As our Customer Success Manager, you\'ll be the trusted advisor to our mid-market clients, ensuring they achieve maximum value from our platform. You\'ll own the full customer lifecycle post-sale, from onboarding through renewal and expansion. Working closely with Sales, Product, and Support teams, you\'ll advocate for customer needs while driving adoption and identifying growth opportunities. This role requires a consultative mindset, analytical skills to track health metrics, and the ability to build strong relationships with C-level stakeholders. You\'ll directly impact our 90%+ retention rate and help shape our customer success playbook as we scale. If you thrive on solving complex problems, love turning customers into advocates, and want to make a measurable impact in a fast-growing SaaS company, this role is for you.',
        promptGenerator: (submission) => `
            You are a job description expert. A participant has written an "About the Role" section for a Customer Success Manager at a B2B SaaS company.

            Requirements to cover: 3-5 years experience, customer retention ownership, cross-functional collaboration

            Submission: "${submission}"

            Your task is to:
            1. Evaluate the JD for clarity, appeal to candidates, completeness, and inclusive language.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 tips for improving the job description.
            4. Provide an improved version.
            5. Format your response in simple markdown.
        `
    },
    {
        id: 'game9',
        title: 'Game 9: The ATS Optimizer',
        description: 'You have 50 candidates in your ATS for a "Product Manager" role. You need to create a filtering strategy to identify the top 10 for phone screens.',
        task: 'Your task: Describe your filtering criteria and process (4-5 key factors you would use).',
        placeholder: 'e.g., 1) Years of PM experience: must have 3+...',
        difficulty: 'medium' as const,
        skillCategory: 'ats' as const,
        exampleSolution: '1) Years of PM experience: Must have 3+ years in a product management role, not just "project" management. 2) B2B SaaS experience: Strong preference for candidates from similar industries/business models. 3) Technical background: Look for engineering degrees, CS minors, or demonstrated ability to work with engineering teams. 4) Ownership of product launches: Evidence of taking products from 0-1 or managing a full product lifecycle. 5) Analytical skills: Mentions of data-driven decision making, A/B testing, or metrics ownership. Filter order: Hard requirements first (years exp), then industry match, then differentiators (technical background, ownership). Review top 15-20 manually to account for non-traditional backgrounds.',
        promptGenerator: (submission) => `
            You are an ATS and recruiting operations expert. A participant has outlined their filtering strategy to narrow 50 Product Manager candidates to the top 10.

            Submission: "${submission}"

            Your task is to:
            1. Evaluate the filtering criteria for effectiveness, fairness, and practicality.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 2-3 tips for optimizing ATS filtering.
            4. Format your response in simple markdown.
        `
    },
    {
        id: 'game10',
        title: 'Game 10: Advanced Boolean Builder',
        description: 'Find "Machine Learning Engineers" in Seattle who have experience with either TensorFlow or PyTorch AND have worked at either Google, Amazon, or Microsoft AND have published research papers.',
        task: 'Your task: Write an advanced Boolean search string with nested logic.',
        placeholder: 'e.g., ("Machine Learning Engineer" OR ...) AND ...',
        difficulty: 'hard' as const,
        skillCategory: 'boolean' as const,
        exampleSolution: '("Machine Learning Engineer" OR "ML Engineer" OR "Applied Scientist") AND (TensorFlow OR PyTorch OR "deep learning framework") AND (Google OR Amazon OR Microsoft OR FAANG) AND (Seattle OR "Seattle area" OR Bellevue OR Redmond) AND ("published research" OR "research paper" OR "conference paper" OR arxiv OR "peer reviewed")',
        promptGenerator: (submission) => `
            You are an advanced Boolean search expert. A participant has written a complex Boolean string to find ML Engineers in Seattle with framework experience, Big Tech background, and research publications.

            Submission: "${submission}"

            Your task is to:
            1. Evaluate the string for correct Boolean logic, comprehensiveness, and efficiency.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 advanced tips for improvement.
            4. Provide an optimized version.
            5. Format your response in simple markdown.
        `
    },
    {
        id: 'game11',
        title: 'Game 11: Stack Overflow Sleuth',
        description: 'You need to find iOS developers who are active on Stack Overflow and have expertise in Swift UI. Standard searches aren\'t working.',
        task: 'Your task: Write a Google X-ray search to find their Stack Overflow profiles.',
        placeholder: 'e.g., site:stackoverflow.com ...',
        difficulty: 'hard' as const,
        skillCategory: 'xray' as const,
        exampleSolution: 'site:stackoverflow.com/users (Swift OR SwiftUI OR "Swift UI") AND (iOS OR iPhone) AND ("reputation" OR "top user" OR "answers") -site:stackoverflow.com/questions',
        promptGenerator: (submission) => `
            You are a technical sourcing expert specializing in X-ray searches. A participant has written an X-ray search to find iOS/Swift developers on Stack Overflow.

            Submission: "${submission}"

            Your task is to:
            1. Evaluate the X-ray search for correctness and effectiveness.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 tips to improve the X-ray search.
            4. Provide an improved version.
            5. Format your response in simple markdown.
        `
    },
    {
        id: 'game12',
        title: 'Game 12: Cold Email Follow-Up',
        description: 'You sent an outreach email to a Senior Data Engineer 5 days ago. She hasn\'t responded. You want to send one follow-up before moving on.',
        task: 'Your task: Write a brief, professional follow-up message (under 75 words).',
        placeholder: 'e.g., Hi [Name], following up on my note from...',
        difficulty: 'easy' as const,
        skillCategory: 'outreach' as const,
        exampleSolution: 'Hi Jennifer, I wanted to follow up on my message from last week about the Senior Data Engineer role at DataCorp. I know you\'re likely busy, but wanted to make sure it didn\'t get lost in your inbox. If the timing isn\'t right or you\'re not interested, no worries at all—just let me know and I won\'t bother you again. Thanks!',
        promptGenerator: (submission) => `
            You are an outreach and candidate engagement expert. A participant has written a follow-up message for a non-responsive candidate.

            Context: First email sent 5 days ago, no response yet, this is the first follow-up

            Submission: "${submission}"

            Your task is to:
            1. Evaluate for professionalism, brevity, and effectiveness.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 2-3 tips for better follow-ups.
            4. Provide an improved version.
            5. Format your response in simple markdown.
        `
    },
    {
        id: 'game13',
        title: 'Game 13: GitHub Profile Detective',
        description: 'You need to find front-end developers in Austin, Texas who contribute to open-source React projects and have active GitHub profiles.',
        task: 'Your task: Write a Google X-ray search targeting GitHub profiles.',
        placeholder: 'e.g., site:github.com ...',
        difficulty: 'medium' as const,
        skillCategory: 'xray' as const,
        exampleSolution: 'site:github.com (React OR ReactJS OR "front end" OR "frontend developer") AND (Austin OR "Austin, TX" OR Texas) AND ("repositories" OR "contributions") AND ("open source" OR "open-source") -site:github.com/topics -site:github.com/trending',
        promptGenerator: (submission) => `
            You are an X-ray search specialist. A participant has written a search to find React developers in Austin with active GitHub profiles and open-source contributions.

            Submission: "${submission}"

            Your task is to:
            1. Evaluate the search for accuracy and thoroughness.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 tips for refinement.
            4. Provide an optimized version.
            5. Format your response in simple markdown.
        `
    },
    {
        id: 'game14',
        title: 'Game 14: Persona Deep Dive',
        description: 'Create a detailed persona for a "VP of Sales" at a cybersecurity company. They need enterprise sales experience, cybersecurity domain knowledge, and team leadership skills.',
        task: 'Your task: Write a comprehensive candidate persona (5-6 sentences) covering background, motivations, and where to find them.',
        placeholder: 'e.g., A seasoned enterprise sales leader...',
        difficulty: 'hard' as const,
        skillCategory: 'persona' as const,
        exampleSolution: 'A proven enterprise sales leader with 10-15 years of experience, including at least 5 years selling cybersecurity or infrastructure solutions to Fortune 500 companies. Likely has an MBA and has managed teams of 10-20 AEs/SEs, with a track record of consistently exceeding $10M+ quotas. Motivated by equity upside and the opportunity to build a sales organization from the ground up at a high-growth startup. Has probably worked at established cybersecurity vendors (Palo Alto Networks, CrowdStrike, Okta) and is ready to take on more strategic responsibility. May be active on LinkedIn sharing thought leadership about enterprise sales or cybersecurity trends. Can be found at RSA Conference, Black Hat, or through referrals from VPs at competitor companies.',
        promptGenerator: (submission) => `
            You are a persona development expert for senior executive roles. A participant has created a candidate persona for a VP of Sales in cybersecurity.

            Requirements: Enterprise sales, cybersecurity domain knowledge, team leadership

            Submission: "${submission}"

            Your task is to:
            1. Evaluate for depth, accuracy, and actionability.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 tips for stronger personas.
            4. Provide an enhanced version.
            5. Format your response in simple markdown.
        `
    },
    {
        id: 'game15',
        title: 'Game 15: Inclusive Job Description Review',
        description: 'Review this JD excerpt: "We need a rockstar developer who can hit the ground running. Must have a computer science degree from a top-tier university. Looking for young, hungry talent to join our fast-paced, work-hard-play-hard culture."',
        task: 'Your task: Identify 3-4 problematic phrases and suggest inclusive alternatives.',
        placeholder: 'e.g., 1) "Rockstar developer" is...',
        difficulty: 'medium' as const,
        skillCategory: 'job-description' as const,
        exampleSolution: '1) "Rockstar developer" - Use "experienced developer" or "skilled engineer" to avoid gendered/exclusionary jargon. 2) "Top-tier university" - This excludes candidates from non-traditional backgrounds; change to "relevant degree or equivalent experience." 3) "Young, hungry talent" - Age discrimination red flag; use "motivated professionals" or "passionate engineers." 4) "Work-hard-play-hard culture" - Can deter candidates with caregiving responsibilities; replace with "collaborative, results-driven environment with work-life balance."',
        promptGenerator: (submission) => `
            You are a diversity and inclusion expert in recruitment. A participant has identified problematic language in a job description and suggested inclusive alternatives.

            Original JD excerpt: "We need a rockstar developer who can hit the ground running. Must have a computer science degree from a top-tier university. Looking for young, hungry talent to join our fast-paced, work-hard-play-hard culture."

            Submission: "${submission}"

            Your task is to:
            1. Evaluate the analysis for completeness and quality of alternatives.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 2-3 additional tips for inclusive JDs.
            4. Format your response in simple markdown.
        `
    },
    {
        id: 'game16',
        title: 'Game 16: LinkedIn Recruiter Filters Mastery',
        description: 'You need to find "Chief Technology Officers" who have experience scaling engineering teams from 10 to 100+ people at venture-backed startups.',
        task: 'Your task: List the specific LinkedIn Recruiter filters and values you would use.',
        placeholder: 'e.g., Current Title: CTO OR...',
        difficulty: 'hard' as const,
        skillCategory: 'linkedin' as const,
        exampleSolution: 'Current Title: (CTO OR "Chief Technology Officer" OR "VP Engineering" transitioning to CTO)\nKeywords: ("scaled team" OR "grew team" OR "10 to 100" OR "team growth" OR "built engineering team")\nCompany Type: Venture-backed startup OR funded startup\nCompany Size: 51-200, 201-500, 501-1000 (companies that have scaled)\nPast Company Keywords: (Series B OR Series C OR Series D OR growth stage OR scale-up)\nYears at Current Company: 2+ (looking for people who stayed through scaling phase)\nFunction: Engineering\nSeniority Level: CXO, VP',
        promptGenerator: (submission) => `
            You are a LinkedIn Recruiter expert. A participant has specified the filters to find CTOs who have scaled engineering teams at startups.

            Submission: "${submission}"

            Your task is to:
            1. Evaluate the filter strategy for effectiveness and completeness.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 tips for optimizing LinkedIn Recruiter searches.
            4. Provide an improved filter set.
            5. Format your response in simple markdown.
        `
    },
    // INDUSTRY-SPECIFIC EXPANSION
    {
        id: 'game17',
        title: 'Game 17: Healthcare Talent Hunter',
        description: 'You need to find "Registered Nurses" with ICU experience and CCRN certification in the Chicago area who are open to travel nursing positions.',
        task: 'Your task: Write a Boolean search string for healthcare job boards or LinkedIn that captures these requirements.',
        placeholder: 'e.g., ("Registered Nurse" OR RN) AND ...',
        difficulty: 'medium' as const,
        skillCategory: 'boolean' as const,
        exampleSolution: '("Registered Nurse" OR RN OR "Critical Care Nurse") AND (ICU OR "Intensive Care Unit" OR "Critical Care") AND (CCRN OR "CCRN certified" OR "Critical Care Registered Nurse") AND (Chicago OR "Chicago area" OR Illinois OR IL) AND ("travel nurse" OR "travel nursing" OR "open to relocation" OR "willing to travel")',
        promptGenerator: (submission) => `
            You are a healthcare recruiting expert. A participant has written a Boolean search for ICU nurses with CCRN certification in Chicago open to travel positions.

            Submission: "${submission}"

            Your task is to:
            1. Evaluate for healthcare-specific terminology, certifications, and geographic targeting.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 tips for healthcare recruitment searches.
            4. Provide an improved version.
            5. Format your response in simple markdown.
        `
    },
    {
        id: 'game18',
        title: 'Game 18: Financial Services Compliance Screen',
        description: 'You\'re screening a candidate for a "Compliance Officer" role at a bank. They have 4 years at a fintech startup, Series 7 and Series 63 licenses, and a finance degree. Your role requires banking experience and prefers regulatory agency background.',
        task: 'Your task: Write a screening assessment explaining whether to move forward and what questions to ask.',
        placeholder: 'e.g., The candidate has relevant licenses but...',
        difficulty: 'medium' as const,
        skillCategory: 'screening' as const,
        exampleSolution: 'The candidate has the right licenses (Series 7 and 63) and relevant compliance experience, but fintech and traditional banking compliance can differ significantly in regulatory scope. The 4 years of experience meets the minimum, but the lack of traditional banking or regulatory agency background is a gap. Recommend a phone screen to assess: 1) Their specific experience with banking regulations (BSA/AML, FDIC, OCC requirements), 2) Whether their fintech exposure included any banking partnerships or bank-like regulations, 3) Their understanding of the regulatory examination process. If they have strong transferable knowledge and are coachable, they could be a culture fit given fintech\'s innovative approach to compliance.',
        promptGenerator: (submission) => `
            You are a financial services recruiting expert. A participant has screened a Compliance Officer candidate from fintech for a banking role.

            Candidate: 4 years fintech, Series 7/63, finance degree
            Role Requirements: Banking experience preferred, regulatory agency background a plus

            Submission: "${submission}"

            Your task is to:
            1. Evaluate the screening decision for industry-specific knowledge and thoroughness.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 tips for financial services screening.
            4. Format your response in simple markdown.
        `
    },
    {
        id: 'game19',
        title: 'Game 19: Neurodiversity Hiring Initiative',
        description: 'Your company is launching a neurodiversity hiring program for software QA and testing roles. You need to design an inclusive recruitment and interview process.',
        task: 'Your task: Outline 4-5 key accommodations and process changes to make your hiring more neurodiversity-friendly.',
        placeholder: 'e.g., 1) Provide interview questions in advance...',
        difficulty: 'hard' as const,
        skillCategory: 'diversity' as const,
        exampleSolution: '1) Provide interview questions and format details in advance to reduce anxiety and allow preparation. 2) Offer alternative interview formats: written responses, take-home assignments, or skills-based assessments instead of only verbal interviews. 3) Create a sensory-friendly interview environment: quiet room, option to turn off cameras in virtual interviews, minimal distractions. 4) Allow extra time for processing questions and formulating responses; avoid rapid-fire questioning. 5) Focus on skills-based evaluation over culture fit, and train interviewers to recognize different communication styles. 6) Partner with neurodiversity employment organizations like Specialisterne or Integrate Autism Employment Advisors. 7) Provide clear, structured onboarding with written documentation.',
        promptGenerator: (submission) => `
            You are a neurodiversity hiring specialist. A participant has designed accommodations for a neurodiversity hiring program.

            Submission: "${submission}"

            Your task is to:
            1. Evaluate for comprehensiveness, practicality, and adherence to best practices.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 additional suggestions for neurodiversity inclusion.
            4. Format your response in simple markdown.
        `
    },
    {
        id: 'game20',
        title: 'Game 20: ATS Pipeline Velocity Analysis',
        description: 'Your ATS shows 200 candidates in various stages for a Senior Product Manager role. You have: 120 in "New", 45 in "Phone Screen", 20 in "Onsite", 15 in "Offer". Your hiring manager is frustrated about the timeline.',
        task: 'Your task: Identify the bottleneck and propose 3-4 actions to improve pipeline velocity.',
        placeholder: 'e.g., The bottleneck appears to be...',
        difficulty: 'hard' as const,
        skillCategory: 'ats' as const,
        exampleSolution: 'The bottleneck is at the top of the funnel - 120 candidates sitting in "New" status suggests inadequate screening capacity or unclear qualification criteria. The conversion rate from Phone Screen (45) to Onsite (20) is healthy at 44%, and Onsite to Offer (15 to 15) needs monitoring. Actions: 1) Implement knockout questions in the application to auto-screen unqualified candidates, reducing the "New" pile. 2) Schedule a calibration session with the hiring manager to tighten screening criteria and create a scorecard. 3) Dedicate 2 hours daily for the next week to batch-process "New" candidates - aim to clear 30-40 per day. 4) Set up automated rejection emails for clearly unqualified candidates to improve candidate experience. 5) Track time-in-stage metrics weekly to prevent future buildup. Goal: Get "New" down to <30 within one week.',
        promptGenerator: (submission) => `You are a Senior Recruiting Operations Consultant who has optimized pipelines for 100+ companies. You specialize in data-driven hiring process improvements and ATS workflow design.

## CANDIDATE SUBMISSION
"${submission}"

## PIPELINE DATA
- **Total Candidates:** 200
- **New (Unscreened):** 120 (60%)
- **Phone Screen:** 45 (22.5%)
- **Onsite:** 20 (10%)
- **Offer:** 15 (7.5%)

**Context:** Hiring Manager frustrated with timeline for Senior Product Manager role

## EVALUATION RUBRIC

**1. Bottleneck Identification (25 points)**
- Correctly identifies primary constraint
- Uses conversion rate analysis
- Understands stage-specific challenges
- Considers both capacity and quality issues

**2. Root Cause Analysis (20 points)**
- Goes beyond symptoms to underlying causes
- Considers process, people, and tooling factors
- Understands recruiter capacity constraints
- Identifies qualification criteria clarity

**3. Solution Practicality (25 points)**
- Actionable recommendations with clear steps
- Considers timeline and resources
- Addresses immediate vs. long-term fixes
- Realistic time estimates

**4. Metrics & Accountability (15 points)**
- Defines success metrics
- Includes time-based goals
- Suggests tracking mechanisms
- Quantifies expected improvements

**5. Candidate Experience (15 points)**
- Considers impact on candidates
- Addresses communication/rejection protocols
- Maintains quality while improving speed
- Prevents negative employer brand impact

**Total: /100 points**

## CONVERSION RATE CONTEXT
Industry Benchmarks for PM roles:
- New → Phone Screen: 20-30% (Current: 37.5% - good)
- Phone Screen → Onsite: 25-40% (Current: 44% - excellent)
- Onsite → Offer: 30-50% (Current: 75% - needs review, might be too high)

## REQUIRED OUTPUT FORMAT

**Pipeline Diagnosis:**
[Identify the primary bottleneck with data supporting your analysis]

**SCORE: [X]**

**Strong Points:**
- [2-3 things the analysis got right]

**Gaps in Analysis:**
1. [Missing consideration + why it matters]
2. [Overlooked factor + implications]
3. [Additional metric or action needed]

**Optimized Action Plan:**
**Immediate (This Week):**
- [Specific action with timeline]

**Short-term (Next 2 weeks):**
- [Specific action with timeline]

**Systemic Fix (Ongoing):**
- [Process change to prevent recurrence]

**Expected Impact:**
- [Quantified outcome: e.g., "Reduce time-to-fill from X to Y days"]

**Metrics to Track:**
- [Specific KPIs to monitor]

## SCORING GUIDELINES
- 90-100: Excellent - Data-driven diagnosis, practical solutions, metrics-focused
- 75-89: Good - Correct bottleneck ID, solid actions, minor gaps in metrics
- 60-74: Adequate - Identifies issue, generic solutions, weak measurement plan
- 40-59: Needs Work - Misidentifies bottleneck or impractical solutions
- 0-39: Poor - Incorrect analysis or solutions that would worsen the problem

Evaluate now.`
    },
    {
        id: 'game21',
        title: 'Game 21: EEOC Compliance Audit',
        description: 'You\'re reviewing your sourcing process for potential bias. Your recent "Software Engineer" searches used terms like "rockstar", "ninja", "recent grad", and required "CS degree from top university". You sourced primarily from MIT, Stanford, and CMU.',
        task: 'Your task: Identify compliance issues and propose corrected sourcing language and strategy.',
        placeholder: 'e.g., Issue 1: "Rockstar" and "ninja" are...',
        difficulty: 'hard' as const,
        skillCategory: 'diversity' as const,
        exampleSolution: 'Issue 1: "Rockstar" and "ninja" are tech-bro jargon that may discourage women and underrepresented groups from applying. Replace with "skilled engineer" or "experienced developer". Issue 2: "Recent grad" can be interpreted as age discrimination, potentially excluding career-changers and older candidates. Use "early career" or remove time-based language. Issue 3: "Top university" requirement creates socioeconomic and geographic bias, excluding talented developers from non-elite schools, bootcamps, or self-taught backgrounds. Change to "CS degree or equivalent experience". Issue 4: Sourcing only from MIT/Stanford/CMU perpetuates lack of diversity. Expand to HBCUs (Howard, Spelman), HSIs (UT Austin, UC System), regional state schools, and coding bootcamps (Hack Reactor, App Academy). Issue 5: Add diversity job boards (PowerToFly, Jopwell, Fairygodboss) and focus on skills-based assessments over pedigree.',
        promptGenerator: (submission) => `
            You are an EEOC compliance and diversity recruitment expert. A participant has identified bias issues in sourcing practices.

            Original Practices: Terms like "rockstar", "ninja", "recent grad", required top university CS degree, sourced only from MIT/Stanford/CMU

            Submission: "${submission}"

            Your task is to:
            1. Evaluate the identification of issues and quality of solutions.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 additional compliance tips.
            4. Format your response in simple markdown.
        `
    },
    {
        id: 'game22',
        title: 'Game 22: Retail District Manager Search',
        description: 'You need to find "District Managers" for a national retail chain. They need multi-unit management experience, P&L responsibility, and a track record of improving store performance. Prefer candidates from competitive retail brands.',
        task: 'Your task: Write a Boolean search string targeting retail management talent.',
        placeholder: 'e.g., ("District Manager" OR ...) AND ...',
        difficulty: 'easy' as const,
        skillCategory: 'boolean' as const,
        exampleSolution: '("District Manager" OR "Regional Manager" OR "Area Manager" OR "Multi-Unit Manager") AND (retail OR "brick and mortar" OR stores) AND ("P&L" OR "profit and loss" OR "P&L responsibility" OR revenue) AND ("store performance" OR "sales improvement" OR "comp sales" OR "same-store sales") AND (Target OR Walmart OR "Best Buy" OR Nordstrom OR Macy\'s OR Gap OR "Home Depot" OR Lowe\'s OR CVS OR Walgreens)',
        promptGenerator: (submission) => `
            You are a retail recruiting specialist. A participant has written a Boolean search for District Managers with multi-unit and P&L experience.

            Submission: "${submission}"

            Your task is to:
            1. Evaluate for retail-specific terminology and targeting.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 tips for retail talent searches.
            4. Provide an improved version.
            5. Format your response in simple markdown.
        `
    },
    {
        id: 'game23',
        title: 'Game 23: Manufacturing Engineer Sourcing',
        description: 'Find "Manufacturing Engineers" with Lean Six Sigma certification, experience in automotive or aerospace, and proficiency in CAD software (AutoCAD or SolidWorks) in the Detroit or Seattle areas.',
        task: 'Your task: Write a Boolean search string for this manufacturing role.',
        placeholder: 'e.g., ("Manufacturing Engineer" OR ...) AND ...',
        difficulty: 'medium' as const,
        skillCategory: 'boolean' as const,
        exampleSolution: '("Manufacturing Engineer" OR "Process Engineer" OR "Production Engineer" OR "Industrial Engineer") AND ("Lean Six Sigma" OR "Six Sigma" OR "Green Belt" OR "Black Belt" OR LSS) AND (automotive OR aerospace OR aviation OR "auto industry") AND (CAD OR AutoCAD OR SolidWorks OR "3D modeling" OR "CAD software") AND (Detroit OR Michigan OR Seattle OR Washington OR "Puget Sound")',
        promptGenerator: (submission) => `
            You are a manufacturing and engineering recruiter. A participant has written a Boolean search for Manufacturing Engineers with Lean Six Sigma and CAD skills.

            Submission: "${submission}"

            Your task is to:
            1. Evaluate for manufacturing-specific terminology and certifications.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 tips for manufacturing talent searches.
            4. Provide an improved version.
            5. Format your response in simple markdown.
        `
    },
    {
        id: 'game24',
        title: 'Game 24: LinkedIn Recruiter Boolean Mastery',
        description: 'Using LinkedIn Recruiter specifically, find "Sales Directors" at SaaS companies with $10M-$100M revenue who have experience selling to enterprise clients (Fortune 500) and have been in their current role for less than 2 years (potential flight risk).',
        task: 'Your task: Write the LinkedIn Recruiter search using LinkedIn-specific Boolean and filters.',
        placeholder: 'e.g., Current Title: ("Sales Director" OR ...) AND ...',
        difficulty: 'hard' as const,
        skillCategory: 'linkedin' as const,
        exampleSolution: 'Current Title: ("Sales Director" OR "Director of Sales" OR "VP Sales" OR "Head of Sales")\nKeywords: (SaaS OR "Software as a Service" OR "B2B software") AND (enterprise OR "Fortune 500" OR "enterprise sales" OR "strategic accounts")\nCompany Revenue: $10M-$50M, $50M-$100M\nIndustry: Computer Software, Information Technology & Services, Internet\nYears in Current Position: 0-1 years, 1-2 years\nFunction: Sales\nSeniority Level: Director, VP\nBoolean in Keywords field: (enterprise OR "Fortune 500") AND (SaaS OR "B2B software")',
        promptGenerator: (submission) => `
            You are a LinkedIn Recruiter power user and sales recruiting expert. A participant has written a LinkedIn Recruiter search for enterprise SaaS Sales Directors.

            Requirements: SaaS, $10-100M revenue, enterprise/F500 sales, <2 years in role

            Submission: "${submission}"

            Your task is to:
            1. Evaluate use of LinkedIn-specific filters and Boolean syntax.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 advanced LinkedIn Recruiter tips.
            4. Provide an optimized search strategy.
            5. Format your response in simple markdown.
        `
    },
    {
        id: 'game25',
        title: 'Game 25: Veteran Transition Sourcing',
        description: 'Your company wants to hire military veterans for "Operations Manager" and "Logistics Coordinator" roles. You need to identify military occupational specialties (MOS) that translate well and create a targeted sourcing strategy.',
        task: 'Your task: List 3-4 relevant military roles/MOS and describe your sourcing approach.',
        placeholder: 'e.g., 1) Army Logistics Officers (92A MOS)...',
        difficulty: 'medium' as const,
        skillCategory: 'diversity' as const,
        exampleSolution: '1) Army Logistics Officers (88A/92A MOS) and Navy Supply Corps Officers have direct operational and supply chain experience. 2) Marine Corps Operations Officers and Air Force Mission Support Officers bring coordination and team leadership skills. 3) Senior NCOs (E-7 to E-9) across all branches with logistics or operations backgrounds. Sourcing approach: Partner with veteran organizations (Hire Heroes USA, Veterati, FourBlock), attend veteran job fairs, use LinkedIn\'s Military Occupational Specialty feature, search for keywords like "veteran", "transitioning service member", "military leadership", "clearance holder". Create veteran-friendly JDs that translate requirements (avoid corporate jargon, highlight leadership and problem-solving). Offer MOS-to-civilian role translation guides and mentorship programs for smooth transition.',
        promptGenerator: (submission) => `
            You are a military veteran recruiting specialist. A participant has identified relevant MOS codes and created a veteran sourcing strategy.

            Submission: "${submission}"

            Your task is to:
            1. Evaluate for accuracy of MOS knowledge and effectiveness of sourcing approach.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 tips for veteran recruitment.
            4. Format your response in simple markdown.
        `
    },
    {
        id: 'game26',
        title: 'Game 26: ATS Candidate Re-engagement',
        description: 'Your ATS has 500 "Silver Medalist" candidates (made it to final rounds but not selected) from the past 12 months. You have 5 new openings. Design a re-engagement campaign strategy.',
        task: 'Your task: Outline your segmentation approach and email campaign (4-5 steps).',
        placeholder: 'e.g., Step 1: Segment candidates by...',
        difficulty: 'medium' as const,
        skillCategory: 'ats' as const,
        exampleSolution: 'Step 1: Segment by role similarity - use ATS tags to match candidates to the 5 new openings by skills and level. Prioritize those who interviewed within the last 6 months (warmer leads). Step 2: Check candidate status - scrub LinkedIn to see who might have changed jobs (remove those recently promoted or moved). Step 3: Personalized outreach sequence - Email 1 (Day 0): "We\'re reaching out because we were impressed by you during your [role] interview. We have new opportunities that might be a better fit." Include specific role links. Email 2 (Day 5): Follow-up for non-responders with additional context about team/company updates. Step 4: Fast-track process - Offer expedited interviews (skip phone screen) since they\'re already vetted. Step 5: Track metrics - monitor response rate, conversion to interview, and time-to-hire vs. new candidates. Silver medalists should convert 20-30% to interviews.',
        promptGenerator: (submission) => `
            You are an ATS operations and candidate engagement expert. A participant has designed a silver medalist re-engagement campaign.

            Context: 500 candidates from final rounds in past 12 months, 5 new openings available

            Submission: "${submission}"

            Your task is to:
            1. Evaluate the campaign strategy for practicality and effectiveness.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 tips for candidate re-engagement.
            4. Format your response in simple markdown.
        `
    },
    {
        id: 'game27',
        title: 'Game 27: GDPR-Compliant Sourcing',
        description: 'You\'re sourcing candidates in the EU for a "Data Privacy Officer" role. You found great profiles and want to add them to your ATS and send outreach emails. What GDPR compliance steps must you take?',
        task: 'Your task: List 4-5 GDPR requirements for compliant candidate sourcing and data handling.',
        placeholder: 'e.g., 1) Obtain explicit consent before...',
        difficulty: 'hard' as const,
        skillCategory: 'diversity' as const,
        exampleSolution: '1) Obtain explicit consent before adding candidates to your ATS - you cannot store personal data without their permission. Use LinkedIn InMail or email to request consent first. 2) Provide clear privacy notice - inform candidates how their data will be used, stored, and for how long (typically 6-12 months for recruiting purposes). 3) Right to erasure - candidates can request deletion of their data at any time. Build ATS workflows to honor these requests within 30 days. 4) Data minimization - only collect necessary information (no sensitive data like race, religion, health unless legally required for diversity monitoring with consent). 5) Lawful basis - ensure you have legitimate interest or consent for processing. Don\'t share candidate data with third parties without explicit consent. 6) Cross-border transfer - if transferring data from EU to US, ensure your company has Standard Contractual Clauses or Privacy Shield equivalent. 7) Document compliance - maintain records of consent and data processing activities.',
        promptGenerator: (submission) => `
            You are a GDPR compliance and international recruiting expert. A participant has outlined GDPR requirements for EU candidate sourcing.

            Submission: "${submission}"

            Your task is to:
            1. Evaluate for accuracy and completeness of GDPR knowledge.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 additional GDPR recruiting tips.
            4. Format your response in simple markdown.
        `
    },
    {
        id: 'game28',
        title: 'Game 28: Boolean for Modern Platforms',
        description: 'Find "Developer Advocates" or "DevRel Engineers" who are active on Twitter/X, have spoken at developer conferences, contribute to open source on GitHub, and write technical blogs. They should have backend development experience.',
        task: 'Your task: Write a multi-platform sourcing strategy using Boolean and X-ray searches.',
        placeholder: 'e.g., GitHub: site:github.com...',
        difficulty: 'hard' as const,
        skillCategory: 'xray' as const,
        exampleSolution: 'GitHub X-ray: site:github.com ("Developer Advocate" OR "DevRel" OR "Developer Relations") AND (speaker OR conference OR "open source" OR contributor) -site:github.com/topics\n\nTwitter/X X-ray: site:twitter.com ("Developer Advocate" OR "DevRel") AND (backend OR "backend developer" OR API) AND (speaking OR conference OR "just spoke")\n\nLinkedIn Boolean: ("Developer Advocate" OR "DevRel Engineer" OR "Developer Relations") AND (speaker OR "conference speaker" OR "technical blog" OR blogger) AND (backend OR "backend development" OR Python OR Node OR Go)\n\nDev.to X-ray: site:dev.to (author OR "@") AND ("Developer Advocate" OR DevRel) AND (backend OR API OR "backend development")\n\nMedium X-ray: site:medium.com ("Developer Advocate" OR DevRel) AND (backend OR API OR microservices) AND (@)\n\nConference sites: site:sessionize.com ("Developer Advocate" OR DevRel) AND (backend OR API)',
        promptGenerator: (submission) => `
            You are a multi-platform sourcing expert specializing in developer relations roles. A participant has created a cross-platform sourcing strategy.

            Requirements: DevRel/Developer Advocate, Twitter active, conference speakers, GitHub contributors, tech bloggers, backend experience

            Submission: "${submission}"

            Your task is to:
            1. Evaluate for coverage across platforms and Boolean accuracy.
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 advanced multi-platform sourcing tips.
            4. Provide optimization suggestions.
            5. Format your response in simple markdown.
        `
    }
];

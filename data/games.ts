import { Game } from '../types';

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
    },
    {
        id: 'game29',
        title: 'Game 29: The Gemini Prompt Engineer',
        description: 'You need to find "Senior Site Reliability Engineers" (SREs) in London who have experience with Terraform and AWS, but you want to exclude candidates from consulting firms. You want to use Gemini to generate the perfect Boolean string for you.',
        task: 'Your task: Write a prompt for Gemini that will generate a high-quality Boolean search string for this role. Be specific about your requirements.',
        placeholder: 'e.g., Act as a sourcing expert and write a Boolean string for...',
        difficulty: 'medium' as const,
        skillCategory: 'ai-prompting' as const,
        exampleSolution: 'Act as an expert technical sourcer. Write a Boolean search string for LinkedIn Recruiter to find Senior Site Reliability Engineers in London. Required skills: Terraform AND AWS. Exclude candidates currently working at consulting firms (like Accenture, Deloitte, KPMG, etc.). Please use standard Boolean operators (AND, OR, NOT) and group terms correctly with parentheses. Include common job title variations for SRE.',
        promptGenerator: (submission) => `
            You are a Prompt Engineering Instructor for Recruiters. A participant has written a prompt to ask an AI (like me) to generate a Boolean search string.

            Goal: Find Senior SREs in London, with Terraform + AWS, excluding consulting firms.

            Participant's Prompt: "${submission}"

            Your task is to:
            1. Evaluate the prompt's clarity, context, and constraints. Did they give the AI enough info to do a good job?
            2. Provide a score out of 100. The score MUST be on its own line like this: SCORE: [number].
            3. Give 3 tips for better prompting (e.g., assigning a persona, specifying output format, giving examples).
            4. Show what the AI would likely have produced based on their prompt vs. what a perfect prompt would produce.
            5. Format your response in simple markdown.
        `
    },
    // PHASE 1: Advanced Engagement & AI (Games 30-37)
    {
        id: 'game30',
        title: 'Game 30: The Resume Summarizer',
        description: 'You have a 5-page resume for a "Principal Architect" that is full of fluff. You need to send a 3-bullet summary to the Hiring Manager highlighting their Cloud Migration experience.',
        task: 'Your task: Write a prompt for an AI to extract and summarize the key Cloud Migration achievements from a long text.',
        placeholder: 'e.g., Act as a technical recruiter and summarize...',
        difficulty: 'easy' as const,
        skillCategory: 'ai-prompting' as const,
        exampleSolution: 'Act as a Senior Technical Recruiter. I will paste a resume below. Please extract the 3 most significant achievements related to "Cloud Migration" or "Digital Transformation". Format them as punchy bullet points that quantify the impact (cost savings, speed, scale). Ignore general responsibilities; focus on outcomes. Output ONLY the 3 bullets.',
        promptGenerator: (submission) => `
            You are an AI Efficiency Coach. A participant wants to use AI to summarize a resume.
            Submission: "${submission}"
            
            Evaluate:
            1. Did they specify the role (Principal Architect)?
            2. Did they ask for the specific output format (3 bullets)?
            3. Did they focus on the key skill (Cloud Migration)?
            
            SCORE: [number]
            
            Tips:
            1. Always specify "Output ONLY..." to avoid chatter.
            2. Ask for "quantifiable results" to get better bullets.
            3. Define the persona (Technical Recruiter) for better tone.
        `
    },
    {
        id: 'game31',
        title: 'Game 31: The Break-Up Email',
        description: 'You have reached out to a candidate 3 times with no response. You want to send one final "break-up" email to close the loop and potentially trigger a response (the "strip-line" technique).',
        task: 'Your task: Write a subject line and short email body (under 50 words) that politely withdraws the offer to chat.',
        placeholder: 'e.g., Subject: Permission to close your file?',
        difficulty: 'medium' as const,
        skillCategory: 'outreach' as const,
        exampleSolution: 'Subject: Permission to close your file?\n\nHi Alex, I haven\'t heard back, so I assume you\'re not interested in the Head of Engineering role right now. I\'m going to close your file for this search so I don\'t keep bothering you. If things change, let me know. Best, [Name]',
        promptGenerator: (submission) => `
            You are a Sales Psychology Expert. A participant is writing a "break-up" email.
            Submission: "${submission}"
            
            Evaluate:
            1. Is it truly a "take-away" (removing the offer)?
            2. Is it polite but firm?
            3. Is it short (under 50 words)?
            
            SCORE: [number]
            
            Tips:
            1. Use "Permission to close your file?" as a subject line - it has a high open rate.
            2. Don't be passive-aggressive.
            3. Leave the door slightly ajar ("If things change...").
        `
    },
    {
        id: 'game32',
        title: 'Game 32: The Lowball Rebuttal',
        description: 'You offered a candidate $120k. They are offended because they wanted $140k. The market average is $125k. You need to de-escalate and keep them interested without immediately raising the offer.',
        task: 'Your task: Write a response (email or script) to handle this objection.',
        placeholder: 'e.g., I understand your frustration...',
        difficulty: 'hard' as const,
        skillCategory: 'negotiation' as const,
        exampleSolution: 'I completely understand where you\'re coming from, and I appreciate you being open about your expectations. We arrived at $120k based on our internal equity and current market benchmarks for this specific level. However, I don\'t want money to be the only blocker if this is the right career move for you. Can we hop on a call to look at the total package (equity, benefits, bonus) and see if we can bridge the gap in other ways?',
        promptGenerator: (submission) => `
            You are a Negotiation Coach. A participant is handling a lowball objection.
            Submission: "${submission}"
            
            Evaluate:
            1. Did they validate the candidate's feelings (Empathy)?
            2. Did they anchor to data (Market/Internal Equity)?
            3. Did they pivot to "Total Compensation" or a conversation?
            
            SCORE: [number]
            
            Tips:
            1. Never say "No" immediately. Say "Let's look at the whole picture."
            2. Use "Internal Equity" as a neutral reason.
            3. Get them on the phone; don't negotiate numbers via email.
        `
    },
    {
        id: 'game33',
        title: 'Game 33: The Interview Script Generator',
        description: 'You are hiring a "Growth Marketing Manager". You need 5 behavioral interview questions focused on "Experimentation" and "Data Analysis".',
        task: 'Your task: Write a prompt for AI to generate these specific interview questions with a scoring rubric.',
        placeholder: 'e.g., Create an interview guide for...',
        difficulty: 'medium' as const,
        skillCategory: 'ai-prompting' as const,
        exampleSolution: 'Create a structured interview guide for a Growth Marketing Manager. I need 5 behavioral questions focusing on "Experimentation" (A/B testing) and "Data Analysis". For each question, provide a "Good Answer" vs. "Bad Answer" rubric to help me evaluate candidates. Tone: Professional and rigorous.',
        promptGenerator: (submission) => `
            You are an Interview Design Expert.
            Submission: "${submission}"
            
            Evaluate:
            1. Did they ask for behavioral questions?
            2. Did they request a rubric/evaluation guide (Crucial for structured interviewing)?
            3. Did they specify the skills (Experimentation/Data)?
            
            SCORE: [number]
            
            Tips:
            1. Always ask AI for "Good vs Bad" answer examples.
            2. Specify "Behavioral" or "Situational" questions.
            3. Ask for follow-up probing questions.
        `
    },
    {
        id: 'game34',
        title: 'Game 34: The LinkedIn Voice Note',
        description: 'You are connected with a "Senior Java Engineer" on LinkedIn who ignores text messages. You decide to send a 30-second voice note.',
        task: 'Your task: Write the script for this voice note (approx. 60-80 words). Sound natural and human.',
        placeholder: 'e.g., Hey [Name], I noticed you...',
        difficulty: 'easy' as const,
        skillCategory: 'outreach' as const,
        exampleSolution: 'Hey [Name], I know your inbox is probably exploding with recruiter spam, so I wanted to send a voice note to show there\'s a real human behind this profile. I saw your work on the [Project Name] repo and was genuinely impressed by your approach to concurrency. We\'re building something similar at [Company] and I\'d love to just geek out about it for 5 mins. No pitch, just engineering talk. Let me know.',
        promptGenerator: (submission) => `
            You are a Personal Branding Expert.
            Submission: "${submission}"
            
            Evaluate:
            1. Does it sound conversational (not like a script)?
            2. Is there a "pattern interrupt" (acknowledging the spam)?
            3. Is the call to action low pressure?
            
            SCORE: [number]
            
            Tips:
            1. Voice notes have 3x response rates. Use them!
            2. Start with "I know you're busy..." or "I know this is random..."
            3. Focus on "Human connection" over "Job pitch".
        `
    },
    {
        id: 'game35',
        title: 'Game 35: The Executive Bio',
        description: 'You found a great "VP of Engineering" candidate. You need to send their profile to your CEO, but the resume is dry. You need a compelling 1-paragraph bio.',
        task: 'Your task: Write a prompt for AI to rewrite a dry resume summary into an exciting executive bio.',
        placeholder: 'e.g., Rewrite this summary to sound...',
        difficulty: 'medium' as const,
        skillCategory: 'persona' as const,
        exampleSolution: 'Rewrite the following resume summary into a compelling, narrative-style executive bio suitable for presenting to a CEO. Highlight their leadership scale (team size), strategic impact (revenue growth), and technical vision. Tone: Impressive, confident, and executive. Keep it under 200 words.',
        promptGenerator: (submission) => `
            You are an Executive Search Researcher.
            Submission: "${submission}"
            
            Evaluate:
            1. Did they ask for a "narrative" style?
            2. Did they focus on "Strategic Impact" over tasks?
            3. Is the audience defined (CEO)?
            
            SCORE: [number]
            
            Tips:
            1. CEOs care about Revenue, Scale, and Speed.
            2. Use words like "Visionary," "Transformational," "Proven."
            3. Ask AI to "sell" the candidate.
        `
    },
    {
        id: 'game36',
        title: 'Game 36: The Kaggle Miner',
        description: 'You need to find a "Machine Learning Engineer" who is top-tier at "Computer Vision". LinkedIn is too noisy. You want to search Kaggle.',
        task: 'Your task: Write a Google X-Ray search string to find Kaggle user profiles with "Computer Vision" expertise.',
        placeholder: 'e.g., site:kaggle.com ...',
        difficulty: 'hard' as const,
        skillCategory: 'xray' as const,
        exampleSolution: 'site:kaggle.com/ (users OR "competitions") ("Computer Vision" OR CV OR "Image Processing") AND ("Grandmaster" OR "Master" OR "Expert" OR ranking) -site:kaggle.com/c -site:kaggle.com/code',
        promptGenerator: (submission) => `
            You are a Technical Sourcing Guru.
            Submission: "${submission}"
            
            Evaluate:
            1. Did they target the right site (kaggle.com)?
            2. Did they look for ranking keywords (Master, Grandmaster)?
            3. Did they try to filter out competition pages?
            
            SCORE: [number]
            
            Tips:
            1. Kaggle ranks are: Novice, Contributor, Expert, Master, Grandmaster. Use these!
            2. Profiles often have "Competitions" and "Datasets" tabs.
            3. Look for specific competition names if you know them.
        `
    },
    {
        id: 'game37',
        title: 'Game 37: The Dribbble Detective',
        description: 'You need a "Senior UI Designer" with a style that is "Minimalist" and "Clean". You want to search Dribbble.',
        task: 'Your task: Write a Google X-Ray search string to find Dribbble profiles with these keywords.',
        placeholder: 'e.g., site:dribbble.com ...',
        difficulty: 'medium' as const,
        skillCategory: 'xray' as const,
        exampleSolution: 'site:dribbble.com (minimalist OR clean OR "minimalism") AND ("UI Designer" OR "Product Designer") AND (location OR "hiring" OR "available") -site:dribbble.com/shots -site:dribbble.com/stories',
        promptGenerator: (submission) => `
            You are a Design Recruiting Specialist.
            Submission: "${submission}"
            
            Evaluate:
            1. Did they target dribbble.com?
            2. Did they include the aesthetic keywords (Minimalist/Clean)?
            3. Did they exclude "shots" (individual images) to find profiles?
            
            SCORE: [number]
            
            Tips:
            1. Dribbble profiles often have "Hire Me" buttons.
            2. Search for "shots" if you want to see work, but "profiles" if you want people.
            3. Use "site:behance.net" as an alternative.
        `
    },
    // PHASE 2: Talent Intelligence & Strategy (Games 38-45)
    {
        id: 'game38',
        title: 'Game 38: The Competitor Map',
        description: 'You are hiring for a Fintech startup in New York. You need to identify 5 specific competitor companies to target for "Payments Engineers".',
        task: 'Your task: List 5 companies that have strong payments engineering teams in NYC and explain why you chose them.',
        placeholder: 'e.g., 1. Stripe - because...',
        difficulty: 'medium' as const,
        skillCategory: 'talent-intelligence' as const,
        exampleSolution: '1. Stripe (Best-in-class payments infra). 2. Adyen (Direct competitor, strong engineering culture). 3. Block/Square (Mature payments stack). 4. PayPal/Venmo (Deep talent pool in NYC). 5. Brex (Modern fintech stack). Strategy: Target these because their engineers solve similar high-scale transaction challenges.',
        promptGenerator: (submission) => `
            You are a Market Mapping Expert.
            Submission: "${submission}"
            
            Evaluate:
            1. Are the companies relevant to Fintech/Payments?
            2. Are they likely to have teams in NYC?
            3. Is the reasoning sound (tech stack match)?
            
            SCORE: [number]
            
            Tips:
            1. Don't just list banks (JPMorgan) unless the role is legacy.
            2. Look for "Engineering Blogs" of these companies to verify their stack.
            3. Use Crunchbase to find well-funded competitors.
        `
    },
    {
        id: 'game39',
        title: 'Game 39: The Salary Benchmarker',
        description: 'Your Hiring Manager wants to pay $150k for a "Staff AI Engineer" in San Francisco. The market rate is $220k+. You need to explain this gap using data logic.',
        task: 'Your task: Write a short email (under 100 words) persuading the HM to increase the budget or lower expectations.',
        placeholder: 'e.g., Hi [Manager], I reviewed the market data...',
        difficulty: 'hard' as const,
        skillCategory: 'talent-intelligence' as const,
        exampleSolution: 'Hi Sarah, I\'ve analyzed the current market for Staff AI Engineers in SF. Our $150k budget is in the 10th percentile; the median is closer to $220k for this level of experience. At $150k, we will likely only attract junior candidates or those requiring visa sponsorship. To hire a true Staff-level engineer who can lead the team, I recommend we either adjust the budget to $210k+ or re-scope the role to "Senior" level. Which path do you prefer?',
        promptGenerator: (submission) => `
            You are a Compensation Analyst.
            Submission: "${submission}"
            
            Evaluate:
            1. Did they use data/percentiles to make the case?
            2. Did they offer options (Raise budget OR Lower requirements)?
            3. Was the tone advisory, not complaining?
            
            SCORE: [number]
            
            Tips:
            1. Use terms like "Median," "Percentile," and "Total Comp."
            2. Always give the manager a choice (The "Double Bind" technique).
            3. Mention the risk: "We will lose candidates at the offer stage."
        `
    },
    {
        id: 'game40',
        title: 'Game 40: The Neurodiverse Interview',
        description: 'You are designing an interview process for a "QA Tester" role and want to make it inclusive for candidates with Autism/ADHD.',
        task: 'Your task: List 3 specific accommodations you would add to the interview process.',
        placeholder: 'e.g., 1. Send questions in advance...',
        difficulty: 'medium' as const,
        skillCategory: 'diversity' as const,
        exampleSolution: '1. Send the interview agenda and core questions 24 hours in advance to reduce anxiety. 2. Offer a "camera-off" option for the initial screen to lower sensory load. 3. Replace one abstract "behavioral" interview with a practical, take-home work sample test that mimics the actual job.',
        promptGenerator: (submission) => `
            You are a DE&I Consultant.
            Submission: "${submission}"
            
            Evaluate:
            1. Are the accommodations practical?
            2. Do they specifically help with anxiety/processing (common in neurodivergence)?
            3. Do they maintain the bar for quality?
            
            SCORE: [number]
            
            Tips:
            1. "Surprise" questions measure quick thinking, not competence. Avoid them.
            2. Clear structure helps everyone, not just neurodiverse folks.
            3. Focus on "Work Samples" over "Social cues."
        `
    },
    {
        id: 'game41',
        title: 'Game 41: The Red Flag Spotter',
        description: 'You are screening a resume for a "VP of Sales". They list: "Increased revenue by 500%," "Managed team of 50," and "Advisor to CEO." But they have had 4 jobs in 3 years.',
        task: 'Your task: Write 2 probing questions to ask in the phone screen to validate these claims and check the job hopping.',
        placeholder: 'e.g., 1. Can you walk me through...',
        difficulty: 'medium' as const,
        skillCategory: 'screening' as const,
        exampleSolution: '1. "You\'ve had incredible impact in short stints. What specifically prompted your transition from Company A to Company B after only 9 months?" (Probes job hopping). 2. "Regarding the 500% growth - what was the starting revenue number, and what specific contribution was directly yours vs. the market trend?" (Probes attribution).',
        promptGenerator: (submission) => `
            You are an Executive Recruiter.
            Submission: "${submission}"
            
            Evaluate:
            1. Did they ask about the transitions (Job hopping)?
            2. Did they ask for the "Baseline" of the metrics (500% of what?)?
            3. Is the tone curious, not accusatory?
            
            SCORE: [number]
            
            Tips:
            1. Short stints at executive levels are a major risk. Dig deep.
            2. "We" vs "I" - ask what *they* did specifically.
            3. Ask for the "Why" behind every move.
        `
    },
    {
        id: 'game42',
        title: 'Game 42: The Video JD Script',
        description: 'You need to hire Gen Z "Social Media Managers". You want to post a 30-second video on TikTok/Reels to advertise the role.',
        task: 'Your task: Write the script for the video. Keep it high-energy and authentic.',
        placeholder: 'e.g., Stop scrolling! If you love...',
        difficulty: 'easy' as const,
        skillCategory: 'job-description' as const,
        exampleSolution: 'Stop scrolling! 🛑 Do you spend more time on TikTok than you sleep? We need a Social Media Manager for [Brand] who actually gets it. You\'ll own our entire content calendar, work with top creators, and yes - you can work from your couch. 🛋️ No degree required, just show us your best viral video. Link in bio to apply! 🚀',
        promptGenerator: (submission) => `
            You are a Social Media Recruiter.
            Submission: "${submission}"
            
            Evaluate:
            1. Is the hook strong (first 3 seconds)?
            2. Is the tone right for Gen Z (Authentic, not corporate)?
            3. Is there a clear Call to Action (Link in bio)?
            
            SCORE: [number]
            
            Tips:
            1. Don't say "We are looking for..." - say "You will..."
            2. Focus on the "Vibe" and "Perks" (Remote, Creative freedom).
            3. Keep it under 60 words for a 30s video.
        `
    },
    {
        id: 'game43',
        title: 'Game 43: The PDF Hunter',
        description: 'You need to find resumes of "Data Scientists" that are publicly hosted on university websites (often as PDF or Word docs).',
        task: 'Your task: Write a Google Boolean string to find these file types specifically.',
        placeholder: 'e.g., filetype:pdf ...',
        difficulty: 'hard' as const,
        skillCategory: 'boolean' as const,
        exampleSolution: '(filetype:pdf OR filetype:doc OR filetype:docx) "Data Scientist" AND (Python OR R) AND ("machine learning" OR ML) AND (resume OR cv OR vitae) -job -sample -template',
        promptGenerator: (submission) => `
            You are a Google Search Hacker.
            Submission: "${submission}"
            
            Evaluate:
            1. Did they use the filetype: operator?
            2. Did they include keywords for "Resume" (CV, Vitae)?
            3. Did they exclude templates/samples (-sample)?
            
            SCORE: [number]
            
            Tips:
            1. University sites often host these. Add "site:.edu" for US schools.
            2. People name files "firstname_lastname_resume.pdf" - try "intitle:resume".
            3. Exclude "job description" to avoid false positives.
        `
    },
    {
        id: 'game44',
        title: 'Game 44: The Alumni Network',
        description: 'You want to hire "Boomerang" employees - people who used to work at your company (e.g., "Airbnb") but left, and might want to come back.',
        task: 'Your task: Write the LinkedIn Recruiter filters to find these people.',
        placeholder: 'e.g., Past Company: Airbnb AND...',
        difficulty: 'medium' as const,
        skillCategory: 'linkedin' as const,
        exampleSolution: 'Past Company: Airbnb\nCurrent Company: NOT Airbnb\nYears of Experience: 5+ (Targeting seniors)\nKeywords: "Software Engineer" OR "Product Manager"\nInMail Strategy: "Miss you!"',
        promptGenerator: (submission) => `
            You are a LinkedIn Power User.
            Submission: "${submission}"
            
            Evaluate:
            1. Did they set Past Company correctly?
            2. Did they EXCLUDE the Current Company (Crucial!)?
            3. Is the logic sound?
            
            SCORE: [number]
            
            Tips:
            1. Boomerangs have 2x retention rates.
            2. If you don't exclude Current Company, you'll just find current employees.
            3. Look for people who left 2+ years ago (vesting cliffs).
        `
    },
    {
        id: 'game45',
        title: 'Game 45: The Clean-Up Crew',
        description: 'Your ATS is a mess. You have 3,000 duplicate profiles. You need a strategy to merge them without losing data.',
        task: 'Your task: Describe a 3-step process to identify and merge duplicates safely.',
        placeholder: 'e.g., 1. Export data and match by email...',
        difficulty: 'hard' as const,
        skillCategory: 'ats' as const,
        exampleSolution: '1. Match by Email Address (Unique Identifier): Run a script to group profiles with the exact same email. 2. Match by Name + Phone: For those with different emails, look for exact name AND phone matches. 3. Merge Rule: Always keep the "Most Recently Updated" profile as the master, but append notes/attachments from the older profile. Archive the old one.',
        promptGenerator: (submission) => `
            You are an Ops Manager.
            Submission: "${submission}"
            
            Evaluate:
            1. Did they identify a Unique Identifier (Email)?
            2. Did they have a secondary check (Phone/Name)?
            3. Did they define a "Master" record rule (Recency)?
            
            SCORE: [number]
            
            Tips:
            1. Never delete; always Merge or Archive.
            2. Email is the gold standard for uniqueness.
            3. Be careful with common names (John Smith).
        `
    },
    // PHASE 3: The Closer & Strategy (Games 46-52)
    {
        id: 'game46',
        title: 'Game 46: The Counter-Offer Killer',
        description: 'Your candidate just resigned, and their current boss offered them a $20k raise to stay. They are wavering. You need to remind them why they wanted to leave in the first place.',
        task: 'Your task: Write a script (email or phone) to handle this counter-offer situation.',
        placeholder: 'e.g., I hear you, and it\'s flattering...',
        difficulty: 'hard' as const,
        skillCategory: 'negotiation' as const,
        exampleSolution: 'It\'s completely normal to feel torn—that counter-offer is a sign they value you. But let\'s go back to our first conversation. You mentioned you were feeling stagnant and wanted to move into AI-driven products, which your current role can\'t offer. Does a $20k raise solve that stagnation? Or does it just make the golden handcuffs tighter? I want you to make the best decision for your *career*, not just your wallet.',
        promptGenerator: (submission) => `
            You are a Career Coach.
            Submission: "${submission}"
            
            Evaluate:
            1. Did they acknowledge the compliment (The raise)?
            2. Did they pivot back to the "Pain" (Why they looked)?
            3. Did they avoid being pushy/salesy?
            
            SCORE: [number]
            
            Tips:
            1. Counter-offers rarely fix the root problem. Remind them of that.
            2. Use "Future Pacing" - "In 6 months, will you be happy?"
            3. Be willing to walk away. It builds trust.
        `
    },
    {
        id: 'game47',
        title: 'Game 47: The Equity Explainer',
        description: 'You are hiring a "Senior Engineer" from a non-tech company. They don\'t understand why you are offering lower cash ($160k) but high equity (RSUs). They only care about the monthly paycheck.',
        task: 'Your task: Explain the value of the equity package in simple terms to get them excited.',
        placeholder: 'e.g., Think of equity like...',
        difficulty: 'medium' as const,
        skillCategory: 'negotiation' as const,
        exampleSolution: 'Think of the cash ($160k) as your rent and bills money—it\'s guaranteed. But the equity is your wealth-building money. If we hit our growth targets and the stock price doubles over 4 years, that equity grant isn\'t just a bonus; it could be worth more than your salary. You\'re not just an employee here; you\'re an owner. You get to benefit from the value you help create.',
        promptGenerator: (submission) => `
            You are a Startup Advisor.
            Submission: "${submission}"
            
            Evaluate:
            1. Did they use an analogy (Rent vs Wealth)?
            2. Did they explain the "Upside" potential?
            3. Did they use the word "Owner"?
            
            SCORE: [number]
            
            Tips:
            1. Non-tech people fear risk. Frame equity as "Ownership," not "Gambling."
            2. Show the math: "If we grow 2x, this is worth $X."
            3. Don't overpromise - say "potential."
        `
    },
    {
        id: 'game48',
        title: 'Game 48: The Culture Add',
        description: 'You are interviewing a candidate who is very different from your current team (introverted, different background). The team says "not a culture fit." You think they are a "Culture Add."',
        task: 'Your task: Write a note to the Hiring Manager explaining why "Culture Fit" is dangerous and why this candidate adds value.',
        placeholder: 'e.g., I noticed the team feedback...',
        difficulty: 'hard' as const,
        skillCategory: 'screening' as const,
        exampleSolution: 'I noticed the feedback on "culture fit," but I want to challenge us to look for "Culture Add" instead. "Fit" often just means "more of the same," which leads to groupthink. This candidate brings a rigorous, thoughtful approach that balances our team\'s high-energy, rapid-fire style. We need that diversity of thought to avoid blind spots. If they can do the job and share our values, their different personality is an asset, not a risk.',
        promptGenerator: (submission) => `
            You are a DE&I Leader.
            Submission: "${submission}"
            
            Evaluate:
            1. Did they distinguish "Fit" (Sameness) vs "Add" (New perspective)?
            2. Did they mention the business risk of "Groupthink"?
            3. Did they advocate for the candidate's specific strength?
            
            SCORE: [number]
            
            Tips:
            1. "Culture Fit" is often unconscious bias. Call it out gently.
            2. Focus on "Values Alignment" instead of personality.
            3. Use business logic: Diverse teams build better products.
        `
    },
    {
        id: 'game49',
        title: 'Game 49: The Location Strategy',
        description: 'Your CTO wants to open a new remote hub for "Data Engineers". She suggests "San Francisco" or "London". You think "Poland" or "Brazil" is better for talent supply/cost.',
        task: 'Your task: Write a brief pitch (3-4 sentences) proposing the alternative location.',
        placeholder: 'e.g., While SF has talent, the competition...',
        difficulty: 'medium' as const,
        skillCategory: 'talent-intelligence' as const,
        exampleSolution: 'While SF and London have top talent, they are the most competitive and expensive markets in the world. I recommend looking at Poland or Brazil. Both have massive supplies of high-quality Data Engineers (strong STEM education) at 40-60% of the cost. Plus, retention rates in these emerging hubs are significantly higher because we can be a top-tier employer there, rather than just another startup in SF.',
        promptGenerator: (submission) => `
            You are a Global Talent Strategist.
            Submission: "${submission}"
            
            Evaluate:
            1. Did they mention Cost/Competition?
            2. Did they mention Quality/Supply (STEM education)?
            3. Did they mention Retention (Big fish in small pond)?
            
            SCORE: [number]
            
            Tips:
            1. Data speaks louder than opinions.
            2. "Follow the sun" support is another benefit of global hubs.
            3. Mention specific success stories (e.g., "Google hires in Warsaw").
        `
    },
    {
        id: 'game50',
        title: 'Game 50: The Sourcing Bot',
        description: 'You want to build a custom GPT that acts as a Sourcing Assistant. You need to write the "System Prompt" (Instructions) for it.',
        task: 'Your task: Write the system instructions for an AI that should ONLY generate Boolean strings and nothing else.',
        placeholder: 'e.g., You are a Boolean generator. Your rules are...',
        difficulty: 'hard' as const,
        skillCategory: 'ai-prompting' as const,
        exampleSolution: 'You are a Boolean Search Generator. Your ONLY purpose is to output valid Boolean search strings. Rules: 1. Receive a job description or list of skills. 2. Output a Boolean string inside a code block. 3. Do NOT explain the string. 4. Do NOT say "Here is your string." 5. Use standard operators (AND, OR, NOT). 6. If the user input is vague, ask ONE clarifying question. Otherwise, just generate.',
        promptGenerator: (submission) => `
            You are an AI Developer.
            Submission: "${submission}"
            
            Evaluate:
            1. Did they define the Persona (Boolean Generator)?
            2. Did they set negative constraints (Do NOT explain)?
            3. Did they handle edge cases (Vague input)?
            
            SCORE: [number]
            
            Tips:
            1. The more constraints, the better the bot.
            2. "Output ONLY" is the most important command.
            3. Instruct it on how to handle errors.
        `
    },
    {
        id: 'game51',
        title: 'Game 51: The Purple Squirrel',
        description: 'CAPSTONE: You need a "Rust Engineer" with "Cryptography" background, who speaks "Japanese", and is willing to relocate to "Switzerland".',
        task: 'Your task: Write a multi-part sourcing strategy (Boolean + Platform + Outreach angle).',
        placeholder: 'e.g., Boolean: ... Platform: ... Outreach: ...',
        difficulty: 'hard' as const,
        skillCategory: 'boolean' as const,
        exampleSolution: 'Boolean: (Rust OR RustLang) AND (Cryptography OR Crypto OR "Zero Knowledge" OR ZK) AND (Japanese OR "JLPT" OR "Japanese speaker"). Platform: GitHub (search for Rust crypto repos), LinkedIn (filter by Language: Japanese), and Rust Community Discords. Outreach Angle: "Your unique blend of Rust + Crypto + Japanese is exactly what we need for our Tokyo-Zurich bridge team. We offer full relocation support to Switzerland."',
        promptGenerator: (submission) => `
            You are a Master Sourcer.
            Submission: "${submission}"
            
            Evaluate:
            1. Did the Boolean cover all 3 niche skills?
            2. Did they pick the right platforms (GitHub/Discord)?
            3. Was the outreach hyper-personalized to the "Purple Squirrel" nature?
            
            SCORE: [number]
            
            Tips:
            1. For impossible roles, look for the "Intersection" of communities.
            2. Relocation is a huge selling point - lead with it.
            3. Don\'t rely on just one channel.
        `
    },
    {
        id: 'game52',
        title: 'Game 52: The Head of Talent',
        description: 'THE FINALE: You are the first Head of Talent at a Series A startup. You have $0 budget for tools. You need to hire 20 engineers in 6 months.',
        task: 'Your task: Outline your "Guerrilla Recruiting" strategy (Tools, Process, Brand).',
        placeholder: 'e.g., Tools: Free versions of... Process: ...',
        difficulty: 'hard' as const,
        skillCategory: 'talent-intelligence' as const,
        exampleSolution: 'Tools: Use free LinkedIn (optimize network), GitHub X-Ray (free), and a simple Trello/Notion board as an ATS. Process: Implement "Founder Sourcing" blocks (Founder sends 10 emails/week). Set up a generous Employee Referral Program (cash bonus). Brand: Write 1 high-quality engineering blog post per month to drive inbound. Focus on "High Touch" candidate experience to win against big tech.',
        promptGenerator: (submission) => `
            You are a VC Talent Partner.
            Submission: "${submission}"
            
            Evaluate:
            1. Was the tool stack truly free/low-cost?
            2. Did they leverage the Founders (Best free resource)?
            3. Did they focus on Referrals (Highest ROI)?
            
            SCORE: [number]
            
            Tips:
            1. At Series A, the Founder is your best recruiter. Use them.
            2. Referrals are the lifeblood of early-stage hiring.
            3. You don't need a $20k LinkedIn license to hire great people.
        `
    }
];

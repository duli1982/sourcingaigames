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
        promptGenerator: (submission) => `
            You are a Technical Sourcing Coach evaluating a Boolean search string. This is a MEDIUM difficulty challenge - be moderately strict.

            Goal: Find Senior Backend Engineers in Vienna with Go + Kubernetes + Open Source contributions.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require good execution):
            - 0-59 (Needs Work): Missing 2+ required elements or poor Boolean logic
            - 60-79 (Good): Covers most criteria with proper syntax, minor gaps
            - 80-100 (Excellent): All criteria covered with advanced techniques (wildcards, exclusions, proper grouping)

            SCORING CRITERIA (100 points total):
            1. JOB TITLES (20 pts): Includes role variations (Backend Engineer, Software Engineer, Developer)? Proper OR logic?

            2. REQUIRED SKILLS (30 pts): Both Go/Golang AND Kubernetes with variants (K8s, container orchestration)? Properly grouped with AND?

            3. LOCATION (20 pts): Vienna OR Wien mentioned? Considered Austria as backup?

            4. OPEN SOURCE SIGNAL (20 pts): Includes GitHub, contributor, open-source, or profile indicators?

            5. BOOLEAN LOGIC (10 pts): Proper use of parentheses, quotes for phrases, no syntax errors?

            AUTOMATIC DEDUCTIONS:
            - Missing ANY required skill: -20 points
            - No parentheses/grouping: -15 points
            - Submission <15 words: Maximum score 55
            - Would return <10 or >1000 results: -10 points

            Be fair but require proper Boolean technique for Medium difficulty.
        `
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
        promptGenerator: (submission) => `
            You are a Talent Strategy Consultant evaluating a candidate persona. This is an EASY level challenge - be encouraging but fair.

            Role: Lead UX Designer (B2B SaaS, 7+ yrs, Figma, Data Viz).
            Submission: "${submission}"

            SCORING GUIDE (Easy difficulty - be supportive):
            - 0-59 (Needs Work): Missing multiple key elements or <20 words
            - 60-79 (Good): Covers 3-4 criteria with reasonable detail
            - 80-100 (Excellent): Covers all 5 criteria with specific insights

            SCORING CRITERIA (100 points total):
            1. EXPERIENCE LEVEL (20 pts): Did they mention 7+ years or "Lead" level seniority?

            2. TECHNICAL SKILLS (20 pts): Did they include Figma? Bonus for mentioning Data Visualization.

            3. MOTIVATIONS (25 pts): Did they identify what drives this candidate (e.g., mentoring, user-centered culture, complex problems)?

            4. SOURCING CHANNELS (20 pts): Did they suggest where to find them (Dribbble, Behance, Figma Community)?

            5. PERSONALIZATION (15 pts): Did they explain how this persona influences the outreach approach?

            AUTOMATIC ADJUSTMENTS:
            - Submission <20 words: Maximum score 50
            - Covers all 5 criteria: Minimum score 70
            - Shows strategic thinking: +10 bonus points

            Be encouraging - this is an entry-level exercise. Award partial credit generously.
        `
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
        promptGenerator: (submission) => `
            You are a Candidate Engagement Specialist evaluating an outreach message. This is a MEDIUM difficulty challenge - require personalization and technique.

            Candidate: Senior DevOps Engineer, 5 yrs tenure, Conference Speaker on "Scaling CI/CD Pipelines".
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require good outreach skills):
            - 0-59 (Needs Work): Generic, too long, or pushy tone
            - 60-79 (Good): Personalized, concise, respectful with minor improvements needed
            - 80-100 (Excellent): Highly personalized, perfect length, low-friction CTA, engaging tone

            SCORING CRITERIA (100 points total):
            1. PERSONALIZATION (30 pts): Did they specifically reference the "Scaling CI/CD Pipelines" talk? Shows genuine research?

            2. LENGTH (20 pts): Is it under 100 words? Bonus for being under 75 words (mobile-friendly).

            3. CALL TO ACTION (25 pts): Is the CTA low-friction? ("Quick chat" vs "Interview", "Exploring" vs "We want to hire you")

            4. TONE & RESPECT (25 pts): Professional but conversational? Not pushy or salesy? Acknowledges their current situation?

            AUTOMATIC DEDUCTIONS:
            - Over 120 words: -25 points
            - Generic opening ("I came across your profile"): -15 points
            - No specific mention of CI/CD talk: -20 points
            - Pushy/assumptive language: -15 points
            - No CTA at all: -20 points

            Require genuine personalization for Medium difficulty.
        `
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
        promptGenerator: (submission) => `
            You are a Google X-Ray Search Expert evaluating a GitHub profile search. This is a HARD difficulty challenge - be VERY STRICT and demand advanced technique.

            Goal: Python + Django developers in Berlin on GitHub.
            Submission: "${submission}"

            SCORING GUIDE (Hard difficulty - expert-level expectations):
            - 0-59 (Needs Work): Missing core elements, no exclusions, poor targeting
            - 60-79 (Good): Has basics but missing advanced filtering or optimization
            - 80-100 (Excellent): Perfect targeting with multiple exclusions, proper syntax, would return clean results

            SCORING CRITERIA (100 points total):
            1. SITE TARGETING (20 pts): Uses "site:github.com" correctly? Targets profile URLs specifically?

            2. SKILLS COVERAGE (25 pts): Includes BOTH Python AND Django? Uses OR for variants? Proper Boolean logic?

            3. LOCATION (20 pts): Includes Berlin? Considers Germany as backup? Uses quotes if needed?

            4. PROFILE FILTERING (25 pts): Excludes non-profile pages (-topics, -explore, -trending)? Multiple exclusions?

            5. ADVANCED TECHNIQUE (10 pts): Uses advanced operators (intitle, inurl)? Considers activity indicators?

            AUTOMATIC DEDUCTIONS:
            - Missing "site:github.com": Maximum score 40
            - No exclusions at all: -25 points
            - Missing either Python OR Django: -20 points
            - Would return mostly non-profile pages: -30 points
            - No location specified: -15 points
            - Submission <10 words: Maximum score 45

            HARD difficulty requires advanced X-Ray technique. Be strict.
        `
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
            You are a LinkedIn Recruiter Coach evaluating a search query. This is an EASY level challenge - be encouraging and educational.

            Goal: Marketing Directors, Series A/B Startups, SF Bay Area, Product Launch exp.
            Submission: "${submission}"

            SCORING GUIDE (Easy difficulty - be supportive):
            - 0-59 (Needs Work): Missing multiple required filters or wrong syntax
            - 60-79 (Good): Includes most filters with reasonable approach
            - 80-100 (Excellent): All filters covered with proper LinkedIn syntax

            SCORING CRITERIA (100 points total):
            1. TITLE TARGETING (25 pts): Includes title variations (Director, Head of, VP)? Uses title: syntax?

            2. STARTUP/STAGE INDICATORS (20 pts): Uses company_size filter OR keywords for Series A/B? Shows understanding of startup identification?

            3. PRODUCT LAUNCH KEYWORDS (20 pts): Includes relevant keywords (product launch, GTM, go-to-market)?

            4. LOCATION (20 pts): Specifies "San Francisco Bay Area" or equivalent?

            5. QUERY BALANCE (15 pts): Not too narrow (<10 results) or too broad (>10,000 results)? Practical for sourcing?

            AUTOMATIC ADJUSTMENTS:
            - Missing location entirely: -15 points
            - Covers all 5 criteria: Minimum score 70
            - Creative use of LinkedIn filters: +10 bonus

            Be encouraging - help them learn LinkedIn Recruiter syntax.
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
            You are a DE&I Recruitment Strategist evaluating diversity sourcing strategies. This is a MEDIUM difficulty challenge - require good execution and compliance awareness.

            Goal: Diverse pipeline for Senior Software Engineer (Ethical & Compliant).
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require ethical and practical strategies):
            - 0-59 (Needs Work): Missing multiple criteria, suggests illegal filtering, or too vague
            - 60-79 (Good): Covers 3-4 criteria with specific organizations and ethical approach
            - 80-100 (Excellent): All criteria met with specific partnerships, compliance clarity, and actionable strategies

            SCORING CRITERIA (100 points total):
            1. SPECIFIC PARTNERSHIPS (25 pts): Names at least 2 specific organizations (Code2040, Women Who Code, Black Girls Code, Techqueria, /dev/color)? Generic "diversity groups" = 0 points.

            2. DIVERSE INSTITUTIONS (25 pts): Mentions HBCUs, women's colleges, HSIs, or universities with strong diversity programs? Includes specific examples?

            3. INCLUSIVE LANGUAGE (20 pts): Addresses job description language, avoiding gendered terms (rockstar, ninja), or making postings more accessible?

            4. COMMUNITY ENGAGEMENT (20 pts): Mentions diversity-focused conferences (Grace Hopper, AfroTech), ERGs, Slack communities, or online forums?

            5. COMPLIANCE (10 pts): Explicitly avoids illegal filtering (no "search only for women")? Focuses on expanding pools, not filtering by protected characteristics?

            AUTOMATIC DEDUCTIONS:
            - Suggests illegal demographic filtering: Automatic score of 0
            - No specific organization names: -20 points
            - Submission <30 words: Maximum score 50
            - Purely theoretical with no actionable strategies: -15 points
            - Only mentions 1 strategy: Maximum score 65

            Require specific, ethical, and compliant strategies for Medium difficulty.
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
            You are a Technical Recruiter evaluating a resume screening. This is an EASY level challenge - be encouraging and educational.

            Role: Data Scientist (5+ yrs exp, ML Deployment required).
            Candidate: PhD in Statistics, 3 yrs Consulting, Python/R/SQL, Predictive modeling & A/B testing, NO ML Deployment mentioned.
            Submission: "${submission}"

            SCORING GUIDE (Easy difficulty - be supportive but require key insights):
            - 0-59 (Needs Work): Missed major gaps or made incorrect recommendation
            - 60-79 (Good): Identified main issues and made reasonable recommendation
            - 80-100 (Excellent): Thorough analysis with nuanced recommendation and clear next steps

            SCORING CRITERIA (100 points total):
            1. EXPERIENCE GAP (25 pts): Did they identify the 3 vs 5 years gap? Considered that PhD research might count toward experience? Full points for nuanced analysis.

            2. MISSING SKILL (30 pts): Did they spot the lack of "ML Deployment" experience? Recognized it as critical for the role? Must explicitly mention this gap.

            3. RECOMMENDATION (25 pts): Suggested phone screen to probe further vs flat reject? Balanced approach showing good judgment? "Reject" without exploration = 0 points.

            4. CALIBRATION (20 pts): Differentiated "must have" vs "nice to have"? Suggested alternative role level (mid-level vs senior) if deployment gap can't be filled?

            AUTOMATIC DEDUCTIONS:
            - Flat rejection without phone screen suggestion: -20 points
            - Missed the ML deployment gap entirely: -25 points
            - Submission <25 words: Maximum score 55
            - No clear next step recommended: -15 points

            BONUSES:
            - Shows understanding of PhD counting as experience: +5 points
            - Practical phone screen questions suggested: +5 points
            - Suggests alternative role level: +5 points

            Be encouraging but require thoughtful screening analysis.
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
            You are a Talent Brand Expert evaluating a job description. This is a MEDIUM difficulty challenge - require engaging writing and proper JD structure.

            Role: Customer Success Manager (B2B SaaS).
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require professional JD writing):
            - 0-59 (Needs Work): Too long/short, task-focused instead of impact-focused, or uses exclusionary language
            - 60-79 (Good): Proper length, covers main requirements, mostly candidate-centric
            - 80-100 (Excellent): Perfect length, highly engaging, impact-focused, inclusive language, sells the role

            SCORING CRITERIA (100 points total):
            1. CANDIDATE-CENTRIC TONE (25 pts): Uses "You will..." more than "We need..."? Focuses on candidate's experience and impact? Engaging and inviting?

            2. KEY REQUIREMENTS COVERAGE (25 pts): Explicitly covers customer retention/success AND cross-functional collaboration? Not just a task list but explains the role's purpose?

            3. LENGTH & CONCISENESS (20 pts): Between 100-150 words? Bonus for 100-130 words (ideal length). Punish verbosity or being too brief.

            4. IMPACT-FOCUSED (20 pts): Describes what they will ACHIEVE (customer success, retention rates, business impact) vs just what they will DO (send emails, have meetings)?

            5. INCLUSIVE LANGUAGE (10 pts): Avoids "rockstar", "ninja", "work hard play hard", or other exclusionary terms? Professional and welcoming tone?

            AUTOMATIC DEDUCTIONS:
            - Over 180 words or under 75 words: -20 points
            - Uses exclusionary language (ninja, rockstar, culture fit): -15 points
            - Pure task list with no impact mentioned: -20 points
            - Submission is company-centric ("We need") vs candidate-centric: -15 points
            - Missing either retention OR collaboration: -15 points

            BONUSES:
            - Mentions specific metrics or outcomes: +5 points
            - Exceptionally compelling and differentiated writing: +5 points

            Require professional, engaging, impact-focused JD writing for Medium difficulty.
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
            You are a Recruiting Ops Manager evaluating an ATS filtering strategy. This is a MEDIUM difficulty challenge - require systematic filtering and balanced automation.

            Goal: Filter 50 PM candidates to top 10 for phone screens.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require structured filtering process):
            - 0-59 (Needs Work): Missing hard requirements, no prioritization, or purely automated with no human review
            - 60-79 (Good): Covers hard requirements and some differentiators, shows filtering order
            - 80-100 (Excellent): Systematic filtering with clear prioritization, balance of automation and manual review, efficient process

            SCORING CRITERIA (100 points total):
            1. HARD REQUIREMENTS (25 pts): Identifies clear knockout criteria (years of PM experience, NOT project management)? Sets minimum thresholds?

            2. DIFFERENTIATORS (25 pts): Looks for B2B SaaS experience, technical background, or product launch ownership? Goes beyond minimum requirements?

            3. FILTERING ORDER (25 pts): Describes the sequence (hard requirements first, then differentiators)? Logical funnel approach (50→25→15→10)?

            4. AUTOMATION BALANCE (15 pts): Uses knockout questions or filters for efficiency but includes manual review step? Not 100% algorithmic?

            5. EFFICIENCY (10 pts): Process would realistically get to 10 candidates without missing strong non-traditional candidates?

            AUTOMATIC DEDUCTIONS:
            - No hard requirements mentioned: -25 points
            - 100% automated filtering with no human review: -20 points
            - Submission <30 words or single sentence: Maximum score 50
            - No filtering sequence/order described: -15 points
            - Would likely miss strong candidates (too narrow): -10 points

            BONUSES:
            - Mentions reviewing silver medalists or past applicants: +5 points
            - Includes specific ATS features (tags, scoring, knockout questions): +5 points

            Require systematic, efficient filtering with human judgment for Medium difficulty.
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
            You are a Boolean Logic Master evaluating a complex search string. This is a HARD difficulty challenge - be VERY STRICT and demand expert-level Boolean technique.

            Goal: ML Engineers in Seattle, (TensorFlow OR PyTorch), (Google/Amazon/MSFT), Published Research.
            Submission: "${submission}"

            SCORING GUIDE (Hard difficulty - expert-level expectations):
            - 0-59 (Needs Work): Missing multiple requirements, poor Boolean logic, no proper grouping
            - 60-79 (Good): Covers main requirements but missing nested logic or some variations
            - 80-100 (Excellent): Perfect nested Boolean logic, all requirements covered with multiple variations, would return highly targeted results

            SCORING CRITERIA (100 points total):
            1. ROLE TITLE VARIATIONS (20 pts): Includes ML Engineer, Applied Scientist, Machine Learning Engineer, Research Scientist? Uses proper OR grouping with parentheses?

            2. TECH STACK (25 pts): Includes BOTH TensorFlow AND PyTorch with variations (deep learning framework)? Properly grouped with OR? Uses parentheses correctly?

            3. COMPANY TARGETING (20 pts): Includes Google, Amazon, Microsoft, and ideally FAANG or other variations (Meta, Apple)? Proper OR grouping?

            4. RESEARCH PUBLICATIONS (20 pts): Includes multiple variations (published research, research paper, conference paper, arxiv, peer reviewed, NeurIPS, ICML)? Shows deep understanding of ML research landscape?

            5. LOCATION (10 pts): Includes Seattle with variations (Seattle area, Bellevue, Redmond, Puget Sound)? Considers nearby cities?

            6. BOOLEAN LOGIC PERFECTION (5 pts): Perfect use of nested parentheses? All OR groups properly wrapped? Correct AND combinations between major categories?

            AUTOMATIC DEDUCTIONS:
            - Missing any of the 4 main requirements (Tech/Company/Research/Location): -20 points each
            - No parentheses for OR groups: -25 points
            - Would return <5 or >5000 results (too narrow/broad): -15 points
            - Submission <15 words: Maximum score 45
            - Incorrect Boolean syntax: -20 points
            - Missing role title variations: -15 points

            HARD difficulty requires flawless Boolean logic with comprehensive variations. Be strict and unforgiving of syntax errors.
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
            You are a Technical Sourcing Expert evaluating an X-ray search for Stack Overflow. This is a HARD difficulty challenge - be VERY STRICT and demand advanced X-ray technique.

            Goal: iOS/Swift developers, Stack Overflow profiles.
            Submission: "${submission}"

            SCORING GUIDE (Hard difficulty - expert-level X-ray expectations):
            - 0-59 (Needs Work): Missing site targeting, no exclusions, or would return mostly non-profiles
            - 60-79 (Good): Has basic site targeting and skills but missing critical exclusions or activity indicators
            - 80-100 (Excellent): Perfect site targeting, comprehensive exclusions, activity indicators, would return clean profile results

            SCORING CRITERIA (100 points total):
            1. SITE TARGETING (25 pts): Uses "site:stackoverflow.com/users" specifically (not just stackoverflow.com)? Targets the correct URL structure for profiles?

            2. SKILL KEYWORDS (20 pts): Includes Swift, SwiftUI, iOS, iPhone with proper variations? Uses OR logic for variants?

            3. EXCLUSIONS (30 pts): Excludes non-profile pages using multiple -site: operators (-questions, -tags, -jobs, -companies)? At least 2-3 exclusions required for full points.

            4. ACTIVITY INDICATORS (15 pts): Looks for "reputation", "answers", "top user", or other signals of active contributors? Shows understanding that active users are better targets?

            5. QUERY OPTIMIZATION (10 pts): Balanced - not too narrow (would return results) but filtered enough to avoid noise? Understands SO profile structure?

            AUTOMATIC DEDUCTIONS:
            - Missing "site:stackoverflow.com": Maximum score 30
            - Missing "/users" in site targeting: -20 points
            - No exclusions at all: -25 points
            - Missing skill keywords (Swift/iOS): -20 points
            - Would return mostly question pages, not profiles: -30 points
            - Submission <8 words: Maximum score 40
            - Over-constrained (would return 0 results): -15 points

            HARD difficulty requires advanced X-ray technique with multiple exclusions and proper URL targeting. Be strict.
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
            You are a Candidate Engagement Specialist evaluating a follow-up email. This is an EASY level challenge - be supportive and instructive.

            Context: Sent initial outreach 5 days ago, no response. This is the first follow-up to a Senior Data Engineer.
            Submission: "${submission}"

            SCORING GUIDE (Easy difficulty - be supportive):
            - 0-59 (Needs Work): Too long, pushy, or missing key elements
            - 60-79 (Good): Brief, polite, has most elements
            - 80-100 (Excellent): Perfect length, professional tone, clear "out" offered

            SCORING CRITERIA (100 points total):
            1. BREVITY (25 pts): Is it under 75 words? Bonus for under 50 words (mobile-friendly).

            2. TONE (25 pts): Professional but not pushy? Avoids clichés like "just checking in" or "bumping this up"?

            3. CLEAR OUT (30 pts): Offers an easy exit ("let me know if not interested")? Uses strip-line technique?

            4. REFERENCE (20 pts): References previous email without re-pitching the entire role? Just bumps the thread?

            AUTOMATIC ADJUSTMENTS:
            - Over 100 words: -20 points
            - Guilt-tripping language: -15 points
            - No "out" offered: -25 points
            - Re-pitches entire role: -10 points
            - Shows understanding of strip-line technique: +10 bonus

            Be encouraging - teach effective follow-up techniques.
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
            You are a Technical Sourcer evaluating a GitHub X-ray search. This is a MEDIUM difficulty challenge - require good X-ray technique with proper exclusions.

            Goal: React developers in Austin, TX with open source contributions.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require solid X-ray skills):
            - 0-59 (Needs Work): Missing site targeting, location, or no exclusions
            - 60-79 (Good): Has main elements but missing some exclusions or activity indicators
            - 80-100 (Excellent): Complete search with site targeting, skills, location, activity, and multiple exclusions

            SCORING CRITERIA (100 points total):
            1. SITE TARGETING (20 pts): Uses "site:github.com" correctly? Essential foundation for X-ray search.

            2. SKILL KEYWORDS (25 pts): Includes React, ReactJS, front-end, frontend developer with variations? Uses OR logic?

            3. LOCATION (20 pts): Includes Austin, Austin TX, or Texas? Considers location variations since GitHub location is free-text?

            4. OPEN SOURCE SIGNALS (20 pts): Includes "repositories", "contributions", "open source", "open-source" to filter for active contributors?

            5. EXCLUSIONS (15 pts): Uses -site: to exclude non-profile pages (-topics, -trending, -explore)? At least 1-2 exclusions for clean results?

            AUTOMATIC DEDUCTIONS:
            - Missing "site:github.com": Maximum score 35
            - No location specified: -20 points
            - No React/frontend keywords: -20 points
            - No exclusions at all: -15 points
            - Would return mostly repo pages instead of profiles: -20 points
            - Submission <10 words: Maximum score 50

            BONUSES:
            - Multiple location variations (Austin, ATX, Texas): +5 points
            - Activity indicators beyond basic keywords: +5 points

            Require good X-ray technique with proper targeting and filtering for Medium difficulty.
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
            You are an Executive Search Researcher evaluating a VP of Sales persona. This is a HARD difficulty challenge - be VERY STRICT and demand comprehensive, strategic persona development.

            Role: VP of Sales (Cybersecurity, Enterprise Sales).
            Submission: "${submission}"

            SCORING GUIDE (Hard difficulty - expert executive search expectations):
            - 0-59 (Needs Work): Missing multiple critical elements, too generic, or <4 sentences
            - 60-79 (Good): Covers most elements but lacks depth in sourcing channels or specific details
            - 80-100 (Excellent): Comprehensive persona with all elements, specific details, and strategic sourcing approach

            SCORING CRITERIA (100 points total):
            1. DOMAIN EXPERTISE (20 pts): Explicitly mentions cybersecurity/security/infosec domain? Identifies specific companies (Palo Alto Networks, CrowdStrike, Okta, Zscaler)?

            2. ENTERPRISE SALES SPECIFICS (25 pts): Mentions Fortune 500, enterprise, $10M+ quotas, 6-12 month sales cycles, or specific deal sizes? Shows understanding of enterprise sales complexity?

            3. SENIORITY MARKERS (20 pts): Realistic experience level (10-15 years)? Team management size (10-20+ AEs/SEs)? Track record details?

            4. SOURCING CHANNELS (25 pts): Identifies WHERE to find them - industry conferences (RSA, Black Hat, InfoSec), competitor companies, LinkedIn thought leaders, or specific communities? Generic "LinkedIn" = minimal points.

            5. MOTIVATIONS (10 pts): Mentions what drives this candidate (equity, building from scratch, strategic role, growth stage opportunity)?

            AUTOMATIC DEDUCTIONS:
            - Submission <4 sentences or <60 words: Maximum score 50
            - No specific companies mentioned: -20 points
            - No sourcing channels identified: -25 points
            - Generic persona that could apply to any VP Sales: -20 points
            - Missing cybersecurity domain mention: -20 points
            - No realistic seniority indicators (years, team size, quota): -15 points

            BONUSES:
            - Mentions specific conferences or communities: +5 points
            - Includes deal sizes or sales cycle length: +5 points
            - Strategic insights about growth stage preferences: +5 points

            HARD difficulty requires comprehensive, specific executive persona with strategic sourcing approach. Be strict.
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
            You are a DE&I Consultant evaluating inclusive job description revisions. This is a MEDIUM difficulty challenge - require identification of all biased terms with proper alternatives.

            Original JD Issues: "Rockstar developer", "Top-tier university", "Young, hungry talent", "Work-hard-play-hard culture".
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require comprehensive bias identification):
            - 0-59 (Needs Work): Missed 2+ problematic phrases or provided weak alternatives
            - 60-79 (Good): Identified 3 issues with reasonable alternatives
            - 80-100 (Excellent): Identified all 4 issues with specific, compelling inclusive alternatives

            SCORING CRITERIA (100 points total):
            1. "ROCKSTAR" ISSUE (25 pts): Identified as gendered/exclusionary tech-bro jargon? Suggested alternatives like "experienced developer", "skilled engineer", or "senior software engineer"?

            2. "TOP-TIER UNIVERSITY" ISSUE (25 pts): Identified as elitist and exclusionary of non-traditional backgrounds (bootcamps, self-taught, state schools)? Suggested "relevant degree or equivalent experience"?

            3. "YOUNG/HUNGRY" ISSUE (25 pts): Identified as age discrimination? Suggested alternatives like "motivated", "passionate", "driven professionals"? Recognized the legal risk?

            4. "WORK-HARD-PLAY-HARD" ISSUE (25 pts): Identified as deterring candidates with caregiving responsibilities or signaling burnout culture? Suggested alternatives like "collaborative environment", "results-driven with work-life balance"?

            AUTOMATIC DEDUCTIONS:
            - Missed any of the 4 problematic phrases: -20 points each
            - Provided alternatives but didn't explain WHY the original is problematic: -10 points
            - Submission <40 words or doesn't address all 4 phrases: Maximum score 60
            - Alternatives are still biased or vague: -15 points
            - No explanation of the bias type (gendered, ageist, elitist): -10 points

            BONUSES:
            - Mentioned legal/compliance risks (age discrimination): +5 points
            - Suggested alternatives that still sell the role compellingly: +5 points

            Require comprehensive bias identification with specific, actionable alternatives for Medium difficulty.
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
            You are a LinkedIn Recruiter Power User evaluating advanced filter usage. This is a HARD difficulty challenge - be VERY STRICT and demand mastery of LinkedIn Recruiter filters.

            Goal: CTOs who scaled teams (10->100) at Venture-backed startups.
            Submission: "${submission}"

            SCORING GUIDE (Hard difficulty - expert-level LinkedIn Recruiter mastery):
            - 0-59 (Needs Work): Missing critical filters, poor keyword strategy, or would return irrelevant results
            - 60-79 (Good): Uses main filters but missing advanced combinations or scaling indicators
            - 80-100 (Excellent): Masterful use of multiple filters, keyword combinations, and scaling proxies

            SCORING CRITERIA (100 points total):
            1. TITLE FILTERS (15 pts): Uses Current Title filter with variations (CTO, Chief Technology Officer, VP Engineering transitioning)? Proper OR logic?

            2. SCALING KEYWORDS (25 pts): Keywords include "scaled team", "grew team", "10 to 100", "built engineering team", or similar growth indicators? These are CRITICAL for the goal.

            3. COMPANY SIZE FILTERS (20 pts): Uses Company Size filter (51-200, 201-500, 501-1000) as proxy for companies that have scaled? Shows strategic thinking?

            4. VENTURE/FUNDING INDICATORS (20 pts): Uses Past Company keywords (Series B, Series C, VC-backed, funded startup) OR Company Type filter?

            5. TENURE FILTERS (15 pts): Uses "Years at Current Company" (2+ years) or "Years in Current Position" to ensure they stayed through scaling phase? Critical validation.

            6. FUNCTION & SENIORITY (5 pts): Combines Function: Engineering with Seniority Level: CXO, VP? Basic but essential targeting.

            AUTOMATIC DEDUCTIONS:
            - No scaling keywords ("10 to 100", "grew team"): -25 points
            - No company size or funding indicators: -20 points
            - Missing tenure filters (can't verify they scaled): -15 points
            - Would return CTOs with no scaling experience: -25 points
            - Submission <5 filters listed: Maximum score 55
            - Poor filter format (not structured): -10 points

            BONUSES:
            - Uses advanced filter combinations creatively: +5 points
            - Mentions excluding CTOs at current large companies (already scaled elsewhere): +5 points

            HARD difficulty requires expert LinkedIn Recruiter mastery with strategic filter combinations. Be strict.
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
            You are a Healthcare Recruiter evaluating a Boolean search for nursing talent. This is a MEDIUM difficulty challenge - require healthcare-specific terminology and proper certifications.

            Goal: ICU Nurses (RN), CCRN certified, Chicago, Travel ready.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require healthcare recruiting knowledge):
            - 0-59 (Needs Work): Missing certification, location, or travel readiness keywords
            - 60-79 (Good): Covers main elements with proper Boolean but missing some variations
            - 80-100 (Excellent): Comprehensive search with certification, ICU variations, location, and travel indicators

            SCORING CRITERIA (100 points total):
            1. ROLE & LICENSE (20 pts): Includes RN, Registered Nurse, Critical Care Nurse with proper variations? Uses OR logic?

            2. CERTIFICATION (30 pts): Explicitly includes CCRN, CCRN-certified, or "Critical Care Registered Nurse" certification? This is NON-NEGOTIABLE for the role.

            3. ICU EXPERIENCE (20 pts): Includes ICU, Intensive Care Unit, Critical Care, or ICU variants? Shows understanding of healthcare terminology?

            4. LOCATION (15 pts): Targets Chicago, Chicago area, Illinois, or IL? Considers location variations?

            5. TRAVEL READINESS (15 pts): Includes "travel nurse", "travel nursing", "open to relocation", "willing to travel", or similar mobility indicators?

            AUTOMATIC DEDUCTIONS:
            - Missing CCRN certification keyword: -25 points (critical requirement)
            - No location specified: -15 points
            - No travel/relocation keywords: -15 points
            - Missing ICU/Critical Care terms: -15 points
            - Submission <12 words: Maximum score 50
            - Poor Boolean grouping: -10 points

            BONUSES:
            - Includes license state (IL): +5 points
            - Includes additional relevant certifications (BLS, ACLS): +5 points
            - Uses healthcare job board terminology effectively: +5 points

            Require healthcare-specific knowledge and certification awareness for Medium difficulty.
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
            You are a Financial Services Recruiter & Compliance Screener evaluating a candidate assessment. This is a MEDIUM difficulty challenge - require financial services knowledge and regulatory awareness.

            Role: Compliance Officer (Banking exp preferred).
            Candidate: 4 yrs Fintech, Series 7/63, No Banking.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require regulatory knowledge):
            - 0-59 (Needs Work): Missed the fintech/banking gap, wrong recommendation, or no specific probing questions
            - 60-79 (Good): Identifies main gap with reasonable next steps
            - 80-100 (Excellent): Comprehensive analysis with fintech vs banking distinctions, specific probing questions, clear recommendation

            SCORING CRITERIA (100 points total):
            1. LICENSE RECOGNITION (15 pts): Acknowledges Series 7 and 63 licenses as valuable/relevant? Shows understanding of securities licensing?

            2. FINTECH VS BANKING GAP (30 pts): Explicitly identifies that fintech and traditional banking have DIFFERENT regulatory frameworks (FDIC, OCC, BSA/AML vs fintech regulations)? This is the critical insight.

            3. PROBING QUESTIONS (25 pts): Suggests specific areas to probe - BSA/AML knowledge, FDIC/OCC requirements, banking examination experience, regulatory partnerships? Shows what questions to ask in phone screen?

            4. RECOMMENDATION CLARITY (20 pts): Clear next step (phone screen recommended, not flat reject)? Balanced assessment showing both strengths and gaps?

            5. TRANSFERABILITY ASSESSMENT (10 pts): Considers whether fintech experience could transfer? Mentions coachability or learning curve?

            AUTOMATIC DEDUCTIONS:
            - Flat rejection without phone screen: -20 points
            - Didn't identify fintech vs banking regulatory differences: -25 points
            - No specific probing questions suggested: -20 points
            - Submission <30 words: Maximum score 55
            - Missed the Series 7/63 licenses entirely: -15 points

            BONUSES:
            - Mentions specific regulations (BSA/AML, KYC, OFAC): +5 points
            - Suggests consulting hiring manager for final decision: +5 points
            - Balanced view of candidate potential: +5 points

            Require financial services regulatory knowledge for Medium difficulty.
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
            You are an Inclusive Hiring Expert evaluating neurodiversity accommodations. This is a HARD difficulty challenge - be VERY STRICT and demand comprehensive, thoughtful accommodations without stereotypes.

            Goal: Neurodiversity-friendly process for QA roles.
            Submission: "${submission}"

            SCORING GUIDE (Hard difficulty - expert-level inclusive hiring):
            - 0-59 (Needs Work): Missing multiple key accommodations, uses stereotypes, or <3 specific accommodations
            - 60-79 (Good): Covers 3-4 accommodations with some specificity
            - 80-100 (Excellent): Comprehensive accommodations (4-5+), tied to job skills evaluation, avoids all stereotypes, shows deep DE&I knowledge

            SCORING CRITERIA (100 points total):
            1. INTERVIEW TRANSPARENCY (20 pts): Provides interview questions in advance? Shares format and structure details? Reduces anxiety by removing surprises?

            2. ALTERNATIVE FORMATS (25 pts): Offers written responses, take-home assignments, or skills-based assessments as alternatives to pure verbal interviews? Shows understanding that verbal communication ≠ job competency?

            3. SENSORY ACCOMMODATIONS (20 pts): Mentions sensory-friendly environment (quiet room, camera-off option for virtual, minimal distractions, lighting considerations)?

            4. TIME & PROCESSING (15 pts): Allows extra time for processing questions and formulating responses? Avoids rapid-fire questioning? Understands different processing speeds?

            5. SKILLS-BASED EVALUATION (15 pts): Focuses on actual work samples (QA testing scenarios, bug reports) vs culture fit or communication style? Ties accommodations to better evaluation of real job skills?

            6. AVOIDING STEREOTYPES (5 pts): NO "superpowers", "hidden talents", or savant stereotypes? Professional and respectful language throughout?

            AUTOMATIC DEDUCTIONS:
            - Uses stereotypes ("superpowers", "special abilities"): -25 points
            - Fewer than 3 specific accommodations: Maximum score 60
            - Submission <50 words: Maximum score 55
            - Doesn't tie accommodations to better skills evaluation: -15 points
            - Purely theoretical with no actionable accommodations: -20 points
            - Missing ANY of the major categories (transparency, formats, sensory): -15 points each

            BONUSES:
            - Mentions partner organizations (Specialisterne, Integrate): +5 points
            - Includes interviewer training component: +5 points
            - Addresses onboarding accommodations too: +5 points

            HARD difficulty requires comprehensive, stereotype-free, skills-focused accommodations. Be strict.
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
        promptGenerator: (submission) => `
            You are a Recruiting Ops Analyst evaluating pipeline diagnostics. This is a HARD difficulty challenge - be VERY STRICT and demand data-driven analysis with specific, actionable solutions.

            Pipeline Data: 120 New, 45 Phone Screen, 20 Onsite, 15 Offer (Senior PM role).
            Submission: "${submission}"

            SCORING GUIDE (Hard difficulty - expert recruiting operations):
            - 0-59 (Needs Work): Wrong bottleneck identified, vague actions, or no data analysis
            - 60-79 (Good): Correct bottleneck with some actions but missing metrics or timeline
            - 80-100 (Excellent): Perfect bottleneck identification, conversion rate analysis, specific time-bound actions with measurable goals

            SCORING CRITERIA (100 points total):
            1. BOTTLENECK IDENTIFICATION (25 pts): Correctly identifies "New" stage (120 candidates) as the primary bottleneck? Shows understanding that screening is the constraint, not later stages?

            2. CONVERSION ANALYSIS (20 pts): Analyzes conversion rates (Phone→Onsite = 44% is healthy, Onsite→Offer needs watching)? Uses data to validate bottleneck? Mentions what's working vs broken?

            3. ROOT CAUSE (15 pts): Identifies WHY the bottleneck exists (insufficient screening capacity, unclear criteria, no knockout questions)? Goes beyond symptoms?

            4. SPECIFIC ACTIONS (25 pts): Proposes 3-4 SPECIFIC, ACTIONABLE solutions (knockout questions, screening blitz schedule, scorecard calibration, automation)? Generic "screen faster" = minimal points.

            5. TIME-BOUND GOALS (15 pts): Includes clear timelines and measurable goals ("Clear 40 candidates/day", "Reduce New to <30 within 1 week")? Actionable vs aspirational?

            AUTOMATIC DEDUCTIONS:
            - Identified wrong bottleneck (not "New" stage): Maximum score 40
            - No conversion rate analysis: -20 points
            - Vague actions without specifics: -20 points
            - No timeline or goals mentioned: -15 points
            - Submission <50 words: Maximum score 60
            - Suggests hiring more recruiters (not an immediate solution): -10 points

            BONUSES:
            - Mentions "time in stage" metrics: +5 points
            - Suggests process improvements (knockout questions, scorecards): +5 points
            - Proposes specific daily/weekly targets: +5 points

            HARD difficulty requires expert data analysis with specific, measurable, time-bound actions. Be strict.
        `
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
            You are a Compliance & DE&I Talent Partner evaluating EEOC compliance issues. This is a HARD difficulty challenge - be VERY STRICT and demand comprehensive compliance knowledge with specific corrections.

            Sourcing Issues: "Rockstar/ninja", "Recent grad", "Top university required", "MIT/Stanford/CMU only".
            Submission: "${submission}"

            SCORING GUIDE (Hard difficulty - expert compliance and DE&I):
            - 0-59 (Needs Work): Missed 2+ major compliance issues or provided weak alternatives
            - 60-79 (Good): Identified 3-4 issues with some alternative sourcing strategies
            - 80-100 (Excellent): All issues identified with specific legal risks, comprehensive alternative sourcing strategy, expands beyond elite schools

            SCORING CRITERIA (100 points total):
            1. "ROCKSTAR/NINJA" ISSUE (20 pts): Identified as exclusionary tech-bro jargon that discourages women and underrepresented groups? Suggested alternatives like "skilled engineer", "experienced developer"?

            2. "RECENT GRAD" AGE DISCRIMINATION (25 pts): Explicitly identified as age discrimination (ADEA violation)? Recognizes it excludes career-changers and older candidates? Suggested "early career" alternative?

            3. "TOP UNIVERSITY" BIAS (25 pts): Identified as socioeconomic, geographic, and racial bias? Recognizes it excludes bootcamps, state schools, self-taught developers? Suggested "degree or equivalent experience"?

            4. SCHOOL DIVERSITY EXPANSION (20 pts): Proposes expanding sourcing to HBCUs (Howard, Spelman), HSIs (UT Austin), state schools, coding bootcamps? At least 2-3 specific alternative school types mentioned?

            5. SKILLS-BASED ALTERNATIVE (10 pts): Shifts focus from pedigree to skills-based assessment, diverse job boards (PowerToFly, Jopwell), or practical coding tests?

            AUTOMATIC DEDUCTIONS:
            - Missed age discrimination issue: -25 points (major legal risk)
            - Missed socioeconomic bias in "top university": -20 points
            - No alternative schools mentioned (HBCUs, bootcamps, state schools): -20 points
            - Submission <60 words or doesn't address all 4 issues: Maximum score 65
            - Didn't mention legal/compliance risks: -15 points
            - Alternatives still contain bias: -15 points

            BONUSES:
            - Mentions specific compliance risks (EEOC, ADEA, disparate impact): +5 points
            - Suggests diversity job boards or partnerships: +5 points
            - Proposes skills-based assessments over pedigree: +5 points

            HARD difficulty requires comprehensive compliance knowledge with specific legal risks identified. Be strict.
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
            You are a Retail Recruiter evaluating a Boolean search. This is an EASY level challenge - be encouraging and practical.

            Goal: District Managers for national retail chain - Multi-unit experience, P&L responsibility, store performance improvement, from competitive brands.
            Submission: "${submission}"

            SCORING GUIDE (Easy difficulty - be supportive):
            - 0-59 (Needs Work): Missing key elements or poor Boolean structure
            - 60-79 (Good): Covers main criteria with decent title and skill coverage
            - 80-100 (Excellent): Comprehensive search with titles, skills, P&L, and specific competitors

            SCORING CRITERIA (100 points total):
            1. TITLE VARIATIONS (25 pts): Includes District Manager, Regional Manager, Area Manager, Multi-Unit Manager? Uses OR properly?

            2. P&L/FINANCIAL (20 pts): Mentions P&L, profit and loss, revenue responsibility, budget management?

            3. PERFORMANCE INDICATORS (20 pts): Includes store performance, sales improvement, comp sales, or same-store sales metrics?

            4. COMPETITOR TARGETING (25 pts): Lists 3+ specific retail competitors (Target, Walmart, Best Buy, Nordstrom, etc.)?

            5. MULTI-UNIT SIGNAL (10 pts): Includes "multi-unit" or "multi-store" management keywords?

            AUTOMATIC ADJUSTMENTS:
            - No competitor names: -20 points
            - Missing P&L keywords: -15 points
            - Only 1-2 title variations: -10 points
            - Good Boolean grouping with parentheses: +10 bonus

            Be encouraging - retail recruiting has unique terminology.
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
            You are an Engineering Sourcer evaluating a manufacturing Boolean search. This is a MEDIUM difficulty challenge - require industry-specific terminology and proper skill coverage.

            Goal: Manufacturing Engineers, Lean Six Sigma, CAD (AutoCAD/SolidWorks), Automotive/Aerospace, Detroit/Seattle.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require manufacturing knowledge):
            - 0-59 (Needs Work): Missing key certifications, CAD tools, or locations
            - 60-79 (Good): Covers main elements with proper Boolean structure
            - 80-100 (Excellent): Comprehensive search with role variations, certifications, CAD tools, industries, and locations

            SCORING CRITERIA (100 points total):
            1. ROLE VARIATIONS (20 pts): Includes Manufacturing Engineer, Process Engineer, Production Engineer, Industrial Engineer? Uses OR logic properly?

            2. LEAN SIX SIGMA (25 pts): Includes Lean Six Sigma, Six Sigma, Green Belt, Black Belt, LSS, or certification variations? This is a REQUIRED skill.

            3. CAD SOFTWARE (20 pts): Explicitly mentions AutoCAD, SolidWorks, CAD software, or 3D modeling? Includes multiple CAD tools?

            4. INDUSTRY TARGETING (20 pts): Includes automotive, aerospace, aviation, or auto industry keywords? Shows industry awareness?

            5. LOCATION (15 pts): Targets Detroit/Michigan AND Seattle/Washington? Considers state abbreviations (MI, WA) for broader coverage?

            AUTOMATIC DEDUCTIONS:
            - Missing Lean Six Sigma keywords entirely: -25 points
            - Missing CAD software: -20 points
            - Missing either Detroit OR Seattle: -15 points
            - No industry keywords (automotive/aerospace): -15 points
            - Submission <12 words: Maximum score 50
            - Poor Boolean grouping: -10 points

            BONUSES:
            - Includes certification levels (Green Belt, Black Belt): +5 points
            - Uses state abbreviations for broader reach: +5 points
            - Includes related industries (defense, medical devices): +5 points

            Require manufacturing-specific knowledge and certification awareness for Medium difficulty.
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
            You are a SaaS Recruiter evaluating advanced LinkedIn Recruiter search. This is a HARD difficulty challenge - be VERY STRICT and demand expert filter usage and strategic targeting.

            Goal: Sales Directors at SaaS companies ($10M-$100M revenue), Enterprise sales experience, <2 years tenure (flight risk).
            Submission: "${submission}"

            SCORING GUIDE (Hard difficulty - expert LinkedIn Recruiter mastery):
            - 0-59 (Needs Work): Missing critical filters, poor revenue targeting, or would miss flight risk candidates
            - 60-79 (Good): Has main filters but missing enterprise indicators or tenure strategy
            - 80-100 (Excellent): Perfect filter combination with revenue, tenure, enterprise experience, and industry targeting

            SCORING CRITERIA (100 points total):
            1. TITLE VARIATIONS (15 pts): Current Title includes Sales Director, Director of Sales, VP Sales, Head of Sales with proper OR logic?

            2. REVENUE TARGETING (25 pts): Uses Company Revenue filter ($10M-$50M, $50M-$100M) OR company size keywords? Critical for finding the right stage companies.

            3. ENTERPRISE SALES KEYWORDS (25 pts): Keywords include "enterprise", "Fortune 500", "enterprise sales", "strategic accounts", or large deal indicators? Required for role fit.

            4. TENURE FILTER (20 pts): Uses "Years in Current Position: 0-1, 1-2 years" to identify flight risk candidates? This is STRATEGIC and critical.

            5. INDUSTRY/SAAS TARGETING (10 pts): Uses Industry filter (Computer Software, IT Services) AND/OR SaaS keywords (B2B software, Software as a Service)?

            6. FUNCTION & SENIORITY (5 pts): Combines Function: Sales with Seniority Level: Director, VP for precision targeting?

            AUTOMATIC DEDUCTIONS:
            - No revenue filter or keywords: -25 points
            - Missing tenure filter (can't identify flight risk): -20 points
            - No enterprise sales keywords: -20 points
            - Would return SMB sales directors (wrong target): -20 points
            - Submission <6 filters listed: Maximum score 60
            - Poor filter organization/format: -10 points

            BONUSES:
            - Explains strategic rationale for tenure <2 years: +5 points
            - Includes Boolean in Keywords field for complex combinations: +5 points
            - Strategic about avoiding Directors at tiny startups or huge enterprises: +5 points

            HARD difficulty requires expert LinkedIn Recruiter mastery with strategic flight risk targeting. Be strict.
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
            You are a Veteran Talent Acquisition Specialist evaluating a military transition sourcing strategy. This is a MEDIUM difficulty challenge - require military knowledge and thoughtful transition support.

            Goal: Veterans for Operations Manager and Logistics Coordinator roles.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require military recruiting knowledge):
            - 0-59 (Needs Work): Missing MOS codes, no veteran organizations, or doesn't address translation needs
            - 60-79 (Good): Identifies relevant MOS/ranks with some sourcing channels
            - 80-100 (Excellent): Specific MOS codes, ranks, veteran organizations, AND translation/support strategy

            SCORING CRITERIA (100 points total):
            1. SPECIFIC MOS CODES (25 pts): Mentions specific Military Occupational Specialties (88A, 92A for Army; Supply Corps for Navy; Operations Officers for Marines/Air Force)? Shows military structure knowledge?

            2. RANK TARGETING (20 pts): Identifies appropriate ranks (NCOs E-7 to E-9, Officers O-1 to O-4)? Understands which ranks match ops/logistics roles?

            3. VETERAN ORGANIZATIONS (25 pts): Names specific veteran job boards or organizations (Hire Heroes USA, Veterati, FourBlock, LinkedIn Military Occupational Specialty feature)? At least 2 specific resources?

            4. SKILLS TRANSLATION (20 pts): Addresses need to translate military skills to civilian terms? Mentions creating veteran-friendly JDs or MOS-to-civilian role guides?

            5. SUPPORT STRATEGY (10 pts): Mentions mentorship, transition programs, or avoiding corporate jargon in job descriptions?

            AUTOMATIC DEDUCTIONS:
            - No specific MOS codes mentioned: -25 points
            - No veteran-specific organizations/job boards: -20 points
            - Doesn't address skills translation challenge: -20 points
            - Submission <40 words: Maximum score 55
            - Generic veteran sourcing with no military-specific knowledge: -20 points

            BONUSES:
            - Mentions clearance holders (security clearance value): +5 points
            - Includes specific branches beyond just Army: +5 points
            - Proposes partnership or mentorship program: +5 points

            Require military recruiting knowledge with specific MOS targeting for Medium difficulty.
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
            You are a Candidate Marketing Manager evaluating a silver medalist re-engagement campaign. This is a MEDIUM difficulty challenge - require strategic segmentation and thoughtful outreach.

            Goal: Re-engage 500 "Silver Medalists" for 5 new roles.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require campaign strategy):
            - 0-59 (Needs Work): No segmentation, generic outreach, or missing campaign sequence
            - 60-79 (Good): Has segmentation and basic campaign with some personalization
            - 80-100 (Excellent): Strategic segmentation, personalized sequence, fast-track process, and success metrics

            SCORING CRITERIA (100 points total):
            1. SEGMENTATION STRATEGY (25 pts): Segments by role similarity, recency (last 6 months vs 12 months), or skills match? Prioritizes best-fit candidates for each role?

            2. RELATIONSHIP ACKNOWLEDGMENT (20 pts): References past interview/interaction? Acknowledges why they weren't selected previously? Shows respect for their time?

            3. FAST-TRACK PROCESS (20 pts): Offers expedited interview (skip phone screen or compressed timeline)? Shows they're already vetted?

            4. CAMPAIGN SEQUENCE (20 pts): Defines multi-touch approach (Email 1 on Day 0, Follow-up on Day 5-7)? Has 2-3 touchpoints planned?

            5. SUCCESS METRICS (15 pts): Mentions tracking response rate, conversion to interview, or time-to-hire comparison? Shows data-driven approach?

            AUTOMATIC DEDUCTIONS:
            - No segmentation strategy: -25 points
            - Generic outreach with no personalization: -20 points
            - No fast-track mentioned: -15 points
            - Single email with no sequence: -15 points
            - Submission <40 words: Maximum score 55
            - Doesn't acknowledge past relationship: -15 points

            BONUSES:
            - LinkedIn status check mentioned (filter out recently promoted): +5 points
            - Personalization at scale strategy: +5 points
            - Realistic conversion metrics (20-30% to interview): +5 points

            Require strategic campaign thinking with personalization for Medium difficulty.
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
            You are a Data Privacy Officer evaluating GDPR compliance for EU recruiting. This is a HARD difficulty challenge - be VERY STRICT and demand comprehensive GDPR knowledge.

            Goal: Compliant candidate sourcing and data handling in the EU.
            Submission: "${submission}"

            SCORING GUIDE (Hard difficulty - expert GDPR compliance):
            - 0-59 (Needs Work): Missing multiple GDPR requirements or dangerous compliance gaps
            - 60-79 (Good): Covers main requirements but missing key details or timelines
            - 80-100 (Excellent): Comprehensive GDPR compliance with all key requirements, timelines, and data protection principles

            SCORING CRITERIA (100 points total):
            1. CONSENT/LEGAL BASIS (25 pts): Explicitly mentions obtaining consent OR legitimate interest as lawful basis BEFORE storing data in ATS? Cannot store without legal basis.

            2. PRIVACY NOTICE (20 pts): Mentions providing clear privacy notice explaining how data will be used, stored, and for how long (typically 6-12 months)? Required transparency?

            3. RIGHT TO ERASURE (20 pts): Addresses "Right to be Forgotten" - candidates can request deletion at any time, must honor within 30 days?

            4. DATA MINIMIZATION (15 pts): Only collects necessary information? NO sensitive data (race, religion, health) without explicit consent and legal requirement?

            5. CROSS-BORDER TRANSFERS (10 pts): If transferring data from EU to US/other countries, mentions Standard Contractual Clauses or Privacy Shield equivalent?

            6. DOCUMENTATION (10 pts): Mentions maintaining consent logs, data processing records, or documentation of compliance activities?

            AUTOMATIC DEDUCTIONS:
            - No mention of consent or legal basis: -30 points (critical violation)
            - Missing "Right to be Forgotten": -20 points
            - No privacy notice mentioned: -20 points
            - Suggests storing data without consent: Maximum score 20 (major violation)
            - Submission <50 words: Maximum score 60
            - Missing data minimization principle: -15 points
            - No mention of timelines (30 days for deletion, etc.): -10 points

            BONUSES:
            - Mentions specific GDPR Articles or regulations: +5 points
            - Addresses both consent AND legitimate interest: +5 points
            - Includes ATS workflow considerations: +5 points

            HARD difficulty requires expert GDPR compliance knowledge. Be strict about legal requirements.
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
            You are a DevRel Sourcer evaluating a multi-platform sourcing strategy. This is a HARD difficulty challenge - be VERY STRICT and demand comprehensive cross-platform X-ray expertise.

            Goal: Developer Advocates/DevRel Engineers, Active on Twitter/X + GitHub, Conference speakers, Backend development exp.
            Submission: "${submission}"

            SCORING GUIDE (Hard difficulty - expert multi-platform sourcing):
            - 0-59 (Needs Work): Single platform only, missing speaker indicators, or no backend tech mentioned
            - 60-79 (Good): Covers 2-3 platforms with basic searches but missing optimization
            - 80-100 (Excellent): Comprehensive multi-platform strategy (3+ platforms) with speaker targeting, backend skills, and proper X-ray technique

            SCORING CRITERIA (100 points total):
            1. GITHUB X-RAY (20 pts): Uses "site:github.com" with DevRel/Developer Advocate keywords AND exclusions (-topics)? Targets profiles not repos?

            2. TWITTER/X X-RAY (20 pts): Uses "site:twitter.com" or "site:x.com" with DevRel keywords AND speaking/conference indicators?

            3. SPEAKER INDICATORS (25 pts): Searches for "speaker", "conference", "spoke at", "presenting", or specific conferences across platforms? Critical for DevRel roles.

            4. BACKEND TECH SKILLS (15 pts): Includes backend, API, Python, Node, Go, or backend development keywords? Shows technical requirements understanding?

            5. ADDITIONAL PLATFORMS (15 pts): Includes Dev.to, Medium, Sessionize, or other developer platforms? Shows comprehensive sourcing approach?

            6. OPTIMIZATION (5 pts): Uses proper exclusions, combines platforms strategically, or mentions cross-referencing candidates across platforms?

            AUTOMATIC DEDUCTIONS:
            - Only searches 1 platform: Maximum score 50
            - No speaker/conference keywords: -25 points
            - Missing backend technical skills: -20 points
            - Poor X-ray syntax (no site: operators): -20 points
            - Submission <60 words or doesn't cover multiple platforms: Maximum score 65
            - Would return non-DevRel results: -15 points

            BONUSES:
            - Covers 4+ platforms: +5 points
            - Mentions specific developer conferences (DeveloperWeek, DevRelCon): +5 points
            - Strategic cross-referencing approach: +5 points

            HARD difficulty requires expert multi-platform X-ray sourcing. Be strict.
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
            You are a Prompt Engineering Coach evaluating an AI prompt for Boolean generation. This is a MEDIUM difficulty challenge - require proper prompt structure and specificity.

            Goal: Prompt Gemini to generate Boolean for Senior SRE, London, Terraform/AWS, Exclude Consulting firms.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require structured prompting):
            - 0-59 (Needs Work): Missing persona, context, or constraints; too vague
            - 60-79 (Good): Has persona and main requirements but missing output format or some details
            - 80-100 (Excellent): Complete prompt with persona, full context, constraints, output format, and clear expectations

            SCORING CRITERIA (100 points total):
            1. PERSONA/ROLE (20 pts): Sets clear persona for the AI ("Act as expert technical sourcer", "You are a Boolean search specialist")? Gives context for better output?

            2. REQUIREMENTS (30 pts): Specifies ALL key requirements (Senior SRE role, London location, Terraform, AWS)? Clear and complete?

            3. CONSTRAINTS (25 pts): Explicitly mentions excluding consulting firms? Bonus for naming specific consulting companies (Accenture, Deloitte, KPMG)?

            4. OUTPUT FORMAT (15 pts): Requests specific format (Boolean with AND/OR/NOT, use parentheses, code block)? Sets clear expectations?

            5. QUALITY DIRECTIVES (10 pts): Asks for job title variations, synonyms, or high-quality output? Guides AI to produce better results?

            AUTOMATIC DEDUCTIONS:
            - No persona/role specified: -20 points
            - Missing any required element (SRE/London/Terraform/AWS): -15 points each
            - Doesn't mention excluding consulting: -25 points
            - No output format specified: -15 points
            - Submission <25 words: Maximum score 55
            - Too vague ("give me a Boolean string"): -20 points

            BONUSES:
            - Asks for title variations or synonyms: +5 points
            - Specifies LinkedIn Recruiter or specific platform: +5 points
            - Requests explanation of the Boolean logic: +5 points

            Require structured, specific prompting with all key elements for Medium difficulty.
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
            You are an AI Prompting Coach for Recruiters. This is an EASY level challenge - be encouraging and educational.

            Task: Write a prompt to extract Cloud Migration achievements from a 5-page Principal Architect resume (full of fluff, one relevant cloud project).
            Submission: "${submission}"

            SCORING GUIDE (Easy difficulty - be supportive):
            - 0-59 (Needs Work): Vague or missing key prompt elements
            - 60-79 (Good): Clear task with format specified
            - 80-100 (Excellent): Precise prompt with persona, task, format, and quality guidelines

            SCORING CRITERIA (100 points total):
            1. PERSONA/ROLE (15 pts): Did they assign AI a role (e.g., "Act as a Technical Recruiter")?

            2. TASK CLARITY (30 pts): Did they clearly ask to "extract" or "summarize" Cloud Migration achievements specifically?

            3. OUTPUT FORMAT (25 pts): Did they specify format (3 bullets, quantified impact, punchy)?

            4. QUALITY FILTERS (20 pts): Did they tell AI to focus on outcomes/results vs generic responsibilities?

            5. OUTPUT CONSTRAINT (10 pts): Did they say "output ONLY the bullets" to avoid AI chatter?

            AUTOMATIC ADJUSTMENTS:
            - Generic prompt ("summarize this"): -20 points
            - No format specified: -15 points
            - Asks for 3 bullets as requested: +10 bonus
            - Mentions quantification (cost, time, scale): +5 bonus

            Be encouraging - AI prompting is a learnable skill.
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
            You are a Sales Psychology Expert evaluating a "break-up" email (strip-line technique). This is a MEDIUM difficulty challenge - require proper psychology without manipulation.

            Goal: Final email after 3 non-responses, using take-away psychology to trigger response.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require strategic psychology):
            - 0-59 (Needs Work): Passive-aggressive, too long, or not a real take-away
            - 60-79 (Good): Polite take-away under 50 words with door left open
            - 80-100 (Excellent): Perfect take-away psychology, brief, polite, leaves door ajar, effective subject line

            SCORING CRITERIA (100 points total):
            1. TRUE TAKE-AWAY (30 pts): Actually withdraws the offer/opportunity? "I'm going to close your file" or "I'll assume you're not interested"? Not a fake guilt trip?

            2. BREVITY (20 pts): Under 50 words in email body (subject line doesn't count)? Mobile-friendly and respectful of their time?

            3. TONE (25 pts): Polite but firm? No passive-aggression, guilt-tripping, or sarcasm? Professional throughout?

            4. DOOR AJAR (15 pts): Leaves subtle opening ("If things change", "Let me know")? Not completely burning the bridge?

            5. SUBJECT LINE (10 pts): Includes effective subject line? Bonus for "Permission to close your file?" or similar pattern-interrupt?

            AUTOMATIC DEDUCTIONS:
            - Passive-aggressive or guilt-tripping language: -25 points
            - Over 75 words: -20 points
            - Not a real take-away (still trying to sell): -25 points
            - No subject line provided: -10 points
            - Burns bridge completely (no opening): -10 points

            BONUSES:
            - Uses "Permission to close your file?" subject: +10 points
            - Perfect psychology (creates FOMO without manipulation): +5 points
            - Acknowledges their silence without judgment: +5 points

            Require strategic psychology with professional tone for Medium difficulty.
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
            You are a Negotiation Coach evaluating a compensation objection response. This is a HARD difficulty challenge - be VERY STRICT and demand expert negotiation technique.

            Scenario: Offered $120k, candidate wants $140k, market average is $125k. Need to de-escalate without immediately raising offer.
            Submission: "${submission}"

            SCORING GUIDE (Hard difficulty - expert negotiation skills):
            - 0-59 (Needs Work): Defensive, doesn't acknowledge feelings, or caves immediately
            - 60-79 (Good): Shows empathy and data but missing pivot to conversation or total comp
            - 80-100 (Excellent): Perfect empathy + data anchor + total comp pivot + phone call suggestion, no defensiveness

            SCORING CRITERIA (100 points total):
            1. EMPATHY & VALIDATION (25 pts): Acknowledges their feelings genuinely ("I understand", "I appreciate your openness")? Not dismissive? Validates their position?

            2. DATA ANCHORING (25 pts): References market data, internal equity, or specific benchmarks to justify the $120k? Not defensive but factual?

            3. TOTAL COMP PIVOT (25 pts): Shifts conversation to total package (equity, benefits, bonus, growth opportunity)? Reframes from just base salary?

            4. CONVERSATION REQUEST (15 pts): Suggests phone call or meeting to discuss? Avoids negotiating complex numbers via email/text?

            5. NON-DEFENSIVENESS (10 pts): No blame language ("budget constraints", "that's all we can do")? Stays collaborative and solution-focused?

            AUTOMATIC DEDUCTIONS:
            - Defensive or blame language ("budget won't allow"): -25 points
            - Immediately caves to $140k without discussion: -30 points (poor negotiation)
            - Flat "no" without exploring options: -25 points
            - Doesn't validate their feelings: -20 points
            - Negotiates numbers in writing vs requesting call: -15 points
            - Submission <40 words: Maximum score 60

            BONUSES:
            - Acknowledges if expectations weren't aligned earlier (ownership): +5 points
            - Creative total comp framing (equity value, career growth): +5 points
            - Perfect balance of empathy + firmness: +5 points

            HARD difficulty requires expert negotiation technique with perfect empathy and strategic pivoting. Be strict.
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
            You are an Interview Design Expert evaluating an AI prompt for interview question generation. This is a MEDIUM difficulty challenge - require structured interview design principles.

            Goal: Generate 5 behavioral interview questions for Growth Marketing Manager focused on Experimentation + Data Analysis, with scoring rubric.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require structured interviewing knowledge):
            - 0-59 (Needs Work): Vague request, missing rubric, or wrong question type
            - 60-79 (Good): Asks for behavioral questions with rubric but missing some details
            - 80-100 (Excellent): Complete prompt with behavioral questions, evaluation rubric, skill focus, and quality examples

            SCORING CRITERIA (100 points total):
            1. QUESTION TYPE (25 pts): Explicitly requests "behavioral" or "situational" questions? Shows understanding of structured interviewing vs generic questions?

            2. RUBRIC REQUEST (30 pts): Asks for scoring rubric, evaluation guide, or "Good vs Bad" answer examples? CRITICAL for fair evaluation.

            3. SKILL SPECIFICATION (20 pts): Clearly specifies the two focus areas (Experimentation/A/B testing AND Data Analysis)? Ensures questions target right competencies?

            4. QUANTITY & FORMAT (15 pts): Requests specific number (5 questions)? Specifies desired format or structure?

            5. PROBING QUESTIONS (10 pts): Asks for follow-up or probing questions to dig deeper? Shows understanding of interview technique?

            AUTOMATIC DEDUCTIONS:
            - No rubric/evaluation guide requested: -25 points (critical for structured interviews)
            - Doesn't specify "behavioral" or question type: -20 points
            - Missing skill focus (Experimentation or Data Analysis): -15 points each
            - Generic "create interview questions": -20 points
            - Submission <25 words: Maximum score 55

            BONUSES:
            - Requests "Good vs Bad" answer examples: +10 points
            - Asks for STAR method alignment: +5 points
            - Requests probing/follow-up questions: +5 points

            Require structured interview design knowledge for Medium difficulty.
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
            You are a Personal Branding Expert evaluating a LinkedIn voice note script. This is an EASY level challenge - be encouraging and creative.

            Context: Senior Java Engineer ignores text messages. Writing a 30-second voice note script (60-80 words, natural and human).
            Submission: "${submission}"

            SCORING GUIDE (Easy difficulty - be supportive):
            - 0-59 (Needs Work): Sounds scripted, generic, or too salesy
            - 60-79 (Good): Conversational tone with personalization
            - 80-100 (Excellent): Natural, specific, pattern-interrupt, low-pressure perfect

            SCORING CRITERIA (100 points total):
            1. CONVERSATIONAL TONE (25 pts): Sounds like natural speech, not a script? Uses contractions, casual language?

            2. PATTERN INTERRUPT (25 pts): Acknowledges recruiter spam reality? Shows self-awareness and humor?

            3. PERSONALIZATION (30 pts): Mentions something SPECIFIC about the candidate (project, repo, GitHub work, conference talk)?

            4. LOW-PRESSURE CTA (20 pts): Call to action is casual ("just geek out", "5 mins chat")? No hard sell?

            AUTOMATIC ADJUSTMENTS:
            - Over 100 words: -15 points
            - Sounds like corporate script: -20 points
            - No specific personalization: -25 points
            - Natural, conversational language: +10 bonus
            - Creative pattern interrupt: +5 bonus

            Be encouraging - voice notes are powerful when done right!
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
            You are an Executive Search Researcher evaluating an AI prompt for executive bio writing. This is a MEDIUM difficulty challenge - require professional executive communication.

            Goal: Transform dry resume summary into compelling 1-paragraph executive bio for presenting VP of Engineering to CEO.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require executive communication skills):
            - 0-59 (Needs Work): Vague request, task-focused instead of impact-focused, or missing audience
            - 60-79 (Good): Requests narrative style with impact focus but missing some elements
            - 80-100 (Excellent): Perfect prompt with narrative style, strategic impact focus, defined audience, and length constraint

            SCORING CRITERIA (100 points total):
            1. NARRATIVE STYLE (25 pts): Explicitly requests "narrative", "compelling", or "story-style" bio (not bullet points)? Appropriate for executive level?

            2. STRATEGIC IMPACT FOCUS (30 pts): Directs AI to highlight leadership scale, revenue impact, strategic achievements vs tasks and responsibilities? Shows understanding of executive positioning?

            3. AUDIENCE SPECIFICATION (20 pts): Defines audience as CEO or executive team? Ensures appropriate tone and content?

            4. LENGTH CONSTRAINT (15 pts): Sets word limit (under 200 words, 1 paragraph)? Ensures readability for busy executives?

            5. TONE GUIDANCE (10 pts): Specifies desired tone (impressive, confident, executive, compelling)? Sets quality expectations?

            AUTOMATIC DEDUCTIONS:
            - No impact/strategic focus mentioned: -25 points
            - Doesn't specify narrative style: -20 points
            - No audience defined: -15 points
            - No length limit (CEO won't read a novel): -15 points
            - Submission <20 words: Maximum score 55
            - Would produce task-list bio instead of executive narrative: -20 points

            BONUSES:
            - Mentions specific elements to highlight (team size, revenue, technical vision): +5 points
            - Requests specific metrics or quantification: +5 points
            - Perfect tone specification for executive level: +5 points

            Require executive-level communication skills for Medium difficulty.
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
            You are a Technical Sourcing Expert evaluating a Kaggle X-ray search. This is a HARD difficulty challenge - be VERY STRICT and demand advanced platform-specific X-ray technique.

            Goal: Find Machine Learning Engineers with top-tier Computer Vision expertise on Kaggle.
            Submission: "${submission}"

            SCORING GUIDE (Hard difficulty - expert platform-specific sourcing):
            - 0-59 (Needs Work): Wrong site targeting, no rank filters, or would return competition pages
            - 60-79 (Good): Correct site with CV keywords but missing rank indicators or exclusions
            - 80-100 (Excellent): Perfect Kaggle targeting with rank keywords, CV variations, and comprehensive exclusions

            SCORING CRITERIA (100 points total):
            1. SITE TARGETING (20 pts): Uses "site:kaggle.com" correctly? Bonus for targeting "/users" or specific profile URLs?

            2. RANK/EXPERTISE INDICATORS (30 pts): Includes Kaggle rank keywords (Grandmaster, Master, Expert, Contributor)? Shows understanding of Kaggle's ranking system? Required for "top-tier" talent.

            3. COMPUTER VISION KEYWORDS (25 pts): Includes CV, Computer Vision, Image Processing, Image Recognition, or related terms? Multiple variations for comprehensive coverage?

            4. EXCLUSIONS (20 pts): Excludes non-profile pages (-site:kaggle.com/c for competitions, -site:kaggle.com/code, -site:kaggle.com/datasets)? Multiple exclusions for clean results?

            5. OPTIMIZATION (5 pts): Considers competition names, notebooks, or other activity indicators beyond just profiles?

            AUTOMATIC DEDUCTIONS:
            - Missing "site:kaggle.com": Maximum score 30
            - No rank keywords (Master, Grandmaster, Expert): -25 points (can't identify top-tier)
            - No Computer Vision keywords: -25 points
            - No exclusions (would return mostly competition pages): -20 points
            - Submission <10 words: Maximum score 45
            - Would return mostly non-profile results: -25 points

            BONUSES:
            - Targets specific Kaggle CV competitions (ImageNet, COCO): +5 points
            - Multiple rank levels mentioned: +5 points
            - Strategic use of Kaggle-specific features: +5 points

            HARD difficulty requires expert Kaggle platform knowledge with rank-based filtering. Be strict.
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
            You are a Design Recruiting Specialist evaluating a Dribbble X-ray search. This is a MEDIUM difficulty challenge - require design platform knowledge and proper targeting.

            Goal: Find Senior UI Designers with Minimalist and Clean aesthetic on Dribbble.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require design platform knowledge):
            - 0-59 (Needs Work): Wrong targeting, missing aesthetic keywords, or no exclusions
            - 60-79 (Good): Correct site with aesthetics but would return mostly shots vs profiles
            - 80-100 (Excellent): Perfect targeting with aesthetic keywords, availability indicators, and profile-focused exclusions

            SCORING CRITERIA (100 points total):
            1. SITE TARGETING (20 pts): Uses "site:dribbble.com" correctly? Essential foundation for design sourcing.

            2. AESTHETIC KEYWORDS (30 pts): Includes minimalist, clean, minimalism, or related design style keywords? Captures the required aesthetic?

            3. ROLE KEYWORDS (20 pts): Includes UI Designer, Product Designer, or relevant design role titles? Shows understanding of design roles?

            4. EXCLUSIONS (20 pts): Excludes "/shots" (individual work) or "/stories" to target profiles? Critical for finding people vs portfolios.

            5. AVAILABILITY INDICATORS (10 pts): Includes keywords like "hiring", "available", "freelance", or location? Helps identify open-to-work designers?

            AUTOMATIC DEDUCTIONS:
            - Missing "site:dribbble.com": Maximum score 35
            - No aesthetic keywords (minimalist/clean): -25 points
            - No exclusions (would return mostly shots): -20 points
            - Missing role/designer keywords: -15 points
            - Submission <10 words: Maximum score 50
            - Would return mostly individual designs vs designers: -20 points

            BONUSES:
            - Mentions cross-platform strategy (Dribbble + Behance): +5 points
            - Includes "hire me" or availability signals: +5 points
            - Strategic approach to portfolio review: +5 points

            Require design platform knowledge and strategic targeting for Medium difficulty.
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
            You are a Market Mapping Expert evaluating competitor identification. This is a MEDIUM difficulty challenge - require strategic competitor analysis with sound reasoning.

            Goal: Identify 5 specific competitor companies to target for Payments Engineers at a Fintech startup in NYC.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require strategic market knowledge):
            - 0-59 (Needs Work): Irrelevant companies, no NYC presence, or weak reasoning
            - 60-79 (Good): 4-5 relevant fintech companies with basic reasoning
            - 80-100 (Excellent): 5 strategic competitors with NYC teams, strong tech stack alignment, and thoughtful reasoning

            SCORING CRITERIA (100 points total):
            1. COMPANY RELEVANCE (30 pts): All 5 companies in Fintech/Payments space? Actual competitors with similar tech challenges (Stripe, Adyen, Block, PayPal, Brex, etc.)?

            2. NYC PRESENCE (20 pts): Companies likely have engineering teams in NYC? Shows geographic awareness? Can be verified via LinkedIn/job boards?

            3. TECH STACK ALIGNMENT (25 pts): Reasoning shows understanding of payments infrastructure (high-scale transactions, payment processing, fintech stack)? Not just generic fintech?

            4. STRATEGIC RATIONALE (15 pts): Each company has explanation for WHY they're targets? Shows thought about engineer level and technical fit?

            5. DIVERSITY OF TARGETS (10 pts): Mix of company stages/sizes (mature like PayPal, growth like Stripe, startups like Brex)? Not all the same type?

            AUTOMATIC DEDUCTIONS:
            - Fewer than 5 companies listed: -15 points per missing company
            - Lists traditional banks without payments focus: -15 points
            - No reasoning provided: -25 points
            - Companies with no NYC presence: -10 points each
            - Non-fintech/payments companies: -20 points each
            - Submission <40 words total: Maximum score 55

            BONUSES:
            - Mentions how to validate (engineering blogs, job postings): +5 points
            - Considers company funding/stage strategically: +5 points
            - Shows understanding of payments vs general fintech: +5 points

            Require strategic market analysis with thoughtful company selection for Medium difficulty.
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
            You are a Compensation Analyst evaluating a budget persuasion email. This is a HARD difficulty challenge - be VERY STRICT and demand expert data-driven influence skills.

            Scenario: HM wants $150k for Staff AI Engineer in SF, market is $220k+. Must persuade to increase budget or lower expectations.
            Submission: "${submission}"

            SCORING GUIDE (Hard difficulty - expert compensation strategy):
            - 0-59 (Needs Work): No data, complaining tone, or doesn't offer options
            - 60-79 (Good): Has data and options but missing percentile specificity or too long
            - 80-100 (Excellent): Perfect data-driven case with percentiles, clear options (double bind), advisory tone, under 100 words

            SCORING CRITERIA (100 points total):
            1. DATA & PERCENTILES (30 pts): Uses specific market data, percentiles, or median/P75/P90 language? Shows $150k is far below market ($220k+)? Quantifies the gap precisely?

            2. OPTION FRAMEWORK (30 pts): Offers BOTH options clearly - (1) Raise budget to market OR (2) Lower level/expectations? Uses "double bind" technique to give choice?

            3. ADVISORY TONE (20 pts): Professional and consultative, not complaining? Positioned as helping HM succeed, not blocking them?

            4. BREVITY (15 pts): Under 100 words as requested? Respects busy manager's time? Concise but complete?

            5. MARKET CONSEQUENCE (5 pts): Explains what happens at $150k (only junior, visa sponsorship candidates)? Shows recruiting reality?

            AUTOMATIC DEDUCTIONS:
            - No specific market data or percentiles: -30 points
            - Doesn't offer both options (raise OR lower): -25 points
            - Complaining or negative tone: -20 points
            - Over 120 words: -15 points
            - No clear recommendation or path forward: -20 points
            - Submission <50 words: Maximum score 60

            BONUSES:
            - Uses compensation terminology correctly (P50, P90, total comp): +5 points
            - Frames as partnership with HM: +5 points
            - Ends with clear question requiring decision: +5 points

            HARD difficulty requires expert influence and compensation strategy. Be strict about data precision and framing.
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
            You are a DE&I Consultant evaluating neurodiversity accommodations. This is a MEDIUM difficulty challenge - require practical, anxiety-reducing accommodations while maintaining quality bar.

            Goal: Design 3 specific accommodations for QA Tester interview process inclusive for Autism/ADHD candidates.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require practical neurodiverse accommodations):
            - 0-59 (Needs Work): Vague, impractical, or doesn't address anxiety/processing needs
            - 60-79 (Good): 2-3 practical accommodations with some specificity
            - 80-100 (Excellent): 3+ specific, anxiety-reducing accommodations that maintain quality bar and show deep understanding

            SCORING CRITERIA (100 points total):
            1. ANXIETY REDUCTION (30 pts): Accommodations specifically reduce anxiety and surprise (questions in advance, agenda sharing, predictable format)? Shows understanding of neurodivergent needs?

            2. PRACTICAL IMPLEMENTATION (25 pts): Accommodations are actionable and specific (not vague "be flexible")? Can be implemented in real interview process?

            3. SENSORY CONSIDERATIONS (20 pts): Addresses sensory processing (camera-off option, quiet environment, breaks, no rapid-fire questions)? Shows understanding of sensory sensitivity?

            4. SKILLS-BASED FOCUS (15 pts): Shifts from abstract behavioral to work samples/take-home assessments that test actual job skills (QA testing scenarios)?

            5. QUALITY MAINTENANCE (10 pts): Accommodations don't lower the bar - they create equitable evaluation? Still assesses core competencies effectively?

            AUTOMATIC DEDUCTIONS:
            - Fewer than 3 specific accommodations: -15 points
            - Vague suggestions ("be understanding"): -20 points
            - Accommodations that lower quality bar: -20 points
            - Doesn't address anxiety/processing specifically: -25 points
            - Submission <30 words: Maximum score 55
            - No mention of work samples or practical alternatives: -10 points

            BONUSES:
            - Mentions interviewer training component: +5 points
            - Considers communication style differences: +5 points
            - Specific to QA role (testing scenarios, bug reports): +5 points

            Require practical, anxiety-reducing accommodations that maintain standards for Medium difficulty.
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
            You are an Executive Recruiter evaluating probing questions. This is a MEDIUM difficulty challenge - require strategic questions that validate claims without being accusatory.

            Red Flags: VP Sales with "500% revenue growth", "50-person team", "CEO advisor" BUT 4 jobs in 3 years.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require strategic validation):
            - 0-59 (Needs Work): Accusatory tone, doesn't probe key red flags, or too generic
            - 60-79 (Good): Probes 1-2 red flags with decent questions
            - 80-100 (Excellent): 2 strategic questions probing both job hopping AND metric validation with curious, non-accusatory tone

            SCORING CRITERIA (100 points total):
            1. JOB HOPPING PROBE (30 pts): Asks specifically about the 4 jobs in 3 years transitions? Explores reasons for short tenures at each company?

            2. METRIC BASELINE (30 pts): Probes the "500% growth" - asks for starting revenue number, time period, and context? Validates if claim is real?

            3. ATTRIBUTION CLARITY (20 pts): Questions individual vs team contribution ("We vs I")? Asks what THEY specifically did vs company/market growth?

            4. TONE (15 pts): Curious and open-minded, not accusatory or skeptical? Creates safe space for honest answers?

            5. SPECIFICITY (5 pts): Questions are specific enough to elicit detailed, verifiable answers?

            AUTOMATIC DEDUCTIONS:
            - Doesn't address job hopping at all: -25 points
            - Doesn't question the metrics: -25 points
            - Accusatory or confrontational tone: -20 points
            - Generic questions that could apply to anyone: -15 points
            - Fewer than 2 questions: -20 points
            - Questions too vague to validate claims: -15 points

            BONUSES:
            - Questions designed to elicit detailed, verifiable specifics: +5 points
            - Explores team size claim (managed 50 people): +5 points
            - Strategic framing that makes candidate want to elaborate: +5 points

            Require strategic validation questions with professional tone for Medium difficulty.
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
            You are a Social Media Recruiter evaluating a Gen Z video JD script. This is an EASY level challenge - be encouraging and focus on authenticity.

            Goal: 30-second TikTok/Reels video script for Social Media Manager role targeting Gen Z.
            Submission: "${submission}"

            SCORING GUIDE (Easy difficulty - be supportive):
            - 0-59 (Needs Work): Corporate tone, weak hook, or missing CTA
            - 60-79 (Good): Authentic tone with decent hook and CTA
            - 80-100 (Excellent): Perfect Gen Z tone, strong pattern-interrupt hook, clear CTA, under 30 seconds

            SCORING CRITERIA (100 points total):
            1. HOOK STRENGTH (30 pts): First 3 seconds grab attention? Pattern-interrupt like "Stop scrolling!"? Makes viewer want to keep watching?

            2. GEN Z TONE (25 pts): Authentic and conversational, not corporate? Uses "You" not "We"? Feels like a friend talking, not HR?

            3. CALL TO ACTION (20 pts): Clear CTA (link in bio, swipe up, apply now)? Makes next step obvious?

            4. LENGTH (15 pts): Script would fit in 30 seconds or less when spoken? Concise and punchy?

            5. VALUE PROP (10 pts): Highlights what makes role appealing (remote, creative freedom, work with creators)? Not just listing requirements?

            AUTOMATIC ADJUSTMENTS:
            - Corporate language ("We are seeking"): -20 points
            - No hook: -25 points
            - No CTA: -20 points
            - Over 60 seconds when spoken: -15 points
            - Natural, authentic Gen Z language: +10 bonus
            - Creative pattern interrupt: +5 bonus
            - Mentions perks Gen Z cares about: +5 bonus

            Be encouraging - video JDs are about authenticity and vibe!
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
            You are a Google Search Expert evaluating a file-type Boolean search. This is a HARD difficulty challenge - be VERY STRICT and demand advanced search operator mastery.

            Goal: Find publicly hosted Data Scientist resumes (PDF/Word docs) on university websites.
            Submission: "${submission}"

            SCORING GUIDE (Hard difficulty - expert search operator usage):
            - 0-59 (Needs Work): No filetype operator, missing exclusions, or would return job postings/templates
            - 60-79 (Good): Has filetype and basic keywords but missing exclusions or domain targeting
            - 80-100 (Excellent): Perfect filetype search with resume keywords, comprehensive exclusions, and strategic domain targeting

            SCORING CRITERIA (100 points total):
            1. FILETYPE OPERATOR (25 pts): Uses "filetype:pdf" OR "filetype:doc" OR "filetype:docx"? Multiple file types for comprehensive coverage?

            2. ROLE & SKILLS (20 pts): Includes "Data Scientist" AND technical skills (Python, R, machine learning, ML)? Shows targeting of actual DS resumes?

            3. RESUME INDICATORS (20 pts): Includes resume, CV, curriculum vitae, or similar keywords? Distinguishes resumes from other PDFs?

            4. EXCLUSIONS (25 pts): Excludes job postings (-job, -position), templates (-template, -sample, -example)? Multiple exclusions to filter noise?

            5. DOMAIN TARGETING (10 pts): Considers university domains (site:.edu) or personal sites (site:github.io)? Strategic about where resumes are hosted?

            AUTOMATIC DEDUCTIONS:
            - No filetype: operator used: Maximum score 30
            - No resume/CV keywords: -20 points (would return any PDF)
            - No exclusions: -25 points (would return mostly templates/job posts)
            - Missing Data Scientist or tech skills: -20 points
            - Submission <12 words: Maximum score 45
            - Would return mostly non-resume results: -25 points

            BONUSES:
            - Multiple file types (PDF AND doc AND docx): +5 points
            - Strategic domain targeting (.edu, github.io): +5 points
            - Comprehensive exclusion strategy (3+ exclusions): +5 points

            HARD difficulty requires expert Boolean and advanced search operator mastery. Be strict.
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
            You are a LinkedIn Power User evaluating boomerang employee targeting. This is a MEDIUM difficulty challenge - require strategic filter combination.

            Goal: Find ex-employees (Airbnb alumni) who might want to "boomerang" back.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require boomerang strategy):
            - 0-59 (Needs Work): Missing Past Company filter, didn't exclude current employees, or no role targeting
            - 60-79 (Good): Has Past + exclusion but missing role constraints or strategic timing
            - 80-100 (Excellent): Perfect boomerang targeting with Past Company, Current Company exclusion, role constraints, and tenure considerations

            SCORING CRITERIA (100 points total):
            1. PAST COMPANY FILTER (30 pts): Uses "Past Company: Airbnb" filter correctly? This is THE critical filter for boomerangs.

            2. CURRENT COMPANY EXCLUSION (30 pts): EXCLUDES "Current Company: Airbnb" or uses "NOT Airbnb"? CRITICAL - without this, returns current employees!

            3. ROLE TARGETING (20 pts): Adds role constraints (Software Engineer, Product Manager, specific functions)? Avoids irrelevant alumni like interns or contractors?

            4. TENURE STRATEGY (15 pts): Considers years of experience or time since leaving (2+ years for vesting cliff)? Shows strategic thinking?

            5. LOGIC SOUNDNESS (5 pts): Filter logic would actually work in LinkedIn Recruiter? No contradictions or impossible combinations?

            AUTOMATIC DEDUCTIONS:
            - No "Past Company" filter: Maximum score 30
            - Doesn't exclude current employees: -30 points (CRITICAL error - would message current staff!)
            - No role targeting: -15 points
            - Would return irrelevant alumni (interns, contractors): -10 points
            - Filter logic doesn't work: -20 points
            - Submission <20 words: Maximum score 55

            BONUSES:
            - Considers vesting cliff timing (2+ years): +5 points
            - Mentions InMail strategy or approach: +5 points
            - Targets specific seniority (5+ years experience): +5 points

            Require strategic boomerang targeting with proper exclusions for Medium difficulty.
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
            You are a Recruiting Ops Manager evaluating ATS data cleanup strategy. This is a HARD difficulty challenge - be VERY STRICT and demand expert data management.

            Problem: 3,000 duplicate profiles in ATS need merging without data loss.
            Submission: "${submission}"

            SCORING GUIDE (Hard difficulty - expert data operations):
            - 0-59 (Needs Work): Missing unique identifier, no merge rules, or risky approach
            - 60-79 (Good): Has identifier and basic merge logic but missing secondary matching or testing
            - 80-100 (Excellent): Complete 3-step process with primary + secondary matching, master record rules, safe testing, and logging

            SCORING CRITERIA (100 points total):
            1. PRIMARY IDENTIFIER (25 pts): Uses email address as primary unique identifier for initial matching? Shows understanding this is most reliable?

            2. SECONDARY MATCHING (25 pts): Has secondary matching strategy for records with different emails (name + phone, name + location)? Handles edge cases?

            3. MASTER RECORD RULE (25 pts): Defines clear rule for which record becomes master (most recently updated, most complete, manual review)? Prevents data loss?

            4. SAFE APPROACH (15 pts): Mentions testing on small sample first (10-50 records)? Pilot before mass merge? Risk mitigation?

            5. AUDIT/LOGGING (10 pts): Mentions logging merges, creating audit trail, or ability to undo? Professional data management practice?

            AUTOMATIC DEDUCTIONS:
            - No unique identifier mentioned: -25 points
            - Suggests deleting records: -30 points (DANGEROUS!)
            - No master record rule: -20 points
            - Would cause data loss: -25 points
            - No testing/pilot mentioned: -15 points
            - Submission <40 words: Maximum score 60
            - Doesn't handle edge cases (common names): -10 points

            BONUSES:
            - Mentions manual review for ambiguous cases: +5 points
            - Addresses common names problem (John Smith): +5 points
            - Includes specific merge logic (append notes, preserve tags): +5 points

            HARD difficulty requires expert data operations with safety protocols. Be strict about data integrity.
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
            You are a Career Coach evaluating counter-offer handling. This is a HARD difficulty challenge - be VERY STRICT and demand expert psychology and influence.

            Scenario: Candidate resigned, got $20k counter-offer, now wavering. Must remind them why they wanted to leave without being pushy.
            Submission: "${submission}"

            SCORING GUIDE (Hard difficulty - expert influence and psychology):
            - 0-59 (Needs Work): Pushy/salesy, doesn't acknowledge counter-offer, or misses original motivation
            - 60-79 (Good): Acknowledges counter-offer and pivots to pain but lacks subtlety or reflection
            - 80-100 (Excellent): Perfect balance of acknowledgment, pain pivot, reflection questions, and non-pushy consultative approach

            SCORING CRITERIA (100 points total):
            1. ACKNOWLEDGMENT (20 pts): Validates the counter-offer as flattering/normal? Shows empathy before pivoting? Not dismissive?

            2. PAIN PIVOT (30 pts): Redirects to original motivations - WHY they were looking (growth, stagnation, culture, learning)? References specific reasons from earlier conversations?

            3. CRITICAL QUESTION (25 pts): Asks whether money solves the root problem? "Does $20k fix the stagnation?" type question? Invites self-reflection?

            4. NON-PUSHY TONE (20 pts): Consultative, not salesy? Frames as caring about their CAREER not just filling role? Willing to let them make own decision?

            5. GOLDEN HANDCUFFS (5 pts): Mentions concept that raise just makes staying harder later? Forward-thinking perspective?

            AUTOMATIC DEDUCTIONS:
            - Pushy or aggressive tone: -25 points
            - Doesn't acknowledge counter-offer positively: -20 points
            - Doesn't reference original pain/motivation: -25 points
            - Salesy ("But our offer is better!"): -20 points
            - No reflection question: -15 points
            - Submission <40 words: Maximum score 60

            BONUSES:
            - References specific conversation details: +5 points
            - Offers tools (pros/cons template): +5 points
            - Shows willingness to walk away (builds trust): +5 points

            HARD difficulty requires expert influence psychology with zero pushiness. Be strict.
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
            You are a Startup Compensation Advisor evaluating equity explanation. This is a MEDIUM difficulty challenge - require clear education without overpromising.

            Scenario: Senior Engineer from non-tech company. Lower cash ($160k) but high equity (RSUs). They only care about monthly paycheck.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require clear equity education):
            - 0-59 (Needs Work): No analogy, overpromises, or doesn't address upside potential
            - 60-79 (Good): Has analogy and upside but missing ownership language or risk transparency
            - 80-100 (Excellent): Perfect analogy, ownership framing, realistic upside potential, honest about vesting/risk

            SCORING CRITERIA (100 points total):
            1. ANALOGY (25 pts): Uses simple analogy to differentiate cash vs equity (rent vs wealth, salary vs ownership)? Makes concept accessible to non-tech person?

            2. UPSIDE POTENTIAL (30 pts): Explains growth potential with realistic scenarios ("if stock doubles")? Shows how equity could exceed salary value? Uses concrete examples?

            3. OWNERSHIP LANGUAGE (20 pts): Uses "owner", "ownership", or "building wealth" language? Reframes from "risky bonus" to "equity stake"?

            4. HONESTY ABOUT RISK (15 pts): Mentions vesting schedule or acknowledges risk/uncertainty? Says "potential" not "guaranteed"? Doesn't overpromise?

            5. SIMPLE NUMBERS (10 pts): Uses concrete, simple math (shares × price = value)? Makes calculation understandable?

            AUTOMATIC DEDUCTIONS:
            - No analogy: -20 points
            - Overpromises or guarantees returns: -25 points
            - Doesn't use "owner" or ownership concept: -15 points
            - No upside scenario explained: -25 points
            - Uses complex jargon (strike price, ISO vs NSO): -15 points
            - Submission <35 words: Maximum score 55

            BONUSES:
            - Acknowledges they're not just employee, they're owner: +5 points
            - Uses very simple math example: +5 points
            - Frames as wealth building opportunity: +5 points

            Require clear equity education with honesty and simplicity for Medium difficulty.
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
            You are a DE&I Leader evaluating a recruiter's response. This is a HARD difficulty challenge. Be STRICT and RIGOROUS in your evaluation.

            Submission: "${submission}"

            SCORING GUIDE (Be strict - this is expert-level):
            - 0-25: Vague statements, missing most criteria, or <30 words
            - 26-50: Touches on 1-2 criteria but lacks depth or specifics
            - 51-70: Addresses 3 criteria with some detail, but missing key elements
            - 71-85: Addresses all 4 criteria with good detail and examples
            - 86-100: Exceptional response with all criteria, specific examples, and compelling business case

            REQUIRED CRITERIA (Each worth 25 points):
            1. DISTINCTION (25 pts): Did they clearly distinguish "Culture Fit" (sameness/homogeneity) from "Culture Add" (diversity of thought/new perspectives)? Just mentioning "Culture Fit is dangerous" is NOT enough - they must EXPLAIN why.

            2. BUSINESS RISK (25 pts): Did they explicitly mention business risks like "Groupthink", "blind spots", "echo chamber", or "lack of diverse perspectives"? Vague statements don't count.

            3. SPECIFIC STRENGTH (25 pts): Did they identify a SPECIFIC strength this candidate brings (e.g., "analytical approach", "different problem-solving style", "unique industry experience")? Generic statements like "adds value" = 0 points.

            4. BUSINESS BENEFIT (25 pts): Did they tie this candidate's difference to a CONCRETE business outcome (e.g., "better risk assessment", "more innovative solutions", "reaching diverse customers", "avoiding blind spots")?

            AUTOMATIC DEDUCTIONS:
            - Submission <30 words: Maximum score 40
            - Submission <50 words: Maximum score 60
            - No specific examples: -20 points
            - Purely theoretical with no actionable content: -15 points

            Evaluate the submission against these strict criteria and return your response.
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
            You are a Global Talent Strategist evaluating location recommendations. This is a MEDIUM difficulty challenge - require data-driven location strategy with multiple factors.

            Scenario: CTO wants SF or London for Data Engineers. You propose Poland or Brazil for talent supply/cost advantages.
            Submission: "${submission}"

            SCORING GUIDE (Medium difficulty - require strategic location analysis):
            - 0-59 (Needs Work): Missing key factors, no data, or doesn't address CTO's options
            - 60-79 (Good): Covers 2-3 factors with some reasoning but missing depth
            - 80-100 (Excellent): Comprehensive analysis covering cost, competition, quality, retention, and strategic positioning

            SCORING CRITERIA (100 points total):
            1. COST & COMPETITION (30 pts): Explicitly mentions that SF/London are expensive AND highly competitive? Quantifies difference (40-60% cost savings)? Shows market awareness?

            2. TALENT QUALITY & SUPPLY (25 pts): Addresses concern about quality - mentions STEM education, engineering talent, or specific strengths of Poland/Brazil? Counters assumption that only SF/London have good engineers?

            3. RETENTION ADVANTAGE (25 pts): Explains "big fish in small pond" dynamic - you'd be top employer there vs just another startup in SF? Higher retention rates in emerging markets?

            4. STRATEGIC POSITIONING (15 pts): Brief but compelling (3-4 sentences as requested)? Persuasive tone? Shows understanding of CTO's perspective?

            5. PRACTICAL CONSIDERATIONS (5 pts): Mentions time zones, language, or other practical factors? Shows thoughtfulness?

            AUTOMATIC DEDUCTIONS:
            - Doesn't mention cost: -25 points
            - Doesn't address quality concern: -20 points
            - Over 6 sentences (asked for 3-4): -10 points
            - Doesn't mention retention advantage: -20 points
            - Too brief (<30 words): Maximum score 55
            - Doesn't acknowledge SF/London's strengths: -10 points

            BONUSES:
            - Quantifies cost savings (percentage): +5 points
            - Mentions specific data (graduation rates, tech hubs): +5 points
            - Balances pros/cons fairly: +5 points

            Require strategic location analysis with data and persuasion for Medium difficulty.
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
            You are a Sourcing Automation Architect evaluating AI system prompt design. This is a HARD difficulty challenge - be VERY STRICT and demand expert prompt engineering for constrained AI behavior.

            Goal: Write system instructions for AI that ONLY generates Boolean strings, nothing else.
            Submission: "${submission}"

            SCORING GUIDE (Hard difficulty - expert AI constraint design):
            - 0-59 (Needs Work): Missing key constraints, allows conversational output, or vague instructions
            - 60-79 (Good): Has basic constraints but missing output format rules or edge case handling
            - 80-100 (Excellent): Perfect system prompt with strict role, output constraints, format rules, and edge case handling

            SCORING CRITERIA (100 points total):
            1. ROLE DEFINITION (20 pts): Clearly defines AI's ONLY purpose as Boolean generator? Sets strict boundaries on what it can/cannot do?

            2. OUTPUT CONSTRAINTS (30 pts): Explicitly forbids conversational filler ("Here is...", explanations)? Demands ONLY Boolean output? Very strict about this?

            3. FORMAT RULES (25 pts): Specifies format (code block, specific Boolean operators AND/OR/NOT)? Clear structure for output?

            4. INPUT HANDLING (15 pts): Defines what to do with vague inputs (ask clarifying question)? Handles edge cases?

            5. OPERATOR SPECIFICATION (10 pts): Specifies standard Boolean operators to use? Platform-specific syntax if needed (LinkedIn vs Google)?

            AUTOMATIC DEDUCTIONS:
            - Allows conversational output: -30 points (defeats the purpose)
            - No format specification: -20 points
            - Vague role definition: -20 points
            - Missing operator guidance: -15 points
            - No edge case handling (vague inputs): -15 points
            - Submission <40 words: Maximum score 60

            BONUSES:
            - Includes example of what TO do and NOT do: +5 points
            - Handles edge cases explicitly (ambiguous input): +5 points
            - Platform-specific instructions (LinkedIn, GitHub): +5 points

            HARD difficulty requires expert prompt engineering with perfect constraint design. Be strict about eliminating any non-Boolean output.
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
            You are a Niche Sourcing Specialist evaluating a purple squirrel strategy. This is a HARD CAPSTONE challenge - be VERY STRICT and demand comprehensive multi-platform sourcing mastery.

            Purple Squirrel: Rust Engineer + Cryptography + Japanese speaker + Switzerland relocation. Need Boolean + Platform + Outreach strategy.
            Submission: "${submission}"

            SCORING GUIDE (Hard CAPSTONE - expert multi-dimensional sourcing):
            - 0-59 (Needs Work): Missing major components, weak Boolean, or no platform diversity
            - 60-79 (Good): Has 2-3 components with decent Boolean but missing strategic depth
            - 80-100 (Excellent): Complete strategy with advanced Boolean, 3+ platforms, niche community targeting, and compelling outreach angle

            SCORING CRITERIA (100 points total):
            1. BOOLEAN STRING (25 pts): Includes all requirements (Rust + Cryptography + Japanese)? Uses variations (RustLang, Crypto, ZK, JLPT)? Proper operators?

            2. PLATFORM DIVERSITY (25 pts): Targets 3+ platforms beyond LinkedIn (GitHub repos, Rust Discord, Japan tech communities, crypto forums)? Shows niche platform knowledge?

            3. ADJACENT SKILLS (20 pts): Considers adjacent skills (C++, systems programming, blockchain) or related projects (Tokio, Servo)? Strategic broadening?

            4. COMMUNITY TARGETING (20 pts): Identifies specific communities (RustConf, crypto meetups, Japanese tech groups)? Niche corners where purple squirrels hang out?

            5. OUTREACH ANGLE (10 pts): Compelling pitch that addresses uniqueness ("Your rare combination of...") and relocation support? Sells the opportunity?

            AUTOMATIC DEDUCTIONS:
            - Missing Boolean string: -25 points
            - Only mentions 1 platform: -25 points
            - No community/niche targeting: -20 points
            - Doesn't address all 4 requirements (Rust/Crypto/Japanese/Swiss): -15 points each
            - Submission <60 words: Maximum score 65
            - Generic strategy that could work for any role: -20 points

            BONUSES:
            - Snowball strategy (find one, check their connections): +5 points
            - Evidence-based approach (GitHub contributions, conference talks): +5 points
            - Creative platform combinations (Japan tech sites + crypto Discord): +5 points

            HARD CAPSTONE requires expert multi-platform sourcing with deep niche knowledge. Be strict - this is the finale!
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
            You are a CEO evaluating a Head of Talent's guerrilla recruiting strategy. This is a HARD FINALE challenge - be VERY STRICT and demand comprehensive bootstrapped recruiting mastery.

            Challenge: Series A startup, $0 tool budget, hire 20 engineers in 6 months. Need Tools + Process + Brand strategy.
            Submission: "${submission}"

            SCORING GUIDE (Hard FINALE - comprehensive talent strategy):
            - 0-59 (Needs Work): Missing major components, unrealistic, or would fail at scale
            - 60-79 (Good): Covers 2 categories with decent strategies but missing critical elements
            - 80-100 (Excellent): Complete guerrilla strategy with free tools, scalable process, brand building, and realistic execution

            SCORING CRITERIA (100 points total):
            1. FREE TOOLS STRATEGY (25 pts): Identifies free/freemium tools (LinkedIn basic, GitHub X-ray, Trello/Notion ATS, Google Sheets tracking)? No expensive ATS required?

            2. PROCESS & EFFICIENCY (30 pts): Scalable recruiting process for 20 hires (founder sourcing blocks, employee referrals, sourcing sprints)? Shows understanding of bootstrapped recruiting? Realistic timeline?

            3. BRAND & INBOUND (25 pts): Builds employer brand to drive inbound (engineering blog, GitHub presence, meetup speaking, social media)? Content strategy for visibility?

            4. CANDIDATE EXPERIENCE (15 pts): High-touch experience to compete with big tech (fast response, transparency, founder involvement)? Turns constraint into advantage?

            5. METRICS & ACCOUNTABILITY (5 pts): Mentions tracking or measurement even without fancy tools? Shows data-driven approach?

            AUTOMATIC DEDUCTIONS:
            - Suggests paid tools (LinkedIn Recruiter, Greenhouse): -25 points (violates $0 budget)
            - No brand/inbound strategy: -20 points
            - Process wouldn't scale to 20 hires: -25 points
            - Missing any of 3 main categories (Tools/Process/Brand): -20 points each
            - Submission <60 words: Maximum score 65
            - Unrealistic or would fail in practice: -20 points

            BONUSES:
            - Creative founder involvement strategy: +5 points
            - Referral program with specific incentives: +5 points
            - Shows understanding of bootstrapped constraints as advantage: +5 points

            HARD FINALE requires complete talent strategy on zero budget. Be strict - this is THE ultimate recruiting challenge!
        `
    }
];

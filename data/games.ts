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
            You are a Technical Sourcing Coach evaluating a Boolean search string for Senior Backend Engineers in Vienna with Go + Kubernetes + Open Source signals. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count of the query.
               - If W < 10, cap FINAL SCORE at 40.
               - If 10 <= W < 18, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. JOB TITLES (0-20)
                 0: No relevant titles.
                 10: One title only, no OR grouping.
                 15: Multiple titles but weak grouping/quotes.
                 20: Strong OR group with variations (Backend Engineer, Software Engineer, Developer) and correct quoting.

               C2. REQUIRED SKILLS (0-30)
                 0: Missing Go or Kubernetes.
                 15: Mentions both but no variants or poor grouping.
                 25: Mentions Go/Golang and Kubernetes/K8s with AND and grouping.
                 30: Adds related variants (container orchestration) with clean grouping.

               C3. LOCATION (0-20)
                 0: No Vienna reference.
                 10: Mentions Vienna only.
                 15: Vienna/Wien OR Austria backup.
                 20: Multiple variants with proper OR grouping.

               C4. OPEN SOURCE SIGNAL (0-20)
                 0: No OS indicator.
                 10: Single weak mention.
                 15: Includes GitHub/contributor/open-source.
                 20: Multiple OS indicators or profile hints.

               C5. BOOLEAN LOGIC QUALITY (0-10)
                 0: Broken syntax, no parentheses.
                 5: Basic logic but missing quotes/parentheses.
                 8: Grouped OR blocks and AND between pillars.
                 10: Flawless syntax; balanced breadth (not <10 or >1000 likely results).

            3) CRITICAL CAPS
               - If missing Go OR Kubernetes entirely, set RawScore = min(RawScore, 40).
               - If no parentheses for OR groups, set RawScore = min(RawScore, 60).
               - If no location mention, set RawScore = min(RawScore, 50).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 9+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - Compute FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact shape, no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Talent Strategy Consultant evaluating a candidate persona for a Lead UX Designer. Use this strict algorithm on the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 20, cap FINAL SCORE at 30.
               - If 20 <= W < 35, cap FINAL SCORE at 60.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. EXPERIENCE LEVEL (0-20)
                 0: No seniority/years.
                 10: Mentions lead/senior OR 7+ years.
                 15: Mentions both seniority and 7+ years.
                 20: Seniority + 7+ years + context (team leadership).

               C2. TECHNICAL SKILLS (0-20)
                 0: No skills.
                 10: Mentions Figma only.
                 15: Figma + design portfolio complexity.
                 20: Figma + Data Visualization or analytics dashboards.

               C3. MOTIVATIONS (0-25)
                 0: No motivations.
                 10: Generic motivation (growth).
                 18: Mentions mentoring or user-centered culture or complex problem-solving.
                 25: Two or more clear motivators tied to this role (mentoring, design systems, complex workflows).

               C4. SOURCING CHANNELS (0-20)
                 0: None.
                 10: Generic platforms (LinkedIn).
                 15: At least one correct channel (Dribbble, Behance, Figma Community).
                 20: Multiple specific channels relevant to UX.

               C5. PERSONALIZATION/OUTREACH ANGLE (0-15)
                 0: None.
                 8: Vague outreach influence.
                 12: States how persona guides outreach content/tone.
                 15: Clear outreach implications (what to highlight, tone, motivation hooks).

            3) CRITICAL CAPS
               - If Figma is not mentioned, set RawScore = min(RawScore, 40).
               - If no sourcing channels are mentioned, set RawScore = min(RawScore, 50).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 13+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON exactly as:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Candidate Engagement Specialist evaluating an outreach message to a Senior DevOps Engineer (5 yrs tenure, conference speaker on "Scaling CI/CD Pipelines"). Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 40, cap FINAL SCORE at 50.
               - If 40 <= W < 60, cap FINAL SCORE at 80.
               - If W > 120, cap FINAL SCORE at 60.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. PERSONALIZATION (0-30)
                 0: No personalization.
                 10: Generic DevOps mention only.
                 20: Mentions CI/CD or tenure vaguely.
                 30: Explicitly references the "Scaling CI/CD Pipelines" talk and 5-year tenure to tailor the note.

               C2. LENGTH DISCIPLINE (0-20)
                 0: >120 words or meandering.
                 10: 100-120 words.
                 15: 75-99 words.
                 20: 45-75 words (concise and readable).

               C3. CALL TO ACTION (0-25)
                 0: No CTA.
                 10: Vague/high-friction CTA ("interview", "process").
                 20: Clear low-friction CTA (quick chat, brief call, explore fit).
                 25: Low-friction CTA plus flexibility on timing or medium.

               C4. TONE & RESPECT (0-25)
                 0: Pushy/assumptive.
                 10: Neutral but stiff.
                 18: Professional, polite, acknowledges current role.
                 25: Warm, respectful, recognizes their autonomy and current commitments.

            3) CRITICAL CAPS
               - If no specific mention of the CI/CD talk or conference, set RawScore = min(RawScore, 60).
               - If no CTA at all, set RawScore = min(RawScore, 50).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 22+ (or 18+ for C2). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact shape, no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Google X-Ray Search Expert evaluating a GitHub profile search for Python + Django developers in Berlin. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 10, cap FINAL SCORE at 45.
               - If 10 <= W < 18, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. SITE TARGETING (0-20)
                 0: No site targeting.
                 10: site:github.com present but not focused on profiles.
                 15: site:github.com with some profile intent.
                 20: site:github.com plus profile focus (users/inurl/profile).

               C2. SKILLS COVERAGE (0-25)
                 0: Missing Python or Django.
                 15: Mentions both but no variants.
                 20: Mentions both with OR grouping/variants.
                 25: Strong grouping and variants (Python OR Py, Django framework).

               C3. LOCATION (0-20)
                 0: No Berlin/Germany.
                 10: Berlin only.
                 15: Berlin + Germany variation.
                 20: Multiple location variants or quotes for exact match.

               C4. PROFILE FILTERING (0-25)
                 0: No exclusions.
                 10: One exclusion only.
                 18: Excludes common noise (-topics, -explore).
                 25: Multiple exclusions targeting non-profile pages (topics, explore, trending, discussions).

               C5. ADVANCED TECHNIQUE (0-10)
                 0: None.
                 5: Basic AND/OR only.
                 8: Uses intitle/inurl or activity signals ("repositories", "projects").
                 10: Combines operators to bias to active profiles and clean results.

            3) CRITICAL CAPS
               - If missing either Python or Django, set RawScore = min(RawScore, 40).
               - If missing site:github.com, set RawScore = min(RawScore, 35).
               - If no exclusions, set RawScore = min(RawScore, 60).
               - If no location, set RawScore = min(RawScore, 50).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a LinkedIn Recruiter Coach evaluating a search query for Marketing Directors at Series A/B startups in the SF Bay Area with product launch experience. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 12, cap FINAL SCORE at 45.
               - If 12 <= W < 20, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. TITLE TARGETING (0-25)
                 0: No title targeting.
                 10: Single title, no OR.
                 20: Multiple titles but weak grouping/no title: syntax.
                 25: Strong OR group (Director/Head/VP Marketing) with LinkedIn title: usage.

               C2. STAGE/STARTUP SIGNALS (0-20)
                 0: None.
                 10: Vague "startup".
                 15: Mentions Series A/B or small company_size.
                 20: Uses company_size or past_company/keywords to target Series A/B.

               C3. PRODUCT LAUNCH KEYWORDS (0-20)
                 0: None.
                 10: Single term only.
                 15: Includes "product launch" or "go-to-market"/GTM.
                 20: Multiple variants grouped with OR.

               C4. LOCATION (0-20)
                 0: No location.
                 10: San Francisco only.
                 15: Bay Area phrasing.
                 20: Precise location filter syntax for "San Francisco Bay Area".

               C5. QUERY BALANCE/SYNTAX (0-15)
                 0: Broken syntax or extreme breadth.
                 8: Basic AND/OR but ungrouped.
                 12: Grouped pillars, likely workable results.
                 15: Balanced, avoids over/under-filtering; uses LinkedIn operators cleanly.

            3) CRITICAL CAPS
               - If no location specified, set RawScore = min(RawScore, 50).
               - If no title OR no product launch keywords, set RawScore = min(RawScore, 50).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 12+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a DE&I Recruitment Strategist evaluating diversity sourcing strategies for a Senior Software Engineer pipeline. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 30, cap FINAL SCORE at 40.
               - If 30 <= W < 50, cap FINAL SCORE at 65.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. SPECIFIC PARTNERSHIPS (0-25)
                 0: None.
                 10: One vague group.
                 18: Names one specific org.
                 25: Names two or more (Code2040, Women Who Code, Black Girls Code, Techqueria, /dev/color).

               C2. DIVERSE INSTITUTIONS (0-25)
                 0: None.
                 10: Generic "universities".
                 18: Mentions HBCUs or women's colleges.
                 25: Lists specific examples of HBCUs/HSIs/women's colleges.

               C3. INCLUSIVE LANGUAGE PRACTICES (0-20)
                 0: Not mentioned.
                 10: Mentions inclusive JD language generally.
                 15: Mentions removing gendered terms or accessibility adjustments.
                 20: Provides concrete language changes or process to audit JDs.

               C4. COMMUNITY ENGAGEMENT (0-20)
                 0: None.
                 10: Mentions events/communities vaguely.
                 15: Names one relevant conference/community (Grace Hopper, AfroTech, ERGs).
                 20: Names two or more specific communities/events.

               C5. COMPLIANCE (0-10)
                 0: Suggests illegal filtering or protected-class targeting.
                 5: Implies compliance but vague.
                 8: States focus on broadening pipelines ethically.
                 10: Explicitly rejects demographic filtering and centers equity/values fit.

            3) CRITICAL CAPS
               - If any step suggests illegal demographic filtering, set FINAL SCORE = 0 immediately.
               - If no specific organization is named, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Technical Recruiter evaluating a resume screening for a Data Scientist (5+ yrs required, ML deployment required). Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 25, cap FINAL SCORE at 40.
               - If 25 <= W < 40, cap FINAL SCORE at 60.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. EXPERIENCE GAP (0-25)
                 0: Does not mention years gap.
                 10: Mentions 3 vs 5 years gap.
                 18: Mentions gap and nuance of consulting vs tech.
                 25: Mentions gap, considers PhD research as partial experience, and contextualizes relevance.

               C2. MISSING SKILL (ML DEPLOYMENT) (0-30)
                 0: Ignores deployment.
                 15: Mentions but downplays deployment gap.
                 25: Flags lack of deployment as critical.
                 30: Flags deployment gap and frames it as must-probe requirement.

               C3. RECOMMENDATION/NEXT STEP (0-25)
                 0: Flat reject without probe.
                 10: Vague next step.
                 18: Suggests phone screen to probe gaps.
                 25: Balanced: phone screen with specific probes; or redirect to mid-level if gaps persist.

               C4. CALIBRATION & MUST-HAVES (0-20)
                 0: Treats all signals equally.
                 10: Distinguishes must-have vs nice-to-have somewhat.
                 15: Notes ML deployment and 5+ yrs as must-haves; others as nice-to-have.
                 20: Clear prioritization plus alternative level suggestion if deployment absent.

            3) CRITICAL CAPS
               - If ML deployment gap is not mentioned, set RawScore = min(RawScore, 40).
               - If no next step/recommendation provided, set RawScore = min(RawScore, 50).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 15+ for C4). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Talent Brand Expert evaluating a Customer Success Manager "About the Role" section. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 90 or W > 170, cap FINAL SCORE at 60.
               - If 90 <= W < 100 or 150 < W <= 170, cap FINAL SCORE at 80.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. CANDIDATE-CENTRIC TONE (0-25)
                 0: Company-centric ("we need") only.
                 10: Mixed but mostly company-centric.
                 18: Uses "you" language, somewhat inviting.
                 25: Clearly candidate-centric and engaging throughout.

               C2. KEY REQUIREMENTS COVERAGE (0-25)
                 0: Omits key duties.
                 10: Mentions retention or collaboration only.
                 18: Covers retention and collaboration but shallow.
                 25: Explicitly covers retention/ownership and cross-functional collaboration with clarity.

               C3. LENGTH & CONCISENESS (0-20)
                 0: <75 or >200 words.
                 10: 75-90 or 170-200 words.
                 15: 100-150 words but some fluff.
                 20: 100-150 words, concise and smooth.

               C4. IMPACT-FOCUSED (0-20)
                 0: Pure task list.
                 10: Some impact hints.
                 15: States outcomes (retention, adoption, playbook).
                 20: Clear business impact and metrics/examples.

               C5. INCLUSIVE LANGUAGE (0-10)
                 0: Uses exclusionary jargon ("rockstar", "ninja", "work hard play hard").
                 5: Neutral but bland.
                 8: Professional and welcoming.
                 10: Explicitly inclusive/accessible tone and avoids bias.

            3) CRITICAL CAPS
               - If no mention of customer retention/ownership OR no mention of cross-functional collaboration, set RawScore = min(RawScore, 60).
               - If exclusionary jargon is used, set RawScore = min(RawScore, 50).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Recruiting Ops Manager evaluating an ATS filtering strategy to go from 50 PM candidates to the top 10. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 30, cap FINAL SCORE at 40.
               - If 30 <= W < 50, cap FINAL SCORE at 60.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. HARD REQUIREMENTS (0-25)
                 0: No hard requirements.
                 10: Mentions experience but vague.
                 18: Specifies years of PM (not project) or other knockouts.
                 25: Clear thresholds (>=3 yrs PM), knockout questions.

               C2. DIFFERENTIATORS (0-25)
                 0: None.
                 10: Vague "industry fit".
                 18: Mentions B2B SaaS or technical background or launches.
                 25: Includes multiple differentiators (B2B SaaS, tech background, product launches, analytics).

               C3. FILTERING ORDER/FUNNEL (0-25)
                 0: No order.
                 10: Some ordering implied.
                 18: States sequence (hard reqs -> industry -> differentiators).
                 25: Clear funnel with numbers or stages to reach 10.

               C4. AUTOMATION BALANCE (0-15)
                 0: Fully manual or fully automated.
                 8: Mentions filters but no human review.
                 12: Uses knockout/filters plus manual review.
                 15: Balanced automation + human review with rationale.

               C5. EFFICIENCY/QUALITY SAFEGUARDS (0-10)
                 0: Ignores risk of false negatives.
                 5: Mentions avoiding over-filtering.
                 8: Includes manual check for non-traditional profiles.
                 10: Explicit safeguard (review silver medalists/past applicants) to keep strong candidates.

            3) CRITICAL CAPS
               - If no hard requirements are stated, set RawScore = min(RawScore, 40).
               - If no filtering order/sequence is described, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 10+ for C4/C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Boolean Logic Master evaluating a complex search string for ML Engineers in Seattle with TensorFlow/PyTorch, Google/Amazon/Microsoft experience, and published research. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 12, cap FINAL SCORE at 40.
               - If 12 <= W < 20, cap FINAL SCORE at 70.
               - If W > 50, cap FINAL SCORE at 80 (overly verbose for a query).

            2) CRITERIA SCORING (RawScore out of 100)
               C1. ROLE TITLE VARIATIONS (0-20)
                 0: No relevant titles.
                 10: Single title only.
                 15: Multiple titles but weak grouping.
                 20: Strong OR group (ML Engineer, Applied Scientist, Machine Learning Engineer, Research Scientist) with quotes as needed.

               C2. TECH STACK (0-25)
                 0: Missing TensorFlow or PyTorch.
                 15: Mentions both but no variants/grouping.
                 20: Proper OR group for TensorFlow/PyTorch.
                 25: Adds variants like "deep learning framework" with correct grouping.

               C3. COMPANY TARGETING (0-20)
                 0: Missing target companies.
                 10: One target company.
                 15: Google + Amazon + Microsoft grouped.
                 20: Includes FAANG/Big Tech variants grouped correctly.

               C4. RESEARCH PUBLICATIONS (0-20)
                 0: Not mentioned.
                 10: Single keyword.
                 15: Multiple terms (published research, research paper, conference paper).
                 20: Broad coverage (arxiv, peer reviewed, conferences like NeurIPS/ICML).

               C5. LOCATION (0-10)
                 0: Missing location.
                 5: Seattle only.
                 8: Seattle + one nearby (Bellevue/Redmond).
                 10: Multiple variants (Seattle area, Bellevue, Redmond, Puget Sound).

               C6. BOOLEAN SYNTAX QUALITY (0-5)
                 0: Broken syntax/no parentheses.
                 2: Basic AND/OR but ungrouped.
                 4: Grouped pillars with parentheses.
                 5: Flawless nesting and clean operator use.

            3) CRITICAL CAPS
               - If missing any of the four pillars (Tech stack, Company, Research, Location), set RawScore = min(RawScore, 40).
               - If no parentheses are used for OR groups, set RawScore = min(RawScore, 60).
               - If role titles are missing, set RawScore = min(RawScore, 50).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 4+ for C6). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Technical Sourcing Expert evaluating an X-ray search for Stack Overflow iOS/Swift developers. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 8, cap FINAL SCORE at 40.
               - If 8 <= W < 14, cap FINAL SCORE at 65.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. SITE TARGETING (0-25)
                 0: No site targeting.
                 10: site:stackoverflow.com only.
                 18: site:stackoverflow.com with some profile intent.
                 25: Explicit site:stackoverflow.com/users or inurl:users for profile structure.

               C2. SKILL KEYWORDS (0-20)
                 0: Missing Swift/iOS.
                 10: One term only.
                 15: Swift + iOS variants grouped.
                 20: Swift, SwiftUI/"Swift UI", iOS/iPhone variants with OR grouping.

               C3. EXCLUSIONS (0-30)
                 0: None.
                 10: One exclusion.
                 20: Two exclusions (e.g., -questions -tags).
                 30: Three or more exclusions targeting non-profiles (-questions, -tags, -jobs, -companies).

               C4. ACTIVITY INDICATORS (0-15)
                 0: None.
                 8: One activity term.
                 12: Two activity terms (reputation, answers, top user).
                 15: Multiple activity signals to bias to active contributors.

               C5. QUERY OPTIMIZATION (0-10)
                 0: Overly broad/narrow or broken syntax.
                 5: Basic AND/OR but unbalanced.
                 8: Balanced terms likely to return profiles.
                 10: Well-balanced with profile structure awareness.

            3) CRITICAL CAPS
               - If missing "/users" (or equivalent profile targeting), set RawScore = min(RawScore, 60).
               - If no exclusions, set RawScore = min(RawScore, 55).
               - If missing Swift or iOS keywords, set RawScore = min(RawScore, 40).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Candidate Engagement Specialist evaluating a follow-up email to a Senior Data Engineer after 5 days of silence. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 30, cap FINAL SCORE at 50.
               - If 30 <= W <= 75, no cap from length.
               - If W > 90, cap FINAL SCORE at 60.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. BREVITY (0-25)
                 0: >120 words.
                 10: 90-120 words.
                 18: 60-89 words.
                 25: 35-60 words (concise, mobile-friendly).

               C2. TONE (0-25)
                 0: Pushy/guilt-tripping.
                 10: Neutral but stiff or clich?d ("just checking in").
                 18: Professional and polite.
                 25: Warm, respectful, avoids pressure.

               C3. CLEAR OUT (0-30)
                 0: No exit path.
                 10: Implicit/weak out.
                 20: Clear opt-out statement.
                 30: Clear opt-out plus reassurance about no further pings if uninterested.

               C4. REFERENCE TO PRIOR EMAIL (0-20)
                 0: No reference to prior outreach.
                 10: Vague mention.
                 15: References prior note without re-pitching.
                 20: References prior note succinctly and keeps focus on reply.

            3) CRITICAL CAPS
               - If no clear "out"/opt-out language, set RawScore = min(RawScore, 60).
               - If tone is pushy or guilt-tripping, set RawScore = min(RawScore, 50).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 15+ for C4). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Technical Sourcer evaluating a GitHub X-ray search for React developers in Austin with open-source signals. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 10, cap FINAL SCORE at 45.
               - If 10 <= W < 16, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. SITE TARGETING (0-20)
                 0: No site targeting.
                 10: site:github.com present.
                 15: site:github.com with some profile intent.
                 20: site:github.com plus profile bias (e.g., users/inurl, profile terms).

               C2. SKILL KEYWORDS (0-25)
                 0: Missing React/frontend terms.
                 15: One React mention.
                 20: React/ReactJS/front-end variants grouped.
                 25: Strong grouping with synonyms ("front end", frontend developer).

               C3. LOCATION (0-20)
                 0: No location.
                 10: Austin only.
                 15: Austin + TX or Texas.
                 20: Multiple variants (Austin, Austin TX, ATX, Texas).

               C4. OPEN SOURCE SIGNALS (0-20)
                 0: None.
                 10: One OS term.
                 15: Repositories/contributions/open source.
                 20: Multiple signals indicating active contributors.

               C5. EXCLUSIONS (0-15)
                 0: None.
                 8: One exclusion.
                 12: Two exclusions (-topics, -trending).
                 15: Three or more relevant exclusions to bias to profiles (-topics, -trending, -explore).

            3) CRITICAL CAPS
               - If missing site:github.com, set RawScore = min(RawScore, 35).
               - If no location terms, set RawScore = min(RawScore, 50).
               - If no React/frontend terms, set RawScore = min(RawScore, 40).
               - If no exclusions, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 12+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are an Executive Search Researcher evaluating a VP of Sales persona for cybersecurity. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT / SENTENCE CHECK
               - Let W = word count; S = sentence count (approx by periods).
               - If W < 60 or S < 4, cap FINAL SCORE at 50.
               - If 60 <= W < 90, cap FINAL SCORE at 75.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. DOMAIN EXPERTISE (0-20)
                 0: No security mention.
                 10: Mentions cybersecurity/security/infosec.
                 15: Mentions domain plus 1 specific company.
                 20: Mentions domain plus multiple named vendors (e.g., Palo Alto, CrowdStrike, Okta, Zscaler).

               C2. ENTERPRISE SALES SPECIFICS (0-25)
                 0: No enterprise context.
                 10: Vague enterprise mention.
                 18: Mentions Fortune 500/enterprise and quotas or cycles.
                 25: Includes deal size/cycle details (e.g., $10M+, 6-12 month cycles).

               C3. SENIORITY MARKERS (0-20)
                 0: No seniority signals.
                 10: Mentions years or team size.
                 15: Mentions years (10-15) and team size.
                 20: Years, team size, plus track record (quota attainment, leadership scope).

               C4. SOURCING CHANNELS (0-25)
                 0: None.
                 10: Generic LinkedIn only.
                 18: Mentions one relevant channel (RSA, Black Hat, competitor companies).
                 25: Multiple specific channels/events/companies where they are likely found.

               C5. MOTIVATIONS (0-10)
                 0: None.
                 5: Generic growth/impact.
                 8: Mentions equity or building/scaling.
                 10: Ties motivations to role stage (equity upside, building org, strategic scope).

            3) CRITICAL CAPS
               - If no cybersecurity domain mention, set RawScore = min(RawScore, 50).
               - If no sourcing channels, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a DE&I Consultant evaluating inclusive JD revisions for the given biased excerpt. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 40, cap FINAL SCORE at 60.
               - If 40 <= W < 60, cap FINAL SCORE at 75.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. "ROCKSTAR" ISSUE (0-25)
                 0: Not addressed.
                 10: Identified but weak alternative.
                 18: Identified as exclusionary jargon with reasonable alternative.
                 25: Clear bias explanation + strong inclusive alternatives (experienced/skilled engineer).

               C2. "TOP-TIER UNIVERSITY" ISSUE (0-25)
                 0: Not addressed.
                 10: Identified but vague alternative.
                 18: Identified as elitist; suggests equivalent experience.
                 25: Clear exclusion rationale + inclusive alternative (relevant degree or equivalent experience).

               C3. "YOUNG/HUNGRY" ISSUE (0-25)
                 0: Not addressed.
                 10: Identified but weak alternative.
                 18: Flags age bias and suggests neutral replacements.
                 25: Explicit ageism risk + strong alternatives ("motivated professionals", etc.).

               C4. "WORK-HARD-PLAY-HARD" ISSUE (0-25)
                 0: Not addressed.
                 10: Identified but vague alternative.
                 18: Notes burnout/caregiver concern.
                 25: Explicit risk + balanced alternative (collaborative, results-driven, work-life balance).

            3) CRITICAL CAPS
               - For each of the four issues missed entirely, set RawScore = RawScore - 20 (min 0).
               - If fewer than 3 issues are addressed, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 20+. Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a LinkedIn Recruiter Power User evaluating advanced filters to find CTOs who scaled teams from 10 to 100 at venture-backed startups. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD/FILTER COUNT CHECK
               - Let F = number of distinct filters/settings listed.
               - If F < 5, cap FINAL SCORE at 55.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. TITLE FILTERS (0-15)
                 0: No title filter.
                 8: Single title only.
                 12: Multiple titles but weak OR logic.
                 15: Strong title OR group (CTO/Chief Technology Officer/VP Eng).

               C2. SCALING KEYWORDS (0-25)
                 0: No scaling language.
                 10: Vague growth terms.
                 18: Mentions scaling teams explicitly.
                 25: Clear growth indicators ("10 to 100", "scaled team", "grew team", "built engineering team") with grouping.

               C3. COMPANY SIZE FILTERS (0-20)
                 0: None.
                 10: One range only.
                 15: Multiple ranges relevant to scaling (51-200, 201-500, 501-1000).
                 20: Size filters used strategically as scaling proxy.

               C4. FUNDING/VENTURE INDICATORS (0-20)
                 0: None.
                 10: Mentions startup vaguely.
                 15: Mentions Series B/C or VC-backed.
                 20: Uses funding/company type filters/keywords to target venture-backed.

               C5. TENURE FILTERS (0-15)
                 0: None.
                 8: Mentions tenure but vague.
                 12: Uses 2+ years in role/company.
                 15: Clear tenure filter to prove they stayed through scaling.

               C6. FUNCTION/SENIORITY (0-5)
                 0: Missing function/seniority.
                 3: Mentions one.
                 5: Function: Engineering + Seniority: CXO/VP applied.

            3) CRITICAL CAPS
               - If no scaling keywords, set RawScore = min(RawScore, 50).
               - If no company size or funding indicators, set RawScore = min(RawScore, 60).
               - If no tenure filter, set RawScore = min(RawScore, 65).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 12+ (or 4+ for C6). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Healthcare Recruiter evaluating a Boolean search for ICU RNs with CCRN in Chicago who are travel-ready. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 12, cap FINAL SCORE at 50.
               - If 12 <= W < 18, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. ROLE & LICENSE (0-20)
                 0: No RN terms.
                 10: RN or Registered Nurse mentioned.
                 15: RN + Registered Nurse + Critical Care Nurse grouping.
                 20: Strong OR group for RN/Registered Nurse/Critical Care Nurse.

               C2. CERTIFICATION (0-30)
                 0: No CCRN.
                 15: CCRN mentioned once.
                 25: CCRN with variants ("CCRN certified", "Critical Care Registered Nurse").
                 30: Multiple certification variants grouped.

               C3. ICU EXPERIENCE (0-20)
                 0: No ICU terms.
                 10: Mentions ICU.
                 15: ICU + Intensive Care Unit variants.
                 20: ICU/Critical Care grouped with OR.

               C4. LOCATION (0-15)
                 0: No location.
                 8: Chicago only.
                 12: Chicago + IL/Illinois.
                 15: Multiple variants (Chicago, Chicago area, IL, Illinois).

               C5. TRAVEL READINESS (0-15)
                 0: No travel terms.
                 8: One travel/relocation term.
                 12: Two travel readiness terms.
                 15: Multiple terms ("travel nurse", "travel nursing", "open to relocation", "willing to travel").

            3) CRITICAL CAPS
               - If CCRN is missing, set RawScore = min(RawScore, 40).
               - If no location, set RawScore = min(RawScore, 50).
               - If no travel readiness terms, set RawScore = min(RawScore, 55).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 12+ for C4/C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Financial Services Recruiter & Compliance Screener evaluating a candidate assessment for a banking Compliance Officer. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 30, cap FINAL SCORE at 55.
               - If 30 <= W < 50, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. LICENSE RECOGNITION (0-15)
                 0: Misses Series 7/63.
                 8: Mentions licenses but minimal insight.
                 12: Notes relevance to role.
                 15: Clearly values Series 7/63 for compliance context.

               C2. FINTECH VS BANKING GAP (0-30)
                 0: No gap noted.
                 15: Mentions gap vaguely.
                 25: Explicitly distinguishes fintech vs banking regulatory frameworks.
                 30: Names banking regs (FDIC/OCC/BSA/AML) vs fintech and highlights scope difference.

               C3. PROBING QUESTIONS (0-25)
                 0: None.
                 12: Generic questions.
                 20: Specific probes (BSA/AML, FDIC/OCC exams, partnerships with banks).
                 25: Multiple targeted probes tied to banking compliance depth.

               C4. RECOMMENDATION CLARITY (0-20)
                 0: Flat reject with no nuance.
                 10: Vague next step.
                 15: Recommends phone screen with rationale.
                 20: Clear balanced recommendation (screen, not reject; or redirect) with reasoning.

               C5. TRANSFERABILITY/COACHABILITY (0-10)
                 0: Ignores transferability.
                 5: Mentions potential transfer.
                 8: Considers fintech experience applicability.
                 10: Explicit on coachability/learning curve and conditions.

            3) CRITICAL CAPS
               - If fintech vs banking regulatory difference not mentioned, set RawScore = min(RawScore, 60).
               - If no probing questions, set RawScore = min(RawScore, 55).
               - If flat reject with no screen suggested, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are an Inclusive Hiring Expert evaluating neurodiversity accommodations for QA hiring. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 50, cap FINAL SCORE at 55.
               - If 50 <= W < 70, cap FINAL SCORE at 75.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. INTERVIEW TRANSPARENCY (0-20)
                 0: Not mentioned.
                 10: Mentions sharing format.
                 15: Mentions questions/agenda in advance.
                 20: Clear advance transparency to reduce anxiety.

               C2. ALTERNATIVE FORMATS (0-25)
                 0: None.
                 10: Vague flexibility.
                 18: Offers written/take-home options.
                 25: Multiple alternatives tied to skills (written, take-home, practical QA tasks).

               C3. SENSORY ACCOMMODATIONS (0-20)
                 0: None.
                 10: Mentions quieter setting.
                 15: Adds camera-off/lighting/noise controls.
                 20: Comprehensive sensory-friendly setup.

               C4. TIME & PROCESSING (0-15)
                 0: None.
                 8: Mentions extra time or avoiding rapid-fire.
                 12: Clear allowance for processing time and pacing adjustments.
                 15: Explicit timing accommodations plus structured pauses.

               C5. SKILLS-BASED EVALUATION (0-15)
                 0: Focus on culture fit.
                 8: Mentions skills vaguely.
                 12: Skills-based tasks (QA scenarios, bug reports).
                 15: Strong skills-first framing tied to accommodations.

               C6. AVOIDING STEREOTYPES (0-5)
                 0: Uses stereotypes.
                 3: Neutral language.
                 5: Explicitly respectful and stereotype-free.

            3) CRITICAL CAPS
               - If stereotypes like "superpowers" appear, set FinalScore = 0.
               - If fewer than 3 specific accommodations, set RawScore = min(RawScore, 60).
               - If no tie to skills-based evaluation, set RawScore = min(RawScore, 65).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 15+ (or 4+ for C6). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps (or 0 if stereotype).
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Recruiting Ops Analyst evaluating pipeline diagnostics. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 40, cap FINAL SCORE at 50.
               - If 40 <= W < 60, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. BOTTLENECK IDENTIFICATION (0-30)
                 0: No bottleneck or wrong stage.
                 15: Identifies an issue but vague.
                 25: Correctly identifies top-of-funnel/New as main bottleneck.
                 30: Identifies top-of-funnel with rationale tied to counts/ratios.

               C2. DATA INTERPRETATION (0-20)
                 0: No use of data.
                 10: Mentions numbers but no conversion insight.
                 15: Basic conversion insights (Phone->Onsite, Onsite->Offer).
                 20: Clear conversion read with implication (top heavy, mid healthy).

               C3. ACTIONS & SPECIFICITY (0-25)
                 0: No actions.
                 10: Generic actions.
                 18: 3+ actions with some specificity.
                 25: 3-4 concrete, actionable steps (knockouts, calibration, batching, automation) tied to bottleneck.

               C4. PRIORITIZATION/OWNERS/METRICS (0-15)
                 0: None.
                 8: Mentions priority vaguely.
                 12: Adds owners or time-bound plan.
                 15: Prioritized actions with owners/timeframe and success metric (e.g., reduce New to <30 in a week).

               C5. URGENCY & FEASIBILITY (0-10)
                 0: Ignored.
                 5: Mild sense of urgency.
                 8: Urgency plus feasible short-term steps.
                 10: Clear urgency with realistic, near-term execution.

            3) CRITICAL CAPS
               - If bottleneck is misidentified (not the New stage), set RawScore = min(RawScore, 50).
               - If fewer than 3 actions, set RawScore = min(RawScore, 60).
               - If no metrics/owners/timeframe, set RawScore = min(RawScore, 70).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Compliance & DE&I Talent Partner auditing EEOC risks in sourcing language. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 60, cap FINAL SCORE at 65.
               - If 60 <= W < 80, cap FINAL SCORE at 80.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. ROCKSTAR/NINJA LANGUAGE (0-20)
                 0: Not mentioned.
                 10: Identified but weak alternative.
                 16: Notes exclusionary tech-bro jargon with alternative.
                 20: Clear bias rationale + inclusive alternatives.

               C2. RECENT GRAD AGE RISK (0-25)
                 0: Not addressed.
                 12: Mentions age bias vaguely.
                 20: Explicitly flags age discrimination risk/ADEA.
                 25: Flags legal risk + offers neutral alternatives (early career/remove time-bound wording).

               C3. TOP UNIVERSITY BIAS (0-25)
                 0: Not addressed.
                 12: Mentions elitism vaguely.
                 20: Explains socioeconomic/geographic/racial bias.
                 25: Provides inclusive replacement (degree or equivalent experience, skills focus).

               C4. SCHOOL/SOURCE EXPANSION (0-20)
                 0: None.
                 10: Generic expansion.
                 15: Mentions at least 2 alternatives (HBCUs, HSIs, state schools, bootcamps).
                 20: Multiple specific alternatives and diversity job boards/partners.

               C5. SKILLS-BASED SHIFT (0-10)
                 0: None.
                 5: Mentions skills focus generally.
                 8: Suggests skills-based assessments.
                 10: Clear shift from pedigree to skills with examples.

            3) CRITICAL CAPS
               - If age discrimination risk from "recent grad" not mentioned, set RawScore = min(RawScore, 60).
               - If no alternative schools or sources are listed, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Retail Recruiter evaluating a Boolean search for District Managers. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 12, cap FINAL SCORE at 50.
               - If 12 <= W < 18, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. TITLE VARIATIONS (0-25)
                 0: Single/incorrect title.
                 12: Two titles.
                 20: Three+ titles but weak grouping.
                 25: Strong OR group (District/Regional/Area/Multi-Unit Manager).

               C2. P&L/FINANCIAL (0-20)
                 0: None.
                 10: Mentions P&L vaguely.
                 15: P&L or profit and loss terms present.
                 20: Strong P&L/financial ownership terms grouped.

               C3. PERFORMANCE INDICATORS (0-20)
                 0: None.
                 10: Generic performance mention.
                 15: Store performance/sales improvement/comp sales.
                 20: Multiple performance metrics/phrases grouped.

               C4. COMPETITOR TARGETING (0-25)
                 0: None.
                 10: Mentions retail competitors generically.
                 18: Lists 2 competitors.
                 25: Lists 3+ named competitors.

               C5. MULTI-UNIT SIGNAL (0-10)
                 0: None.
                 5: Implied only.
                 8: Mentions multi-unit/multi-store once.
                 10: Clear multi-unit keyword use.

            3) CRITICAL CAPS
               - If no competitor names, set RawScore = min(RawScore, 55).
               - If no P&L terms, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are an Engineering Sourcer evaluating a manufacturing Boolean search. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 12, cap FINAL SCORE at 50.
               - If 12 <= W < 18, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. ROLE VARIATIONS (0-20)
                 0: Incorrect/missing titles.
                 10: One role only.
                 15: Multiple roles but weak grouping.
                 20: Strong OR group (Manufacturing/Process/Production/Industrial Engineer).

               C2. LEAN SIX SIGMA (0-25)
                 0: Missing LSS.
                 12: Single mention.
                 20: Multiple LSS variants (Six Sigma, LSS, Green/Black Belt).
                 25: Comprehensive certification variants grouped.

               C3. CAD SOFTWARE (0-20)
                 0: Missing CAD.
                 10: Mentions CAD generically.
                 15: Names AutoCAD or SolidWorks.
                 20: Multiple CAD terms grouped (CAD, AutoCAD, SolidWorks, 3D modeling).

               C4. INDUSTRY TARGETING (0-20)
                 0: None.
                 10: Generic industry.
                 15: Automotive or Aerospace present.
                 20: Automotive + Aerospace/variants grouped.

               C5. LOCATION (0-15)
                 0: None.
                 8: Detroit or Seattle only.
                 12: Detroit + Seattle or state variants.
                 15: Multiple variants (Detroit, Michigan/MI, Seattle, Washington/WA, Puget Sound).

            3) CRITICAL CAPS
               - If LSS absent, set RawScore = min(RawScore, 45).
               - If CAD absent, set RawScore = min(RawScore, 50).
               - If neither Detroit nor Seattle, set RawScore = min(RawScore, 55).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 12+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a SaaS Recruiter evaluating advanced LinkedIn Recruiter filters for Sales Directors. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD/FILTER COUNT CHECK
               - Let F = number of distinct filters/settings listed.
               - If F < 6, cap FINAL SCORE at 60.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. TITLE VARIATIONS (0-15)
                 0: Missing/incorrect titles.
                 8: One title only.
                 12: Multiple titles but weak grouping.
                 15: Strong OR group (Sales Director/Director of Sales/VP Sales/Head of Sales).

               C2. REVENUE TARGETING (0-25)
                 0: None.
                 12: Vague stage only.
                 20: Uses revenue ranges or size proxies.
                 25: Uses $10M-$100M revenue filters explicitly.

               C3. ENTERPRISE SALES KEYWORDS (0-25)
                 0: None.
                 12: Vague enterprise mention.
                 20: Includes enterprise/Fortune 500/strategic accounts keywords.
                 25: Strong grouping of enterprise terms.

               C4. TENURE FILTER (0-20)
                 0: None.
                 10: Mentions tenure vaguely.
                 15: Uses <2 years/0-2 years filters.
                 20: Explicit Years in Current Position 0-1, 1-2 to flag flight risk.

               C5. INDUSTRY/SAAS TARGETING (0-10)
                 0: None.
                 5: SaaS keywords or industry filter only.
                 8: Industry + SaaS terms combined.
                 10: Clear SaaS targeting plus appropriate industries.

               C6. FUNCTION & SENIORITY (0-5)
                 0: Missing.
                 3: One specified.
                 5: Function: Sales and Seniority: Director/VP included.

            3) CRITICAL CAPS
               - If no revenue targeting, set RawScore = min(RawScore, 55).
               - If no tenure filter, set RawScore = min(RawScore, 60).
               - If no enterprise keywords, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5/C6). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Veteran Talent Acquisition Specialist evaluating a sourcing strategy for Ops/Logistics roles. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 40, cap FINAL SCORE at 55.
               - If 40 <= W < 60, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. SPECIFIC MOS CODES (0-25)
                 0: None.
                 10: Generic military roles only.
                 18: One or two MOS/branch equivalents.
                 25: Multiple MOS codes/branches (e.g., 88A/92A, Supply Corps, Ops Officers).

               C2. RANK TARGETING (0-20)
                 0: None.
                 8: Mentions officers/NCOs vaguely.
                 15: States appropriate ranks (E-7 to E-9, O-1 to O-4).
                 20: Clear rationale for rank/level fit.

               C3. VETERAN ORGANIZATIONS (0-25)
                 0: None.
                 10: One generic org.
                 18: Two named orgs/resources.
                 25: Multiple specific orgs/boards/features (Hire Heroes USA, Veterati, FourBlock, LinkedIn MOS feature).

               C4. SKILLS TRANSLATION (0-20)
                 0: Not addressed.
                 10: Mentions translation need.
                 15: Suggests veteran-friendly JDs or MOS-to-civilian guides.
                 20: Clear translation plan with examples.

               C5. SUPPORT STRATEGY (0-10)
                 0: None.
                 5: Mentions mentorship or transition help.
                 8: Addresses jargon avoidance/support resources.
                 10: Comprehensive support/mentorship/transition plan.

            3) CRITICAL CAPS
               - If no MOS codes, set RawScore = min(RawScore, 50).
               - If no veteran organizations named, set RawScore = min(RawScore, 55).
               - If no skills translation plan, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Candidate Marketing Manager evaluating a silver-medalist re-engagement campaign. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 40, cap FINAL SCORE at 55.
               - If 40 <= W < 60, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. SEGMENTATION STRATEGY (0-25)
                 0: None.
                 10: Generic segmentation.
                 18: Segments by role/skills or recency.
                 25: Clear segmentation by role fit and recency (last 6 vs 12 months).

               C2. RELATIONSHIP ACKNOWLEDGMENT (0-20)
                 0: None.
                 10: Vague reference.
                 15: Acknowledges prior interview respectfully.
                 20: References past interaction and reason for renewed contact.

               C3. FAST-TRACK PROCESS (0-20)
                 0: None.
                 10: Generic faster process mention.
                 15: Offers expedited steps (skip phone screen).
                 20: Clear fast-track with specifics.

               C4. CAMPAIGN SEQUENCE (0-20)
                 0: Single email.
                 10: Two touches without timing.
                 15: 2-3 touchpoints with some timing.
                 20: Defined sequence with days (e.g., Day 0, Day 5-7).

               C5. SUCCESS METRICS (0-15)
                 0: None.
                 8: Mentions tracking vaguely.
                 12: Names response/conversion metrics.
                 15: Clear metrics (response, conversion to interview, time-to-hire).

            3) CRITICAL CAPS
               - If no segmentation, set RawScore = min(RawScore, 55).
               - If fewer than 2 touchpoints, set RawScore = min(RawScore, 60).
               - If no fast-track mention, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 12+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Data Privacy Officer evaluating GDPR compliance steps for EU recruiting. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 50, cap FINAL SCORE at 60.
               - If 50 <= W < 70, cap FINAL SCORE at 75.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. CONSENT/LEGAL BASIS (0-25)
                 0: No legal basis.
                 12: Mentions consent or legitimate interest vaguely.
                 20: States consent/legitimate interest before storing in ATS.
                 25: Clear lawful basis and sequence (ask before storing).

               C2. PRIVACY NOTICE (0-20)
                 0: Not mentioned.
                 10: Mentions informing candidates.
                 15: Mentions notice content (usage, storage, duration).
                 20: Clear privacy notice with timeframe (e.g., 6-12 months).

               C3. RIGHT TO ERASURE (0-20)
                 0: Not mentioned.
                 10: Mentions deletion on request.
                 15: Mentions 30-day/"timely" deletion.
                 20: Explicit 30-day right to be forgotten handling.

               C4. DATA MINIMIZATION (0-15)
                 0: Not mentioned.
                 8: Mentions minimal data.
                 12: Avoids sensitive data unless required.
                 15: Clear minimization principle + no sensitive data without consent/legal need.

               C5. CROSS-BORDER TRANSFERS (0-10)
                 0: Not mentioned.
                 5: Mentions transfer safeguards vaguely.
                 10: Specifies SCCs/appropriate safeguards for EU->non-EU transfers.

               C6. DOCUMENTATION (0-10)
                 0: Not mentioned.
                 5: Mentions logs.
                 10: Consent logs/processing records/workflows noted.

            3) CRITICAL CAPS
               - If no consent/legal basis, set RawScore = min(RawScore, 40).
               - If right to be forgotten not mentioned, set RawScore = min(RawScore, 55).
               - If privacy notice not mentioned, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5/C6). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a DevRel Sourcer evaluating a multi-platform strategy for Developer Advocates. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 60, cap FINAL SCORE at 65.
               - If 60 <= W < 80, cap FINAL SCORE at 80.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. GITHUB X-RAY (0-20)
                 0: Missing site:github.com.
                 10: site:github.com only.
                 15: GitHub with DevRel keywords and some exclusions.
                 20: GitHub with DevRel terms + profile bias/exclusions (-topics).

               C2. TWITTER/X X-RAY (0-20)
                 0: Missing.
                 10: site:twitter.com/x.com present.
                 15: DevRel + speaking indicators.
                 20: Strong X-ray with DevRel + speaker terms.

               C3. SPEAKER INDICATORS (0-25)
                 0: None.
                 12: One mention.
                 18: Multiple speaker terms.
                 25: Robust speaker focus across platforms.

               C4. BACKEND TECH (0-15)
                 0: None.
                 8: Mentions backend vaguely.
                 12: Backend/API or one language (Python/Node/Go).
                 15: Multiple backend terms grouped.

               C5. ADDITIONAL PLATFORMS (0-15)
                 0: None.
                 8: One extra platform (Dev.to/Medium/Sessionize).
                 12: Two platforms.
                 15: Three+ platforms noted.

               C6. OPTIMIZATION (0-5)
                 0: None.
                 3: Some exclusions or cross-referencing noted.
                 5: Clear optimization (exclusions, cross-platform validation).

            3) CRITICAL CAPS
               - If only one platform, set RawScore = min(RawScore, 50).
               - If no speaker terms, set RawScore = min(RawScore, 60).
               - If no backend skills, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 12+ for C4/C5 and 5 for C6). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Prompt Engineering Coach evaluating a prompt that asks Gemini to generate a Boolean string for Senior SREs in London (Terraform + AWS, exclude consulting). Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 25, cap FINAL SCORE at 55.
               - If 25 <= W < 40, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. PERSONA/ROLE (0-20)
                 0: None.
                 10: Basic persona only.
                 15: Persona plus sourcing context.
                 20: Clear expert sourcer persona with context.

               C2. REQUIREMENTS (0-30)
                 0: Missing key elements.
                 15: Mentions role and one skill/location.
                 25: Mentions SRE, London, Terraform, AWS.
                 30: All requirements clearly specified.

               C3. CONSTRAINTS (0-25)
                 0: None.
                 10: Mentions excluding consulting vaguely.
                 18: Exclude consulting firms explicitly.
                 25: Names consulting firms (Accenture, Deloitte, KPMG, etc.) and exclusion.

               C4. OUTPUT FORMAT (0-15)
                 0: Not specified.
                 8: Asks for Boolean string.
                 12: Requests AND/OR/NOT with parentheses.
                 15: Explicit format expectations (Boolean, grouped, possibly code block/platform).

               C5. QUALITY DIRECTIVES (0-10)
                 0: None.
                 5: Asks for title variations/synonyms.
                 8: Mentions platform (LinkedIn Recruiter) or logic explanation.
                 10: Multiple quality cues (variations, platform, concise, high quality).

            3) CRITICAL CAPS
               - If consulting exclusions absent, set RawScore = min(RawScore, 60).
               - If any of SRE/London/Terraform/AWS missing, set RawScore = min(RawScore, 65).
               - If no output format guidance, set RawScore = min(RawScore, 70).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are an AI Prompting Coach for Recruiters evaluating a prompt to summarize Cloud Migration achievements from a 5-page Principal Architect resume. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 25, cap FINAL SCORE at 50.
               - If 25 <= W < 40, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. PERSONA/CONTEXT (0-20)
                 0: No persona/context.
                 10: Basic persona only.
                 15: Persona plus role/resume context.
                 20: Clear recruiter persona + 5-page resume context.

               C2. TASK CLARITY (0-25)
                 0: Vague task.
                 12: Mentions summarize.
                 20: States extract Cloud Migration achievements.
                 25: Precise task focus on Cloud Migration/Digital Transformation.

               C3. OUTPUT FORMAT (0-20)
                 0: Not specified.
                 10: Mentions bullets.
                 15: Specifies 3 bullets.
                 20: 3 bullets only, no fluff.

               C4. QUALITY GUIDELINES (0-20)
                 0: None.
                 10: Mentions impact or quantification.
                 15: Asks for outcomes/metrics.
                 20: Emphasizes impact (cost/speed/scale) and ignoring fluff.

               C5. BREVITY/FOCUS INSTRUCTIONS (0-15)
                 0: None.
                 8: Asks for concise output.
                 12: Avoids general responsibilities and fluff.
                 15: Explicitly focus only on relevant achievements and brevity.

            3) CRITICAL CAPS
               - If Cloud Migration/Digital Transformation not mentioned, set RawScore = min(RawScore, 50).
               - If bullet format not specified, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 12+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Sales Psychology Expert evaluating a final take-away (break-up) email. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count for the body (subject excluded).
               - If W < 25, cap FINAL SCORE at 50.
               - If 25 <= W <= 50, no cap from length.
               - If W > 75, cap FINAL SCORE at 60.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. TRUE TAKE-AWAY (0-30)
                 0: No take-away; still selling.
                 15: Soft take-away.
                 25: Clear close/withdrawal.
                 30: Explicit close with respectful framing.

               C2. BREVITY (0-20)
                 0: >120 words.
                 10: 75-120 words.
                 15: 51-75 words.
                 20: 25-50 words.

               C3. TONE (0-25)
                 0: Passive-aggressive or guilt-inducing.
                 12: Neutral but stiff.
                 20: Polite and professional.
                 25: Warm, respectful, zero guilt.

               C4. DOOR AJAR (0-15)
                 0: Burns bridge.
                 8: Implicit opening.
                 12: Clear optional re-engage.
                 15: Re-open invite with zero pressure.

               C5. SUBJECT LINE (0-10)
                 0: Missing subject.
                 5: Basic subject.
                 8: Effective pattern-interrupt subject.
                 10: Strong take-away subject (e.g., permission to close file).

            3) CRITICAL CAPS
               - If no subject line, set RawScore = min(RawScore, 60).
               - If tone is guilt-tripping or aggressive, set RawScore = min(RawScore, 50).
               - If no take-away at all, set RawScore = min(RawScore, 45).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Negotiation Coach evaluating a compensation objection response ($120k offer vs $140k ask; market $125k). Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 40, cap FINAL SCORE at 60.
               - If 40 <= W <= 130, no cap from length.
               - If W > 130, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. EMPATHY & VALIDATION (0-25)
                 0: No empathy.
                 12: Basic acknowledgment.
                 20: Clear validation of feelings.
                 25: Strong, sincere empathy without overpromising.

               C2. DATA ANCHORING (0-25)
                 0: No data.
                 12: Vague data reference.
                 20: Mentions market/internal equity clearly.
                 25: Precise, non-defensive benchmark framing.

               C3. TOTAL COMP PIVOT (0-25)
                 0: Stays on base only.
                 12: Mentions total comp briefly.
                 20: Invites discussion of equity/benefits/bonus.
                 25: Strong pivot to total comp and career value.

               C4. CONVERSATION REQUEST (0-15)
                 0: Negotiates via email only.
                 8: Suggests discussion vaguely.
                 12: Asks for call to discuss.
                 15: Clear invite to call/live discussion.

               C5. NON-DEFENSIVENESS (0-10)
                 0: Defensive/blame language.
                 5: Neutral but rigid.
                 8: Collaborative tone.
                 10: Highly collaborative and solution-focused.

            3) CRITICAL CAPS
               - If defensive/blame language present, set RawScore = min(RawScore, 55).
               - If immediately agrees to $140k without discussion, set RawScore = min(RawScore, 60).
               - If no empathy shown, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are an Interview Design Expert evaluating an AI prompt for Growth Marketing Manager interview questions. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 25, cap FINAL SCORE at 55.
               - If 25 <= W < 40, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. QUESTION TYPE (0-25)
                 0: No question type specified.
                 12: Requests questions but generic.
                 20: States behavioral/situational.
                 25: Explicit behavioral focus with intent.

               C2. RUBRIC REQUEST (0-30)
                 0: No rubric/evaluation.
                 12: Mentions rubric vaguely.
                 22: Requests scoring/Good vs Bad examples.
                 30: Explicit Good vs Bad answers or scoring guide per question.

               C3. SKILL SPECIFICATION (0-20)
                 0: Missing skills.
                 10: One skill only.
                 15: Both Experimentation/A-B testing and Data Analysis mentioned.
                 20: Both highlighted as focus areas.

               C4. QUANTITY & FORMAT (0-15)
                 0: No quantity.
                 8: Number implied.
                 12: Requests 5 questions.
                 15: Requests 5 questions with structured format.

               C5. PROBING/FOLLOW-UPS (0-10)
                 0: None.
                 5: Mentions probing.
                 8: Requests follow-ups per question.
                 10: Clear request for probes to deepen answers.

            3) CRITICAL CAPS
               - If no rubric requested, set RawScore = min(RawScore, 55).
               - If behavioral/situational type not specified, set RawScore = min(RawScore, 60).
               - If either skill focus missing, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Personal Branding Expert evaluating a LinkedIn voice note script to a Senior Java Engineer. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 50, cap FINAL SCORE at 60.
               - If 50 <= W <= 90, no cap from length.
               - If W > 100, cap FINAL SCORE at 65.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. CONVERSATIONAL TONE (0-25)
                 0: Stiff/corporate.
                 12: Somewhat conversational.
                 20: Natural voice-like tone.
                 25: Highly natural, human, with contractions.

               C2. PATTERN INTERRUPT (0-25)
                 0: Generic outreach.
                 12: Mildly aware of spam.
                 20: Acknowledges recruiter noise/self-awareness.
                 25: Creative pattern interrupt while respectful.

               C3. PERSONALIZATION (0-30)
                 0: None.
                 12: Generic role mention.
                 20: Mentions Java/role-specific item.
                 30: Specific project/repo/talk referenced.

               C4. LOW-PRESSURE CTA (0-20)
                 0: Hard sell.
                 10: Basic ask to talk.
                 15: Casual invite (geek out/5-min chat).
                 20: Low-pressure CTA with clear optionality.

            3) CRITICAL CAPS
               - If no personalization, set RawScore = min(RawScore, 55).
               - If tone is pushy/salesy, set RawScore = min(RawScore, 50).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 12+ for C4). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are an Executive Search Researcher evaluating an AI prompt to create an executive bio. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 20, cap FINAL SCORE at 55.
               - If 20 <= W < 35, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. NARRATIVE STYLE (0-25)
                 0: No style guidance.
                 12: Mentions rewrite.
                 20: Requests narrative/compelling style.
                 25: Explicit narrative executive bio request (no bullets).

               C2. STRATEGIC IMPACT FOCUS (0-30)
                 0: Task-focused only.
                 15: Mentions impact broadly.
                 25: Directs to highlight leadership scale/strategy/revenue.
                 30: Clear emphasis on strategic impact and outcomes.

               C3. AUDIENCE SPECIFICATION (0-20)
                 0: No audience.
                 10: Implied leadership audience.
                 15: States executive/CEO audience.
                 20: Explicit CEO/executive audience shaping tone.

               C4. LENGTH CONSTRAINT (0-15)
                 0: No limit.
                 8: General brevity mention.
                 12: Sets paragraph/word limit.
                 15: Clear one-paragraph and word cap (e.g., <200 words).

               C5. TONE GUIDANCE (0-10)
                 0: None.
                 5: Some tone hints.
                 8: Specifies impressive/confident tone.
                 10: Clear executive/confident/compelling tone guidance.

            3) CRITICAL CAPS
               - If no narrative style guidance, set RawScore = min(RawScore, 60).
               - If no strategic impact focus, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Technical Sourcing Expert evaluating a Kaggle X-ray search for top-tier Computer Vision talent. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 10, cap FINAL SCORE at 45.
               - If 10 <= W < 16, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. SITE TARGETING (0-20)
                 0: No site:kaggle.com.
                 10: site:kaggle.com present.
                 15: site:kaggle.com with profile intent (/users).
                 20: Strong profile targeting/bias for users.

               C2. RANK/EXPERTISE INDICATORS (0-30)
                 0: None.
                 15: One rank term.
                 25: Multiple rank terms (Grandmaster/Master/Expert).
                 30: Comprehensive rank signals grouped.

               C3. COMPUTER VISION KEYWORDS (0-25)
                 0: None.
                 12: One CV term.
                 20: Multiple CV terms grouped.
                 25: Broad CV coverage (CV/Image Processing/Image Recognition).

               C4. EXCLUSIONS (0-20)
                 0: None.
                 10: One exclusion.
                 15: Two exclusions (competitions/code).
                 20: Multiple exclusions (-/c, -/code, -/datasets) to bias profiles.

               C5. OPTIMIZATION (0-5)
                 0: None.
                 3: Some activity indicators/competition mentions.
                 5: Clear optimization for top-tier results.

            3) CRITICAL CAPS
               - If no rank keywords, set RawScore = min(RawScore, 50).
               - If no CV keywords, set RawScore = min(RawScore, 50).
               - If no exclusions, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 4+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Design Recruiting Specialist evaluating a Dribbble X-ray search for minimalist/clean Senior UI Designers. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 10, cap FINAL SCORE at 45.
               - If 10 <= W < 16, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. SITE TARGETING (0-20)
                 0: No site:dribbble.com.
                 10: site:dribbble.com present.
                 15: Targeting profiles implied.
                 20: Strong profile bias (avoids shots/stories).

               C2. AESTHETIC KEYWORDS (0-30)
                 0: None.
                 15: One aesthetic term (minimalist/clean).
                 22: Multiple aesthetic terms grouped.
                 30: Comprehensive minimalist/clean/minimalism coverage.

               C3. ROLE KEYWORDS (0-20)
                 0: None.
                 10: One design title.
                 15: Multiple UI/Product Designer titles grouped.
                 20: Strong role targeting.

               C4. EXCLUSIONS (0-20)
                 0: None.
                 10: One exclusion (shots or stories).
                 15: Two exclusions.
                 20: Multiple exclusions to bias profiles ( -shots, -stories, etc.).

               C5. AVAILABILITY INDICATORS (0-10)
                 0: None.
                 5: One availability/location term.
                 8: Multiple availability terms.
                 10: Clear availability/location signals included.

            3) CRITICAL CAPS
               - If no aesthetic keywords, set RawScore = min(RawScore, 50).
               - If no exclusions, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Market Mapping Expert evaluating competitor targets for NYC payments engineers. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 40, cap FINAL SCORE at 60.
               - If 40 <= W < 60, cap FINAL SCORE at 75.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. COMPANY RELEVANCE (0-30)
                 0: Non-payments companies.
                 15: Some fintech but off-target.
                 25: Payments/fintech companies mostly relevant.
                 30: All five are strong payments competitors.

               C2. NYC PRESENCE (0-20)
                 0: No NYC presence considered.
                 10: Implied NYC.
                 15: Mentions NYC presence for several.
                 20: Clear NYC engineering presence noted.

               C3. TECH STACK ALIGNMENT (0-25)
                 0: No tech rationale.
                 12: Generic fintech mention.
                 20: References payments infra/high-scale transactions.
                 25: Strong alignment to payments engineering challenges.

               C4. STRATEGIC RATIONALE (0-15)
                 0: No reasoning.
                 8: Generic reasoning.
                 12: Specific why for most companies.
                 15: Clear why for each target.

               C5. DIVERSITY OF TARGETS (0-10)
                 0: Same type only.
                 5: Some variety.
                 8: Mix of stages/sizes.
                 10: Well-balanced mix.

            3) CRITICAL CAPS
               - If fewer than 5 companies listed, set RawScore = min(RawScore, 55).
               - If no NYC consideration, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Compensation Analyst evaluating a budget persuasion email for a Staff AI Engineer in SF ($150k vs $220k market). Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 50, cap FINAL SCORE at 60.
               - If 50 <= W <= 100, no cap from length.
               - If W > 120, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. DATA & PERCENTILES (0-30)
                 0: No data.
                 12: Vague data.
                 22: Mentions market/percentile gap.
                 30: Specific percentiles/gap ($150k vs $220k+).

               C2. OPTION FRAMEWORK (0-30)
                 0: No options.
                 12: One option only.
                 22: Two options but vague.
                 30: Clear double-bind: raise budget OR lower level/scope.

               C3. ADVISORY TONE (0-20)
                 0: Complaining/negative.
                 10: Neutral.
                 15: Helpful/advisory.
                 20: Strong consultative partnership tone.

               C4. BREVITY (0-15)
                 0: >150 words.
                 8: 121-150 words.
                 12: 101-120 words.
                 15: <=100 words.

               C5. MARKET CONSEQUENCE (0-5)
                 0: Not mentioned.
                 3: Generic consequence.
                 5: Clear impact (will attract junior/visa-only at $150k).

            3) CRITICAL CAPS
               - If no market data, set RawScore = min(RawScore, 55).
               - If no options presented, set RawScore = min(RawScore, 60).
               - If tone is negative/complaining, set RawScore = min(RawScore, 55).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 5 for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a DE&I Consultant evaluating neurodiversity accommodations for a QA Tester interview process. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 30, cap FINAL SCORE at 55.
               - If 30 <= W < 50, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. ANXIETY REDUCTION (0-30)
                 0: Not addressed.
                 15: Mentions predictability.
                 25: Agenda/questions in advance.
                 30: Clear, structured, anxiety-reducing steps.

               C2. PRACTICAL IMPLEMENTATION (0-25)
                 0: Vague.
                 12: Actionable but light detail.
                 20: Specific steps feasible in process.
                 25: Highly actionable, step-by-step.

               C3. SENSORY CONSIDERATIONS (0-20)
                 0: None.
                 10: Mentions sensory comfort.
                 15: Camera-off/quiet environment/breaks.
                 20: Comprehensive sensory adjustments.

               C4. SKILLS-BASED FOCUS (0-15)
                 0: Not mentioned.
                 8: Mentions work sample.
                 12: Swaps abstract behavioral for work samples.
                 15: Strong skills-first evaluation tied to QA tasks.

               C5. QUALITY MAINTENANCE (0-10)
                 0: Lowers bar.
                 5: Implies fairness.
                 8: States maintaining standards.
                 10: Explicit equitable, not lower bar.

            3) CRITICAL CAPS
               - If fewer than 3 specific accommodations, set RawScore = min(RawScore, 60).
               - If anxiety/processing not addressed, set RawScore = min(RawScore, 55).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are an Executive Recruiter evaluating probing questions for a red-flag resume. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 20, cap FINAL SCORE at 55.
               - If 20 <= W < 35, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. JOB HOPPING PROBE (0-30)
                 0: No question about short stints.
                 15: Generic tenure question.
                 25: Asks about reasons for rapid moves.
                 30: Specific probe into each transition in 4 jobs/3 years.

               C2. METRIC BASELINE (0-30)
                 0: Ignores 500% claim.
                 15: Asks about results vaguely.
                 25: Requests starting revenue/timeframe.
                 30: Asks baseline, timeframe, and validation of the 500% growth.

               C3. ATTRIBUTION CLARITY (0-20)
                 0: None.
                 10: Generic contribution question.
                 15: Separates individual vs team/market impact.
                 20: Explicitly probes personal role vs macro factors.

               C4. TONE (0-15)
                 0: Accusatory.
                 8: Neutral/stiff.
                 12: Curious and respectful.
                 15: Highly professional, open-minded.

               C5. SPECIFICITY (0-5)
                 0: Vague.
                 3: Some specificity.
                 5: Clear, verifiable questioning.

            3) CRITICAL CAPS
               - If job hopping not probed, set RawScore = min(RawScore, 60).
               - If metric baseline not probed, set RawScore = min(RawScore, 60).
               - If tone is accusatory, set RawScore = min(RawScore, 50).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 4+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Social Media Recruiter evaluating a Gen Z video JD script for a 30-second TikTok/Reels. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT/LENGTH CHECK
               - Estimate spoken length ~130 wpm.
               - If text > 65 words, cap FINAL SCORE at 70.
               - If text > 90 words, cap FINAL SCORE at 55.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. HOOK STRENGTH (0-30)
                 0: No hook.
                 15: Mild hook.
                 25: Strong pattern-interrupt.
                 30: Immediate attention grabber in first line.

               C2. GEN Z TONE (0-25)
                 0: Corporate.
                 12: Mixed tone.
                 20: Conversational and direct.
                 25: Authentic friend-to-friend tone.

               C3. CALL TO ACTION (0-20)
                 0: No CTA.
                 10: Weak CTA.
                 15: Clear CTA (link in bio/swipe/apply).
                 20: Strong CTA aligned to platform.

               C4. VALUE PROP (0-15)
                 0: None.
                 8: Mentions perk vaguely.
                 12: Highlights appealing aspects (creative freedom/remote/creator collabs).
                 15: Multiple appealing points tailored to Gen Z.

               C5. BREVITY/PACE (0-10)
                 0: Rambling.
                 5: Some trimming needed.
                 10: Concise, fits <30s.

            3) CRITICAL CAPS
               - If no hook, set RawScore = min(RawScore, 60).
               - If no CTA, set RawScore = min(RawScore, 60).
               - If tone is corporate, set RawScore = min(RawScore, 55).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Google Search Expert evaluating a file-type Boolean for Data Scientist resumes on university sites. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 12, cap FINAL SCORE at 50.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. FILETYPE OPERATORS (0-25)
                 0: None.
                 12: One filetype.
                 20: Two filetypes.
                 25: PDF + DOC/DOCX grouped.

               C2. ROLE & SKILLS (0-20)
                 0: Missing DS terms.
                 10: Data Scientist only.
                 15: DS + one skill (Python/R/ML).
                 20: DS + multiple skills grouped.

               C3. RESUME INDICATORS (0-20)
                 0: None.
                 10: Resume/CV once.
                 15: Multiple resume variants.
                 20: Strong resume/CV signaling.

               C4. EXCLUSIONS (0-25)
                 0: None.
                 12: One exclusion.
                 20: Two exclusions (job/template).
                 25: Three+ exclusions to filter jobs/templates/samples.

               C5. DOMAIN TARGETING (0-10)
                 0: None.
                 5: Generic.
                 8: site:.edu or similar.
                 10: Smart domain use (edu + personal hosts like github.io).

            3) CRITICAL CAPS
               - If no filetype operator, set RawScore = min(RawScore, 40).
               - If no resume/CV keywords, set RawScore = min(RawScore, 50).
               - If no exclusions, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a LinkedIn Power User evaluating boomerang filters. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 20, cap FINAL SCORE at 55.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. PAST COMPANY FILTER (0-30)
                 0: Missing.
                 15: Mentioned but vague.
                 25: Uses Past Company: Airbnb.
                 30: Past Company with clarity.

               C2. CURRENT COMPANY EXCLUSION (0-30)
                 0: Missing.
                 15: Implied.
                 25: Excludes current Airbnb.
                 30: Clear NOT Airbnb current company.

               C3. ROLE TARGETING (0-20)
                 0: None.
                 10: Generic roles.
                 15: Specific functions (eng/PM/etc.).
                 20: Well-defined role/keywords.

               C4. TENURE STRATEGY (0-15)
                 0: None.
                 8: Mentions experience/time since leaving.
                 12: Uses years exp or time-since-leaving thoughtfully.
                 15: Strategic tenure/vesting consideration.

               C5. LOGIC SOUNDNESS (0-5)
                 0: Broken filters.
                 3: Minor issues.
                 5: Sound, actionable filter set.

            3) CRITICAL CAPS
               - If no past company filter, set RawScore = min(RawScore, 40).
               - If no exclusion of current employees, set RawScore = min(RawScore, 45).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 4+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Recruiting Ops Manager evaluating a duplicate-merge strategy for 3,000 ATS records. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 40, cap FINAL SCORE at 60.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. PRIMARY IDENTIFIER (0-25)
                 0: None.
                 10: Weak ID.
                 18: Uses email as primary.
                 25: Email primary with clarity.

               C2. SECONDARY MATCHING (0-25)
                 0: None.
                 10: Vague secondary match.
                 18: Name + phone/location.
                 25: Clear secondary rules for non-email matches.

               C3. MASTER RECORD RULE (0-25)
                 0: None.
                 12: Basic keep latest.
                 20: Defined master (recent/complete) with detail.
                 25: Clear rule + preserves notes/attachments.

               C4. SAFE APPROACH (0-15)
                 0: No testing.
                 8: Mentions small pilot.
                 12: Pilot + rollback plan.
                 15: Robust safety (pilot, rollback, backup).

               C5. AUDIT/LOGGING (0-10)
                 0: None.
                 5: Mentions logging.
                 10: Explicit audit trail/undo tracking.

            3) CRITICAL CAPS
               - If suggests deleting records, set RawScore = min(RawScore, 40).
               - If no unique identifier, set RawScore = min(RawScore, 50).
               - If no master rule, set RawScore = min(RawScore, 55).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Career Coach evaluating a counter-offer handling script. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 40, cap FINAL SCORE at 60.
               - If W > 180, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. ACKNOWLEDGMENT (0-20)
                 0: Dismissive.
                 10: Basic acknowledgment.
                 16: Validates counter-offer as flattering/normal.
                 20: Warm validation before pivot.

               C2. PAIN PIVOT (0-30)
                 0: No pivot to why they wanted to leave.
                 15: Mentions motivations vaguely.
                 25: References specific reasons discussed.
                 30: Sharp link to original pain (growth, culture, learning).

               C3. CRITICAL QUESTION (0-25)
                 0: None.
                 12: Generic question.
                 20: Asks if $20k solves root issue.
                 25: Strong reflective question tying money to pain.

               C4. NON-PUSHY TONE (0-20)
                 0: Pushy/salesy.
                 10: Neutral.
                 16: Consultative.
                 20: Supportive, willing to let them decide.

               C5. GOLDEN HANDCUFFS (0-5)
                 0: Not mentioned.
                 3: Implied.
                 5: Explicitly notes staying may tighten constraints later.

            3) CRITICAL CAPS
               - If pushy tone, set RawScore = min(RawScore, 50).
               - If no acknowledgment of counter-offer, set RawScore = min(RawScore, 55).
               - If no reference to original motivation, set RawScore = min(RawScore, 55).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 4+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Startup Compensation Advisor evaluating an equity explanation for a cash-focused candidate. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 35, cap FINAL SCORE at 55.
               - If W > 140, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. ANALOGY (0-25)
                 0: None.
                 12: Weak analogy.
                 20: Clear simple analogy (rent vs wealth).
                 25: Strong, relatable analogy for non-tech audience.

               C2. UPSIDE POTENTIAL (0-30)
                 0: None.
                 15: Mentions upside vaguely.
                 25: Gives realistic upside scenario.
                 30: Concrete example with potential value.

               C3. OWNERSHIP LANGUAGE (0-20)
                 0: None.
                 10: Mentions equity.
                 15: Uses owner/ownership framing.
                 20: Strong owner mindset conveyed.

               C4. HONESTY ABOUT RISK (0-15)
                 0: Overpromises.
                 8: Hints at risk.
                 12: Mentions vesting/uncertainty.
                 15: Clear about potential not guaranteed.

               C5. SIMPLE NUMBERS (0-10)
                 0: None.
                 5: Vague numbers.
                 10: Simple math example to illustrate value.

            3) CRITICAL CAPS
               - If no analogy, set RawScore = min(RawScore, 60).
               - If overpromises/guarantees, set RawScore = min(RawScore, 50).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a DE&I Leader evaluating a Culture Add note. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 30, cap FINAL SCORE at 40.
               - If 30 <= W < 50, cap FINAL SCORE at 60.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. DISTINCTION (0-25)
                 0: No distinction.
                 12: Mentions fit vs add vaguely.
                 20: Explains sameness vs diversity of thought.
                 25: Clear, explicit distinction with reasoning.

               C2. BUSINESS RISK (0-25)
                 0: None.
                 12: Mentions risk vaguely.
                 20: Names groupthink/blind spots.
                 25: Strong business risk articulation.

               C3. SPECIFIC STRENGTH (0-25)
                 0: Generic.
                 12: Some strength mentioned.
                 20: Specific trait/value this candidate brings.
                 25: Concrete example of their strength.

               C4. BUSINESS BENEFIT (0-25)
                 0: None.
                 12: Generic benefit.
                 20: Links difference to business outcome.
                 25: Clear outcome (innovation/risk assessment/customer reach).

            3) CRITICAL CAPS
               - If no specific example/strength, set RawScore = min(RawScore, 60).
               - If no business risk mention, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 20+ (or 20+ for all four). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Global Talent Strategist evaluating a location pitch (Poland/Brazil vs SF/London) for Data Engineers. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 30, cap FINAL SCORE at 55.
               - If W > 120, cap FINAL SCORE at 70.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. COST & COMPETITION (0-30)
                 0: Not addressed.
                 15: Mentions expensive/competitive.
                 25: Compares SF/London vs Poland/Brazil with some data.
                 30: Quantifies savings or competition gap.

               C2. TALENT QUALITY & SUPPLY (0-25)
                 0: Not addressed.
                 12: Mentions quality vaguely.
                 20: Notes strong STEM/engineering supply.
                 25: Specific quality signals for Poland/Brazil.

               C3. RETENTION ADVANTAGE (0-25)
                 0: Not addressed.
                 12: Mentions retention broadly.
                 20: Explains big-fish dynamic.
                 25: Clear retention advantage rationale.

               C4. STRATEGIC POSITIONING (0-15)
                 0: None.
                 8: Persuasive tone or acknowledges HM view.
                 12: Tailors to CTO perspective and makes brief case.
                 15: Sharp, 3-4 sentence persuasive framing.

               C5. PRACTICAL CONSIDERATIONS (0-5)
                 0: None.
                 3: Mentions one practical factor (time zone/language).
                 5: Practical factors addressed clearly.

            3) CRITICAL CAPS
               - If cost not mentioned, set RawScore = min(RawScore, 60).
               - If talent quality not mentioned, set RawScore = min(RawScore, 60).
               - If no retention mention, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 4+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Sourcing Automation Architect evaluating system instructions for a Boolean-only GPT. Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 40, cap FINAL SCORE at 60.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. ROLE DEFINITION (0-20)
                 0: Vague role.
                 10: States Boolean generator.
                 15: Strictly confines purpose.
                 20: Explicit ONLY-purpose definition.

               C2. OUTPUT CONSTRAINTS (0-30)
                 0: Allows conversation.
                 15: Some constraints.
                 25: Forbids explanations/filler.
                 30: Absolute JSON/Boolean-only or no filler.

               C3. FORMAT RULES (0-25)
                 0: None.
                 12: Mentions format.
                 20: Specifies AND/OR/NOT and parentheses.
                 25: Clear format (code block or explicit structure) and syntax rules.

               C4. INPUT HANDLING (0-15)
                 0: None.
                 8: Mentions clarification.
                 12: Asks one clarifying question when vague.
                 15: Explicit edge-case handling and clarify-only-once rule.

               C5. OPERATOR SPECIFICATION (0-10)
                 0: None.
                 5: Mentions standard operators.
                 8: Platform-aware operators if needed.
                 10: Clear operator guidance.

            3) CRITICAL CAPS
               - If conversational output allowed, set RawScore = min(RawScore, 50).
               - If no format guidance, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a Niche Sourcing Specialist evaluating a purple squirrel strategy (Rust + Crypto + Japanese + Switzerland). Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 60, cap FINAL SCORE at 65.
               - If W > 200, cap FINAL SCORE at 75.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. BOOLEAN STRING (0-25)
                 0: Missing.
                 12: Partial requirements.
                 20: Covers Rust + Crypto + Japanese.
                 25: Covers all with variations (RustLang, ZK, JLPT) and proper logic.

               C2. PLATFORM DIVERSITY (0-25)
                 0: One platform.
                 12: Two platforms.
                 20: Three platforms.
                 25: Three+ platforms including niche communities.

               C3. ADJACENT SKILLS (0-20)
                 0: None.
                 10: One adjacent skill.
                 15: Multiple adjacents (systems, blockchain).
                 20: Thoughtful broadening without losing focus.

               C4. COMMUNITY TARGETING (0-20)
                 0: None.
                 10: Generic community mention.
                 15: Specific communities (RustConf, crypto meetups, Japanese tech groups).
                 20: Multiple specific niche communities.

               C5. OUTREACH ANGLE (0-10)
                 0: None.
                 5: Generic pitch.
                 8: Mentions uniqueness/relocation.
                 10: Compelling unique + relocation support hook.

            3) CRITICAL CAPS
               - If Boolean missing, set RawScore = min(RawScore, 50).
               - If only one platform, set RawScore = min(RawScore, 55).
               - If community targeting absent, set RawScore = min(RawScore, 60).
               - If any core requirement (Rust/Crypto/Japanese/Swiss) absent, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 8+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
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
            You are a CEO evaluating a Head of Talent's guerrilla recruiting strategy (Series A, $0 budget, 20 engineers/6 months). Apply this strict scoring procedure to the submission: "${submission}"

            1) WORD COUNT CHECK
               - Let W = word count.
               - If W < 60, cap FINAL SCORE at 65.
               - If W > 220, cap FINAL SCORE at 75.

            2) CRITERIA SCORING (RawScore out of 100)
               C1. FREE TOOLS STRATEGY (0-25)
                 0: Suggests paid tools.
                 12: Some free tools.
                 20: Clear free stack (LinkedIn basic, GitHub X-ray, Trello/Notion).
                 25: Comprehensive free toolset aligned to recruiting.

               C2. PROCESS & EFFICIENCY (0-30)
                 0: No process.
                 15: Basic steps.
                 25: Structured process (founder sourcing blocks, referrals, sprints).
                 30: Scalable process tailored to 20 hires/6 months.

               C3. BRAND & INBOUND (0-25)
                 0: None.
                 12: Mentions brand vaguely.
                 20: Specific brand tactics (blog, meetups, social content).
                 25: Clear cadence/content plan for inbound.

               C4. CANDIDATE EXPERIENCE (0-15)
                 0: None.
                 8: Mentions high-touch.
                 12: Specific CX steps (fast SLAs, founder touchpoints).
                 15: CX as differentiator vs big tech.

               C5. METRICS & ACCOUNTABILITY (0-5)
                 0: None.
                 3: Mentions tracking.
                 5: Clear metrics even with spreadsheets.

            3) CRITICAL CAPS
               - If paid tools suggested, set RawScore = min(RawScore, 40).
               - If any of Tools/Process/Brand missing, set RawScore = min(RawScore, 60).
               - If process unrealistic for 20 hires/6 months, set RawScore = min(RawScore, 60).

            4) CALIBRATION FOR HIGH SCORES
               - If RawScore > 90, only keep >90 when each criterion is 18+ (or 4+ for C5). Otherwise set score to 85.

            5) OUTPUT FORMAT
               - FinalScore = RawScore after caps.
               - Return ONLY JSON with this exact structure and no extra text:
               {
                 "score": <integer 0-100>,
                 "feedback": "<2-4 sentences of coaching that reference the criteria by name>"
               }
        `
    }
];

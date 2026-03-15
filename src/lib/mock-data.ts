import type { TeaserResult, FullResult, SessionState, QuestionnaireData } from "@/types";

/* ───────────────────────────────────────────
   Category-specific teaser content maps
   ─────────────────────────────────────────── */

interface CategoryTeaser {
  readinessFocus: string;
  previewQuestions: string[];
  sampleAnswer: string;
  tips: string[];
}

const CATEGORY_TEASERS: Record<string, CategoryTeaser> = {
  bpo: {
    readinessFocus: "demonstrating customer empathy, active listening, and problem-solving skills",
    previewQuestions: [
      "Tell me about yourself and why you're interested in a BPO/customer service role.",
      "How would you handle an angry customer who wants to speak with a manager?",
      "A customer calls about an issue you've never encountered before. Walk me through your approach.",
    ],
    sampleAnswer:
      "When asked 'Tell me about yourself,' use the Present-Past-Future framework: 'I recently graduated with a degree in Communication and completed an internship at a customer service center where I handled 50+ calls daily. I developed strong listening and de-escalation skills. I'm excited about this BPO role because I want to grow in a fast-paced environment while helping customers resolve their concerns.'",
    tips: [
      "Practice speaking clearly and confidently in English — BPO interviews often test your communication fluency.",
      "Learn common BPO metrics like CSAT, AHT, and FCR so you can reference them in your answers.",
      "Prepare examples of handling difficult people — customer service roles always ask about conflict resolution.",
    ],
  },
  va: {
    readinessFocus: "showcasing your organizational skills, tech-savviness, and ability to work independently",
    previewQuestions: [
      "Tell me about yourself and why you want to work as a Virtual Assistant.",
      "How do you prioritize tasks when multiple clients have urgent deadlines at the same time?",
      "What tools and software are you most comfortable using for remote work?",
    ],
    sampleAnswer:
      "When asked 'Tell me about yourself,' highlight your remote-readiness: 'I'm an organized professional with experience managing calendars, emails, and tasks using tools like Google Workspace and Trello. I previously assisted a small business owner with scheduling and data entry, which taught me to anticipate needs and work proactively. I'm excited about this VA role because I thrive in independent, self-directed work environments.'",
    tips: [
      "Highlight your proficiency with tools like Google Workspace, Slack, Trello, Notion, or Canva.",
      "Emphasize your time management skills — VA clients value reliability and meeting deadlines across time zones.",
      "Prepare your home office setup — interviewers may ask about your internet speed, equipment, and workspace.",
    ],
  },
  admin: {
    readinessFocus: "highlighting your attention to detail, organizational abilities, and office proficiency",
    previewQuestions: [
      "Tell me about yourself and your experience in administrative support.",
      "How do you keep track of multiple schedules, deadlines, and documents simultaneously?",
      "Describe a time you caught an error before it became a bigger problem.",
    ],
    sampleAnswer:
      "When asked 'Tell me about yourself,' focus on reliability: 'I have a background in office administration where I managed filing systems, coordinated meetings, and handled correspondence. I'm detail-oriented and take pride in keeping things organized. I'm excited about this role because I enjoy being the backbone of a productive team.'",
    tips: [
      "Brush up on Microsoft Office skills — especially Excel, Word, and Outlook. Many admin roles test these.",
      "Prepare examples showing your attention to detail and ability to handle confidential information.",
      "Know basic office procedures: filing, scheduling, inventory, and correspondence management.",
    ],
  },
  sales: {
    readinessFocus: "demonstrating your persuasion skills, product knowledge, and customer-first mindset",
    previewQuestions: [
      "Tell me about yourself and what draws you to a sales/retail role.",
      "A customer is hesitant to buy — how would you handle the situation without being pushy?",
      "How would you handle a situation where a product you're selling is out of stock?",
    ],
    sampleAnswer:
      "When asked 'Tell me about yourself,' connect to sales naturally: 'I'm a people person who enjoys helping others find what they need. During my time at a retail store, I consistently met monthly sales targets by building genuine rapport with customers. I'm excited about this role because I believe great sales start with great service.'",
    tips: [
      "Research the company's products or services — interviewers expect you to know what you'll be selling.",
      "Prepare stories about upselling, meeting quotas, or turning a hesitant customer into a satisfied buyer.",
      "Show enthusiasm and energy — sales roles value positive attitude and resilience.",
    ],
  },
  "service-crew": {
    readinessFocus: "showing your teamwork, speed under pressure, and customer service orientation",
    previewQuestions: [
      "Tell me about yourself and why you want to work as service crew.",
      "It's peak lunch hour and the line is long — how do you stay calm and efficient?",
      "A customer complains their order is wrong. How do you handle it?",
    ],
    sampleAnswer:
      "When asked 'Tell me about yourself,' keep it grounded: 'I'm a hardworking and energetic person who enjoys fast-paced work. I previously worked part-time at a food stall where I learned to serve customers quickly while keeping a friendly attitude. I'm excited to join your team because I admire your brand's commitment to quality service.'",
    tips: [
      "Wear neat, clean attire to the interview — fast food and restaurant brands value grooming and hygiene.",
      "Show willingness to do various tasks: cashiering, cleaning, food prep — flexibility is key in service crew roles.",
      "Mention your ability to work shifts, weekends, and holidays — this is often a deciding factor.",
    ],
  },
  "social-media": {
    readinessFocus: "showcasing your creativity, content strategy skills, and understanding of social media metrics",
    previewQuestions: [
      "Tell me about yourself and your experience managing social media accounts.",
      "How would you handle a viral negative comment or review about our brand on social media?",
      "Walk me through how you would plan a content calendar for a month.",
    ],
    sampleAnswer:
      "When asked 'Tell me about yourself,' highlight results: 'I'm a creative communicator with experience managing social media pages that grew engagement by 40% in three months. I use tools like Canva for content creation and Meta Business Suite for scheduling and analytics. I'm passionate about building communities and telling brand stories that resonate.'",
    tips: [
      "Bring a portfolio or examples of social media content you've created — even personal projects count.",
      "Know current trends on TikTok, Instagram, and Facebook relevant to the Philippine market.",
      "Be ready to discuss metrics: engagement rate, reach, impressions, and conversion — not just follower count.",
    ],
  },
  "digital-marketing": {
    readinessFocus: "demonstrating your data-driven mindset, campaign experience, and understanding of digital channels",
    previewQuestions: [
      "Tell me about yourself and your background in digital marketing.",
      "How would you allocate a limited marketing budget across different digital channels?",
      "Describe a campaign you ran (or would run) and how you would measure its success.",
    ],
    sampleAnswer:
      "When asked 'Tell me about yourself,' lead with impact: 'I have experience running paid campaigns on Facebook and Google Ads, and I've managed email marketing workflows that improved open rates by 25%. I'm data-driven and always optimize based on performance metrics. I'm excited about this role because I want to help grow your brand's digital presence strategically.'",
    tips: [
      "Familiarize yourself with Google Analytics, Facebook Ads Manager, and SEO basics before the interview.",
      "Prepare to discuss ROI, CPA, CTR, and conversion funnels — hiring managers want data-literate marketers.",
      "Know the difference between organic and paid strategies and when to use each.",
    ],
  },
  "graphic-design": {
    readinessFocus: "showcasing your design portfolio, creative process, and proficiency with design tools",
    previewQuestions: [
      "Tell me about yourself and your design background.",
      "Walk me through your creative process from receiving a brief to delivering the final design.",
      "A client keeps requesting revisions that go against good design principles. How do you handle this?",
    ],
    sampleAnswer:
      "When asked 'Tell me about yourself,' lead with your craft: 'I'm a visual communicator with a strong eye for layout, typography, and color theory. I've designed social media assets, brand collateral, and marketing materials using Figma, Adobe Photoshop, and Illustrator. I'm excited about this role because I want to create designs that drive real business results.'",
    tips: [
      "Have your portfolio ready — online (Behance, Dribbble) or a PDF. Show your best 5-8 pieces with context.",
      "Be ready to do a design test or live exercise — many companies include this in the interview process.",
      "Discuss your design thinking, not just the tools — explain the 'why' behind your design choices.",
    ],
  },
  "web-dev": {
    readinessFocus: "demonstrating your technical skills, problem-solving approach, and familiarity with modern development tools",
    previewQuestions: [
      "Tell me about yourself and your programming background.",
      "Describe a challenging bug you encountered and how you debugged it.",
      "How do you approach building a new feature from scratch — what's your process?",
    ],
    sampleAnswer:
      "When asked 'Tell me about yourself,' highlight your stack: 'I'm a web developer with experience in HTML, CSS, JavaScript, and React. I've built several projects including a responsive e-commerce site and a task management app. I enjoy solving complex problems and writing clean, maintainable code. I'm excited about this role because I want to contribute to real-world products that impact users.'",
    tips: [
      "Be ready for a technical assessment or coding challenge — practice on LeetCode or HackerRank.",
      "Know your stack deeply: if you list React on your resume, be ready to explain hooks, state management, and lifecycle.",
      "Prepare to discuss version control (Git), deployment, and collaborative coding practices.",
    ],
  },
  teacher: {
    readinessFocus: "highlighting your communication skills, patience, and teaching methodology",
    previewQuestions: [
      "Tell me about yourself and your teaching experience.",
      "How would you handle a student who is disruptive or unengaged during class?",
      "Describe your approach to lesson planning for students with different proficiency levels.",
    ],
    sampleAnswer:
      "When asked 'Tell me about yourself,' focus on your teaching passion: 'I'm a patient and enthusiastic educator with experience teaching English to students of varying levels. I use interactive methods like role-plays and visual aids to keep lessons engaging. I'm excited about this role because I believe in the power of education to transform lives, and I want to help students gain confidence in communication.'",
    tips: [
      "Prepare a demo lesson — many ESL and teaching interviews require you to teach a short class live.",
      "Highlight any TESOL/TEFL certifications or training, even if they're online courses.",
      "Show adaptability: schools and ESL companies value teachers who can adjust lessons on the fly.",
    ],
  },
  nurse: {
    readinessFocus: "demonstrating your clinical competence, empathy, and ability to handle high-pressure situations",
    previewQuestions: [
      "Tell me about yourself and why you chose nursing/healthcare.",
      "Describe a time you had to make a quick decision in a critical patient situation.",
      "How do you handle the emotional stress of caring for seriously ill patients?",
    ],
    sampleAnswer:
      "When asked 'Tell me about yourself,' connect to your calling: 'I'm a licensed nurse with clinical rotation experience in medical-surgical and emergency departments. I'm compassionate, detail-oriented, and calm under pressure. I chose healthcare because I want to make a tangible difference in people's lives. I'm excited about this role because your facility's commitment to patient-centered care aligns with my values.'",
    tips: [
      "Review common clinical scenarios and nursing competencies relevant to the department you're applying for.",
      "Highlight your PRC license, any specialization training, and continuing education certificates.",
      "Be prepared to discuss infection control protocols, patient safety, and your experience with medical equipment.",
    ],
  },
  accountant: {
    readinessFocus: "showcasing your analytical skills, attention to accuracy, and knowledge of accounting principles",
    previewQuestions: [
      "Tell me about yourself and your background in accounting/bookkeeping.",
      "How do you ensure accuracy when handling large volumes of financial data?",
      "Describe a time you identified a discrepancy in financial records and how you resolved it.",
    ],
    sampleAnswer:
      "When asked 'Tell me about yourself,' emphasize precision: 'I'm a detail-oriented accounting professional experienced in bookkeeping, financial reporting, and tax preparation. I'm proficient in QuickBooks and Excel, and I always double-check my work to ensure accuracy. I'm excited about this role because I want to contribute to the financial health of your organization.'",
    tips: [
      "Review basic accounting principles (GAAP), journal entries, and financial statement preparation.",
      "Be proficient in Excel (VLOOKUP, pivot tables, formulas) and relevant accounting software.",
      "Prepare to discuss your experience with BIR compliance, tax filing, or audit processes if applicable.",
    ],
  },
  hr: {
    readinessFocus: "demonstrating your people skills, knowledge of HR processes, and organizational abilities",
    previewQuestions: [
      "Tell me about yourself and your interest in human resources.",
      "How would you handle a confidential employee complaint about their manager?",
      "Describe your approach to screening and shortlisting candidates for a position.",
    ],
    sampleAnswer:
      "When asked 'Tell me about yourself,' highlight your people focus: 'I'm an organized and empathetic professional with experience in recruitment coordination, employee onboarding, and records management. I enjoy connecting people with the right opportunities and ensuring smooth HR operations. I'm excited about this role because I want to help build a positive and productive workplace culture.'",
    tips: [
      "Familiarize yourself with Philippine labor laws (Labor Code basics, DOLE requirements) — HR roles expect this.",
      "Prepare to discuss recruitment processes, employee engagement, and conflict resolution scenarios.",
      "Show proficiency with HRIS systems, payroll basics, and document management.",
    ],
  },
  "real-estate": {
    readinessFocus: "showcasing your negotiation skills, market knowledge, and client relationship management",
    previewQuestions: [
      "Tell me about yourself and what attracted you to real estate.",
      "How would you convince a hesitant buyer to close a deal without being aggressive?",
      "A property listing has been on the market for months with no interest. What would you do differently?",
    ],
    sampleAnswer:
      "When asked 'Tell me about yourself,' show your drive: 'I'm a motivated and personable professional with a passion for helping people find their ideal homes. I understand the Philippine real estate market and I'm skilled at building trust with clients through honest communication. I'm excited about this role because I want to turn property dreams into reality for Filipino families.'",
    tips: [
      "Know the current real estate market trends in your target area — pricing, demand, popular locations.",
      "Be ready to discuss your lead generation strategy and how you build a client pipeline.",
      "Familiarize yourself with real estate laws, DHSUD regulations, and the Maceda Law basics.",
    ],
  },
  delivery: {
    readinessFocus: "demonstrating your reliability, time management, and customer-facing professionalism",
    previewQuestions: [
      "Tell me about yourself and why you're interested in delivery/logistics work.",
      "You're behind schedule on deliveries due to traffic. How do you handle the situation?",
      "A customer claims they didn't receive their package, but your records show it was delivered. What do you do?",
    ],
    sampleAnswer:
      "When asked 'Tell me about yourself,' show reliability: 'I'm a dependable and physically active person who knows the roads well in my area. I have experience with delivery apps and I always prioritize safe, on-time delivery. I'm excited about this role because I enjoy being on the move and providing excellent service to every customer.'",
    tips: [
      "Mention your knowledge of local routes, traffic patterns, and navigation apps like Waze or Google Maps.",
      "Highlight your clean driving record and any relevant licenses (e.g., professional driver's license).",
      "Show that you understand the importance of handling packages carefully and maintaining customer satisfaction.",
    ],
  },
};

const DEFAULT_TEASER: CategoryTeaser = {
  readinessFocus: "demonstrating your relevant skills, adaptability, and enthusiasm for the role",
  previewQuestions: [
    "Tell me about yourself and why you're interested in this position.",
    "What relevant skills or experiences make you a strong fit for this role?",
    "Describe a challenge you faced and how you overcame it.",
  ],
  sampleAnswer:
    "When asked 'Tell me about yourself,' use the Present-Past-Future framework: Start with your current situation, briefly mention relevant past experience, then connect it to why this role excites you. Keep it under 2 minutes, stay professional, and tailor it to the specific job you're applying for.",
  tips: [
    "Research the company thoroughly before your interview — know their products, values, and recent news.",
    "Practice your answers out loud, not just in your head. Record yourself to check your tone and pacing.",
    "Prepare 2-3 thoughtful questions to ask the interviewer at the end.",
  ],
};

/* ───────────────────────────────────────────
   Experience-level readiness descriptors
   ─────────────────────────────────────────── */

const EXPERIENCE_SUMMARIES: Record<string, string> = {
  fresh: "As a fresh graduate, you have a solid foundation to build on.",
  "1-3": "With your 1-3 years of experience, you're well-positioned to demonstrate practical skills.",
  "3+": "With your extensive experience, you have a strong advantage in showcasing proven results.",
};

/* ───────────────────────────────────────────
   Context-aware teaser generator
   ─────────────────────────────────────────── */

export function getMockTeaserResult(data?: Partial<QuestionnaireData>): TeaserResult {
  const categoryId = data?.jobCategoryId || "bpo";
  const experience = data?.experienceLevel || "fresh";
  const jobDescription = data?.jobDescription?.trim();
  const customRole = data?.customRole?.trim();

  const category = CATEGORY_TEASERS[categoryId] || DEFAULT_TEASER;
  const roleLabel = customRole || getCategoryLabel(categoryId);

  // Build a contextual readiness summary
  const experienceIntro = EXPERIENCE_SUMMARIES[experience] || EXPERIENCE_SUMMARIES.fresh;
  const readinessSummary = jobDescription
    ? `${experienceIntro} Based on the job description you provided for the ${roleLabel} role, focus on ${category.readinessFocus} during your interview.`
    : `${experienceIntro} For this ${roleLabel} role, focus on ${category.readinessFocus} during your interview.`;

  // If a job description is provided, make preview questions reference it
  const previewQuestions = jobDescription
    ? contextualizeQuestions(category.previewQuestions, roleLabel, jobDescription)
    : category.previewQuestions;

  return {
    readinessSummary,
    previewQuestions,
    sampleAnswer: category.sampleAnswer,
    tips: category.tips,
  };
}

function contextualizeQuestions(
  baseQuestions: string[],
  roleLabel: string,
  jobDescription: string
): string[] {
  // Extract keywords from the job description for contextual questions
  const jdLower = jobDescription.toLowerCase();
  const contextHints = extractJobContext(jdLower);

  return baseQuestions.map((q, i) => {
    // Keep the first question as-is (it's always the "tell me about yourself" style)
    if (i === 0) return q;
    // For subsequent questions, add job-description context if available
    if (i === 1 && contextHints.keySkill) {
      return `The job description emphasizes "${contextHints.keySkill}." How would you demonstrate this skill in a ${roleLabel} setting?`;
    }
    if (i === 2 && contextHints.keyResponsibility) {
      return `The role involves ${contextHints.keyResponsibility}. Tell us about a relevant experience you've had.`;
    }
    return q;
  });
}

function extractJobContext(jd: string): { keySkill?: string; keyResponsibility?: string } {
  const result: { keySkill?: string; keyResponsibility?: string } = {};

  // Common skill patterns in Filipino job listings
  const skillPatterns: [RegExp, string][] = [
    [/customer service|customer support|client support/i, "customer service"],
    [/communication skills?/i, "strong communication skills"],
    [/team(?:work| player| management)/i, "teamwork"],
    [/problem[- ]solving/i, "problem-solving"],
    [/attention to detail/i, "attention to detail"],
    [/time management/i, "time management"],
    [/leadership|lead(?:ing)? a team/i, "leadership"],
    [/multitask|multi-task/i, "multitasking"],
    [/sales target|quota|revenue/i, "meeting sales targets"],
    [/data entry|data management/i, "data management"],
    [/social media|content creation/i, "social media management"],
    [/project management/i, "project management"],
    [/technical support|troubleshoot/i, "technical troubleshooting"],
    [/creative|design thinking/i, "creative thinking"],
    [/microsoft|excel|word|powerpoint/i, "Microsoft Office proficiency"],
    [/english proficiency|english fluency|fluent in english/i, "English fluency"],
  ];

  for (const [pattern, label] of skillPatterns) {
    if (pattern.test(jd)) {
      result.keySkill = label;
      break;
    }
  }

  // Common responsibility patterns
  const responsibilityPatterns: [RegExp, string][] = [
    [/handling (?:customer |client )?(?:calls|inquiries|complaints)/i, "handling customer inquiries and complaints"],
    [/managing (?:a team|staff|employees)/i, "managing a team"],
    [/process(?:ing)? (?:orders|transactions|payments)/i, "processing transactions"],
    [/schedul(?:e|ing) (?:meetings|appointments)/i, "scheduling and coordination"],
    [/prepar(?:e|ing) reports/i, "preparing reports"],
    [/respond(?:ing)? to (?:emails?|messages?)/i, "responding to communications"],
    [/creat(?:e|ing) content/i, "creating content"],
    [/teach(?:ing)?|instruct(?:ing)?|train(?:ing)?/i, "teaching and training"],
    [/recruit(?:ing|ment)?|hiring|screen(?:ing)? candidates/i, "recruitment and screening"],
    [/inventory|stock management/i, "inventory management"],
    [/bookkeep(?:ing)?|financial|accounting/i, "financial management"],
    [/patient care|clinical/i, "patient care"],
    [/deliver(?:y|ing)|dispatch/i, "delivery and logistics"],
    [/develop(?:ing|ment)?|cod(?:e|ing)|program(?:ming)?/i, "software development"],
  ];

  for (const [pattern, label] of responsibilityPatterns) {
    if (pattern.test(jd)) {
      result.keyResponsibility = label;
      break;
    }
  }

  return result;
}

function getCategoryLabel(categoryId: string): string {
  const labels: Record<string, string> = {
    bpo: "BPO/Customer Service",
    va: "Virtual Assistant",
    admin: "Administrative Assistant",
    sales: "Sales/Retail",
    "service-crew": "Service Crew",
    "social-media": "Social Media Manager",
    "digital-marketing": "Digital Marketing",
    "graphic-design": "Graphic Designer",
    "web-dev": "Web Developer",
    teacher: "Teacher/ESL",
    nurse: "Nurse/Healthcare",
    accountant: "Accountant/Bookkeeper",
    hr: "HR Assistant",
    "real-estate": "Real Estate Agent",
    delivery: "Delivery/Logistics",
    others: "your target role",
  };
  return labels[categoryId] || "your target role";
}

// Keep backwards-compatible export for any code that references the old static constant
export const mockTeaserResult: TeaserResult = getMockTeaserResult();

export const mockFullResult: FullResult = {
  questions: [
    {
      question: "Tell me about yourself and why you're interested in this role.",
      sampleAnswer:
        "I recently graduated with a degree in Communication and completed an internship where I handled customer inquiries daily. I developed strong listening and problem-solving skills that I believe are essential for this BPO role. I'm excited about the opportunity to work with an international team and help customers resolve their concerns efficiently.",
    },
    {
      question: "How would you handle an angry customer who wants to speak with a manager?",
      sampleAnswer:
        "First, I would stay calm and listen actively to understand their concern without interrupting. I'd acknowledge their frustration by saying something like, 'I understand how frustrating this must be.' Then, I'd try to resolve the issue myself by offering concrete solutions. If the customer still insists on speaking with a manager, I'd politely let them know I'll connect them right away while briefly documenting the issue for the manager.",
      recruiterTrap: "The interviewer wants to see if you stay calm under pressure. Don't say you'd immediately transfer the call — show you can handle it first.",
    },
    {
      question: "Describe a time when you went above and beyond for someone.",
      sampleAnswer:
        "During my internship, a customer called about a billing issue that had been unresolved for weeks. Instead of just filing another ticket, I personally followed up with the billing team, got the issue escalated, and called the customer back the next day with a resolution. They were so grateful that they mentioned me in a positive feedback survey.",
    },
    {
      question: "What do you know about our company?",
      sampleAnswer:
        "I know that your company is one of the leading BPO providers in the Philippines, serving clients in telecommunications and e-commerce. I admire your commitment to employee development and your recognition as a Top Employer. I'm particularly interested in your career growth programs that help agents advance to team lead and management roles.",
      recruiterTrap: "This is a basic test of preparation. A vague answer signals low interest. Always research the specific company before the interview.",
    },
    {
      question: "Why should we hire you over other candidates?",
      sampleAnswer:
        "I bring a combination of strong communication skills, genuine empathy for customers, and a willingness to learn quickly. During my internship, I consistently received positive feedback scores and was often asked to help train new team members. I'm not just looking for a job — I want to build a career in customer service and grow with your company.",
    },
    {
      question: "How do you handle working in a fast-paced environment?",
      sampleAnswer:
        "I thrive in fast-paced settings because I'm naturally organized and good at prioritizing tasks. During peak hours at my internship, I learned to manage multiple customer interactions efficiently while maintaining quality. I use simple systems like quick notes between calls to stay organized and ensure no customer concern falls through the cracks.",
    },
    {
      question: "What is your greatest weakness?",
      sampleAnswer:
        "I sometimes spend too much time trying to find the perfect solution for a customer, which can affect my handle time. I've been working on this by setting time boundaries and escalating complex issues sooner while still ensuring the customer feels heard and supported.",
      recruiterTrap: "Don't say 'I'm a perfectionist' or 'I work too hard.' Give a genuine weakness with a real improvement plan.",
    },
    {
      question: "Are you comfortable working night shifts?",
      sampleAnswer:
        "Yes, I'm fully prepared for shifting schedules. I understand that BPO operations serve international clients across different time zones. I've already adjusted my sleep schedule during my internship and found that I actually perform well during evening shifts. I also take care of my health by maintaining a regular exercise routine.",
    },
    {
      question: "How would you deal with a difficult coworker?",
      sampleAnswer:
        "I believe in open and respectful communication. If I had a conflict with a coworker, I'd first try to understand their perspective by having a private, calm conversation. If the issue persisted, I'd involve our team leader to help mediate. I've learned that most workplace conflicts come from miscommunication and can be resolved through honest dialogue.",
    },
    {
      question: "Where do you see yourself in 5 years?",
      sampleAnswer:
        "In five years, I see myself in a team lead or quality assurance role within the company. I plan to continuously develop my skills, take advantage of training opportunities, and contribute to team performance. I want to grow into someone who can mentor new agents and help improve our customer service processes.",
    },
    {
      question: "How do you handle repetitive tasks without losing motivation?",
      sampleAnswer:
        "I stay motivated by setting small personal goals, like improving my customer satisfaction score each week or finding new ways to explain solutions more clearly. I also remind myself that even though the tasks may seem repetitive, each customer interaction is unique and I have the chance to make someone's day better.",
    },
    {
      question: "Can you work independently without constant supervision?",
      sampleAnswer:
        "Absolutely. I'm self-motivated and comfortable making decisions within my authority. During my internship, I often worked independently during off-peak hours and took initiative to resolve issues without waiting for instructions. I also know when to escalate issues and ask for guidance when needed.",
    },
    {
      question: "What does excellent customer service mean to you?",
      sampleAnswer:
        "Excellent customer service means making the customer feel valued and heard, resolving their concern efficiently, and ideally exceeding their expectations. It's not just about fixing the problem — it's about the experience. A customer should hang up feeling like they were treated with respect and that someone genuinely cared about helping them.",
    },
    {
      question: "How do you handle multiple tasks at the same time?",
      sampleAnswer:
        "I prioritize tasks based on urgency and importance. In a BPO setting, this means actively listening to the customer while simultaneously navigating systems and taking notes. I practice focusing on the customer's needs first while using keyboard shortcuts and templates to handle the technical side efficiently.",
    },
    {
      question: "Do you have any questions for us?",
      sampleAnswer:
        "Yes! I'd love to know more about the training program for new hires and what a typical career path looks like for someone starting in this role. Also, how does the team measure and celebrate success?",
      recruiterTrap: "Never say 'No, I don't have any questions.' This signals lack of interest. Always prepare at least 2 questions.",
    },
  ],
  tips: [
    "Research the company thoroughly — know their clients, services, and values.",
    "Practice STAR method answers (Situation, Task, Action, Result) for behavioral questions.",
    "Dress professionally even for virtual interviews.",
    "Test your internet connection and equipment before online interviews.",
    "Arrive 10-15 minutes early for in-person interviews.",
    "Bring extra copies of your resume.",
    "Maintain eye contact and positive body language.",
    "Send a thank-you message within 24 hours after the interview.",
  ],
  recruiterTraps: [
    "\"What's your expected salary?\" — Research market rates first. Give a range, not a fixed number.",
    "\"Why did you leave your last job?\" — Never badmouth a previous employer. Focus on growth.",
    "\"Tell me about yourself\" — This is not an invitation to share your life story. Keep it professional and relevant.",
    "\"What's your greatest weakness?\" — Avoid cliché answers. Give a real weakness with an improvement plan.",
    "\"Do you have any questions?\" — Never say no. Always have 2-3 prepared questions.",
  ],
  resumeSuggestions: [
    "Lead with a strong professional summary that highlights your key skills and career objective.",
    "Use action verbs: 'Managed,' 'Resolved,' 'Improved,' 'Trained,' 'Achieved.'",
    "Quantify achievements: 'Handled 50+ customer calls daily with 95% satisfaction rate.'",
    "Keep it to one page for entry-level, two pages maximum for experienced roles.",
    "Include relevant certifications and training (e.g., TESDA, Six Sigma, customer service certifications).",
    "Tailor your resume for each job application — match keywords from the job description.",
  ],
  coverLetter:
    "Dear Hiring Manager,\n\nI am writing to express my strong interest in the Customer Service Representative position at [Company Name]. With my background in communication and hands-on experience in customer support, I am confident in my ability to contribute to your team's success.\n\nDuring my recent internship at [Previous Company], I handled an average of 50 customer interactions daily, consistently maintaining a satisfaction rating above 95%. I developed strong skills in active listening, problem resolution, and multi-tasking — all of which are essential for thriving in a BPO environment.\n\nWhat excites me most about [Company Name] is your commitment to employee development and your reputation as a top employer in the Philippines. I am eager to bring my dedication, positive attitude, and willingness to learn to your team.\n\nI welcome the opportunity to discuss how my skills and enthusiasm align with your team's needs. Thank you for considering my application.\n\nSincerely,\n[Your Name]",
  salaryScript:
    "When discussing salary, try this approach:\n\n1. **Do your research first.** Check JobStreet, Glassdoor, and Kalibrr for average salaries for your role and experience level in your area.\n\n2. **Let them make the first offer if possible.** Say: \"I'm flexible and open to discussing compensation. Could you share the salary range for this position?\"\n\n3. **If they insist you go first, give a range:** \"Based on my research and experience, I'm looking at a range of ₱[X] to ₱[Y] per month. I'm open to discussing this based on the full compensation package.\"\n\n4. **Consider the full package:** Ask about HMO, allowances, bonuses, and career growth — not just base salary.\n\n5. **Never accept or reject immediately.** Say: \"Thank you for the offer. May I have a day or two to review the complete package?\"",
  practiceGuide: [
    "Day 1: Read through all 15 interview questions and sample answers. Highlight the ones most relevant to your target role.",
    "Day 2: Practice answering the top 5 questions out loud. Record yourself and review your tone, pacing, and clarity.",
    "Day 3: Research the company you're applying to. Prepare your 'Tell me about yourself' answer tailored to that company.",
    "Day 4: Practice behavioral questions using the STAR method. Write out 3 stories from your experience that demonstrate key skills.",
    "Day 5: Do a mock interview with a friend or family member. Ask them for honest feedback on your confidence and clarity.",
    "Day 6: Review your resume and cover letter. Make sure they align with the job description and your prepared answers.",
    "Day 7: Final review day. Go through all questions one more time. Prepare your outfit, documents, and logistics for interview day.",
  ],
};

export function getMockSession(
  plan: "base" | "bundle",
  status: "active" | "near_expiry" | "grace" | "expired"
): SessionState {
  const now = new Date();
  let expiresAt: Date;

  switch (status) {
    case "active":
      expiresAt = new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000);
      break;
    case "near_expiry":
      expiresAt = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
      break;
    case "grace":
      expiresAt = new Date(now.getTime() - 12 * 60 * 60 * 1000);
      break;
    case "expired":
      expiresAt = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
      break;
  }

  return {
    id: "mock-session-001",
    plan,
    status,
    createdAt: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: expiresAt.toISOString(),
    jobCategory: "bpo",
    experienceLevel: "fresh",
    result: mockFullResult,
  };
}

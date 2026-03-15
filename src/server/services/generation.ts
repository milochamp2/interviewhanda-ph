import type { Session, TeaserContent, FullContent, InterviewQuestion } from "../types";

// AI generation service abstraction.
// TODO: Replace mock implementations with real AI provider calls (e.g. Claude API).

/* ───────────────────────────────────────────
   Category-specific teaser content for backend
   ─────────────────────────────────────────── */

interface CategoryTeaserTemplate {
  readinessFocus: string;
  previewQuestions: [string, string, string];
  sampleAnswerTemplate: string;
  tips: [string, string, string];
}

const CATEGORY_TEMPLATES: Record<string, CategoryTeaserTemplate> = {
  bpo: {
    readinessFocus: "demonstrating customer empathy, active listening, and problem-solving skills",
    previewQuestions: [
      "Tell me about yourself and why you're interested in a BPO/customer service role.",
      "How would you handle an angry customer who wants to speak with a manager?",
      "A customer calls about an issue you've never encountered before. Walk me through your approach.",
    ],
    sampleAnswerTemplate:
      "use the Present-Past-Future framework: 'I recently graduated with a degree in Communication and completed an internship at a customer service center where I handled 50+ calls daily. I developed strong listening and de-escalation skills. I'm excited about this BPO role because I want to grow in a fast-paced environment while helping customers resolve their concerns.'",
    tips: [
      "Practice speaking clearly and confidently in English — BPO interviews often test communication fluency.",
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
    sampleAnswerTemplate:
      "highlight your remote-readiness: 'I'm an organized professional with experience managing calendars, emails, and tasks using Google Workspace and Trello. I previously assisted a small business owner with scheduling and data entry, which taught me to anticipate needs and work proactively. I'm excited about this VA role because I thrive in independent, self-directed work.'",
    tips: [
      "Highlight your proficiency with tools like Google Workspace, Slack, Trello, Notion, or Canva.",
      "Emphasize time management skills — VA clients value reliability and meeting deadlines across time zones.",
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
    sampleAnswerTemplate:
      "focus on reliability: 'I have a background in office administration where I managed filing systems, coordinated meetings, and handled correspondence. I'm detail-oriented and take pride in keeping things organized. I'm excited about this role because I enjoy being the backbone of a productive team.'",
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
    sampleAnswerTemplate:
      "connect to sales naturally: 'I'm a people person who enjoys helping others find what they need. During my time at a retail store, I consistently met monthly sales targets by building genuine rapport with customers. I'm excited about this role because I believe great sales start with great service.'",
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
    sampleAnswerTemplate:
      "keep it grounded: 'I'm a hardworking and energetic person who enjoys fast-paced work. I previously worked part-time at a food stall where I learned to serve customers quickly while keeping a friendly attitude. I'm excited to join your team because I admire your brand's commitment to quality service.'",
    tips: [
      "Wear neat, clean attire to the interview — fast food and restaurant brands value grooming and hygiene.",
      "Show willingness to do various tasks: cashiering, cleaning, food prep — flexibility is key.",
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
    sampleAnswerTemplate:
      "highlight results: 'I'm a creative communicator with experience managing social media pages that grew engagement by 40% in three months. I use tools like Canva and Meta Business Suite for content creation and analytics. I'm passionate about building communities and telling brand stories that resonate.'",
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
    sampleAnswerTemplate:
      "lead with impact: 'I have experience running paid campaigns on Facebook and Google Ads, and I've managed email marketing workflows that improved open rates by 25%. I'm data-driven and always optimize based on performance metrics. I'm excited about this role because I want to help grow your brand's digital presence strategically.'",
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
    sampleAnswerTemplate:
      "lead with your craft: 'I'm a visual communicator with a strong eye for layout, typography, and color theory. I've designed social media assets, brand collateral, and marketing materials using Figma, Photoshop, and Illustrator. I'm excited about this role because I want to create designs that drive real business results.'",
    tips: [
      "Have your portfolio ready — online (Behance, Dribbble) or a PDF. Show your best 5-8 pieces with context.",
      "Be ready to do a design test or live exercise — many companies include this in the interview process.",
      "Discuss your design thinking, not just the tools — explain the 'why' behind your design choices.",
    ],
  },
  "web-dev": {
    readinessFocus: "demonstrating your technical skills, problem-solving approach, and familiarity with modern dev tools",
    previewQuestions: [
      "Tell me about yourself and your programming background.",
      "Describe a challenging bug you encountered and how you debugged it.",
      "How do you approach building a new feature from scratch — what's your process?",
    ],
    sampleAnswerTemplate:
      "highlight your stack: 'I'm a web developer with experience in HTML, CSS, JavaScript, and React. I've built responsive e-commerce sites and task management apps. I enjoy solving complex problems and writing clean, maintainable code. I'm excited about this role because I want to contribute to real-world products that impact users.'",
    tips: [
      "Be ready for a technical assessment or coding challenge — practice on LeetCode or HackerRank.",
      "Know your stack deeply: if you list React, be ready to explain hooks, state management, and lifecycle.",
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
    sampleAnswerTemplate:
      "focus on your passion: 'I'm a patient and enthusiastic educator with experience teaching English to students of varying levels. I use interactive methods like role-plays and visual aids to keep lessons engaging. I'm excited about this role because I believe in the power of education to transform lives.'",
    tips: [
      "Prepare a demo lesson — many ESL and teaching interviews require a live teaching demonstration.",
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
    sampleAnswerTemplate:
      "connect to your calling: 'I'm a licensed nurse with clinical rotation experience in medical-surgical and emergency departments. I'm compassionate, detail-oriented, and calm under pressure. I chose healthcare because I want to make a tangible difference in people's lives.'",
    tips: [
      "Review common clinical scenarios and nursing competencies relevant to the department you're applying for.",
      "Highlight your PRC license, specialization training, and continuing education certificates.",
      "Be prepared to discuss infection control protocols, patient safety, and medical equipment experience.",
    ],
  },
  accountant: {
    readinessFocus: "showcasing your analytical skills, attention to accuracy, and knowledge of accounting principles",
    previewQuestions: [
      "Tell me about yourself and your background in accounting/bookkeeping.",
      "How do you ensure accuracy when handling large volumes of financial data?",
      "Describe a time you identified a discrepancy in financial records and how you resolved it.",
    ],
    sampleAnswerTemplate:
      "emphasize precision: 'I'm a detail-oriented accounting professional experienced in bookkeeping, financial reporting, and tax preparation. I'm proficient in QuickBooks and Excel, and I always double-check my work to ensure accuracy. I'm excited about this role because I want to contribute to your organization's financial health.'",
    tips: [
      "Review basic accounting principles (GAAP), journal entries, and financial statement preparation.",
      "Be proficient in Excel (VLOOKUP, pivot tables, formulas) and relevant accounting software.",
      "Prepare to discuss BIR compliance, tax filing, or audit processes if applicable.",
    ],
  },
  hr: {
    readinessFocus: "demonstrating your people skills, knowledge of HR processes, and organizational abilities",
    previewQuestions: [
      "Tell me about yourself and your interest in human resources.",
      "How would you handle a confidential employee complaint about their manager?",
      "Describe your approach to screening and shortlisting candidates for a position.",
    ],
    sampleAnswerTemplate:
      "highlight your people focus: 'I'm an organized and empathetic professional with experience in recruitment coordination, employee onboarding, and records management. I enjoy connecting people with the right opportunities and ensuring smooth HR operations.'",
    tips: [
      "Familiarize yourself with Philippine labor laws (Labor Code basics, DOLE requirements).",
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
    sampleAnswerTemplate:
      "show your drive: 'I'm a motivated and personable professional with a passion for helping people find their ideal homes. I understand the Philippine real estate market and I'm skilled at building trust through honest communication.'",
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
    sampleAnswerTemplate:
      "show reliability: 'I'm a dependable and physically active person who knows the roads well. I have experience with delivery apps and I always prioritize safe, on-time delivery. I'm excited about this role because I enjoy being on the move and providing excellent service.'",
    tips: [
      "Mention your knowledge of local routes, traffic patterns, and navigation apps like Waze or Google Maps.",
      "Highlight your clean driving record and relevant licenses (e.g., professional driver's license).",
      "Show that you understand the importance of handling packages carefully and maintaining customer satisfaction.",
    ],
  },
};

const DEFAULT_TEMPLATE: CategoryTeaserTemplate = {
  readinessFocus: "demonstrating relevant skills, adaptability, and enthusiasm for the role",
  previewQuestions: [
    "Tell me about yourself and why you're interested in this position.",
    "What relevant skills or experiences make you a strong fit for this role?",
    "Describe a challenge you faced and how you overcame it.",
  ],
  sampleAnswerTemplate:
    "use the Present-Past-Future framework: Start with your current situation, briefly mention relevant past experience, then connect it to why this role excites you. Keep it under 2 minutes and practice until it sounds natural.",
  tips: [
    "Research the company thoroughly — know their products, values, and recent news.",
    "Practice your answers out loud. Record yourself to check tone and pacing.",
    "Prepare 2-3 thoughtful questions to ask the interviewer at the end.",
  ],
};

const EXPERIENCE_LABELS: Record<string, string> = {
  fresh: "fresh graduate",
  "1-3": "professional with 1-3 years of experience",
  "3+": "experienced professional",
};

export async function generateTeaserContent(session: Session): Promise<TeaserContent> {
  const roleLabel = session.customRole || getCategoryDisplayLabel(session.jobCategoryId);
  const template = CATEGORY_TEMPLATES[session.jobCategoryId] || DEFAULT_TEMPLATE;
  const expLabel = EXPERIENCE_LABELS[session.experienceLevel] || "applicant";

  // Build contextual readiness summary
  const jd = session.jobDescription?.trim();
  const readinessSummary = jd
    ? `Based on your profile as a ${expLabel} applying for a ${roleLabel} position and the job description you provided, you have a solid foundation. Focus on ${template.readinessFocus} during your interview.`
    : `Based on your profile as a ${expLabel} applying for a ${roleLabel} position, you have a solid foundation. Focus on ${template.readinessFocus} during your interview.`;

  // Use category-specific preview questions, contextualized with job description if available
  const previewQuestions = jd
    ? contextualizePreviewQuestions(template.previewQuestions, roleLabel, jd)
    : [...template.previewQuestions];

  return {
    readinessSummary,
    previewQuestions,
    sampleAnswer:
      `When asked 'Tell me about yourself,' ${template.sampleAnswerTemplate}`,
    tips: [...template.tips],
  };
}

function contextualizePreviewQuestions(
  baseQuestions: [string, string, string],
  roleLabel: string,
  jobDescription: string
): string[] {
  const jdLower = jobDescription.toLowerCase();
  const keySkill = extractKeySkill(jdLower);
  const keyResponsibility = extractKeyResponsibility(jdLower);

  return baseQuestions.map((q, i) => {
    if (i === 0) return q; // keep "tell me about yourself" intact
    if (i === 1 && keySkill) {
      return `The job description emphasizes "${keySkill}." How would you demonstrate this skill in a ${roleLabel} setting?`;
    }
    if (i === 2 && keyResponsibility) {
      return `The role involves ${keyResponsibility}. Tell us about a relevant experience you've had.`;
    }
    return q;
  });
}

function extractKeySkill(jd: string): string | undefined {
  const patterns: [RegExp, string][] = [
    [/customer service|customer support|client support/i, "customer service"],
    [/communication skills?/i, "strong communication skills"],
    [/team(?:work| player| management)/i, "teamwork"],
    [/problem[- ]solving/i, "problem-solving"],
    [/attention to detail/i, "attention to detail"],
    [/time management/i, "time management"],
    [/leadership|lead(?:ing)? a team/i, "leadership"],
    [/multitask|multi-task/i, "multitasking"],
    [/sales target|quota|revenue/i, "meeting sales targets"],
    [/social media|content creation/i, "social media management"],
    [/technical support|troubleshoot/i, "technical troubleshooting"],
    [/microsoft|excel|word|powerpoint/i, "Microsoft Office proficiency"],
    [/english proficiency|english fluency|fluent in english/i, "English fluency"],
  ];
  for (const [pattern, label] of patterns) {
    if (pattern.test(jd)) return label;
  }
  return undefined;
}

function extractKeyResponsibility(jd: string): string | undefined {
  const patterns: [RegExp, string][] = [
    [/handling (?:customer |client )?(?:calls|inquiries|complaints)/i, "handling customer inquiries and complaints"],
    [/managing (?:a team|staff|employees)/i, "managing a team"],
    [/process(?:ing)? (?:orders|transactions|payments)/i, "processing transactions"],
    [/schedul(?:e|ing) (?:meetings|appointments)/i, "scheduling and coordination"],
    [/prepar(?:e|ing) reports/i, "preparing reports"],
    [/creat(?:e|ing) content/i, "creating content"],
    [/teach(?:ing)?|instruct(?:ing)?|train(?:ing)?/i, "teaching and training"],
    [/recruit(?:ing|ment)?|hiring|screen(?:ing)? candidates/i, "recruitment and screening"],
    [/bookkeep(?:ing)?|financial|accounting/i, "financial management"],
    [/patient care|clinical/i, "patient care"],
    [/deliver(?:y|ing)|dispatch/i, "delivery and logistics"],
    [/develop(?:ing|ment)?|cod(?:e|ing)|program(?:ming)?/i, "software development"],
  ];
  for (const [pattern, label] of patterns) {
    if (pattern.test(jd)) return label;
  }
  return undefined;
}

function getCategoryDisplayLabel(categoryId: string): string {
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
    others: "the specified role",
  };
  return labels[categoryId] || categoryId;
}

export async function generateFullContent(session: Session, isBundle: boolean): Promise<FullContent> {
  const roleLabel = session.customRole || getCategoryDisplayLabel(session.jobCategoryId);

  const questions: InterviewQuestion[] = Array.from({ length: 15 }, (_, i) => ({
    id: `q-${i + 1}`,
    question: getMockQuestion(i, roleLabel, session.jobCategoryId),
    sampleAnswer: getMockAnswer(i, roleLabel, session.jobCategoryId),
    recruiterTrap: i % 3 === 1 ? getMockTrap(i, session.jobCategoryId) : undefined,
  }));

  const base: FullContent = {
    questions,
    tips: [
      "Research the company thoroughly before your interview.",
      "Practice STAR method answers for behavioral questions.",
      "Dress professionally even for virtual interviews.",
      "Test your internet connection before online interviews.",
      "Arrive 10-15 minutes early for in-person interviews.",
      "Bring extra copies of your resume.",
      "Maintain eye contact and positive body language.",
      "Send a thank-you message within 24 hours after the interview.",
    ],
    recruiterTraps: [
      "\"What's your expected salary?\" — Research market rates first. Give a range, not a fixed number.",
      "\"Why did you leave your last job?\" — Never badmouth a previous employer.",
      "\"Tell me about yourself\" — Keep it professional and under 2 minutes.",
      "\"What's your greatest weakness?\" — Give a real weakness with an improvement plan.",
      "\"Do you have any questions?\" — Always prepare at least 2 questions.",
    ],
  };

  if (isBundle) {
    base.resumeSuggestions = [
      "Lead with a strong professional summary highlighting key skills.",
      "Use action verbs: 'Managed,' 'Resolved,' 'Improved,' 'Achieved.'",
      `Quantify achievements relevant to your ${roleLabel} experience.`,
      "Keep it to one page for entry-level, two pages max for experienced.",
      "Include relevant certifications and training.",
      "Tailor your resume for each application — match keywords from the job description.",
    ];
    base.coverLetter = generateMockCoverLetter(roleLabel);
    base.salaryScript = generateMockSalaryScript();
    base.practiceGuide = generateMockPracticeGuide();
  }

  return base;
}

/* ───────────────────────────────────────────
   Category-specific full interview questions
   ─────────────────────────────────────────── */

const CATEGORY_QUESTIONS: Record<string, string[]> = {
  bpo: [
    "Tell me about yourself and why you're interested in a BPO/customer service role.",
    "How would you handle an angry customer who wants to speak with a manager?",
    "Describe a time when you went above and beyond for a customer.",
    "What do you know about our company and the BPO industry?",
    "Why should we hire you over other candidates for this customer service role?",
    "How do you handle working in a fast-paced call center environment?",
    "What is your greatest weakness when it comes to customer interactions?",
    "Are you comfortable working night shifts to serve international clients?",
    "How would you deal with a difficult coworker on the same account?",
    "Where do you see yourself in 5 years within the BPO industry?",
    "How do you handle repetitive calls without losing your energy?",
    "Can you work independently without a supervisor listening to every call?",
    "What does excellent customer service mean to you?",
    "How do you multitask — handling a call while navigating systems simultaneously?",
    "Do you have any questions for us about this BPO role?",
  ],
  va: [
    "Tell me about yourself and why you want to work as a Virtual Assistant.",
    "How do you prioritize when multiple clients need things urgently?",
    "Describe a time you managed a complex calendar or scheduling conflict.",
    "What tools and software are you proficient in for remote work?",
    "Why should we hire you as our Virtual Assistant?",
    "How do you manage your time when working from home without direct supervision?",
    "What is your greatest weakness when working remotely?",
    "Are you comfortable working across different time zones?",
    "How do you communicate effectively with a client who gives vague instructions?",
    "Where do you see your VA career in 5 years?",
    "How do you stay focused and productive during long remote work days?",
    "Describe your home office setup and how you ensure reliable connectivity.",
    "What does being proactive mean to you as a Virtual Assistant?",
    "How do you handle confidential information from clients?",
    "Do you have any questions about this Virtual Assistant position?",
  ],
  sales: [
    "Tell me about yourself and what drew you to sales/retail.",
    "A customer is hesitant to purchase — how do you close the deal?",
    "Describe a time you exceeded a sales target or quota.",
    "What do you know about our products and brand?",
    "Why should we hire you for this sales position?",
    "How do you handle rejection from customers?",
    "What is your greatest weakness as a salesperson?",
    "Are you comfortable working weekends and holidays during peak retail seasons?",
    "How do you build rapport with a first-time customer?",
    "Where do you see yourself in 5 years in the sales/retail industry?",
    "How do you upsell or cross-sell without being pushy?",
    "Can you handle inventory management and visual merchandising?",
    "What does excellent customer experience mean to you in retail?",
    "How do you handle a product complaint or return request?",
    "Do you have any questions about this sales role?",
  ],
  "web-dev": [
    "Tell me about yourself and your programming background.",
    "Describe a challenging bug you encountered and how you debugged it.",
    "Walk me through how you'd build a new feature from scratch.",
    "What do you know about our tech stack and products?",
    "Why should we hire you for this developer position?",
    "How do you handle tight deadlines on a complex coding project?",
    "What is your greatest technical weakness?",
    "Are you comfortable learning new programming languages or frameworks?",
    "How do you handle code review feedback that you disagree with?",
    "Where do you see yourself in 5 years as a developer?",
    "How do you keep up with the latest technologies and trends?",
    "Can you work independently on features without detailed specifications?",
    "What does clean, maintainable code mean to you?",
    "How do you handle competing priorities across multiple projects?",
    "Do you have any questions about the engineering team?",
  ],
  nurse: [
    "Tell me about yourself and why you chose nursing.",
    "Describe a critical patient situation and how you handled it.",
    "How do you handle the emotional toll of patient care?",
    "What do you know about our hospital/facility?",
    "Why should we hire you for this nursing position?",
    "How do you perform under pressure in emergency situations?",
    "What is your greatest weakness as a healthcare professional?",
    "Are you comfortable with rotating shifts and on-call duties?",
    "How do you handle a disagreement with a doctor about patient care?",
    "Where do you see yourself in 5 years in the healthcare field?",
    "How do you stay current with medical protocols and best practices?",
    "Can you manage multiple patients with different acuity levels?",
    "What does patient-centered care mean to you?",
    "How do you ensure accurate medication administration and documentation?",
    "Do you have any questions about working at our facility?",
  ],
};

function getMockQuestion(index: number, role: string, categoryId: string): string {
  const categoryQuestions = CATEGORY_QUESTIONS[categoryId];
  if (categoryQuestions && categoryQuestions[index]) {
    return categoryQuestions[index];
  }
  // Fallback: generic with role name injected
  const generic = [
    `Tell me about yourself and why you're interested in this ${role} role.`,
    `How would you handle a difficult situation in a ${role} context?`,
    "Describe a time when you went above and beyond.",
    "What do you know about our company?",
    "Why should we hire you over other candidates?",
    "How do you handle working in a fast-paced environment?",
    "What is your greatest weakness?",
    "Are you comfortable with shifting schedules?",
    "How would you deal with a difficult coworker?",
    "Where do you see yourself in 5 years?",
    "How do you handle repetitive tasks without losing motivation?",
    "Can you work independently without constant supervision?",
    `What does excellent performance mean to you in a ${role} role?`,
    "How do you handle multiple tasks at the same time?",
    "Do you have any questions for us?",
  ];
  return generic[index] || `Question ${index + 1} for ${role}`;
}

function getMockAnswer(index: number, role: string, _categoryId: string): string {
  return `[Strong sample answer for question ${index + 1} tailored to ${role}. This will be generated by AI in production.]`;
}

function getMockTrap(index: number, _categoryId: string): string {
  return `[Recruiter trap warning for question ${index + 1}. AI will generate context-specific warnings in production.]`;
}

function generateMockCoverLetter(role: string): string {
  return `Dear Hiring Manager,\n\nI am writing to express my strong interest in the ${role} position at [Company Name]. [This cover letter will be AI-generated and tailored to the specific role and experience level in production.]\n\nSincerely,\n[Your Name]`;
}

function generateMockSalaryScript(): string {
  return "1. Research market rates on JobStreet, Glassdoor, and Kalibrr.\n2. Let them make the first offer if possible.\n3. Give a range, not a fixed number.\n4. Consider the full package: HMO, allowances, bonuses.\n5. Never accept or reject immediately — ask for time to review.";
}

function generateMockPracticeGuide(): string[] {
  return [
    "Day 1: Read all 15 questions and answers. Highlight the most relevant ones.",
    "Day 2: Practice the top 5 questions out loud. Record and review yourself.",
    "Day 3: Research the company. Tailor your 'Tell me about yourself' answer.",
    "Day 4: Practice behavioral questions using the STAR method.",
    "Day 5: Do a mock interview with a friend or family member.",
    "Day 6: Review your resume and cover letter for alignment.",
    "Day 7: Final review. Prepare outfit, documents, and logistics.",
  ];
}

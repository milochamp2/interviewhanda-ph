import type { TeaserResult, FullResult, SessionState } from "@/types";

export const mockTeaserResult: TeaserResult = {
  readinessSummary:
    "Based on your profile, you have a solid foundation for this role. Focus on demonstrating customer empathy and problem-solving skills during your interview.",
  previewQuestions: [
    "Tell me about yourself and why you're interested in this role.",
    "How would you handle an angry customer who wants to speak with a manager?",
    "Describe a time when you went above and beyond for someone.",
  ],
  sampleAnswer:
    "When asked 'Tell me about yourself,' structure your answer using the Present-Past-Future framework: Start with your current situation, briefly mention relevant past experience, then connect it to why this role excites you. For example: 'I recently graduated with a degree in Communication and completed an internship at a customer service center where I handled 50+ calls daily. I'm excited about this BPO role because I want to grow my skills in a fast-paced environment while helping customers resolve their concerns.'",
  tips: [
    "Research the company thoroughly before your interview — know their products, values, and recent news.",
    "Practice your answers out loud, not just in your head. Record yourself to check your tone and pacing.",
    "Prepare 2-3 thoughtful questions to ask the interviewer at the end.",
  ],
};

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

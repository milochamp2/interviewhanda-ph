/**
 * InterviewHanda PH — MVP Configuration
 * All configurable content in one place for easy updates.
 */

export const SITE = {
  name: "InterviewHanda PH",
  tagline: "Ace Your Next Job Interview",
  url: "https://interviewhanda.ph",
} as const;

export const PRICE = {
  amount: 249,
  formatted: "₱249",
  currency: "PHP",
} as const;

export const MESSENGER = {
  /** Facebook Page Messenger URL — update with your real page */
  url: "https://m.me/interviewhanda",
  /** Prefilled message sent after "I've Paid" */
  prefill: (job: string, ref: string) =>
    `Hi! I just paid ₱249 for InterviewHanda PH.\nJob: ${job}\nRef: ${ref}`,
} as const;

export const PAYMENT = {
  /** GCash QR code image path (place in /public) */
  gcashQr: "/images/gcash-qr.png",
  /** Maya QR code image path (place in /public) */
  mayaQr: "/images/maya-qr.png",
  /** GCash account name shown below QR */
  gcashName: "InterviewHanda PH",
  /** Maya account name shown below QR */
  mayaName: "InterviewHanda PH",
  /** GCash number */
  gcashNumber: "0917-XXX-XXXX",
  /** Maya number */
  mayaNumber: "0917-XXX-XXXX",
} as const;

export interface JobCategory {
  id: string;
  label: string;
  icon: string;
}

export const JOB_CATEGORIES: JobCategory[] = [
  { id: "bpo", label: "Customer Service / BPO", icon: "Headset" },
  { id: "va", label: "Virtual Assistant", icon: "Laptop" },
  { id: "admin", label: "Admin Assistant", icon: "ClipboardList" },
  { id: "sales", label: "Sales / Retail", icon: "ShoppingBag" },
  { id: "service-crew", label: "Service Crew", icon: "UtensilsCrossed" },
  { id: "nurse", label: "Nurse / Healthcare", icon: "HeartPulse" },
  { id: "teacher", label: "Teacher / ESL", icon: "BookOpen" },
  { id: "tech", label: "Tech / Developer", icon: "Code" },
  { id: "others", label: "Others", icon: "PlusCircle" },
] as const;

export const TEASER_QUESTIONS: { question: string; locked?: boolean }[] = [
  { question: "Tell me about yourself." },
  { question: "Why do you want to work here?" },
  { question: "What are your strengths and weaknesses?" },
  { question: "Where do you see yourself in 5 years?" },
  { question: "Why should we hire you?" },
  { question: "Describe a time you handled a difficult situation." },
  { question: "What motivates you at work?" },
  { question: "Do you have any questions for us?" },
  { question: "How do you handle pressure or stress?", locked: true },
  { question: "What is your expected salary?", locked: true },
  { question: "Tell me about a time you failed.", locked: true },
  { question: "How do you prioritize your tasks?", locked: true },
  { question: "Why did you leave your last job?", locked: true },
];

export const WHATS_INSIDE = [
  "15 tailored interview questions & strong sample answers",
  "Recruiter traps to watch out for",
  "Interview tips specific to your job category",
  "Resume improvement suggestions",
  "Cover letter template",
  "Salary negotiation script",
  "7-day practice guide",
] as const;

export const TRUST_ITEMS = [
  { stat: "2,400+", label: "Kits Delivered" },
  { stat: "4.9/5", label: "Average Rating" },
  { stat: "93%", label: "Got Callbacks" },
] as const;

export const TESTIMONIALS = [
  {
    name: "Maria S.",
    role: "BPO Agent",
    text: "Sobrang nakatulong! Got the job sa first interview ko.",
  },
  {
    name: "John R.",
    role: "Virtual Assistant",
    text: "The sample answers gave me so much confidence. Worth every peso!",
  },
  {
    name: "Ana L.",
    role: "Nurse",
    text: "Nag-review lang ako ng 2 days tapos pumasa agad. Salamat!",
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: "What do I get for ₱249?",
    a: "You get a complete interview prep kit: 15 tailored questions with expert answers, tips, recruiter traps, resume suggestions, cover letter, salary script, and a 7-day practice guide — all specific to your job category.",
  },
  {
    q: "How do I receive the kit?",
    a: "After payment, message us on Messenger. We'll verify your payment and send a Google Drive link with all your materials within minutes.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept GCash and Maya. Just scan the QR code, pay ₱249, and message us to confirm.",
  },
  {
    q: "How fast will I receive it?",
    a: "Most orders are verified and delivered within 5–15 minutes during business hours (8 AM – 10 PM).",
  },
  {
    q: "Is it personalized to my job?",
    a: "Yes! You select your job category and we send you a kit tailored to that specific role.",
  },
  {
    q: "Can I get a refund?",
    a: "Since this is a digital product delivered instantly, we don't offer refunds. But we guarantee you'll find it valuable!",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Pick Your Job",
    description: "Choose from 9 popular job categories in the Philippines.",
  },
  {
    step: 2,
    title: "Pay ₱249",
    description: "Scan the GCash or Maya QR code. Quick and easy.",
  },
  {
    step: 3,
    title: "Get Your Kit",
    description: "Message us on Messenger and receive your Google Drive link.",
  },
] as const;

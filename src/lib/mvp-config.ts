/**
 * InterviewHanda PH — MVP Configuration
 * All configurable content in one place for easy updates.
 */

export const SITE = {
  name: "InterviewHanda PH",
  tagline: "Ace Your Next Job Interview",
  url: "https://interviewhanda-ph.vercel.app",
} as const;

export const PRICE = {
  amount: 249,
  formatted: "₱249",
  currency: "PHP",
} as const;

export const MESSENGER = {
  /** Facebook Page Messenger URL — replace YOUR_PAGE_ID with actual page */
  url: "https://m.me/YOUR_PAGE_ID",
  /** Prefilled message sent after category selection */
  prefill: (job: string) =>
    `Hi! I'd like to get the InterviewHanda kit for: ${job}`,
  /** Prefilled message sent after payment */
  paidPrefill: (job: string, ref: string) =>
    `Hi! I just paid ₱249 for InterviewHanda PH.\nJob: ${job}\nRef: ${ref}`,
} as const;

export const PAYMENT = {
  gcashQr: "/images/gcash-qr.png",
  mayaQr: "/images/maya-qr.png",
  gcashName: "InterviewHanda PH",
  mayaName: "InterviewHanda PH",
  gcashNumber: "0917-XXX-XXXX",
  mayaNumber: "0917-XXX-XXXX",
} as const;

export interface JobCategory {
  id: string;
  label: string;
  emoji: string;
}

export const JOB_CATEGORIES: JobCategory[] = [
  { id: "bpo", label: "Customer Service / BPO", emoji: "🎧" },
  { id: "va", label: "Virtual Assistant", emoji: "💻" },
  { id: "admin", label: "Admin Assistant", emoji: "📋" },
  { id: "sales", label: "Sales / Retail", emoji: "🛍️" },
  { id: "service-crew", label: "Service Crew", emoji: "🍽️" },
  { id: "nurse", label: "Nurse / Healthcare", emoji: "🏥" },
  { id: "teacher", label: "Teacher / ESL", emoji: "📚" },
  { id: "tech", label: "Tech / Developer", emoji: "⚙️" },
  { id: "others", label: "Others", emoji: "✨" },
];

export const KIT_CONTENTS = [
  {
    title: "15 Tailored Interview Questions & Sample Answers",
    description: "Real questions Filipino employers ask — with strong, proven answers.",
  },
  {
    title: "Recruiter Traps & How to Dodge Them",
    description: "Know the trick questions before they catch you off guard.",
  },
  {
    title: "Job-Specific Interview Tips",
    description: "Tips tailored to your exact job category.",
  },
  {
    title: "Resume Improvement Suggestions",
    description: "Quick fixes to make your resume stand out.",
  },
  {
    title: "Cover Letter Template + Salary Script",
    description: "Ready-to-use templates for applications and salary talks.",
  },
  {
    title: "7-Day Practice Guide",
    description: "Day-by-day plan so you're 100% ready by interview day.",
  },
] as const;

export const PRICE_FEATURES = [
  "15 tailored Q&As for your job",
  "Recruiter traps + job tips",
  "Resume, cover letter & salary templates",
  "7-day practice guide",
  "Instant delivery via Google Drive",
] as const;

export const TRUST_ITEMS = [
  { stat: "2,400+", label: "Kits Delivered" },
  { stat: "4.9/5", label: "Rating" },
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

export const PAYMENT_BADGES = [
  { emoji: "🟢", label: "GCash" },
  { emoji: "🟣", label: "Maya" },
  { emoji: "🔒", label: "Secure" },
  { emoji: "⚡", label: "Instant" },
  { emoji: "📁", label: "Google Drive" },
] as const;

export const FAQ_ITEMS = [
  {
    q: "What do I get for ₱249?",
    a: "A complete interview prep kit: 15 tailored Q&As, recruiter trap warnings, job-specific tips, resume suggestions, cover letter template, salary negotiation script, and a 7-day practice guide.",
  },
  {
    q: "How do I receive the kit?",
    a: "After payment, message us on Messenger with your receipt and job category. We'll send your Google Drive link — usually within minutes.",
  },
  {
    q: "What payment methods do you accept?",
    a: "GCash and Maya. Scan the QR code and send us a screenshot of your payment confirmation.",
  },
  {
    q: "Gaano kabilis ko matatanggap?",
    a: "Most kits are delivered within minutes. During peak hours, it may take up to a few hours.",
  },
  {
    q: "Is it personalized to my job?",
    a: "Yes! Each kit is tailored with industry-relevant questions, answers, and tips specific to your chosen job category.",
  },
  {
    q: "Can I get a refund?",
    a: "Due to the digital nature of the product, refunds aren't available once the kit has been delivered. But we're confident you'll find it worth every peso.",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Pick your job category",
    description: "Choose from 9 popular roles in the Philippines.",
  },
  {
    step: 2,
    title: "Pay ₱249 via GCash or Maya",
    description: "Scan the QR code. Screenshot your receipt.",
  },
  {
    step: 3,
    title: "Message us on Messenger",
    description: "Send your category + receipt. We'll reply with your Google Drive link.",
  },
] as const;

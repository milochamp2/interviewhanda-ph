import type { Language } from "@/types";

const translations = {
  en: {
    hero: {
      title: "Ace Your Next Job Interview",
      subtitle:
        "Get personalized interview questions, expert answers, and preparation tips tailored to your dream job in the Philippines.",
      cta: "Start Preparing Now",
    },
    nav: {
      howItWorks: "How It Works",
      categories: "Job Categories",
      pricing: "Pricing",
      faq: "FAQ",
    },
    howItWorks: {
      title: "How It Works",
      steps: [
        {
          title: "Choose Your Job",
          description: "Select your target job category from our list.",
        },
        {
          title: "Answer Quick Questions",
          description:
            "Tell us about your experience level and target role.",
        },
        {
          title: "Get Your Prep Kit",
          description:
            "Receive tailored interview questions with strong sample answers.",
        },
      ],
    },
    categories: {
      title: "Popular Job Categories",
      subtitle: "Select the role you're preparing for",
    },
    trust: {
      title: "Secure & Trusted Payment",
      subtitle: "Pay easily with GCash, Maya, or any debit/credit card.",
      badge: "Powered by PayMongo",
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "Do I need to create an account?",
          a: "No! Just pay and get instant access. No login required.",
        },
        {
          q: "How long do I have access?",
          a: "Your access lasts 30 days from the date of purchase.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept GCash, Maya, and all major debit/credit cards through PayMongo.",
        },
        {
          q: "Can I extend my access?",
          a: "Yes! You can extend for 7 more days at ₱149 or renew for a full 30 days.",
        },
        {
          q: "What's included in the Career Bundle?",
          a: "Everything in the base plan plus resume suggestions, cover letter generator, salary negotiation script, and a 7-day practice guide.",
        },
      ],
    },
    footer: {
      cta: "Ready to ace your interview?",
      ctaButton: "Get Started",
      copyright: "InterviewHanda PH. All rights reserved.",
    },
    questionnaire: {
      title: "Let's Prepare You",
      selectCategory: "What job are you applying for?",
      enterRole: "Enter your job role",
      selectExperience: "What's your experience level?",
      experienceLevels: {
        fresh: "Fresh Graduate",
        "1-3": "1–3 Years Experience",
        "3+": "3+ Years Experience",
      },
      jobDescription: "Paste the job description (optional)",
      jobDescriptionHint:
        "This helps us tailor questions to the specific role.",
      next: "Continue",
      back: "Back",
      generating: "Generating your prep kit...",
    },
    teaser: {
      title: "Your Interview Readiness Preview",
      readiness: "Readiness Summary",
      previewQuestions: "Preview Questions",
      sampleAnswer: "Sample Strong Answer",
      tips: "Quick Preparation Tips",
      locked: "Full content locked",
      unlock: "Unlock Full Interview Prep Kit",
      unlockCta: "Continue to Secure Checkout – ₱399",
      includes: "Includes 15 interview questions, sample answers, and more.",
    },
    checkout: {
      title: "Complete Your Order",
      basePlan: "Interview Preparation Kit",
      bundlePlan: "Complete Career Bundle",
      basePrice: "₱399",
      bundlePrice: "₱999",
      upgradeToggle: "Upgrade to Complete Career Bundle",
      orderSummary: "Order Summary",
      total: "Total",
      payNow: "Pay Now – Secure Checkout",
      paymentMethods: "Pay with GCash, Maya, or Card",
      secure: "Secured by PayMongo",
      comparison: {
        title: "Compare Plans",
        features: [
          { label: "15 tailored interview questions", base: true, bundle: true },
          { label: "Strong sample answers", base: true, bundle: true },
          { label: "PDF download", base: true, bundle: true },
          { label: "Interview tips & recruiter traps", base: true, bundle: true },
          { label: "Resume suggestions", base: false, bundle: true },
          { label: "Cover letter generator", base: false, bundle: true },
          { label: "Salary negotiation script", base: false, bundle: true },
          { label: "7-day practice guide", base: false, bundle: true },
        ],
      },
    },
    success: {
      title: "Your Interview Prep Kit is Ready!",
      subtitle: "Here's everything you need to ace your interview.",
      downloadPdf: "Download PDF",
      sendEmail: "Send to Email",
      enterEmail: "Enter your email address",
      send: "Send",
      kitTitle: "View Your Prep Kit",
      kitSubtitle: "Access your interview questions, tips, and all the materials included in your plan.",
      viewKit: "Open Prep Kit",
      driveTitle: "Download from Google Drive",
      driveSubtitle: "Your complete materials are also available for download in Google Drive.",
      openDrive: "Open in Google Drive",
    },
    kit: {
      baseBadge: "₱399 Plan",
      bundleBadge: "₱999 Career Bundle",
      sections: {
        questions: "Interview Questions",
        tips: "Tips & Traps",
        resume: "Resume Suggestions",
        cover: "Cover Letter",
        salary: "Salary Script",
        guide: "7-Day Practice Guide",
      },
      strongAnswer: "Strong Answer",
      recruiterTrap: "Recruiter Trap",
      interviewTips: "Interview Tips",
      trapsToWatch: "Recruiter Traps to Watch",
      upgradeTitle: "Unlock with Career Bundle",
      upgradeSubtitle: "This feature is included in the ₱999 Career Bundle plan. Upgrade to access:",
      upgradeCta: "Upgrade to ₱999 Career Bundle",
      wantMore: "Want the complete package?",
      upgradeHint: "Resume, cover letter, salary script & practice guide",
      upgrade: "Upgrade",
    },
    expiry: {
      daysLeft: "days left",
      hoursLeft: "hours left",
      accessExpiring: "Your access is expiring soon",
      accessExpired: "Your access has expired",
      graceMessage: "You can still view your content, but downloads are disabled.",
      extend7: "Extend 7 Days – ₱149",
      renew30: "Renew 30 Days – ₱399",
      upgradeBundle: "Upgrade to Career Bundle – ₱999",
    },
    common: {
      others: "Others",
      php: "₱",
    },
  },
  tl: {
    hero: {
      title: "Ipasa ang Susunod Mong Job Interview",
      subtitle:
        "Kumuha ng personalized na interview questions, expert answers, at preparation tips na angkop sa dream job mo sa Pilipinas.",
      cta: "Mag-umpisa Na",
    },
    nav: {
      howItWorks: "Paano Ito Gumagana",
      categories: "Mga Trabaho",
      pricing: "Presyo",
      faq: "FAQ",
    },
    howItWorks: {
      title: "Paano Ito Gumagana",
      steps: [
        {
          title: "Piliin ang Trabaho Mo",
          description: "Pumili ng job category mula sa aming listahan.",
        },
        {
          title: "Sagutin ang Ilang Tanong",
          description:
            "Sabihin sa amin ang experience level at target role mo.",
        },
        {
          title: "Kunin ang Prep Kit Mo",
          description:
            "Makakuha ng tailored interview questions na may sample answers.",
        },
      ],
    },
    categories: {
      title: "Mga Sikat na Trabaho",
      subtitle: "Piliin ang role na pinag-hahanda mo",
    },
    trust: {
      title: "Ligtas at Mapagkakatiwalaang Bayaran",
      subtitle:
        "Madaling magbayad gamit ang GCash, Maya, o kahit anong debit/credit card.",
      badge: "Powered by PayMongo",
    },
    faq: {
      title: "Mga Madalas Itanong",
      items: [
        {
          q: "Kailangan ko bang gumawa ng account?",
          a: "Hindi! Magbayad lang at instant access agad. Walang login needed.",
        },
        {
          q: "Gaano katagal ang access ko?",
          a: "30 araw ang access mo mula sa araw ng pagbayad.",
        },
        {
          q: "Anong payment methods ang tinatanggap?",
          a: "Tumatanggap kami ng GCash, Maya, at lahat ng major debit/credit cards sa pamamagitan ng PayMongo.",
        },
        {
          q: "Pwede ko bang i-extend ang access?",
          a: "Oo! Pwede kang mag-extend ng 7 araw sa ₱149 o mag-renew ng 30 araw.",
        },
        {
          q: "Ano ang kasama sa Career Bundle?",
          a: "Lahat ng nasa base plan plus resume suggestions, cover letter generator, salary negotiation script, at 7-day practice guide.",
        },
      ],
    },
    footer: {
      cta: "Handa ka na ba sa interview mo?",
      ctaButton: "Mag-umpisa Na",
      copyright: "InterviewHanda PH. All rights reserved.",
    },
    questionnaire: {
      title: "Ihanda Ka Namin",
      selectCategory: "Anong trabaho ang inaapplyan mo?",
      enterRole: "Ilagay ang job role mo",
      selectExperience: "Ano ang experience level mo?",
      experienceLevels: {
        fresh: "Bagong Graduate",
        "1-3": "1–3 Taon na May Karanasan",
        "3+": "3+ Taon na May Karanasan",
      },
      jobDescription: "I-paste ang job description (optional)",
      jobDescriptionHint:
        "Makakatulong ito para mas tailored ang mga tanong.",
      next: "Magpatuloy",
      back: "Bumalik",
      generating: "Ginagawa ang prep kit mo...",
    },
    teaser: {
      title: "Preview ng Iyong Interview Readiness",
      readiness: "Readiness Summary",
      previewQuestions: "Preview na mga Tanong",
      sampleAnswer: "Sample na Magandang Sagot",
      tips: "Mabilisang Preparation Tips",
      locked: "Naka-lock ang buong content",
      unlock: "I-unlock ang Full Interview Prep Kit",
      unlockCta: "Magpatuloy sa Secure Checkout – ₱399",
      includes:
        "Kasama ang 15 interview questions, sample answers, at marami pa.",
    },
    checkout: {
      title: "Kumpletuhin ang Order Mo",
      basePlan: "Interview Preparation Kit",
      bundlePlan: "Complete Career Bundle",
      basePrice: "₱399",
      bundlePrice: "₱999",
      upgradeToggle: "I-upgrade sa Complete Career Bundle",
      orderSummary: "Buod ng Order",
      total: "Kabuuan",
      payNow: "Magbayad Na – Secure Checkout",
      paymentMethods: "Magbayad gamit ang GCash, Maya, o Card",
      secure: "Secured by PayMongo",
      comparison: {
        title: "Ikumpara ang mga Plan",
        features: [
          {
            label: "15 tailored interview questions",
            base: true,
            bundle: true,
          },
          { label: "Magagandang sample answers", base: true, bundle: true },
          { label: "PDF download", base: true, bundle: true },
          {
            label: "Interview tips at recruiter traps",
            base: true,
            bundle: true,
          },
          { label: "Resume suggestions", base: false, bundle: true },
          { label: "Cover letter generator", base: false, bundle: true },
          { label: "Salary negotiation script", base: false, bundle: true },
          { label: "7-day practice guide", base: false, bundle: true },
        ],
      },
    },
    success: {
      title: "Handa na ang Interview Prep Kit Mo!",
      subtitle: "Narito ang lahat ng kailangan mo para ipasa ang interview.",
      downloadPdf: "I-download ang PDF",
      sendEmail: "Ipadala sa Email",
      enterEmail: "Ilagay ang email address mo",
      send: "Ipadala",
      kitTitle: "Tingnan ang Prep Kit Mo",
      kitSubtitle: "I-access ang interview questions, tips, at lahat ng materials na kasama sa plan mo.",
      viewKit: "Buksan ang Prep Kit",
      driveTitle: "I-download mula sa Google Drive",
      driveSubtitle: "Available din ang mga materials mo para i-download sa Google Drive.",
      openDrive: "Buksan sa Google Drive",
    },
    kit: {
      baseBadge: "₱399 Plan",
      bundleBadge: "₱999 Career Bundle",
      sections: {
        questions: "Mga Tanong sa Interview",
        tips: "Tips at Traps",
        resume: "Resume Suggestions",
        cover: "Cover Letter",
        salary: "Salary Script",
        guide: "7-Day Practice Guide",
      },
      strongAnswer: "Magandang Sagot",
      recruiterTrap: "Recruiter Trap",
      interviewTips: "Interview Tips",
      trapsToWatch: "Mga Recruiter Traps na Bantayan",
      upgradeTitle: "I-unlock gamit ang Career Bundle",
      upgradeSubtitle: "Kasama ang feature na ito sa ₱999 Career Bundle plan. Mag-upgrade para ma-access:",
      upgradeCta: "Mag-upgrade sa ₱999 Career Bundle",
      wantMore: "Gusto mo ba ng complete package?",
      upgradeHint: "Resume, cover letter, salary script at practice guide",
      upgrade: "Mag-upgrade",
    },
    expiry: {
      daysLeft: "araw na lang",
      hoursLeft: "oras na lang",
      accessExpiring: "Malapit nang mag-expire ang access mo",
      accessExpired: "Nag-expire na ang access mo",
      graceMessage:
        "Pwede mo pa ring tingnan ang content mo, pero naka-disable ang downloads.",
      extend7: "I-extend ng 7 Araw – ₱149",
      renew30: "I-renew ng 30 Araw – ₱399",
      upgradeBundle: "I-upgrade sa Career Bundle – ₱999",
    },
    common: {
      others: "Iba Pa",
      php: "₱",
    },
  },
} as const;

export type Translations = typeof translations.en;

export function getTranslations(lang: Language): Translations {
  return translations[lang] as Translations;
}

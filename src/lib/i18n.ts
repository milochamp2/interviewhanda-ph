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
      driveTitle: "Access Your Full Prep Kit",
      driveSubtitle: "Your complete interview preparation materials are ready in Google Drive. Access them anytime within your plan duration.",
      openDrive: "Open in Google Drive",
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
      driveTitle: "I-access ang Buong Prep Kit Mo",
      driveSubtitle: "Handa na ang mga interview preparation materials mo sa Google Drive. I-access ito kahit kailan sa loob ng plan duration mo.",
      openDrive: "Buksan sa Google Drive",
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

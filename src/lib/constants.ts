import type { JobCategory } from "@/types";

export const JOB_CATEGORIES: JobCategory[] = [
  { id: "bpo", label: { en: "Customer Service / Call Center (BPO)", tl: "Customer Service / Call Center (BPO)" }, icon: "headset" },
  { id: "va", label: { en: "Virtual Assistant (VA)", tl: "Virtual Assistant (VA)" }, icon: "laptop" },
  { id: "admin", label: { en: "Administrative Assistant", tl: "Administrative Assistant" }, icon: "clipboard" },
  { id: "sales", label: { en: "Sales Associate / Retail", tl: "Sales Associate / Retail" }, icon: "shopping-bag" },
  { id: "service-crew", label: { en: "Service Crew (Fast Food / Restaurant)", tl: "Service Crew (Fast Food / Restaurant)" }, icon: "utensils" },
  { id: "social-media", label: { en: "Social Media Manager", tl: "Social Media Manager" }, icon: "share-2" },
  { id: "digital-marketing", label: { en: "Digital Marketing Specialist", tl: "Digital Marketing Specialist" }, icon: "trending-up" },
  { id: "graphic-design", label: { en: "Graphic Designer", tl: "Graphic Designer" }, icon: "palette" },
  { id: "web-dev", label: { en: "Web Developer / Programmer", tl: "Web Developer / Programmer" }, icon: "code" },
  { id: "teacher", label: { en: "Teacher / ESL Teacher", tl: "Teacher / ESL Teacher" }, icon: "book-open" },
  { id: "nurse", label: { en: "Nurse / Healthcare Worker", tl: "Nurse / Healthcare Worker" }, icon: "heart-pulse" },
  { id: "accountant", label: { en: "Accountant / Bookkeeper", tl: "Accountant / Bookkeeper" }, icon: "calculator" },
  { id: "hr", label: { en: "HR Assistant", tl: "HR Assistant" }, icon: "users" },
  { id: "real-estate", label: { en: "Real Estate Agent", tl: "Real Estate Agent" }, icon: "home" },
  { id: "delivery", label: { en: "Delivery Rider / Logistics Staff", tl: "Delivery Rider / Logistics Staff" }, icon: "truck" },
  { id: "others", label: { en: "Others", tl: "Iba Pa" }, icon: "plus-circle" },
];

export const PRICING = {
  base: 399,
  bundle: 999,
  extend7: 149,
  renew30: 399,
} as const;

export const ACCESS_DURATION_DAYS = 30;
export const EXTEND_DURATION_DAYS = 7;

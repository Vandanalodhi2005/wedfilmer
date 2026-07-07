import {
  Camera,
  Heart,
  Video,
  Building2,
  Cake,
  Users,
  Sparkles,
  UsersRound,
  Zap,
  Palette,
  MonitorSmartphone,
  Award,
  type LucideIcon,
} from "lucide-react";

// Navigation
export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
] as const;

// Stats
export const STATS = [
  { value: 500, suffix: "+", label: "Events Covered" },
  { value: 1000, suffix: "+", label: "Happy Clients" },
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 4.9, suffix: "", label: "Client Rating", decimals: 1 },
] as const;

// Services
export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const SERVICES: Service[] = [
  {
    title: "Wedding Photography",
    description:
      "Capture every beautiful moment of your wedding day with our artistic and emotional approach to storytelling.",
    icon: Camera,
  },
  {
    title: "Pre-Wedding Shoots",
    description:
      "Creative storytelling sessions before your big day that capture the romance and excitement of your journey.",
    icon: Heart,
  },
  {
    title: "Cinematic Videography",
    description:
      "High-quality wedding films and event coverage that bring your memories to life with cinematic excellence.",
    icon: Video,
  },
  {
    title: "Corporate Events",
    description:
      "Professional event photography for businesses, conferences, and corporate celebrations.",
    icon: Building2,
  },
  {
    title: "Birthday Celebrations",
    description:
      "Memories that last a lifetime — from milestone birthdays to intimate gatherings.",
    icon: Cake,
  },
  {
    title: "Family Functions",
    description:
      "Beautiful documentation of family gatherings, reunions, and celebrations that matter most.",
    icon: Users,
  },
];

// Portfolio categories
export const PORTFOLIO_CATEGORIES = [
  "All",
  "Wedding",
  "Pre-Wedding",
  "Corporate",
  "Events",
  "Family",
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export interface PortfolioItem {
  id: number;
  title: string;
  category: Exclude<PortfolioCategory, "All">;
  aspect: "portrait" | "landscape" | "square";
  gradient: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 1, title: "Golden Hour Vows", category: "Wedding", aspect: "portrait", gradient: "from-amber-900/60 to-rose-900/60" },
  { id: 2, title: "Garden Romance", category: "Pre-Wedding", aspect: "landscape", gradient: "from-emerald-900/60 to-teal-900/60" },
  { id: 3, title: "Annual Gala Night", category: "Corporate", aspect: "square", gradient: "from-blue-900/60 to-indigo-900/60" },
  { id: 4, title: "Beachside Ceremony", category: "Wedding", aspect: "landscape", gradient: "from-cyan-900/60 to-sky-900/60" },
  { id: 5, title: "First Birthday Joy", category: "Events", aspect: "portrait", gradient: "from-pink-900/60 to-fuchsia-900/60" },
  { id: 6, title: "Family Reunion", category: "Family", aspect: "square", gradient: "from-orange-900/60 to-amber-900/60" },
  { id: 7, title: "Sunset Engagement", category: "Pre-Wedding", aspect: "portrait", gradient: "from-rose-900/60 to-orange-900/60" },
  { id: 8, title: "Corporate Summit", category: "Corporate", aspect: "landscape", gradient: "from-slate-800/60 to-zinc-900/60" },
  { id: 9, title: "Royal Wedding", category: "Wedding", aspect: "square", gradient: "from-violet-900/60 to-purple-900/60" },
  { id: 10, title: "Family Portrait", category: "Family", aspect: "landscape", gradient: "from-lime-900/60 to-green-900/60" },
  { id: 11, title: "Carnival Night", category: "Events", aspect: "portrait", gradient: "from-red-900/60 to-rose-900/60" },
  { id: 12, title: "Mountain Elopement", category: "Wedding", aspect: "landscape", gradient: "from-stone-800/60 to-neutral-900/60" },
];

// Why choose us
export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const FEATURES: Feature[] = [
  {
    title: "Creative Storytelling",
    description: "We don't just take photos — we craft visual narratives that capture the essence of your celebration.",
    icon: Sparkles,
  },
  {
    title: "Professional Team",
    description: "Our experienced photographers and videographers bring expertise and artistry to every shoot.",
    icon: UsersRound,
  },
  {
    title: "Fast Delivery",
    description: "Receive your beautifully edited photos and videos within the promised timeline, every time.",
    icon: Zap,
  },
  {
    title: "Premium Editing",
    description: "Each image is meticulously edited with our signature cinematic color grading and retouching.",
    icon: Palette,
  },
  {
    title: "Latest Equipment",
    description: "We use industry-leading cameras, lenses, and lighting to deliver exceptional quality.",
    icon: MonitorSmartphone,
  },
  {
    title: "Client Satisfaction",
    description: "With a 4.9-star rating from 1000+ clients, your satisfaction is our greatest achievement.",
    icon: Award,
  },
];

// Testimonials
export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Priya & Arjun Sharma",
    role: "Wedding Couple",
    quote:
      "Wed Filmer captured our wedding day so beautifully that every time we look at the photos, we relive those magical moments. Their attention to detail and creative approach exceeded all our expectations.",
    rating: 5,
    initials: "PS",
  },
  {
    name: "Sneha Kapoor",
    role: "Corporate Event Manager",
    quote:
      "We've hired Wed Filmer for three consecutive annual galas and they never disappoint. Their professionalism, punctuality, and stunning output make them our go-to photography partner.",
    rating: 5,
    initials: "SK",
  },
  {
    name: "Ravi & Meera Patel",
    role: "Pre-Wedding Shoot",
    quote:
      "The pre-wedding shoot was an absolute dream. They found the most incredible locations and made us feel so comfortable. The photos look like they belong in a magazine!",
    rating: 5,
    initials: "RP",
  },
  {
    name: "Ananya Desai",
    role: "Birthday Celebration",
    quote:
      "They captured my daughter's first birthday with such warmth and creativity. Every candid moment, every smile — nothing was missed. Truly exceptional work!",
    rating: 5,
    initials: "AD",
  },
  {
    name: "Vikram & Nisha Singh",
    role: "Destination Wedding",
    quote:
      "Our destination wedding in Udaipur was perfectly documented. The cinematic film they produced brought tears of joy to our family. Worth every penny and more.",
    rating: 5,
    initials: "VS",
  },
];

// Pricing
export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Silver Package",
    price: "₹25,000",
    description: "Perfect for intimate celebrations and small events.",
    features: [
      "4 Hours Photography",
      "100+ Edited Photos",
      "Online Gallery Access",
      "7-Day Delivery",
      "1 Photographer",
      "Email Support",
    ],
    highlighted: false,
  },
  {
    name: "Gold Package",
    price: "₹55,000",
    description: "Ideal for weddings and premium events.",
    features: [
      "8 Hours Photography",
      "300+ Edited Photos",
      "Cinematic Highlight Film",
      "Online Gallery + USB Drive",
      "3-Day Priority Delivery",
      "2 Photographers",
      "Pre-Wedding Shoot Included",
      "Dedicated Support",
    ],
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Platinum Package",
    price: "₹1,00,000",
    description: "The ultimate luxury experience for grand celebrations.",
    features: [
      "Full Day Coverage (12+ Hours)",
      "500+ Edited Photos",
      "Cinematic Wedding Film",
      "Drone Coverage",
      "Premium Photo Album",
      "3 Photographers + Videographer",
      "Same-Day Edits Preview",
      "Pre & Post Wedding Shoots",
      "24/7 Priority Support",
    ],
    highlighted: false,
  },
];

// Process steps
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Consultation",
    description: "We begin with a detailed discussion to understand your vision, preferences, and event requirements.",
  },
  {
    step: 2,
    title: "Planning",
    description: "Our team creates a tailored photography plan covering timelines, locations, and creative concepts.",
  },
  {
    step: 3,
    title: "Photography",
    description: "On the day, we capture every emotion, detail, and candid moment with artistic precision.",
  },
  {
    step: 4,
    title: "Editing",
    description: "Each photo is carefully curated and edited with our signature cinematic style and color grading.",
  },
  {
    step: 5,
    title: "Delivery",
    description: "Receive your stunning photos and films through our secure online gallery and premium packaging.",
  },
];

// FAQ
export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How far in advance should we book?",
    answer:
      "We recommend booking at least 2-3 months in advance for weddings and major events. Popular dates fill up quickly, so early booking ensures availability and allows time for proper planning.",
  },
  {
    question: "Do you travel for destination weddings?",
    answer:
      "Absolutely! We love destination weddings and have covered events across India and internationally. Travel costs are discussed separately based on the location and duration.",
  },
  {
    question: "How long does it take to receive the final photos?",
    answer:
      "Delivery timelines depend on your package — Silver delivers within 7 days, Gold within 3 days, and Platinum includes same-day preview edits. Full cinematic films may take up to 4 weeks.",
  },
  {
    question: "Can we customize a package?",
    answer:
      "Yes, we offer fully customizable packages to suit your specific needs and budget. Contact us to discuss your requirements, and we'll create a tailored proposal for you.",
  },
  {
    question: "What equipment do you use?",
    answer:
      "We use professional-grade Canon and Sony mirrorless cameras, premium L-series and G-Master lenses, professional lighting setups, stabilizers, and drones for aerial coverage.",
  },
  {
    question: "Do you provide raw/unedited photos?",
    answer:
      "We provide all professionally edited photos as part of your package. Raw files can be made available upon special request with an additional processing fee.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We offer a full refund for cancellations made 30+ days before the event. Cancellations within 30 days are subject to a 50% retention fee. Date changes can be accommodated subject to availability.",
  },
  {
    question: "Do you offer videography services?",
    answer:
      "Yes! Our Gold and Platinum packages include cinematic videography. We also offer standalone videography packages with highlight reels, full ceremony coverage, and documentary-style films.",
  },
];

// Social links
export const SOCIAL_LINKS = [
  { name: "Instagram", url: "https://instagram.com/wedfilmer" },
  { name: "Facebook", url: "https://facebook.com/wedfilmer" },
  { name: "YouTube", url: "https://youtube.com/@wedfilmer" },
  { name: "Pinterest", url: "https://pinterest.com/wedfilmer" },
] as const;

// Contact info
export const CONTACT_INFO = {
  email: "wedfilmer@gmail.com",
  phone: "+91 7978681650",
  whatsapp: "https://wa.me/917978681650",
  address: "Odisha, India",
  mapUrl: "https://maps.google.com/?q=Odisha",
} as const;

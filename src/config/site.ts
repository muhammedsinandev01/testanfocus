// ============================================================================
// AN FOCUS — Site Configuration
// Central configuration for all site content, metadata, and settings.
// Update text content here — no need to touch component files.
// ============================================================================

export const siteConfig = {
  name: 'AN FOCUS',
  url: 'https://anfocus.in',
  description:
    'Events, film, digital marketing and web development for brands in India and abroad. Brief us today.',
  locale: 'en_IN',

  contact: {
    email: 'anfocusevent@gmail.com',
    phones: ['+91 9895401085', '+91 9497766169'],
    whatsapp: '919895401085',
    website: 'anfocus.in',
    instagram: '@anfocusevents',
    instagramUrl: 'https://instagram.com/anfocusevents',
    location: 'Kerala, India',
  },

  social: {
    instagram: 'https://instagram.com/anfocusevents',
  },
} as const;

// ============================================================================
// SEO Metadata per page/section
// ============================================================================
export const seoConfig = {
  home: {
    title: 'AN FOCUS — Creative & Digital Marketing Agency, Kerala',
    description:
      'Events, film, digital marketing and web development for brands in India and abroad. Brief us today.',
  },
  digitalMarketing: {
    title: 'Digital Marketing Agency in Kerala — AN FOCUS',
    description:
      'Social media, Meta and Google Ads and lead generation with clear monthly reports.',
  },
  events: {
    title: 'Event Management & Ticketing, Kerala — AN FOCUS',
    description:
      'Concerts, corporate and college events with online ticketing and QR entry.',
  },
  production: {
    title: 'Photography & Video Production, Kerala — AN FOCUS',
    description: 'Product shoots, promo videos, reels and brand films.',
  },
  technology: {
    title: 'Website Development, Kerala — AN FOCUS',
    description:
      'Fast mobile-first websites, landing pages and booking systems.',
  },
} as const;

// ============================================================================
// Navigation
// ============================================================================
export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

// ============================================================================
// Hero Section
// ============================================================================
export const heroContent = {
  headline: 'Ideas become experiences\nthe world remembers.',
  subheadline:
    'AN FOCUS is a creative studio in Kerala, India. We unite events, film and photography, digital marketing and technology for brands that think beyond borders.',
  cta: {
    primary: { label: 'Brief us from anywhere', href: '#contact' },
    secondary: { label: 'See our work', href: '#work' },
  },
} as const;

// ============================================================================
// Introduction / Studio Section
// ============================================================================
export const introContent = {
  heading: 'Four connected capabilities.\nOne coordinated team.',
  body: 'AN FOCUS brings events, creative production, digital marketing, and technology together under one team. One brief, one plan, one point of contact — everything your brand needs to move forward.',
} as const;

// ============================================================================
// Services
// ============================================================================
export interface ServiceItem {
  id: string;
  number: string;
  headline: string;
  description: string;
  includes: string[];
  cta: { label: string; href: string };
  mediaKey: string;
}

export const services: ServiceItem[] = [
  {
    id: 'events',
    number: '01',
    headline: 'Live moments,\nengineered to be remembered.',
    description:
      'Concerts, corporate events, college festivals and cultural programmes, planned, produced and promoted. We also handle online ticket booking and QR entry.',
    includes: [
      'Concept and planning',
      'Production',
      'Promotion',
      'Ticketing',
      'Photography',
      'Videography',
    ],
    cta: { label: 'Plan my event', href: '#contact' },
    mediaKey: 'events',
  },
  {
    id: 'production',
    number: '02',
    headline: 'Craft you can see.\nFeeling you can't ignore.',
    description:
      'Product and commercial photography, promotional videos, reels and corporate films for food, hospitality, real estate, automotive, fashion and education.',
    includes: [
      'Shoot planning',
      'Production',
      'Editing',
      'Delivery in every format',
    ],
    cta: { label: 'Produce my content', href: '#contact' },
    mediaKey: 'production',
  },
  {
    id: 'marketing',
    number: '03',
    headline: 'Attention that turns\ninto enquiries.',
    description:
      'Social media management, Meta Ads, Google Ads and lead-generation systems with clear monthly reports.',
    includes: [
      'Strategy',
      'Content',
      'Ad campaigns',
      'Landing pages',
      'Reporting',
    ],
    cta: { label: 'Grow my business', href: '#contact' },
    mediaKey: 'marketing',
  },
  {
    id: 'technology',
    number: '04',
    headline: 'Websites and booking\nthat work as hard as you do.',
    description:
      'Fast, mobile-first websites, landing pages, event registration, online ticketing and QR entry.',
    includes: [
      'Design',
      'Development',
      'Hosting setup',
      'Tracking',
      'Support',
    ],
    cta: { label: 'Build online', href: '#contact' },
    mediaKey: 'technology',
  },
];

// ============================================================================
// Process / How We Work
// ============================================================================
export const processSteps = [
  {
    number: '01',
    title: 'Brief',
    description: 'We listen and agree goals.',
  },
  {
    number: '02',
    title: 'Plan',
    description: 'Strategy, timeline, budget.',
  },
  {
    number: '03',
    title: 'Create',
    description: 'Design, content, production, build.',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Go live with tracking.',
  },
  {
    number: '05',
    title: 'Grow',
    description: 'Review monthly and improve.',
  },
] as const;

// ============================================================================
// Why AN FOCUS
// ============================================================================
export const whyContent = {
  heading: 'Why AN FOCUS',
  points: [
    'One team for events, content, marketing and web.',
    'Clear plans, timelines and reports.',
    'Built for enquiries and sales, not just likes.',
    'Work with clients across India and abroad.',
  ],
} as const;

// ============================================================================
// About
// ============================================================================
export const aboutContent = {
  heading: 'About AN FOCUS',
  paragraphs: [
    'AN FOCUS is a creative studio in Kerala, India, and the digital media and production brand of A.N. Industries.',
    'We began with a belief: every great brand and every unforgettable event starts with one idea and the right team.',
    'Our team brings together strategy, design, content, video, web development and project management, so clients get one plan and one point of contact.',
  ],
  teamCount: 8,
} as const;

// ============================================================================
// FAQ
// ============================================================================
export const faqItems = [
  {
    question: 'Where are you based?',
    answer:
      'Kerala, India. We work with clients across India and abroad.',
  },
  {
    question: 'Can you work with international clients?',
    answer:
      'Yes. We plan calls across time zones and quote in INR, USD or AED.',
  },
  {
    question: 'Can I start with one service?',
    answer: 'Yes. Many clients start with one and add more.',
  },
  {
    question: 'How do I start?',
    answer:
      'Send us a brief on WhatsApp or email and we reply with clear next steps.',
  },
  {
    question: 'Do you offer a free consultation?',
    answer: 'Yes, a free call.',
  },
] as const;

// ============================================================================
// Contact Section
// ============================================================================
export const contactContent = {
  heading: 'Let's make your next idea matter.',
  subheading: 'Start a project.',
} as const;

// ============================================================================
// Analytics / Tracking Placeholders
// ============================================================================
export const analyticsConfig = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
} as const;

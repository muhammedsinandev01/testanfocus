// ============================================================================
// AN FOCUS — Site Configuration
// Central configuration for all site content, metadata, and settings.
// Update text content here — no need to touch component files.
// ============================================================================

import { hasPublishedWork } from './media';

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
    instagramUrl: 'https://www.instagram.com/anfocusevents',
    facebook: 'AN Focus Events',
    facebookUrl: 'https://www.facebook.com/profile.php?id=61591709681753',
    location: 'Kerala, India',
  },

  booking: {
    url: 'https://booking.anfocus.in',
    label: 'Book Event',
    // Event currently on sale. Every "Book tickets" button opens this page
    // straight at its ticket (tier) list. Update both lines for the next
    // event; leave them empty when nothing is on sale and the buttons fall
    // back to the booking site's home page.
    ticketsUrl: 'https://booking.anfocus.in/events/agneya-the-amritha-experience/#tickets' as string,
    ticketsLabel: 'Get Tickets – Agneya, 26 Dec' as string,
  },

  social: {
    instagram: 'https://www.instagram.com/anfocusevents',
    facebook: 'https://www.facebook.com/profile.php?id=61591709681753',
  },
} as const;

// Where ticket buttons send customers: the on-sale event's ticket list, or
// the booking home page when no event is set.
export const ticketBooking = {
  url: siteConfig.booking.ticketsUrl || siteConfig.booking.url,
  label: siteConfig.booking.ticketsLabel || 'Book Events / Tickets',
};

// Event card shown at the top of the landing page. It only appears while
// booking.ticketsUrl is set, so clearing that line hides it too. Copy the
// details from the event page on booking.anfocus.in. The poster must be
// hosted under booking.anfocus.in/media/ (allowed in next.config.ts).
export const featuredEvent = {
  show: Boolean(siteConfig.booking.ticketsUrl),
  status: 'On sale now',
  title: 'Agneya – The Amritha Experience',
  tagline: 'Amritha Rajan live in Thiruvananthapuram',
  date: 'Sat, 26 Dec 2026',
  time: '7:00 PM',
  venue: 'Al Saj Open Ground, Kazhakkoottam, Thiruvananthapuram',
  poster:
    'https://booking.anfocus.in/media/events/9e57e011-6659-43bb-bd9a-5ed45d987bb2/poster/agneya-poster_vX6Ls9g_cASajZ8.jpg',
  posterAlt: 'Agneya – The Amritha Experience poster',
  // Softly blurred photo behind the hero. A landscape shot works best.
  background:
    'https://booking.anfocus.in/media/events/9e57e011-6659-43bb-bd9a-5ed45d987bb2/gallery/IMG_3819_RpDYnVw.jpg',  tiers: [
    { name: 'VVIP', price: '₹1499' },
    { name: 'VIP', price: '₹1199' },
    { name: 'Platinum', price: '₹899' },
    { name: 'Gold', price: '₹699' },
    { name: 'Silver', price: '₹499' },
  ],
  priceFrom: '₹499',
  note: 'Pay by UPI, card or netbanking. Tickets arrive on WhatsApp and email.',
};

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
// The Work link only appears once real projects are published (see media.ts).
export const navLinks: { label: string; href: string }[] = [
  { label: 'Services', href: '#services' },
  ...(hasPublishedWork ? [{ label: 'Work', href: '#work' }] : []),
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

// ============================================================================
// Hero Section
// ============================================================================
export const heroContent = {
  headline: 'Ideas become experiences\nthe world remembers.',
  subheadline:
    'AN FOCUS is a creative studio in Kerala, India. We unite events, film and photography, digital marketing and technology for brands that think beyond borders.',
  cta: {
    primary: { label: 'Start a project', href: '#contact' },
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
    headline: "Craft you can see.\nFeeling you can't ignore.",
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
  heading: "Let's make your next idea matter.",
  subheading: "Start a project.",
} as const;

// ============================================================================
// Analytics / Tracking Placeholders
// ============================================================================
export const analyticsConfig = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
} as const;


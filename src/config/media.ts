// ============================================================================
// AN FOCUS — Media Configuration
// Centralized media paths. Replace placeholder paths with actual media.
// All media paths are relative to /public.
// ============================================================================

export interface MediaAsset {
  type: 'video' | 'image';
  src: string;
  poster?: string;
  alt: string;
  fallbackSrc?: string;
}

// ============================================================================
// Hero Media
// ============================================================================
export const heroMedia: MediaAsset = {
  type: 'video',
  src: '/media/hero/hero-reel.mp4',
  poster: '/media/hero/hero-poster.jpg',
  alt: 'AN FOCUS creative studio showreel',
  fallbackSrc: '/media/hero/hero-fallback.jpg',
};

// ============================================================================
// Service Section Media
// ============================================================================
export const serviceMedia: Record<string, MediaAsset> = {
  events: {
    type: 'image',
    src: '/media/events/events-hero.jpg',
    alt: 'AN FOCUS event production',
  },
  production: {
    type: 'image',
    src: '/media/production/production-hero.jpg',
    alt: 'AN FOCUS creative production',
  },
  marketing: {
    type: 'image',
    src: '/media/marketing/marketing-hero.jpg',
    alt: 'AN FOCUS digital marketing',
  },
  technology: {
    type: 'image',
    src: '/media/technology/technology-hero.jpg',
    alt: 'AN FOCUS technology and web development',
  },
};

// ============================================================================
// Portfolio / Work Media
// ============================================================================
export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  isSample: boolean;
  media: MediaAsset;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'sample-event-01',
    title: 'Sample Event Project',
    category: 'Events',
    isSample: true,
    media: {
      type: 'image',
      src: '/media/work/sample-event-01.jpg',
      alt: 'Sample event project placeholder',
    },
  },
  {
    id: 'sample-production-01',
    title: 'Sample Production Project',
    category: 'Creative Production',
    isSample: true,
    media: {
      type: 'image',
      src: '/media/work/sample-production-01.jpg',
      alt: 'Sample production project placeholder',
    },
  },
  {
    id: 'sample-marketing-01',
    title: 'Sample Marketing Project',
    category: 'Digital Marketing',
    isSample: true,
    media: {
      type: 'image',
      src: '/media/work/sample-marketing-01.jpg',
      alt: 'Sample marketing project placeholder',
    },
  },
  {
    id: 'sample-technology-01',
    title: 'Sample Technology Project',
    category: 'Technology',
    isSample: true,
    media: {
      type: 'image',
      src: '/media/work/sample-technology-01.jpg',
      alt: 'Sample technology project placeholder',
    },
  },
];

// Only real (non-sample) projects are shown on the site. While every entry
// above is a sample, the Work section and its nav links stay hidden.
// To publish a project: add its media, set `isSample: false`, and add its
// write-up in `components/sections/Portfolio.tsx`.
export const publishedProjects = portfolioProjects.filter((p) => !p.isSample);
export const hasPublishedWork = publishedProjects.length > 0;

// ============================================================================
// Team Placeholders
// ============================================================================
export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  photo: string;
  isPlaceholder: boolean;
}

export const teamMembers: TeamMember[] = Array.from({ length: 8 }, (_, i) => ({
  id: `team-member-${i + 1}`,
  name: 'Team Member',
  designation: 'Designation',
  photo: `/media/team/member-${i + 1}.jpg`,
  isPlaceholder: true,
}));

// Only real team members are shown. Replace the placeholders above with real
// names, roles and photos (and `isPlaceholder: false`) to publish the team grid.
export const publishedTeam = teamMembers.filter((m) => !m.isPlaceholder);


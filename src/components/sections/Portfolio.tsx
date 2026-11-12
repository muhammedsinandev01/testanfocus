'use client';

// ============================================================================
// AN FOCUS — Portfolio / Work Showcase
// Cinematic project cards with category filters, sample project designations,
// and a complete reusable Case Study viewer modal.
// ============================================================================

import { useState } from 'react';
import { portfolioProjects, type PortfolioProject } from '@/config/media';
import { trackEvent } from '@/lib/analytics';
import ScrollReveal from '@/components/ui/ScrollReveal';
import MediaRenderer from '@/components/ui/MediaRenderer';
import { X, ArrowUpRight, Sparkles, Layers } from 'lucide-react';

interface CaseStudyDetails {
  clientIndustry: string;
  challenge: string;
  whatWeDid: string[];
  resultPlaceholder: string;
  testimonialPlaceholder: string;
}

const sampleCaseStudyDetails: Record<string, CaseStudyDetails> = {
  'sample-event-01': {
    clientIndustry: 'Live Concert & Festival Production (Sample Concept)',
    challenge:
      'Seamless multi-stage audio-visual planning, 15,000+ attendee crowd flow, and real-time QR gate verification under tight 48-hour turnarounds.',
    whatWeDid: [
      'Stage architecture & dynamic lighting matrix',
      'End-to-end artist hospitality & tech riders',
      'High-throughput mobile QR ticketing platform',
      'Live cinematic multi-cam recap reel',
    ],
    resultPlaceholder:
      'Actual client metrics, ticket velocity, and gate clearance speeds will be documented here upon official project release.',
    testimonialPlaceholder:
      'Client testimonial and executive endorsement will be published upon project sign-off.',
  },
  'sample-production-01': {
    clientIndustry: 'Commercial Brand Film & Editorial Photography (Sample Concept)',
    challenge:
      'Capturing authentic craft and luxury atmosphere across diverse locations with color-calibrated formats for 4K broadcast, cinema, and vertical social feeds.',
    whatWeDid: [
      'Creative direction & visual storyboard treatments',
      'High-speed robotic cinematography & studio lighting',
      'DaVinci Resolve color grading & spatial audio mixing',
      'Delivery of 40+ multi-aspect ratio social deliverables',
    ],
    resultPlaceholder:
      'Official engagement figures, viewer retention metrics, and campaign reach will appear here.',
    testimonialPlaceholder:
      'Creative Director & Brand Lead feedback will be highlighted in this slot.',
  },
  'sample-marketing-01': {
    clientIndustry: 'Performance Growth & Meta/Google Lead Engines (Sample Concept)',
    challenge:
      'Lowering customer acquisition costs while scaling qualified high-intent enquiries in competitive regional and international markets.',
    whatWeDid: [
      'Full-funnel audience segmentation & creative matrix',
      'Dynamic retargeting architecture across Meta & Google',
      'High-converting bespoke landing page funnels',
      'Automated weekly CRM data pipelines & executive dashboards',
    ],
    resultPlaceholder:
      'Real conversion rate uplifts, ROAS percentages, and lead counts will be populated here.',
    testimonialPlaceholder:
      'Growth Director quote regarding lead quality and ROI will be displayed here.',
  },
  'sample-technology-01': {
    clientIndustry: 'Digital Experience, Mobile Ticketing & Web Platform (Sample Concept)',
    challenge:
      'Zero-latency web performance during ticket drops, sub-second QR scanners, and an editorial international brand identity.',
    whatWeDid: [
      'Next.js 16 App Router & edge CDN infrastructure',
      'Sub-50ms QR validation scanner backend',
      'Custom headless CMS for editorial publishing',
      'Full accessibility & Core Web Vitals optimization',
    ],
    resultPlaceholder:
      'Lighthouse 100/100 performance scores and transaction volumes will be verified and showcased here.',
    testimonialPlaceholder:
      'CTO/Product Partner review will be published in this space.',
  },
};

const categories = ['All', 'Events', 'Creative Production', 'Digital Marketing', 'Technology'] as const;

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);

  const filteredProjects =
    selectedCategory === 'All'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === selectedCategory);

  const handleOpenProject = (project: PortfolioProject) => {
    trackEvent('portfolio_view', {
      category: 'portfolio',
      label: project.title,
    });
    setActiveModalProject(project);
  };

  return (
    <section id="work" className="relative w-full bg-[#080808] py-28 md:py-40 px-6 md:px-12 lg:px-20 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <ScrollReveal direction="up">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#A78BFA]">
                05 &mdash; SELECTED WORK
              </span>
              <div className="h-px w-16 bg-[#A78BFA]/40" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#F5F5F5] uppercase">
              Proof of craft.
            </h2>
          </ScrollReveal>

          {/* Sample Work Integrity Notice */}
          <ScrollReveal direction="up" delay={100}>
            <div className="p-4 bg-[#111111] border border-white/[0.1] rounded-sm max-w-md">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A78BFA] mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Editorial Spec Notice</span>
              </div>
              <p className="text-xs text-[#A0A0A0] leading-relaxed">
                Items below are designated architectural sample templates. AN FOCUS maintains strict client NDAs; full case studies and production reels will be populated upon client release.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Category Filters */}
        <ScrollReveal direction="up" delay={150}>
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-16 border-b border-white/[0.08] pb-6">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 text-xs font-mono uppercase tracking-[0.18em] rounded-sm transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-[#F5F5F5] text-[#080808] font-semibold'
                    : 'bg-[#111111] text-[#A0A0A0] hover:text-[#F5F5F5] border border-white/[0.08]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Portfolio Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal key={project.id} direction="up" delay={idx * 100}>
              <div
                onClick={() => handleOpenProject(project)}
                className="group relative cursor-pointer flex flex-col bg-[#111111] border border-white/[0.1] hover:border-[#A78BFA]/50 transition-all duration-500 rounded-sm overflow-hidden"
              >
                {/* Media Card Showcase */}
                <div className="aspect-[16/10] w-full overflow-hidden relative">
                  <MediaRenderer
                    media={project.media}
                    aspectRatio="16:9"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/20 opacity-70 group-hover:opacity-40 transition-opacity" />

                  {/* Sample Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#080808]/85 backdrop-blur-md border border-white/[0.15] text-[10px] font-mono uppercase tracking-[0.2em] text-[#A78BFA] rounded-sm">
                      SAMPLE CASE STUDY
                    </span>
                  </div>

                  {/* Quick Expand Hint */}
                  <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#A78BFA] text-[#080808] text-[11px] font-mono uppercase tracking-widest font-semibold rounded-sm">
                      View Case Template <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>

                {/* Project Details Footer */}
                <div className="p-6 md:p-8 flex items-end justify-between border-t border-white/[0.08]">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#A0A0A0]/70 block mb-2">
                      {project.category}
                    </span>
                    <h3 className="font-display text-2xl font-light text-[#F5F5F5] uppercase tracking-wide group-hover:text-[#A78BFA] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="h-10 w-10 rounded-full border border-white/[0.15] flex items-center justify-center group-hover:border-[#A78BFA] group-hover:bg-[#A78BFA] group-hover:text-[#080808] transition-all">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* =====================================================================
          FULL-SCREEN REUSABLE CASE STUDY MODAL
          Structured strictly to prompt standards:
          - Client & Industry
          - Challenge
          - What We Did
          - Result Slot
          - Testimonial Slot
          - 3-5 Media Placeholders
      ===================================================================== */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#080808] border border-white/[0.15] rounded-sm shadow-2xl p-6 sm:p-10 lg:p-12">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/[0.1] pb-6 mb-8">
              <div>
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#A78BFA] mb-2">
                  <span>SAMPLE ARCHITECTURAL CASE STUDY</span>
                  <span>&bull;</span>
                  <span>{activeModalProject.category}</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-light text-[#F5F5F5] uppercase">
                  {activeModalProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="p-2 text-[#A0A0A0] hover:text-[#F5F5F5] rounded-sm hover:bg-white/[0.05] transition-colors"
                aria-label="Close Case Study"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Case Study Grid Details */}
            {(() => {
              const details =
                sampleCaseStudyDetails[activeModalProject.id] ||
                sampleCaseStudyDetails['sample-event-01'];

              return (
                <div className="space-y-12">
                  {/* Meta Specs */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-[#111111] border border-white/[0.08] rounded-sm font-mono text-xs">
                    <div>
                      <span className="text-[#A0A0A0]/60 block uppercase tracking-widest mb-1">
                        Client / Industry
                      </span>
                      <span className="text-[#F5F5F5] font-sans font-medium text-sm">
                        {details.clientIndustry}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#A0A0A0]/60 block uppercase tracking-widest mb-1">
                        Discipline
                      </span>
                      <span className="text-[#A78BFA] font-medium text-sm">
                        {activeModalProject.category}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#A0A0A0]/60 block uppercase tracking-widest mb-1">
                        Status
                      </span>
                      <span className="text-[#F5F5F5] font-medium text-sm">
                        Sample Production Ready
                      </span>
                    </div>
                  </div>

                  {/* Challenge & What We Did */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-[#A78BFA] mb-4">
                        The Challenge
                      </h4>
                      <p className="text-base text-[#A0A0A0] leading-relaxed font-light">
                        {details.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-[#A78BFA] mb-4">
                        What We Executed
                      </h4>
                      <ul className="space-y-3">
                        {details.whatWeDid.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-[#F5F5F5] font-light"
                          >
                            <span className="font-mono text-xs text-[#A78BFA] mt-0.5">
                              0{idx + 1}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Reusable Visual Assets Showcase (3-5 Placeholders) */}
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-[#A0A0A0]/70 mb-4 flex items-center gap-2">
                      <Layers className="h-4 w-4 text-[#A78BFA]" />
                      <span>Case Media Assets (4 Selected Views)</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((assetIdx) => (
                        <div
                          key={assetIdx}
                          className="aspect-[4/3] bg-[#111111] border border-white/[0.08] rounded-sm p-4 flex flex-col justify-between"
                        >
                          <span className="font-mono text-[10px] uppercase text-[#A78BFA]">
                            REEL #{assetIdx}
                          </span>
                          <span className="font-mono text-[10px] text-[#A0A0A0]/50 uppercase tracking-widest">
                            MEDIA READY
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Result & Testimonial Slots */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/[0.08]">
                    <div className="p-6 bg-[#111111] border border-white/[0.08] rounded-sm">
                      <h5 className="font-mono text-xs uppercase tracking-[0.2em] text-[#A78BFA] mb-3">
                        Verified Outcome
                      </h5>
                      <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed italic">
                        &ldquo;{details.resultPlaceholder}&rdquo;
                      </p>
                    </div>

                    <div className="p-6 bg-[#111111] border border-white/[0.08] rounded-sm">
                      <h5 className="font-mono text-xs uppercase tracking-[0.2em] text-[#A78BFA] mb-3">
                        Client Testimonial Slot
                      </h5>
                      <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed italic">
                        &ldquo;{details.testimonialPlaceholder}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="flex justify-end pt-4">
                    <a
                      href="#contact"
                      onClick={() => setActiveModalProject(null)}
                      className="px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] bg-[#A78BFA] text-[#080808] font-semibold rounded-sm hover:bg-[#C4B5FD] transition-colors"
                    >
                      Brief us on your project &rarr;
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}


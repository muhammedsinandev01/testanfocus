'use client';

// ============================================================================
// AN FOCUS — Portfolio / Work Showcase
// Project cards with category filters and a case-study modal. Renders only
// published (non-sample) projects; hidden entirely until there is one.
// ============================================================================

import { useEffect, useState } from 'react';
import { publishedProjects, type PortfolioProject } from '@/config/media';
import { trackEvent } from '@/lib/analytics';
import ScrollReveal from '@/components/ui/ScrollReveal';
import MediaRenderer from '@/components/ui/MediaRenderer';
import { X, ArrowUpRight } from 'lucide-react';

interface CaseStudyDetails {
  client: string;
  challenge: string;
  whatWeDid: string[];
  result?: string;
  testimonial?: { quote: string; author: string };
}

// Case-study write-ups keyed by project id (see `portfolioProjects` in
// config/media.ts). A project without an entry still opens, showing its media
// and title only. Use real client details and results — nothing invented.
//
// 'kochi-college-fest-2026': {
//   client: 'Client name — industry',
//   challenge: 'What the client needed.',
//   whatWeDid: ['First thing', 'Second thing'],
//   result: 'A measured outcome.',
//   testimonial: { quote: 'What they said.', author: 'Name, Role' },
// },
const caseStudyDetails: Record<string, CaseStudyDetails> = {};

const categories = [
  'All',
  ...Array.from(new Set(publishedProjects.map((p) => p.category))),
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);

  // Close the case study with Escape and stop the page scrolling behind it
  useEffect(() => {
    if (!activeModalProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalProject(null);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeModalProject]);

  // Nothing real to show yet — keep the section off the page entirely.
  if (publishedProjects.length === 0) return null;

  const filteredProjects =
    selectedCategory === 'All'
      ? publishedProjects
      : publishedProjects.filter((p) => p.category === selectedCategory);

  const details = activeModalProject
    ? caseStudyDetails[activeModalProject.id]
    : undefined;

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
            <span className="block font-mono text-xs uppercase tracking-[0.3em] text-[#A78BFA] mb-4">
              05 &mdash; SELECTED WORK
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#F5F5F5] uppercase">
              Proof of craft.
            </h2>
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
              <button
                type="button"
                onClick={() => handleOpenProject(project)}
                aria-label={`View case study: ${project.title}`}
                className="group relative w-full text-left cursor-pointer flex flex-col bg-[#111111] border border-white/[0.1] hover:border-[#A78BFA]/50 transition-all duration-500 rounded-sm overflow-hidden"
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

                  {/* Quick Expand Hint */}
                  <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#A78BFA] text-[#080808] text-[11px] font-mono uppercase tracking-widest font-semibold rounded-sm">
                      View case study <ArrowUpRight className="h-3.5 w-3.5" />
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
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Case study modal */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeModalProject.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModalProject(null);
          }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-black/85 backdrop-blur-xl animate-fade-in"
        >
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#080808] border border-white/[0.15] rounded-sm shadow-2xl p-6 sm:p-10 lg:p-12">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/[0.1] pb-6 mb-8">
              <div>
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#A78BFA] mb-2">
                  <span>Case study</span>
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

            <div className="space-y-12">
              <div className="aspect-[16/9] w-full overflow-hidden relative rounded-sm">
                <MediaRenderer
                  media={activeModalProject.media}
                  aspectRatio="16:9"
                  className="w-full h-full"
                />
              </div>

              {details && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-[#111111] border border-white/[0.08] rounded-sm font-mono text-xs">
                    <div>
                      <span className="text-[#A0A0A0]/60 block uppercase tracking-widest mb-1">
                        Client
                      </span>
                      <span className="text-[#F5F5F5] font-sans font-medium text-sm">
                        {details.client}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#A0A0A0]/60 block uppercase tracking-widest mb-1">
                        Service
                      </span>
                      <span className="text-[#A78BFA] font-medium text-sm">
                        {activeModalProject.category}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-[#A78BFA] mb-4">
                        The challenge
                      </h4>
                      <p className="text-base text-[#A0A0A0] leading-relaxed font-light">
                        {details.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-[#A78BFA] mb-4">
                        What we did
                      </h4>
                      <ul className="space-y-3">
                        {details.whatWeDid.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-[#F5F5F5] font-light"
                          >
                            <span className="font-mono text-xs text-[#A78BFA] mt-0.5">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {(details.result || details.testimonial) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/[0.08]">
                      {details.result && (
                        <div className="p-6 bg-[#111111] border border-white/[0.08] rounded-sm">
                          <h5 className="font-mono text-xs uppercase tracking-[0.2em] text-[#A78BFA] mb-3">
                            The result
                          </h5>
                          <p className="text-sm text-[#F5F5F5] leading-relaxed">
                            {details.result}
                          </p>
                        </div>
                      )}

                      {details.testimonial && (
                        <div className="p-6 bg-[#111111] border border-white/[0.08] rounded-sm">
                          <p className="text-sm text-[#F5F5F5] leading-relaxed italic">
                            &ldquo;{details.testimonial.quote}&rdquo;
                          </p>
                          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-[#A0A0A0]">
                            {details.testimonial.author}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              <div className="flex justify-end pt-4">
                <a
                  href="#contact"
                  onClick={() => setActiveModalProject(null)}
                  className="px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] bg-[#A78BFA] text-[#080808] font-semibold rounded-sm hover:bg-[#C4B5FD] transition-colors"
                >
                  Start a project like this &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


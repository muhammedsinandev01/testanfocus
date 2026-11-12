'use client';

// ============================================================================
// AN FOCUS — Introduction / Studio Philosophy Section
// Swiss-inspired editorial layout emphasizing the unified 4-capability model.
// ============================================================================

import { introContent } from '@/config/site';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Introduction() {
  return (
    <section
      id="introduction"
      className="relative w-full bg-[#080808] py-28 md:py-40 px-6 md:px-12 lg:px-20 border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#A78BFA]">
              01 &mdash; STUDIO MANIFESTO
            </span>
            <div className="h-px w-16 bg-[#A78BFA]/40" />
          </div>
        </ScrollReveal>

        {/* Big Editorial Headline */}
        <ScrollReveal direction="up" delay={100}>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em] leading-[1.05] text-[#F5F5F5] uppercase whitespace-pre-line max-w-5xl">
            {introContent.heading}
          </h2>
        </ScrollReveal>

        {/* Narrative & Pillar Columns */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Core Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="up" delay={200}>
              <p className="text-xl sm:text-2xl font-light text-[#F5F5F5] leading-relaxed">
                Most agencies fracture your brand across separate vendors. Events don&apos;t align with content; digital campaigns miss the live energy; websites fail to convert attendees into customers.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <p className="text-base sm:text-lg text-[#A0A0A0] leading-relaxed font-normal">
                {introContent.body}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={350}>
              <div className="pt-4 flex items-center gap-4 text-xs font-mono uppercase tracking-[0.2em] text-[#A0A0A0]/80">
                <span className="h-2 w-2 rounded-full bg-[#A78BFA]" />
                <span>Strategy &bull; Production &bull; Performance &bull; Engineering</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: The 4 Coordinated Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                num: '01',
                title: 'Live Events',
                desc: 'Unforgettable moments, sound, lights, QR ticketing and stadium-scale production.',
              },
              {
                num: '02',
                title: 'Film & Media',
                desc: 'Cinematic commercials, reels, product shoots and brand storytelling.',
              },
              {
                num: '03',
                title: 'Growth Marketing',
                desc: 'Data-driven Meta & Google Ads, lead systems and verified ROI reports.',
              },
              {
                num: '04',
                title: 'Digital Tech',
                desc: 'High-speed web platforms, mobile ticketing engines and conversion apps.',
              },
            ].map((pillar, idx) => (
              <ScrollReveal
                key={pillar.num}
                direction="up"
                delay={200 + idx * 80}
                className="h-full"
              >
                <div className="h-full p-6 md:p-8 bg-[#111111]/70 border border-white/[0.08] hover:border-[#A78BFA]/40 transition-colors duration-300 rounded-sm flex flex-col justify-between group">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#A78BFA]">
                      {pillar.num}
                    </span>
                    <h3 className="mt-4 text-lg font-medium text-[#F5F5F5] group-hover:text-[#A78BFA] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#A0A0A0]/60">
                    <span>COORDINATED</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


'use client';

// ============================================================================
// AN FOCUS — Why AN FOCUS Section
// Bold, typography-driven brand positioning with Swiss architectural layout.
// ============================================================================

import { whyContent } from '@/config/site';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function WhyUs() {
  return (
    <section className="relative w-full bg-[#080808] py-28 md:py-40 px-6 md:px-12 lg:px-20 border-b border-white/[0.08] overflow-hidden">
      {/* Generative accent light */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#A78BFA]/[0.04] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#A78BFA]">
              04 &mdash; THE ADVANTAGE
            </span>
            <div className="h-px w-16 bg-[#A78BFA]/40" />
          </div>
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-[#A0A0A0]/60 mb-12">
            POSITIONING &mdash; 2027
          </h2>
        </ScrollReveal>

        {/* Huge Bold Editorial Statement */}
        <ScrollReveal direction="up" delay={100}>
          <div className="border-t border-b border-white/[0.12] py-16 md:py-24">
            <p className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.08] tracking-[-0.02em] text-[#F5F5F5] uppercase">
              One team for events, content, marketing and web. Clear plans, timelines and reports. Built for enquiries and sales, not just likes. Work with clients across India and abroad.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Pillars Breakdown Grid */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyContent.points.map((point, idx) => (
            <ScrollReveal key={idx} direction="up" delay={150 + idx * 80}>
              <div className="p-8 bg-[#111111]/50 border border-white/[0.08] rounded-sm hover:border-[#A78BFA]/40 transition-colors duration-300 h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-[#A78BFA] font-medium tracking-widest block mb-4">
                    0{idx + 1} //
                  </span>
                  <p className="text-base sm:text-lg font-light text-[#F5F5F5] leading-relaxed">
                    {point}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-[#A0A0A0]/60 uppercase tracking-widest">
                  AN FOCUS STANDARD
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

// ============================================================================
// AN FOCUS — About Section & Team Structure
// Brand lineage under A.N. Industries with 8 curated team-member placeholders.
// ============================================================================

import { aboutContent } from '@/config/site';
import { teamMembers } from '@/config/media';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Users2, ShieldCheck, Globe2 } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative w-full bg-[#080808] py-28 md:py-40 px-6 md:px-12 lg:px-20 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        {/* Section Marker */}
        <ScrollReveal direction="up">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#A78BFA]">
              06 &mdash; STUDIO HERITAGE
            </span>
            <div className="h-px w-16 bg-[#A78BFA]/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#F5F5F5] uppercase">
            {aboutContent.heading}
          </h2>
        </ScrollReveal>

        {/* Narrative Columns */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-8">
            {aboutContent.paragraphs.map((paragraph, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 100}>
                <p
                  className={
                    idx === 0
                      ? 'text-xl sm:text-2xl font-light text-[#F5F5F5] leading-relaxed'
                      : 'text-base sm:text-lg text-[#A0A0A0] font-normal leading-relaxed'
                  }
                >
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}

            <ScrollReveal direction="up" delay={300}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-[#A78BFA] shrink-0" />
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-[#A0A0A0]/60">Parent Entity</span>
                    <span className="font-medium text-xs sm:text-sm text-[#F5F5F5]">A.N. Industries</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Globe2 className="h-5 w-5 text-[#A78BFA] shrink-0" />
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-[#A0A0A0]/60">HQ Location</span>
                    <span className="font-medium text-xs sm:text-sm text-[#F5F5F5]">Kerala, India</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users2 className="h-5 w-5 text-[#A78BFA] shrink-0" />
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-[#A0A0A0]/60">Operation</span>
                    <span className="font-medium text-xs sm:text-sm text-[#F5F5F5]">Global Reach</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Architectural Highlights */}
          <div className="lg:col-span-5 bg-[#111111] border border-white/[0.08] p-8 sm:p-10 rounded-sm">
            <ScrollReveal direction="left">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#A78BFA] block mb-4">
                THE STUDIO PROMISE
              </span>
              <h3 className="font-display text-2xl font-light text-[#F5F5F5] uppercase leading-snug">
                One brief. One timeline. One accountable leadership team.
              </h3>
              <p className="mt-4 text-sm text-[#A0A0A0] leading-relaxed">
                Whether you are launching an arena-scale concert in Kochi or deploying a high-growth Meta advertising matrix for Dubai and Mumbai, our multi-disciplinary leads collaborate in synchronous unison.
              </p>

              <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs text-[#A0A0A0]/70">
                <span>COLLABORATIVE MATRIX</span>
                <span className="text-[#A78BFA]">v2027</span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* =====================================================================
            TEAM SECTION — 8 Structured Placeholders (No Fake Inventions)
        ===================================================================== */}
        <div className="mt-28 md:mt-36">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b border-white/[0.08] pb-6">
            <ScrollReveal direction="up">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#A78BFA] block mb-2">
                ORGANIZATIONAL BENCH
              </span>
              <h3 className="font-display text-3xl font-light text-[#F5F5F5] uppercase">
                Core Leadership &amp; Disciplines
              </h3>
            </ScrollReveal>

            <span className="font-mono text-xs uppercase tracking-widest text-[#A0A0A0]/60">
              08 TEAM ROLES
            </span>
          </div>

          {/* 8 Team Member Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {teamMembers.map((member, idx) => (
              <ScrollReveal key={member.id} direction="up" delay={idx * 60}>
                <div className="group p-5 bg-[#111111] border border-white/[0.08] hover:border-[#A78BFA]/40 transition-all duration-300 rounded-sm">
                  {/* Photo Placeholder with Architectural Abstract Pattern */}
                  <div className="aspect-[4/5] w-full bg-[#080808] border border-white/[0.06] rounded-sm overflow-hidden relative flex items-center justify-center mb-5">
                    {/* Abstract Corner Markers */}
                    <div className="absolute top-2 left-2 h-2.5 w-2.5 border-t border-l border-white/20" />
                    <div className="absolute top-2 right-2 h-2.5 w-2.5 border-t border-r border-white/20" />
                    <div className="absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-white/20" />
                    <div className="absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-white/20" />

                    <div className="text-center p-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A0A0A0]/50 block mb-1">
                        PHOTO SLOT
                      </span>
                      <span className="font-mono text-xs text-[#A78BFA]">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-[#A78BFA]/[0.02] group-hover:bg-[#A78BFA]/[0.06] transition-colors" />
                  </div>

                  {/* Name and Designation */}
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[#F5F5F5] font-semibold group-hover:text-[#A78BFA] transition-colors">
                      {member.name} 0{idx + 1}
                    </h4>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-[#A0A0A0]/60">
                      {member.designation}
                    </p>
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

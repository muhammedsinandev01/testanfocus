'use client';

// ============================================================================
// AN FOCUS — About Section & Team Structure
// Brand lineage under A.N. Industries, plus the team grid once real members exist.
// ============================================================================

import { aboutContent } from '@/config/site';
import Image from 'next/image';
import { publishedTeam, hasPublishedWork } from '@/config/media';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Users2, ShieldCheck, Globe2 } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative w-full bg-[#080808] py-28 md:py-40 px-6 md:px-12 lg:px-20 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        {/* Section Marker */}
        <ScrollReveal direction="up">
          <span className="block font-mono text-xs uppercase tracking-[0.3em] text-[#A78BFA] mb-4">
            {hasPublishedWork ? '06' : '05'} &mdash; ABOUT
          </span>
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
                Our promise
              </span>
              <h3 className="font-display text-2xl font-light text-[#F5F5F5] uppercase leading-snug">
                One brief. One timeline. One accountable team.
              </h3>
              <p className="mt-4 text-sm text-[#A0A0A0] leading-relaxed">
                Whether it is a concert in Kochi or an ad campaign for Dubai and Mumbai, the same team plans it, makes it and reports on it.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Team — shown only once real members are added in config/media.ts */}
        {publishedTeam.length > 0 && (
          <div className="mt-28 md:mt-36">
            <div className="mb-12 border-b border-white/[0.08] pb-6">
              <ScrollReveal direction="up">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#A78BFA] block mb-2">
                  The team
                </span>
                <h3 className="font-display text-3xl font-light text-[#F5F5F5] uppercase">
                  The people behind your project
                </h3>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {publishedTeam.map((member, idx) => (
                <ScrollReveal key={member.id} direction="up" delay={idx * 60}>
                  <div className="p-5 bg-[#111111] border border-white/[0.08] rounded-sm">
                    <div className="aspect-[4/5] w-full bg-[#080808] border border-white/[0.06] rounded-sm overflow-hidden relative mb-5">
                      <Image
                        src={member.photo}
                        alt={`${member.name}, ${member.designation}`}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-sm text-[#F5F5F5] font-semibold">
                      {member.name}
                    </h4>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-[#A0A0A0]">
                      {member.designation}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


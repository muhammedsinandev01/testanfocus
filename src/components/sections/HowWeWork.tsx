'use client';

// ============================================================================
// AN FOCUS — How We Work (5-Step Process Timeline)
// Cinematic timeline layout: horizontal scroll on desktop, vertical progression on mobile.
// ============================================================================

import { useState } from 'react';
import { processSteps } from '@/config/site';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="relative w-full bg-[#080808] py-28 md:py-40 border-b border-white/[0.08] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[30vw] bg-[#A78BFA]/[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 md:mb-28">
          <ScrollReveal direction="up">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#A78BFA]">
                03 &mdash; METHODOLOGY
              </span>
              <div className="h-px w-16 bg-[#A78BFA]/40" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#F5F5F5] uppercase">
              How ideas take shape.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <p className="max-w-md text-sm sm:text-base text-[#A0A0A0] font-normal leading-relaxed">
              A five-stage disciplined workflow designed to guarantee creative excellence, budget precision, and measurable outcome.
            </p>
          </ScrollReveal>
        </div>

        {/* Desktop Horizontal Process Timeline */}
        <div className="hidden lg:block">
          {/* Progress Track Line */}
          <div className="relative mb-12">
            <div className="h-px w-full bg-white/[0.1]" />
            <div
              className="absolute top-0 left-0 h-px bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] transition-all duration-500 ease-out"
              style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
            />
          </div>

          {/* 5 Process Grid Columns */}
          <div className="grid grid-cols-5 gap-6">
            {processSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.number}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`relative p-8 rounded-sm border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[320px] ${
                    isActive
                      ? 'bg-[#111111] border-[#A78BFA]/60 shadow-[0_10px_30px_rgba(167,139,250,0.1)]'
                      : 'bg-[#111111]/40 border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  {/* Step Top Index & Status */}
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span
                        className={`font-mono text-xs uppercase tracking-[0.25em] ${
                          isActive ? 'text-[#A78BFA] font-semibold' : 'text-[#A0A0A0]/60'
                        }`}
                      >
                        PHASE {step.number}
                      </span>
                      <div
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          isActive ? 'bg-[#A78BFA] scale-125' : 'bg-white/20'
                        }`}
                      />
                    </div>

                    {/* Step Title */}
                    <h3 className="font-display text-2xl font-light text-[#F5F5F5] uppercase tracking-wide">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="mt-4 text-sm text-[#A0A0A0] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Footer Indicator */}
                  <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px] text-[#A0A0A0]/60">
                    <span>{isActive ? 'ACTIVE STAGE' : 'STAGE'}</span>
                    <span className="font-semibold text-[#F5F5F5]">0{idx + 1}/05</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden relative">
          {/* Vertical Track Line */}
          <div className="absolute left-6 top-4 bottom-4 w-px bg-white/[0.1]" />

          <div className="flex flex-col gap-8">
            {processSteps.map((step, idx) => (
              <ScrollReveal key={step.number} direction="up" delay={idx * 80}>
                <div className="relative pl-14">
                  {/* Circle Node on Timeline */}
                  <div className="absolute left-4 top-1 -translate-x-1/2 h-5 w-5 rounded-full bg-[#080808] border-2 border-[#A78BFA] flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#A78BFA]" />
                  </div>

                  {/* Content Card */}
                  <div className="p-6 bg-[#111111] border border-white/[0.08] rounded-sm">
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#A78BFA] block mb-2">
                      STEP {step.number}
                    </span>
                    <h3 className="font-display text-xl font-light text-[#F5F5F5] uppercase tracking-wide">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#A0A0A0] leading-relaxed">
                      {step.description}
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

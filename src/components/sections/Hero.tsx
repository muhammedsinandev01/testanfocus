'use client';

// ============================================================================
// AN FOCUS — Hero Section
// Full-screen cinematic canvas with centralized video system,
// editorial headline reveal, and ambient futuristic motion.
// ============================================================================

import Image from 'next/image';
import { heroContent } from '@/config/site';
import { heroMedia, hasPublishedWork } from '@/config/media';
import { trackEvent } from '@/lib/analytics';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#080808] pt-32 md:pt-36 pb-8 md:pb-10 px-6 md:px-12 lg:px-20"
    >
      {/* =====================================================================
          CINEMATIC BACKGROUND SYSTEM
          Supports video playback, fallback image/poster, and abstract generative grid.
          Configured centrally via `@/config/media.ts`
      ===================================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Generative ambient gradient layers */}
        <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-[#B48BDF]/10 to-transparent blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tl from-[#622D8E]/8 via-[#B48BDF]/5 to-transparent blur-[160px] pointer-events-none" />

        {/* Abstract cinematic grid & lines */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Diagonal subtle architectural ray */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -60deg,
              transparent,
              transparent 40px,
              rgba(255, 255, 255, 0.3) 40px,
              rgba(255, 255, 255, 0.3) 41px
            )`,
          }}
        />

        {/* Cinematic Hero Background Image (Poster/Fallback) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={heroMedia.poster || '/media/hero/hero-poster.jpg'}
            alt="AN FOCUS Creative Experience"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
        </div>

        {/* Dark vignette overlay for optimal typography readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/40" />
      </div>

      {/* Top Studio Indicator */}
      <div className="relative z-10 flex items-center justify-between text-xs font-mono uppercase tracking-[0.25em] text-[#A0A0A0]/70 border-b border-white/[0.08] pb-4 md:pb-6">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#B48BDF] animate-pulse" />
          <span>Kerala, India &mdash; Available Globally</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>Creative Studio</span>
          <span>An A.N. Industries brand</span>
        </div>
      </div>

      {/* Main Editorial Hero Content */}
      <div className="relative z-10 max-w-6xl my-auto py-8 md:py-10">
        {/* Primary Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.03em] leading-[0.98] text-[#F5F5F5] uppercase">
          Ideas become
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5F5] via-[#E2E8F0] to-[#B48BDF]">
            experiences
          </span>
          <br />
          the world remembers.
        </h1>

        {/* Supporting Paragraph */}
        <p className="mt-6 md:mt-8 max-w-2xl text-base sm:text-lg font-normal text-[#A0A0A0] leading-relaxed tracking-normal">
          {heroContent.subheadline}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 flex-wrap">
          <a
            href={heroContent.cta.primary.href}
            onClick={() =>
              trackEvent('cta_click', {
                category: 'hero',
                label: heroContent.cta.primary.label,
              })
            }
            className="group relative inline-flex items-center justify-center px-8 py-4 text-xs font-mono uppercase tracking-[0.2em] bg-[#622D8E] text-white font-semibold rounded-sm hover:bg-[#7535A8] transition-all duration-300 shadow-[0_0_30px_rgba(180,139,223,0.25)]"
          >
            <span>{heroContent.cta.primary.label}</span>
            <ArrowUpRight className="ml-2 h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>

          <a
            href="https://booking.anfocus.in"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent('cta_click', {
                category: 'hero',
                label: 'Book Events / Tickets',
              })
            }
            className="group relative inline-flex items-center justify-center px-8 py-4 text-xs font-mono uppercase tracking-[0.2em] text-[#F5F5F5] border border-[#B48BDF]/50 bg-[#B48BDF]/10 rounded-sm hover:bg-[#B48BDF]/20 hover:border-[#B48BDF] transition-all duration-300"
          >
            <span>Book Events / Tickets</span>
            <ArrowUpRight className="ml-2 h-4 w-4 text-[#B48BDF] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>

          {hasPublishedWork && (
            <a
              href={heroContent.cta.secondary.href}
              onClick={() =>
                trackEvent('cta_click', {
                  category: 'hero',
                  label: 'See our work',
                })
              }
              className="group inline-flex items-center justify-center px-8 py-4 text-xs font-mono uppercase tracking-[0.2em] text-[#A0A0A0] border border-white/[0.16] rounded-sm hover:text-[#F5F5F5] hover:border-white/40 hover:bg-white/[0.04] transition-all duration-300"
            >
              <span>{heroContent.cta.secondary.label}</span>
            </a>
          )}
        </div>
      </div>

      {/* Bottom Status & Scroll Indicator */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-4 md:pt-6 border-t border-white/[0.08]">
        <div className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-[#A0A0A0]/60">
          <div>
            <span className="text-[#F5F5F5] block font-semibold">04</span>
            <span>Disciplines</span>
          </div>
          <div className="h-6 w-px bg-white/[0.1]" />
          <div>
            <span className="text-[#F5F5F5] block font-semibold">01</span>
            <span>Unified Team</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#introduction"
          className="group hidden sm:inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#A0A0A0]/70 hover:text-[#B48BDF] transition-colors"
          aria-label="Scroll to introduction"
        >
          <span>Scroll to explore</span>
          <div className="h-8 w-8 rounded-full border border-white/[0.15] flex items-center justify-center group-hover:border-[#B48BDF] transition-colors">
            <ArrowDown className="h-3.5 w-3.5 animate-scroll-indicator" />
          </div>
        </a>
      </div>
    </section>
  );
}

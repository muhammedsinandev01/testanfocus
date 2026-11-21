'use client';

// ============================================================================
// AN FOCUS — Event Hero
// Replaces the brand hero while an event is on sale (see Hero.tsx), so the
// first screen sends visitors straight to the ticket list on
// booking.anfocus.in. Content lives in `featuredEvent` in @/config/site.
// ============================================================================

import Image from 'next/image';
import { featuredEvent, heroContent, ticketBooking } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import { ArrowDown, ArrowUpRight, CalendarDays, MapPin, Ticket } from 'lucide-react';

export default function FeaturedEvent() {
  const handleClick = (label: string) =>
    trackEvent('cta_click', { category: 'hero_event', label });

  return (
    <section
      id="hero"
      aria-labelledby="featured-event-title"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#080808] pt-32 md:pt-36 pb-8 md:pb-10 px-6 md:px-12 lg:px-20"
    >
      {/* Background: stage photo with a soft, light blur. The overlay stays
          light at the top and deepens at the bottom so text stays readable
          and the section blends into the dark page below. */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <Image
          src={featuredEvent.background}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105 blur-[5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/20 via-[#080808]/35 via-70% to-[#080808]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/25 via-transparent to-[#080808]/25" />
      </div>

      {/* Event */}
      <div className="relative z-10 w-full max-w-6xl mx-auto my-auto [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] grid grid-cols-[104px_1fr] sm:grid-cols-[180px_1fr] md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-x-5 md:gap-x-12 gap-y-6 items-center">
        {/* Poster */}
        <a
          href={ticketBooking.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleClick('Poster')}
          className="relative block aspect-[2/3] w-full self-start md:self-center overflow-hidden rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/10 md:row-span-2"
        >
          <Image
            src={featuredEvent.poster}
            alt={featuredEvent.posterAlt}
            fill
            priority
            sizes="(min-width: 1024px) 340px, (min-width: 768px) 300px, (min-width: 640px) 180px, 104px"
            className="object-cover"
          />
        </a>

        {/* Title + key facts */}
        <div className="min-w-0 md:self-end">
          <p className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#B48BDF]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#B48BDF] animate-pulse" />
            {featuredEvent.status}
          </p>
          <h1
            id="featured-event-title"
            className="mt-2 md:mt-4 font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.02] tracking-[-0.03em] text-[#F5F5F5]"
          >
            {featuredEvent.title}
          </h1>
          <p className="mt-2 md:mt-3 text-sm md:text-lg text-[#E5E5E5]">{featuredEvent.tagline}</p>

          <dl className="mt-3 md:mt-6 space-y-1.5 md:space-y-2 text-xs sm:text-sm md:text-base text-[#D4D4D4]">
            <div className="flex items-start gap-2">
              <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#B48BDF]" aria-hidden="true" />
              <dt className="sr-only">Date</dt>
              <dd>
                {featuredEvent.date} &middot; {featuredEvent.time}
              </dd>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#B48BDF]" aria-hidden="true" />
              <dt className="sr-only">Venue</dt>
              <dd>{featuredEvent.venue}</dd>
            </div>
          </dl>
        </div>

        {/* Tiers + buy button: full width on mobile, beside the poster on desktop */}
        <div className="col-span-2 md:col-span-1 md:col-start-2 md:self-start">
          <ul className="flex flex-wrap gap-2" aria-label="Ticket prices">
            {featuredEvent.tiers.map((tier) => (
              <li
                key={tier.name}
                className="rounded-sm border border-white/[0.15] bg-black/40 backdrop-blur-sm px-3 py-1.5 text-xs font-mono uppercase tracking-[0.12em] text-[#E5E5E5]"
              >
                {tier.name} <span className="text-[#F5F5F5] font-semibold">{tier.price}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 md:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5">
            <a
              href={ticketBooking.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleClick('Get tickets')}
              className="group flex sm:inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-4 text-sm font-mono uppercase tracking-[0.1em] sm:tracking-[0.2em] whitespace-nowrap bg-[#622D8E] text-white font-semibold rounded-sm hover:bg-[#7535A8] transition-all duration-300 shadow-[0_0_30px_rgba(180,139,223,0.35)]"
            >
              <Ticket className="h-4 w-4" aria-hidden="true" />
              <span>Get tickets &middot; from {featuredEvent.priceFrom}</span>
              <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>

            {/* Secondary: the studio's own enquiry route */}
            <a
              href={heroContent.cta.primary.href}
              onClick={() => handleClick(heroContent.cta.primary.label)}
              className="inline-flex items-center justify-center px-5 py-3 text-xs font-mono uppercase tracking-[0.18em] text-[#E5E5E5] underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white transition-colors"
            >
              {heroContent.cta.primary.label}
            </a>
          </div>

          <p className="mt-3 text-xs text-[#D4D4D4]">{featuredEvent.note}</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-10 flex items-center justify-between gap-6 pt-4 md:pt-6 border-t border-white/[0.08] font-mono text-[11px] uppercase tracking-[0.2em] text-[#A0A0A0]/70">
        <span>Presented by AN FOCUS Events</span>
        <a
          href="#introduction"
          className="group hidden sm:inline-flex items-center gap-3 hover:text-[#B48BDF] transition-colors"
          aria-label="Scroll to introduction"
        >
          <span>Scroll to explore</span>
          <span className="h-8 w-8 rounded-full border border-white/[0.15] flex items-center justify-center group-hover:border-[#B48BDF] transition-colors">
            <ArrowDown className="h-3.5 w-3.5 animate-scroll-indicator" />
          </span>
        </a>
      </div>
    </section>
  );
}

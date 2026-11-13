'use client';

// ============================================================================
// AN FOCUS — Ticket Booking Ticker
// A strip of text that scrolls right-to-left on a loop and links to the
// booking site. The track holds two identical copies of the message and
// slides by exactly one copy's width, so the loop has no visible jump.
// ============================================================================

import { siteConfig } from '@/config/site';
import { trackEvent } from '@/lib/analytics';

// How many times the message repeats inside one copy — enough to fill the
// widest screens so there is never a gap.
const REPEATS = 6;

function TickerCopy({ hidden = false }: { hidden?: boolean }) {
  const bookingHost = siteConfig.booking.url.replace(/^https?:\/\//, '');

  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {Array.from({ length: REPEATS }, (_, i) => (
        <span key={i} className="flex items-center gap-3 px-6 whitespace-nowrap">
          <span>Click here to book your tickets</span>
          <span aria-hidden="true">&rarr;</span>
          <span className="underline underline-offset-4 decoration-white/40">
            {bookingHost}
          </span>
          <span aria-hidden="true" className="pl-6 opacity-50">
            &#10022;
          </span>
        </span>
      ))}
    </div>
  );
}

export default function TicketTicker() {
  return (
    <a
      href={siteConfig.booking.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Book your tickets at ${siteConfig.booking.url.replace(/^https?:\/\//, '')}`}
      onClick={() =>
        trackEvent('cta_click', { category: 'ticker', label: 'Ticket ticker' })
      }
      className="group block overflow-hidden bg-[#622D8E] hover:bg-[#7535A8] text-white font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
    >
      <div className="animate-ticker flex w-max py-2">
        <TickerCopy />
        <TickerCopy hidden />
      </div>
    </a>
  );
}

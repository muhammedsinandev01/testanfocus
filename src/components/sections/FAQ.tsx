'use client';

// ============================================================================
// AN FOCUS — FAQ Section (Interactive Accordion)
// Clean Swiss editorial accordion with subtle animation and direct WhatsApp link.
// ============================================================================

import { useState } from 'react';
import { faqItems, siteConfig } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Plus, Minus, MessageSquareQuote } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    const isNowOpen = openIndex !== idx;
    setOpenIndex(isNowOpen ? idx : null);
    if (isNowOpen) {
      trackEvent('cta_click', {
        category: 'faq',
        label: faqItems[idx].question,
      });
    }
  };

  return (
    <section id="faq" className="relative w-full bg-[#080808] py-28 md:py-40 px-6 md:px-12 lg:px-20 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Quick Consultation CTA */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#A78BFA]">
                  07 &mdash; CLARITY
                </span>
                <div className="h-px w-16 bg-[#A78BFA]/40" />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[#F5F5F5] uppercase">
                Frequently Asked Questions.
              </h2>
              <p className="mt-6 text-base text-[#A0A0A0] leading-relaxed font-light">
                Transparent answers regarding onboarding, geography, currencies, and our multi-disciplinary engagement models.
              </p>

              {/* Instant WhatsApp Quick Callout */}
              <div className="mt-10 p-6 bg-[#111111] border border-white/[0.08] rounded-sm">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A78BFA] mb-2">
                  <MessageSquareQuote className="h-4 w-4" />
                  <span>Prefer an instant answer?</span>
                </div>
                <p className="text-xs text-[#A0A0A0] leading-relaxed mb-4">
                  Chat directly with our studio directors on WhatsApp for real-time availability and scoping.
                </p>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('whatsapp_click', {
                      category: 'faq_box',
                      label: 'Direct WhatsApp',
                    })
                  }
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F5F5F5] hover:text-[#A78BFA] transition-colors"
                >
                  <span>WhatsApp +91 9895401085</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-7 divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
            {faqItems.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <ScrollReveal key={idx} direction="up" delay={idx * 60}>
                  <div className="py-6">
                    <button
                      type="button"
                      onClick={() => toggleItem(idx)}
                      className="w-full flex items-center justify-between text-left group gap-4 py-2"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-lg sm:text-xl font-light text-[#F5F5F5] uppercase tracking-wide group-hover:text-[#A78BFA] transition-colors">
                        {item.question}
                      </span>
                      <div className="h-8 w-8 rounded-full border border-white/[0.1] flex items-center justify-center shrink-0 group-hover:border-[#A78BFA] transition-colors">
                        {isOpen ? (
                          <Minus className="h-3.5 w-3.5 text-[#A78BFA]" />
                        ) : (
                          <Plus className="h-3.5 w-3.5 text-[#A0A0A0]" />
                        )}
                      </div>
                    </button>

                    {/* Smooth Expanded Answer */}
                    <div
                      className={`grid transition-all duration-300 ease-out overflow-hidden ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100 pt-3 pb-2'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed font-light pl-0.5">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


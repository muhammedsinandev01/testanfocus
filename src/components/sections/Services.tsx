'use client';

// ============================================================================
// AN FOCUS — Services Section
// Four dedicated cinematic service chapters with editorial typography,
// included services tags, media, and tailored CTAs.
// ============================================================================

import { services, ticketBooking } from '@/config/site';
import { serviceMedia } from '@/config/media';
import { trackEvent } from '@/lib/analytics';
import ScrollReveal from '@/components/ui/ScrollReveal';
import MediaRenderer from '@/components/ui/MediaRenderer';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="relative w-full bg-[#080808] py-28 md:py-36">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-20 md:mb-28">
        <ScrollReveal direction="up">
          <span className="block font-mono text-xs uppercase tracking-[0.3em] text-[#B48BDF] mb-4">
            02 &mdash; SERVICES
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#F5F5F5] uppercase">
            Everything your brand needs.
            <br />
            <span className="text-[#A0A0A0]">None of the fragmentation.</span>
          </h2>
        </ScrollReveal>
      </div>

      {/* Services List — 4 Chapters */}
      <div className="flex flex-col border-t border-white/[0.08]">
        {services.map((service, index) => {
          const media = serviceMedia[service.mediaKey] || {
            type: 'image',
            src: '',
            alt: service.headline,
          };

          const isEven = index % 2 === 1;

          return (
            <article
              key={service.id}
              id={`service-${service.id}`}
              className="relative w-full border-b border-white/[0.08] py-20 md:py-32 hover:bg-white/[0.015] transition-colors duration-500"
            >
              <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Text Details Column */}
                  <div
                    className={`lg:col-span-7 flex flex-col justify-center ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <ScrollReveal direction="up">
                      {/* Chapter Indicator */}
                      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#B48BDF] mb-6">
                        <span>{service.number}</span>
                        <span>/</span>
                        <span>{service.id.toUpperCase()}</span>
                      </div>

                      {/* Editorial Headline */}
                      <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-light leading-[1.08] text-[#F5F5F5] uppercase whitespace-pre-line">
                        {service.headline}
                      </h3>

                      {/* Body Description */}
                      <p className="mt-8 text-base sm:text-lg text-[#A0A0A0] leading-relaxed max-w-xl font-normal">
                        {service.description}
                      </p>

                      {/* Included Capabilities Tags */}
                      <div className="mt-8 pt-8 border-t border-white/[0.08]">
                        <span className="block font-mono text-xs uppercase tracking-[0.2em] text-[#A0A0A0]/70 mb-4">
                          Services Included:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {service.includes.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-2 text-xs sm:text-sm text-[#F5F5F5] font-light"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#B48BDF] shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-10 flex flex-wrap items-center gap-4">
                        <a
                          href={service.cta.href}
                          onClick={() =>
                            trackEvent('cta_click', {
                              category: 'services',
                              label: `${service.id}: ${service.cta.label}`,
                            })
                          }
                          className="group inline-flex items-center gap-3 px-7 py-3.5 text-xs font-mono uppercase tracking-[0.2em] bg-[#111111] text-[#F5F5F5] border border-white/[0.18] rounded-sm hover:border-[#B48BDF] hover:text-[#B48BDF] transition-all duration-300"
                        >
                          <span>{service.cta.label}</span>
                          <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>

                        {service.id === 'events' && (
                          <a
                            href={ticketBooking.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              trackEvent('cta_click', {
                                category: 'services',
                                label: 'events: Online Ticket Booking',
                              })
                            }
                            className="group inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-mono uppercase tracking-[0.2em] bg-[#622D8E] text-white font-semibold rounded-sm hover:bg-[#7535A8] transition-all duration-300 shadow-[0_0_20px_rgba(180,139,223,0.25)]"
                          >
                            <span>Book Tickets Online</span>
                            <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        )}
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Media Placeholder Showcase Column */}
                  <div
                    className={`lg:col-span-5 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <ScrollReveal direction={isEven ? 'right' : 'left'} delay={150}>
                      <div className="relative group rounded-sm overflow-hidden border border-white/[0.12] bg-[#111111] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                        {/* Media display or interactive visual canvas */}
                        <div className="aspect-[4/3] w-full relative">
                          <MediaRenderer
                            media={media}
                            aspectRatio="4:3"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />

                          {/* Hover Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}


'use client';

// ============================================================================
// AN FOCUS — Editorial Studio Footer
// Swiss-inspired layout with live Kerala time indicator, brand lineage, and fast links.
// ============================================================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks, siteConfig } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import { ArrowUp } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/ui/SocialIcons';

export default function Footer() {
  const [keralaTime, setKeralaTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Asia/Kolkata
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setKeralaTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('cta_click', { category: 'footer', label: 'Scroll to top' });
  };

  return (
    <footer className="relative w-full bg-[#080808] border-t border-white/[0.12] pt-20 pb-12 px-6 md:px-12 lg:px-20 text-[#A0A0A0]">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/[0.08]">
          {/* Studio Brand Lineage */}
          <div className="lg:col-span-5 space-y-6">
            <Link
              href="/"
              className="inline-flex flex-col gap-2 select-none"
              aria-label="AN FOCUS Home"
            >
              <Image
                src="/logo-full-white.png"
                alt="AN FOCUS"
                width={220}
                height={58}
                className="h-10 w-auto object-contain"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#A0A0A0]">
                An A.N. Industries brand
              </span>
            </Link>

            <p className="text-sm font-light text-[#A0A0A0] leading-relaxed max-w-sm">
              AN FOCUS is a creative studio in Kerala, India, and the digital media and production brand of A.N. Industries. Events, film, digital marketing and web under one team.
            </p>

            <div className="pt-2 flex items-center gap-3 font-mono text-xs text-[#A0A0A0]/70">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>KERALA (IST): {keralaTime || '12:00:00'}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <span className="block font-mono text-xs uppercase tracking-[0.25em] text-[#F5F5F5]">
              Navigation
            </span>
            <ul className="space-y-3 font-mono text-xs uppercase tracking-wider">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() =>
                      trackEvent('cta_click', {
                        category: 'footer_nav',
                        label: link.label,
                      })
                    }
                    className="hover:text-[#B48BDF] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Disciplines */}
          <div className="lg:col-span-2 space-y-4">
            <span className="block font-mono text-xs uppercase tracking-[0.25em] text-[#F5F5F5]">
              Disciplines
            </span>
            <ul className="space-y-3 text-xs font-mono uppercase tracking-wider text-[#A0A0A0]/70">
              <li>
                <a href="#services" className="hover:text-[#F5F5F5] transition-colors">
                  01 Live Events
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F5F5F5] transition-colors">
                  02 Film &amp; Media
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F5F5F5] transition-colors">
                  03 Growth Ads
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F5F5F5] transition-colors">
                  04 Digital Tech
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="lg:col-span-3 space-y-4">
            <span className="block font-mono text-xs uppercase tracking-[0.25em] text-[#F5F5F5]">
              Contact
            </span>
            <div className="space-y-2 text-xs font-mono">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="block hover:text-[#B48BDF] transition-colors"
              >
                {siteConfig.contact.email}
              </a>
              <a
                href={`tel:${siteConfig.contact.phones[0].replace(/\s+/g, '')}`}
                className="block hover:text-[#B48BDF] transition-colors"
              >
                {siteConfig.contact.phones[0]}
              </a>
              <a
                href="https://booking.anfocus.in"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#B48BDF] hover:text-[#CFB8EC] transition-colors"
              >
                Online Booking Portal ↗
              </a>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#A0A0A0] hover:text-[#B48BDF] transition-colors"
              >
                WhatsApp us &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#A0A0A0]/60">
          <div>
            &copy; 2026 AN FOCUS. A Brand of A.N. Industries. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href={siteConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AN FOCUS on Instagram"
              onClick={() =>
                trackEvent('cta_click', { category: 'footer', label: 'Instagram' })
              }
              className="inline-flex items-center gap-2 hover:text-[#F5F5F5] transition-colors"
            >
              <InstagramIcon className="h-4 w-4" />
              <span>Instagram</span>
            </a>

            <a
              href={siteConfig.contact.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AN FOCUS on Facebook"
              onClick={() =>
                trackEvent('cta_click', { category: 'footer', label: 'Facebook' })
              }
              className="inline-flex items-center gap-2 hover:text-[#F5F5F5] transition-colors"
            >
              <FacebookIcon className="h-4 w-4" />
              <span>Facebook</span>
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-[#F5F5F5] transition-colors group"
              aria-label="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

// ============================================================================
// AN FOCUS — Premium Navigation Header
// Minimal, futuristic top navigation with smooth scroll reveal and full-screen mobile menu.
// ============================================================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks, siteConfig } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import TicketTicker from '@/components/TicketTicker';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      // Hide when scrolling down past 120px, reveal when scrolling up
      if (currentScrollY > 120 && currentScrollY > lastScrollY && !mobileMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (label: string) => {
    trackEvent('cta_click', { category: 'navigation', label });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
          isVisible ? 'translate-y-0' : '-translate-y-full',
          isScrolled
            ? 'bg-[#080808]/85 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        )}
      >
        {/* Scrolling "book your tickets" strip */}
        <TicketTicker />

        <div
          className={cn(
            'max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between transition-all duration-500',
            isScrolled ? 'py-4' : 'py-5 md:py-6'
          )}
        >
          {/* Brand Logo & Wordmark Lockup */}
          <Link
            href="/"
            onClick={() => handleNavClick('Brand Logo')}
            className="group flex items-center gap-3 select-none"
            aria-label="AN FOCUS Home"
          >
          <div className="relative flex items-center">
            <Image
              src="/logo-full-white.png"
              alt="AN FOCUS Creative Studio Logo"
              width={220}
              height={58}
              priority
              className="h-8 sm:h-9 md:h-10 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => handleNavClick(link.label)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-[#A0A0A0] hover:text-[#F5F5F5] transition-colors duration-200 relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#B48BDF] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Action */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            onClick={() => handleNavClick('Header Start a Project')}
            className="relative inline-flex items-center justify-center px-4 py-2.5 text-[11px] font-mono uppercase tracking-[0.18em] text-[#F5F5F5] border border-white/[0.18] rounded-sm hover:border-[#B48BDF] hover:text-[#B48BDF] hover:bg-white/[0.03] transition-all duration-300 select-none group"
          >
            <span>Start a project</span>
            <span className="ml-2 transform group-hover:translate-x-0.5 transition-transform duration-200">
              &rarr;
            </span>
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={mobileMenuOpen}
          className="md:hidden relative z-50 p-2 text-[#F5F5F5] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B48BDF]"
        >
          <div className="w-6 h-5 flex flex-col justify-between items-end">
            <span
              className={cn(
                'h-0.5 bg-current transition-all duration-300',
                mobileMenuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'
              )}
            />
            <span
              className={cn(
                'h-0.5 bg-current transition-all duration-200',
                mobileMenuOpen ? 'opacity-0 w-0' : 'w-4'
              )}
            />
            <span
              className={cn(
                'h-0.5 bg-current transition-all duration-300',
                mobileMenuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'
              )}
            />
          </div>
        </button>
      </div>
    </header >

      {/* Mobile Full-Screen Overlay Menu */ }
      < div
  className = {
    cn(
              'fixed inset-0 z-40 bg-[#080808] flex flex-col justify-between px-8 py-24 transition-all duration-500 md:hidden',
      mobileMenuOpen
        ? 'opacity-100 pointer-events-auto translate-y-0'
                : 'opacity-0 pointer-events-none -translate-y-4'
    )
  }
    >
    <div className="flex flex-col gap-8 mt-6">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#A0A0A0]/60">
        Navigation
      </span>
      <nav className="flex flex-col gap-6">
        {navLinks.map((link, idx) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => handleNavClick(`Mobile ${link.label}`)}
            className="group flex items-baseline justify-between text-3xl font-light tracking-tight text-[#F5F5F5] hover:text-[#B48BDF] transition-colors duration-200 border-b border-white/[0.06] pb-4"
          >
            <span>{link.label}</span>
            <span className="font-mono text-xs text-[#A0A0A0]/40 group-hover:text-[#B48BDF] transition-colors">
              {String(idx + 1).padStart(2, '0')}
            </span>
          </a>
        ))}
      </nav>
    </div>

  {/* Mobile Menu Footer Info */ }
  <div className="flex flex-col gap-4 pt-8 border-t border-white/[0.08]">
    <a
      href="#contact"
      onClick={() => handleNavClick('Mobile Menu CTA')}
      className="w-full text-center py-3.5 text-xs font-mono uppercase tracking-[0.2em] border border-white/[0.2] text-[#F5F5F5] font-semibold rounded-sm hover:border-[#B48BDF] hover:text-[#B48BDF] transition-colors"
    >
      Start a project &rarr;
    </a>
    <div className="flex justify-between items-center text-[11px] font-mono text-[#A0A0A0]/60 pt-2">
      <span>{siteConfig.contact.location}</span>
      <a
        href={`https://wa.me/${siteConfig.contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#B48BDF] hover:underline"
      >
        WhatsApp Us
      </a>
    </div>
  </div>
            </div >
          </>
          );
}

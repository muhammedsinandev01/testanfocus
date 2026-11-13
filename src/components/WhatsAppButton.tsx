'use client';

// ============================================================================
// AN FOCUS — Floating WhatsApp Button
// Always-visible shortcut to a WhatsApp chat with a pre-filled greeting.
// ============================================================================

import { siteConfig } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import { MessageCircle } from 'lucide-react';

const greeting = 'Hi AN FOCUS, I would like to discuss a project.';

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(greeting)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with AN FOCUS on WhatsApp"
      onClick={() =>
        trackEvent('whatsapp_click', {
          category: 'floating_button',
          label: 'Floating WhatsApp',
        })
      }
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 h-14 px-4 rounded-full bg-[#25D366] text-[#080808] shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:bg-[#3fe07a] transition-colors"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:inline text-sm font-semibold pr-1">WhatsApp us</span>
    </a>
  );
}

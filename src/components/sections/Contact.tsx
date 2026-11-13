'use client';

// ============================================================================
// AN FOCUS — Contact Section & High-Conversion Intake
// Accessible form with validation, country codes, budget & timeline selectors,
// consultation checkbox, and direct WhatsApp/Phone/Email CTAs.
// ============================================================================

import { useState } from 'react';
import { siteConfig, contactContent } from '@/config/site';
import { hasPublishedWork } from '@/config/media';
import { trackEvent } from '@/lib/analytics';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { InstagramIcon, FacebookIcon } from '@/components/ui/SocialIcons';
import {
  Mail,
  Phone,
  MessageCircle,
  CheckCircle2,
  ArrowUpRight,
  Send,
} from 'lucide-react';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  budget: string;
  timeline: string;
  message: string;
  consultationRequest: boolean;
}

const initialForm: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  budget: 'Not sure yet',
  timeline: 'Within 1 month',
  message: '',
  consultationRequest: true,
};

const budgetOptions = [
  'Not sure yet',
  'Under ₹50,000',
  '₹50,000 – ₹2 lakh',
  '₹2 lakh – ₹5 lakh',
  '₹5 lakh – ₹15 lakh',
  '₹15 lakh+',
];

const timelineOptions = [
  'Within 1 month',
  '1 – 3 months',
  '3 – 6 months',
  'Just exploring',
];

// Builds the WhatsApp message that carries the enquiry to the studio.
function buildWhatsAppUrl(form: FormData): string {
  const lines = [
    'New enquiry from anfocus.in',
    `Name: ${form.name.trim()}`,
    form.company.trim() && `Company: ${form.company.trim()}`,
    `Email: ${form.email.trim()}`,
    form.phone.trim() && `Phone: ${form.phone.trim()}`,
    form.country.trim() && `Location: ${form.country.trim()}`,
    `Budget: ${form.budget}`,
    `Timeline: ${form.timeline}`,
    form.consultationRequest && 'Would like a free consultation call',
    '',
    form.message.trim(),
  ].filter((line) => line !== false && line !== undefined && line !== null);

  // Drop empty optional fields but keep the blank separator line
  const text = lines
    .filter((line, idx) => line !== '' || idx === lines.length - 2)
    .join('\n');

  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};

    if (!form.name.trim()) errs.name = 'Please provide your name';
    if (!form.email.trim()) {
      errs.email = 'Please provide your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!form.message.trim()) {
      errs.message = 'Please tell us a little about your project';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // No personal details go to analytics — only the non-identifying choices.
    trackEvent('contact_form_submit', {
      category: 'contact',
      label: 'WhatsApp enquiry',
      budget: form.budget,
      timeline: form.timeline,
    });

    if (form.consultationRequest) {
      trackEvent('consultation_request', { category: 'contact' });
    }

    // The enquiry is delivered over WhatsApp: open the chat with the brief
    // pre-filled. Must run synchronously in the submit handler so browsers
    // don't treat it as a pop-up. The success panel repeats the link in case
    // the new tab was blocked.
    const url = buildWhatsAppUrl(form);
    setWhatsAppUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', {
      category: 'contact',
      label: 'WhatsApp Quick Direct CTA',
    });
  };

  return (
    <section id="contact" className="relative w-full bg-[#080808] py-28 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <ScrollReveal direction="up">
            <span className="block font-mono text-xs uppercase tracking-[0.3em] text-[#B48BDF] mb-4">
              {hasPublishedWork ? '08' : '07'} &mdash; CONTACT
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F5F5] uppercase leading-[0.98]">
              {contactContent.heading}
            </h2>
            <p className="mt-6 text-xl text-[#A0A0A0] font-light">
              {contactContent.subheading} Tell us what you need and we will reply with clear next steps.
            </p>
          </ScrollReveal>
        </div>

        {/* Contact Layout: Form + Direct Coordinates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Intake Form */}
          <div className="lg:col-span-7 bg-[#111111] border border-white/[0.1] rounded-sm p-8 sm:p-12">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="h-16 w-16 mx-auto rounded-full bg-[#B48BDF]/10 border border-[#B48BDF] flex items-center justify-center text-[#B48BDF]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display text-3xl font-light text-[#F5F5F5] uppercase">
                  One last step.
                </h3>
                <p className="max-w-md mx-auto text-sm text-[#A0A0A0] leading-relaxed">
                  Thank you, <span className="text-[#F5F5F5]">{form.name}</span>. Your enquiry is ready in WhatsApp &mdash; press send there and we will reply with next steps.
                </p>
                <div>
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-mono uppercase tracking-[0.2em] bg-[#622D8E] text-white font-semibold rounded-sm hover:bg-[#7535A8] transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Open WhatsApp</span>
                  </a>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setForm(initialForm);
                    }}
                    className="text-xs font-mono uppercase tracking-[0.2em] text-[#B48BDF] hover:underline"
                  >
                    Send another enquiry &rarr;
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-2">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#A0A0A0]/60">
                    Tell us about your project
                  </span>
                  <span className="font-mono text-xs text-[#B48BDF]">* Required</span>
                </div>

                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-mono text-xs uppercase tracking-wider text-[#F5F5F5] mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Rahul Menon"
                      className={`w-full bg-[#080808] border px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#A0A0A0]/40 rounded-sm focus:outline-none focus:border-[#B48BDF] transition-colors ${errors.name ? 'border-red-500/60' : 'border-white/[0.12]'
                        }`}
                    />
                    {errors.name && (
                      <span className="text-[11px] text-red-400 mt-1 block">{errors.name}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="company" className="block font-mono text-xs uppercase tracking-wider text-[#F5F5F5] mb-2">
                      Company / Organization
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="e.g. Studio Brand"
                      className="w-full bg-[#080808] border border-white/[0.12] px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#A0A0A0]/40 rounded-sm focus:outline-none focus:border-[#B48BDF] transition-colors"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wider text-[#F5F5F5] mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="rahul@example.com"
                      className={`w-full bg-[#080808] border px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#A0A0A0]/40 rounded-sm focus:outline-none focus:border-[#B48BDF] transition-colors ${errors.email ? 'border-red-500/60' : 'border-white/[0.12]'
                        }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-400 mt-1 block">{errors.email}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-mono text-xs uppercase tracking-wider text-[#F5F5F5] mb-2">
                      Phone (optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 ..."
                      className="w-full bg-[#080808] border border-white/[0.12] px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#A0A0A0]/40 rounded-sm focus:outline-none focus:border-[#B48BDF] transition-colors"
                    />
                  </div>
                </div>

                {/* Country Location */}
                <div>
                  <label htmlFor="country" className="block font-mono text-xs uppercase tracking-wider text-[#F5F5F5] mb-2">
                    Your Country / City
                  </label>
                  <input
                    id="country"
                    type="text"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    placeholder="e.g. India (Kochi/Bangalore), UAE (Dubai), UK, USA..."
                    className="w-full bg-[#080808] border border-white/[0.12] px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#A0A0A0]/40 rounded-sm focus:outline-none focus:border-[#B48BDF] transition-colors"
                  />
                </div>

                {/* Budget & Timeline Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="budget" className="block font-mono text-xs uppercase tracking-wider text-[#F5F5F5] mb-2">
                      Budget
                    </label>
                    <select
                      id="budget"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full bg-[#080808] border border-white/[0.12] px-4 py-3 text-sm text-[#F5F5F5] rounded-sm focus:outline-none focus:border-[#B48BDF] transition-colors"
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#111111] text-[#F5F5F5]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block font-mono text-xs uppercase tracking-wider text-[#F5F5F5] mb-2">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      value={form.timeline}
                      onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                      className="w-full bg-[#080808] border border-white/[0.12] px-4 py-3 text-sm text-[#F5F5F5] rounded-sm focus:outline-none focus:border-[#B48BDF] transition-colors"
                    >
                      {timelineOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#111111] text-[#F5F5F5]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message / Brief */}
                <div>
                  <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wider text-[#F5F5F5] mb-2">
                    About your project *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about the event scale, film deliverables, website vision, or digital marketing goals..."
                    className={`w-full bg-[#080808] border px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#A0A0A0]/40 rounded-sm focus:outline-none focus:border-[#B48BDF] transition-colors resize-none ${errors.message ? 'border-red-500/60' : 'border-white/[0.12]'
                      }`}
                  />
                  {errors.message && (
                    <span className="text-[11px] text-red-400 mt-1 block">{errors.message}</span>
                  )}
                </div>

                {/* Free Consultation Request Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    id="consultation"
                    type="checkbox"
                    checked={form.consultationRequest}
                    onChange={(e) =>
                      setForm({ ...form, consultationRequest: e.target.checked })
                    }
                    className="mt-1 h-4 w-4 rounded-sm border-white/[0.2] bg-[#080808] text-[#B48BDF] focus:ring-[#B48BDF]"
                  />
                  <label htmlFor="consultation" className="text-xs text-[#A0A0A0] leading-relaxed select-none cursor-pointer">
                    I would like a free consultation call.
                  </label>
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-3 py-4 text-xs font-mono uppercase tracking-[0.2em] bg-[#622D8E] text-white font-semibold rounded-sm hover:bg-[#7535A8] transition-all duration-300"
                  >
                    <span>Send enquiry on WhatsApp</span>
                    <Send className="h-4 w-4" />
                  </button>
                  <p className="mt-3 text-[11px] text-[#A0A0A0]/70 text-center">
                    Opens WhatsApp with your details filled in. Prefer email? Write to {siteConfig.contact.email}.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Coordinates & CTAs */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal direction="left">
              {/* Direct Instant Channels Card */}
              <div className="p-8 bg-[#111111] border border-white/[0.1] rounded-sm space-y-6">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B48BDF] block">
                  Contact us directly
                </span>

                <div className="space-y-4">
                  {/* WhatsApp Quick CTA */}
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="flex items-center justify-between p-4 bg-[#080808] border border-white/[0.08] hover:border-[#B48BDF] rounded-sm transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5 text-[#B48BDF]" />
                      <div>
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-[#A0A0A0]/60">
                          WhatsApp
                        </span>
                        <span className="font-mono text-xs text-[#F5F5F5]">
                          +91 9895401085
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[#A0A0A0] group-hover:text-[#B48BDF] transition-colors" />
                  </a>

                  {/* Primary Email */}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    onClick={() =>
                      trackEvent('email_click', {
                        category: 'contact',
                        label: 'Contact email',
                      })
                    }
                    className="flex items-center justify-between p-4 bg-[#080808] border border-white/[0.08] hover:border-[#B48BDF] rounded-sm transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-[#B48BDF]" />
                      <div>
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-[#A0A0A0]/60">
                          Email
                        </span>
                        <span className="font-mono text-xs text-[#F5F5F5]">
                          {siteConfig.contact.email}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[#A0A0A0] group-hover:text-[#B48BDF] transition-colors" />
                  </a>

                  {/* Direct Phone Lines */}
                  {siteConfig.contact.phones.map((phone, idx) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      onClick={() =>
                        trackEvent('phone_click', {
                          category: 'contact',
                          label: phone,
                        })
                      }
                      className="flex items-center justify-between p-4 bg-[#080808] border border-white/[0.08] hover:border-[#B48BDF] rounded-sm transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-[#B48BDF]" />
                        <div>
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-[#A0A0A0]/60">
                            Phone {idx + 1}
                          </span>
                          <span className="font-mono text-xs text-[#F5F5F5]">{phone}</span>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-[#A0A0A0] group-hover:text-[#B48BDF] transition-colors" />
                    </a>
                  ))}

                  {/* Instagram Channel */}
                  <a
                    href={siteConfig.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent('cta_click', {
                        category: 'social',
                        label: 'Instagram Profile',
                      })
                    }
                    className="flex items-center justify-between p-4 bg-[#080808] border border-white/[0.08] hover:border-[#B48BDF] rounded-sm transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <InstagramIcon className="h-5 w-5 text-[#B48BDF]" />
                      <div>
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-[#A0A0A0]/60">
                          Instagram
                        </span>
                        <span className="font-mono text-xs text-[#F5F5F5]">
                          {siteConfig.contact.instagram}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[#A0A0A0] group-hover:text-[#B48BDF] transition-colors" />
                  </a>

                  {/* Facebook Page */}
                  <a
                    href={siteConfig.contact.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent('cta_click', {
                        category: 'social',
                        label: 'Facebook Page',
                      })
                    }
                    className="flex items-center justify-between p-4 bg-[#080808] border border-white/[0.08] hover:border-[#B48BDF] rounded-sm transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <FacebookIcon className="h-5 w-5 text-[#B48BDF]" />
                      <div>
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-[#A0A0A0]/60">
                          Facebook
                        </span>
                        <span className="font-mono text-xs text-[#F5F5F5]">
                          {siteConfig.contact.facebook}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[#A0A0A0] group-hover:text-[#B48BDF] transition-colors" />
                  </a>
                </div>
              </div>

              {/* Geographic Coordinates Spec */}
              <div className="p-8 bg-[#111111] border border-white/[0.1] rounded-sm">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A0A0A0]/60 block mb-2">
                  Location
                </span>
                <h4 className="font-display text-xl font-light text-[#F5F5F5] uppercase">
                  Kerala, India &mdash; working worldwide
                </h4>
                <p className="mt-3 text-xs text-[#A0A0A0] leading-relaxed">
                  We plan calls across time zones and quote in INR, USD or AED.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
'use client';

// ============================================================================
// AN FOCUS — Contact Section & High-Conversion Intake
// Accessible form with validation, country codes, budget & timeline selectors,
// consultation checkbox, and direct WhatsApp/Phone/Email CTAs.
// ============================================================================

import { useState } from 'react';
import { siteConfig, contactContent } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import ScrollReveal from '@/components/ui/ScrollReveal';
import {
  Mail,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Send,
} from 'lucide-react';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

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
  budget: 'Under ₹5L / $6K',
  timeline: 'Immediate (< 1 Month)',
  message: '',
  consultationRequest: true,
};

const budgetOptions = [
  'Under ₹5L / $6K',
  '₹5L – ₹15L / $6K – $20K',
  '₹15L – ₹50L / $20K – $60K',
  '₹50L+ / $60K+ (Enterprise/Festival)',
];

const timelineOptions = [
  'Immediate (< 1 Month)',
  '1 – 3 Months',
  '3 – 6 Months',
  'Exploratory / Later this year',
];

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};

    if (!form.name.trim()) errs.name = 'Please provide your name';
    if (!form.email.trim()) {
      errs.email = 'Please provide your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!form.phone.trim()) {
      errs.phone = 'Phone with country code is required';
    }
    if (!form.message.trim()) {
      errs.message = 'Please provide details about your brief or project';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Track submission
      trackEvent('contact_form_submit', {
        category: 'contact',
        label: `${form.name} (${form.company || 'Individual'})`,
        budget: form.budget,
        timeline: form.timeline,
      });

      if (form.consultationRequest) {
        trackEvent('consultation_request', {
          category: 'contact',
          label: form.email,
        });
      }

      // Simulated clean async submission handler (can plug into SendGrid, Resend, or API route)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
    } catch {
      setSubmitError('Unable to send brief right now. Please message directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#A78BFA]">
                08 &mdash; ENGAGE
              </span>
              <div className="h-px w-16 bg-[#A78BFA]/40" />
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F5F5] uppercase leading-[0.98]">
              {contactContent.heading}
            </h2>
            <p className="mt-6 text-xl text-[#A0A0A0] font-light">
              {contactContent.subheading} Brief our directors in Kerala or coordinate an international briefing call.
            </p>
          </ScrollReveal>
        </div>

        {/* Contact Layout: Form + Direct Coordinates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Intake Form */}
          <div className="lg:col-span-7 bg-[#111111] border border-white/[0.1] rounded-sm p-8 sm:p-12">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="h-16 w-16 mx-auto rounded-full bg-[#A78BFA]/10 border border-[#A78BFA] flex items-center justify-center text-[#A78BFA]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display text-3xl font-light text-[#F5F5F5] uppercase">
                  Brief Received.
                </h3>
                <p className="max-w-md mx-auto text-sm text-[#A0A0A0] leading-relaxed">
                  Thank you, <span className="text-[#F5F5F5]">{form.name}</span>. An AN FOCUS project director will review your requirements and respond via email or WhatsApp within 24 business hours.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setForm(initialForm);
                    }}
                    className="text-xs font-mono uppercase tracking-[0.2em] text-[#A78BFA] hover:underline"
                  >
                    Submit another brief &rarr;
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-2">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#A0A0A0]/60">
                    PROJECT INTAKE DOSSIER
                  </span>
                  <span className="font-mono text-xs text-[#A78BFA]">* Required Fields</span>
                </div>

                {submitError && (
                  <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-xs rounded-sm flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

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
                      className={`w-full bg-[#080808] border px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#A0A0A0]/40 rounded-sm focus:outline-none focus:border-[#A78BFA] transition-colors ${
                        errors.name ? 'border-red-500/60' : 'border-white/[0.12]'
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
                      className="w-full bg-[#080808] border border-white/[0.12] px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#A0A0A0]/40 rounded-sm focus:outline-none focus:border-[#A78BFA] transition-colors"
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
                      className={`w-full bg-[#080808] border px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#A0A0A0]/40 rounded-sm focus:outline-none focus:border-[#A78BFA] transition-colors ${
                        errors.email ? 'border-red-500/60' : 'border-white/[0.12]'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-400 mt-1 block">{errors.email}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-mono text-xs uppercase tracking-wider text-[#F5F5F5] mb-2">
                      Phone with Country Code *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 9895401085 / +971..."
                      className={`w-full bg-[#080808] border px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#A0A0A0]/40 rounded-sm focus:outline-none focus:border-[#A78BFA] transition-colors ${
                        errors.phone ? 'border-red-500/60' : 'border-white/[0.12]'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-red-400 mt-1 block">{errors.phone}</span>
                    )}
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
                    className="w-full bg-[#080808] border border-white/[0.12] px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#A0A0A0]/40 rounded-sm focus:outline-none focus:border-[#A78BFA] transition-colors"
                  />
                </div>

                {/* Budget & Timeline Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="budget" className="block font-mono text-xs uppercase tracking-wider text-[#F5F5F5] mb-2">
                      Estimated Investment
                    </label>
                    <select
                      id="budget"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full bg-[#080808] border border-white/[0.12] px-4 py-3 text-sm text-[#F5F5F5] rounded-sm focus:outline-none focus:border-[#A78BFA] transition-colors"
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
                      Target Delivery
                    </label>
                    <select
                      id="timeline"
                      value={form.timeline}
                      onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                      className="w-full bg-[#080808] border border-white/[0.12] px-4 py-3 text-sm text-[#F5F5F5] rounded-sm focus:outline-none focus:border-[#A78BFA] transition-colors"
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
                    Project Brief &amp; Goals *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about the event scale, film deliverables, website vision, or digital marketing goals..."
                    className={`w-full bg-[#080808] border px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#A0A0A0]/40 rounded-sm focus:outline-none focus:border-[#A78BFA] transition-colors resize-none ${
                      errors.message ? 'border-red-500/60' : 'border-white/[0.12]'
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
                    className="mt-1 h-4 w-4 rounded-sm border-white/[0.2] bg-[#080808] text-[#A78BFA] focus:ring-[#A78BFA]"
                  />
                  <label htmlFor="consultation" className="text-xs text-[#A0A0A0] leading-relaxed select-none cursor-pointer">
                    Request a complimentary 20-minute strategic consultation call with our Creative Director.
                  </label>
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-3 py-4 text-xs font-mono uppercase tracking-[0.2em] bg-[#A78BFA] text-[#080808] font-semibold rounded-sm hover:bg-[#C4B5FD] transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING BRIEF...</span>
                    ) : (
                      <>
                        <span>Transmit Project Brief</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Coordinates & CTAs */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal direction="left">
              {/* Direct Instant Channels Card */}
              <div className="p-8 bg-[#111111] border border-white/[0.1] rounded-sm space-y-6">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#A78BFA] block">
                  DIRECT CONTACT CHANNELS
                </span>

                <div className="space-y-4">
                  {/* WhatsApp Quick CTA */}
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="flex items-center justify-between p-4 bg-[#080808] border border-white/[0.08] hover:border-[#A78BFA] rounded-sm transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5 text-[#A78BFA]" />
                      <div>
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-[#A0A0A0]/60">
                          Instant WhatsApp
                        </span>
                        <span className="font-mono text-xs text-[#F5F5F5]">
                          +91 9895401085
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[#A0A0A0] group-hover:text-[#A78BFA] transition-colors" />
                  </a>

                  {/* Primary Email */}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    onClick={() =>
                      trackEvent('email_click', {
                        category: 'contact',
                        label: siteConfig.contact.email,
                      })
                    }
                    className="flex items-center justify-between p-4 bg-[#080808] border border-white/[0.08] hover:border-[#A78BFA] rounded-sm transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-[#A78BFA]" />
                      <div>
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-[#A0A0A0]/60">
                          Studio Dispatch
                        </span>
                        <span className="font-mono text-xs text-[#F5F5F5]">
                          {siteConfig.contact.email}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[#A0A0A0] group-hover:text-[#A78BFA] transition-colors" />
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
                      className="flex items-center justify-between p-4 bg-[#080808] border border-white/[0.08] hover:border-[#A78BFA] rounded-sm transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-[#A78BFA]" />
                        <div>
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-[#A0A0A0]/60">
                            Studio Phone Line 0{idx + 1}
                          </span>
                          <span className="font-mono text-xs text-[#F5F5F5]">{phone}</span>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-[#A0A0A0] group-hover:text-[#A78BFA] transition-colors" />
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
                    className="flex items-center justify-between p-4 bg-[#080808] border border-white/[0.08] hover:border-[#A78BFA] rounded-sm transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <InstagramIcon className="h-5 w-5 text-[#A78BFA]" />
                      <div>
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-[#A0A0A0]/60">
                          Official Feed
                        </span>
                        <span className="font-mono text-xs text-[#F5F5F5]">
                          {siteConfig.contact.instagram}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[#A0A0A0] group-hover:text-[#A78BFA] transition-colors" />
                  </a>
                </div>
              </div>

              {/* Geographic Coordinates Spec */}
              <div className="p-8 bg-[#111111] border border-white/[0.1] rounded-sm">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A0A0A0]/60 block mb-2">
                  GEO LOCATION
                </span>
                <h4 className="font-display text-xl font-light text-[#F5F5F5] uppercase">
                  Kerala, India &mdash; Global Engagements
                </h4>
                <p className="mt-3 text-xs text-[#A0A0A0] leading-relaxed">
                  Calls synchronized across IST, GST (Dubai), GMT, and EST. Billing and commercial contracts supported in INR, USD, and AED.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
